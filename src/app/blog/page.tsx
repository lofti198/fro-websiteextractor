import BlogHeader from "@/components/blog-header";
import BlogPostGrid from "@/components/blog-post-grid";
import { WordPressPost } from "@/lib/types";

export const revalidate = 1200;

export default async function BlogPage() {
  let posts: WordPressPost[] = [];
  
  try {
    if (process.env.WP_API_URL) {
      const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`, {
        next: { revalidate: 1200 }
      });
      if (res.ok) {
        posts = await res.json();
      }
    }
  } catch (error) {
    console.log('WordPress API not available');
  }

  return (
    <main>
      <BlogHeader />
      <BlogPostGrid posts={posts} />
    </main>
  );
}
