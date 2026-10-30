import { Block } from "@/components/block";
import { CountUp } from "@/components/count-up";
import { SectionHeading } from "@/components/section-heading";
import { STATS } from "@/data/profile";

const HighlightsSection = () => {
  return (
    <Block>
      <SectionHeading className="mb-6">Impact in numbers</SectionHeading>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-100 bg-neutral-100 md:grid-cols-4 dark:border-neutral-900 dark:bg-neutral-900">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 bg-white p-4 dark:bg-black"
          >
            <span className="text-ink-primary dark:text-ink-primary-dark text-2xl font-bold tracking-tighter md:text-3xl">
              <CountUp
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </span>
            <span className="text-ink-primary dark:text-ink-primary-dark text-sm font-medium tracking-tight">
              {stat.label}
            </span>
            <span className="text-ink-secondary dark:text-ink-secondary-dark text-xs">
              {stat.detail}
            </span>
          </div>
        ))}
      </div>
    </Block>
  );
};

export default HighlightsSection;
