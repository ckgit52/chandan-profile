import { Block } from "@/components/block";
import { SectionHeading } from "@/components/section-heading";
import WorkCard from "@/components/word-card";
import { WORK_COMPANIES } from "@/data/work-experiences";
import { durationLabel, formatMonthYear } from "@/lib/experience";

// Oldest role that used Rust (the list is newest first).
const rustJobs = WORK_COMPANIES.filter((job) => job.techStack.includes("Rust"));
const rustSince = rustJobs[rustJobs.length - 1]?.start;

const HomeCompaniesSection = () => {
  return (
    <Block>
      <SectionHeading className="mb-3">Experience</SectionHeading>
      {rustSince && (
        <p className="text-ink-secondary dark:text-ink-secondary-dark mb-8 text-sm">
          Rust developer since {formatMonthYear(rustSince)}
          {durationLabel(rustSince, null)
            ? ` · ${durationLabel(rustSince, null)}`
            : ""}
        </p>
      )}
      <ol className="flex flex-col gap-10 border-l border-neutral-200 pl-6 md:pl-8 dark:border-neutral-800">
        {WORK_COMPANIES.map((job) => (
          <li key={`${job.companyName}-${job.role}`}>
            <WorkCard {...job} />
          </li>
        ))}
      </ol>
    </Block>
  );
};

export default HomeCompaniesSection;
