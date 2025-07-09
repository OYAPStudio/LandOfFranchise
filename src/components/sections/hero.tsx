"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Expanded slideshow data with Arabic translations
const slideshowContent = {
  en: [
    {
      id: 1,
      type: 'image',
      src: '/images/restaurants/AWS02567.jpg',
      alt: 'Traditional Middle Eastern cuisine',
      title: 'Experience Authentic Flavors',
      subtitle: 'Discover the rich culinary heritage of Iraq',
    },
    {
      id: 2,
      type: 'image',
      src: '/images/restaurants/AWS02010.jpg',
      alt: 'Elegant restaurant interior',
      title: 'Elegant Dining Experience',
      subtitle: 'Creating memorable moments in exceptional settings',
    },
    {
      id: 3,
      type: 'image',
      src: '/images/restaurants/AWS02014.jpg',
      alt: 'Fine dining plated food',
      title: 'Culinary Excellence',
      subtitle: 'Where tradition meets innovation',
    },
    {
      id: 4,
      type: 'image',
      src: '/images/restaurants/AWS09279.jpg',
      alt: 'Restaurant ambience video',
      title: 'Immersive Atmosphere',
      subtitle: 'Feel the essence of authentic Middle Eastern hospitality',
    },
    {
      id: 5,
      type: 'image',
      src: '/images/restaurants/DSC00026.jpg',
      alt: 'Fine dining plated food',
      title: 'Culinary Excellence',
      subtitle: 'Where tradition meets innovation',
    },{
      id: 6,
      type: 'image',
      src: '/images/restaurants/AWS09281.jpg',
      alt: 'Fine dining plated food',
      title: 'Culinary Excellence',
      subtitle: 'Where tradition meets innovation',
    },{
      id: 7,
      type: 'image',
      src: '/images/restaurants/AWS09315.jpg',
      alt: 'Fine dining plated food',
      title: 'Culinary Excellence',
      subtitle: 'Where tradition meets innovation',
    },
  ],
  ar: [
    {
      id: 1,
      type: 'image',
      src: '/images/restaurants/AWS02567.jpg',
      alt: 'المأكولات الشرق أوسطية التقليدية',
      title: 'استمتع بالنكهات الأصيلة',
      subtitle: 'اكتشف التراث الطهي الغني للعراق',
    },
    {
      id: 2,
      type: 'image',
      src: '/images/restaurants/AWS02010.jpg',
      alt: 'ديكور مطعم أنيق',
      title: 'تجربة طعام راقية',
      subtitle: 'نخلق لحظات لا تنسى في أجواء استثنائية',
    },
    {
      id: 3,
      type: 'image',
      src: '/images/restaurants/AWS02014.jpg',
      alt: 'طبق طعام فاخر',
      title: 'التميز في فن الطهي',
      subtitle: 'حيث يلتقي التقليد بالابتكار',
    },
    {
      id: 4,
      type: 'video',
      src: '/videos/restaurant-ambience.mp4',
      alt: 'فيديو أجواء المطعم',
      title: 'أجواء غامرة',
      subtitle: 'استشعر جوهر الضيافة الشرق أوسطية الأصيلة',
    }
  ]
};

// Expanded translations
const translations = {
  en: {
    cta: "Explore Our Restaurants",
    years: "Years of Culinary Excellence",
    throughTheYears: "Through The Years",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: "Go to slide"
  },
  ar: {
    cta: "استكشف مطاعمنا",
    years: "سنوات من التميز في فن الطهي",
    throughTheYears: "على مر السنين",
    prevSlide: "الشريحة السابقة",
    nextSlide: "الشريحة التالية",
    goToSlide: "انتقل إلى الشريحة"
  }
};

interface HeroProps {
  locale?: string;
}

