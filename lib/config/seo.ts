// SEO configuration
// Centralized SEO settings for the application

export const seoConfig = {
  // Configuración básica del sitio
  site: {
    name: 'Montañez Lab - Laboratorio Dental',
    description:
      'Laboratorio dental profesional en Huancayo, Perú con tecnología CAD/CAM avanzada. Prótesis dentales, coronas, implantes y servicios especializados con 15+ años de experiencia.',
    url: 'https://dentallabpro.com',
    language: 'es-PE',
    locale: 'es_PE',
    type: 'website',
    image: '/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    twitterHandle: '@dentallabpro',
    facebookAppId: '',
  },

  // Configuración de meta tags
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    googlebot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    bingbot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    author: 'Montañez Lab',
    generator: 'Next.js',
    themeColor: '#22c55e',
    msapplicationTileColor: '#22c55e',
    appleMobileWebAppTitle: 'Montañez Lab',
    applicationName: 'Montañez Lab',
    formatDetection: 'telephone=yes',
    mobileWebAppCapable: 'yes',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
  },

  // Configuración de Open Graph
  openGraph: {
    enabled: true,
    type: 'website',
    siteName: 'Montañez Lab - Laboratorio Dental',
    title: 'Montañez Lab - Laboratorio Dental de Vanguardia',
    description:
      'Laboratorio dental profesional en Huancayo, Perú con tecnología CAD/CAM avanzada. Prótesis, implantes y tratamientos estéticos de alta calidad.',
    url: 'https://dentallabpro.com',
    image: '/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    locale: 'es_PE',
    alternateLocales: ['es', 'en'],
  },

  // Configuración de Twitter Card
  twitter: {
    enabled: true,
    card: 'summary_large_image',
    site: '@dentallabpro',
    creator: '@dentallabpro',
    title: 'Montañez Lab - Laboratorio Dental de Vanguardia',
    description:
      'Laboratorio dental profesional en Huancayo, Perú con tecnología CAD/CAM avanzada.',
    image: '/og-image.jpg',
    imageAlt: 'Montañez Lab - Laboratorio Dental Moderno',
  },

  // Configuración de JSON-LD
  jsonLd: {
    enabled: true,
    organization: {
      '@type': 'DentalClinic',
      name: 'Montañez Lab',
      legalName: 'Montañez Lab S.A.C.',
      description: 'Laboratorio dental profesional con tecnología CAD/CAM avanzada',
      url: 'https://dentallabpro.com',
      logo: 'https://dentallabpro.com/logo.png',
      image: 'https://dentallabpro.com/og-image.jpg',
      telephone: '+51 1 234 5678',
      email: 'info@dentallabpro.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Javier Prado Este 1234',
        addressLocality: 'Huancayo',
        addressRegion: 'Junín',
        postalCode: '15001',
        addressCountry: 'PE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -12.0464,
        longitude: -77.0428,
      },
      openingHours: ['Mo-Fr 08:00-20:00', 'Sa 09:00-14:00'],
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
      currenciesAccepted: 'PEN',
      areaServed: 'Huancayo',
      serviceArea: ['Huancayo', 'Chupaca', 'Jauja', 'Concepción'],
      medicalSpecialty: [
        'Prosthodontics',
        'Dental Implantology',
        'Cosmetic Dentistry',
        'Orthodontics',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Colegio Odontológico del Perú',
          },
        },
      ],
      sameAs: [
        'https://www.facebook.com/dentallabpro',
        'https://www.instagram.com/dentallab_pro',
        'https://www.linkedin.com/company/dentallabpro',
      ],
    },
    website: {
      '@type': 'WebSite',
      url: 'https://dentallabpro.com',
      name: 'Montañez Lab',
      description: 'Laboratorio dental profesional con tecnología avanzada',
      publisher: {
        '@id': 'https://dentallabpro.com/#organization',
      },
      inLanguage: 'es-PE',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://dentallabpro.com/buscar?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    services: [
      {
        '@type': 'Service',
        name: 'Prótesis Dentales Digitales',
        provider: {
          '@id': 'https://dentallabpro.com/#organization',
        },
        description:
          'Fabricación de prótesis dentales utilizando tecnología CAD/CAM de última generación',
        serviceType: 'Dental Prosthetics',
        areaServed: 'Huancayo',
      },
      {
        '@type': 'Service',
        name: 'Implantología Dental',
        provider: {
          '@id': 'https://dentallabpro.com/#organization',
        },
        description:
          'Servicios especializados en implantes dentales con materiales de alta calidad',
        serviceType: 'Dental Implantology',
        areaServed: 'Huancayo',
      },
    ],
  },

  // Configuración de sitemap
  sitemap: {
    enabled: true,
    url: 'https://dentallabpro.com/sitemap.xml',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    exclude: ['/admin', '/api', '/_next', '/private'],
  },

  // Configuración de robots.txt
  robots: {
    enabled: true,
    userAgent: '*',
    allow: ['/'],
    disallow: ['/api/', '/admin/', '/_next/', '/private/'],
    sitemap: 'https://dentallabpropro.com/sitemap.xml',
    host: 'https://dentallabpro.com',
    crawlDelay: 1,
  },

  // Configuración de keywords
  keywords: [
    'laboratorio dental',
    'prótesis dentales',
    'implantes dentales',
    'ortodoncia',
    'estética dental',
    'tecnología CAD/CAM',
    'odontología digital',
    'laboratorio dental Perú',
    'prótesis digitales',
    'implantes 3D',
    'coronas dentales',
    'puentes dentales',
    'carillas dentales',
    'blanqueamiento dental',
    'endodoncia',
    'cirugía dental',
    'odontopediatría',
    'urgencias dentales',
    'Huancayo',
    'Perú',
  ],

  // Configuración de canonical URLs
  canonical: {
    enabled: true,
    baseUrl: 'https://dentallabpro.com',
    trailingSlash: false,
    www: false,
    https: true,
  },

  // Configuración de hreflang
  hreflang: {
    enabled: true,
    default: 'es-PE',
    languages: [
      { code: 'es-PE', url: 'https://dentallabpro.com' },
      { code: 'es', url: 'https://dentallabpro.com/es' },
      { code: 'en', url: 'https://dentallabpro.com/en' },
    ],
  },

  // Configuración de performance
  performance: {
    preload: true,
    prefetch: true,
    preconnect: true,
    dnsPrefetch: true,
    criticalCSS: true,
    criticalJS: true,
    imageOptimization: true,
    lazyLoading: true,
  },
} as const

