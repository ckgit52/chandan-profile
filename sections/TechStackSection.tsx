import { Block } from "@/components/block";
import { SectionHeading } from "@/components/section-heading";
import { TechStake } from "@/components/techStake";

const TechStackSection = () => {
  return (
    <Block>
      <SectionHeading className="mx-auto mb-6">
        The stack I work with
      </SectionHeading>
      <TechStake />
    </Block>
  );
};

export default TechStackSection;
