"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { companyInfo } from '@/lib/mock-data';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const translations = {
  en: {
    about: "About Us",
    restaurants: "Our Restaurants",
    careers: "Careers",
    press: "Press",
    contact: "Contact Us",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "All Rights Reserved",
    newsletter: "Subscribe to our newsletter",
    emailPlaceholder: "Your email",
    subscribe: "Subscribe",
    quickLinks: "Quick Links",
    socialMedia: "Follow Us",
    contactInfo: "Contact Information"
  },
  ar: {
    about: "عن الشركة",
    restaurants: "مطاعمنا",
    careers: "وظائف",
    press: "الصحافة",
    contact: "اتصل بنا",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    copyright: "جميع الحقوق محفوظة",
    newsletter: "اشترك في نشرتنا الإخبارية",
    emailPlaceholder: "بريدك الإلكتروني",
    subscribe: "اشترك",
    quickLinks: "روابط سريعة",
    socialMedia: "تابعنا",
    contactInfo: "معلومات الاتصال"
  }
};

export default function Footer() {
  const [locale, setLocale] = useState<'en' | 'ar'>('en');
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Detect language from HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang === 'ar') {
      setLocale('ar');
    }
    
    // Check preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setIsDark(htmlTheme === 'dark' || prefersDark);
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const t = translations[locale];
  const currentYear = new Date().getFullYear();

  // Dynamic classes based on theme
  const bgClass = isDark ? "bg-gray-900" : "bg-gray-100";
  const textClass = isDark ? "text-white" : "text-gray-800";
  const textMutedClass = isDark ? "text-gray-400" : "text-gray-600";
  const textHoverClass = "hover:text-amber-600";
  const inputBgClass = isDark ? "bg-gray-800" : "bg-white";
  const inputBorderClass = isDark ? "border-gray-700" : "border-gray-300";
  const inputTextClass = isDark ? "text-gray-300" : "text-gray-700";
  const dividerClass = isDark ? "border-gray-800" : "border-gray-200";
  const iconClass = "text-amber-500";

  return (
    <footer className={`${bgClass} ${textClass} pt-16 pb-8 transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">{companyInfo.name}</h3>
            <p className={`${textMutedClass} mb-4`}>{companyInfo.shortDescription}</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="#restaurants" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                  {t.restaurants}
                </Link>
              </li>
              <li>
                <Link href="#careers" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                  {t.careers}
                </Link>
              </li>
              <li>
                <Link href="#press" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                  {t.press}
                </Link>
              </li>
              <li>
                <Link href="#contact" className={`${textMutedClass} ${textHoverClass} transition-colors`}>
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className={`${iconClass} mt-1 mr-2 flex-shrink-0`} />
                <span className={textMutedClass}>
                  Baghdad, Iraq
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className={`${iconClass} mr-2 flex-shrink-0`} />
                <span className={textMutedClass}>+964 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className={`${iconClass} mr-2 flex-shrink-0`} />
                <span className={textMutedClass}>info@mesopotamiagroup.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t.newsletter}</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className={`w-full px-4 py-2 ${inputBgClass} border ${inputBorderClass} rounded-md ${inputTextClass} focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-300`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
              >
                {t.subscribe}
              </button>
            </form>
          </div>
        </div>
        
        <div className={`border-t ${dividerClass} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <div className={`${textMutedClass} text-sm mb-4 md:mb-0`}>
            &copy; {currentYear} {companyInfo.name}. {t.copyright}.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className={`${textMutedClass} ${textHoverClass} text-sm transition-colors`}>
              {t.privacy}
            </Link>
            <Link href="/terms" className={`${textMutedClass} ${textHoverClass} text-sm transition-colors`}>
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}