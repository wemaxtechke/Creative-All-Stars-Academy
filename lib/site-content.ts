import {
  teachers,
  blogPosts,
  schoolEvents,
  galleryImages,
  jobs,
  testimonials,
  downloads,
} from "@/data/mockData";

export const defaultSettings = {
  schoolName: "Creative All Stars Academy",
  logoText: "CASA",
  tagline: "Endeavour to Succeed",
  email: "info@creativeallstars.ac.ke",
  phone: "+254 712 345 678",
  address: "Milimani Area, Nakuru City, Kenya",
  officeHours: "Monday - Friday: 7:30 AM - 5:00 PM | Saturday: 8:00 AM - 12:00 PM",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  theme: "light" as "light" | "dark",
};

export const defaultPublicContent = {
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
