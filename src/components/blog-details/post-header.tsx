import { Calendar, Tag, Hash, User } from "lucide-react";
import { PostHeaderProps } from "@/lib/types";
import { decodeHtmlEntities, formatDate } from "@/lib/utils";

export default function PostHeader({ post, categories, tags, author }: PostHeaderProps) {
  return (
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

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
        {decodeHtmlEntities(post.title.rendered)}
      </h1>

      {tags.length > 0 && (
        <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap px-2 sm:px-0">
          <Hash className="w-4 h-4 text-gray-400" />
          {tags.slice(0, 5).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}