"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { usePathname } from '../i18n/routing';
import { Menu, X, ChevronDown } from "lucide-react";
import { raleway } from "@/lib/fonts";
import { Link } from '../i18n/routing';
import LanguageSelector from './language-selector';

export default function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      href: "/",
      label: t('home'),
    },
    {
      href: "/services",
      label: t('services'),
      hasDropdown: true,
      dropdownItems: [
        { href: "/services/google-maps-scraper", label: "Google Maps Scraper" },
        { href: "/services/linkedin-scraper", label: "LinkedIn Scraper" },
        { href: "/services/instagram-scraper", label: "Instagram Scraper" },
        { href: "/services/amazon-product-scraper", label: "Amazon Scraper" },
      ],
    },
    {
      href: "/pricing",
      label: t('pricing'),
    },
    {
      href: "/blog",
      label: t('blog'),
    },
    {
      href: "/contact",
      label: t('contact'),
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className={`text-2xl font-bold ${raleway.className} text-blue-600 hover:text-blue-700 transition-colors`}>
              AI Scraper
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      {link.label}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors ${
                      pathname === link.href
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/demo"
              className="px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              {t('demo')}
            </Link>
            <Link
              href="/get-started"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('get_started')}
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                      >
                        {link.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {openDropdown === link.label && (
                        <div className="pl-4 space-y-2 mt-2">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block font-medium transition-colors py-2 ${
                        pathname === link.href
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2">
                <Link
                  href="/demo"
                  className="block text-center px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {t('demo')}
                </Link>
                <Link
                  href="/get-started"
                  className="block text-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('get_started')}
                </Link>
                <div className="pt-2">
                  <LanguageSelector />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
