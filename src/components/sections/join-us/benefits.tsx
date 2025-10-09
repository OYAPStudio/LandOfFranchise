'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Shield, 
  Clock,
  Award,
  Briefcase,
  Coffee,
  Gift
} from 'lucide-react';

interface BenefitsSectionProps {
  locale: string;
}

const translations = {
  en: {
    title: "Why Join Our Team?",
    subtitle: "Experience the benefits of working with Iraq's leading restaurant group",
    benefits: [
      {
        icon: Heart,
        title: "Health Insurance",
        description: "Comprehensive health coverage for you and your family"
      },
      {
        icon: GraduationCap,
        title: "Training & Development",
        description: "Continuous learning opportunities and skill development programs"
      },
      {
        icon: TrendingUp,
        title: "Career Growth",
        description: "Clear advancement paths with promotion opportunities"
      },
      {
        icon: Users,
        title: "Team Environment",
        description: "Work with passionate, supportive colleagues who care"
      },
      {
        icon: Shield,
        title: "Job Security",
        description: "Stable employment with a growing, established company"
      },
      {
        icon: Clock,
        title: "Flexible Hours",
        description: "Work-life balance with flexible scheduling options"
      },
      {
        icon: Award,
        title: "Performance Bonuses",
        description: "Reward system based on performance and achievements"
      },
      {
        icon: Briefcase,
        title: "Professional Experience",
        description: "Gain valuable experience in the hospitality industry"
      },
      {
        icon: Coffee,
        title: "Free Meals",
        description: "Complimentary meals during your shifts"
      },
      {
        icon: Gift,
        title: "Employee Discounts",
        description: "Special discounts at all our restaurant locations"
      }
    ]
  },
  ar: {
    title: "لماذا تنضم إلى فريقنا؟",
    subtitle: "اختبر مزايا العمل مع مجموعة المطاعم الرائدة في العراق",
    benefits: [
      {
        icon: Heart,
        title: "التأمين الصحي",
        description: "تغطية صحية شاملة لك ولعائلتك"
      },
      {
        icon: GraduationCap,
        title: "التدريب والتطوير",
        description: "فرص تعلم مستمرة وبرامج تطوير المهارات"
      },
      {
        icon: TrendingUp,
        title: "النمو المهني",
        description: "مسارات ترقية واضحة مع فرص التقدم"
      },
      {
        icon: Users,
        title: "بيئة عمل الفريق",
        description: "العمل مع زملاء متحمسين وداعمين يهتمون"
      },
      {
        icon: Shield,
        title: "الأمان الوظيفي",
        description: "توظيف مستقر مع شركة راسخة ومتنامية"
      },
      {
        icon: Clock,
        title: "ساعات مرنة",
        description: "توازن بين العمل والحياة مع خيارات مواعيد مرنة"
      },
      {
        icon: Award,
        title: "مكافآت الأداء",
        description: "نظام مكافآت يعتمد على الأداء والإنجازات"
      },
      {
        icon: Briefcase,
        title: "خبرة مهنية",
        description: "اكتساب خبرة قيمة في صناعة الضيافة"
      },
      {
        icon: Coffee,
        title: "وجبات مجانية",
        description: "وجبات مجانية أثناء فترات العمل"
      },
      {
        icon: Gift,
        title: "خصومات الموظفين",
        description: "خصومات خاصة في جميع مواقع مطاعمنا"
      }
    ]
  }
};

export default function BenefitsSection({ locale }: BenefitsSectionProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <section className={`py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
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
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t.benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                  
                  <div className="relative p-6 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                      {benefit.title}
                    </h3>
                    <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
            <Heart className="w-5 h-5 text-amber-600" />
            <span className={`text-amber-700 dark:text-amber-300 font-medium ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'انضم إلى عائلتنا المتنامية اليوم' : 'Join our growing family today'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}