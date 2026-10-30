"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const CountUp = ({
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const text = useTransform(
    value,
    (latest) => `${prefix}${Math.round(latest)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
};
