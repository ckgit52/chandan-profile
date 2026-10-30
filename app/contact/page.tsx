"use client";

import ContactHeroSection from "@/sections/ContactHeroSection";
import ContactContactFormSection from "@/sections/ContactContactFormSection";

const ContactPage = () => {
  return (
    <div className="m-auto max-w-lg">
      <ContactHeroSection />
      <ContactContactFormSection />
    </div>
  );
};

export default ContactPage;
