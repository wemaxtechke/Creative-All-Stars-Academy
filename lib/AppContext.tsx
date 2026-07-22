'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type {
  Teacher, BlogPost, SchoolEvent, GalleryImage, Job, JobApplication,
  Testimonial, DownloadItem, FAQ, AdmissionApplication, ContactMessage, SchoolClass,
  HeroSlide, SiteImage,
} from '@/types';
import { faqs as initialFaqs } from '@/data/mockData';
import {
  defaultPublicContent,
  type ContentCollection,
  type PublicContent,
  type SchoolSettings,
} from '@/lib/site-content';

export type UploadedMedia = {
  id: string;
  key: string;
  url: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  altText: string;
};

interface AppContextType {
  heroSlides: HeroSlide[];
  siteImages: SiteImage[];
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
  settings: SchoolSettings;
  getSiteImage: (slot: string) => SiteImage | undefined;
  addHeroSlide: (value: Omit<HeroSlide, 'id'>) => Promise<void>;
  updateHeroSlide: (id: string, value: Partial<HeroSlide>) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;
  setSiteImage: (slot: string, value: Omit<SiteImage, 'id'>) => Promise<void>;
  deleteSiteImage: (slot: string) => Promise<void>;
  addTeacher: (value: Omit<Teacher, 'id'>) => Promise<void>;
  updateTeacher: (id: string, value: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  updateSchoolClass: (id: string, value: Partial<SchoolClass>) => Promise<void>;
  addBlogPost: (value: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, value: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addSchoolEvent: (value: Omit<SchoolEvent, 'id'>) => Promise<void>;
  updateSchoolEvent: (id: string, value: Partial<SchoolEvent>) => Promise<void>;
  deleteSchoolEvent: (id: string) => Promise<void>;
  addGalleryImage: (value: Omit<GalleryImage, 'id'>) => Promise<void>;
  updateGalleryImage: (id: string, value: Partial<GalleryImage>) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  addJob: (value: Omit<Job, 'id'>) => Promise<void>;
  updateJob: (id: string, value: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  addJobApplication: (value: Omit<JobApplication, 'id' | 'status' | 'dateApplied' | 'resumeUrl'> & { turnstileToken?: string; resumeFile: File }) => Promise<void>;
  updateJobApplicationStatus: (id: string, status: JobApplication['status']) => Promise<void>;
  addTestimonial: (value: Omit<Testimonial, 'id'>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addDownload: (value: Omit<DownloadItem, 'id'>) => Promise<void>;
  deleteDownload: (id: string) => Promise<void>;
  addAdmissionApplication: (value: Omit<AdmissionApplication, 'id' | 'status' | 'dateSubmitted'> & { turnstileToken?: string; acceptedPrivacy?: boolean }) => Promise<void>;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status']) => Promise<void>;
  addContactMessage: (value: Omit<ContactMessage, 'id' | 'status' | 'dateSubmitted'> & { turnstileToken?: string }) => Promise<void>;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  updateSettings: (value: SchoolSettings) => Promise<void>;
  uploadMedia: (file: File, altText?: string) => Promise<UploadedMedia>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

async function jsonRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: 'same-origin', ...init });
  const result = await response.json().catch(() => ({})) as T & { error?: string };
  if (!response.ok) throw new Error(result.error || 'The website could not save this change.');
  return result;
}

export const AppProvider: React.FC<{ children: React.ReactNode; initialContent?: PublicContent }> = ({
  children,
  initialContent = defaultPublicContent,
}) => {
  const pathname = usePathname();
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialContent.heroSlides);
  const [siteImages, setSiteImages] = useState<SiteImage[]>(initialContent.siteImages);
  const [teachers, setTeachers] = useState<Teacher[]>(initialContent.teachers);
  const [classes, setClasses] = useState<SchoolClass[]>(initialContent.classes);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialContent.blogPosts);
  const [schoolEvents, setSchoolEvents] = useState<SchoolEvent[]>(initialContent.schoolEvents);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialContent.galleryImages);
  const [jobs, setJobs] = useState<Job[]>(initialContent.jobs);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialContent.testimonials);
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialContent.downloads);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SchoolSettings>(initialContent.settings);
  const [faqs] = useState<FAQ[]>(initialFaqs);

  useEffect(() => {
    let active = true;
    if (!pathname.startsWith('/admin/dashboard')) return () => { active = false; };
    jsonRequest<Record<string, unknown>>('/api/admin/state')
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides as HeroSlide[]);
        if (Array.isArray(data.siteImages)) setSiteImages(data.siteImages as SiteImage[]);
        if (Array.isArray(data.teachers)) setTeachers(data.teachers as Teacher[]);
        if (Array.isArray(data.classes)) setClasses(data.classes as SchoolClass[]);
        if (Array.isArray(data.blogPosts)) setBlogPosts(data.blogPosts as BlogPost[]);
        if (Array.isArray(data.schoolEvents)) setSchoolEvents(data.schoolEvents as SchoolEvent[]);
        if (Array.isArray(data.galleryImages)) setGalleryImages(data.galleryImages as GalleryImage[]);
        if (Array.isArray(data.jobs)) setJobs(data.jobs as Job[]);
        if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials as Testimonial[]);
        if (Array.isArray(data.downloads)) setDownloads(data.downloads as DownloadItem[]);
        if (data.settings && typeof data.settings === 'object') setSettings(data.settings as SchoolSettings);
        if (Array.isArray(data.jobApplications)) setJobApplications(data.jobApplications as JobApplication[]);
        if (Array.isArray(data.admissions)) setAdmissions(data.admissions as AdmissionApplication[]);
        if (Array.isArray(data.messages)) setMessages(data.messages as ContactMessage[]);
      })
      .catch((error) => console.error('Unable to load live website content', error));
    return () => { active = false; };
  }, [pathname]);

  async function createRecord<T extends { id: string }>(collection: ContentCollection, value: Omit<T, 'id'>, setter: React.Dispatch<React.SetStateAction<T[]>>) {
    const { record } = await jsonRequest<{ record: T }>(`/api/admin/content/${collection}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value),
    });
    setter((current) => [record, ...current]);
  }

  async function updateRecord<T extends { id: string }>(collection: ContentCollection, id: string, value: Partial<T>, setter: React.Dispatch<React.SetStateAction<T[]>>) {
    const { record } = await jsonRequest<{ record: T }>(`/api/admin/content/${collection}/${encodeURIComponent(id)}`, {
      method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value),
    });
    setter((current) => current.map((item) => item.id === id ? record : item));
  }

  async function deleteRecord<T extends { id: string }>(collection: ContentCollection, id: string, setter: React.Dispatch<React.SetStateAction<T[]>>) {
    const response = await fetch(`/api/admin/content/${collection}/${encodeURIComponent(id)}`, { method: 'DELETE', credentials: 'same-origin' });
    if (!response.ok) {
      const result = await response.json().catch(() => ({})) as { error?: string };
      throw new Error(result.error || 'The website could not delete this item.');
    }
    setter((current) => current.filter((item) => item.id !== id));
  }

  async function updateLead<T extends { id: string; status: string }>(id: string, status: string, setter: React.Dispatch<React.SetStateAction<T[]>>) {
    await jsonRequest(`/api/admin/leads/${encodeURIComponent(id)}`, {
      method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ status }),
    });
    setter((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }

  const addTeacher = (value: Omit<Teacher, 'id'>) => createRecord<Teacher>('teachers', value, setTeachers);
  const addHeroSlide = (value: Omit<HeroSlide, 'id'>) => createRecord<HeroSlide>('heroSlides', value, setHeroSlides);
  const updateHeroSlide = (id: string, value: Partial<HeroSlide>) => updateRecord('heroSlides', id, value, setHeroSlides);
  const deleteHeroSlide = (id: string) => deleteRecord('heroSlides', id, setHeroSlides);
  const setSiteImage = async (slot: string, value: Omit<SiteImage, 'id'>) => {
    const { record } = await jsonRequest<{ record: SiteImage }>(`/api/admin/content/siteImages/${encodeURIComponent(slot)}`, {
      method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value),
    });
    setSiteImages((current) => [record, ...current.filter((item) => item.id !== slot)]);
  };
  const deleteSiteImage = (slot: string) => deleteRecord('siteImages', slot, setSiteImages);
  const getSiteImage = (slot: string) => siteImages.find((item) => item.id === slot);
  const updateTeacher = (id: string, value: Partial<Teacher>) => updateRecord('teachers', id, value, setTeachers);
  const deleteTeacher = (id: string) => deleteRecord('teachers', id, setTeachers);
  const updateSchoolClass = (id: string, value: Partial<SchoolClass>) => updateRecord('classes', id, value, setClasses);
  const addBlogPost = (value: Omit<BlogPost, 'id'>) => createRecord<BlogPost>('blogPosts', value, setBlogPosts);
  const updateBlogPost = (id: string, value: Partial<BlogPost>) => updateRecord('blogPosts', id, value, setBlogPosts);
  const deleteBlogPost = (id: string) => deleteRecord('blogPosts', id, setBlogPosts);
  const addSchoolEvent = (value: Omit<SchoolEvent, 'id'>) => createRecord<SchoolEvent>('schoolEvents', value, setSchoolEvents);
  const updateSchoolEvent = (id: string, value: Partial<SchoolEvent>) => updateRecord('schoolEvents', id, value, setSchoolEvents);
  const deleteSchoolEvent = (id: string) => deleteRecord('schoolEvents', id, setSchoolEvents);
  const addGalleryImage = (value: Omit<GalleryImage, 'id'>) => createRecord<GalleryImage>('galleryImages', value, setGalleryImages);
  const updateGalleryImage = (id: string, value: Partial<GalleryImage>) => updateRecord('galleryImages', id, value, setGalleryImages);
  const deleteGalleryImage = (id: string) => deleteRecord('galleryImages', id, setGalleryImages);
  const addJob = (value: Omit<Job, 'id'>) => createRecord<Job>('jobs', value, setJobs);
  const updateJob = (id: string, value: Partial<Job>) => updateRecord('jobs', id, value, setJobs);
  const deleteJob = (id: string) => deleteRecord('jobs', id, setJobs);
  const addTestimonial = (value: Omit<Testimonial, 'id'>) => createRecord<Testimonial>('testimonials', value, setTestimonials);
  const deleteTestimonial = (id: string) => deleteRecord('testimonials', id, setTestimonials);
  const addDownload = (value: Omit<DownloadItem, 'id'>) => createRecord<DownloadItem>('downloads', value, setDownloads);
  const deleteDownload = (id: string) => deleteRecord('downloads', id, setDownloads);

  const addJobApplication = async (value: Omit<JobApplication, 'id' | 'status' | 'dateApplied' | 'resumeUrl'> & { turnstileToken?: string; resumeFile: File }) => {
    const form = new FormData();
    form.set('jobId', value.jobId);
    form.set('jobTitle', value.jobTitle);
    form.set('applicantName', value.applicantName);
    form.set('email', value.email);
    form.set('phone', value.phone);
    form.set('turnstileToken', value.turnstileToken ?? '');
    form.set('resume', value.resumeFile);
    const { record } = await jsonRequest<{ record: JobApplication }>('/api/forms/careers', {
      method: 'POST', body: form,
    });
    setJobApplications((current) => [record, ...current]);
  };
  const addAdmissionApplication = async (value: Omit<AdmissionApplication, 'id' | 'status' | 'dateSubmitted'> & { turnstileToken?: string; acceptedPrivacy?: boolean }) => {
    const { record } = await jsonRequest<{ record: AdmissionApplication }>('/api/forms/admissions', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value),
    });
    setAdmissions((current) => [record, ...current]);
  };
  const addContactMessage = async (value: Omit<ContactMessage, 'id' | 'status' | 'dateSubmitted'> & { turnstileToken?: string }) => {
    const { record } = await jsonRequest<{ record: ContactMessage }>('/api/forms/contact', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value),
    });
    setMessages((current) => [record, ...current]);
  };
  const updateJobApplicationStatus = (id: string, status: JobApplication['status']) => updateLead(id, status, setJobApplications);
  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status']) => updateLead(id, status, setAdmissions);
  const updateMessageStatus = (id: string, status: ContactMessage['status']) => updateLead(id, status, setMessages);
  const updateSettings = async (value: SchoolSettings) => {
    const { record } = await jsonRequest<{ record: SchoolSettings }>(`/api/admin/content/settings/school`, {
      method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value),
    });
    setSettings(record);
  };
  const uploadMedia = async (file: File, altText = '') => {
    const form = new FormData();
    form.set('file', file);
    form.set('altText', altText);
    const { asset } = await jsonRequest<{ asset: UploadedMedia }>('/api/admin/media', {
      method: 'POST',
      body: form,
    });
    return asset;
  };

  return <AppContext.Provider value={{
    heroSlides, siteImages, teachers, blogPosts, schoolEvents, galleryImages, jobs, jobApplications,
    testimonials, downloads, admissions, messages, classes, faqs, settings,
    getSiteImage, addHeroSlide, updateHeroSlide, deleteHeroSlide, setSiteImage, deleteSiteImage,
    addTeacher, updateTeacher, deleteTeacher, updateSchoolClass,
    addBlogPost, updateBlogPost, deleteBlogPost, addSchoolEvent, updateSchoolEvent, deleteSchoolEvent,
    addGalleryImage, updateGalleryImage, deleteGalleryImage, addJob, updateJob, deleteJob, addJobApplication,
    updateJobApplicationStatus, addTestimonial, deleteTestimonial, addDownload, deleteDownload,
    addAdmissionApplication, updateAdmissionStatus, addContactMessage, updateMessageStatus, updateSettings, uploadMedia,
  }}>{children}</AppContext.Provider>;
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
