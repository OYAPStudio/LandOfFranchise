"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { companyStats } from '@/lib/mock-data';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  Utensils, 
  Users, 
  Calendar, 
  MapPin, 
  Globe, 
  UserPlus,
  LucideIcon
} from 'lucide-react';

const translations = {
  en: {
    title: "Our Numbers",
    subtitle: "Experience the legacy we've built over the years",
    restaurants: "Restaurants",
    employees: "Employees",
    years: "Years",
    locations: "Locations",
    countries: "Countries",
    annualCustomers: "Annual Customers"
  },
  ar: {
    title: "أرقامنا",
    subtitle: "تجربة الإرث الذي بنيناه على مر السنين",
    restaurants: "مطاعم",
    employees: "موظفين",
    years: "سنوات",
    locations: "مواقع",
    countries: "دول",
    annualCustomers: "عملاء سنويًا"
  }
};

// Enhanced animated icon component with proper typing
interface AnimatedIconProps {
  icon: LucideIcon;
  delay?: number;
}

function AnimatedIcon({ icon: Icon, delay = 0 }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15, opacity: 0 }}
      whileInView={{ 
        scale: 1, 
        rotate: 0, 
        opacity: 1
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay
      }}
      viewport={{ once: true }}
      className="mb-4 inline-flex p-4 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800/30 dark:to-amber-900/30 rounded-full shadow-md"
    >
      <Icon className="w-8 h-8 text-amber-600 dark:text-amber-500" />
    </motion.div>
  );
}

// Enhanced animated counter component with icon and hover effect
interface AnimatedCounterProps {
  end: number;
  label: string;
  icon: LucideIcon;
  delay?: number;
  color?: string;
}

function AnimatedCounter({ 
  end, 
  label, 
  icon: Icon, 
  delay = 0,
  color = "amber" 
}: AnimatedCounterProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
    }
  }, [inView, hasStarted]);

  // Handle special formatting for years (no comma separator)
  const useComma = label !== translations.en.years && label !== translations.ar.years;

  const colorClasses = {
    amber: "bg-white dark:bg-gray-800 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/10 text-amber-600 dark:text-amber-500",
    blue: "bg-white dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 text-blue-600 dark:text-blue-500",
    green: "bg-white dark:bg-gray-800 group-hover:bg-green-50 dark:group-hover:bg-green-900/10 text-green-600 dark:text-green-500",
    purple: "bg-white dark:bg-gray-800 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/10 text-purple-600 dark:text-purple-500",
    red: "bg-white dark:bg-gray-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/10 text-red-600 dark:text-red-500",
    teal: "bg-white dark:bg-gray-800 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/10 text-teal-600 dark:text-teal-500"
  };

  const textClasses = {
    amber: "text-amber-600 dark:text-amber-500",
    blue: "text-blue-600 dark:text-blue-500",
    green: "text-green-600 dark:text-green-500",
    purple: "text-purple-600 dark:text-purple-500",
    red: "text-red-600 dark:text-red-500",
    teal: "text-teal-600 dark:text-teal-500"
  };

  return (
    <motion.div 
      ref={ref} 
      className={`text-center p-8 rounded-lg shadow-md transition-all duration-300 group ${colorClasses[color as keyof typeof colorClasses]}`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div className="mb-4">
        <AnimatedIcon icon={Icon} delay={delay} />
      </motion.div>
      
      <motion.div 
        className={`text-5xl md:text-6xl font-bold mb-2 ${textClasses[color as keyof typeof textClasses]}`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        {hasStarted ? (
          <CountUp
            start={0}
            end={end}
            duration={2.5}
            separator={useComma ? "," : ""}
            useEasing={true}
          />
        ) : (
          "0"
        )}
        {end === 250000 && "+"}
      </motion.div>
      <motion.div 
        className="text-gray-600 dark:text-gray-400 font-medium text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

interface StatsProps {
  locale?: string;
}

export default function StatsSection({ locale = 'en' }: StatsProps) {
  // Use the locale prop directly instead of accessing document
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <section id="stats" className="py-24 w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
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
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter 
              end={companyStats.totalRestaurants} 
              label={t.restaurants} 
              icon={Utensils}
              delay={0.2}
              color="amber"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter 
              end={companyStats.totalEmployees} 
              label={t.employees} 
              icon={Users}
              delay={0.3}
              color="blue"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter 
              end={companyStats.yearsInBusiness} 
              label={t.years} 
              icon={Calendar}
              delay={0.4}
              color="green"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter 
              end={companyStats.locations} 
              label={t.locations} 
              icon={MapPin}
              delay={0.5}
              color="purple"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter 
              end={companyStats.countriesPresent} 
              label={t.countries} 
              icon={Globe}
              delay={0.6}
              color="red"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter 
              end={250000} 
              label={t.annualCustomers} 
              icon={UserPlus}
              delay={0.7}
              color="teal"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}