import { Block } from "@/components/block";
import { PROJECTS_DATA } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

const ProjectProjectsSection = () => {
  return (
    <Block>
      <SectionHeading className="mb-6">Systems I&apos;ve built</SectionHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.slug}
            index={index}
            project={project}
            detailed
          />
        ))}
      </div>
    </Block>
  );
};

export default ProjectProjectsSection;
