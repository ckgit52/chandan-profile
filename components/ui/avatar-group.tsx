"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface Avatar {
  icon: React.ReactNode;
  name: string;
}

export interface AvatarGroupProps {
  className?: string;
  avatarUrls: Avatar[];
  showNameOnHover?: boolean;
  bare?: boolean;
}

const AvatarGroup = ({
  className,
  avatarUrls,
  showNameOnHover = true,
  bare = false,
}: AvatarGroupProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNameOnHover || bare) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setHoveredIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showNameOnHover, bare]);

  const handleInteraction = (
    index: number,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    if (!showNameOnHover || bare) return;
    e.preventDefault();
    setHoveredIndex(hoveredIndex === index ? null : index);
  };

  if (bare) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "inline-flex items-center -space-x-1.5 rtl:space-x-reverse",
          className,
        )}
      >
        {avatarUrls.map((avatar, index) => (
          <span
            key={index}
            title={avatar.name}
            className="relative inline-flex shrink-0 items-center justify-center transition-transform duration-200 hover:z-20 hover:scale-115"
          >
            {avatar.icon}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("z-10 flex -space-x-2 rtl:space-x-reverse", className)}
    >
      {avatarUrls.map((avatar, index) => {
        const isHovered = showNameOnHover && hoveredIndex === index;
        const showName = isHovered;

        return (
          <div
            key={index}
            onMouseEnter={() => {
              if (showNameOnHover) setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              if (showNameOnHover) setHoveredIndex(null);
            }}
            onTouchEnd={(e) => handleInteraction(index, e)}
            onClick={(e) => handleInteraction(index, e)}
            className={cn(
              "relative flex touch-none items-center justify-center gap-0 rounded-full",
              "transition-all duration-500 ease-out",
              "hover:z-10",
              "border border-neutral-200 bg-neutral-100 p-0.5 dark:border-neutral-800 dark:bg-neutral-900",
              showName ? "pr-2" : "",
            )}
          >
            <div
              className={cn(
                "relative shrink-0 p-1",
                "flex size-6 items-center justify-center rounded-full object-cover",
                "transition-all duration-500 ease-out",
              )}
            >
              {avatar.icon}
            </div>

            {showNameOnHover && (
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  showName
                    ? "ml-1 grid-cols-[1fr] opacity-100"
                    : "ml-0 grid-cols-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <span
                    className={cn(
                      "block text-xs whitespace-nowrap",
                      "text-neutral-800 transition-colors duration-300 dark:text-neutral-200",
                    )}
                  >
                    {avatar.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { AvatarGroup };
