"use client";
import { motion } from "motion/react";

const BlogSummaryPoint = ({ summary }: { summary: string }) => {
  return (
    <div className="text-sm text-neutral-900! dark:text-neutral-100!">
      <span className="flex flex-wrap gap-1 leading-tight">
        {summary?.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 5, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: i * 0.05,
              duration: 0.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </div>
  );
};

export default BlogSummaryPoint;
