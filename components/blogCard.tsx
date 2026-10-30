"use client";

import { cn } from "@/lib/utils";
import { BLOG_CARDS_PROPS } from "@/types/types";
import Link from "next/link";
import { Para } from "./para";
import { motion } from "motion/react";

export const BlogGridCard = ({
  slug,
  title,
  description,
  date,
  readingTime,
  index = 0,
}: BLOG_CARDS_PROPS) => {
  return (
    <Link href={`/blog/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.1,
          duration: 0.3,
        }}
        className={cn(
          "group/feature relative flex h-full flex-col py-5 pt-0 md:border-r md:py-5 dark:border-neutral-800",
          (index === 0 || index === 3) && "md:border-l dark:border-neutral-800",
          index < 3 && "md:border-b dark:border-neutral-800",
        )}
      >
        {index < 3 && (
          <div className="pointer-events-none absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
        )}
        {index >= 3 && (
          <div className="pointer-events-none absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
        )}

        <div className="relative z-10 mb-2 px-5 text-lg font-bold md:px-5">
          <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-orange-500 dark:bg-neutral-700" />
          <span className="text-ink-primary dark:text-ink-primary-dark sm:text-md inline-block text-base leading-tight font-bold transition duration-200 group-hover/feature:translate-x-2">
            {title}
          </span>
        </div>
        <div className="relative z-10 mb-2 px-5 text-xs text-neutral-600 md:px-5 dark:text-neutral-400">
          {date}
          {readingTime ? ` · ${readingTime} min read` : ""}
        </div>

        <Para className="relative z-10 max-w-xs px-5 text-sm md:px-5">
          {description}
        </Para>
      </motion.div>
    </Link>
  );
};
