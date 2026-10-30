"use client";

import { MotionConfig } from "motion/react";

/** Honour the visitor's "reduce motion" setting for all motion animations. */
export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
