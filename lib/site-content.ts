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
  email: "info@creativeallstarsacademy.sc.ke",
  phone: "+254724838674",
  address: "Ngata, Nakuru City, Kenya",
  officeHours: "Monday - Friday: 7:30 AM - 5:00 PM | Saturday: 8:00 AM - 12:00 PM",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  theme: "light" as "light" | "dark",
  galleryEyebrow: "Life at CASA",
  galleryTitle: "Real moments. Growing confidence. Lasting memories.",
  galleryDescription: "Step into the learning, friendships, celebrations and activities that make every school day meaningful.",
  gallerySectionTitle: "Nurturing Creative Stars In Action",
  gallerySectionSubtitle: "A complete gallery of our Ngata, Nakuru campus classrooms, sport galas, and children activities.",
  galleryBadge: "CAMPUS LIFE SHOTS",
  galleryModalDescription: "Captured at our Ngata campus as part of daily school life at Creative All Stars Academy.",
  galleryCategories: ["School Events", "Sports", "Graduation", "Trips", "Learning", "Campus"],
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
