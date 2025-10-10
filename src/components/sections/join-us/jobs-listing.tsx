'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Building2,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import type { JobPosition } from '@/lib/odoo';

// Define the Job interface that matches our JSON-2 API response
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

interface JobsListingProps {
  locale: string;
}

const translations = {
  en: {
    title: "Available Positions",
    subtitle: "Join our team and build your career with us",
    loading: "Loading positions...",
    error: "Unable to load positions at the moment",
    noJobs: "No positions available right now",
    department: "Department",
    location: "Location",
    openings: "Opening",
    openingsPlural: "Openings", 
    posted: "Posted",
    apply: "Apply Now",
    viewDetails: "View Details",
    fullTime: "Full Time",
    partTime: "Part Time",
    contract: "Contract",
    applications: "applications"
  },
  ar: {
    title: "الوظائف المتاحة",
    subtitle: "انضم إلى فريقنا وابني مسيرتك المهنية معنا",
    loading: "جاري تحميل الوظائف...",
    error: "غير قادر على تحميل الوظائف في الوقت الحالي",
    noJobs: "لا توجد وظائف متاحة حالياً",
    department: "القسم",
    location: "الموقع",
    openings: "منصب",
    openingsPlural: "مناصب",
    posted: "نُشر في",
    apply: "قدم الآن",
    viewDetails: "عرض التفاصيل",
    fullTime: "دوام كامل",
    partTime: "دوام جزئي",
    contract: "عقد",
    applications: "طلبات"
  }
};

export default function JobsListing({ locale }: JobsListingProps) {
  const currentLocale = (locale === 'ar' ? 'ar' : 'en') as keyof typeof translations;
  const t = translations[currentLocale];
  const isRTL = currentLocale === 'ar';

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/jobs');
      const result = await response.json();
      
      if (result.success) {
        setJobs(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isRTL 
      ? date.toLocaleDateString('ar-EG')
      : date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
  };

  if (loading) {
    return (
      <section className={`py-24 bg-white dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-amber-500 animate-spin" />
            <p className={`text-lg text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
              {t.loading}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-24 bg-white dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className={`text-lg text-red-600 dark:text-red-400 ${isRTL ? 'font-arabic' : ''}`}>
              {t.error}
            </p>
            <button 
              onClick={fetchJobs}
              className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
            >
              {isRTL ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Jobs Listing */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className={`text-lg text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
              {t.noJobs}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                          {job.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>
                              {job.department}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>{job.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>{job.type}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>
                              {t.posted} {formatDate(job.postedDate)}
                            </span>
                          </div>
                        </div>

                        {job.description && (
                          <p className={`mt-3 text-gray-600 dark:text-gray-400 line-clamp-2 ${isRTL ? 'font-arabic' : ''}`}>
                            {job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                          </p>
                        )}

                        {job.requirements && job.requirements.length > 0 && (
                          <div className={`mt-3 ${isRTL ? 'font-arabic' : ''}`}>
                            <div className="flex flex-wrap gap-2">
                              {job.requirements.slice(0, 3).map((req, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full"
                                >
                                  {req}
                                </span>
                              ))}
                              {job.requirements.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                  +{job.requirements.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                      <span className={isRTL ? 'font-arabic' : ''}>{t.apply}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {jobs.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Briefcase className="w-5 h-5 text-amber-600" />
              <span className={`text-amber-700 dark:text-amber-300 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                {jobs.length} {jobs.length === 1 ? t.openings : t.openingsPlural} {isRTL ? 'متاح' : 'Available'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}