import { PROJECT_PROPS } from "@/types/types";

export const PROJECTS_DATA: PROJECT_PROPS[] = [
  {
    slug: "xchangeon-matching-engine",
    title: "XchangeOn Matching Engine",
    domain: "Exchange infrastructure",
    description:
      "A native Rust futures matching engine and algorithmic market maker running next to a production spot exchange.",
    highlights: [
      "Hexagonal-architecture microservice on NATS JetStream for leveraged perpetual futures: order matching, leverage and margin validation, TP/SL passthrough, cancel/replace.",
      "Zero regressions on the live spot exchange, backed by 75+ automated tests.",
      "Market-maker engine built from scratch: mark-price EMA blending, volatility-adaptive price windows and three liquidity strategies, replacing a Node.js bot loop with a lower-latency in-process design.",
      "Dual-write audit pipeline: Redis pub/sub for live delivery, Kafka for a durable trail with code-managed topic retention, tuned for sub-3-second market data.",
      "Resolved a live SASL/TLS Kafka incident (custom CA trust across a multi-stage CI/CD pipeline) and restored 6 topics without downtime.",
    ],
    techStack: ["Rust", "NATS JetStream", "Kafka", "Redis"],
    accent: "#f97316",
    flow: [
      "Client orders",
      "NATS JetStream",
      "Matching engine",
      "Redis + Kafka",
    ],
    metrics: [
      { value: "75+", label: "tests" },
      { value: "6", label: "Kafka topics" },
      { value: "<3s", label: "live data" },
      { value: "0", label: "regressions" },
    ],
  },
  {
    slug: "g20-multi-exchange-trading",
    title: "G20 Multi-Exchange Trading",
    domain: "Exchange connectivity",
    description:
      "A Rust connector framework that gives G20 Rapid Engine one interface to 50+ crypto exchanges.",
    highlights: [
      "Unified REST and WebSocket interfaces for orders, cancels, executions and market data across spot, futures and DEX markets.",
      "Binance, Coinbase, Kraken, OKX, Bybit, LMAX and 40+ more behind the same trait.",
      "Tokio WebSocket streaming with heartbeats, auto-reconnect and message queuing for balances, order state changes and fills.",
      "Bearer, OAuth 2.0 and HMAC-SHA256 signing with automatic token refresh and credential isolation.",
      "Normalised ExchOrder, ExchBalance and ExchFillDetail models so trading logic never sees exchange quirks.",
    ],
    techStack: ["Rust", "Tokio", "WebSockets", "REST APIs", "HMAC"],
    accent: "#38bdf8",
    flow: [
      "Trading logic",
      "Unified connector",
      "REST + WebSocket",
      "50+ exchanges",
    ],
    metrics: [
      { value: "50+", label: "exchanges" },
      { value: "3", label: "market types" },
      { value: "HMAC", label: "SHA-256 auth" },
      { value: "WS", label: "auto-reconnect" },
    ],
  },
  {
    slug: "loveto-play-golf",
    title: "LoveToPlay.Golf",
    domain: "Sports platform backend",
    description:
      "The Actix-Web and PostgreSQL backend behind competitions, scoring, handicaps, chat and subscriptions.",
    highlights: [
      "100+ APIs with JWT authentication, RBAC and validation layers.",
      "Competition, scoring and handicap engine on carefully designed PostgreSQL schemas.",
      "Real-time chat, FCM push notifications, presence, polls and timed voting flows.",
      "Cron-style jobs for reminders, billing, leaderboard refresh and event automation.",
      "Leaderboard and scoring latency cut significantly with indexes and CTE-based queries.",
    ],
    techStack: [
      "Rust",
      "Actix-Web",
      "PostgreSQL",
      "JWT",
      "Firebase FCM",
      "Docker",
    ],
    accent: "#22c55e",
    flow: ["Clients", "Actix-Web API", "PostgreSQL", "FCM + cron jobs"],
    metrics: [
      { value: "100+", label: "APIs" },
      { value: "JWT", label: "+ RBAC" },
      { value: "FCM", label: "push" },
      { value: "CTE", label: "tuned queries" },
    ],
  },
  {
    slug: "m24-sniper-bot",
    title: "M24 Sniper Trading Bot",
    domain: "Real-time trading",
    description:
      "A latency-sensitive bot that spots rug-pull patterns in newly launched tokens and trades on the signal.",
    highlights: [
      "Detects rug-pull scams and other high-risk patterns in fresh token launches.",
      "Real-time transaction monitoring, alerting and automated execution over exchange WebSockets.",
      "Concurrency-safe order execution built on Rust ownership and async primitives, so there are no data races.",
      "Latency-sensitive price-feed and mempool monitoring pipelines.",
      "Multiple exchange APIs for both data ingestion and order execution.",
    ],
    techStack: ["Rust", "Tokio", "WebSockets", "Crypto APIs"],
    accent: "#a855f7",
    flow: [
      "Mempool + price feeds",
      "Risk detection",
      "Order executor",
      "Exchange API",
    ],
    metrics: [
      { value: "WS", label: "live feeds" },
      { value: "0", label: "data races" },
      { value: "Mempool", label: "monitoring" },
      { value: "Auto", label: "execution" },
    ],
  },
];
