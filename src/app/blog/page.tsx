import BlogHeader from "@/components/blog-header";
import BlogPostGrid from "@/components/blog-post-grid";
import { WordPressPost } from "@/lib/types";

export const revalidate = 1200;

interface BlogPageProps {
  searchParams: { category?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  let posts: WordPressPost[] = [];
  
  try {
    if (process.env.WP_API_URL) {
      // Build the API URL with optional category filter
      let apiUrl = `${process.env.WP_API_URL}/posts?_embed&categories=1`;
      
      if (searchParams.category) {
        apiUrl += `&categories=${searchParams.category}`;
      }
      
      const res = await fetch(apiUrl, {
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