// Helper functions
export const getSiteConfig = () => seoConfig.site
export const getMetaConfig = () => seoConfig.meta
export const getOpenGraphConfig = () => seoConfig.openGraph
export const getTwitterConfig = () => seoConfig.twitter
export const getJsonLdConfig = () => seoConfig.jsonLd
export const getSitemapConfig = () => seoConfig.sitemap
export const getRobotsConfig = () => seoConfig.robots
export const getKeywordsConfig = () => seoConfig.keywords
export const getCanonicalConfig = () => seoConfig.canonical
export const getHreflangConfig = () => seoConfig.hreflang
export const getPerformanceConfig = () => seoConfig.performance

// Type exports
export type SEOConfig = typeof seoConfig
export type SiteConfig = typeof seoConfig.site
export type MetaConfig = typeof seoConfig.meta
export type OpenGraphConfig = typeof seoConfig.openGraph
export type TwitterConfig = typeof seoConfig.twitter
export type JsonLdConfig = typeof seoConfig.jsonLd
export type SitemapConfig = typeof seoConfig.sitemap
export type RobotsConfig = typeof seoConfig.robots
export type KeywordsConfig = typeof seoConfig.keywords
export type CanonicalConfig = typeof seoConfig.canonical
export type HreflangConfig = typeof seoConfig.hreflang
export type PerformanceConfig = typeof seoConfig.performance
