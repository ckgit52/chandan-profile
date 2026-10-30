import type { MetadataRoute } from "next";
import { getAllPosts, postTimestamp } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/about", "/blog", "/contact"].map(
    (route) => ({ url: `${SITE_URL}${route}` }),
  );

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(postTimestamp(post.date)),
  }));

  return [...pages, ...posts];
}
