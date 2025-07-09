// lib/mock-data.ts
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  image: string;
  cuisineType: string;
  openingHours: string;
  employeeCount: number;
  foundedYear: number;
  specialties: string;
}

export interface CompanyStats {
  totalRestaurants: number;
  totalEmployees: number;
  yearsInBusiness: number;
  locations: number;
  countriesPresent: number;
  annualCustomers: number;
}

// lib/mock-data.ts (updated)
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  image: string;
  logo: string; // Add this field for restaurant logos
  cuisineType: string;
  openingHours: string;
  employeeCount: number;
  foundedYear: number;
}

// Other interfaces remain the same...

export const restaurants: Restaurant[] = [
  {
    id: "rest-1",
    name: "Shawrma Land",
    description: "Experience authentic Middle Eastern cuisine in a luxurious atmosphere with a panoramic view of Baghdad.",
    location: "Mosul, Iraq",
    coordinates: [33.3152, 44.3661],
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
    logo: "/images/restaurants/L2.jpg", // Add logo path
    cuisineType: "Middle Eastern",
    openingHours: "11:00 AM - 11:00 PM",
    employeeCount: 45,
    foundedYear: 2018,
    specialties: "Syrian Shawrma & Fast Food"
  },
  {
    id: "rest-2",
    name: "Lamassu",
    description: "Fine dining with a fusion of traditional Iraqi and modern international cuisine, located along the scenic Tigris River.",
    location: "Mosul, Iraq",
    coordinates: [30.5085, 47.7832],
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
    logo: "/images/restaurants/L1.jpg", // Add logo path
    cuisineType: "Iraqi Fusion",
    openingHours: "12:00 PM - 10:00 PM",
    employeeCount: 38,
    foundedYear: 2022,
    specialties: "Luxuries Food"
  },
  {
    id: "rest-3",
    name: "Start Coffee",
    description: "Inspired by the ancient hanging gardens, our restaurant offers a unique dining experience with authentic Mesopotamian recipes.",
    location: "Mousl, Iraq",
    coordinates: [36.1911, 44.0091],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop",
    logo: "/images/restaurants/L3.jpg", // Add logo path
    cuisineType: "Traditional Iraqi",
    openingHours: "11:00 AM - 11:00 PM",
    employeeCount: 52,
    foundedYear: 2023,
    specialties: "All Kinds of Coffee"
  }
];

// Rest of the code remains the same...

export const companyStats: CompanyStats = {
  totalRestaurants: 3,
  totalEmployees: 135,
  yearsInBusiness: 15,
  locations: 6,
  countriesPresent: 2,
  annualCustomers: 250000
};

export const companyInfo = {
  name: "Land Of Franchise",
  tagline: "Bringing the authentic flavors of Iraq to the world",
  shortDescription: "A premier restaurant group dedicated to showcasing the rich culinary heritage of Land Of Franchise with modern influences.",
  longDescription: "Founded in 2018, Land Of Franchise Restaurant Group has been at the forefront of Iraqi cuisine, blending ancient recipes with contemporary techniques. Our restaurants not only serve food but tell the story of our rich cultural heritage through every dish. With locations across Iraq, we pride ourselves on exceptional service, authentic flavors, and creating memorable dining experiences.",
  headquarters: "Mosul, Iraq",
  foundedYear: 2018,
  ceoName: "Ahmed Al-Jabouri",
  mission: "To preserve and promote Iraqi cuisine while providing exceptional dining experiences that honor our heritage.",
  vision: "To become the global ambassador for Iraqi cuisine, expanding our presence internationally while maintaining authenticity and quality.",
  values: [
    "Authenticity in every recipe",
    "Quality ingredients and preparation",
    "Exceptional hospitality",
    "Cultural preservation",
    "Community engagement"
  ]
};