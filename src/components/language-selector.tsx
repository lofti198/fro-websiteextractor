"use client";
import { useState, useEffect, useRef } from "react";
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/routing';

const LanguageSelector = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    router.push(pathname, { locale: langCode });
    setIsLangOpen(false);
  };

  return (
    <div className="relative" ref={langDropdownRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors duration-200"
      >
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isLangOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                locale === lang.code ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

