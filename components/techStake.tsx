"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";
import { AnimatedBeam } from "./ui/animated-beam";
import { techIcon } from "./tech-icons";
import logo from "@/public/logo.jpg";
import { PROFILE } from "@/data/profile";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Circle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Circle.displayName = "Circle";

export function TechStake({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);
  const div11Ref = useRef<HTMLDivElement>(null);

  const TECHITEMSLEFT = [
    { ref: div1Ref, label: "Rust", icon: techIcon("Rust", "size-full") },
    {
      ref: div2Ref,
      label: "Actix-Web",
      icon: techIcon("Actix-Web", "size-full"),
    },
    { ref: div3Ref, label: "Axum", icon: techIcon("Axum", "size-full") },
    { ref: div4Ref, label: "Tokio", icon: techIcon("Tokio", "size-full") },
    { ref: div5Ref, label: "Serde", icon: techIcon("Serde", "size-full") },
  ];
  const TECHITEMSRIGHT = [
    {
      ref: div7Ref,
      label: "PostgreSQL",
      icon: techIcon("PostgreSQL", "size-full"),
    },
    { ref: div8Ref, label: "MongoDB", icon: techIcon("MongoDB", "size-full") },
    { ref: div9Ref, label: "Redis", icon: techIcon("Redis", "size-full") },
    { ref: div10Ref, label: "Kafka", icon: techIcon("Kafka", "size-full") },
    {
      ref: div11Ref,
      label: "NATS JetStream",
      icon: techIcon("NATS JetStream", "size-full"),
    },
  ];

  return (
    <div
      className={cn(
        "relative flex h-100 w-full items-center justify-center overflow-visible sm:p-10",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between sm:gap-10">
        <div className="flex flex-col justify-center gap-4">
          {TECHITEMSLEFT.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Circle ref={item.ref}>{item.icon}</Circle>
              </TooltipTrigger>

              <TooltipContent className="z-50">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-32 p-0">
            <Image
              src={logo}
              alt={PROFILE.name}
              width={150}
              height={150}
              className="rounded-full"
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-4">
          {TECHITEMSRIGHT.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Circle ref={item.ref}>{item.icon}</Circle>
              </TooltipTrigger>

              <TooltipContent className="z-50">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        endYOffset={-20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        endYOffset={-20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        endYOffset={-20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        endYOffset={-20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        curvature={130}
        endYOffset={5}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div8Ref}
        reverse
        endYOffset={5}
        curvature={65}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div9Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div10Ref}
        reverse
        curvature={-65}
        endYOffset={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div11Ref}
        reverse
        curvature={-130}
        endYOffset={5}
      />
    </div>
  );
}
