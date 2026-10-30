import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BLOG_CARDS_PROPS } from "@/types/types";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(".md", "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      };
    });
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
    content: processedContent.toString(),
    tags: data.tags || [],
  };
}
