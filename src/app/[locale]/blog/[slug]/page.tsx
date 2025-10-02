import { notFound } from "next/navigation";
import { WordPressPost } from "@/lib/types";
import PostHeader from "@/components/blog-details/post-header";
import PostContent from "@/components/blog-details/post-content";
import PostFooter from "@/components/blog-details/post-footer";
import PostNavigation from "@/components/blog-details/post-navigation";

export const revalidate = 1200;

async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    if (process.env.WP_API_URL) {
      const res = await fetch(`${process.env.WP_API_URL}/posts?slug=${slug}&_embed`, {
        next: { revalidate: 1200 }
      });
      if (res.ok) {
        const posts: WordPressPost[] = await res.json();
        return posts[0] || null;
      }
    }
  } catch (error) {
    console.log('WordPress API not available');
  }
  return null;
}

async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    if (process.env.WP_API_URL) {
      const res = await fetch(`${process.env.WP_API_URL}/posts?_embed&per_page=100`, {
        next: { revalidate: 1200 }
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (error) {
    console.log('WordPress API not available');
  }
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, allPosts] = await Promise.all([
    getPost(params.slug),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Extract categories and tags from embedded data
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];
  const author = post._embedded?.author?.[0];

  return (
    <main>
      <PostHeader 
        post={post} 
        categories={categories} 
        tags={tags} 
        author={author} 
      />
      <PostContent content={post.content.rendered} />
      <PostFooter 
        categories={categories} 
        tags={tags} 
      />
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </main>
  );
}



