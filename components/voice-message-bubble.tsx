"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceMessageBubbleProps {
  text: string;
  className?: string;
}

export default function VoiceMessageBubble({
  text,
  className,
}: VoiceMessageBubbleProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const words = text.split(" ").length;
  const duration = (words / 150) * 60;

  const speak = () => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    setIsPlaying(true);

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent >= 100 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 200);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const togglePlay = () => {
    if (isPlaying) stop();
    else speak();
  };

  const [barCount, setBarCount] = React.useState(90);

  React.useEffect(() => {
    const updateBars = () => {
      if (window.innerWidth >= 1024) {
        setBarCount(150);
      } else {
        setBarCount(60);
      }
    };

    updateBars();
    window.addEventListener("resize", updateBars);

    return () => window.removeEventListener("resize", updateBars);
  }, []);

  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }).map(
      (_, i) => 4 + (((i * 7 + 3) % 11) / 10) * 12,
    );
  }, [barCount]);

  return (
    <div
      className={cn(
        "mb-4 flex items-center gap-1 rounded-full bg-neutral-100 p-1 shadow-sm dark:bg-neutral-800",
        className,
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={togglePlay} className="rounded-full p-2.5!">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
        </TooltipTrigger>

        <TooltipContent className="z-50">
          <p>{isPlaying ? "Pause" : "Play"}</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex h-5 w-full items-center gap-0.5 overflow-hidden">
        {bars.map((height, i) => {
          const barPercent = (i / bars.length) * 100;
          const isActive = barPercent <= progress;

          return (
            <span
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-150",
                isActive ? "bg-black dark:bg-white" : "bg-neutral-300 dark:bg-neutral-600",
              )}
              style={{
                height: `${height}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
