import BlogHeader from "@/components/blog-header";
import BlogPostGrid from "@/components/blog-post-grid";
import { WordPressPost } from "@/lib/types";

export const revalidate = 1200;

export default async function Home() {
  const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`);
  const posts: WordPressPost[] = await res.json();

  return (
    <main>
      <BlogHeader />
      <BlogPostGrid posts={posts} />
    </main>
  );
}
