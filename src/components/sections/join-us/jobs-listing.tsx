'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Users, 
  Building2,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import type { JobPosition } from '@/lib/odoo';
import JobApplicationModal from './job-application-modal';

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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

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
          <div className="space-y-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group border border-gray-100 dark:border-gray-700"
              >
                {/* Job Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span className={isRTL ? 'font-arabic' : ''}>{job.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className={isRTL ? 'font-arabic' : ''}>
                          {t.posted} {formatDate(job.postedDate)}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleApplyClick(job)}
                        className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 group-hover:scale-105"
                      >
                        <span className={isRTL ? 'font-arabic' : ''}>{t.apply}</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job Content */}
                <div className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Job Description */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className={`text-lg font-semibold text-gray-900 dark:text-white mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                          {isRTL ? 'وصف الوظيفة' : 'Job Description'}
                        </h4>
                        {job.description ? (
                          <div 
                            className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}
                            dangerouslySetInnerHTML={{ 
                              __html: job.description.length > 300 
                                ? job.description.substring(0, 300) + '...' 
                                : job.description 
                            }}
                          />
                        ) : (
                          <p className={`text-gray-500 dark:text-gray-400 italic ${isRTL ? 'font-arabic' : ''}`}>
                            {isRTL ? 'لا يوجد وصف متاح' : 'No description available'}
                          </p>
                        )}
                      </div>

                      {/* Requirements */}
                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <h4 className={`text-lg font-semibold text-gray-900 dark:text-white mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                            {isRTL ? 'المتطلبات' : 'Requirements'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, idx) => (
                              <span 
                                key={idx}
                                className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full border border-amber-200 dark:border-amber-800"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Job Stats/Info */}
                    <div className="space-y-6">
                      {/* Quick Info Cards */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                                {t.department}
                              </p>
                              <p className={`font-semibold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                                {job.department}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                                {t.location}
                              </p>
                              <p className={`font-semibold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                                {job.location}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                                {isRTL ? 'نوع العمل' : 'Employment Type'}
                              </p>
                              <p className={`font-semibold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                                {job.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Apply Button (Mobile) */}
                      <div className="lg:hidden">
                        <button 
                          onClick={() => handleApplyClick(job)}
                          className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <span className={isRTL ? 'font-arabic' : ''}>{t.apply}</span>
                          <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
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

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
        locale={locale}
      />
    </section>
  );
}