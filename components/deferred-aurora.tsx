"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { AuroraProps } from "@/components/Aurora";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

/**
 * The aurora is decoration. Start it once the page has loaded and the browser
 * is idle, so the WebGL setup never competes with the first paint, and render
 * it at 1x (the glow is soft, so retina resolution only costs GPU time).
 */
export default function DeferredAurora(props: AuroraProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => setReady(true);
    const whenIdle = () => {
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timer = setTimeout(start, 600);
      }
    };

    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      window.removeEventListener("load", whenIdle);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="aurora-fallback" data-ready={ready} aria-hidden="true" />
      {ready ? <Aurora dpr={1} {...props} /> : null}
    </>
  );
}
