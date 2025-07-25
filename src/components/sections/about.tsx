"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { companyInfo } from '@/lib/mock-data';
import { Building, Calendar, Award, Target, Compass, Heart, LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';

const translations = {
  en: {
    about: "About Us",
    headquarters: "HEADQUARTERS",
    founded: "FOUNDED",
    mission: "Our Mission",
    vision: "Our Vision",
    values: "Our Values",
    story: "Our Story",
    readMore: "Read more",
    readLess: "Show less"
  },
  ar: {
    about: "عن الشركة",
    headquarters: "المقر الرئيسي",
    founded: "تأسست عام",
    mission: "مهمتنا",
    vision: "رؤيتنا",
    values: "قيمنا",
    story: "قصتنا",
    readMore: "قراءة المزيد",
    readLess: "عرض أقل"
  }
};

// Icon animation component with proper typing
function AnimatedIcon({ icon: Icon, delay = 0 }: { icon: LucideIcon; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay
      }}
      viewport={{ once: true }}
      className="mr-3 inline-flex p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full"
    >
      <Icon className="w-6 h-6 text-amber-600 dark:text-amber-500" />
    </motion.div>
  );
}

interface AboutProps {
  locale?: string;
}

export default function About({ locale = 'en' }: AboutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use locale prop and ensure it's a valid key
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  
  // Get company info based on current locale
  const companyData = companyInfo[currentLocale];

  // Use the new long description text
  const fullDescription = companyData.longDescription;
  // Show only the first paragraph for the truncated version
  const truncatedDescription = fullDescription.split('\n')[0] + '...';

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
      }
    })
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <section 
      id="about" 
      className={`w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden ${
        currentLocale === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      {/* Fixed heights for the main container to prevent layout shifts */}
      <div className={`flex flex-col ${currentLocale === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {/* Left column - Image with fixed size */}
        <div className="w-full md:w-1/2 relative aspect-[4/3] min-h-[300px] md:min-h-0 overflow-hidden">
          {/* Fixed position and size for image container */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="h-full w-full"
            >
              <Image
                src="/images/restaurants/AWS09315.jpg"
                alt="Traditional Iraqi restaurant interior"
                fill
                className="object-cover object-center"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-${currentLocale === 'ar' ? 'l' : 'r'} from-white/70 to-transparent dark:from-gray-900/70`}></div>
            </motion.div>
          </div>
          
          {/* Text overlay on the image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-gray-800 dark:text-gray-200 z-10">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-3 sm:p-6 rounded-lg">
                <div className={`flex items-center mb-2 ${currentLocale === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <AnimatedIcon icon={Building} />
                  <h3 className={`text-sm sm:text-lg font-bold uppercase tracking-wider ${currentLocale === 'ar' ? 'mr-3 ml-0' : ''}`}>
                    {t.headquarters}
                  </h3>
                </div>
                <p className="text-base sm:text-2xl font-light break-words">
                  {companyData.headquarters}
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-3 sm:p-6 rounded-lg">
                <div className={`flex items-center mb-2 ${currentLocale === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <AnimatedIcon icon={Calendar} delay={0.1} />
                  <h3 className={`text-sm sm:text-lg font-bold uppercase tracking-wider ${currentLocale === 'ar' ? 'mr-3 ml-0' : ''}`}>
                    {t.founded}
                  </h3>
                </div>
                <p className="text-base sm:text-2xl font-light break-words">
                  {companyData.foundedYear}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right column - Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-16 bg-white dark:bg-gray-900">
          <motion.h2 
            className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white ${
              currentLocale === 'ar' ? 'text-right' : 'text-left'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.about}
          </motion.h2>
          
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp} 
              custom={0.1}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className={`flex items-center mb-3 ${currentLocale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AnimatedIcon icon={Award} />
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${currentLocale === 'ar' ? 'mr-3 ml-0' : ''}`}>
                  {t.story}
                </h3>
              </div>
              
              {/* Our Story section with Read More functionality - Fixed height container */}
              <div className={`${currentLocale === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line transition-all duration-300 ease-in-out">
                    {isExpanded ? fullDescription : truncatedDescription}
                  </p>
                </div>
                
                <motion.button
                  onClick={toggleExpand}
                  className={`mt-3 flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-medium transition-all duration-300 ${
                    currentLocale === 'ar' ? 'mr-auto' : 'ml-auto'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExpanded ? (
                    <>
                      {t.readLess} 
                      <ChevronUp className={`w-4 h-4 ${currentLocale === 'ar' ? 'ml-1' : 'ml-1'}`} />
                    </>
                  ) : (
                    <>
                      {t.readMore}
                      <ChevronDown className={`w-4 h-4 ${currentLocale === 'ar' ? 'ml-1' : 'ml-1'}`} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              custom={0.2}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className={`flex items-center mb-3 ${currentLocale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AnimatedIcon icon={Target} delay={0.1} />
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${currentLocale === 'ar' ? 'mr-3 ml-0' : ''}`}>
                  {t.mission}
                </h3>
              </div>
              <p className={`text-gray-700 dark:text-gray-300 ${currentLocale === 'ar' ? 'text-right' : 'text-left'}`}>
                {companyData.mission}
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              custom={0.3}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className={`flex items-center mb-3 ${currentLocale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AnimatedIcon icon={Compass} delay={0.2} />
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${currentLocale === 'ar' ? 'mr-3 ml-0' : ''}`}>
                  {t.vision}
                </h3>
              </div>
              <p className={`text-gray-700 dark:text-gray-300 ${currentLocale === 'ar' ? 'text-right' : 'text-left'}`}>
                {companyData.vision}
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              custom={0.4}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className={`flex items-center mb-3 ${currentLocale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AnimatedIcon icon={Heart} delay={0.3} />
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${currentLocale === 'ar' ? 'mr-3 ml-0' : ''}`}>
                  {t.values}
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companyData.values.map((value, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: currentLocale === 'ar' ? 10 : -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm"
                  >
                    <span className={`flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full ${
                      currentLocale === 'ar' ? 'ml-2 mr-0' : 'mr-2 ml-0'
                    }`}></span>
                    <span className={`text-gray-700 dark:text-gray-300 ${
                      currentLocale === 'ar' ? 'text-right' : 'text-left'
                    }`}>
                      {value}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}