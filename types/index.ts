export interface Student {
  id: string;
  name: string;
  classId: string;
  admissionNo: string;
  parentName: string;
  parentPhone: string;
  status: 'Active' | 'Inactive';
}

export interface Teacher {
  id: string;
  mediaId?: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  subjects?: string[];
  email: string;
}

export interface BlogPost {
  id: string;
  mediaId?: string;
  title: string;
  summary: string;
  content: string;
  featuredImage: string;
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  readTime: string;
  popular?: boolean;
}

export interface SchoolEvent {
  id: string;
  mediaId?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Sports' | 'Academic' | 'Arts' | 'Community' | 'Trip';
  image?: string;
}

export interface GalleryImage {
  id: string;
  mediaId?: string;
  url: string;
  title: string;
  alt?: string;
  category: string;
  date: string;
  order?: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  responsibilities: string[];
  requirements: string[];
  deadline: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Hired';
  dateApplied: string;
}

export interface Testimonial {
  id: string;
  mediaId?: string;
  name: string;
  role: 'Parent' | 'Alumni' | 'Student';
  content: string;
  avatar: string;
  rating: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  mediaId: string;
  image: string;
  alt: string;
  kicker?: string;
  title?: string;
  description?: string;
  primary?: string;
  primaryHref?: string;
}

export interface SiteImage {
  id: string;
  mediaId: string;
  url: string;
  alt: string;
  label?: string;
}

export interface DownloadItem {
  id: string;
  mediaId?: string;
  title: string;
  category: 'Admission' | 'Calendar' | 'Assignment' | 'Policy' | 'Uniform';
  fileSize: string;
  fileType: string;
  url: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Admissions' | 'Academics' | 'Fees' | 'Parents';
}

export interface SchoolStats {
  students: number;
  teachers: number;
  classrooms: number;
  curriculum: string;
  founded: number;
}

export interface Leadership {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  learningOutcomes: string[];
}

export interface CoCurricularActivity {
  id: string;
  name: string;
  description: string;
  image: string;
  schedule: string;
  instructor: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  gradeApplied: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  dateSubmitted: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Archived';
  dateSubmitted: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  ageGroup: string;
  description: string;
  teacherId?: string;
  subjects: string[];
  activities: string[];
  gallery?: string[];
  image?: string;
}
