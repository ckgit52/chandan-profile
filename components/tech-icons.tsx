import type { ComponentType, ReactNode } from "react";
import {
  SiActix,
  SiApachekafka,
  SiBinance,
  SiCplusplus,
  SiDocker,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiNatsdotio,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiRedis,
  SiRust,
  SiSupabase,
  SiTokio,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaCode, FaDatabase, FaPlug } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import type { Avatar } from "@/components/ui/avatar-group";

type IconComponent = ComponentType<{ className?: string }>;

/** Brand-less crates get a small lettermark so every skill still has an icon. */
const lettermark = (label: string): IconComponent => {
  const Mark = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="6" fill="currentColor" opacity=".16" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize={label.length > 2 ? 9 : 11}
        fontWeight="700"
        fill="currentColor"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {label}
      </text>
    </svg>
  );
  return Mark;
};

const NEUTRAL = "text-neutral-900 dark:text-neutral-100";

type TechEntry = { label: string; Icon: IconComponent; color: string };

const TECH: Record<string, TechEntry> = {
  rust: { label: "Rust", Icon: SiRust, color: "text-[#f74c00]" },
  "c++": { label: "C++", Icon: SiCplusplus, color: "text-[#00599c]" },
  javascript: {
    label: "JavaScript",
    Icon: SiJavascript,
    color: "text-[#f7df1e]",
  },
  typescript: {
    label: "TypeScript",
    Icon: SiTypescript,
    color: "text-[#3178c6]",
  },
  sql: { label: "SQL", Icon: FaDatabase, color: "text-[#4479a1]" },
  python: { label: "Python", Icon: SiPython, color: "text-[#3776ab]" },

  "actix-web": { label: "Actix-Web", Icon: SiActix, color: "text-[#2f81c4]" },
  axum: { label: "Axum", Icon: lettermark("Ax"), color: "text-[#f74c00]" },
  tokio: { label: "Tokio", Icon: SiTokio, color: NEUTRAL },
  serde: { label: "Serde", Icon: lettermark("Se"), color: "text-[#ce422b]" },
  diesel: { label: "Diesel", Icon: lettermark("Di"), color: "text-[#e5522b]" },
  sqlx: { label: "SQLx", Icon: lettermark("Sx"), color: "text-[#6366f1]" },

  postgresql: {
    label: "PostgreSQL",
    Icon: SiPostgresql,
    color: "text-[#4169e1]",
  },
  mongodb: { label: "MongoDB", Icon: SiMongodb, color: "text-[#47a248]" },
  supabase: { label: "Supabase", Icon: SiSupabase, color: "text-[#3ecf8e]" },
  redis: { label: "Redis", Icon: SiRedis, color: "text-[#dc382d]" },
  "nats jetstream": {
    label: "NATS JetStream",
    Icon: SiNatsdotio,
    color: "text-[#27aae1]",
  },
  kafka: { label: "Kafka", Icon: SiApachekafka, color: NEUTRAL },

  "aws s3": { label: "AWS S3", Icon: FaAws, color: "text-[#ff9900]" },
  docker: { label: "Docker", Icon: SiDocker, color: "text-[#2496ed]" },
  "github actions": {
    label: "GitHub Actions",
    Icon: SiGithubactions,
    color: "text-[#2088ff]",
  },
  "firebase fcm": {
    label: "Firebase FCM",
    Icon: SiFirebase,
    color: "text-[#ffca28]",
  },

  "vs code": { label: "VS Code", Icon: FaCode, color: "text-[#007acc]" },
  git: { label: "Git", Icon: SiGit, color: "text-[#f05032]" },
  github: { label: "GitHub", Icon: SiGithub, color: NEUTRAL },
  postman: { label: "Postman", Icon: SiPostman, color: "text-[#ff6c37]" },
  linux: { label: "Linux", Icon: SiLinux, color: "text-[#fcc624]" },

  jwt: { label: "JWT", Icon: SiJsonwebtokens, color: "text-[#d63aff]" },
  websockets: { label: "WebSockets", Icon: FaPlug, color: "text-[#10b981]" },
  "rest apis": { label: "REST APIs", Icon: FaPlug, color: "text-[#0ea5e9]" },
  hmac: { label: "HMAC", Icon: lettermark("HM"), color: "text-[#14b8a6]" },
  "crypto apis": {
    label: "Crypto APIs",
    Icon: SiBinance,
    color: "text-[#f0b90b]",
  },
};

const DEFAULT_SIZE = "size-4 shrink-0";

export function techIcon(name: string, className = DEFAULT_SIZE): ReactNode {
  const entry = TECH[name.trim().toLowerCase()];
  if (!entry) return null;
  return <entry.Icon className={cn(entry.color, className)} />;
}

export function techAvatars(names: string[]): Avatar[] {
  return names.flatMap((name) => {
    const entry = TECH[name.trim().toLowerCase()];
    if (!entry) return [];
    return [{ name: entry.label, icon: techIcon(name) }];
  });
}
