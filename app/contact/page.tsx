import type { Metadata } from "next";
import ContactHeroSection from "@/sections/ContactHeroSection";
import ContactContactFormSection from "@/sections/ContactContactFormSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about Rust backend, systems and trading-infrastructure work.",
};

const ContactPage = () => {
  return (
    <div className="m-auto max-w-lg">
      <ContactHeroSection />
      <ContactContactFormSection />
    </div>
  );
};

export default ContactPage;
