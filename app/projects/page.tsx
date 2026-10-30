import type { Metadata } from "next";
import { CallToAction } from "@/components/ui/cta";
import ProjectHeroSection from "@/sections/ProjectHeroSection";
import ProjectProjectsSection from "@/sections/ProjectProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Rust systems I've built: a futures matching engine, a 50+ exchange connector framework, an Actix-Web API backend and a trading bot.",
};

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
