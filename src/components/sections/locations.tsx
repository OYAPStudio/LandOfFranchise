/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, Globe, Building, Flag, ChevronRight, Clock, Phone } from 'lucide-react';

// Dynamically import map components (client only)
const Map = dynamic(() => import('react-map-gl/maplibre'), { ssr: false });
const Marker = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.Popup), { ssr: false });
const NavigationControl = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.NavigationControl), { ssr: false });
const FullscreenControl = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.FullscreenControl), { ssr: false });

// Map translations
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
  mapCoordinates: [number, number];
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

interface WorldMapProps {
  locale?: string;
}

// Custom clean map style similar to Google Maps
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cleanMapStyle = {
  "version": 8,
  "name": "Clean Map Style",
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_key"
    }
  },
  "sprite": "https://api.maptiler.com/maps/basic/sprite",
  "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#f8f8f8"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "paint": {
        "fill-color": "#e0f2fe"
      }
    },
    {
      "id": "boundary_country",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": ["==", "admin_level", 2],
      "paint": {
        "line-color": "#8d8d8d",
        "line-width": 1
      }
    },
    {
      "id": "transportation_road",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": ["all", ["==", "$type", "LineString"]],
      "paint": {
        "line-color": "#ffffff",
        "line-width": 1
      }
    },
    {
      "id": "place_city",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "filter": ["==", "class", "city"],
      "layout": {
        "text-field": "{name:latin}",
        "text-font": ["Open Sans Regular"],
        "text-size": 12
      },
      "paint": {
        "text-color": "#333333"
      }
    }
  ]
};

// Helper function to convert string coordinates to [lng, lat]
const parseCoordinates = (coordString: string): [number, number] => {
  const [lat, lng] = coordString.split(',').map(Number);
  return [lng, lat];
};

// Custom marker component with animation
const CustomMarker = ({ country, isActive, onClick }: { country: Country; isActive: boolean; onClick: (country: Country) => void }) => {
  return (
    <Marker 
      longitude={country.mapCoordinates[0]}
      latitude={country.mapCoordinates[1]}
      anchor="bottom"
    >
      <motion.div
        className="cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isActive ? 1.2 : 1, 
          opacity: 1 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: country.delay * 0.1
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling to the map
          onClick(country);
        }}
      >
        <div className={`absolute w-12 h-12 rounded-full bg-amber-500/50 animate-ping ${isActive ? 'opacity-70' : 'opacity-40'}`}></div>
        <div className="relative flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-amber-600' : 'bg-amber-500'}`}>
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <motion.div 
            className="absolute top-full mt-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap transform -translate-x-1/4 shadow-lg z-20"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: country.delay * 0.1 + 0.2 }}
          >
            <div className="flex items-center">
              {country.name}
              <span className="ml-1 font-normal">({country.locations})</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Marker>
  );
};

// Branch popup component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BranchPopup = ({ branch, country, t, onClose }: { branch: Branch; country: Country; t: TranslationSet; onClose: () => void }) => {
  function getDirectionsUrl(coordinates: string) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
  }
  return (
    <Popup
      longitude={parseCoordinates(branch.coordinates)[0]}
      latitude={parseCoordinates(branch.coordinates)[1]}
      anchor="bottom"
      closeButton={true}
      closeOnClick={false}
      onClose={onClose}
      className="z-50"
      offset={25}
    >
      <div className="p-3 max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{branch.name}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <div className="text-gray-500 font-medium">{t.address}</div>
              <div className="text-gray-700">{branch.address}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
            <div>
              <div className="text-gray-500 font-medium">{t.openingHours}</div>
              <div className="text-gray-700">{branch.hours}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
            <div>
              <div className="text-gray-500 font-medium">{t.phone}</div>
              <div className="text-gray-700">{branch.phone}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <motion.a
            href={getDirectionsUrl(branch.coordinates)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-amber-600 font-medium"
            whileTap={{ scale: 0.97 }}
          >
            <Navigation className="w-4 h-4 mr-1" />
            {t.getDirections}
          </motion.a>
        </div>
      </div>
    </Popup>
  );
};

