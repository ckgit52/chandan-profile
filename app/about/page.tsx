import { CallToAction } from "@/components/ui/cta";
import SkillsSection from "@/sections/SkillsSection";
import TechStackSection from "@/sections/TechStackSection";
import EducationSection from "@/sections/EducationSection";
import HighlightsSection from "@/sections/HighlightsSection";
import HomeCompaniesSection from "@/sections/HomeCompaniesSection";

const AboutPage = () => {
  return (
    <div>
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
