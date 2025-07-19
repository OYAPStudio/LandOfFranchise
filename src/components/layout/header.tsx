"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./language-switcher";
import { companyInfo, restaurants } from "@/lib/mock-data";

const translations = {
  en: {
    home: "Home",
    about: "About",
    restaurants: "Restaurants",
    locations: "Locations",
    team: "Our Team",
    history: "Our History",
    values: "Values & Mission",
    awards: "Awards",
    contact: "Contact",
    brands: "Brands",
    visit: "Visit"
  },
  ar: {
    home: "الرئيسية",
    about: "عن الشركة",
    restaurants: "المطاعم",
    locations: "المواقع",
    team: "فريقنا",
    history: "تاريخنا",
    values: "قيمنا ومهمتنا",
    awards: "الجوائز",
    contact: "اتصل بنا",
    brands: "العلامات التجارية",
    visit: "زيارة"
  }
};

export default function Header({ locale = "en" }: { locale: string }) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Use locale prop and ensure it's a valid key
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const isRTL = currentLocale === 'ar';
  const t = translations[currentLocale];
  
  // Get company info based on current locale
  const companyData = companyInfo[currentLocale];
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.getElementById('brands-dropdown');
      const dropdownContainer = document.querySelector('.brands-dropdown-container');
      
      if (dropdown && dropdownContainer && 
          !dropdownContainer.contains(target)) {
        setBrandsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      // Close dropdown when scrolling
      setBrandsDropdownOpen(false);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Ensure links include the locale prefix
  const getLink = (hash: string) => `/${locale}${hash}`;

  // Prevent hydration issues by not rendering theme-dependent content until mounted
  if (!isMounted) {
    return (
      <header className={`fixed top-0 w-full z-50 bg-transparent ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-4 py-2">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link href={`/${locale}`} className="flex items-center -my-1">
              <div className="relative w-52 h-15 md:w-60 md:h-15 overflow-hidden">
                <Image
                  src="/images/logo/LF.png"
                  alt={`${companyData.name} Logo`}
                  width={250}
                  height={120}
                  className="object-contain"
                  style={{ 
                    maxWidth: '140%',
                    maxHeight: '150%'
                  }}
                  priority
                />
              </div>
            </Link>
            
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <LanguageSwitcher currentLocale={locale} />
              
              {/* Placeholder for theme button to prevent layout shift */}
              <div className="p-1.5 rounded-full bg-white/20 text-white">
                <div className="w-[18px] h-[18px]" />
              </div>
              
              {/* Mobile menu button placeholder */}
              <div className="md:hidden p-1.5 rounded-full bg-white/20 text-white">
                <div className="w-[18px] h-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'} ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <Link href={`/${locale}`} className="flex items-center -my-1">
            <div className="relative w-52 h-15 md:w-60 md:h-15 overflow-hidden">
              <Image
                src="/images/logo/LF.png"
                alt={`${companyData.name} Logo`}
                width={250}
                height={120}
                className="object-contain"
                style={{ 
                  maxWidth: '140%',
                  maxHeight: '150%'
                }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-5' : 'space-x-5'}`}>
            <Link href={getLink('#home')} className={`text-sm py-1 transition-colors ${
              scrolled 
                ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                : "text-white hover:text-amber-300"
            }`}>
              {t.home}
            </Link>
            <Link href={getLink('#about')} className={`text-sm py-1 transition-colors ${
              scrolled 
                ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                : "text-white hover:text-amber-300"
            }`}>
              {t.about}
            </Link>
            <Link href={getLink('#company-history')} className={`text-sm py-1 transition-colors ${
              scrolled 
                ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                : "text-white hover:text-amber-300"
            }`}>
              {t.history}
            </Link>
            <Link href={getLink('#locations')} className={`text-sm py-1 transition-colors ${
              scrolled 
                ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                : "text-white hover:text-amber-300"
            }`}>
              {t.locations}
            </Link>
            
            {/* Brands Dropdown */}
            <div className="relative brands-dropdown-container">
              <button 
                id="brands-dropdown-button"
                className={`flex items-center text-sm py-1 group transition-colors ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                } ${
                  scrolled 
                    ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                    : "text-white hover:text-amber-300"
                }`}
                onMouseEnter={() => setBrandsDropdownOpen(true)}
                onClick={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
              >
                {t.brands}
                <ChevronDown size={16} className={`transition-transform duration-300 ${
                  isRTL ? 'mr-1 ml-0' : 'ml-1 mr-0'
                } ${brandsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                id="brands-dropdown"
                className={`absolute mt-2 w-64 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black/5 overflow-hidden
                  transition-all duration-200 ease-in-out transform origin-top z-50 ${
                  isRTL ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
                } ${brandsDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                onMouseEnter={() => setBrandsDropdownOpen(true)}
              >
                <div className="py-2">
                  {restaurants.map((restaurant, index) => {
                    // Get restaurant data based on current locale
                    const restaurantData = restaurant[currentLocale];
                    
                    return (
                      <Link 
                        key={restaurant.id}
                        href={`/${locale}/brands/${restaurant.id}`}
                        className={`group flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700/80 transition-colors duration-200 ${
                          isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                        } ${index !== restaurants.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                        onClick={() => setBrandsDropdownOpen(false)}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-gray-700 shadow-sm transition-transform duration-200 group-hover:scale-110 ${
                          isRTL ? 'ml-3 mr-0' : 'mr-3 ml-0'
                        }`}>
                          <Image 
                            src={restaurantData.logo} 
                            alt={restaurantData.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                            {restaurantData.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {restaurantData.cuisineType}
                          </p>
                        </div>
                        <span className={`text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                          isRTL ? 'text-left' : 'text-right'
                        }`}>
                          {isRTL ? '← زيارة' : 'Visit →'}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <Link href={getLink('#restaurants')} className={`text-sm py-1 transition-colors ${
              scrolled 
                ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                : "text-white hover:text-amber-300"
            }`}>
              {t.restaurants}
            </Link>
          </nav>

          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <LanguageSwitcher currentLocale={locale} />

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-1.5 rounded-full transition-colors ${
                scrolled
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  : "bg-white/20 text-white dark:bg-gray-800/50"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-1.5 rounded-full transition-colors ${
                scrolled
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  : "bg-white/20 text-white dark:bg-gray-800/50"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={`md:hidden pt-3 pb-2 space-y-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Link
              href={getLink('#home')}
              className={`block py-1.5 transition-colors ${
                scrolled 
                  ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                  : "text-white hover:text-amber-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link
              href={getLink('#about')}
              className={`block py-1.5 transition-colors ${
                scrolled 
                  ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                  : "text-white hover:text-amber-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.about}
            </Link>
            
            <Link
              href={getLink('#locations')}
              className={`block py-1.5 transition-colors ${
                scrolled 
                  ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                  : "text-white hover:text-amber-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.locations}
            </Link>
            
            <Link
              href={getLink('#company-history')}
              className={`block py-1.5 transition-colors ${
                scrolled 
                  ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                  : "text-white hover:text-amber-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.history}
            </Link>

            {/* Brands submenu for mobile */}
            <div className="py-1.5">
              <button
                onClick={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
                className={`flex items-center w-full transition-colors ${
                  isRTL ? 'flex-row-reverse text-right justify-end' : 'text-left justify-start'
                } ${
                  scrolled 
                    ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                    : "text-white hover:text-amber-300"
                }`}
              >
                {t.brands}
                <ChevronDown size={16} className={`transform transition-transform duration-300 ${
                  isRTL ? 'mr-1 ml-0' : 'ml-1 mr-0'
                } ${brandsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${brandsDropdownOpen ? 'max-h-56 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className={`space-y-1 ${
                  isRTL 
                    ? 'pr-3 mr-2 border-r-2' 
                    : 'pl-3 ml-2 border-l-2'
                } ${
                  scrolled 
                    ? "border-amber-400 dark:border-amber-600" 
                    : "border-amber-300"
                }`}>
                  {restaurants.map((restaurant) => {
                    // Get restaurant data based on current locale
                    const restaurantData = restaurant[currentLocale];
                    
                    return (
                      <Link
                        key={restaurant.id}
                        href={`/${locale}/brands/${restaurant.id}`}
                        className={`flex items-center py-2 px-2 rounded-md transition-colors duration-200 ${
                          isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                        } ${
                          scrolled 
                            ? "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-gray-800/50" 
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-gray-700 shadow-sm ${
                          isRTL ? 'ml-3 mr-0' : 'mr-3 ml-0'
                        }`}>
                          <Image 
                            src={restaurantData.logo} 
                            alt={restaurantData.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium">{restaurantData.name}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {restaurantData.cuisineType}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <Link
              href={getLink('#restaurants')}
              className={`block py-1.5 transition-colors ${
                scrolled 
                  ? "text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400" 
                  : "text-white hover:text-amber-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.restaurants}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}