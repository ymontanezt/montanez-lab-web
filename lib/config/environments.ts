/**
 * Configuración de entornos para el proyecto Montañez Lab
 * Solo mantenemos develop y production
 */

export interface Environment {
  name: string
  description: string
  url: string
  debug: boolean
  database: {
    name: string
    url: string
  }
  firebase: {
    projectId: string
    apiKey: string
    authDomain: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
}

export const environments: Record<string, Environment> = {
  development: {
    name: 'Montañez Lab (Desarrollo)',
    description: 'Laboratorio Dental de Excelencia - Entorno de Desarrollo',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    debug: true,
    database: {
      name: 'montanez_lab_dev',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/montanez_lab_dev',
    },
    firebase: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'montanez-website',
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
      authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'montanez-website.firebaseapp.com',
      storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'montanez-website.appspot.com',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
    },
  },
  production: {
    name: 'Montañez Lab',
    description: 'Laboratorio Dental de Excelencia',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://montanez-website.web.app',
    debug: false,
    database: {
      name: 'montanez_lab_prod',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/montanez_lab_prod',
    },
    firebase: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'montanez-website',
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
      authDomain:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'montanez-website.firebaseapp.com',
      storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'montanez-website.appspot.com',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
    },
  },
}

export const getCurrentEnvironment = (): Environment => {
  const env = process.env.NODE_ENV || 'development'
  return environments[env] || environments.development
}

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}
