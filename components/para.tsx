"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const baseClass = "text-ink-secondary dark:text-ink-secondary-dark text-sm";

export const Para = ({
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
      <p
        className={cn(
          baseClass,
          "animate-reveal motion-reduce:animate-none",
          className,
        )}
      >
        {children}
      </p>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={cn(baseClass, className)}
    >
      {children}
    </motion.p>
  );
};
