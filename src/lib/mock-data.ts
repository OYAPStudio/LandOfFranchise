export interface RestaurantContent {
  name: string;
  description: string;
  location: string;
  coordinates: [number, number];
  image: string;
  logo: string;
  cuisineType: string;
  openingHours: string;
  employeeCount: number;
  foundedYear: number;
  specialties: string;
}

export interface Restaurant {
  id: string;
  en: RestaurantContent;
  ar: RestaurantContent;
}

export interface CompanyStats {
  totalRestaurants: number;
  totalEmployees: number;
  yearsInBusiness: number;
  locations: number;
  countriesPresent: number;
  annualCustomers: number;
}

export interface CompanyInfo {
  en: {
    name: string;
    tagline: string;
    shortDescription: string;
    longDescription: string;
    headquarters: string;
    foundedYear: number;
    ceoName: string;
    mission: string;
    vision: string;
    values: string[];
  };
  ar: {
    name: string;
    tagline: string;
    shortDescription: string;
    longDescription: string;
    headquarters: string;
    foundedYear: number;
    ceoName: string;
    mission: string;
    vision: string;
    values: string[];
  };
}

export const restaurants: Restaurant[] = [
  {
    id: "rest-1",
    en: {
      name: "Shawarma Land",
      description: "Experience authentic Middle Eastern cuisine in a luxurious atmosphere with a panoramic view of Baghdad.",
      location: "Mosul, Iraq",
      coordinates: [33.3152, 44.3661],
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
      logo: "/images/restaurants/L2.jpg",
      cuisineType: "Middle Eastern",
      openingHours: "11:00 AM - 11:00 PM",
      employeeCount: 45,
      foundedYear: 2018,
      specialties: "Syrian Shawarma & Fast Food"
    },
    ar: {
      name: "شاورما لاند",
      description: "استمتع بالمذاق الأصيل للمأكولات الشرق أوسطية في أجواء فاخرة وإطلالة بانورامية على مدينة الموصل.",
      location: "الموصل، العراق",
      coordinates: [33.3152, 44.3661],
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2942&auto=format&fit=crop",
      logo: "/images/restaurants/L2.jpg",
      cuisineType: "مأكولات شرق أوسطية",
      openingHours: "11:00 صباحاً - 11:00 مساءً",
      employeeCount: 45,
      foundedYear: 2018,
      specialties: "شاورما سورية ووجبات سريعة"
    }
  },
  {
    id: "rest-2",
    en: {
      name: "Lamassu",
      description: "Fine dining with a fusion of traditional Iraqi and modern international cuisine, located along the scenic Tigris River.",
      location: "Mosul, Iraq",
      coordinates: [30.5085, 47.7832],
      image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
      logo: "/images/restaurants/L1.jpg",
      cuisineType: "Iraqi Fusion",
      openingHours: "12:00 PM - 10:00 PM",
      employeeCount: 38,
      foundedYear: 2022,
      specialties: "Luxuries Food"
    },
    ar: {
      name: "لاماسو",
      description: "تجربة طعام راقية تمزج بين المأكولات العراقية التقليدية والمطبخ العالمي الحديث، على ضفاف نهر دجلة.",
      location: "الموصل، العراق",
      coordinates: [30.5085, 47.7832],
      image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2670&auto=format&fit=crop",
      logo: "/images/restaurants/L1.jpg",
      cuisineType: "مطبخ عراقي مدمج",
      openingHours: "12:00 ظهراً - 10:00 مساءً",
      employeeCount: 38,
      foundedYear: 2022,
      specialties: "أطباق فاخرة"
    }
  },
  {
    id: "rest-3",
    en: {
      name: "Start Coffee",
      description: "Inspired by the ancient hanging gardens, our restaurant offers a unique dining experience with authentic Mesopotamian recipes.",
      location: "Mosul, Iraq",
      coordinates: [36.1911, 44.0091],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop",
      logo: "/images/restaurants/L3.jpg",
      cuisineType: "Traditional Iraqi",
      openingHours: "11:00 AM - 11:00 PM",
      employeeCount: 52,
      foundedYear: 2023,
      specialties: "All Kinds of Coffee"
    },
    ar: {
      name: "ستارت كوفي",
      description: "مستوحاة من حدائق بابل المعلقة، تقدم مقهى ستارت تجربة مميزة بوصفات مزجت بين الأصالة والابتكار.",
      location: "الموصل، العراق",
      coordinates: [36.1911, 44.0091],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2847&auto=format&fit=crop",
      logo: "/images/restaurants/L3.jpg",
      cuisineType: "مطبخ عراقي تقليدي",
      openingHours: "11:00 صباحاً - 11:00 مساءً",
      employeeCount: 52,
      foundedYear: 2023,
      specialties: "جميع أنواع القهوة"
    }
  }
];

