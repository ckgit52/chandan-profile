"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";

export type FloatingDockItem = {
  title?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  separator?: boolean;
};

function useIsMobile(breakpoint = 768): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
    },
    () => false,
  );
}

export const FloatingDock = ({
  items,
  desktopClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
}) => {
  return <FloatingDockDesktop items={items} className={desktopClassName} />;
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={isMobile ? undefined : (e) => mouseX.set(e.clientX)}
      onMouseLeave={isMobile ? undefined : () => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-2 rounded-2xl border border-neutral-900/10 bg-neutral-100 px-2.5 pb-3 shadow-2xl md:gap-3 md:px-3.5 dark:border-neutral-300/20 dark:bg-neutral-100/20 dark:backdrop-blur-xl",
        className,
      )}
    >
      {items.map((item, idx) => {
        if (item.separator) {
          return (
            <div
              key={`separator-${idx}`}
              role="separator"
              aria-orientation="vertical"
              className="mx-0.5 mb-2 h-6 w-px shrink-0 self-end bg-neutral-500"
            />
          );
        }

        return (
          <IconContainer
            mouseX={mouseX}
            key={item.title || `item-${idx}`}
            title={item.title || ""}
            icon={item.icon}
            href={item.href}
            onClick={item.onClick}
            isMobile={isMobile}
          />
        );
      })}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  isMobile = false,
}: {
  mouseX: MotionValue;
  title: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isMobile?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 76, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 76, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 38, 20],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 38, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const isExternal = href && (href.startsWith("http") || href.startsWith("//"));

  const handleClick = (e: React.MouseEvent) => {
    const btn = ref.current?.querySelector("button");
    if (btn) {
      if (!btn.contains(e.target as Node)) {
        btn.click();
      }
      return;
    }
    onClick?.();
  };

  const motionCircle = (
    <motion.div
      ref={ref}
      onClick={!href ? handleClick : undefined}
      style={{
        width: isMobile ? 40 : width,
        height: isMobile ? 40 : height,
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      aria-label={!href ? title : undefined}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-full border border-neutral-900/10 bg-neutral-100/80 text-neutral-100 backdrop-blur-md transition-colors dark:border-neutral-100/10 dark:bg-neutral-950/10 dark:backdrop-blur-lg",
        !isMobile && "hover:text-white dark:hover:text-black",
      )}
    >
      <AnimatePresence>
        {hovered && title && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="bg-foreground text-background pointer-events-none absolute -top-8 left-1/2 w-fit rounded-md px-3 py-1.5 text-xs font-medium text-balance whitespace-pre"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{
          width: isMobile ? 20 : widthIcon,
          height: isMobile ? 20 : heightIcon,
        }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={title}
      >
        {motionCircle}
      </Link>
    );
  }

  return motionCircle;
}
