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

interface ServiceFooterProps {
  categories: Category[];
  tags: Tag[];
}

export default function ServiceFooter({ categories, tags }: ServiceFooterProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Service Information
            </h3>
            <div className="space-y-4">
              {categories.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact CTA */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our team to discuss your specific requirements and get a customized solution.
            </p>
            
            <div className="space-y-4">
              <a 
                href="/contact"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
              >
                Contact Our Team
              </a>
              <a 
                href="/services"
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-colors text-center block"
              >
                View All Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}