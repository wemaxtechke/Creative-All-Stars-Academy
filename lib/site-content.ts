import type {
  BlogPost,
  DownloadItem,
  GalleryImage,
  Job,
  SchoolEvent,
  Teacher,
  Testimonial,
  HeroSlide,
  SiteImage,
  SchoolClass,
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
  heroSlides: HeroSlide[];
  siteImages: SiteImage[];
  teachers: Teacher[];
  classes: SchoolClass[];
  blogPosts: BlogPost[];
  schoolEvents: SchoolEvent[];
  galleryImages: GalleryImage[];
  jobs: Job[];
  testimonials: Testimonial[];
  downloads: DownloadItem[];
  settings: SchoolSettings;
};

export const defaultPublicContent: PublicContent = {
  heroSlides: [],
  siteImages: [],
  teachers: [],
  classes: [],
  blogPosts: [],
  schoolEvents: [],
  galleryImages: [],
  jobs: [],
  testimonials: [],
  downloads: [],
  settings: defaultSettings,
};

export type ContentCollection = Exclude<keyof typeof defaultPublicContent, "settings"> | "settings";

export const contentCollections: ContentCollection[] = [
  "heroSlides",
  "siteImages",
  "teachers",
  "classes",
  "blogPosts",
  "schoolEvents",
  "galleryImages",
  "jobs",
  "testimonials",
  "downloads",
  "settings",
];
