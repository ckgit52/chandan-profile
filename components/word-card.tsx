import Image from "next/image";
import Link from "next/link";
import { AvatarGroup } from "./ui/avatar-group";
import { techAvatars } from "./tech-icons";
import { cn } from "@/lib/utils";
import { dateRange, durationLabel } from "@/lib/experience";
import { WORK_COMPANIES_PROPS } from "@/types/types";

const CompanyMark = ({
  logo,
  initials,
  background = "light",
}: {
  logo?: string;
  initials: string;
  background?: "light" | "dark";
}) =>
  logo ? (
    <Image
      src={logo}
      alt=""
      width={44}
      height={44}
      className={cn(
        "size-11 shrink-0 rounded-xl border object-contain p-1.5",
        background === "dark"
          ? "border-neutral-800 bg-neutral-950"
          : "border-neutral-200 bg-white dark:border-neutral-800",
      )}
    />
  ) : (
    <span
      aria-hidden="true"
      className="grid size-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-semibold tracking-tight text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
    >
      {initials}
    </span>
  );

/** One timeline entry. The parent <ol> draws the vertical rail. */
const WorkCard = ({
  companyName,
  companyLogo,
  logoBackground,
  initials,
  role,
  employmentType,
  location,
  start,
  end,
  summary,
  bullets,
  techStack,
  skills,
  projects,
}: WORK_COMPANIES_PROPS) => {
  const isCurrent = end === null;
  const duration = durationLabel(start, end);

  return (
    <article className="relative">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-3 -left-[30px] size-2.5 rounded-full border-2 border-white md:-left-[38px] dark:border-black",
          isCurrent ? "bg-orange-500" : "bg-neutral-300 dark:bg-neutral-600",
        )}
      />

      <div className="flex items-start gap-3">
        <CompanyMark
          logo={companyLogo}
          initials={initials}
          background={logoBackground}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-ink-primary dark:text-ink-primary-dark text-base leading-6 font-semibold tracking-tight">
              {role}
            </h3>
            {isCurrent && (
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] leading-4 font-medium text-emerald-700 dark:text-emerald-400">
                Current
              </span>
            )}
          </div>
          <p className="text-ink-primary dark:text-ink-primary-dark text-sm">
            {companyName}
            {employmentType ? ` · ${employmentType}` : ""}
          </p>
          <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
            {dateRange({ start, end })}
            {duration ? ` · ${duration}` : ""}
          </p>
          {location && (
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {location}
            </p>
          )}
        </div>
      </div>

      <p className="text-ink-primary dark:text-ink-primary-dark mt-4 text-sm">
        {summary}
      </p>

      {bullets.length > 0 && (
        <ul className="text-ink-secondary dark:text-ink-secondary-dark mt-3 list-disc space-y-1.5 pl-4 text-sm marker:text-neutral-400">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {techStack.length > 0 && (
        <AvatarGroup
          className="mt-4 cursor-pointer select-none"
          avatarUrls={techAvatars(techStack)}
        />
      )}

      {skills && skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="dark:text-ink-secondary-dark rounded-md bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-600 dark:text-neutral-400">Built:</span>
          {projects.map((project) => (
            <Link
              key={project}
              href="/projects"
              className="text-ink-primary dark:text-ink-primary-dark rounded-full border border-neutral-200 px-2.5 py-1 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              {project}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
};

export default WorkCard;
