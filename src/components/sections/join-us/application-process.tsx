'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Users, 
  UserCheck, 
  Briefcase, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';

interface ApplicationProcessProps {
  locale: string;
}

const translations = {
  en: {
    title: "Application Process",
    subtitle: "Your journey to joining our team in 4 simple steps",
    steps: [
      {
        icon: FileText,
        title: "Submit Application",
        description: "Fill out our online application form with your details and upload your CV",
        details: [
          "Complete the application form",
          "Upload your CV/Resume",
          "Provide references",
          "Submit required documents"
        ],
        timeframe: "5-10 minutes",
        status: "Apply Now"
      },
      {
        icon: Phone,
        title: "Phone Screening",
        description: "Our HR team will contact you for an initial phone interview",
        details: [
          "Initial phone conversation",
          "Basic qualification check",
          "Availability discussion",
          "Role expectations overview"
        ],
        timeframe: "15-20 minutes",
        status: "Within 3 days"
      },
      {
        icon: Users,
        title: "In-Person Interview",
        description: "Meet with our managers and team members at one of our locations",
        details: [
          "Face-to-face interview",
          "Skills assessment",
          "Culture fit evaluation",
          "Restaurant tour"
        ],
        timeframe: "30-45 minutes",
        status: "Within 1 week"
      },
      {
        icon: UserCheck,
        title: "Job Offer & Onboarding",
        description: "Receive your offer and begin your exciting journey with us",
        details: [
          "Job offer presentation",
          "Contract signing",
          "Orientation program",
          "Training schedule"
        ],
        timeframe: "2-3 days",
        status: "Welcome!"
      }
    ],
    cta: {
      title: "Ready to Start Your Application?",
      description: "Join our team and become part of Iraq's fastest-growing restaurant group",
      button: "Apply Now"
    }
  },
  ar: {
    title: "عملية التقديم",
    subtitle: "رحلتك للانضمام إلى فريقنا في 4 خطوات بسيطة",
    steps: [
      {
        icon: FileText,
        title: "تقديم الطلب",
        description: "املأ نموذج الطلب عبر الإنترنت مع تفاصيلك وارفع سيرتك الذاتية",
        details: [
          "أكمل نموذج الطلب",
          "ارفع سيرتك الذاتية",
          "قدم المراجع",
          "قدم الوثائق المطلوبة"
        ],
        timeframe: "5-10 دقائق",
        status: "قدم الآن"
      },
      {
        icon: Phone,
        title: "المقابلة الهاتفية",
        description: "سيتواصل معك فريق الموارد البشرية لمقابلة هاتفية أولية",
        details: [
          "محادثة هاتفية أولية",
          "فحص المؤهلات الأساسية",
          "مناقشة التوفر",
          "نظرة عامة على توقعات الدور"
        ],
        timeframe: "15-20 دقيقة",
        status: "خلال 3 أيام"
      },
      {
        icon: Users,
        title: "المقابلة الشخصية",
        description: "التقِ بمديرينا وأعضاء الفريق في أحد مواقعنا",
        details: [
          "مقابلة وجهاً لوجه",
          "تقييم المهارات",
          "تقييم التوافق مع الثقافة",
          "جولة في المطعم"
        ],
        timeframe: "30-45 دقيقة",
        status: "خلال أسبوع"
      },
      {
        icon: UserCheck,
        title: "عرض العمل والتأهيل",
        description: "احصل على عرضك وابدأ رحلتك المثيرة معنا",
        details: [
          "تقديم عرض العمل",
          "توقيع العقد",
          "برنامج التوجيه",
          "جدولة التدريب"
        ],
        timeframe: "2-3 أيام",
        status: "أهلاً وسهلاً!"
      }
    ],
    cta: {
      title: "هل أنت مستعد لبدء طلبك؟",
      description: "انضم إلى فريقنا وكن جزءاً من مجموعة المطاعم الأسرع نمواً في العراق",
      button: "قدم الآن"
    }
  }
};

export default function ApplicationProcess({ locale }: ApplicationProcessProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0 
    }
  };

  return (
    <section className={`py-24 bg-white dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
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
            className={`text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}
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

        {/* Process Steps */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t.steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = activeStep === index;
            
            return (
              <motion.div
                key={index}
                variants={stepVariants}
                className="relative mb-8 last:mb-0"
              >
                {/* Connection Line */}
                {index < t.steps.length - 1 && (
                  <div className={`absolute top-16 ${isRTL ? 'right-8' : 'left-8'} w-0.5 h-20 bg-gradient-to-b from-amber-500 to-orange-500 opacity-30`}></div>
                )}
                
                <div 
                  className="group cursor-pointer"
                  onClick={() => setActiveStep(isActive ? null : index)}
                >
                  <div className="flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-amber-600">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm text-gray-500 ${isRTL ? 'font-arabic' : ''}`}>
                            {step.timeframe}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`text-gray-600 dark:text-gray-400 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                        {step.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm rounded-full font-medium ${isRTL ? 'font-arabic' : ''}`}>
                          {step.status}
                        </span>
                        <ArrowRight className={`w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {step.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                                      {detail}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
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
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t.cta.title}
            </h3>
            <p className={`text-gray-600 dark:text-gray-400 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t.cta.description}
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Briefcase className="w-5 h-5" />
              <span className={isRTL ? 'font-arabic' : ''}>
                {t.cta.button}
              </span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}