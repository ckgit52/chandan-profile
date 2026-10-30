import { SKILL_GROUP_PROPS } from "@/types/types";

export const SKILL_GROUPS: SKILL_GROUP_PROPS[] = [
  {
    title: "Languages",
    items: ["Rust", "C++", "JavaScript", "TypeScript", "SQL", "Python"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Actix-Web", "Axum", "Tokio", "Serde", "Diesel", "SQLx"],
  },
  {
    title: "Databases & Messaging",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Redis",
      "NATS JetStream",
      "Kafka",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS S3", "Docker", "GitHub Actions", "Firebase FCM"],
  },
  {
    title: "Tools",
    items: ["VS Code", "Git", "GitHub", "Postman", "Linux"],
  },
  {
    title: "Concepts",
    items: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "Microservices",
      "REST APIs",
      "Async Programming",
    ],
  },
];
