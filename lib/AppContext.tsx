'use strict';
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Teacher,
  BlogPost,
  SchoolEvent,
  GalleryImage,
  Job,
  JobApplication,
  Testimonial,
  DownloadItem,
  FAQ,
  AdmissionApplication,
  ContactMessage,
  SchoolClass
} from '../types';
import {
  mockStudents,
  teachers as initialTeachers,
  blogPosts as initialBlogPosts,
  schoolEvents as initialSchoolEvents,
  galleryImages as initialGalleryImages,
  jobs as initialJobs,
  initialJobApplications,
  testimonials as initialTestimonials,
  downloads as initialDownloads,
  initialAdmissions,
  initialMessages,
  schoolClasses as initialSchoolClasses,
  faqs as initialFaqs
} from '../data/mockData';

const schoolSettings = {
  schoolName: 'Creative All Stars Academy',
  logoText: 'CASA',
  tagline: 'Empowering Every Child to Shine',
  email: 'info@creativeallstars.ac.ke',
  phone: '+254 712 345 678',
  address: 'Ngata Area, Nakuru City, Kenya',
  officeHours: 'Monday - Friday: 7:30 AM - 5:00 PM | Saturday: 8:00 AM - 12:00 PM',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  theme: 'light' as 'light' | 'dark'
};

interface AppContextType {
  students: Student[];
  teachers: Teacher[];
  blogPosts: BlogPost[];
  schoolEvents: SchoolEvent[];
  galleryImages: GalleryImage[];
  jobs: Job[];
  jobApplications: JobApplication[];
  testimonials: Testimonial[];
  downloads: DownloadItem[];
  admissions: AdmissionApplication[];
  messages: ContactMessage[];
  classes: SchoolClass[];
  faqs: FAQ[];
  settings: typeof schoolSettings;

