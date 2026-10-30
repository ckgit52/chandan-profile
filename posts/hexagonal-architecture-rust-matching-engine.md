---
title: "Hexagonal Architecture in Rust: Ports, Adapters and a Matching Engine"
date: "Friday, Sep 18, 2026"
description: "How traits become ports, why the domain should know nothing about NATS or Kafka, and how that boundary makes a trading engine easy to test and safe to change."
tags:
  [
    "Rust",
    "Hexagonal Architecture",
    "Ports and Adapters",
    "Matching Engine",
    "NATS JetStream",
    "Microservices",
    "Testing",
    "Software Design",
  ]
---

A matching engine is a good stress test for architecture. The rules are strict (price-time priority, margin checks, cancel and replace), the cost of a bug is real money, and the surrounding infrastructure (message brokers, caches, audit logs) changes far more often than the rules do.

Hexagonal architecture, also called ports and adapters, is how I keep those two speeds of change apart. In Rust it fits unusually well, because traits are ports and the compiler enforces the boundary.

---

## The idea in one paragraph

Put the business rules in the centre and make them pure: no network, no database, no broker. Everything the core needs from the outside world is described by a trait, called a **port**. Everything that talks to the outside world, such as NATS JetStream, Redis or Kafka, is an **adapter** that implements a port. Dependencies only point inwards.

---

## A domain with no I/O

The core of the engine is an order book and the rules for crossing orders. It is a plain struct with plain methods, so it is trivial to reason about and to test.

```rust
pub struct OrderBook {
    bids: BTreeMap<Price, VecDeque<Order>>,
    asks: BTreeMap<Price, VecDeque<Order>>,
}

impl OrderBook {
    /// Match the incoming order against resting liquidity (price-time priority)
    /// and return the fills. Whatever is left rests on the book.
    pub fn submit(&mut self, order: Order) -> Vec<Fill> {
        // ...
    }

    pub fn cancel(&mut self, id: OrderId) -> Option<Order> {
        // ...
    }
}
```

Rules that belong to the domain stay here: leverage and margin validation, how take-profit and stop-loss instructions pass through with an order, and what a cancel/replace means. None of them need to know that messages arrive over a broker.

---

## Ports are traits

The application layer coordinates the domain and describes what it needs from the world as traits:

```rust
#[async_trait::async_trait]
pub trait EventPublisher: Send + Sync {
    async fn publish(&self, event: EngineEvent) -> Result<(), PublishError>;
}

pub trait Clock: Send + Sync {
    fn now(&self) -> Timestamp;
}

pub struct MatchingService<P: EventPublisher, C: Clock> {
    book: OrderBook,
    publisher: P,
    clock: C,
}

impl<P: EventPublisher, C: Clock> MatchingService<P, C> {
    pub async fn handle(&mut self, command: Command) -> Result<(), EngineError> {
        match command {
            Command::Submit(order) => {
                let fills = self.book.submit(order);
                for fill in fills {
                    self.publisher.publish(EngineEvent::Fill(fill)).await?;
                }
            }
            Command::Cancel(id) => {
                if let Some(order) = self.book.cancel(id) {
                    self.publisher.publish(EngineEvent::Cancelled(order)).await?;
                }
            }
        }
        Ok(())
    }
}
```

Two details are worth calling out. The service takes `&mut self`, so one task owns the book and there are no locks on the hot path. And time comes in through a `Clock` port, so tests can control it instead of reading the wall clock.

---

## Adapters sit at the edge

The real implementations live in their own modules and are the only code that imports a broker client:

- A **driving adapter** subscribes to a NATS JetStream stream, decodes commands and calls `MatchingService::handle`.
- A **driven adapter** implements `EventPublisher` by writing to the outgoing streams.

Swapping a transport, or adding a second sink such as an audit log, means writing a new adapter. The matching rules are not touched.

---

## Testing without any infrastructure

The payoff shows up in the tests. An in-memory adapter records events in a vector, and the whole service runs inside an ordinary test with no broker, no containers and no network:

```rust
#[derive(Clone, Default)]
struct InMemoryPublisher(Arc<Mutex<Vec<EngineEvent>>>);

#[async_trait::async_trait]
impl EventPublisher for InMemoryPublisher {
    async fn publish(&self, event: EngineEvent) -> Result<(), PublishError> {
        self.0.lock().unwrap().push(event);
        Ok(())
    }
}

#[tokio::test]
async fn crossing_orders_produce_a_fill() {
    let publisher = InMemoryPublisher::default();
    let mut engine = MatchingService::new(publisher.clone(), FixedClock::default());

    engine.handle(Command::Submit(sell(100, 5))).await.unwrap();
    engine.handle(Command::Submit(buy(100, 5))).await.unwrap();

    assert!(matches!(
        publisher.0.lock().unwrap().as_slice(),
        [EngineEvent::Fill(_)]
    ));
}
```

Fast, deterministic tests are what make it possible to add a new product, such as leveraged perpetual futures next to an existing spot exchange, and be confident that the old behaviour did not move.

---

## Generics or trait objects?

I default to generics (`MatchingService<P, C>`) because the compiler can inline across the boundary and there is no allocation or vtable on the hot path. When a service has many ports, the type parameters get noisy; at that point `Arc<dyn Port>` for the cold ones is a perfectly reasonable trade. Choose per port, not per project.

---

## Takeaways

- The domain is pure: no broker, no database, no async runtime assumptions.
- Ports are small traits shaped by what the core needs, not by what a library offers.
- Adapters are thin, replaceable, and the only place infrastructure crates appear.
- In-memory adapters turn most of your test suite into fast unit tests.
- Single-owner state (`&mut self` in one task) beats a lock around a shared book.

Hexagonal architecture is not about diagrams. It is about being able to change the plumbing without ever re-validating the rules.
