"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import * as opentype from "opentype.js";
import { cn } from "@/lib/utils";

interface SignatureProps {
  text?: string;
  color?: string;
  fontSize?: number;
  duration?: number;
  delay?: number;
  delayBetweenLetters?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
  fontUrl?: string;
}

let cachedFont: opentype.Font | null = null;

type FontParser = (buffer: ArrayBuffer) => opentype.Font;

interface OpentypeWithParser {
  parse?: FontParser;
  default?: {
    parse?: FontParser;
  };
}

async function loadFont(urls: string[]): Promise<opentype.Font> {
  if (cachedFont) {
    return cachedFont;
  }

  const mod = opentype as unknown as OpentypeWithParser;
  const parseFont = mod.parse || mod.default?.parse;

  if (typeof parseFont !== "function") {
    throw new Error("opentype.parse is not available");
  }

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buffer = await res.arrayBuffer();
      const font = parseFont(buffer);
      if (font) {
        cachedFont = font;
        return font;
      }
    } catch {
    }
  }

  throw new Error("Font could not be loaded from any path");
}

export function Signature({
  text = "Signature",
  color = "currentColor",
  fontSize = 32,
  duration = 1.5,
  delay = 0,
  delayBetweenLetters,
  className,
  inView = true,
  once = true,
  fontUrl,
}: SignatureProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const height = fontSize * 3;
  const horizontalPadding = fontSize * 0.1;
  const topMargin = fontSize * 1.5;
  const baseline = topMargin;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const fontPaths = fontUrl
          ? [fontUrl]
          : [
              "/LastoriaBoldRegular.otf",
              "https://componentry.dev/LastoriaBoldRegular.otf",
            ];

        const font = await loadFont(fontPaths);

        let x = horizontalPadding;
        const newPaths: string[] = [];

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          newPaths.push(path.toPathData(3));

          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }

        if (isMounted) {
          setPaths(newPaths);
          setWidth(x + horizontalPadding);
        }
      } catch (error) {
        console.error("Signature component font load error:", error);
        if (isMounted) {
          setPaths([]);
          setWidth(text.length * fontSize * 0.6);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

  const letterCount = paths.filter((p) => p && p.trim() !== "").length || 1;
  const letterDuration = Math.max(0.2, duration / letterCount);
  const stepDelay =
    delayBetweenLetters !== undefined
      ? delayBetweenLetters
      : Math.max(0.06, letterDuration * 0.35);

  const delays: number[] = [];
  let currentDelay = delay;

  for (let i = 0; i < paths.length; i++) {
    delays.push(currentDelay);
    const isEmpty = !paths[i] || paths[i].trim() === "";
    if (isEmpty) {
      currentDelay += stepDelay * 0.5;
    } else {
      currentDelay += stepDelay;
    }
  }

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      key={`${text}-${paths.length}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("text-foreground overflow-visible", className)}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) => {
            if (!d) return null;
            const pathDelay = delays[i] ?? delay;
            return (
              <motion.path
                key={i}
                d={d}
                stroke="white"
                strokeWidth={fontSize * 0.22}
                fill="none"
                variants={variants}
                transition={{
                  pathLength: {
                    delay: pathDelay,
                    duration: letterDuration,
                    ease: "easeInOut",
                  },
                  opacity: {
                    delay: pathDelay,
                    duration: 0.01,
                  },
                }}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </mask>
      </defs>

      {paths.map((d, i) => {
        if (!d) return null;
        const pathDelay = delays[i] ?? delay;
        return (
          <motion.path
            key={i}
            d={d}
            stroke={color}
            strokeWidth={1}
            fill="none"
            variants={variants}
            transition={{
              pathLength: {
                delay: pathDelay,
                duration: letterDuration,
                ease: "easeInOut",
              },
              opacity: {
                delay: pathDelay,
                duration: 0.01,
              },
            }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      <g mask={`url(#${maskId})`}>
        {paths.map((d, i) => {
          if (!d) return null;
          return <path key={i} d={d} fill={color} />;
        })}
      </g>
    </motion.svg>
  );
}
