import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from '../../i18n/routing';

interface Service {
  slug: string;
  title: string;
  icon: string;
}

interface ServiceNavigationProps {
  prevService: Service | null;
  nextService: Service | null;
}

export default function ServiceNavigation({ prevService, nextService }: ServiceNavigationProps) {
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Previous Service */}
          <div className="flex-1">
            {prevService ? (
              <Link 
                href={`/services/${prevService.slug}`}
                className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm text-gray-500">Previous Service</div>
                  <div className="font-semibold flex items-center">
                    <span className="mr-2">{prevService.icon}</span>
                    {prevService.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          
          {/* Back to Services */}
          <div className="flex-1 text-center">
            <Link 
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
            >
              All Services
            </Link>
          </div>
          
          {/* Next Service */}
          <div className="flex-1 flex justify-end">
            {nextService ? (
              <Link 
                href={`/services/${nextService.slug}`}
                className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-500">Next Service</div>
                  <div className="font-semibold flex items-center justify-end">
                    {nextService.title}
                    <span className="ml-2">{nextService.icon}</span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <span className="text-gray-400 text-sm">
                You've reached the end
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
