'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  locale: string;
}

const translations = {
  en: {
    title: "Apply for Position",
    subtitle: "We're excited to learn more about you!",
    fields: {
      name: "Full Name",
      email: "Email Address", 
      phone: "Phone Number",
      experience: "Years of Experience",
      cv: "Upload CV/Resume",
      coverLetter: "Cover Letter / Message"
    },
    placeholders: {
      name: "Enter your full name",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      experience: "e.g., 2-3 years",
      cv: "Choose PDF file (max 5MB)",
      coverLetter: "Tell us why you're interested in this position and what makes you a great fit..."
    },
    buttons: {
      submit: "Submit Application",
      cancel: "Cancel",
      close: "Close"
    },
    success: {
      title: "Application Submitted!",
      message: "Thank you for your interest! We will contact you as soon as possible.",
      note: "You should receive a confirmation email shortly."
    },
    errors: {
      required: "This field is required",
      email: "Please enter a valid email address",
      phone: "Please enter a valid phone number",
      submit: "Failed to submit application. Please try again."
    },
    loading: "Submitting your application...",
    jobInfo: "You are applying for"
  },
  ar: {
    title: "التقدم للوظيفة",
    subtitle: "نحن متحمسون للتعرف عليك أكثر!",
    fields: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني", 
      phone: "رقم الهاتف",
      experience: "سنوات الخبرة",
      cv: "رفع السيرة الذاتية",
      coverLetter: "خطاب التقديم / رسالة"
    },
    placeholders: {
      name: "أدخل اسمك الكامل",
      email: "your.email@example.com",
      phone: "+964 770 123 4567",
      experience: "مثال: 2-3 سنوات",
      cv: "اختر ملف PDF (حد أقصى 5 ميجابايت)",
      coverLetter: "أخبرنا لماذا أنت مهتم بهذا المنصب وما الذي يجعلك مناسباً له..."
    },
    buttons: {
      submit: "إرسال الطلب",
      cancel: "إلغاء",
      close: "إغلاق"
    },
    success: {
      title: "تم إرسال الطلب!",
      message: "شكراً لاهتمامك! سنتواصل معك في أقرب وقت ممكن.",
      note: "ستتلقى رسالة تأكيد عبر البريد الإلكتروني قريباً."
    },
    errors: {
      required: "هذا الحقل مطلوب",
      email: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      phone: "يرجى إدخال رقم هاتف صحيح",
      submit: "فشل في إرسال الطلب. يرجى المحاولة مرة أخرى."
    },
    loading: "جاري إرسال طلبك...",
    jobInfo: "أنت تتقدم لوظيفة"
  }
};

export default function JobApplicationModal({ isOpen, onClose, job, locale }: JobApplicationModalProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: ''
  });
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.errors.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errors.email;
    }

    if (formData.phone && !/^[\+]?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t.errors.phone;
    }

    // Validate CV file if uploaded
    if (cvFile) {
      if (cvFile.size > 5 * 1024 * 1024) { // 5MB limit
        newErrors.cv = isRTL ? 'حجم الملف يجب أن يكون أقل من 5 ميجابايت' : 'File size must be less than 5MB';
      }
      if (!cvFile.type.includes('pdf') && !cvFile.type.includes('doc')) {
        newErrors.cv = isRTL ? 'يجب أن يكون الملف PDF أو Word' : 'File must be PDF or Word document';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !job) return;

    setIsSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append('jobId', job.id.toString());
      submitFormData.append('name', formData.name);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('experience', formData.experience);
      submitFormData.append('coverLetter', formData.coverLetter);
      
      if (cvFile) {
        submitFormData.append('cv', cvFile);
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', experience: '', coverLetter: '' });
        setCvFile(null);
      } else {
        setErrors({ submit: result.error || t.errors.submit });
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setErrors({ submit: t.errors.submit });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      // Clear any previous CV errors
      const newErrors = { ...errors };
      delete newErrors.cv;
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', phone: '', experience: '', coverLetter: '' });
    setCvFile(null);
    setErrors({});
    onClose();
  };

  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${isRTL ? 'rtl' : 'ltr'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                    {t.title}
                  </h2>
                  <p className={`text-gray-600 dark:text-gray-400 mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.subtitle}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Job Info */}
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className={`text-sm text-amber-700 dark:text-amber-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {t.jobInfo}:
                </p>
                <h3 className={`font-semibold text-amber-800 dark:text-amber-200 ${isRTL ? 'font-arabic' : ''}`}>
                  {job.title}
                </h3>
                <p className={`text-sm text-amber-600 dark:text-amber-400 ${isRTL ? 'font-arabic' : ''}`}>
                  {job.department} • {job.location} • {job.type}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                /* Success State */
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.success.title}
                  </h3>
                  <p className={`text-gray-600 dark:text-gray-400 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.success.message}
                  </p>
                  <p className={`text-sm text-gray-500 dark:text-gray-500 ${isRTL ? 'font-arabic' : ''}`}>
                    {t.success.note}
                  </p>
                  <button
                    onClick={handleClose}
                    className={`mt-6 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {t.buttons.close}
                  </button>
                </motion.div>
              ) : (
                /* Application Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <User className="w-4 h-4 inline mr-2" />
                      {t.fields.name} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.placeholders.name}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    />
                    {errors.name && (
                      <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <Mail className="w-4 h-4 inline mr-2" />
                      {t.fields.email} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.placeholders.email}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    />
                    {errors.email && (
                      <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <Phone className="w-4 h-4 inline mr-2" />
                      {t.fields.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.placeholders.phone}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    />
                    {errors.phone && (
                      <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Experience Field */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      {t.fields.experience}
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder={t.placeholders.experience}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    />
                    {errors.experience && (
                      <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <Upload className="w-4 h-4 inline mr-2" />
                      {t.fields.cv}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="cv-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="cv-upload"
                        className={`w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors cursor-pointer flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 ${isRTL ? 'font-arabic' : ''}`}
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        {cvFile ? cvFile.name : t.placeholders.cv}
                      </label>
                      {cvFile && (
                        <button
                          type="button"
                          onClick={() => setCvFile(null)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    {errors.cv && (
                      <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {errors.cv}
                      </p>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      <FileText className="w-4 h-4 inline mr-2" />
                      {t.fields.coverLetter}
                    </label>
                    <textarea
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder={t.placeholders.coverLetter}
                      rows={4}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-colors resize-none ${isRTL ? 'font-arabic text-right' : ''}`}
                    />
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <p className={`text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        {errors.submit}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.loading}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.buttons.submit}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className={`px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t.buttons.cancel}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}