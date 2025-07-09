"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Award, TrendingUp, Globe, Utensils, CheckCircle2, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const translations = {
  en: {
    title: "Our Journey",
    subtitle: "A legacy of culinary excellence since 2008",
    foundedTitle: "Foundation",
    expansionTitle: "Expansion",
    innovationTitle: "Innovation",
    recognitionTitle: "Recognition",
    foundedDesc: "Established our first restaurant in Baghdad, focusing on authentic Iraqi cuisine with a modern twist.",
    expansionDesc: "Expanded to multiple locations across Iraq and entered the Saudi Arabian market.",
    innovationDesc: "Revolutionized our menu with fusion concepts while staying true to traditional flavors.",
    recognitionDesc: "Recognized as one of the top restaurant chains in the Middle East.",
    readMore: "Read More",
    timeline: "Our Timeline",
    milestones: "Key Milestones",
    throughTheYears: "Through The Years",
    prev: "Previous",
    next: "Next"
  },
  ar: {
    title: "رحلتنا",
    subtitle: "إرث من التميز في فن الطهي منذ عام 2008",
    foundedTitle: "التأسيس",
    expansionTitle: "التوسع",
    innovationTitle: "الابتكار",
    recognitionTitle: "التقدير",
    foundedDesc: "تأسس مطعمنا الأول في بغداد، مع التركيز على المطبخ العراقي الأصيل بلمسة عصرية.",
    expansionDesc: "توسعنا إلى مواقع متعددة في جميع أنحاء العراق ودخلنا السوق السعودي.",
    innovationDesc: "أحدثنا ثورة في قائمتنا بمفاهيم الدمج مع الحفاظ على النكهات التقليدية.",
    recognitionDesc: "تم الاعتراف بنا كواحدة من أفضل سلاسل المطاعم في الشرق الأوسط.",
    readMore: "قراءة المزيد",
    timeline: "الجدول الزمني",
    milestones: "الإنجازات الرئيسية",
    throughTheYears: "على مر السنين",
    prev: "السابق",
    next: "التالي"
  }
};

// Timeline data with proper typing
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2008,
    title: "First Restaurant",
    description: "Opened our first restaurant in Baghdad's Al Mansour district",
    icon: Utensils
  },
  {
    year: 2011,
    title: "Expansion Begins",
    description: "Expanded to three more locations in Baghdad and Basra",
    icon: TrendingUp
  },
  {
    year: 2014,
    title: "Menu Innovation",
    description: "Launched our signature fusion menu combining traditional and modern cuisine",
    icon: Award
  },
  {
    year: 2016,
    title: "International Growth",
    description: "Entered the Saudi Arabian market with our first international restaurant",
    icon: Globe
  },
  {
    year: 2019,
    title: "Industry Recognition",
    description: "Received 'Best Restaurant Chain' award at the Middle East Restaurant Awards",
    icon: Award
  },
  {
    year: 2022,
    title: "Digital Transformation",
    description: "Launched our digital ordering platform and loyalty program",
    icon: CheckCircle2
  }
];

// Slideshow data with proper typing
interface SlideshowImage {
  year: number;
  title: string;
  src: string;
  alt: string;
}

const slideshowImages: SlideshowImage[] = [
  {
    year: 2008,
    title: "Our First Restaurant",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop",
    alt: "First restaurant in 2008"
  },
  {
    year: 2014,
    title: "Menu Innovation",
    src: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
    alt: "Team celebration in 2014"
  },
  {
    year: 2019,
    title: "Award Recognition",
    src: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
    alt: "Award ceremony in 2019"
  },
  {
    year: 2020,
    title: "Pandemic Adaptation",
    src: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=2670&auto=format&fit=crop",
    alt: "Adapting during challenging times"
  },
  {
    year: 2022,
    title: "Digital Expansion",
    src: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?q=80&w=2670&auto=format&fit=crop",
    alt: "Launching our digital platforms"
  }
];

interface TimelineItemProps {
  year: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLeft: boolean;
  index: number;
}

