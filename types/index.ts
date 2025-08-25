// Centralized TypeScript types for the application
// Replaces JSON files with type-safe interfaces

// Base types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Service types
export interface Service extends BaseEntity {
  slug: string
  title: string
  subtitle: string
  description: string
  shortDescription: string
  image: string
  icon: ServiceIcon
  color: ServiceColor
  features: string[]
  benefits: string[]
  process: ProcessStep[]
  testimonial: ServiceTestimonial
  price: string
  duration: string
  category: ServiceCategory
  isActive: boolean
  order: number
}

export type ServiceIcon =
  | 'Microscope'
  | 'Shield'
  | 'Zap'
  | 'Award'
  | 'Users'
  | 'Clock'
  | 'Heart'
  | 'Star'
  | 'Target'
  | 'TrendingUp'

export type ServiceColor =
  | 'bg-blue-500'
  | 'bg-green-500'
  | 'bg-purple-500'
  | 'bg-pink-500'
  | 'bg-orange-500'
  | 'bg-red-500'
  | 'bg-indigo-500'
  | 'bg-teal-500'

export type ServiceCategory =
  | 'prosthetics'
  | 'implantology'
  | 'orthodontics'
  | 'aesthetics'
  | 'pediatrics'
  | 'emergency'
  | 'prevention'
  | 'surgery'

export interface ProcessStep {
  step: string
  title: string
  description: string
  icon?: string
  duration?: string
}

export interface ServiceTestimonial {
  text: string
  author: string
  role: string
  rating?: number
  clinic?: string
}

// Team member types
export interface TeamMember extends BaseEntity {
  name: string
  role: string
  specialty: string
  experience: string
  image: string
  bio: string
  certifications: string[]
  education: Education[]
  languages: string[]
  isActive: boolean
  order: number
}

export interface Education {
  degree: string
  institution: string
  year: number
  country: string
}

// Testimonial types
export interface Testimonial extends BaseEntity {
  text: string
  name: string
  role: string
  clinic: string
  image: string
  rating: number
  service?: string
  isVerified: boolean
  isActive: boolean
  order: number
}

// Gallery types
export interface GalleryImage extends BaseEntity {
  title: string
  description: string
  src: string
  alt: string
  category: GalleryCategory
  tags: string[]
  width: number
  height: number
  isActive: boolean
  order: number
}

export type GalleryCategory =
  | 'prosthetics'
  | 'implants'
  | 'orthodontics'
  | 'aesthetics'
  | 'before-after'
  | 'laboratory'
  | 'equipment'

// Hero slide types
export interface HeroSlide extends BaseEntity {
  title: string
  subtitle: string
  description: string
  cta: string
  image: string
  alt: string
  stats?: Record<string, string>
  isActive: boolean
  order: number
}

// Contact types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  preferredContact: 'email' | 'phone'
  urgency: 'low' | 'medium' | 'high'
  isNewsletterSubscribed: boolean
}

export interface ContactInfo {
  phone: string
  email: string
  address: Address
  hours: BusinessHours
  socialMedia: SocialMedia
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface BusinessHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
  emergency: string
}

export interface DaySchedule {
  isOpen: boolean
  openTime?: string
  closeTime?: string
  isLunchBreak?: boolean
  lunchStart?: string
  lunchEnd?: string
}

export interface SocialMedia {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  whatsapp: string
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  href: string
  isExternal?: boolean
  children?: NavigationItem[]
  isActive?: boolean
  order: number
}

// Page metadata types
export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
  code?: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  errors?: ValidationError[]
  message?: string
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Search types
export interface SearchParams {
  query: string
  category?: string
  tags?: string[]
  priceRange?: {
    min: number
    max: number
  }
  location?: string
}

// Analytics types
export interface AnalyticsEvent {
  name: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp: Date
  userId?: string
  sessionId?: string
}

// Theme types
export type Theme = 'light' | 'dark'

// Accessibility types
export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large'
  contrast: 'normal' | 'high'
  motion: 'normal' | 'reduced'
  sound: 'normal' | 'muted'
}
