"use client";

import { motion } from "framer-motion";

export function RippleWaveLoader({ className }: { className?: string } = {}) {
  return (
    <div
      className={
        className ??
        "flex min-h-[300px] w-full items-center justify-center space-x-1 py-16"
      }
    >
      {[...Array(7)].map((_, index) => (
        <motion.div
          key={index}
          className="h-6 w-0.5 rounded-full bg-neutral-800 dark:bg-neutral-200"
          animate={{
            scaleY: [0.5, 1.5, 0.5],
            scaleX: [1, 0.8, 1],
            translateY: ["0%", "-15%", "0%"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}
