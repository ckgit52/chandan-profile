import { Block } from "@/components/block";
import { Para } from "@/components/para";
import { SectionHeading } from "@/components/section-heading";
import { EDUCATION } from "@/data/education";

const EducationSection = () => {
  return (
    <Block>
      <SectionHeading className="mb-6">Education</SectionHeading>
      <div className="flex flex-col gap-6">
        {EDUCATION.map((item) => (
          <div key={item.institution}>
            <h3 className="text-ink-primary dark:text-ink-primary-dark mb-2 font-semibold tracking-tight">
              {item.institution}
              <span className="text-ink-secondary dark:text-ink-secondary-dark ml-2 text-sm font-normal">
                {item.location}
              </span>
            </h3>
            <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
              <Para className="text-ink-primary dark:text-ink-primary-dark tracking-tight">
                {item.degree}
              </Para>
              <Para>{item.duration}</Para>
            </div>
            <Para>CGPA: {item.cgpa}</Para>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.courses.map((course) => (
                <span
                  key={course}
                  className="text-ink-secondary dark:text-ink-secondary-dark rounded-md bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Block>
  );
};

export default EducationSection;
