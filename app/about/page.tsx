import type { Metadata } from "next";
import { CallToAction } from "@/components/ui/cta";
import FocusSection from "@/sections/FocusSection";
import SkillsSection from "@/sections/SkillsSection";
import TechStackSection from "@/sections/TechStackSection";
import EducationSection from "@/sections/EducationSection";
import HighlightsSection from "@/sections/HighlightsSection";
import HomeCompaniesSection from "@/sections/HomeCompaniesSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rust backend developer: what I build, the stack I work with, experience at Webcom Systems and education.",
};

const AboutPage = () => {
  return (
    <div>
      <FocusSection />
      <TechStackSection />
      <HighlightsSection />
      <SkillsSection />
      <HomeCompaniesSection />
      <EducationSection />
      <CallToAction />
    </div>
  );
};

export default AboutPage;
