"use client";
import { useEffect, useState, useRef } from 'react';
import { Award, TrendingUp, Globe, Utensils, CheckCircle2, Star, Calendar, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';

interface CompanyHistoryProps {
  locale?: string;
}

const translations = {
  en: {
    since: "Since 2020",
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
    locations: "Locations",
    dailyCustomers: "Daily Customers",
    teamMembers: "Team Members"
  },
  ar: {
    since: "منذ 2020",
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
    locations: "المواقع",
    dailyCustomers: "العملاء اليوميين",
    teamMembers: "أعضاء الفريق"
  }
};

const CompanyHistory = ({ locale = 'en' }: CompanyHistoryProps) => {
  // Use locale prop and ensure it's a valid key
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';
  
  const [activeYear, setActiveYear] = useState(2020);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const milestones = [
    {
      year: 2020,
      title: {
        en: "Shawarma Land Launch",
        ar: "إطلاق شاورما لاند"
      },
      subtitle: {
        en: "Humble Beginnings",
        ar: "بدايات متواضعة"
      },
      description: {
        en: "During the COVID-19 lockdown, four friends opened a small shawarma takeaway in Mosul. It quickly gained popularity for its authentic Syrian flavour.",
        ar: "في قلب الأوقات الصعبة خلال جائحة كورونا، اجتمع أربعة أصدقاء يوميًا لمشاركة الأوقات وتخفيف شعورهم بالملل. من هذه اللحظات المشتركة، نشأت فكرة فتح محل لبيع الشاورما السورية في الموصل في شهر أكتوبر من عام 2020. بدأنا العمل بمحل صغير يركز على طلبات السفري والتوصيل."
      },
      icon: Utensils,
      color: "from-red-500 to-orange-600",
      image: "/images/restaurants/AWS1.jpg",
      stats: { locations: 1, customers: "100+", team: 5 }
    },
    {
      year: 2021,
      title: {
        en: "Expansion",
        ar: "التوسع"
      },
      subtitle: {
        en: "Growing Demand",
        ar: "نجاح وانتقال"
      },
      description: {
        en: "Due to increasing popularity, the team moved to a larger location across from the original shop, allowing more capacity and better service.",
        ar: "مع مرور الوقت، أصبحنا مركزًا رائدًا في تقديم الشاورما السورية بجودة عالية. وبعد عام من النجاح، انتقلنا الى موقع جديد اكبر في الجهة المقابلة لموقعنا الاول."
      },
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-400",
      image: "/images/restaurants/AWS2.jpg",
      stats: { locations: 1, customers: "300+", team: 12 }
    },
    {
      year: 2022,
      title: {
        en: "Lamassu Planning",
        ar: "التخطيط لمطعم لاماسو"
      },
      subtitle: {
        en: "Vision for Excellence",
        ar: "رؤية للتميز"
      },
      description: {
        en: "We decided to expand our business scope and began planning for the launch of a new brand under the name 'Lamassu' restaurant.",
        ar: "في عام 2022، قررنا توسيع نطاق أعمالنا وبدأنا العمل والتخطيط لأطلاق براند جديد تحت اسم مطعم 'لاماسو'."
      },
      icon: Award,
      color: "from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
      stats: { locations: 1, customers: "500+", team: 20 }
    },
    {
      year: "2023-September",
      title: {
        en: "Lamassu Restaurant Opens",
        ar: "افتتاح مطعم لاماسو"
      },
      subtitle: {
        en: "Five-Star Dining Experience",
        ar: "تجربة طعام راقية"
      },
      description: {
        en: "In September 2023, we opened Lamassu restaurant, which stands out for providing a refined five-star dining experience in Mosul. This restaurant was and remains the first of its kind to offer distinguished service and luxurious ambiance in the city.",
        ar: "في شهر أيلول من عام 2023 افتتحنا مطعم لاماسو الذي يتميز بتقديم تجربة تناول طعام راقية من فئة خمس نجوم في الموصل. حيث كان وما زال هذا المطعم هو الأول من نوعه الذي يقدم خدمة مميزة وأجواء فاخرة في المدينة، مما جعله وجهة مفضلة للزوار."
      },
      icon: Globe,
      color: "from-blue-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
      stats: { locations: 2, customers: "1,000+", team: 35 }
    },
    {
      year: "2024-July",
      title: {
        en: "START COFFEE Launch",
        ar: "إطلاق ستارت كوفي"
      },
      subtitle: {
        en: "First Government Coffee Shop",
        ar: "أول مقهى في دائرة حكومية"
      },
      description: {
        en: "After the great success we achieved with 'Lamassu', we continued expanding. In 2024, we launched a new coffee brand called START COFFEE, with the first branch in the Ninawa Court of Appeals building.",
        ar: "بعد النجاح الكبير الذي حققناه في 'لاماسو'، واصلنا التوسع، وفي عام 2024 قمنا بإطلاق براند جديد للقهوة اسميناه START COFFEE وكان الفرع الأول في مبنى رئاسة محكمة استئناف نينوى، ليكون بذلك أول كوفي منظم ومرتب بشكل رائع داخل دائرة حكومية في محافظة نينوى."
      },
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop",
      stats: { locations: 3, customers: "1,500+", team: 45 }
    },
    {
      year: "2025-June",
      title: {
        en: "Central Kitchen & New Branches",
        ar: "المطبخ المركزي والفروع الجديدة"
      },
      subtitle: {
        en: "Major Expansion",
        ar: "توسع كبير"
      },
      description: {
        en: "In June 2025, we successfully opened our second Shawarma Land branch, alongside Mosul's first central kitchen built to standard specifications with all hygiene, health, and civil defense requirements. In August 2025, we also opened our second START COFFEE branch.",
        ar: "في حزيران من عام 2025 نجحنا في افتتاح فرعنا الثاني لبراند شاورما لاند، حيث رافق افتتاح هذا الفرع، افتتاح اول مطبخ مركزي في مدينة الموصل مطابق للمواصفات القياسية، تم فيه مراعاة جميع الشروط من حيث النظافة والصحة والدفاع المدني، وفي شهر آب من عام 2025 أيضاً قمنا بافتتاح فرعنا الثاني لستارت كوفي."
      },
      icon: Star,
      color: "from-amber-500 to-yellow-600",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
      stats: { locations: 5, customers: "2,500+", team: 75 }
    },{
      year: "2025-Augest",
      title: {
        en: "Central Kitchen & New Branches",
        ar: "المطبخ المركزي والفروع الجديدة"
      },
      subtitle: {
        en: "Major Expansion",
        ar: "توسع كبير"
      },
      description: {
        en: "In Augest 2025, we successfully opened our START COFFEE branch.",
        ar: "في حزيران من عام 2025 نجحنا في افتتاح فرعنا الثاني لبراند شاورما لاند، حيث رافق افتتاح هذا الفرع، افتتاح اول مطبخ مركزي في مدينة الموصل مطابق للمواصفات القياسية، تم فيه مراعاة جميع الشروط من حيث النظافة والصحة والدفاع المدني، وفي شهر آب من عام 2025 أيضاً قمنا بافتتاح فرعنا الثاني لستارت كوفي."
      },
      icon: Star,
      color: "from-amber-500 to-yellow-600",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
      stats: { locations: 5, customers: "2,500+", team: 75 }
    },
    {
      year: "2025-October",
      title: {
        en: "4IN Fast Food Brand",
        ar: "براند 4IN للطعام السريع"
      },
      subtitle: {
        en: "The Future of Fast Food",
        ar: "مستقبل الطعام السريع"
      },
      description: {
        en: "Preparing to launch our innovative fast food concept brand — 4IN — focusing on affordability, speed, and quality to serve a broader customer base.",
        ar: "نستعد لإطلاق مفهوم مبتكر جديد للطعام السريع — 4IN — يركز على الأسعار المعقولة والسرعة والجودة لخدمة قاعدة أوسع من العملاء."
      },
      icon: Star,
      color: "from-indigo-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2781&auto=format&fit=crop",
      stats: { locations: "TBD", customers: "-", team: "-" }
    }
  ];

  const heroImages = [
    { 
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop", 
      title: { en: "Our First Restaurant", ar: "مطعمنا الأول" }, 
      year: "2020" 
    },
    { 
      url: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop", 
      title: { en: "Culinary Innovation", ar: "الابتكار الطهي" }, 
      year: "2022" 
    },
    { 
      url: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop", 
      title: { en: "Award Recognition", ar: "الاعتراف بالجوائز" }, 
      year: "2024" 
    },
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
    <div className={`w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 ${isRTL ? 'rtl' : 'ltr'}`}>
      
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
                alt={img.title[currentLocale]}
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
        <div className={`relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full ${isRTL ? 'text-center' : 'text-center'}`}>
          <div className={`mb-6 sm:mb-8 inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
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
              <div className="text-xl sm:text-2xl font-bold text-amber-400">6+</div>
              <div className="text-xs sm:text-sm text-gray-300">{t.restaurants}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">1</div>
              <div className="text-xs sm:text-sm text-gray-300">{t.countries}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">5</div>
              <div className="text-xs sm:text-sm text-gray-300">{t.years}</div>
            </div>
          </div>

          <button 
            onClick={() => (timelineRef.current as HTMLDivElement | null)?.scrollIntoView({ behavior: 'smooth' })}
            className={`group inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              isRTL ? 'space-x-reverse space-x-2 sm:space-x-3' : 'space-x-2 sm:space-x-3'
            }`}
          >
            <span>{t.exploreStory}</span>
            <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
              isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'
            }`} />
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
          <div className={`text-center mb-12 sm:mb-16 lg:mb-20 ${isRTL ? 'text-center' : 'text-center'}`}>
            <div className={`inline-flex items-center bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 ${
              isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'
            }`}>
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
            <div className={`absolute w-0.5 sm:w-1 h-full bg-gradient-to-b from-gray-200 via-amber-300 to-gray-200 dark:from-gray-700 dark:via-amber-500 dark:to-gray-700 ${
              isRTL 
                ? 'right-4 sm:right-8 lg:right-1/2 lg:transform lg:translate-x-0.5' 
                : 'left-4 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-0.5'
            }`} />

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
                    {/* Mobile Layout */}
                    <div className={`lg:hidden relative ${isRTL ? 'pr-12 sm:pr-20' : 'pl-12 sm:pl-20'}`}>
                      {/* Timeline Dot - Mobile */}
                      <div className={`absolute top-6 transform z-10 ${
                        isRTL 
                          ? 'right-4 sm:right-8 translate-x-1/2' 
                          : 'left-4 sm:left-8 -translate-x-1/2'
                      }`}>
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
                      <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
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
                              alt={milestone.title[currentLocale]}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="100vw"
                              priority={index === 0}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-80`} />
                            <div className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}`}>
                              <div className="bg-white/20 backdrop-blur-md rounded-full p-1.5 sm:p-2">
                                <milestone.icon className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Content - Mobile */}
                          <div className="p-4 sm:p-6 lg:p-8">
                            <div className={`mb-3 sm:mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                                {milestone.title[currentLocale]}
                              </h3>
                              <p className={`text-xs sm:text-sm font-medium bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                                {milestone.subtitle[currentLocale]}
                              </p>
                            </div>
                            
                            <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {milestone.description[currentLocale]}
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
                                <div className="text-xs text-gray-500 dark:text-gray-400">{t.dailyCustomers}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                                  {milestone.stats.team}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{t.teamMembers}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout (Alternating Left/Right) */}
                    <div className="hidden lg:flex items-center w-full">
                      {/* Left Side Content */}
                      <div className={`w-5/12 ${
                        isRTL 
                          ? (isLeft ? 'pl-16 order-3' : 'pr-16 order-1')
                          : (isLeft ? 'pr-16' : 'pl-16 order-3')
                      }`}>
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
                                alt={milestone.title[currentLocale]}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="100vw"
                                priority={index === 0}
                              />
                              <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-80`} />
                              <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                                  <milestone.icon className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                              <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                  {milestone.title[currentLocale]}
                                </h3>
                                <p className={`text-sm font-medium bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                                  {milestone.subtitle[currentLocale]}
                                </p>
                              </div>
                              
                              <p className={`text-gray-600 dark:text-gray-300 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {milestone.description[currentLocale]}
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
                                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.dailyCustomers}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {milestone.stats.team}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.teamMembers}</div>
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
                      <div className={`w-5/12 ${
                        isRTL 
                          ? (isLeft ? 'pr-16 order-1' : 'pl-16 order-3')
                          : (isLeft ? 'pl-16 order-3' : 'pr-16 order-1')
                      }`}>
                        <div className={`transition-all duration-700 ${
                          visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}>
                          <div className={`${
                            isRTL 
                              ? (isLeft ? 'text-right' : 'text-left')
                              : (isLeft ? 'text-left' : 'text-right')
                          }`}>
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
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'text-center' : 'text-center'}`}>
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