'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Clock,
  Heart
} from 'lucide-react';

interface JoinUsPageProps {
  locale: string;
}

const translations = {
  en: {
    title: "Join Our Team",
    subtitle: "Build Your Career with Iraq's Leading Restaurant Group",
    description: "Be part of our growing family and help us create exceptional dining experiences",
    
    stats: {
      restaurants: "4+",
      employees: "250+", 
      years: "5+",
      customers: "250K+"
    },
    
    statLabels: {
      restaurants: "Restaurant Locations",
      employees: "Team Members",
      years: "Years of Growth", 
      customers: "Happy Customers"
    },

    form: {
      title: "Job Application Form",
      subtitle: "Tell us about yourself and let's build your future together",
      
      personalInfo: "Personal Information",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      address: "Full Address",
      city: "City",
      dateOfBirth: "Date of Birth",
      
      jobInfo: "Job Information", 
      position: "Position Applied For",
      experience: "Years of Experience",
      education: "Education Level",
      availability: "Availability",
      salary: "Expected Salary",
      startDate: "Preferred Start Date",
      
      skillsInfo: "Skills & Experience",
      skills: "Key Skills",
      previousJob: "Previous Job Title",
      languages: "Languages Spoken",
      
      additionalInfo: "Additional Information",
      motivation: "Why do you want to work with us?",
      goals: "What are your career goals?",
      experience_detail: "Describe your relevant experience",
      
      submit: "Submit Application",
      
      placeholders: {
        name: "Enter your full name",
        email: "your.email@example.com", 
        phone: "+964 XXX XXX XXXX",
        address: "Your full address",
        city: "Your city",
        salary: "e.g., 500,000 IQD",
        skills: "e.g., Customer service, Cooking, Management...",
        previousJob: "e.g., Waiter, Chef, Manager...",
        languages: "e.g., Arabic, English, Kurdish...",
        motivation: "What motivates you to join our team...",
        goals: "What do you hope to achieve in your career...",
        experience_detail: "Describe your work experience..."
      },
      
      positions: [
        "Waiter/Waitress",
        "Chef/Cook", 
        "Kitchen Helper",
        "Cashier",
        "Barista",
        "Manager",
        "Supervisor",
        "Cleaner",
        "Delivery Driver",
        "Other"
      ],
      
      educationLevels: [
        "High School",
        "Diploma", 
        "Bachelor's Degree",
        "Master's Degree",
        "Vocational Training",
        "Other"
      ],
      
      availabilityOptions: [
        "Full-time",
        "Part-time",
        "Weekends only",
        "Evening shifts",
        "Morning shifts",
        "Flexible"
      ]
    },

    benefits: [
      {
        icon: "TrendingUp",
        title: "Career Growth",
        description: "Clear promotion paths and skill development opportunities"
      },
      {
        icon: "Users", 
        title: "Great Team",
        description: "Work with passionate people in a supportive environment"
      },
      {
        icon: "Award",
        title: "Recognition",
        description: "Employee of the month awards and performance bonuses"
      },
      {
        icon: "Heart",
        title: "Benefits Package",
        description: "Competitive salary, meals, and employee discounts"
      }
    ],

    jobOpenings: [
      {
        title: "Head Chef",
        location: "Shawarma Land - Mosul",
        type: "Full-time",
        description: "Lead our kitchen team and create amazing dishes"
      },
      {
        title: "Experienced Waiter",
        location: "Lamassu Restaurant - Mosul", 
        type: "Full-time",
        description: "Provide excellent customer service in our fine dining restaurant"
      },
      {
        title: "Barista",
        location: "Start Coffee - Multiple Locations",
        type: "Part-time/Full-time",
        description: "Craft perfect coffee and create welcoming atmosphere"
      },
      {
        title: "Kitchen Helper",
        location: "All Locations",
        type: "Full-time",
        description: "Support our kitchen team and learn from experienced chefs"
      }
    ]
  },
  ar: {
    title: "انضم إلى فريقنا",
    subtitle: "ابني مسيرتك المهنية مع مجموعة المطاعم الرائدة في العراق",
    description: "كن جزءاً من عائلتنا المتنامية وساعدنا في خلق تجارب طعام استثنائية",
    
    stats: {
      restaurants: "4+",
      employees: "250+",
      years: "5+", 
      customers: "250 ألف+"
    },
    
    statLabels: {
      restaurants: "فرع مطعم",
      employees: "عضو فريق",
      years: "سنة من النمو",
      customers: "عميل راضٍ"
    },

    form: {
      title: "نموذج طلب وظيفة",
      subtitle: "أخبرنا عن نفسك ولنبني مستقبلك معاً",
      
      personalInfo: "المعلومات الشخصية",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني", 
      phone: "رقم الهاتف",
      address: "العنوان الكامل",
      city: "المدينة",
      dateOfBirth: "تاريخ الميلاد",
      
      jobInfo: "معلومات الوظيفة",
      position: "المنصب المتقدم له",
      experience: "سنوات الخبرة",
      education: "المستوى التعليمي",
      availability: "التوفر",
      salary: "الراتب المتوقع", 
      startDate: "تاريخ البدء المفضل",
      
      skillsInfo: "المهارات والخبرة",
      skills: "المهارات الأساسية",
      previousJob: "المسمى الوظيفي السابق",
      languages: "اللغات المتحدثة",
      
      additionalInfo: "معلومات إضافية",
      motivation: "لماذا تريد العمل معنا؟",
      goals: "ما هي أهدافك المهنية؟",
      experience_detail: "اوصف خبرتك ذات الصلة",
      
      submit: "إرسال الطلب",
      
      placeholders: {
        name: "أدخل اسمك الكامل",
        email: "your.email@example.com",
        phone: "+964 XXX XXX XXXX", 
        address: "عنوانك الكامل",
        city: "مدينتك",
        salary: "مثال: 500,000 دينار عراقي",
        skills: "مثال: خدمة العملاء، الطبخ، الإدارة...",
        previousJob: "مثال: نادل، طباخ، مدير...",
        languages: "مثال: العربية، الإنجليزية، الكردية...",
        motivation: "ما الذي يحفزك للانضمام إلى فريقنا...",
        goals: "ما الذي تأمل في تحقيقه في مسيرتك المهنية...",
        experience_detail: "اوصف خبرتك في العمل..."
      },
      
      positions: [
        "نادل/نادلة",
        "طباخ/شيف", 
        "مساعد مطبخ",
        "أمين صندوق",
        "باريستا",
        "مدير",
        "مشرف",
        "عامل نظافة",
        "سائق توصيل",
        "أخرى"
      ],
      
      educationLevels: [
        "ثانوية عامة",
        "دبلوم", 
        "شهادة بكالوريوس",
        "شهادة ماجستير",
        "تدريب مهني",
        "أخرى"
      ],
      
      availabilityOptions: [
        "دوام كامل",
        "دوام جزئي",
        "عطل نهاية الأسبوع فقط",
        "مناوبات مسائية",
        "مناوبات صباحية",
        "مرن"
      ]
    },

    benefits: [
      {
        icon: "TrendingUp",
        title: "نمو مهني",
        description: "مسارات ترقية واضحة وفرص تطوير المهارات"
      },
      {
        icon: "Users",
        title: "فريق رائع", 
        description: "اعمل مع أشخاص متحمسين في بيئة داعمة"
      },
      {
        icon: "Award",
        title: "تقدير",
        description: "جوائز موظف الشهر ومكافآت الأداء"
      },
      {
        icon: "Heart",
        title: "حزمة المزايا",
        description: "راتب تنافسي ووجبات وخصومات للموظفين"
      }
    ],

    jobOpenings: [
      {
        title: "رئيس طباخين",
        location: "شاورما لاند - الموصل",
        type: "دوام كامل",
        description: "قد فريق المطبخ وأبدع أطباقاً رائعة"
      },
      {
        title: "نادل ذو خبرة",
        location: "مطعم لاماسو - الموصل", 
        type: "دوام كامل",
        description: "قدم خدمة عملاء ممتازة في مطعمنا الراقي"
      },
      {
        title: "باريستا",
        location: "ستارت كوفي - مواقع متعددة",
        type: "دوام جزئي/كامل",
        description: "اصنع قهوة مثالية واخلق أجواء ترحيبية"
      },
      {
        title: "مساعد مطبخ",
        location: "جميع المواقع",
        type: "دوام كامل",
        description: "ادعم فريق المطبخ وتعلم من الطباخين ذوي الخبرة"
      }
    ]
  }
};

