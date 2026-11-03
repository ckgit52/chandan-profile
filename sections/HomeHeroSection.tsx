import { Block } from "@/components/block";
import { Heading } from "@/components/heading";
import { Para } from "@/components/para";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { NavbarLogo } from "@/components/ui/resizable-navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { NativeMagnetic } from "@/components/ui/native-magnetic-shadcnui";
import { Button } from "@/components/ui/button";
import AboutDescription from "@/components/aboutDescription";
import { Download01 } from "@/components/animate-ui/icons/hugeicons/download-01";
import { ArrowRight02 } from "@/components/animate-ui/icons/hugeicons/arrow-right-02";
import { HERO_WORDS, PROFILE } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/socials";
import { techAvatars } from "@/components/tech-icons";

const HomeHeroSection = () => {
  return (
    <Block className="-mt-70 mb-10 border-0 pt-0 shadow-[none] md:-mt-50 md:mb-15 dark:shadow-[none]">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex flex-col justify-center gap-4">
          <NavbarLogo className="h-30 w-30" />
          <div className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.link}
                    target={link.link.startsWith("http") ? "_blank" : undefined}
                    aria-label={link.name}
                    className="h-4 w-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    {link.Icon}
                  </Link>
                </TooltipTrigger>

                <TooltipContent className="z-50">
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <Heading priority>{PROFILE.name}</Heading>

            <LayoutTextFlip
              items={HERO_WORDS.map(({ text, tech }) => ({
                text,
                avatars: techAvatars(tech),
              }))}
            />
          </div>
          <Para
            priority
            className="max-w-lg pt-4 text-center text-sm text-black/80 md:text-left md:text-base dark:text-white/80"
          >
            <AboutDescription />
          </Para>

          <div className="mt-6 flex items-center justify-center gap-2 sm:flex-row md:items-start md:justify-start">
            <Link href={"/contact"} className="flex items-center gap-2">
              <NativeMagnetic className="w-full sm:w-fit">
                <Button className="w-full">
                  Start a Conversation{" "}
                  <ArrowRight02 animateOnHover data-icon="inline-end" />
                </Button>
              </NativeMagnetic>
            </Link>
            <NativeMagnetic className="w-full sm:w-fit">
              {/* A plain anchor: next/link would prefetch the whole PDF on load. */}
              <a href={PROFILE.resumeUrl} download>
                <Button variant={"outline"} className="w-full">
                  Download CV
                  <Download01 animateOnHover />
                </Button>
              </a>
            </NativeMagnetic>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default HomeHeroSection;
