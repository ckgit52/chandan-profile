---
title: "Dual-Write Event Pipelines: Redis for Speed, Kafka for the Record"
date: "Friday, Aug 21, 2026"
description: "Why live market data and an audit trail want different systems, how to publish to both without coupling their failure modes, and what to check when Kafka's SASL/TLS setup breaks in CI/CD."
tags:
  [
    "Rust",
    "Kafka",
    "Redis",
    "Event-Driven Architecture",
    "Audit Trail",
    "SASL",
    "TLS",
    "CI/CD",
    "Real-Time Systems",
  ]
---

A trading system produces events that two very different consumers care about. Traders and front ends want the latest trade or order-book update as fast as possible, and do not care about the ones they missed. Compliance, reconciliation and debugging want every event, in order, kept for a long time.

One system rarely serves both well, so I build the pipeline as a dual write: **Redis pub/sub for live delivery** and **Kafka for the durable audit trail**.

---

## Two systems, two jobs

**Redis pub/sub** is for live delivery:

- Goal: the lowest possible latency to live subscribers
- Delivery: fire and forget
- A missed message is gone
- No retention

**Kafka** is for the record:

- Goal: a durable, ordered, replayable log
- Delivery: persisted, with consumers tracking their own offsets
- A missed message is still in the log
- Retention configured per topic

Treating them as complements rather than alternatives lets each one do only the job it is good at. The target for the live path was sub-three-second delivery of market data, and Redis keeps the live hop small enough to fit inside that budget.

---

## Do not let the slow path slow down the fast one

The key design rule is that the live path must never wait on the audit path. Publish to Redis first, then hand the event to a dedicated Kafka writer through a bounded channel:

```rust
pub async fn publish(&self, event: &MarketEvent) -> anyhow::Result<()> {
    let payload = serde_json::to_vec(event)?;

    // Live path: never wait on the audit trail.
    self.redis
        .clone()
        .publish::<_, _, ()>(event.channel(), &payload)
        .await?;

    // Durable path: hand off to the Kafka writer task.
    self.audit_tx
        .send(AuditRecord { key: event.key(), payload })
        .await?;

    Ok(())
}
```

The channel is bounded on purpose. If Kafka stalls, `send().await` applies backpressure instead of letting memory grow without limit, and an audit trail should never silently drop records. If you would rather keep the live path completely independent during a long outage, write to a local outbox first and drain it into Kafka.

The writer task owns the producer:

```rust
tokio::spawn(async move {
    while let Some(record) = rx.recv().await {
        let message = FutureRecord::to(&topic)
            .key(&record.key)
            .payload(&record.payload);

        if let Err((error, _)) = producer.send(message, Duration::from_secs(5)).await {
            tracing::error!(?error, "kafka audit write failed");
        }
    }
});
```

Use a stable key (for example the instrument) so events for the same entity land on one partition and keep their order.

---

## Manage retention in code

Topic settings that live only in someone's terminal history are a production risk. Creating topics and their retention from the service itself makes the configuration reviewable and repeatable across environments:

```rust
let topic = NewTopic::new("market.trades", 3, TopicReplication::Fixed(3))
    .set("retention.ms", "604800000");

admin.create_topics(&[topic], &AdminOptions::new()).await?;
```

Treat "topic already exists" as success, and reconcile configuration on start so that a changed retention value actually takes effect.

---

## When Kafka authentication fails in the pipeline

Secured Kafka clusters add two layers that fail independently: SASL for who you are and TLS for whom you trust. A client configuration usually looks like this:

```rust
let producer: FutureProducer = ClientConfig::new()
    .set("bootstrap.servers", &cfg.brokers)
    .set("security.protocol", "SASL_SSL")
    .set("sasl.mechanisms", "SCRAM-SHA-512")
    .set("sasl.username", &cfg.username)
    .set("sasl.password", &cfg.password)
    .set("ssl.ca.location", &cfg.ca_path)
    .create()?;
```

I once had to untangle a production incident that sat exactly here: SASL/TLS authentication to Kafka combined with a custom certificate authority, across a multi-stage CI/CD pipeline. The lessons that carried over:

- **Check the layers separately.** A TLS handshake error and a SASL authentication error look similar in application logs but have unrelated fixes.
- **Verify the CA where the process runs.** In multi-stage builds the CA bundle that exists in the build stage is not necessarily in the runtime image, and `ssl.ca.location` must point at a file that exists there.
- **Match the mechanism.** The client's `sasl.mechanisms` has to be one the broker has enabled for that listener.
- **Put a connectivity smoke test in the pipeline.** Failing the deploy beats discovering a dead topic from a dashboard.

Fixing it restored data flow across all six topics without downtime.

---

## Verify against the real thing

Before deploying a pipeline like this, run it end to end against real data. Pointing it at live external market feeds and watching events arrive on NATS, in Redis and in Kafka is the only way to see how it behaves with real symbol formats, bursts and ordering, which synthetic data rarely reproduces.

---

## Takeaways

- Live delivery and durable history are different requirements; use a system for each.
- The audit path must never add latency to the live path, and must never drop data silently.
- Keep topic configuration in code.
- When Kafka auth breaks, debug SASL and TLS separately and verify the CA inside the runtime image.
- Test the whole chain against real data before it ships.
