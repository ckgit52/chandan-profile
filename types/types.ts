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

/** `month` is 1-12; leave it out when only the year is known. */
export type MONTH_YEAR = { year: number; month?: number };

export type WORK_COMPANIES_PROPS = {
  companyName: string;
  /** Square brand mark; falls back to `initials` when missing. */
  companyLogo?: string;
  initials: string;
  role: string;
  employmentType?: string;
  location?: string;
  start: MONTH_YEAR;
  /** `null` means the role is current. */
  end: MONTH_YEAR | null;
  summary: string;
  bullets: string[];
  /** Technologies, shown as logos (names must exist in components/tech-icons). */
  techStack: string[];
  /** Other skills, shown as text chips. */
  skills?: string[];
  /** Titles of projects (data/projects.ts) built in this role. */
  projects?: string[];
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
