import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, Calendar, Tag, Hash, User } from "lucide-react";
import { Metadata } from "next";

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

  // Clean up excerpt for description
  const description = post.excerpt.rendered
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, "")
    .slice(0, 160);

  // Extract categories for keywords
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];
  const keywords = [...categories, ...tags].map((term: any) => term.name).join(", ");

  return {
    title: post.title.rendered,
    description,
    keywords,
    authors: author ? [{ name: author.name }] : undefined,
    openGraph: {
      title: post.title.rendered,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: author ? [author.name] : undefined,
      images: featuredImage ? [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description,
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  // Fetch current post with embedded data
  const postRes = await fetch(`${process.env.WP_API_URL}/posts?slug=${params.slug}&_embed`);
  const postData = await postRes.json();
  const post = postData[0];

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <Link href="/" className="inline-flex items-center gap-2 mt-4 text-yellow-600 hover:text-yellow-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  // Fetch all posts for navigation
  const allPostsRes = await fetch(`${process.env.WP_API_URL}/posts`);
  const allPosts = await allPostsRes.json();

  const currentIndex = allPosts.findIndex((p: any) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Extract categories, tags, and author
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];
  const author = post._embedded?.["author"]?.[0];

  return (
    <article className="bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">All Posts</span>
              <span className="font-medium sm:hidden">Posts</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              {prevPost && (
                <Link href={`/posts/${prevPost.slug}`} className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Link>
              )}
              {nextPost && (
                <Link href={`/posts/${nextPost.slug}`} className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8 sm:mb-12 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {author && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{author.name}</span>
                  </div>
                </>
              )}
              {categories.length > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4 text-yellow-600" />
                    <span className="text-xs sm:text-sm font-medium text-yellow-600">{categories[0].name}</span>
                  </div>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8 px-2 sm:px-0">{post.title.rendered}</h1>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap px-2 sm:px-0">
                <Hash className="w-4 h-4 text-gray-400" />
                {tags.slice(0, 5).map((tag: any) => (
                  <span key={tag.id} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-gray max-w-none [&_img]:!my-12 [&_img]:!mx-auto [&_img]:!block [&_figure]:!my-12 [&_figure]:!mx-auto">
            <div className="leading-relaxed [&>*:first-child]:mt-8 [&>*:last-child]:mb-8" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>

          {/* Article Footer - Categories & Tags */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col gap-6">
              {categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category: any) => (
                      <span key={category.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </footer>

          {/* Navigation Footer */}
          <nav className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0">
              {prevPost ? (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all w-full sm:max-w-xs"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-xs text-gray-500 mb-1">Previous</p>
                    <p className="font-medium text-gray-900 line-clamp-2 text-sm truncate">{prevPost.title.rendered}</p>
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block"></div>
              )}

              {nextPost ? (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all w-full sm:max-w-xs"
                >
                  <div className="text-left sm:text-right min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-1">Next</p>
                    <p className="font-medium text-gray-900 line-clamp-2 text-sm truncate">{nextPost.title.rendered}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                </Link>
              ) : (
                <div className="hidden sm:block"></div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </article>
  );
}
