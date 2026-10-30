"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { AvatarGroup, type Avatar } from "@/components/ui/avatar-group";
export interface FlipItem {
  text: string;
  avatars?: Avatar[];
}

export type LayoutTextFlipWord = string | FlipItem;

export interface LayoutTextFlipProps {
  words?: LayoutTextFlipWord[];
  items?: FlipItem[];
  duration?: number;
  className?: string;
  bare?: boolean;
}

export const LayoutTextFlip = ({
  words = [""],
  items,
  duration = 3000,
  className,
  bare = true,
}: LayoutTextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const rawList = items && items.length > 0 ? items : words;

  const normalizedItems: FlipItem[] = rawList.map((entry) => {
    if (typeof entry === "string") {
      return { text: entry, avatars: [] };
    }
    return {
      text: entry.text,
      avatars: entry.avatars ?? [],
    };
  });

  useEffect(() => {
    if (normalizedItems.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % normalizedItems.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, normalizedItems.length, isPaused]);

  const currentItem = normalizedItems[currentIndex] || {
    text: "",
    avatars: [],
  };

  return (
    <motion.span
      layout
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative w-fit overflow-hidden rounded-sm bg-orange-100 px-2 py-1 text-sm backdrop-blur-sm md:bg-white/70 dark:bg-neutral-100/10",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentIndex}
          initial={{ y: -40, filter: "blur(20px)", opacity: 0 }}
          animate={{
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
          }}
          exit={{ y: 50, filter: "blur(20px)", opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="inline-flex items-center gap-2 whitespace-nowrap"
        >
          {currentItem.avatars && currentItem.avatars.length > 0 && (
            <AvatarGroup
              avatarUrls={currentItem.avatars}
              showNameOnHover={false}
              bare={bare}
            />
          )}
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {currentItem.text}
          </span>
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};
