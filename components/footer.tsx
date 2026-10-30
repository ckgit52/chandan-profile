"use client";

import { Block } from "./block";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Signature } from "./ui/signature";
import { PROFILE } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/socials";

const Footer = () => {
  return (
    <Block>
      <Signature
        text={PROFILE.name}
        fontSize={15}
        duration={7}
        inView={true}
        className="mx-auto mb-7"
      />
      <div className="text-ink-secondary dark:text-ink-secondary-dark flex items-center justify-between gap-2 text-xs">
        <p>
          &copy;{" "}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          <span className="text-ink-primary dark:text-ink-primary-dark font-medium">
            {PROFILE.name}
          </span>
          . Built with Next.js.
        </p>
        <div className="flex items-center gap-2">
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
    </Block>
  );
};

export default Footer;
