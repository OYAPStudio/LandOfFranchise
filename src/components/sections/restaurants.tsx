"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { restaurants } from '@/lib/mock-data';
import { Calendar, Building2, Users, MapPin, Clock, Bookmark, Send, Navigation, Utensils, Phone, LucideIcon } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const translations = {
  en: {
    title: "Our Restaurants",
    subtitle: "Discover our unique brands",
    visitWebsite: "Visit Website",
    employees: "Employees",
    since: "Since",
    locations: "Locations",
    growing: "and growing",
    cuisine: "Cuisine",
    hours: "Hours",
    address: "Address",
    getDirections: "Get Directions",
    callNow: "Call Now",
    reserveTable: "Reserve a Table",
    menuHighlights: "Menu Highlights",
    specialties: "Specialties",
    rating: "Customer Rating",
    moreDetails: "More Details",
    lessDetails: "Less Details",
    comingSoon: "Coming soon"
  },
  ar: {
    title: "مطاعمنا",
    subtitle: "اكتشف علاماتنا التجارية الفريدة",
    visitWebsite: "زيارة الموقع",
    employees: "الموظفين",
    since: "منذ",
    locations: "المواقع",
    growing: "وتنمو",
    cuisine: "المطبخ",
    hours: "ساعات العمل",
    address: "العنوان",
    getDirections: "الاتجاهات",
    callNow: "اتصل الآن",
    reserveTable: "احجز طاولة",
    menuHighlights: "أبرز القائمة",
    specialties: "التخصصات",
    rating: "تقييم العملاء",
    moreDetails: "المزيد من التفاصيل",
    lessDetails: "أقل تفاصيل",
    comingSoon: "قريباً"
  }
};

// Improved Animated Counter Component
function AnimatedCounter({ value, suffix = "", useComma = true }: { value: number; suffix?: string; useComma?: boolean }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className="font-bold">
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={2}
          separator={useComma ? "," : ""}
          suffix={suffix}
        />
      ) : (
        `0${suffix}`
      )}
    </span>
  );
}

// Button Component with enhanced animations and proper typing
interface ButtonProps {
  icon: LucideIcon;
  text: string;
  primary?: boolean;
  onClick?: () => void;
  isRTL?: boolean;
}

