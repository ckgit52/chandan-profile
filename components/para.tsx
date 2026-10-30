"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const Para = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={cn(
        "text-ink-secondary dark:text-ink-secondary-dark text-sm",
        className,
      )}
    >
      {children}
    </motion.p>
  );
};
