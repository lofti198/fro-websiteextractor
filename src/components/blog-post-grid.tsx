import { WordPressPost } from "@/lib/types";
import BlogPostCard from "./blog-post-card";

interface BlogPostGridProps {
  posts: WordPressPost[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 px-4 sm:px-6 pb-6 sm:pb-8">
      {posts?.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </section>
  );
}