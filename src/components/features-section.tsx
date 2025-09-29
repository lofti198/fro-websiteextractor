"use client";

import { 
  Bot, 
  Shield, 
  Clock, 
  BarChart3, 
  Code, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Extraction",
    description: "Our advanced AI understands website structure and adapts to changes automatically.",
    benefits: ["Smart element detection", "Handles dynamic content", "Self-healing scrapers"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SOC 2 compliance and encrypted data transmission.",
    benefits: ["End-to-end encryption", "SOC 2 certified", "GDPR compliant"]
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Get your data instantly with our high-performance infrastructure.",
    benefits: ["Sub-second response", "99.9% uptime", "Global CDN"]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Built-in analytics and monitoring to track your scraping performance.",
    benefits: ["Usage analytics", "Performance metrics", "Error tracking"]
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "RESTful API, webhooks, and SDKs for seamless integration.",
    benefits: ["REST API", "Webhooks", "Multiple SDKs"]
  },
  {
    icon: Zap,
    title: "No-Code Solution",
    description: "Point-and-click interface for non-technical users to extract data easily.",
    benefits: ["Visual builder", "Templates", "One-click export"]
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Scraper?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for modern web scraping challenges with enterprise-grade features and AI intelligence.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Transform Your Data Extraction?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our AI scraper to automate their data collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
