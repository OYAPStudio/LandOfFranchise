"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Navigation, Globe, Building, Flag, ChevronRight, Clock, Phone } from 'lucide-react';

const translations = {
  en: {
    title: "Our Locations",
    subtitle: "Find us across the Middle East",
    comingSoon: "Coming Soon",
    currentLocations: "Current Locations",
    countriesWithPresence: "Countries with Presence",
    expandingTo: "Expanding to",
    visitLocation: "Visit Location",
    viewAll: "View All Locations",
    mainHubs: "Main Hubs",
    internationalPresence: "International Presence",
    branches: "Restaurant Branches",
    back: "Back to Map",
    getDirections: "Get Directions",
    openingHours: "Opening Hours",
    address: "Address",
    phone: "Phone"
  },
  ar: {
    title: "مواقعنا",
    subtitle: "تجدنا في جميع أنحاء الشرق الأوسط",
    comingSoon: "قريباً",
    currentLocations: "المواقع الحالية",
    countriesWithPresence: "البلدان ذات التواجد",
    expandingTo: "التوسع إلى",
    visitLocation: "زيارة الموقع",
    viewAll: "عرض جميع المواقع",
    mainHubs: "المراكز الرئيسية",
    internationalPresence: "التواجد الدولي",
    branches: "فروع المطعم",
    back: "العودة إلى الخريطة",
    getDirections: "الحصول على الاتجاهات",
    openingHours: "ساعات العمل",
    address: "العنوان",
    phone: "الهاتف"
  }
};

// Type definitions
interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: string;
}

interface Country {
  id: string;
  name: string;
  position: { top: string; right: string };
  scale: number;
  delay: number;
  status: string;
  locations: number;
  flagship: string;
  branches: Branch[];
}

interface TranslationSet {
  title: string;
  subtitle: string;
  comingSoon: string;
  currentLocations: string;
  countriesWithPresence: string;
  expandingTo: string;
  visitLocation: string;
  viewAll: string;
  mainHubs: string;
  internationalPresence: string;
  branches: string;
  back: string;
  getDirections: string;
  openingHours: string;
  address: string;
  phone: string;
}

// Country data
const countryData: Country[] = [
  { 
    id: 'iraq', 
    name: 'Iraq', 
    position: { top: '37%', right: '48%' }, 
    scale: 1.0, 
    delay: 0.3, 
    status: 'active',
    locations: 3,
    flagship: 'Baghdad',
    branches: [
      {
        id: 'branch1',
        name: 'Shawrma Land Restaurant',
        address: 'Al-Mouhandseen, Mosul',
        phone: '+964 123 456 7890',
        hours: '8:00 AM - 11:00 PM',
        coordinates: '33.3152, 44.3661'
      },
      {
        id: 'branch2',
        name: 'Lamassu Restaurant',
        address: 'Al-Mouhandseen, Mosul',
        phone: '+964 123 456 7891',
        hours: '9:00 AM - 10:00 PM',
        coordinates: '33.3258, 44.4456'
      },
      {
        id: 'branch3',
        name: 'Start Coffee',
        address: 'Al-Mouhandseen, Mosul',
        phone: '+964 123 456 7892',
        hours: '10:00 AM - 11:00 PM',
        coordinates: '30.5085, 47.7832'
      },
    ]
  },
  { 
    id: 'saudi', 
    name: 'Saudi Arabia', 
    position: { top: '56%', right: '50%' }, 
    scale: 0.9, 
    delay: 0.5, 
    status: 'active',
    locations: 3,
    flagship: 'Riyadh',
    branches: [
      {
        id: 'saudi1',
        name: 'Shawrma Land Restaurant',
        address: 'Kingdom Center, King Fahd Road, Riyadh',
        phone: '+966 12 345 6789',
        hours: '9:00 AM - 12:00 AM',
        coordinates: '24.7111, 46.7243'
      },
      {
        id: 'saudi2',
        name: 'Lamassu Restaurant',
        address: 'Corniche Road, Jeddah',
        phone: '+966 12 345 6780',
        hours: '8:00 AM - 1:00 AM',
        coordinates: '21.5169, 39.1653'
      },
      {
        id: 'saudi3',
        name: 'Start Coffee',
        address: 'Corniche Road, Dammam',
        phone: '+966 12 345 6781',
        hours: '10:00 AM - 11:00 PM',
        coordinates: '26.4367, 50.1039'
      }
    ]
  }
];

