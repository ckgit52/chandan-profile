"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const SectionHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative w-fit max-w-lg bg-neutral-100 px-2 py-1 text-sm leading-none font-normal text-neutral-500 md:text-base dark:bg-neutral-800 dark:text-neutral-300",
        className,
      )}
    >
      <div className="absolute -top-px -left-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
      <div className="absolute -top-px -right-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
      <div className="absolute -bottom-px -left-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
      <div className="absolute -right-px -bottom-px h-1 w-1 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
      {children}
    </motion.h2>
  );
};
