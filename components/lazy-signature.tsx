"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { cn } from "@/lib/utils";
import type { Signature as SignatureType } from "@/components/ui/signature";

// The signature pulls in opentype.js and a 98 KB font. It sits in the footer,
// so only fetch both once the footer is about to scroll into view.
const Signature = lazy(() =>
  import("@/components/ui/signature").then((m) => ({ default: m.Signature })),
);

type SignatureProps = ComponentProps<typeof SignatureType>;

/** Same box the real signature renders before its font arrives, so nothing shifts. */
const Placeholder = ({
  fontSize = 32,
  className,
  svgRef,
}: Pick<SignatureProps, "fontSize" | "className"> & {
  svgRef?: React.Ref<SVGSVGElement>;
}) => (
  <svg
    ref={svgRef}
    width={300}
    height={fontSize * 3}
    aria-hidden="true"
    className={cn("text-foreground overflow-visible", className)}
  />
);

export function LazySignature(props: SignatureProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!near) {
    return (
      <Placeholder
        svgRef={ref}
        fontSize={props.fontSize}
        className={props.className}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <Placeholder fontSize={props.fontSize} className={props.className} />
      }
    >
      <Signature {...props} />
    </Suspense>
  );
}
