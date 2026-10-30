"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Sun03 } from "../animate-ui/icons/hugeicons/sun-03";
import { Moon02 } from "../animate-ui/icons/hugeicons/moon-02";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  size?: number;
  iconClassName?: string;
}

const emptySubscribe = () => () => {};

export const AnimatedThemeToggler = ({
  className,
  duration = 500,
  size = 15,
  iconClassName,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = isDark ? "light" : "dark";

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();

    const x = left + width / 2;
    const y = top + height / 2;

    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, duration, setTheme]);

  if (!mounted) return null;

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "text-ink-secondary cursor-pointer rounded-md p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800",
        className,
      )}
      {...props}
    >
      {isDark ? (
        <Sun03
          animateOnHover
          size={size}
          className={cn("transition-transform", iconClassName)}
        />
      ) : (
        <Moon02
          animateOnHover
          size={size}
          className={cn("transition-transform", iconClassName)}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
