export interface RestaurantContent {
  name: string;
  description: string;
  location: string;
  coordinates: [number, number];
  image: string;
  logo: string;
  cuisineType: string;
  openingHours: string;
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

// Function to calculate years in business dynamically
export function calculateYearsInBusiness(): number {
  // Founding date: July 10, 2020
  const foundingDate = new Date(2020, 6, 10); // Note: months are 0-indexed in JavaScript
  const currentDate = new Date();
  
  // Calculate the difference in years
  let years = currentDate.getFullYear() - foundingDate.getFullYear();
  
  // Check if we've reached the anniversary date this year
  const hasReachedAnniversary = 
    currentDate.getMonth() > foundingDate.getMonth() || 
    (currentDate.getMonth() === foundingDate.getMonth() && 
     currentDate.getDate() >= foundingDate.getDate());
  
  // If we haven't reached the anniversary date this year, subtract one year
  if (!hasReachedAnniversary) {
    years--;
  }
  
  return years;
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
      // employeeCount: 52,
      foundedYear: 2023,
      specialties: "جميع أنواع القهوة"
    }
  }
];

// Use the dynamic calculation for years in business
export const companyStats: CompanyStats = {
  totalRestaurants: 4,
  totalEmployees: 250,
  yearsInBusiness: calculateYearsInBusiness(),
  locations: 6,
  countriesPresent: 1,
  annualCustomers: 250000
};

export const companyInfo: CompanyInfo = {
  en: {
    name: "Land Of Franchise",
    tagline: "Bringing the authentic flavors of Iraq to the world",
    shortDescription: "A premier restaurant group dedicated to showcasing the rich culinary heritage of Land Of Franchise with modern influences.",
    longDescription: "Our Story:\nIn the midst of the challenging times during the COVID-19 pandemic, four friends came together daily to share moments and break the routine of isolation. From those shared moments, the idea of opening a Syrian shawarma shop in Mosul was born. In October 2020, we launched our first small location focused on takeaway and delivery. Over time, we became a leading destination for high-quality Syrian shawarma in the city. After a year of success, we moved to a larger location directly across from our original site.\nIn 2022, we decided to expand our business and began planning a new brand — \"Lamassu Restaurant.\" In September 2023, we officially opened Lamassu, offering a refined, five-star dining experience — the first of its kind in Mosul. The restaurant quickly became a preferred destination, known for its exceptional service and luxurious ambiance.\nFollowing the great success of Lamassu, we continued our expansion. In 2024, we launched a new coffee brand called START COFFEE, with the first branch located inside the Ninawa Court of Appeals. It became the first well-organized, high-standard coffee shop inside a government building in the province.\nIn June 2025, we proudly opened our second Shawarma Land branch. Alongside it, we launched Mosul's first centralized kitchen, built to meet rigorous hygiene, health, and civil defense standards. In August 2025, we also opened our second START COFFEE branch at the Personal Status Court in Mosul.\nBefore the end of 2025, we plan to launch our fourth brand: 4IN, a new fast-food concept.\nBy the grace of God, we have become the go-to destination for businesspeople, investors, government officials, tourists, and more — a true reflection of our commitment to delivering a unique and exceptional experience to every customer.",
    headquarters: "Mosul, Iraq",
    foundedYear: 2020, // Updated to match the founding date in the story
    ceoName: "Ahmed Al-Jabouri",
    mission: "Our mission is to deliver exceptional food and beverage experiences that combine high quality with outstanding service. We are committed to creating innovative concepts that meet our customers' needs and exceed their expectations at every turn.",
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
    name: "أرض الأمتياز",
    tagline: "نُقدِّم نكهات العراق الأصيلة إلى العالم",
    shortDescription: "مجموعة مطاعم متميزة تسعى لإبراز التراث العراقي الأصيل بنكهات معاصرة.",
    longDescription: "قصتنا:\nفي خضم التحديات خلال جائحة كوفيد-19، اجتمع أربعة أصدقاء يومياً لمشاركة اللحظات وكسر روتين العزلة. من تلك اللحظات المشتركة، وُلدت فكرة افتتاح محل شاورما سوري في الموصل. في أكتوبر 2020، افتتحنا أول موقع صغير لنا يركز على الطلبات الخارجية والتوصيل. مع مرور الوقت، أصبحنا وجهة رائدة للشاورما السورية عالية الجودة في المدينة. بعد عام من النجاح، انتقلنا إلى موقع أكبر مقابل موقعنا الأصلي مباشرة.\nفي عام 2022، قررنا توسيع أعمالنا وبدأنا التخطيط لعلامة تجارية جديدة - \"مطعم لاماسو\". في سبتمبر 2023، افتتحنا رسمياً لاماسو، لنقدم تجربة طعام راقية من فئة الخمس نجوم - الأولى من نوعها في الموصل. سرعان ما أصبح المطعم وجهة مفضلة، معروفة بخدمتها الاستثنائية وأجوائها الفاخرة.\nبعد النجاح الكبير لمطعم لاماسو، واصلنا توسعنا. في عام 2024، أطلقنا علامة تجارية جديدة للقهوة تسمى START COFFEE، مع أول فرع داخل محكمة استئناف نينوى. أصبح أول مقهى منظم بمعايير عالية داخل مبنى حكومي في المحافظة.\nفي يونيو 2025، افتتحنا بفخر فرعنا الثاني من شاورما لاند. إلى جانبه، أطلقنا أول مطبخ مركزي في الموصل، مبني وفق معايير صارمة للنظافة والصحة والدفاع المدني. وفي أغسطس 2025، افتتحنا أيضاً فرعنا الثاني من START COFFEE في محكمة الأحوال الشخصية في الموصل.\nقبل نهاية عام 2025، نخطط لإطلاق علامتنا التجارية الرابعة: 4IN، وهي مفهوم جديد للوجبات السريعة.\nبفضل الله، أصبحنا الوجهة المفضلة لرجال الأعمال والمستثمرين والمسؤولين الحكوميين والسياح وغيرهم - انعكاس حقيقي لالتزامنا بتقديم تجربة فريدة واستثنائية لكل عميل.",
    headquarters: "الموصل، العراق",
    foundedYear: 2020, // Updated to match the founding date in the story
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