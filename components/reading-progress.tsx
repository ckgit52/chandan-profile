"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin bar at the top of the viewport that fills as the post is read. */
export const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-90 h-0.5 origin-left bg-orange-500"
    />
  );
};
