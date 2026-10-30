import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import hljs from "highlight.js/lib/core";
import rust from "highlight.js/lib/languages/rust";
import { BLOG_CARDS_PROPS } from "@/types/types";

hljs.registerLanguage("rust", rust);

const postsDirectory = path.join(process.cwd(), "posts");
const WORDS_PER_MINUTE = 230;

const readingTime = (markdown: string) =>
  Math.max(
    1,
    Math.round(markdown.trim().split(/\s+/).length / WORDS_PER_MINUTE),
  );

/** "Friday, Oct 9, 2026" -> timestamp (0 when it can't be parsed). */
export function postTimestamp(date?: string): number {
  const time = Date.parse((date ?? "").replace(/^[A-Za-z]+,\s*/, ""));
  return Number.isNaN(time) ? 0 : time;
}

const decodeEntities = (text: string) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

/** Syntax-highlights fenced code blocks at build time (no client JS). */
function highlightCodeBlocks(htmlString: string): string {
  return htmlString.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, lang: string, code: string) => {
      if (!hljs.getLanguage(lang)) return match;
      const { value } = hljs.highlight(decodeEntities(code), {
        language: lang,
      });
      return `<pre><code class="hljs language-${lang}">${value}</code></pre>`;
    },
  );
}

/** All posts, newest first. */
export function getAllPosts(): BLOG_CARDS_PROPS[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(".md", "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        readingTime: readingTime(content),
      } satisfies BLOG_CARDS_PROPS;
    })
    .sort((a, b) => postTimestamp(b.date) - postTimestamp(a.date));
}

export async function getPost(slug: string): Promise<BLOG_CARDS_PROPS | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    content: highlightCodeBlocks(processedContent.toString()),
    tags: data.tags || [],
    readingTime: readingTime(content),
  };
}
