'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Building,
  Globe
} from 'lucide-react';

interface ContactCTAProps {
  locale: string;
}

const translations = {
  en: {
    title: "Ready to Join Our Team?",
    subtitle: "Get in touch with us today and start your career journey",
    form: {
      title: "Apply Now",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      position: "Position of Interest",
      message: "Tell us about yourself",
      submit: "Submit Application",
      submitting: "Submitting...",
      success: "Application submitted successfully! We'll contact you soon.",
      positions: [
        "Restaurant Manager",
        "Assistant Manager", 
        "Head Chef",
        "Cook",
        "Server",
        "Host/Hostess",
        "Cashier",
        "Kitchen Assistant",
        "Delivery Driver",
        "Other"
      ]
    },
    contact: {
      title: "Contact Information",
      phone: "+964 770 123 4567",
      email: "careers@landoffranchise.com",
      address: "Baghdad, Iraq",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM"
    },
    locations: {
      title: "Our Locations",
      subtitle: "We're hiring across all our restaurant locations",
      cities: ["Baghdad", "Erbil", "Basrah", "Mosul", "Najaf", "Karbala"]
    }
  },
  ar: {
    title: "هل أنت مستعد للانضمام إلى فريقنا؟",
    subtitle: "تواصل معنا اليوم وابدأ رحلتك المهنية",
    form: {
      title: "قدم الآن",
      name: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      position: "المنصب المهتم به",
      message: "أخبرنا عن نفسك",
      submit: "إرسال الطلب",
      submitting: "جاري الإرسال...",
      success: "تم إرسال الطلب بنجاح! سنتواصل معك قريباً.",
      positions: [
        "مدير مطعم",
        "مساعد مدير",
        "رئيس الطباخين",
        "طباخ",
        "خادم",
        "مضيف",
        "أمين صندوق",
        "مساعد مطبخ",
        "سائق توصيل",
        "أخرى"
      ]
    },
    contact: {
      title: "معلومات الاتصال",
      phone: "+964 770 123 4567",
      email: "careers@landoffranchise.com",
      address: "بغداد، العراق",
      hours: "الإثنين-الجمعة: 9:00 ص - 6:00 م"
    },
    locations: {
      title: "مواقعنا",
      subtitle: "نحن نوظف في جميع مواقع مطاعمنا",
      cities: ["بغداد", "أربيل", "البصرة", "الموصل", "النجف", "كربلاء"]
    }
  }
};

export default function ContactCTA({ locale }: ContactCTAProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section className={`py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
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

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                    {t.form.title}
                  </h3>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <p className={`text-green-600 dark:text-green-400 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                      {t.form.success}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {t.form.name}
                        </label>
                        <div className="relative">
                          <User className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {t.form.email}
                        </label>
                        <div className="relative">
                          <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {t.form.phone}
                        </label>
                        <div className="relative">
                          <Phone className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          />
                        </div>
                      </div>

                      {/* Position */}
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {t.form.position}
                        </label>
                        <select
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}
                        >
                          <option value="">{isRTL ? 'اختر منصباً' : 'Select a position'}</option>
                          {t.form.positions.map((position, index) => (
                            <option key={index} value={position}>
                              {position}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                        {t.form.message}
                      </label>
                      <div className="relative">
                        <MessageSquare className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${isRTL ? 'font-arabic' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className={isRTL ? 'font-arabic' : ''}>{t.form.submitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span className={isRTL ? 'font-arabic' : ''}>{t.form.submit}</span>
                          <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info & Locations */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {t.contact.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{isRTL ? 'هاتف' : 'Phone'}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{t.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{isRTL ? 'بريد إلكتروني' : 'Email'}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{t.contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{isRTL ? 'عنوان' : 'Address'}</p>
                      <p className={`font-medium text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>{t.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{isRTL ? 'ساعات العمل' : 'Hours'}</p>
                      <p className={`font-medium text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>{t.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                    {t.locations.title}
                  </h3>
                </div>
                <p className={`text-gray-600 dark:text-gray-400 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {t.locations.subtitle}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {t.locations.cities.map((city, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Building className="w-4 h-4 text-amber-500" />
                      <span className={`text-sm text-gray-700 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                        {city}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}