// Timeline Item Component
function TimelineItem({ year, title, description, icon: Icon, isLeft, index }: TimelineItemProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className={`flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-8`}
    >
      <div className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center w-full max-w-md`}>
        <motion.div 
          className={`p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 ${isLeft ? 'mr-4' : 'ml-4'}`}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={inView ? { 
            scale: 1, 
            rotate: 0, 
            opacity: 1
          } : { scale: 0, rotate: -90, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.3
          }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        
        <div className={`bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-amber-500 ${isLeft ? 'text-left' : 'text-right'}`}>
          <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded mb-2">
            {year}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Slideshow Component
interface SlideshowProps {
  images: SlideshowImage[];
  locale: 'en' | 'ar';
}

function Slideshow({ images, locale }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[locale];
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  return (
    <div className="relative h-96 w-full rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <span className="text-sm font-medium text-amber-400">{images[currentIndex].year}</span>
              <h4 className="text-xl font-bold text-white mb-4">{images[currentIndex].title}</h4>
              <div className="flex space-x-2">
                <span className="h-2 w-full bg-gray-500 rounded overflow-hidden">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-full block rounded ${
                        index === currentIndex ? 'bg-amber-500 animate-pulse' : 'bg-gray-500'
                      } ${index === currentIndex ? 'w-full' : 'w-0'}`}
                      style={{
                        width: index === currentIndex ? '100%' : '0%',
                        transition: 'width 0.5s ease'
                      }}
                    ></span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation controls */}
      <div className="absolute inset-x-0 bottom-16 flex justify-between items-center px-4">
        <button 
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          aria-label={t.prev}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentIndex ? 'bg-amber-500' : 'bg-white/50'
              } transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <button 
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          aria-label={t.next}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

interface CompanyHistoryProps {
  locale?: string;
}

export default function CompanyHistory({ locale = 'en' }: CompanyHistoryProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use locale prop directly instead of accessing document
  const currentLocale = (locale as keyof typeof translations) || 'en';
  const t = translations[currentLocale];

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <section id="company-history" className="py-20 bg-gray-50 dark:bg-gray-900 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-1 bg-amber-500 mx-auto mb-2"></div>
            <div className="w-10 h-1 bg-amber-500 mx-auto"></div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent dark:from-amber-500 dark:to-amber-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </div>
      
      {/* Full width cards section */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-amber-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="p-3 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 w-fit"
                initial={{ scale: 0, opacity: 0, y: -10 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                viewport={{ once: true }}
              >
                <Utensils className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.foundedTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t.foundedDesc}</p>
              <span className="text-amber-600 dark:text-amber-400 font-medium">2008</span>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-amber-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="p-3 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 w-fit"
                initial={{ scale: 0, opacity: 0, y: -10 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
                viewport={{ once: true }}
              >
                <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.expansionTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t.expansionDesc}</p>
              <span className="text-amber-600 dark:text-amber-400 font-medium">2011-2016</span>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-amber-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="p-3 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 w-fit"
                initial={{ scale: 0, opacity: 0, y: -10 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4
                }}
                viewport={{ once: true }}
              >
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.innovationTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t.innovationDesc}</p>
              <span className="text-amber-600 dark:text-amber-400 font-medium">2014-2019</span>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-amber-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="p-3 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 w-fit"
                initial={{ scale: 0, opacity: 0, y: -10 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5
                }}
                viewport={{ once: true }}
              >
                <CheckCircle2 className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.recognitionTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t.recognitionDesc}</p>
              <span className="text-amber-600 dark:text-amber-400 font-medium">2019-Present</span>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Full width timeline section */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.timeline}
          </motion.h3>
          
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 dark:bg-amber-900/50"></div>
            
            <div className="relative">
              {timelineEvents.map((event, index) => (
                <TimelineItem 
                  key={event.year}
                  year={event.year}
                  title={event.title}
                  description={event.description}
                  icon={event.icon}
                  isLeft={index % 2 === 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Full width slideshow section */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.throughTheYears}
          </motion.h3>
          
          <Slideshow images={slideshowImages} locale={currentLocale} />
        </div>
      </div>
    </section>
  );
}