export default function JoinUsPage({ locale }: JoinUsPageProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const isRTL = currentLocale === 'ar';
  const t = translations[currentLocale];

  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    dateOfBirth: '',
    
    // Job Info
    position: '',
    experience: '',
    education: '',
    availability: '',
    salary: '',
    startDate: '',
    
    // Skills Info
    skills: '',
    previousJob: '',
    languages: '',
    
    // Additional Info
    motivation: '',
    goals: '',
    experience_detail: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job application submitted:', formData);
    alert(isRTL ? 'تم إرسال طلبك بنجاح!' : 'Application submitted successfully!');
  };

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      case 'Award': return <Award className="w-8 h-8" />;
      case 'Heart': return <Heart className="w-8 h-8" />;
      default: return <Star className="w-8 h-8" />;
    }
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-background.avif"
            alt="Join our team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
            {/* Left Side - Text Content */}
            <div className="text-white">
              <h1 className={`text-4xl lg:text-6xl font-bold mb-6 leading-tight ${
                isRTL ? 'font-arabic' : ''
              }`}>
                {t.title}
              </h1>
              <p className={`text-xl lg:text-2xl mb-6 text-amber-300 ${
                isRTL ? 'font-arabic' : ''
              }`}>
                {t.subtitle}
              </p>
              <p className={`text-lg mb-8 text-gray-200 ${
                isRTL ? 'font-arabic' : ''
              }`}>
                {t.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">
                    {t.stats.restaurants}
                  </div>
                  <div className={`text-xs text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.statLabels.restaurants}
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">
                    {t.stats.employees}
                  </div>
                  <div className={`text-xs text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.statLabels.employees}
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">
                    {t.stats.years}
                  </div>
                  <div className={`text-xs text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.statLabels.years}
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">
                    {t.stats.customers}
                  </div>
                  <div className={`text-xs text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.statLabels.customers}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {t.benefits.map((benefit, index) => (
                  <div key={index} className={`flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`text-amber-400 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                      {getIcon(benefit.icon)}
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {benefit.title}
                      </h3>
                      <p className={`text-gray-300 text-sm ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Application Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 lg:p-8 h-[90vh] overflow-y-auto w-full">
              <div className="mb-6">
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                  {t.form.title}
                </h2>
                <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                  {t.form.subtitle}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {Array.from({ length: totalSections }, (_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      i <= currentSection ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 0: Personal Information */}
                {currentSection === 0 && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                      {t.form.personalInfo}
                    </h3>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.name}
                      </label>
                      <div className="relative">
                        <User className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder={t.form.placeholders.name}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.email}
                      </label>
                      <div className="relative">
                        <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder={t.form.placeholders.email}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.phone}
                      </label>
                      <div className="relative">
                        <Phone className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder={t.form.placeholders.phone}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.address}
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder={t.form.placeholders.address}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.city}
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder={t.form.placeholders.city}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.dateOfBirth}
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 1: Job Information */}
                {currentSection === 1 && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                      {t.form.jobInfo}
                    </h3>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.position}
                      </label>
                      <div className="relative">
                        <Briefcase className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <select
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          required
                        >
                          <option value="">{isRTL ? 'اختر المنصب' : 'Select position'}</option>
                          {t.form.positions.map((position, index) => (
                            <option key={index} value={position}>{position}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.availability}
                      </label>
                      <div className="relative">
                        <Clock className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <select
                          value={formData.availability}
                          onChange={(e) => handleInputChange('availability', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        >
                          <option value="">{isRTL ? 'اختر التوفر' : 'Select availability'}</option>
                          {(t.form.availabilityOptions || []).map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.salary}
                      </label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        placeholder={t.form.placeholders.salary}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.startDate}
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 2: Skills & Experience */}
                {currentSection === 2 && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                      {t.form.skillsInfo}
                    </h3>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.skills}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        placeholder={t.form.placeholders.skills}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.previousJob}
                      </label>
                      <input
                        type="text"
                        value={formData.previousJob}
                        onChange={(e) => handleInputChange('previousJob', e.target.value)}
                        placeholder={t.form.placeholders.previousJob}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.languages}
                      </label>
                      <input
                        type="text"
                        value={formData.languages}
                        onChange={(e) => handleInputChange('languages', e.target.value)}
                        placeholder={t.form.placeholders.languages}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>
                  </div>
                )}

                {/* Section 3: Additional Information */}
                {currentSection === 3 && (
                  <div className="space-y-4">
                    <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                      {t.form.additionalInfo}
                    </h3>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.motivation}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.motivation}
                        onChange={(e) => handleInputChange('motivation', e.target.value)}
                        placeholder={t.form.placeholders.motivation}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.goals}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.goals}
                        onChange={(e) => handleInputChange('goals', e.target.value)}
                        placeholder={t.form.placeholders.goals}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {t.form.experience_detail}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.experience_detail}
                        onChange={(e) => handleInputChange('experience_detail', e.target.value)}
                        placeholder={t.form.placeholders.experience_detail}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className={`flex justify-between items-center pt-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {currentSection > 0 ? (
                    <button
                      type="button"
                      onClick={prevSection}
                      className={`flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {isRTL ? (
                        <>
                          <span className="ml-2">السابق</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-4 h-4" />
                          <span className="ml-2">Previous</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentSection < totalSections - 1 ? (
                    <button
                      type="button"
                      onClick={nextSection}
                      className={`flex items-center px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {isRTL ? (
                        <>
                          <ArrowLeft className="mr-2 w-4 h-4" />
                          <span>التالي</span>
                        </>
                      ) : (
                        <>
                          <span>Next</span>
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 ${isRTL ? 'flex-row-reverse font-arabic' : 'flex-row'}`}
                    >
                      <CheckCircle className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      <span>{t.form.submit}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className={`py-20 bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'} w-full`}>
        <div className="w-full px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'الوظائف المتاحة' : 'Current Job Openings'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {t.jobOpenings.map((job, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Briefcase className={`w-8 h-8 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    <div>
                      <h3 className={`text-lg font-bold ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {job.title}
                      </h3>
                      <p className={`text-sm text-amber-600 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {job.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <MapPin className={`w-4 h-4 text-gray-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className={`text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                        {job.location}
                      </span>
                    </div>
                    <p className={`text-gray-600 dark:text-gray-300 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      {job.description}
                    </p>
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? 'قدم الآن' : 'Apply Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}