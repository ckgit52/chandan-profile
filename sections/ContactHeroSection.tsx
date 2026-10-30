import { Para } from "@/components/para";
import { Block } from "@/components/block";
import { Heading } from "@/components/heading";
import { PROFILE } from "@/data/profile";

const ContactHeroSection = () => {
  return (
    <Block className="mt-0 border-0 pt-0 shadow-[none] dark:shadow-[none]">
      <Heading>Contact Me</Heading>
      <Para className="max-w-lg pt-4 text-sm md:text-base">
        Have a backend, systems or trading-infrastructure project in mind? Send
        a message below or write to me directly.
      </Para>
      <a
        href={`mailto:${PROFILE.email}`}
        className="text-ink-primary dark:text-ink-primary-dark mt-3 inline-block text-sm font-medium underline underline-offset-4 md:text-base"
      >
        {PROFILE.email}
      </a>
    </Block>
  );
};

export default ContactHeroSection;
