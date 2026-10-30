"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  motion,
  Transition,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export interface NativeMagneticProps {
  children: React.ReactNode;
  strength?: number;
  stiffness?: number;
  damping?: number;
  scaleOnHover?: boolean;
  as?: "div" | "button" | "a";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

const MotionButton = motion.create(Button);

export function NativeMagnetic({
  children,
  strength = 0.05,
  stiffness = 600,
  damping = 60,
  scaleOnHover = false,
  as = "div",
  href,
  onClick,
  className,
}: NativeMagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const [, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness, damping };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const translateX = useTransform(springX, (v) => v * strength);
  const translateY = useTransform(springY, (v) => v * strength);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const commonMotionProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    style: {
      x: translateX,
      y: translateY,
    },
    whileHover: scaleOnHover ? { scale: 1.05 } : undefined,
    whileTap: { scale: 0.95 },
    transition: springTransition,
  };

  if (as === "a" && href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cn("inline-block cursor-pointer", className)}
        onClick={onClick}
        {...commonMotionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (as === "button") {
    return (
      <MotionButton
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        variant="default"
        className={cn("inline-block cursor-pointer", className)}
        onClick={onClick}
        {...commonMotionProps}
      >
        {children}
      </MotionButton>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("inline-block cursor-pointer", className)}
      onClick={onClick}
      {...commonMotionProps}
    >
      {children}
    </motion.div>
  );
}
