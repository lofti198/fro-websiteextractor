import { Link } from '../../i18n/routing';

export default function ServiceNotFound() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Service Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Services
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

