import { getAllPosts } from "@/lib/posts";
import { Block } from "@/components/block";
import { BlogGridCard } from "@/components/blogCard";

const BlogBlogsSection = () => {
  const POSTS = getAllPosts();
  return (
    <Block>
      <div className="relative z-10 grid max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {POSTS.map((post, idx) => (
          <BlogGridCard key={post.slug} {...post} index={idx} />
        ))}
      </div>
    </Block>
  );
};

export default BlogBlogsSection;
