"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const baseClass =
  "text-ink-primary dark:text-ink-primary-dark text-2xl font-bold tracking-tighter md:text-4xl";

export const Heading = ({
  children,
  className,
  priority = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Above the fold: reveal with CSS so the text paints before hydration. */
  priority?: boolean;
}) => {
  if (priority) {
    return (
      <h1
        className={cn(
          baseClass,
          "animate-reveal motion-reduce:animate-none",
          className,
        )}
      >
        {children}
      </h1>
    );
  }

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={cn(baseClass, className)}
    >
      {children}
    </motion.h1>
  );
};