export default function Hero({ locale = 'en' }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0); // 1 for right, -1 for left, 0 for initial
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isAutoplayEnabled = useRef(true);
  
  // Use locale prop directly instead of accessing document
  const currentLocale = (locale in slideshowContent) ? locale as keyof typeof slideshowContent : 'en';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (currentSlide !== prevSlide) {
      // Determine the direction based on slide change
      if (slideDirection === 0) {
        // For the initial load or after a direct selection
        const newDirection = currentSlide > prevSlide ? 1 : -1;
        // Handle wrap-around case
        if (currentSlide === 0 && prevSlide === slides.length - 1) {
          setSlideDirection(1);
        } else if (currentSlide === slides.length - 1 && prevSlide === 0) {
          setSlideDirection(-1);
        } else {
          setSlideDirection(newDirection);
        }
      }
      
      setPrevSlide(currentSlide);
    }
    
    // Set up automatic slide transition
    if (isMounted) {
      startSlideTimer();
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [currentSlide, prevSlide, slideDirection, currentLocale, isMounted]);

  // Ensure autoplay continues
  useEffect(() => {
    if (!isMounted) return;

    // Start autoplay when component mounts
    startSlideTimer();
    
    // Add event listeners to pause autoplay when user interacts with the page
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (slideInterval.current) {
          clearInterval(slideInterval.current);
        }
      } else {
        startSlideTimer();
      }
    };
    
    const handleFocus = () => {
      isAutoplayEnabled.current = true;
      startSlideTimer();
    };
    
    const handleBlur = () => {
      isAutoplayEnabled.current = false;
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isMounted]);

  // Fix for video playback
  useEffect(() => {
    if (!isMounted) return;

    // If the current slide is a video, ensure it plays
    if (slides[currentSlide]?.type === 'video' && videoRef.current) {
      const playVideo = async () => {
        try {
          // Try to load and play the video
          await videoRef.current?.load();
          const playPromise = videoRef.current?.play();
          
          // Handle the play promise to avoid DOMException
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Video playback started successfully
                console.log('Video playback started');
              })
              .catch(error => {
                // Auto-play was prevented or there was an error
                console.error('Video playback failed:', error);
              });
          }
        } catch (error) {
          console.error('Error starting video:', error);
        }
      };
      
      playVideo();
    }
  }, [currentSlide, currentLocale, isMounted]);

  const startSlideTimer = () => {
    // Clear existing interval if any
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    // If the slide was changed manually, reset after a longer delay to allow viewing
    const delay = isManualChange ? 8000 : 5000;
    
    // Set new interval
    slideInterval.current = setInterval(() => {
      if (!isAnimating && isAutoplayEnabled.current) {
        goToNextSlide(false); // false means it's not a manual change
      }
    }, delay);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    // Store previous slide to determine direction
    setPrevSlide(currentSlide);
    
    // Determine slide direction (left or right)
    const newDirection = index > currentSlide ? 1 : -1;
    // Handle wrap-around case
    if (index === 0 && currentSlide === slides.length - 1) {
      setSlideDirection(1);
    } else if (index === slides.length - 1 && currentSlide === 0) {
      setSlideDirection(-1);
    } else {
      setSlideDirection(newDirection);
    }
    
    setIsAnimating(true);
    setCurrentSlide(index);
    setIsManualChange(true);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(-1); // Left direction
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsManualChange(true);
  };

  const goToNextSlide = (manual = true) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(1); // Right direction
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsManualChange(manual);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  if (!isMounted) {
    return null; // Prevent server-side rendering mismatch
  }

  const t = translations[currentLocale] || translations.en;
  const slides = slideshowContent[currentLocale] || slideshowContent.en;
  const currentContent = slides[currentSlide] || slides[0];

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Slideshow background */}
      <AnimatePresence initial={false} custom={slideDirection} mode="sync">
        <motion.div
          key={`slide-${currentSlide}`}
          custom={slideDirection}
          initial={{
            x: slideDirection > 0 ? '5%' : '-5%',
            opacity: 0,
            scale: 1.05,
            filter: "blur(4px)",
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            x: slideDirection < 0 ? '5%' : '-5%',
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)",
          }}
          transition={{
            x: { 
              type: "tween", 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            },
            opacity: { 
              duration: 0.7,
              ease: "easeOut"
            },
            scale: {
              duration: 0.9,
              ease: [0.34, 1.56, 0.64, 1]
            },
            filter: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          onAnimationComplete={handleAnimationComplete}
          className="absolute inset-0 z-0"
        >
          {currentContent.type === 'image' ? (
            <>
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={currentContent.src}
                  alt={currentContent.alt}
                  fill
                  className="object-cover transform scale-[1.01]"
                  quality={90}
                  priority
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transform scale-[1.01]"
                >
                  <source src={currentContent.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={`nav-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'bg-amber-500 w-10' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`${t.goToSlide} ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow navigation */}
      <button 
        className="absolute left-6 top-1/2 z-30 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white/90 hover:text-white transition-all duration-300 transform -translate-y-1/2 backdrop-blur-sm"
        onClick={goToPrevSlide}
        disabled={isAnimating}
        aria-label={t.prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute right-6 top-1/2 z-30 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white/90 hover:text-white transition-all duration-300 transform -translate-y-1/2 backdrop-blur-sm"
        onClick={() => goToNextSlide(true)}
        disabled={isAnimating}
        aria-label={t.nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Hero content */}
      <div className="container relative z-20 mx-auto h-full flex items-center px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              staggerChildren: 0.1,
              delayChildren: 0.2,
            }}
            className="max-w-3xl"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl font-bold text-amber-400 mb-2"
            >
              {currentContent.title}
            </motion.h2>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center mb-4"
            >
              <div className="relative w-20 h-20 mr-4">
                <Image 
                  src="/images/logo/LF-2.png" 
                  alt={`${companyInfo.name} Logo`}
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {companyInfo.name}
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-6"
            >
              {currentContent.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="w-16 h-1 bg-amber-500"></div>
              <p className="text-amber-300 font-medium">
                17 {t.years}
              </p>
            </motion.div>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-8 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:translate-y-[-2px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}