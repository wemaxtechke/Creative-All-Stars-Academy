import {
  teachers,
  blogPosts,
  schoolEvents,
  galleryImages,
  jobs,
  testimonials,
  downloads,
} from "@/data/mockData";
import type {
  BlogPost,
  DownloadItem,
  GalleryImage,
  Job,
  SchoolEvent,
  Teacher,
  Testimonial,
} from "@/types";

export const defaultSettings = {
  schoolName: "Creative All Stars Academy",
  logoText: "CASA",
  tagline: "Endeavour to Succeed",
  email: "info@creativeallstars.ac.ke",
  phone: "+254733590116",
  address: "Ngata, Nakuru City, Kenya",
  officeHours: "Monday - Friday: 7:30 AM - 5:00 PM | Saturday: 8:00 AM - 12:00 PM",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  theme: "light" as "light" | "dark",
};

export type SchoolSettings = typeof defaultSettings;

export type PublicContent = {
  teachers: Teacher[];
  blogPosts: BlogPost[];
  schoolEvents: SchoolEvent[];
  galleryImages: GalleryImage[];
  jobs: Job[];
  testimonials: Testimonial[];
  downloads: DownloadItem[];
  settings: SchoolSettings;
};

export const defaultPublicContent: PublicContent = {
  teachers,
  blogPosts,
  schoolEvents,
  galleryImages,
  jobs,
  testimonials,
  downloads,
  settings: defaultSettings,
};

export type ContentCollection = Exclude<keyof typeof defaultPublicContent, "settings"> | "settings";

export const contentCollections: ContentCollection[] = [
  "teachers",
  "blogPosts",
  "schoolEvents",
  "galleryImages",
  "jobs",
  "testimonials",
  "downloads",
  "settings",
];
