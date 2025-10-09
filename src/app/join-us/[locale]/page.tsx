import JoinUsHero from '@/components/sections/join-us/hero';
import BenefitsSection from '@/components/sections/join-us/benefits';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Join Our Team | Land of Franchise',
  description: 'Build your career with Iraq\'s leading restaurant group. Explore exciting opportunities and grow with us.',
};

export default async function JoinUsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <main className="flex flex-col min-h-screen">
      {/* Minimal Header with Back Button */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link 
              href={`/${locale}`}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
              </span>
            </Link>

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                Land of Franchise
              </div>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <Link 
                href="/join-us/en"
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  locale === 'en' 
                    ? 'bg-amber-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                EN
              </Link>
              <Link 
                href="/join-us/ar"
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  locale === 'ar' 
                    ? 'bg-amber-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                AR
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content with Top Padding */}
      <div className="pt-20">
        <JoinUsHero locale={locale} />
        <BenefitsSection locale={locale} />
      </div>
    </main>
  );
}