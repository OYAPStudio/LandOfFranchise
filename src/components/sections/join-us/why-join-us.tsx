'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Globe, 
  DollarSign, 
  Building2, 
  BookOpen, 
  Handshake,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

interface WhyJoinUsProps {
  locale: string;
}

const translations = {
  en: {
    title: "Why Join Our Network?",
    subtitle: "Discover the opportunities and benefits waiting for you when joining Land of Franchise network",
    
    benefits: [
      {
        icon: "TrendingUp",
        title: "Proven Success Model",
        description: "Join a franchise with 5+ years of consistent growth and profitability across multiple locations in Iraq.",
        highlight: "95% Success Rate"
      },
      {
        icon: "Users",
        title: "Comprehensive Training & Support",
        description: "Complete training program covering operations, management, marketing, and ongoing business coaching.",
        highlight: "4-Week Training"
      },
      {
        icon: "Award",
        title: "Strong Brand Recognition",
        description: "Leverage our established reputation and loyal customer base to jumpstart your business success.",
        highlight: "250K+ Customers"
      },
      {
        icon: "Globe",
        title: "Expansion Opportunities",
        description: "Be part of our ambitious growth plans across the Middle East and international markets.",
        highlight: "Multi-Market Growth"
      },
      {
        icon: "DollarSign",
        title: "Flexible Investment Options",
        description: "Multiple franchise packages available from $30K to $250K to suit different budgets and markets.",
        highlight: "ROI in 18-24 Months"
      },
      {
        icon: "Building2",
        title: "Site Selection Support",
        description: "Expert assistance in finding the perfect location with market analysis and demographic studies.",
        highlight: "Prime Locations"
      },
      {
        icon: "BookOpen",
        title: "Operational Excellence",
        description: "Detailed operations manual, quality standards, and supplier relationships already established.",
        highlight: "Turnkey Operations"
      },
      {
        icon: "Handshake",
        title: "Ongoing Partnership",
        description: "Continuous support with marketing campaigns, new product development, and business optimization.",
        highlight: "24/7 Support"
      }
    ],

    stats: {
      title: "Our Track Record",
      subtitle: "Numbers that speak for our success",
      items: [
        { number: "4+", label: "Active Restaurants", icon: "Building2" },
        { number: "250+", label: "Team Members", icon: "Users" },
        { number: "5+", label: "Years Experience", icon: "Award" },
        { number: "250K+", label: "Happy Customers", icon: "Star" }
      ]
    },

    cta: {
      title: "Ready to Start Your Success Story?",
      subtitle: "Join Iraq's fastest-growing restaurant franchise network",
      buttonText: "Apply Now"
    }
  },
  ar: {
    title: "لماذا تنضم إلى شبكتنا؟",
    subtitle: "اكتشف الفرص والمزايا التي تنتظرك عند الانضمام إلى شبكة أرض الامتياز",
    
    benefits: [
      {
        icon: "TrendingUp",
        title: "نموذج نجاح مُثبت",
        description: "انضم إلى امتياز بخبرة 5+ سنوات من النمو المستمر والربحية عبر مواقع متعددة في العراق.",
        highlight: "معدل نجاح 95%"
      },
      {
        icon: "Users",
        title: "تدريب ودعم شامل",
        description: "برنامج تدريب كامل يغطي العمليات والإدارة والتسويق مع التوجيه التجاري المستمر.",
        highlight: "تدريب 4 أسابيع"
      },
      {
        icon: "Award",
        title: "علامة تجارية قوية",
        description: "استفد من سمعتنا الراسخة وقاعدة العملاء المخلصة لضمان نجاح مشروعك.",
        highlight: "250 ألف+ عميل"
      },
      {
        icon: "Globe",
        title: "فرص التوسع",
        description: "كن جزءاً من خطط النمو الطموحة عبر الشرق الأوسط والأسواق الدولية.",
        highlight: "نمو متعدد الأسواق"
      },
      {
        icon: "DollarSign",
        title: "خيارات استثمار مرنة",
        description: "حزم امتياز متعددة من 30 ألف إلى 250 ألف دولار لتناسب الميزانيات والأسواق المختلفة.",
        highlight: "عائد في 18-24 شهر"
      },
      {
        icon: "Building2",
        title: "دعم اختيار الموقع",
        description: "مساعدة خبراء في العثور على الموقع المثالي مع تحليل السوق والدراسات الديموغرافية.",
        highlight: "مواقع مميزة"
      },
      {
        icon: "BookOpen",
        title: "تميز تشغيلي",
        description: "دليل عمليات مفصل ومعايير جودة وعلاقات موردين مؤسسة مسبقاً.",
        highlight: "عمليات جاهزة"
      },
      {
        icon: "Handshake",
        title: "شراكة مستمرة",
        description: "دعم مستمر مع حملات تسويقية وتطوير منتجات جديدة وتحسين الأعمال.",
        highlight: "دعم 24/7"
      }
    ],

    stats: {
      title: "سجل إنجازاتنا",
      subtitle: "أرقام تتحدث عن نجاحنا",
      items: [
        { number: "4+", label: "مطعم نشط", icon: "Building2" },
        { number: "250+", label: "عضو فريق", icon: "Users" },
        { number: "5+", label: "سنوات خبرة", icon: "Award" },
        { number: "250 ألف+", label: "عميل راضٍ", icon: "Star" }
      ]
    },

    cta: {
      title: "جاهز لبدء قصة نجاحك؟",
      subtitle: "انضم إلى أسرع شبكة مطاعم امتياز نمواً في العراق",
      buttonText: "قدم الآن"
    }
  }
};

