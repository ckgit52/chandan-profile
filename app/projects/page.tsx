import { CallToAction } from "@/components/ui/cta";
import ProjectHeroSection from "@/sections/ProjectHeroSection";
import ProjectProjectsSection from "@/sections/ProjectProjectsSection";

const ProjectsPage = () => {
  return (
    <div>
      <ProjectHeroSection />
      <ProjectProjectsSection />
      <CallToAction />
    </div>
  );
};

export default ProjectsPage;