function Button({ icon: Icon, text, primary = false, onClick, isRTL = false }: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
        isRTL ? 'flex-row-reverse' : ''
      } ${
        primary
          ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
          : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
      }`}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <motion.div
        className="inline-block"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [-5, 5, 0] }}
        transition={{
          rotate: { duration: 0.5, ease: "easeInOut" }
        }}
      >
        <Icon className="w-4 h-4" />
      </motion.div>
      <span>{text}</span>
    </motion.button>
  );
}

// Badge Component
function Badge({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
    >
      {text}
    </motion.span>
  );
}

interface RestaurantsProps {
  locale?: string;
}

export default function Restaurants({ locale = 'en' }: RestaurantsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<number | null>(null);
  
  // Use locale prop and ensure it's a valid key
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';

  // Toggle expanded details
  const toggleExpand = (index: number) => {
    setExpandedDetails(expandedDetails === index ? null : index);
  };

  // More subtle, professional animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Reduced stagger timing for more professional feel
      }
    }
  };

  const restaurantCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 // Reduced distance for subtler entrance
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25, // Increased damping for less bounce
        stiffness: 120, // Adjusted stiffness for more elegant motion
        mass: 1.1 // Slightly higher mass for more weight
      }
    },
    hover: {
      y: -3, // More subtle hover lift
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 400
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0,
      y: -10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05, // More subtle scale on hover
      rotateZ: 5, // Slight rotation for playful interaction
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120
      }
    }
  };

  // Function to generate Google Maps directions URL
  const getDirectionsUrl = (location: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  };

  return (
    <section 
      id="restaurants" 
      className={`py-24 w-full bg-white dark:bg-gray-800 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <motion.div 
          className="space-y-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {restaurants.map((restaurant, index) => {
            // Get restaurant data based on current locale
            const restaurantData = restaurant[currentLocale];
            
            return (
              <motion.div
                key={restaurant.id}
                className="relative"
                variants={restaurantCardVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Logo that overlaps the top of the card */}
                <motion.div 
                  className={`absolute -top-16 z-10 ${isRTL ? 'right-10' : 'left-10'}`}
                  variants={logoVariants}
                  whileHover="hover"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-lg shadow-amber-200 dark:shadow-amber-900/20 flex items-center justify-center p-1 border-2 border-white dark:border-gray-800">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                      {restaurantData.logo ? (
                        // Display the logo if available
                        <Image 
                          src={restaurantData.logo} 
                          alt={`${restaurantData.name} logo`}
                          width={150}
                          height={150}
                          className="object-contain"
                        />
                      ) : (
                        // Fallback to initials if no logo is available
                        <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {restaurantData.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                  style={{ 
                    boxShadow: activeIndex === index 
                      ? "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 0 15px -5px rgba(245, 158, 11, 0.1)" 
                      : "0 10px 30px -15px rgba(0, 0, 0, 0.1)" 
                  }}
                  transition={{ 
                    boxShadow: { duration: 0.5 }
                  }}
                >
                  <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    {/* Info section */}
                    <div className="w-full md:w-1/2 p-10 pt-16 relative">
                      <div className={`flex flex-wrap gap-2 mb-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        <Badge text={restaurantData.cuisineType} />
                        {restaurantData.specialties && <Badge text={restaurantData.specialties} />}
                      </div>
                      
                      <h3 className={`text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center ${
                        isRTL ? 'text-right justify-end' : 'text-left justify-start'
                      }`}>
                        {restaurantData.name}
                      </h3>
                      
                      <p className={`text-gray-600 dark:text-gray-300 mb-6 pl-3 italic ${
                        isRTL 
                          ? 'border-r-4 border-amber-500 pr-3 pl-0 text-right' 
                          : 'border-l-4 border-amber-500 text-left'
                      }`}>
                        {restaurantData.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <motion.div 
                            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30"
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              type: "spring" as const, 
                              stiffness: 260, 
                              damping: 20, 
                              delay: 0.1 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#FEF3C7",
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                          </motion.div>
                          <span className={`text-gray-700 dark:text-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <span className="font-semibold">{t.since}:</span> <AnimatedCounter value={restaurantData.foundedYear} useComma={false} />
                          </span>
                        </div>
                        
                        <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <motion.div 
                            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30"
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              type: "spring" as const, 
                              stiffness: 260, 
                              damping: 20, 
                              delay: 0.2 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#FEF3C7",
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Users className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                          </motion.div>
                          <span className={`text-gray-700 dark:text-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <span className="font-semibold">{t.employees}:</span> <AnimatedCounter value={restaurantData.employeeCount} />
                          </span>
                        </div>

                        <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <motion.div 
                            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30"
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              type: "spring" as const, 
                              stiffness: 260, 
                              damping: 20, 
                              delay: 0.3 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#FEF3C7",
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                          </motion.div>
                          <span className={`text-gray-700 dark:text-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <span className="font-semibold">{t.hours}:</span> {restaurantData.openingHours}
                          </span>
                        </div>
                        
                        <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <motion.div 
                            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30"
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              type: "spring" as const, 
                              stiffness: 260, 
                              damping: 20, 
                              delay: 0.4 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#FEF3C7",
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                          </motion.div>
                          <span className={`text-gray-700 dark:text-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <span className="font-semibold">{t.cuisine}:</span> {restaurantData.cuisineType}
                          </span>
                        </div>
                      </div>

                      {/* Specialties */}
                      {expandedDetails === index && (
                        <motion.div 
                          className="mb-6"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className={`font-semibold text-gray-900 dark:text-white mb-2 flex items-center ${
                            isRTL ? 'flex-row-reverse text-right' : 'text-left'
                          }`}>
                            <Utensils className={`w-4 h-4 text-amber-500 ${isRTL ? 'ml-2 mr-0' : 'mr-2 ml-0'}`} />
                            {t.specialties}
                          </h4>
                          <div className={`text-gray-700 dark:text-gray-300 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                            {restaurantData.specialties || <span className="text-gray-600 dark:text-gray-400 italic">{t.comingSoon}</span>}
                          </div>
                        </motion.div>
                      )}

                      {/* Address section */}
                      <div className={`mb-6 flex items-start space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}>
                        <motion.div 
                          className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mt-1"
                          initial={{ scale: 0, rotate: -10 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring" as const, 
                            stiffness: 260, 
                            damping: 20, 
                            delay: 0.5 
                          }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -5, 5, -5, 0],
                            transition: { 
                              scale: { duration: 0.2 },
                              rotate: { duration: 0.5, ease: "easeInOut" }
                            }
                          }}
                        >
                          <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                        </motion.div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{t.address}:</span>
                          <p className="text-gray-600 dark:text-gray-400">{restaurantData.location}</p>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <motion.div 
                        className={`flex flex-wrap gap-3 mt-8 ${isRTL ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.5,
                          staggerChildren: 0.1
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        >
                          <Button 
                            icon={Send} 
                            text={t.visitWebsite} 
                            primary={true}
                            isRTL={isRTL}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        >
                          <Button 
                            icon={Navigation} 
                            text={t.getDirections} 
                            onClick={() => window.open(getDirectionsUrl(restaurantData.location), '_blank')}
                            isRTL={isRTL}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        >
                          <Button 
                            icon={Phone} 
                            text={t.callNow}
                            isRTL={isRTL}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        >
                          <Button 
                            icon={Bookmark} 
                            text={expandedDetails === index ? t.lessDetails : t.moreDetails} 
                            onClick={() => toggleExpand(index)}
                            isRTL={isRTL}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Food image section */}
                    <div className="w-full md:w-1/2 relative h-96 md:h-auto bg-gray-100 dark:bg-gray-900/20 overflow-hidden">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={activeIndex === index ? { scale: 1.02 } : { scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-full h-full"
                      >
                        <Image
                          src={restaurantData.image}
                          alt={`${restaurantData.name} food`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                          {/* Photo overlay content removed as requested */}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}