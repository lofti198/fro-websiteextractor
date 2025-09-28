import Link from "next/link";
import { BlogPostCardProps } from "@/lib/types";
import { extractImageFromContent, sanitizeImageUrl, decodeHtmlEntities, formatDate, truncateText } from "@/lib/utils";

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const rawFeaturedImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || extractImageFromContent(post.content.rendered);
  const featuredImage = sanitizeImageUrl(rawFeaturedImage);

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={featuredImage}
            alt={decodeHtmlEntities(post.title.rendered)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            <time className="text-xs text-gray-500 font-medium">
              {formatDate(post.date)}
            </time>
            {post._embedded?.["wp:term"]?.[0]?.[0] && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-yellow-600 font-medium truncate">
                  {post._embedded["wp:term"][0][0].name}
                </span>
              </>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-tight">
            {decodeHtmlEntities(post.title.rendered)}
          </h3>
          <div
            className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: decodeHtmlEntities(
                truncateText(post.excerpt.rendered.replace(/<[^>]*>/g, ""))
              ),
            }}
          />
        </div>
      </article>
    </Link>
  );
}