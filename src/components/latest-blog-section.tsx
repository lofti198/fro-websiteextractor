"use client";

import { Calendar, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WordPressPost } from "@/lib/types";

interface LatestBlogSectionProps {
  posts: WordPressPost[];
}

export default function LatestBlogSection({ posts }: LatestBlogSectionProps) {
  // Get the latest 3 posts
  const latestPosts = posts?.slice(0, 3) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, tutorials, and best practices in web scraping and data extraction.
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.length > 0 ? latestPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Featured image */}
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Meta information */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {getReadingTime(post.content.rendered)} min read
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p 
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
                  }}
                />

                {/* Read more link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </article>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Blog posts coming soon!</p>
            </div>
          )}
        </div>

        {/* View all posts CTA */}
        {latestPosts.length > 0 && (
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
