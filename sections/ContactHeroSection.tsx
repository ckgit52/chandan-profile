import { Para } from "@/components/para";
import { Block } from "@/components/block";
import { Heading } from "@/components/heading";
import { PROFILE } from "@/data/profile";
import { CopyEmail } from "@/components/copy-email";

const ContactHeroSection = () => {
  return (
    <Block className="mt-0 border-0 pt-0 shadow-[none] dark:shadow-[none]">
      <Heading priority>Contact Me</Heading>
      <Para priority className="max-w-lg pt-4 text-sm md:text-base">
        Have a backend, systems or trading-infrastructure project in mind? Send
        a message below or write to me directly.
      </Para>
      <div className="mt-3 flex items-center gap-2">
        <a
          href={`mailto:${PROFILE.email}`}
          className="text-ink-primary dark:text-ink-primary-dark text-sm font-medium underline underline-offset-4 md:text-base"
        >
          {PROFILE.email}
        </a>
        <CopyEmail email={PROFILE.email} />
      </div>
    </Block>
  );
};

export default ContactHeroSection;
