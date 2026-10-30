import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { getAllPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

const cardClass =
  "group flex flex-col gap-1 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-orange-400/70 dark:border-neutral-800 dark:hover:border-orange-400/50";

/** Newer / older post links shown under an article. */
export const PostNav = ({ slug }: { slug: string }) => {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older =
    index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  if (!newer && !older) return null;

  return (
    <nav
      aria-label="More posts"
      className="mt-10 grid gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-2 dark:border-neutral-800"
    >
      {newer && (
        <Link href={`/blog/${newer.slug}`} className={cardClass}>
          <span className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <FaArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
            Newer post
          </span>
          <span className="text-ink-primary dark:text-ink-primary-dark text-sm font-semibold tracking-tight">
            {newer.title}
          </span>
        </Link>
      )}
      {older && (
        <Link
          href={`/blog/${older.slug}`}
          className={cn(cardClass, "sm:col-start-2 sm:items-end sm:text-right")}
        >
          <span className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            Older post
            <FaArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-ink-primary dark:text-ink-primary-dark text-sm font-semibold tracking-tight">
            {older.title}
          </span>
        </Link>
      )}
    </nav>
  );
};
