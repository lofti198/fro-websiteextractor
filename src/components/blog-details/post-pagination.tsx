import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostPaginationProps } from "@/lib/types";
import { decodeHtmlEntities } from "@/lib/utils";

export default function PostPagination({ prevPost, nextPost }: PostPaginationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all w-full sm:max-w-xs"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-xs text-gray-500 mb-1">Previous</p>
              <p className="font-medium text-gray-900 line-clamp-2 text-sm truncate">
                {decodeHtmlEntities(prevPost.title.rendered)}
              </p>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block"></div>
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all w-full sm:max-w-xs"
          >
            <div className="text-left sm:text-right min-w-0 flex-1">
              <p className="text-xs text-gray-500 mb-1">Next</p>
              <p className="font-medium text-gray-900 line-clamp-2 text-sm truncate">
                {decodeHtmlEntities(nextPost.title.rendered)}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
          </Link>
        ) : (
          <div className="hidden sm:block"></div>
        )}
      </div>
    </nav>
  );
}