// Country branch marker component
const CountryBranchMarkers = ({ country, selectedBranch, onBranchClick }: { country: Country; selectedBranch: Branch | null; onBranchClick: (branch: Branch) => void }) => {
  return (
    <>
      {country.branches.map((branch: Branch) => {
        const [lng, lat] = parseCoordinates(branch.coordinates);
        const isSelected = selectedBranch?.id === branch.id;
        return (
          <Marker
            key={branch.id}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
          >
            <motion.div
              className="cursor-pointer"
              initial={{ scale: 0.8, y: -10, opacity: 0 }}
              animate={{ 
                scale: isSelected ? 1.2 : 1, 
                y: 0,
                opacity: 1 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.1
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling to the map
                onBranchClick(branch);
              }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-amber-600' : 'bg-amber-500'}`}>
                <Building className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </Marker>
        );
      })}
    </>
  );
};

export default function CleanMapLocations({ locale = 'en' }: WorldMapProps) {
  // Add CSS for maplibre-gl to the document (client only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('maplibre-gl/dist/maplibre-gl.css');
    }
  }, []);

  // Mosul coordinates for direct zoom
  const mosulCoordinates: [number, number] = [43.1389, 36.3456];

  // Country data
  const countryData: Country[] = [
    {
      id: 'iraq',
      name: 'Iraq',
      position: { top: '37%', right: '48%' },
      scale: 1.0,
      delay: 0.3,
      status: 'active',
      locations: 7,
      flagship: 'Mosul',
      branches: [
        {
          id: 'branch1',
          name: 'Shawrma Land Restaurant',
          address: '36.3692944, 43.1416558',
          phone: '+964 123 456 7890',
          hours: '8:00 AM - 11:00 PM',
          coordinates: '36.3696607,43.1417624'
        },
        {
          id: 'branch2',
          name: 'Lamassu Restaurant',
          address: '36.3644714, 43.1464652',
          phone: '+964 123 456 7891',
          hours: '9:00 AM - 10:00 PM',
          coordinates: '36.3610361,43.145714'
        },
        {
          id: 'branch3',
          name: 'Start Coffee 1',
          address: 'Presidency of the Nineveh Federal Court of Appeal, Mosul',
          phone: '+964 123 456 7892',
          hours: '10:00 AM - 11:00 PM',
          coordinates: '36.3354188,43.1404843'
        },
        {
          id: 'branch5',
          name: 'Start Coffee 2',
          address: 'Presidency of the Nineveh Federal Court of Appeal, Mosul',
          phone: '+964 123 456 7892',
          hours: '10:00 AM - 11:00 PM',
          coordinates: '36.33702,43.142434'
        },
        {
          id: 'branch4',
          name: 'Shawrma Land Restaurant 2',
          address: '36.3692944, 43.1416558',
          phone: '+964 123 456 7890',
          hours: '8:00 AM - 11:00 PM',
          coordinates: '36.3874888,43.1593435'
        },
        {
          id: 'branch6',
          name: '4 IN',
          address: '36.3692944, 43.1416558',
          phone: '+964 123 456 7890',
          hours: '8:00 AM - 11:00 PM',
          coordinates: '36.369895,43.142044'
        },
      ],
      mapCoordinates: [44.3661, 33.3152],
    },
  ];

  const t = translations[locale as keyof typeof translations] || translations.en;
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 45,
    latitude: 28,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });
  
  // State to control map visibility
  const [isMapVisible, setIsMapVisible] = useState(true);

  useEffect(() => {
    setSelectedBranch(null);
  }, [selectedCountry]);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    // If Iraq is selected, zoom directly to Mosul instead of the country center
    if (country.id === 'iraq') {
      setViewState({
        ...viewState,
        longitude: mosulCoordinates[0],
        latitude: mosulCoordinates[1],
        zoom: 10.5 // Higher zoom level for city view
      });
    } else {
      const [lng, lat] = country.mapCoordinates;
      setViewState({
        ...viewState,
        longitude: lng,
        latitude: lat,
        zoom: 5
      });
    }
  };

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    const [lng, lat] = parseCoordinates(branch.coordinates);
    setViewState({
      ...viewState,
      longitude: lng,
      latitude: lat,
      zoom: 11
    });
  };

  const handleBackClick = () => {
    setSelectedBranch(null);
    setSelectedCountry(null);
    setIsMapVisible(true); // Ensure map is visible when going back
    setViewState({
      longitude: 45,
      latitude: 28,
      zoom: 3.5,
      bearing: 0,
      pitch: 0
    });
  };

  // Handle click on the map background (not on markers)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = (event: any) => {
    // Check if the click was directly on the map (not on markers or popups)
    if (event.target && event.target.classList.contains('maplibregl-canvas')) {
      setIsMapVisible(false); // Hide the map
    }
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

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {isMapVisible ? (
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                {/* Interactive Map */}
                <Map
                  {...viewState}
                  onMove={evt => setViewState(evt.viewState)}
                  mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=mUozmEO28XDI7F1BKx1o"
                  reuseMaps
                  attributionControl={false}
                  style={{ width: '100%', height: '100%' }}
                  onClick={handleMapClick}
                >
                  {/* Show country markers in overview mode */}
                  {!selectedCountry && countryData.map(country => (
                    <CustomMarker 
                      key={country.id}
                      country={country}
                      isActive={false}
                      onClick={handleCountryClick}
                    />
                  ))}
                  
                  {/* Show branch markers when a country is selected */}
                  {selectedCountry && (
                    <CountryBranchMarkers 
                      country={selectedCountry}
                      selectedBranch={selectedBranch}
                      onBranchClick={handleBranchClick}
                    />
                  )}
                  
                  {/* Show popup for selected branch */}
                  {selectedBranch && (
                    <BranchPopup 
                      branch={selectedBranch} 
                      country={selectedCountry!}
                      t={t}
                      onClose={() => setSelectedBranch(null)}
                    />
                  )}
                  
                  {/* Controls */}
                  <NavigationControl position="top-right" />
                  <FullscreenControl position="top-right" />
                </Map>
                
                {/* Back button */}
                {selectedCountry && (
                  <motion.button
                    className="absolute top-4 left-4 z-20 flex items-center text-gray-800 bg-white px-3 py-2 rounded-md shadow-md font-medium"
                    onClick={handleBackClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
                    {t.back}
                  </motion.button>
                )}
                
                {/* Map Stats */}
                {!selectedCountry && (
                  <motion.div 
                    className="absolute top-4 right-16 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg"
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
                )}
              </div>
            ) : (
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <button 
                  onClick={() => setIsMapVisible(true)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium shadow-lg transition-all flex items-center"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  {t.viewAll}
                </button>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/3">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {!selectedCountry ? (
                // Country list
                <>
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
                        onClick={() => {
                          handleCountryClick(country);
                          setIsMapVisible(true); // Ensure map is visible when selecting a country
                        }}
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
                </>
              ) : (
                // Branch list for selected country
                <>
                  <div className="flex items-center mb-6">
                    <Flag className="w-5 h-5 mr-2 text-amber-500" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCountry.name} - {t.branches}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedCountry.branches.map((branch, index) => (
                      <motion.div
                        key={branch.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedBranch?.id === branch.id 
                            ? 'bg-amber-100 dark:bg-amber-900/30' 
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => {
                          handleBranchClick(branch);
                          setIsMapVisible(true); // Ensure map is visible when selecting a branch
                        }}
                      >
                        <div className="font-bold text-gray-900 dark:text-white mb-1">{branch.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-amber-500" />
                          {branch.address}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
        </div>
    </section>
 );
}