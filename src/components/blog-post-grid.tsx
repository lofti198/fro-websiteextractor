import { WordPressPost } from "@/lib/types";
import BlogPostCard from "./blog-post-card";

interface BlogPostGridProps {
  posts?: WordPressPost[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  // Ensure posts is always an array
  const safePosts = Array.isArray(posts) ? posts : [];
  
  if (safePosts.length === 0) {
    return (
      <section className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h2>
          <p className="text-gray-600 mb-8">
            We&apos;re working on creating amazing content for you. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 px-4 sm:px-6 pb-6 sm:pb-8">
      {safePosts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </section>
  );
}