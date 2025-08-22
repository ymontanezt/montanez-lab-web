// Environment configuration
// Centralized configuration using environment variables

export const env = {
  // Site information
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Gata viejis',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Laboratorio Dental',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dentallabpro.com',
    ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.jpg',
  },

  // Company information
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Gata viejis',
    legalName: process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || 'Gata viejis S.A.C.',
    founded: parseInt(process.env.NEXT_PUBLIC_COMPANY_FOUNDED || '2008'),
    industry: process.env.NEXT_PUBLIC_COMPANY_INDUSTRY || 'Odontología y Laboratorio Dental',
    type: process.env.NEXT_PUBLIC_COMPANY_TYPE || 'Privada',
    size: process.env.NEXT_PUBLIC_COMPANY_SIZE || '10-50 empleados',
  },

  // Contact information
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+51 1 234 5678',
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '+51 1 234 5678',
    emergency: process.env.NEXT_PUBLIC_CONTACT_EMERGENCY || '+51 1 999 8888',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@dentallabpro.com',
    adminEmail: process.env.NEXT_PUBLIC_CONTACT_ADMIN_EMAIL || 'admin@dentallabpro.com',
    urgencyEmail: process.env.NEXT_PUBLIC_CONTACT_URGENCY_EMAIL || 'urgencias@dentallabpro.com',

    address: {
      street: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_STREET || 'Av. Javier Prado Este 1234',
      city: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_CITY || 'Lima',
      state: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_STATE || 'Lima',
      zipCode: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_ZIPCODE || '15001',
      country: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY || 'Perú',
      coordinates: {
        lat: parseFloat(process.env.NEXT_PUBLIC_CONTACT_ADDRESS_LAT || '-12.0464'),
        lng: parseFloat(process.env.NEXT_PUBLIC_CONTACT_ADDRESS_LNG || '-77.0428'),
      },
    },

    hours: {
      monday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_MONDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_MONDAY_OPEN || '08:00',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_MONDAY_CLOSE || '20:00',
      },
      tuesday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_TUESDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_TUESDAY_OPEN || '08:00',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_TUESDAY_CLOSE || '20:00',
      },
      wednesday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_WEDNESDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_WEDNESDAY_OPEN || '08:00',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_WEDNESDAY_CLOSE || '20:00',
      },
      thursday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_THURSDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_THURSDAY_OPEN || '08:00',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_THURSDAY_CLOSE || '20:00',
      },
      friday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_FRIDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_FRIDAY_OPEN || '08:00',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_FRIDAY_CLOSE || '20:00',
      },
      saturday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_SATURDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_SATURDAY_OPEN || '09:00',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_SATURDAY_CLOSE || '14:00',
      },
      sunday: {
        isOpen: process.env.NEXT_PUBLIC_CONTACT_HOURS_SUNDAY_OPEN !== 'closed',
        openTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_SUNDAY_OPEN || 'closed',
        closeTime: process.env.NEXT_PUBLIC_CONTACT_HOURS_SUNDAY_CLOSE || 'closed',
      },
      emergency: process.env.NEXT_PUBLIC_CONTACT_HOURS_EMERGENCY || '24/7',
    },
  },

  // Social media
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || 'https://facebook.com/dentallabpro',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || 'https://instagram.com/dentallabpro',
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || 'https://twitter.com/dentallabpro',
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || 'https://linkedin.com/company/dentallabpro',
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || 'https://youtube.com/dentallabpro',
    whatsapp: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP || 'https://wa.me/51912345678',
  },

  // WhatsApp configuration
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51912345678',
    messageDefault:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE_DEFAULT ||
      'Hola, me gustaría obtener más información sobre sus servicios dentales.',
  },

  // Google services
  google: {
    analytics: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
    tagManager: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX',
    mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  },

  // Firebase configuration
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  },

  // Email configuration
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@dentallabpro.com',
  },

  // Performance configuration
  performance: {
    imageOptimization: process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION_ENABLED === 'true',
    lazyLoading: process.env.NEXT_PUBLIC_LAZY_LOADING_ENABLED === 'true',
    preloadCritical: process.env.NEXT_PUBLIC_PRELOAD_CRITICAL_ENABLED === 'true',
    cacheStrategy: process.env.NEXT_PUBLIC_CACHE_STRATEGY || 'stale-while-revalidate',
  },

  // Accessibility configuration
  accessibility: {
    enabled: process.env.NEXT_PUBLIC_ACCESSIBILITY_ENABLED === 'true',
    compliance: process.env.NEXT_PUBLIC_ACCESSIBILITY_COMPLIANCE || 'WCAG 2.1 AA',
  },

  // Content configuration
  content: {
    blog: {
      enabled: process.env.NEXT_PUBLIC_BLOG_ENABLED === 'true',
      postsPerPage: parseInt(process.env.NEXT_PUBLIC_BLOG_POSTS_PER_PAGE || '6'),
    },
    testimonials: {
      enabled: process.env.NEXT_PUBLIC_TESTIMONIALS_ENABLED === 'true',
      maxDisplayed: parseInt(process.env.NEXT_PUBLIC_TESTIMONIALS_MAX_DISPLAYED || '6'),
      autoRotate: process.env.NEXT_PUBLIC_TESTIMONIALS_AUTO_ROTATE === 'true',
      rotationInterval: parseInt(process.env.NEXT_PUBLIC_TESTIMONIALS_ROTATION_INTERVAL || '8000'),
    },
    gallery: {
      enabled: process.env.NEXT_PUBLIC_GALLERY_ENABLED === 'true',
      categories: process.env.NEXT_PUBLIC_GALLERY_CATEGORIES_ENABLED === 'true',
      tags: process.env.NEXT_PUBLIC_GALLERY_TAGS_ENABLED === 'true',
      search: process.env.NEXT_PUBLIC_GALLERY_SEARCH_ENABLED === 'true',
    },
  },

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  productionUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://dentallabpro.com',
} as const

// Helper functions
export const getContactInfo = () => env.contact
export const getSocialLinks = () => env.social
export const getWhatsAppConfig = () => env.whatsapp
export const getGoogleConfig = () => env.google
export const getFirebaseConfig = () => env.firebase
export const getEmailConfig = () => env.email
export const getPerformanceConfig = () => env.performance
export const getAccessibilityConfig = () => env.accessibility
export const getContentConfig = () => env.content

// Type exports
export type EnvConfig = typeof env
export type ContactInfo = typeof env.contact
export type SocialLinks = typeof env.social
export type WhatsAppConfig = typeof env.whatsapp
export type GoogleConfig = typeof env.google
export type FirebaseConfig = typeof env.firebase
export type EmailConfig = typeof env.email
export type PerformanceConfig = typeof env.performance
export type AccessibilityConfig = typeof env.accessibility
export type ContentConfig = typeof env.content
