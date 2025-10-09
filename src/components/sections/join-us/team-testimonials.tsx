'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Calendar,
  Award,
  Heart
} from 'lucide-react';

interface TeamTestimonialsProps {
  locale: string;
}

const translations = {
  en: {
    title: "What Our Team Says",
    subtitle: "Hear from our employees about their experience working with us",
    testimonials: [
      {
        name: "Ahmed Al-Mahmoud",
        position: "Restaurant Manager",
        location: "Baghdad",
        joinDate: "2021",
        image: "/images/team/ahmed.jpg",
        rating: 5,
        quote: "Working here has been incredible. The management truly cares about our growth and development. I've learned so much and had amazing opportunities to advance my career.",
        highlights: ["Career Growth", "Supportive Management", "Great Benefits"]
      },
      {
        name: "Fatima Hussein",
        position: "Head Chef",
        location: "Erbil",
        joinDate: "2020",
        image: "/images/team/fatima.jpg",
        rating: 5,
        quote: "The kitchen environment is professional and creative. I love that we can experiment with new dishes and the team always supports innovation. It's a chef's dream workplace.",
        highlights: ["Creative Freedom", "Professional Kitchen", "Team Support"]
      },
      {
        name: "Omar Salih",
        position: "Customer Service Lead",
        location: "Basrah",
        joinDate: "2022",
        image: "/images/team/omar.jpg",
        rating: 5,
        quote: "The training I received was excellent, and the work environment is very positive. Every day brings new challenges that help me grow professionally.",
        highlights: ["Excellent Training", "Positive Environment", "Daily Growth"]
      },
      {
        name: "Zainab Ali",
        position: "Assistant Manager",
        location: "Mosul",
        joinDate: "2021",
        image: "/images/team/zainab.jpg",
        rating: 5,
        quote: "I started as a server and now I'm assistant manager. The company really invests in promoting from within. The benefits and work-life balance are outstanding.",
        highlights: ["Internal Promotion", "Work-Life Balance", "Great Benefits"]
      },
      {
        name: "Kareem Rashid",
        position: "Shift Supervisor",
        location: "Najaf",
        joinDate: "2023",
        image: "/images/team/kareem.jpg",
        rating: 5,
        quote: "Even as a new employee, I felt welcomed from day one. The team spirit here is amazing and management is always available to help and guide us.",
        highlights: ["Welcoming Team", "Amazing Spirit", "Available Management"]
      }
    ],
    prevButton: "Previous",
    nextButton: "Next"
  },
  ar: {
    title: "ما يقوله فريقنا",
    subtitle: "اسمع من موظفينا عن تجربتهم في العمل معنا",
    testimonials: [
      {
        name: "أحمد المحمود",
        position: "مدير مطعم",
        location: "بغداد",
        joinDate: "2021",
        image: "/images/team/ahmed.jpg",
        rating: 5,
        quote: "العمل هنا كان رائعاً. الإدارة تهتم حقاً بنمونا وتطويرنا. تعلمت الكثير وحصلت على فرص رائعة لتطوير مسيرتي المهنية.",
        highlights: ["النمو المهني", "إدارة داعمة", "مزايا رائعة"]
      },
      {
        name: "فاطمة حسين",
        position: "رئيسة الطباخين",
        location: "أربيل",
        joinDate: "2020",
        image: "/images/team/fatima.jpg",
        rating: 5,
        quote: "بيئة المطبخ مهنية وإبداعية. أحب أننا نستطيع التجريب مع أطباق جديدة والفريق يدعم الابتكار دائماً. إنه مكان عمل حلم للطباخ.",
        highlights: ["حرية إبداعية", "مطبخ مهني", "دعم الفريق"]
      },
      {
        name: "عمر صالح",
        position: "قائد خدمة العملاء",
        location: "البصرة",
        joinDate: "2022",
        image: "/images/team/omar.jpg",
        rating: 5,
        quote: "التدريب الذي تلقيته كان ممتازاً، وبيئة العمل إيجابية جداً. كل يوم يحمل تحديات جديدة تساعدني على النمو مهنياً.",
        highlights: ["تدريب ممتاز", "بيئة إيجابية", "نمو يومي"]
      },
      {
        name: "زينب علي",
        position: "مساعدة مدير",
        location: "الموصل",
        joinDate: "2021",
        image: "/images/team/zainab.jpg",
        rating: 5,
        quote: "بدأت كخادمة والآن أنا مساعدة مدير. الشركة تستثمر حقاً في الترقية من الداخل. المزايا والتوازن بين العمل والحياة ممتازان.",
        highlights: ["ترقية داخلية", "توازن العمل والحياة", "مزايا رائعة"]
      },
      {
        name: "كريم راشد",
        position: "مشرف نوبة",
        location: "النجف",
        joinDate: "2023",
        image: "/images/team/kareem.jpg",
        rating: 5,
        quote: "حتى كموظف جديد، شعرت بالترحيب من اليوم الأول. روح الفريق هنا رائعة والإدارة متاحة دائماً للمساعدة والإرشاد.",
        highlights: ["فريق مرحب", "روح رائعة", "إدارة متاحة"]
      }
    ],
    prevButton: "السابق",
    nextButton: "التالي"
  }
};

export default function TeamTestimonials({ locale }: TeamTestimonialsProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, t.testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  };

  const currentTestimonial = t.testimonials[currentIndex];

  return (
    <section 
      className={`py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 ${isRTL ? 'rtl' : 'ltr'}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
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
            className={`text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group transition-all duration-300 hover:scale-110`}
              aria-label={t.prevButton}
            >
              <ChevronLeft className={`w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group transition-all duration-300 hover:scale-110`}
              aria-label={t.nextButton}
            >
              <ChevronRight className={`w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className={`text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Employee Info */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="text-center md:text-left">
                      <h4 className={`text-xl font-bold text-gray-900 dark:text-white mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {currentTestimonial.name}
                      </h4>
                      <p className={`text-amber-600 dark:text-amber-400 font-medium mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                        {currentTestimonial.position}
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className={isRTL ? 'font-arabic' : ''}>{currentTestimonial.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{currentTestimonial.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6 text-amber-400 fill-current" 
                      />
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentTestimonial.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className={`px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {t.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-500 scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-amber-300 dark:hover:bg-amber-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">98%</div>
            <div className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'رضا الموظفين' : 'Employee Satisfaction'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">85%</div>
            <div className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'ترقية داخلية' : 'Internal Promotions'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">3.2</div>
            <div className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'متوسط سنوات الخدمة' : 'Average Years of Service'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}