export default function WhyJoinUs({ locale }: WhyJoinUsProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const isRTL = currentLocale === 'ar';
  const t = translations[currentLocale];

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8" };
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      case 'Users': return <Users {...iconProps} />;
      case 'Award': return <Award {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'DollarSign': return <DollarSign {...iconProps} />;
      case 'Building2': return <Building2 {...iconProps} />;
      case 'BookOpen': return <BookOpen {...iconProps} />;
      case 'Handshake': return <Handshake {...iconProps} />;
      case 'Star': return <Star {...iconProps} />;
      default: return <CheckCircle {...iconProps} />;
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="w-full px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t.stats.title}
            </h3>
            <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
              {t.stats.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-amber-500 mb-4 flex justify-center">
                  {getIcon(stat.icon)}
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2 text-center">
                  {stat.number}
                </div>
                <div className={`text-sm text-gray-600 dark:text-gray-400 text-center ${isRTL ? 'font-arabic' : ''}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
              {/* Icon and Highlight */}
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="text-amber-500">
                  {getIcon(benefit.icon)}
                </div>
                <div className={`bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/20 text-amber-700 dark:text-amber-300 text-xs font-semibold px-3 py-1 rounded-full ${isRTL ? 'font-arabic' : ''}`}>
                  {benefit.highlight}
                </div>
              </div>

              {/* Content */}
              <h3 className={`text-lg font-bold mb-3 text-gray-900 dark:text-white ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                {benefit.title}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                {benefit.description}
              </p>

              {/* Check mark */}
              <div className={`flex items-center mt-4 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className={`text-xs text-green-600 dark:text-green-400 font-medium ${isRTL ? 'mr-2 font-arabic' : 'ml-2'}`}>
                  {isRTL ? 'مضمون' : 'Guaranteed'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t.cta.title}
          </h3>
          <p className={`text-xl mb-8 text-amber-100 ${isRTL ? 'font-arabic' : ''}`}>
            {t.cta.subtitle}
          </p>
          <button className={`inline-flex items-center px-8 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse font-arabic' : 'flex-row'}`}>
            <span>{t.cta.buttonText}</span>
            {isRTL ? (
              <ArrowRight className="mr-3 w-5 h-5 transform rotate-180" />
            ) : (
              <ArrowRight className="ml-3 w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}