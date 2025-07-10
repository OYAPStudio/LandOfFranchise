"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { companyInfo } from '@/lib/mock-data';
import { Building, Calendar, Award, Target, Compass, Heart, LucideIcon } from 'lucide-react';

const translations = {
  en: {
    about: "About Us",
    headquarters: "HEADQUARTERS",
    founded: "FOUNDED",
    mission: "Our Mission",
    vision: "Our Vision",
    values: "Our Values",
    story: "Our Story"
  },
  ar: {
    about: "عن الشركة",
    headquarters: "المقر الرئيسي",
    founded: "تأسست عام",
    mission: "مهمتنا",
    vision: "رؤيتنا",
    values: "قيمنا",
    story: "قصتنا"
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
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use locale prop directly instead of accessing document
  const currentLocale = (locale as keyof typeof translations) || 'en';
  const t = translations[currentLocale];

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

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <section id="about" className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left column - Image with parallax effect */}
        <div className="w-full md:w-1/2 relative aspect-[4/3] min-h-[300px] md:min-h-0 overflow-hidden flex items-center justify-center">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="h-full w-full relative flex items-center justify-center"
          >
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Traditional Iraqi restaurant interior"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent dark:from-gray-900/70"></div>
          </motion.div>
          
          {/* Text overlay on the image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-gray-800 dark:text-gray-200">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-3 sm:p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <AnimatedIcon icon={Building} />
                  <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">{t.headquarters}</h3>
                </div>
                <p className="text-base sm:text-2xl font-light break-words">Mosul, Iraq</p>
              </div>
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-3 sm:p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <AnimatedIcon icon={Calendar} delay={0.1} />
                  <h3 className="text-sm sm:text-lg font-bold uppercase tracking-wider">{t.founded}</h3>
                </div>
                <p className="text-base sm:text-2xl font-light break-words">2018</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right column - Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-16 bg-white dark:bg-gray-900">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
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
              <div className="flex items-center mb-3">
                <AnimatedIcon icon={Award} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.story}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{companyInfo.longDescription}</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              custom={0.2}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-3">
                <AnimatedIcon icon={Target} delay={0.1} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.mission}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{companyInfo.mission}</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              custom={0.3}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-3">
                <AnimatedIcon icon={Compass} delay={0.2} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.vision}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{companyInfo.vision}</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              custom={0.4}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-3">
                <AnimatedIcon icon={Heart} delay={0.3} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.values}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companyInfo.values.map((value, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm"
                  >
                    <span className="mr-2 flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
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