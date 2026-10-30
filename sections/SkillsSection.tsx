import { Block } from "@/components/block";
import { SectionHeading } from "@/components/section-heading";
import { techIcon } from "@/components/tech-icons";
import { SKILL_GROUPS } from "@/data/skills";

const SkillsSection = () => {
  return (
    <Block>
      <SectionHeading className="mb-6">Skills</SectionHeading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-ink-primary dark:text-ink-primary-dark mb-3 text-sm font-semibold tracking-tight">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-ink-secondary dark:text-ink-secondary-dark inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-xs transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700/60 dark:hover:text-neutral-100"
                >
                  {techIcon(item)}
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Block>
  );
};

export default SkillsSection;
