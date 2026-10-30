import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { Block } from "@/components/block";
import { Heading } from "@/components/heading";
import { getAllPosts, getPost, postTimestamp } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { Para } from "@/components/para";
import VoiceMessageBubble from "@/components/voice-message-bubble";
import { BlogTag } from "@/components/blogTag";
import BlogSummary from "@/components/blogSummary";
import { PostNav } from "@/components/post-nav";
import { ReadingProgress } from "@/components/reading-progress";

type PostPageProps = { params: Promise<{ slug: string }> };

// Every post is known at build time; anything else is a real 404.
export const dynamicParams = false;

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<[^>]*>/g, "");
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: new Date(postTimestamp(post.date)).toISOString(),
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: PostPageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) notFound();

  const plainText = stripHtml(post.content || "");

  return (
    <div>
      <ReadingProgress />
      <Block className="blog-page-block mt-0 border-0 pt-0 shadow-[none] dark:shadow-[none]">
        <Link
          href="/blog"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <FaArrowLeft className="size-3" />
          All posts
        </Link>

        <Heading priority className="mb-2 text-2xl font-bold md:text-3xl">
          {post.title}
        </Heading>

        <Para priority className="mb-4 text-xs">
          {post.date} · {post.readingTime} min read
        </Para>

        <div className="mb-4 hidden flex-wrap gap-1 md:flex">
          {post.tags?.map((tag, index) => (
            <BlogTag key={tag} index={index}>
              #{tag}
            </BlogTag>
          ))}
        </div>
        <VoiceMessageBubble text={plainText} />
        <BlogSummary content={plainText} />
        <div
          className={cn(
            "text-ink-secondary dark:text-ink-secondary-dark text-sm",
            "pt-4 text-sm md:text-base",
            "prose prose-lg dark:prose-invert max-w-none",
          )}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
        <PostNav slug={slug} />
      </Block>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}
