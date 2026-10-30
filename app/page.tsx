import { CallToAction } from "@/components/ui/cta";
import LogoCarousel from "@/components/ui/logo-carousel";
import HomeBlogSection from "@/sections/HomeBlogSection";
import HighlightsSection from "@/sections/HighlightsSection";
import HomeProjectsSection from "@/sections/HomeProjectsSection";
import HomeCompaniesSection from "@/sections/HomeCompaniesSection";

export default function Home() {
  return (
    <div>
      <HomeProjectsSection />
      <HighlightsSection />
      <HomeCompaniesSection />
      <LogoCarousel />
      <HomeBlogSection />
      <CallToAction />
    </div>
  );
}
