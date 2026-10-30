import { Para } from "@/components/para";
import { Block } from "@/components/block";
import { Heading } from "@/components/heading";

const ProjectHeroSection = () => {
  return (
    <Block className="mt-0 border-0 pt-0 shadow-[none] dark:shadow-[none]">
      <Heading priority>Projects</Heading>
      <Para priority className="max-w-lg pt-4 text-sm md:text-base">
        Matching engines, exchange connectors and API backends: the Rust systems
        I&apos;ve designed and shipped, each shown with its architecture and key
        numbers.
      </Para>
    </Block>
  );
};

export default ProjectHeroSection;
