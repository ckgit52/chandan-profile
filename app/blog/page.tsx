import type { Metadata } from "next";
import BlogSection from "@/sections/BlogSection";
import BlogBlogsSection from "@/sections/BlogBlogsSection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on Rust, async backends, hexagonal architecture and event-driven pipelines.",
};

export default function BlogPage() {
  return (
    <>
      <BlogSection />
      <BlogBlogsSection />
    </>
  );
}
