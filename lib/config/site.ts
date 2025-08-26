// Site configuration
// Centralized configuration for the entire application

import { env } from './env'

export const siteConfig = {
  // Basic site information
  name: env.site.name,
  description: env.site.description,
  url: env.site.url,
  ogImage: env.site.ogImage,

  // Company information
  company: {
    name: env.company.name,
    legalName: env.company.legalName,
    founded: env.company.founded,
    industry: env.company.industry,
    type: env.company.type,
    size: env.company.size,
    website: env.site.url,
    email: env.contact.email,
    phone: env.contact.phone,
    whatsapp: env.contact.whatsapp,
  },

  // Contact information
  contact: {
    phone: env.contact.phone,
    whatsapp: env.contact.whatsapp,
    email: env.contact.email,
    emergency: env.contact.emergency,
    address: env.contact.address,
    hours: env.contact.hours,
  },

  // Social media
  social: env.social,

  // Services
  services: {
    categories: [
      'prosthetics',
      'implantology',
      'orthodontics',
      'aesthetics',
      'pediatrics',
      'emergency',
    ],
    featured: ['protesis-digitales', 'implantologia-avanzada', 'ortodoncia-personalizada'],
  },

  // Navigation
  navigation: {
    main: [
      { id: 'inicio', label: 'Inicio', href: '#inicio' },
      { id: 'servicios', label: 'Servicios', href: '#servicios' },
      { id: 'citas', label: 'Citas', href: '#citas' },
      { id: 'galeria', label: 'Galería', href: '#galeria' },
      { id: 'testimonios', label: 'Testimonios', href: '#testimonios' },
      { id: 'team', label: 'Equipo', href: '#team' },
    ],
    footer: [
      { label: 'Servicios', href: '/servicios' },
      { label: 'Sobre Nosotros', href: '/nosotros' },
      { label: 'Galería', href: '/galeria' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },

  // SEO and metadata
  seo: {
    defaultTitle: `${env.company.name} - Laboratorio Dental de Vanguardia`,
    titleTemplate: `%s | ${env.company.name}`,
    defaultDescription:
      'Laboratorio dental moderno con tecnología CAD/CAM de última generación. Prótesis, implantes y tratamientos estéticos de alta calidad.',
    keywords: [
      'laboratorio dental',
      'prótesis dentales',
      'implantes dentales',
      'ortodoncia',
      'estética dental',
      'tecnología CAD/CAM',
      'odontología digital',
      `laboratorio dental ${env.contact.address.country}`,
      'prótesis digitales',
      'implantes 3D',
    ],
    openGraph: {
      type: 'website',
      locale: 'es_PE',
      siteName: env.company.name,
    },
    twitter: {
      handle: '@montanez-lab',
      site: '@montanez-lab',
      cardType: 'summary_large_image',
    },
  },

  // Features and capabilities
  features: {
    technology: [
      'CAD/CAM de última generación',
      'Escáneres 3D intraorales',
      'Fresadoras CNC de precisión',
      'Software de planificación 3D',
      'Materiales premium certificados',
    ],
    certifications: ['ISO 13485:2016', 'FDA Approval', 'CE Marking', 'Certificación DIGEMID'],
    guarantees: [
      'Garantía de 5 años en prótesis',
      'Garantía de por vida en implantes',
      'Satisfacción garantizada',
      'Reposición gratuita si es necesario',
    ],
  },

  // Statistics and achievements
  stats: {
    yearsExperience: 15,
    casesCompleted: 10000,
    satisfactionRate: 98,
    teamMembers: 25,
    technologies: 10,
    certifications: 8,
  },

  // Content settings
  content: env.content,

  // Performance and optimization
  performance: env.performance,

  // Accessibility
  accessibility: env.accessibility,
} as const

// Helper functions
export const getContactInfo = () => siteConfig.contact
export const getSocialLinks = () => siteConfig.social
export const getNavigation = () => siteConfig.navigation
export const getSEOConfig = () => siteConfig.seo
export const getFeatures = () => siteConfig.features
export const getStats = () => siteConfig.stats

// Type exports
export type SiteConfig = typeof siteConfig
export type ContactInfo = typeof siteConfig.contact
export type SocialLinks = typeof siteConfig.social
export type Navigation = typeof siteConfig.navigation
export type SEOConfig = typeof siteConfig.seo
