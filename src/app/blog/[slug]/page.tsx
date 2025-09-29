import { notFound } from "next/navigation";
import { WordPressPost } from "@/lib/types";
import PostHeader from "@/components/blog-details/post-header";
import PostContent from "@/components/blog-details/post-content";
import PostFooter from "@/components/blog-details/post-footer";
import PostNavigation from "@/components/blog-details/post-navigation";

export const revalidate = 1200;

async function getPost(slug: string): Promise<WordPressPost | null> {
  const res = await fetch(`${process.env.WP_API_URL}/posts?slug=${slug}&_embed`);
  const posts: WordPressPost[] = await res.json();
  return posts[0] || null;
}

async function getAllPosts(): Promise<WordPressPost[]> {
  const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`);
  return res.json();
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

  return (
    <main>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter post={post} />
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </main>
  );
}
