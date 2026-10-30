import { Block } from "@/components/block";
import { SectionHeading } from "@/components/section-heading";
import WorkCard from "@/components/word-card";
import { WORK_COMPANIES } from "@/data/work-experiences";

const HomeCompaniesSection = () => {
  return (
    <Block>
      <SectionHeading className="mb-6">Experience</SectionHeading>
      <div className="flex flex-col gap-6">
        {WORK_COMPANIES.map((company) => (
          <WorkCard key={company.companyName} {...company} />
        ))}
      </div>
    </Block>
  );
};

export default HomeCompaniesSection;
