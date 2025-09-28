import { Metadata } from "next";
import PostNavigation from "@/components/blog-details/post-navigation";
import PostHeader from "@/components/blog-details/post-header";
import PostContent from "@/components/blog-details/post-content";
import PostFooter from "@/components/blog-details/post-footer";
import PostPagination from "@/components/blog-details/post-pagination";
import PostNotFound from "@/components/blog-details/post-not-found";
import { WordPressPost } from "@/lib/types";
import { decodeHtmlEntities, cleanExcerptForMeta } from "@/lib/utils";

export const dynamicParams = false;

export const revalidate = 1200; // Revalidate every hour

export async function generateStaticParams() {
  const res = await fetch(`${process.env.WP_API_URL}/posts`);
  const data = await res.json();

  const postSlugs = data.map((post: { slug: string }) => ({ slug: post.slug }));

  return postSlugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Fetch post data for metadata
  const postRes = await fetch(`${process.env.WP_API_URL}/posts?slug=${params.slug}&_embed`);
  const postData = await postRes.json();
  const post = postData[0];

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Extract featured image
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Extract author
  const author = post._embedded?.["author"]?.[0];

  const description = cleanExcerptForMeta(post.excerpt.rendered);

  // Extract categories for keywords
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];
  const keywords = [...categories, ...tags].map((term: any) => term.name).join(", ");

  return {
    title: decodeHtmlEntities(post.title.rendered),
    description,
    keywords,
    authors: author ? [{ name: author.name }] : undefined,
    openGraph: {
      title: decodeHtmlEntities(post.title.rendered),
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: author ? [author.name] : undefined,
      images: featuredImage
        ? [
            {
              url: featuredImage,
              width: 1200,
              height: 630,
              alt: decodeHtmlEntities(post.title.rendered),
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: decodeHtmlEntities(post.title.rendered),
      description,
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const postRes = await fetch(`${process.env.WP_API_URL}/posts?slug=${params.slug}&_embed`);
  const postData = await postRes.json();
  const post: WordPressPost = postData[0];

  if (!post) {
    return <PostNotFound />;
  }

  const allPostsRes = await fetch(`${process.env.WP_API_URL}/posts`);
  const allPosts: WordPressPost[] = await allPostsRes.json();

  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];
  const author = post._embedded?.["author"]?.[0];

  return (
    <article className="bg-white">
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <PostHeader post={post} categories={categories} tags={tags} author={author} />
          <PostContent content={post.content.rendered} />
          <PostFooter categories={categories} tags={tags} />
          <PostPagination prevPost={prevPost} nextPost={nextPost} />
        </div>
      </div>
    </article>
  );
}