// CountryMarker component with proper typing
interface CountryMarkerProps {
  country: Country;
  onClick: (country: Country) => void;
}

function CountryMarker({ country, onClick }: CountryMarkerProps) {
  const markerSize = country.scale === 1.0 ? "w-6 h-6" : "w-5 h-5";
  const pulseSize = country.scale === 1.0 ? "w-6 h-6" : "w-5 h-5";
  
  return (
    <div 
      className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2" 
      style={{ 
        top: country.position.top, 
        right: country.position.right 
      }}
    >
      <motion.div 
        className="relative cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: country.delay 
        }}
        onClick={() => onClick(country)}
      >
        <div className={`${pulseSize} rounded-full bg-amber-500 animate-ping absolute opacity-75`}></div>
        <div className={`${markerSize} rounded-full relative flex items-center justify-center bg-amber-500`}>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <motion.div 
          className="absolute top-full mt-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap transform -translate-x-1/4 shadow-lg z-20"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: country.delay + 0.2 }}
        >
          <div className="flex items-center">
            {country.name}
            <span className="ml-1 font-normal">({country.locations})</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Branch card component with proper typing
interface BranchCardProps {
  branch: Branch;
  t: TranslationSet;
}

function BranchCard({ branch, t }: BranchCardProps) {
  function getDirectionsUrl(coordinates: string) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
  }
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{branch.name}</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">{t.address}</div>
              <div className="text-gray-700 dark:text-gray-300">{branch.address}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
            <div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">{t.openingHours}</div>
              <div className="text-gray-700 dark:text-gray-300">{branch.hours}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
            <div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">{t.phone}</div>
              <div className="text-gray-700 dark:text-gray-300">{branch.phone}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <motion.a
            href={getDirectionsUrl(branch.coordinates)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-amber-600 dark:text-amber-500 font-medium"
            whileTap={{ scale: 0.97 }}
          >
            <Navigation className="w-4 h-4 mr-1" />
            {t.getDirections}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

interface WorldMapProps {
  locale?: string;
}

export default function WorldMap({ locale = 'en' }: WorldMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  
  // Use the locale prop directly instead of accessing document
  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  return (
    <section id="locations" className="py-24 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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

        {!selectedCountry ? (
          // Map view
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                {/* Middle East map background */}
                <motion.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <Image 
                    src="/images/world-map/world-map.png" 
                    alt="Middle East Map"
                    fill
                    className="object-cover opacity-90 dark:opacity-70" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 dark:from-gray-900/50 dark:to-gray-900/80"></div>
                </motion.div>

                {/* Country markers - only Iraq and Saudi Arabia */}
                {countryData.map(country => (
                  <CountryMarker 
                    key={country.id} 
                    country={country}
                    onClick={handleCountryClick}
                  />
                ))}

                {/* Instructions */}
                <motion.div 
                  className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                    <MapPin className="w-4 h-4 text-amber-500 mr-2" />
                    Click on a location to see branches
                  </div>
                </motion.div>

                {/* Global stats */}
                <motion.div 
                  className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-bold text-amber-600 dark:text-amber-500 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    {t.internationalPresence}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t.countriesWithPresence}:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{countryData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t.currentLocations}:</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {countryData.reduce((sum, country) => sum + country.locations, 0)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-amber-500" />
                  {t.countriesWithPresence}
                </h3>
                
                <div className="space-y-4">
                  {countryData.map((country, index) => (
                    <motion.div
                      key={country.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index }}
                      viewport={{ once: true }}
                      onClick={() => handleCountryClick(country)}
                    >
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
                        <span className="font-medium text-gray-900 dark:text-white">{country.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                        <span className="font-bold">{country.locations}</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      {t.mainHubs}
                    </h4>
                    
                    <div className="space-y-3">
                      {countryData.map(country => (
                        <div key={country.id} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{country.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{country.flagship}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          // Country branches view
          <div>
            <div className="flex justify-between items-center mb-6">
              <motion.button
                className="flex items-center text-gray-600 dark:text-gray-400 font-medium"
                onClick={handleBackClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
                {t.back}
              </motion.button>
              
              <motion.div 
                className="flex items-center text-xl font-bold text-amber-600 dark:text-amber-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Flag className="w-5 h-5 mr-2" />
                {selectedCountry.name} - {t.branches}
              </motion.div>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedCountry.branches.map((branch) => (
                <BranchCard 
                  key={branch.id} 
                  branch={branch} 
                  t={t} 
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}