  // Actions
  addStudent: (s: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, s: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  addTeacher: (t: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, t: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  addBlogPost: (b: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, b: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  addSchoolEvent: (e: Omit<SchoolEvent, 'id'>) => void;
  updateSchoolEvent: (id: string, e: Partial<SchoolEvent>) => void;
  deleteSchoolEvent: (id: string) => void;

  addGalleryImage: (g: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: string) => void;

  addJob: (j: Omit<Job, 'id'>) => void;
  updateJob: (id: string, j: Partial<Job>) => void;
  deleteJob: (id: string) => void;

  addJobApplication: (ja: Omit<JobApplication, 'id' | 'status' | 'dateApplied'>) => void;
  updateJobApplicationStatus: (id: string, status: JobApplication['status']) => void;

  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  addDownload: (d: Omit<DownloadItem, 'id'>) => void;
  deleteDownload: (id: string) => void;

  addAdmissionApplication: (app: Omit<AdmissionApplication, 'id' | 'status' | 'dateSubmitted'>) => void;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status']) => void;

  addContactMessage: (m: Omit<ContactMessage, 'id' | 'status' | 'dateSubmitted'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;

  updateSettings: (s: typeof schoolSettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [schoolEvents, setSchoolEvents] = useState<SchoolEvent[]>(initialSchoolEvents);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(initialJobApplications);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(initialAdmissions);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [classes] = useState<SchoolClass[]>(initialSchoolClasses);
  const [faqs] = useState<FAQ[]>(initialFaqs);
  const [settings, setSettings] = useState(schoolSettings);

  // Load from LocalStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedStudents = localStorage.getItem('casa_students');
      if (storedStudents) setStudents(JSON.parse(storedStudents));

      const storedTeachers = localStorage.getItem('casa_teachers');
      if (storedTeachers) setTeachers(JSON.parse(storedTeachers));

      const storedBlog = localStorage.getItem('casa_blog');
      if (storedBlog) setBlogPosts(JSON.parse(storedBlog));

      const storedEvents = localStorage.getItem('casa_events');
      if (storedEvents) setSchoolEvents(JSON.parse(storedEvents));

      const storedGallery = localStorage.getItem('casa_gallery');
      if (storedGallery) setGalleryImages(JSON.parse(storedGallery));

      const storedJobs = localStorage.getItem('casa_jobs');
      if (storedJobs) setJobs(JSON.parse(storedJobs));

      const storedJobApps = localStorage.getItem('casa_job_apps');
      if (storedJobApps) setJobApplications(JSON.parse(storedJobApps));

      const storedTestimonials = localStorage.getItem('casa_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedDownloads = localStorage.getItem('casa_downloads');
      if (storedDownloads) setDownloads(JSON.parse(storedDownloads));

      const storedAdmissions = localStorage.getItem('casa_admissions');
      if (storedAdmissions) setAdmissions(JSON.parse(storedAdmissions));

      const storedMessages = localStorage.getItem('casa_messages');
      if (storedMessages) setMessages(JSON.parse(storedMessages));

      const storedSettings = localStorage.getItem('casa_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const saveToLocalStorage = (key: string, data: unknown) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // Student Actions
  const addStudent = (s: Omit<Student, 'id'>) => {
    const newS = { ...s, id: 'st_' + Date.now() };
    const updated = [newS, ...students];
    setStudents(updated);
    saveToLocalStorage('casa_students', updated);
  };
  const updateStudent = (id: string, s: Partial<Student>) => {
    const updated = students.map(item => item.id === id ? { ...item, ...s } : item);
    setStudents(updated);
    saveToLocalStorage('casa_students', updated);
  };
  const deleteStudent = (id: string) => {
    const updated = students.filter(item => item.id !== id);
    setStudents(updated);
    saveToLocalStorage('casa_students', updated);
  };

  // Teacher Actions
  const addTeacher = (t: Omit<Teacher, 'id'>) => {
    const newT = { ...t, id: 't_' + Date.now() };
    const updated = [...teachers, newT];
    setTeachers(updated);
    saveToLocalStorage('casa_teachers', updated);
  };
  const updateTeacher = (id: string, t: Partial<Teacher>) => {
    const updated = teachers.map(item => item.id === id ? { ...item, ...t } : item);
    setTeachers(updated);
    saveToLocalStorage('casa_teachers', updated);
  };
  const deleteTeacher = (id: string) => {
    const updated = teachers.filter(item => item.id !== id);
    setTeachers(updated);
    saveToLocalStorage('casa_teachers', updated);
  };

  // Blog Actions
  const addBlogPost = (b: Omit<BlogPost, 'id'>) => {
    const newB = { ...b, id: 'b_' + Date.now() };
    const updated = [newB, ...blogPosts];
    setBlogPosts(updated);
    saveToLocalStorage('casa_blog', updated);
  };
  const updateBlogPost = (id: string, b: Partial<BlogPost>) => {
    const updated = blogPosts.map(item => item.id === id ? { ...item, ...b } : item);
    setBlogPosts(updated);
    saveToLocalStorage('casa_blog', updated);
  };
  const deleteBlogPost = (id: string) => {
    const updated = blogPosts.filter(item => item.id !== id);
    setBlogPosts(updated);
    saveToLocalStorage('casa_blog', updated);
  };

  // Event Actions
  const addSchoolEvent = (e: Omit<SchoolEvent, 'id'>) => {
    const newE = { ...e, id: 'e_' + Date.now() };
    const updated = [newE, ...schoolEvents];
    setSchoolEvents(updated);
    saveToLocalStorage('casa_events', updated);
  };
  const updateSchoolEvent = (id: string, e: Partial<SchoolEvent>) => {
    const updated = schoolEvents.map(item => item.id === id ? { ...item, ...e } : item);
    setSchoolEvents(updated);
    saveToLocalStorage('casa_events', updated);
  };
  const deleteSchoolEvent = (id: string) => {
    const updated = schoolEvents.filter(item => item.id !== id);
    setSchoolEvents(updated);
    saveToLocalStorage('casa_events', updated);
  };

  // Gallery Actions
  const addGalleryImage = (g: Omit<GalleryImage, 'id'>) => {
    const newG = { ...g, id: 'g_' + Date.now() };
    const updated = [newG, ...galleryImages];
    setGalleryImages(updated);
    saveToLocalStorage('casa_gallery', updated);
  };
  const deleteGalleryImage = (id: string) => {
    const updated = galleryImages.filter(item => item.id !== id);
    setGalleryImages(updated);
    saveToLocalStorage('casa_gallery', updated);
  };

  // Job Actions
  const addJob = (j: Omit<Job, 'id'>) => {
    const newJ = { ...j, id: 'j_' + Date.now() };
    const updated = [newJ, ...jobs];
    setJobs(updated);
    saveToLocalStorage('casa_jobs', updated);
  };
  const updateJob = (id: string, j: Partial<Job>) => {
    const updated = jobs.map(item => item.id === id ? { ...item, ...j } : item);
    setJobs(updated);
    saveToLocalStorage('casa_jobs', updated);
  };
  const deleteJob = (id: string) => {
    const updated = jobs.filter(item => item.id !== id);
    setJobs(updated);
    saveToLocalStorage('casa_jobs', updated);
  };

  // Job Application Actions
  const addJobApplication = (ja: Omit<JobApplication, 'id' | 'status' | 'dateApplied'>) => {
    const newJA: JobApplication = {
      ...ja,
      id: 'ja_' + Date.now(),
      status: 'Pending',
      dateApplied: new Date().toISOString().split('T')[0]
    };
    const updated = [newJA, ...jobApplications];
    setJobApplications(updated);
    saveToLocalStorage('casa_job_apps', updated);
  };
  const updateJobApplicationStatus = (id: string, status: JobApplication['status']) => {
    const updated = jobApplications.map(item => item.id === id ? { ...item, status } : item);
    setJobApplications(updated);
    saveToLocalStorage('casa_job_apps', updated);
  };

  // Testimonial Actions
  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newT = { ...t, id: 'te_' + Date.now() };
    const updated = [newT, ...testimonials];
    setTestimonials(updated);
    saveToLocalStorage('casa_testimonials', updated);
  };
  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(item => item.id !== id);
    setTestimonials(updated);
    saveToLocalStorage('casa_testimonials', updated);
  };

  // Download Actions
  const addDownload = (d: Omit<DownloadItem, 'id'>) => {
    const newD = { ...d, id: 'd_' + Date.now() };
    const updated = [newD, ...downloads];
    setDownloads(updated);
    saveToLocalStorage('casa_downloads', updated);
  };
  const deleteDownload = (id: string) => {
    const updated = downloads.filter(item => item.id !== id);
    setDownloads(updated);
    saveToLocalStorage('casa_downloads', updated);
  };

  // Admission Application Actions
  const addAdmissionApplication = (app: Omit<AdmissionApplication, 'id' | 'status' | 'dateSubmitted'>) => {
    const newApp: AdmissionApplication = {
      ...app,
      id: 'app_' + Date.now(),
      status: 'Pending',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    const updated = [newApp, ...admissions];
    setAdmissions(updated);
    saveToLocalStorage('casa_admissions', updated);
  };
  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status']) => {
    const updated = admissions.map(item => item.id === id ? { ...item, status } : item);
    setAdmissions(updated);
    saveToLocalStorage('casa_admissions', updated);
  };

  // Contact Message Actions
  const addContactMessage = (m: Omit<ContactMessage, 'id' | 'status' | 'dateSubmitted'>) => {
    const newM: ContactMessage = {
      ...m,
      id: 'msg_' + Date.now(),
      status: 'Unread',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    const updated = [newM, ...messages];
    setMessages(updated);
    saveToLocalStorage('casa_messages', updated);
  };
  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const updated = messages.map(item => item.id === id ? { ...item, status } : item);
    setMessages(updated);
    saveToLocalStorage('casa_messages', updated);
  };

  // Settings Actions
  const updateSettings = (s: typeof schoolSettings) => {
    setSettings(s);
    saveToLocalStorage('casa_settings', s);
  };

  return (
    <AppContext.Provider
      value={{
        students,
        teachers,
        blogPosts,
        schoolEvents,
        galleryImages,
        jobs,
        jobApplications,
        testimonials,
        downloads,
        admissions,
        messages,
        classes,
        faqs,
        settings,

        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addSchoolEvent,
        updateSchoolEvent,
        deleteSchoolEvent,
        addGalleryImage,
        deleteGalleryImage,
        addJob,
        updateJob,
        deleteJob,
        addJobApplication,
        updateJobApplicationStatus,
        addTestimonial,
        deleteTestimonial,
        addDownload,
        deleteDownload,
        addAdmissionApplication,
        updateAdmissionStatus,
        addContactMessage,
        updateMessageStatus,
        updateSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
