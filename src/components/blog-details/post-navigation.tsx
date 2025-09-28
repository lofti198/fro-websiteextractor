import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { PostNavigationProps } from "@/lib/types";

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="font-medium hidden sm:inline">All Posts</span>
            <span className="font-medium sm:hidden">Posts</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}