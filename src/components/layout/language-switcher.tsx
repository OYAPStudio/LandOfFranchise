"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import Cookies from 'js-cookie';

interface LanguageSwitcherProps {
  currentLocale?: string;
}

export default function LanguageSwitcher({ currentLocale = 'en' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (locale: string) => {
    // Set a cookie to remember the language preference
    Cookies.set('NEXT_LOCALE', locale, { expires: 365, path: '/' });
    
    // Get the current path without the locale prefix
    let newPath = pathname || '/';
    const pathSegments = newPath.split('/');
    
    // Remove current locale from path if it exists
    if (pathSegments.length > 1 && languages.some(lang => lang.code === pathSegments[1])) {
      pathSegments.splice(1, 1);
      newPath = pathSegments.join('/') || '/';
    }
    
    // Navigate to the same page with the new locale
    const newUrl = `/${locale}${newPath === '/' ? '' : newPath}`;
    router.push(newUrl);
    router.refresh(); // Force refresh to apply the new locale
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                currentLocale === language.code
                  ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => changeLanguage(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}