export const companyStats: CompanyStats = {
  totalRestaurants: 3,
  totalEmployees: 135,
  yearsInBusiness: 15,
  locations: 6,
  countriesPresent: 2,
  annualCustomers: 250000
};

export const companyInfo: CompanyInfo = {
  en: {
    name: "Land Of Franchise",
    tagline: "Bringing the authentic flavors of Iraq to the world",
    shortDescription: "A premier restaurant group dedicated to showcasing the rich culinary heritage of Land Of Franchise with modern influences.",
    longDescription: "In the midst of the COVID-19 pandemic, four friends came together daily to escape the isolation. From those moments, the idea of a Syrian shawarma shop in Mosul was born. What started in October 2020 as a small takeaway location quickly grew into a leading destination. Over the years, our vision expanded into multiple brands, shaping the future of dining in Mosul.",
    headquarters: "Mosul, Iraq",
    foundedYear: 2018,
    ceoName: "Ahmed Al-Jabouri",
    mission: "Our mission is to deliver exceptional food and beverage experiences that combine high quality with outstanding service. We are committed to creating innovative concepts that meet our customers’ needs and exceed their expectations at every turn.",
    vision: "Our vision is to become the leaders in the hospitality industry in our city, with a focus on innovation and excellence in every aspect of our work. We aspire to be the top choice for consumers seeking a unique and memorable dining experience.",
    values: [
      "High-quality service and standards",
      "Relentless innovation across all brands",
      "Integrity in every action and decision",
      "Customer-focused mindset in everything we do",
      "Community-first approach to growth and success"
    ]
  },
  ar: {
    name: "أرض الفرانشايز",
    tagline: "نُقدِّم نكهات العراق الأصيلة إلى العالم",
    shortDescription: "مجموعة مطاعم متميزة تسعى لإبراز التراث العراقي الأصيل بنكهات معاصرة.",
    longDescription: "في خضم جائحة كورونا، اجتمع أربعة أصدقاء يومياً لكسر روتين العزلة، ومن تلك اللقاءات وُلدت فكرة إنشاء محل شاورما سوري في الموصل. بدأنا في أكتوبر 2020 بمحل صغير للطلبات الخارجية والتوصيل. ومع مرور الوقت، أصبحنا وجهة مفضلة لعشاق الشاورما في المدينة. توسعنا لاحقًا ليشمل عدة علامات تجارية تعكس رؤيتنا المستقبلية في عالم الطهي.",
    headquarters: "الموصل، العراق",
    foundedYear: 2018,
    ceoName: "أحمد الجبوري",
    mission: "مهمتنا هي تقديم تجربة طعام وشراب استثنائية تجمع بين الجودة العالية والخدمة المميزة. نلتزم بابتكار مفاهيم جديدة تلبي احتياجات عملائنا وتتجاوز توقعاتهم في كل مرة.",
    vision: "رؤيتنا أن نكون رواد الضيافة في مدينتنا، من خلال الابتكار والتميز في جميع جوانب عملنا. نطمح لأن نكون الخيار الأول لمن يبحث عن تجربة طعام فريدة ولا تُنسى.",
    values: [
      "خدمة عالية الجودة ومعايير دقيقة",
      "ابتكار مستمر في جميع العلامات التجارية",
      "الصدق والنزاهة في كل قرار وتصرف",
      "تركيز كامل على رضا العملاء",
      "الالتزام بخدمة المجتمع كجزء من رؤيتنا"
    ]
  }
};
