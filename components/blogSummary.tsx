"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { GenerateLoader } from "@/components/generateLoader";
import BlogSummaryPoint from "./blogSummaryPoint";

export default function BlogSummary({ content }: { content: string }) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateSummary() {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            mode: "summary",
            content,
          }),
        });

        const data = await res.json();
        setSummary(data.summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    generateSummary();
  }, [content]);

  return (
    <div className="mt-6 mb-2 rounded-2xl bg-[hsla(0,0%,100%,1)] bg-[radial-gradient(at_88%_40%,hsla(0,0%,100%,1)_0px,transparent_85%),radial-gradient(at_49%_30%,hsla(0,0%,100%,1)_0px,transparent_85%),radial-gradient(at_14%_26%,hsla(0,0%,100%,1)_0px,transparent_85%),radial-gradient(at_0%_64%,hsla(263,100%,90%,1)_0px,transparent_85%),radial-gradient(at_41%_94%,hsla(284,100%,95%,1)_0px,transparent_85%),radial-gradient(at_100%_99%,hsla(306,100%,90%,1)_0px,transparent_85%)] p-6 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.08)] dark:bg-[hsla(240,15%,9%,1)] dark:bg-[radial-gradient(at_88%_40%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_49%_30%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_14%_26%,hsla(240,15%,9%,1)_0px,transparent_85%),radial-gradient(at_0%_64%,hsla(263,93%,56%,1)_0px,transparent_85%),radial-gradient(at_41%_94%,hsla(284,100%,84%,1)_0px,transparent_85%),radial-gradient(at_100%_99%,hsla(306,100%,57%,1)_0px,transparent_85%)] dark:shadow-[inset_0_-16px_24px_rgba(255,255,255,0.25)]">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        AI Summary
      </h2>

      {loading || !summary ? (
        <>
          <GenerateLoader text="Summarizing..." classNames="mb-3" />
          <SkeletonText />
        </>
      ) : (
        <BlogSummaryPoint summary={summary} />
      )}
    </div>
  );
}

export function SkeletonText() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-2/4" />
    </div>
  );
}
