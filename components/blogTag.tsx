"use client";
import { motion } from "motion/react";

export const BlogTag = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: index * 0.1,
        duration: 0.3,
      }}
      className="dark:text-ink-secondary-dark cursor-pointer rounded bg-neutral-100 px-2 py-1 text-xs leading-tight text-neutral-600 transition-colors duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700/60 hover:dark:text-neutral-100"
    >
      {children}
    </motion.div>
  );
};
