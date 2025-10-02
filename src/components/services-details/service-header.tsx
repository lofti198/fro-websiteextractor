import { ArrowRight, Tag, Calendar, Hash, User } from "lucide-react";
import { Link } from '../../i18n/routing';
import { WordPressPost } from '@/lib/types';
import { decodeHtmlEntities } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  slug?: string;
}

interface Tag {
  id: number;
  name: string;
  slug?: string;
}

interface Author {
  id: number;
  name: string;
  slug?: string;
}

interface ServiceHeaderProps {
  service: WordPressPost;
  categories: Category[];
  tags: Tag[];
  author?: Author;
}

export default function ServiceHeader({ service, categories, tags, author }: ServiceHeaderProps) {

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ArrowRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-blue-600 transition-colors">
              Services
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{decodeHtmlEntities(service.title.rendered)}</span>
          </nav>
          
          {/* Meta information */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(service.date).toLocaleDateString("en-US", {
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
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-blue-600">{categories[0].name}</span>
                </div>
              </>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {decodeHtmlEntities(service.title.rendered)}
          </h1>
          
          {/* Excerpt or Description */}
          {service.excerpt && (
            <div className="text-xl text-gray-600 mb-8 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(service.excerpt.rendered) }} />
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-8">
              <Hash className="w-4 h-4 text-gray-400" />
              {tags.slice(0, 5).map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

