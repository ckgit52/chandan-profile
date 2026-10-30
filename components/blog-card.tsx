import { BLOG_CARDS_PROPS } from "@/types/types";
import { Para } from "./para";
import Link from "next/link";

const BlogCard = ({
  slug,
  title,
  description,
  date,
  readingTime,
  featured = false,
}: BLOG_CARDS_PROPS) => {
  return (
    <Link key={title} href={featured ? `/blog` : `/blog/${slug}`}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-4">
          <h3 className="text-ink-primary dark:text-ink-primary-dark mb-2 font-semibold tracking-tight">
            {title}
          </h3>
          <Para>{description}</Para>
        </div>
        <div className="flex-1">
          <Para className="text-xs sm:text-sm">{date}</Para>
          {readingTime && (
            <Para className="mt-1 text-xs">{readingTime} min read</Para>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
