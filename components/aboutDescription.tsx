"use client";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/data/profile";

const AboutDescription = () => {
  const pathname = usePathname();

  return <>{pathname === "/about" ? PROFILE.about : PROFILE.intro}</>;
};

export default AboutDescription;
