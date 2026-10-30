"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={cn(
        "text-ink-primary dark:text-ink-primary-dark text-2xl font-bold tracking-tighter md:text-4xl",
        className,
      )}
    >
      {children}
    </motion.h1>
  );
};
