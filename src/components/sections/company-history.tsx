"use client";
import { useEffect, useState, useRef } from 'react';
import { Award, TrendingUp, Globe, Utensils, CheckCircle2, Star, Calendar, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';

interface CompanyHistoryProps {
  locale?: string;
}

const translations = {
  en: {
    since: "Since 2008",
    journey: "Our Journey",
    legacy: "A legacy of culinary excellence, innovation, and heartfelt hospitality spanning over a decade",
    restaurants: "Restaurants",
    countries: "Countries",
    years: "Years",
    exploreStory: "Explore Our Story",
    milestones: "Our Milestones",
    journeyThroughTime: "Journey Through Time",
    journeyDescription: "Every step of our journey has been marked by passion, innovation, and an unwavering commitment to excellence",
    readyToJoin: "Ready to Be Part of Our Story?",
    joinUs: "Join us on our continuing journey of culinary excellence and innovation",
    visitRestaurants: "Visit Our Restaurants",
    learnMore: "Learn More About Us",
    locations: "Locations"
  },
  ar: {
    since: "منذ 2008",
    journey: "رحلتنا",
    legacy: "إرث من التميز الطهي والابتكار والضيافة القلبية على مدى عقد من الزمان",
    restaurants: "مطاعم",
    countries: "دول",
    years: "سنوات",
    exploreStory: "استكشف قصتنا",
    milestones: "معالمنا",
    journeyThroughTime: "رحلة عبر الزمن",
    journeyDescription: "كل خطوة في رحلتنا تميزت بالشغف والابتكار والالتزام الثابت بالتميز",
    readyToJoin: "هل أنت مستعد لتصبح جزءًا من قصتنا؟",
    joinUs: "انضم إلينا في رحلتنا المستمرة للتميز الطهي والابتكار",
    visitRestaurants: "زيارة مطاعمنا",
    learnMore: "اعرف المزيد عنا",
    locations: "المواقع"
  }
};

const CompanyHistory = ({ locale = 'en' }: CompanyHistoryProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [activeYear, setActiveYear] = useState(2008);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const milestones = [
    {
      year: 2008,
      title: "Foundation",
      subtitle: "The Beginning",
      description: "Established our first restaurant in Baghdad's Al Mansour district, focusing on authentic Iraqi cuisine with a modern twist.",
      icon: Utensils,
      color: "from-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop",
      stats: { locations: 1, customers: "50+", team: 12 }
    },
    {
      year: 2011,
      title: "Expansion",
      subtitle: "Growing Horizons",
      description: "Expanded to multiple locations across Baghdad and Basra, serving thousands of satisfied customers daily.",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?q=80&w=2670&auto=format&fit=crop",
      stats: { locations: 4, customers: "500+", team: 45 }
    },
    {
      year: 2014,
      title: "Innovation",
      subtitle: "Culinary Revolution",
      description: "Revolutionized our menu with fusion concepts while staying true to traditional Iraqi flavors and heritage.",
      icon: Award,
      color: "from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
      stats: { locations: 6, customers: "1,200+", team: 78 }
    },
    {
      year: 2016,
      title: "International",
      subtitle: "Crossing Borders",
      description: "Entered the Saudi Arabian market, bringing our authentic flavors to international audiences.",
      icon: Globe,
      color: "from-orange-500 to-red-600",
      image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=2670&auto=format&fit=crop",
      stats: { locations: 8, customers: "2,000+", team: 120 }
    },
    {
      year: 2019,
      title: "Recognition",
      subtitle: "Industry Excellence",
      description: "Recognized as one of the top restaurant chains in the Middle East with multiple prestigious awards.",
      icon: Star,
      color: "from-amber-500 to-yellow-600",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
      stats: { locations: 12, customers: "5,000+", team: 180 }
    },
    {
      year: 2022,
      title: "Digital Era",
      subtitle: "Technology Forward",
      description: "Launched our digital platform and loyalty program, embracing the future of dining experiences.",
      icon: CheckCircle2,
      color: "from-cyan-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?q=80&w=2670&auto=format&fit=crop",
      stats: { locations: 15, customers: "10,000+", team: 250 }
    }
  ];

  const heroImages = [
    { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop", title: "Our First Restaurant", year: "2008" },
    { url: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop", title: "Culinary Innovation", year: "2014" },
    { url: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop", title: "Award Recognition", year: "2019" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-year');
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [id as string]: true }));
            if (id) setActiveYear(Number(id));
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    const elements = (timelineRef.current as HTMLDivElement | null)?.querySelectorAll('[data-year]');
    elements?.forEach((el: Element) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      
      {/* Hero Section - Full Width */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="mb-6 sm:mb-8 inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium">{t.since}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent leading-tight">
            {t.journey}
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
            {t.legacy}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">15+</div>
              <div className="text-xs sm:text-sm text-gray-300">{t.restaurants}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">2</div>
              <div className="text-xs sm:text-sm text-gray-300">{t.countries}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">16</div>
              <div className="text-xs sm:text-sm text-gray-300">{t.years}</div>
            </div>
          </div>

          <button 
            onClick={() => (timelineRef.current as HTMLDivElement | null)?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>{t.exploreStory}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-amber-400 w-6 sm:w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Timeline Section - Full Width */}
      <div ref={timelineRef} className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="w-full max-w-none">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t.milestones}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t.journeyThroughTime}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              {t.journeyDescription}
            </p>
          </div>

          {/* Timeline - Mobile First Design */}
          <div className="relative w-full">
            {/* Central Line - Responsive */}
            <div className="absolute left-4 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-0.5 w-0.5 sm:w-1 h-full bg-gradient-to-b from-gray-200 via-amber-300 to-gray-200 dark:from-gray-700 dark:via-amber-500 dark:to-gray-700" />

            <div className="space-y-8 sm:space-y-12 lg:space-y-20">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const isActive = activeYear === milestone.year;
                const visible = isVisible[String(milestone.year)];

                return (
                  <div
                    key={milestone.year}
                    data-year={milestone.year}
                    className="relative w-full"
                  >
                    {/* Mobile Layout (Always Left Aligned) */}
                    <div className="lg:hidden relative pl-12 sm:pl-20">
                      {/* Timeline Dot - Mobile */}
                      <div className="absolute left-4 sm:left-8 top-6 transform -translate-x-1/2 z-10">
                        <div className={`relative transition-all duration-700 ${
                          visible ? 'scale-100' : 'scale-0'
                        }`}>
                          <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-white dark:border-gray-900 shadow-lg transition-all duration-500 ${
                            isActive 
                              ? `bg-gradient-to-r ${milestone.color} shadow-amber-300/50 dark:shadow-amber-500/50` 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                            {isActive && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 animate-ping opacity-75" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Year Badge - Mobile */}
                      <div className="mb-4">
                        <div className={`inline-block bg-gradient-to-r ${milestone.color} text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-lg`}>
                          {milestone.year}
                        </div>
                      </div>

                      {/* Content Card - Mobile */}
                      <div className={`transition-all duration-700 transform ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 ${
                          isActive ? 'ring-1 sm:ring-2 ring-amber-400 ring-opacity-50' : ''
                        }`}>
                          
                          {/* Image - Mobile */}
                          <div className="relative h-32 sm:h-48 overflow-hidden">
                            <Image
                              src={milestone.image}
                              alt={milestone.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="100vw"
                              priority={index === 0}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-80`} />
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                              <div className="bg-white/20 backdrop-blur-md rounded-full p-1.5 sm:p-2">
                                <milestone.icon className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Content - Mobile */}
                          <div className="p-4 sm:p-6 lg:p-8">
                            <div className="mb-3 sm:mb-4">
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                                {milestone.title}
                              </h3>
                              <p className={`text-xs sm:text-sm font-medium bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                                {milestone.subtitle}
                              </p>
                            </div>
                            
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                              {milestone.description}
                            </p>

                            {/* Stats - Mobile */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-700">
                              <div className="text-center">
                                <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                                  {milestone.stats.locations}
                                </div>
                                <div className="flex flex-col items-center justify-center mt-1">
                                  <MapPin className="w-5 h-5 text-amber-500 mb-1" />
                                  <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">{t.locations}</span>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                                  {milestone.stats.customers}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Daily Customers</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                                  {milestone.stats.team}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Team Members</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout (Alternating Left/Right) */}
                    <div className="hidden lg:flex items-center w-full">
                      {/* Left Side Content */}
                      <div className={`w-5/12 ${isLeft ? 'pr-16' : 'pl-16 order-3'}`}>
                        <div className={`transition-all duration-700 transform ${
                          visible 
                            ? 'translate-y-0 opacity-100' 
                            : `${isLeft ? 'translate-y-10 -translate-x-10' : 'translate-y-10 translate-x-10'} opacity-0`
                        }`}>
                          <div className={`group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${
                            isActive ? 'ring-2 ring-amber-400 ring-opacity-50' : ''
                          }`}>
                            
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={milestone.image}
                                alt={milestone.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="100vw"
                                priority={index === 0}
                              />
                              <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-80`} />
                              <div className="absolute top-4 right-4">
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                                  <milestone.icon className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                              <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                  {milestone.title}
                                </h3>
                                <p className={`text-sm font-medium bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                                  {milestone.subtitle}
                                </p>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {milestone.description}
                              </p>

                              {/* Stats */}
                              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {milestone.stats.locations}
                                  </div>
                                  <div className="flex flex-col items-center justify-center mt-1">
                                    <MapPin className="w-5 h-5 text-amber-500 mb-1" />
                                    <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">{t.locations}</span>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {milestone.stats.customers}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Daily Customers</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {milestone.stats.team}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Team Members</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Center Timeline Dot */}
                      <div className="w-2/12 flex justify-center order-2">
                        <div className="relative z-10">
                          <div className={`relative transition-all duration-700 ${
                            visible ? 'scale-100' : 'scale-0'
                          }`}>
                            <div className={`w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg transition-all duration-500 ${
                              isActive 
                                ? `bg-gradient-to-r ${milestone.color} shadow-amber-300/50 dark:shadow-amber-500/50` 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}>
                              {isActive && (
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 animate-ping opacity-75" />
                              )}
                            </div>
                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                              isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}>
                              <milestone.icon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className={`w-5/12 ${isLeft ? 'pl-16 order-3' : 'pr-16 order-1'}`}>
                        <div className={`transition-all duration-700 ${
                          visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}>
                          <div className={`${isLeft ? 'text-left' : 'text-right'}`}>
                            <div className={`inline-block bg-gradient-to-r ${milestone.color} text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg`}>
                              {milestone.year}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - Full Width */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            {t.readyToJoin}
          </h3>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-amber-100">
            {t.joinUs}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-white text-amber-600 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              {t.visitRestaurants}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105">
              {t.learnMore}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHistory;