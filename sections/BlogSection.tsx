import { Para } from "@/components/para";
import { Block } from "@/components/block";
import { Heading } from "@/components/heading";

const BlogSection = () => {
  return (
    <Block className="mt-0 border-0 pt-0 shadow-[none] dark:shadow-[none]">
      <div>
        <Heading priority>Blogs</Heading>
        <Para priority className="max-w-lg pt-4 text-sm md:text-base">
          Notes on Rust, async backends, event-driven systems and the production
          lessons behind them.
        </Para>
      </div>
    </Block>
  );
};

export default BlogSection;
