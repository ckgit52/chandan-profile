export type BLOG_CARDS_PROPS = {
  slug?: string;
  title?: string;
  date?: string;
  description?: string;
  content?: string;
  index?: number;
  featured?: boolean;
  tags?: string[];
  /** Estimated minutes to read. */
  readingTime?: number;
};

export type WORK_COMPANIES_PROPS = {
  companyName: string;
  companyLogo: string;
  role: string;
  duration: string;
  bullets: string[];
  techStack: string[];
};

export type EDUCATION_PROPS = {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  cgpa: string;
  courses: string[];
};

export type PROJECT_PROPS = {
  slug: string;
  title: string;
  domain: string;
  description: string;
  highlights: string[];
  techStack: string[];
  /** Hex colour used for the card glow and diagram accents. */
  accent: string;
  /** Request/data path shown as the architecture diagram, top to bottom. */
  flow: string[];
  metrics: { value: string; label: string }[];
};

export type SKILL_GROUP_PROPS = {
  title: string;
  items: string[];
};

export type FOCUS_PROPS = {
  title: string;
  description: string;
  icon: "server" | "chart" | "pipeline";
  tech: string[];
};

export type STAT_PROPS = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

export type LinksProps = {
  link: string;
  Icon: React.ReactNode;
  name: string;
};
