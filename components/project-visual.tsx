import { Fragment } from "react";
import { PROJECT_PROPS } from "@/types/types";

type ProjectVisualProps = Pick<PROJECT_PROPS, "flow" | "metrics" | "accent">;

/**
 * Two stacked 150px panels: the request path on top, headline numbers below.
 * The parent card needs the `group` class; hovering slides to the second panel.
 */
export const ProjectVisual = ({
  flow,
  metrics,
  accent,
}: ProjectVisualProps) => {
  return (
    <div className="relative h-37.5 w-full overflow-hidden rounded-lg bg-neutral-950 ring-1 ring-white/10">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(110% 80% at 50% 0%, ${accent}38, transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="[@media(hover:none)]:animate-panel-swap relative transition-transform duration-700 ease-in-out group-hover:-translate-y-37.5 motion-reduce:animate-none">
        <div className="flex h-37.5 flex-col items-center justify-center">
          {flow.map((node, i) => {
            const last = i === flow.length - 1;
            return (
              <Fragment key={node}>
                <div
                  className="rounded-md border px-2 py-1 font-mono text-[11px] leading-4 font-medium whitespace-nowrap text-neutral-100"
                  style={{
                    borderColor: `${accent}${last ? "cc" : "55"}`,
                    backgroundColor: `${accent}${last ? "33" : "14"}`,
                  }}
                >
                  {node}
                </div>
                {!last && (
                  <div
                    aria-hidden
                    className="relative h-3 w-px"
                    style={{ backgroundColor: `${accent}66` }}
                  >
                    <span
                      className="animate-flow absolute left-1/2 size-1 -translate-x-1/2 rounded-full"
                      style={{
                        backgroundColor: accent,
                        animationDelay: `${i * 0.35}s`,
                      }}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="grid h-37.5 grid-cols-2 grid-rows-2 gap-px bg-white/10">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center justify-center bg-neutral-950/90"
            >
              <span
                className="text-lg leading-none font-bold tracking-tight"
                style={{ color: accent }}
              >
                {metric.value}
              </span>
              <span className="mt-1 text-[10px] tracking-wider text-neutral-400 uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
