'use client';

import { ChevronRight, Briefcase, Users, Globe, Star } from 'lucide-react';

const translations = {
  en: {
    title: "Join Our Team",
    subtitle: "Build Your Career With Us",
    description: "We're looking for passionate individuals to join our growing franchise family. Discover opportunities that match your skills and ambitions.",
    openPositions: "Open Positions",
    whyJoinUs: "Why Join Us?",
    benefits: [
      { icon: Briefcase, title: "Career Growth", description: "Advance your career with clear promotion paths" },
      { icon: Users, title: "Great Team", description: "Work with passionate and supportive colleagues" },
      { icon: Globe, title: "Global Reach", description: "Be part of an international franchise network" },
      { icon: Star, title: "Excellence", description: "Maintain high standards in everything we do" }
    ],
    scrollToJobs: "View Open Positions"
  },
  ar: {
    title: "انضم إلى فريقنا",
    subtitle: "ابن مستقبلك المهني معنا",
    description: "نبحث عن أفراد متحمسين للانضمام إلى عائلة الامتياز المتنامية لدينا. اكتشف الفرص التي تناسب مهاراتك وطموحاتك.",
    openPositions: "الوظائف المتاحة",
    whyJoinUs: "لماذا تنضم إلينا؟",
    benefits: [
      { icon: Briefcase, title: "النمو المهني", description: "طور مسيرتك المهنية مع مسارات ترقية واضحة" },
      { icon: Users, title: "فريق رائع", description: "اعمل مع زملاء متحمسين وداعمين" },
      { icon: Globe, title: "انتشار عالمي", description: "كن جزءًا من شبكة امتياز دولية" },
      { icon: Star, title: "التميز", description: "حافظ على معايير عالية في كل ما نقوم به" }
    ],
    scrollToJobs: "عرض الوظائف المتاحة"
  }
};

interface CareersHeroProps {
  locale: string;
}

export default function CareersHero({ locale }: CareersHeroProps) {
  const isRTL = locale === 'ar';
  const t = translations[locale as keyof typeof translations] || translations.en;

  const scrollToJobs = () => {
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative pt-32 pb-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-amber-200 dark:border-amber-800 mb-8">
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span className={`text-sm font-medium text-amber-700 dark:text-amber-300 ${isRTL ? 'font-arabic' : ''}`}>
              {t.openPositions}
            </span>
          </div>

          {/* Main Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t.title}
          </h1>
          
          <h2 className={`text-xl md:text-2xl text-amber-600 dark:text-amber-400 font-semibold mb-8 ${isRTL ? 'font-arabic' : ''}`}>
            {t.subtitle}
          </h2>

          <p className={`text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t.description}
          </p>

          {/* CTA Button */}
          <button 
            onClick={scrollToJobs}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className={isRTL ? 'font-arabic' : ''}>{t.scrollToJobs}</span>
            <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Why Join Us Cards */}
        <div className="mt-20">
          <h3 className={`text-2xl font-bold text-center text-gray-900 dark:text-white mb-12 ${isRTL ? 'font-arabic' : ''}`}>
            {t.whyJoinUs}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-amber-100 dark:border-amber-900 hover:shadow-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`font-semibold text-gray-900 dark:text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {benefit.title}
                  </h4>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}