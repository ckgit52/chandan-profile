import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const SharpBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)] relative my-8 flex items-center justify-between space-x-2 border-y bg-neutral-50 px-4 py-8 md:space-x-4 dark:bg-transparent">
      <DecorIcon className="m-0 size-4" position="top-left" />
      <DecorIcon className="m-0 size-4" position="top-right" />
      <DecorIcon className="m-0 size-4" position="bottom-left" />
      <DecorIcon className="m-0 size-4" position="bottom-right" />

      <div className="pointer-events-none absolute -inset-y-6 -left-px m-0 w-px border-l" />
      <div className="pointer-events-none absolute -inset-y-6 -right-px m-0 w-px border-r" />

      <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />
      {children}
    </div>
  );
};

const DecorIconVariants = cva(
  "pointer-events-none absolute z-1 size-5 shrink-0 stroke-1 stroke-muted-foreground",
  {
    variants: {
      position: {
        "top-left":
          "top-0 left-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]",
        "top-right":
          "top-0 right-0 translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]",
        "bottom-right":
          "right-0 bottom-0 translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]",
        "bottom-left":
          "bottom-0 left-0 -translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]",
      },
    },
    defaultVariants: {
      position: "top-left",
    },
  },
);

type DecorIconProps = React.ComponentProps<"svg"> &
  VariantProps<typeof DecorIconVariants>;

function DecorIcon({ position, className, ...props }: DecorIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(DecorIconVariants({ position, className }))}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default SharpBox;
