"use client";

import { Para } from "./para";
import { AvatarGroup } from "./ui/avatar-group";
import { motion } from "motion/react";
import { Pointer } from "./ui/pointer";
import { ProjectVisual } from "./project-visual";
import { techAvatars } from "./tech-icons";
import { PROJECT_PROPS } from "@/types/types";

interface ProjectCardProps {
  index: number;
  project: PROJECT_PROPS;
  /** Show the full list of highlights (projects page) instead of the summary. */
  detailed?: boolean;
}

export const ProjectCard = ({
  index,
  project,
  detailed = false,
}: ProjectCardProps) => {
  const { title, domain, description, highlights, techStack, accent } = project;

  return (
    <div>
      <Pointer className="fill-orange-500" title={title} />

      <motion.div
        className="h-full list-none"
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.1,
          duration: 0.3,
        }}
      >
        <div className="group relative h-full overflow-hidden rounded-xl border border-neutral-100 p-2 dark:border-neutral-900">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-10 h-32 opacity-25 blur-3xl dark:opacity-30"
            style={{ backgroundColor: accent }}
          />

          <div className="relative flex h-full flex-col gap-4">
            <ProjectVisual
              flow={project.flow}
              metrics={project.metrics}
              accent={accent}
            />
            <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
              <div>
                {/* Darkened on light backgrounds (the raw accents are 1.8-3.9:1 on white). */}
                <span
                  className="text-[10px] font-medium tracking-wider text-[color:color-mix(in_oklab,var(--accent)_70%,black)] uppercase dark:text-[color:var(--accent)]"
                  style={{ "--accent": accent } as React.CSSProperties}
                >
                  {domain}
                </span>
                <h3 className="text-ink-primary dark:text-ink-primary-dark mt-0.5 text-base leading-5 font-medium tracking-tight">
                  {title}
                </h3>
              </div>
              <Para className="tracking-tight">{description}</Para>
              {detailed && (
                <ul className="text-ink-secondary dark:text-ink-secondary-dark list-disc space-y-1.5 pl-4 text-xs marker:text-neutral-400">
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              <AvatarGroup
                className="mt-auto pt-2 select-none"
                avatarUrls={techAvatars(techStack)}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
