import { WORK_COMPANIES_PROPS } from "@/types/types";

export const WORK_COMPANIES: WORK_COMPANIES_PROPS[] = [
  {
    companyName: "Webmob Software Solutions → Webcom Systems",
    companyLogo: "/companies/webcom-logo.png",
    role: "Rust Developer",
    duration: "2023 - Present",
    bullets: [
      "Design and build scalable Rust backend services: production-grade REST APIs and microservices.",
      "Write asynchronous API handlers and background tasks with Actix-Web and Tokio for high-performance workloads.",
      "Integrate PostgreSQL and MongoDB with optimised queries, indexing and efficient data modelling.",
      "Implement authentication, authorisation, request validation and RBAC for secure API access.",
      "Work with cross-functional teams on development, debugging, performance improvements and code reviews.",
      "Own Git workflows, branching strategy, CI pipelines and deployments on GitHub.",
    ],
    techStack: [
      "Rust",
      "Actix-Web",
      "Tokio",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "Git",
    ],
  },
];
