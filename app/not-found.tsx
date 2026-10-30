"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Block } from "@/components/block";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

const ROUTES = ["/", "/projects", "/about", "/blog", "/contact"];

export default function NotFound() {
  const pathname = usePathname();

  return (
    <Block className="mt-0 border-0 pt-0 shadow-[none] dark:shadow-[none]">
      <Heading priority>Page not found</Heading>

      <pre className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-xs leading-relaxed text-neutral-800 md:text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <span className="font-semibold text-red-600 dark:text-red-400">
          error[E0404]
        </span>
        {`: cannot find page \`${pathname}\` in this scope\n`}
        <span className="text-sky-700 dark:text-sky-300">{"  --> "}</span>
        {"portfolio/src/routes.rs\n"}
        <span className="text-sky-700 dark:text-sky-300">{"   = "}</span>
        <span className="font-semibold text-emerald-700 dark:text-emerald-300">
          help
        </span>
        {`: available routes: ${ROUTES.join(", ")}`}
      </pre>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">See projects</Link>
        </Button>
      </div>
    </Block>
  );
}
