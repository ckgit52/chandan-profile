import { STAT_PROPS } from "@/types/types";

export const PROFILE = {
  name: "Chandan Kumar",
  role: "Rust Backend Developer",
  email: "chandan52chd1@gmail.com",
  resumeUrl: "/chandan-kumar-resume.pdf",
  siteDescription:
    "Portfolio of Chandan Kumar, a Rust backend developer building high-performance REST APIs, matching engines and real-time trading infrastructure with Actix-Web, Tokio, PostgreSQL, Kafka and NATS.",
  intro:
    "I'm a Rust backend developer who builds fast, reliable services: async REST APIs, event-driven microservices and real-time trading infrastructure.",
  about:
    "A Rust backend developer building production-grade REST APIs, microservices and low-latency trading systems. I work with Actix-Web, Tokio, PostgreSQL, Redis, Kafka and NATS JetStream, and care about correctness, observability and code that stays easy to change.",
  cta: "I'm open to conversations about backend, systems and trading-infrastructure work. If you're building something that has to be fast and correct, I'd love to hear about it.",
} as const;

/** Rotating tags in the hero; `tech` entries resolve to logos in components/tech-icons. */
export const HERO_WORDS: { text: string; tech: string[] }[] = [
  { text: "Rust Backend Developer", tech: ["Rust"] },
  { text: "Actix-Web, Axum, Tokio", tech: ["Actix-Web", "Axum", "Tokio"] },
  {
    text: "PostgreSQL, MongoDB, Redis",
    tech: ["PostgreSQL", "MongoDB", "Redis"],
  },
  { text: "NATS JetStream, Kafka", tech: ["NATS JetStream", "Kafka"] },
  { text: "Docker, GitHub Actions", tech: ["Docker", "GitHub Actions"] },
];

export const STATS: STAT_PROPS[] = [
  {
    value: 100,
    suffix: "+",
    label: "REST APIs",
    detail: "shipped on LoveToPlay.Golf with JWT auth and RBAC",
  },
  {
    value: 50,
    suffix: "+",
    label: "Exchanges",
    detail: "unified behind one Rust connector framework",
  },
  {
    value: 75,
    suffix: "+",
    label: "Automated tests",
    detail: "and zero regressions on the futures matching engine",
  },
  {
    prefix: "<",
    value: 3,
    suffix: "s",
    label: "Market data",
    detail: "live delivery over Redis, with Kafka as audit trail",
  },
];
