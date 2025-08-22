// Configuración de entornos para el proyecto Dental Lab
// Este archivo maneja las variables de entorno según el ambiente

export interface EnvironmentConfig {
  // Configuración del sitio
  site: {
    name: string
    description: string
    url: string
    debug: boolean
  }

  // Configuración de Firebase
  firebase: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket?: string
    messagingSenderId?: string
    appId?: string
  }

  // Configuración de base de datos
  database: {
    url: string
  }

  // Configuración de autenticación
  auth: {
    jwtSecret: string
  }

  // Configuración de analytics
  analytics: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
}

// Configuración por defecto para desarrollo
const developmentConfig: EnvironmentConfig = {
  site: {
    name: 'Gata Viejis Dental Lab',
    description: 'Laboratorio Dental de Excelencia',
    url: 'http://localhost:3000',
    debug: true,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dev_api_key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dev-project.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dev-project-id',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/dental_lab_dev',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
  },
}

// Configuración para staging
const stagingConfig: EnvironmentConfig = {
  site: {
    name: 'Gata Viejis Dental Lab (Staging)',
    description: 'Laboratorio Dental de Excelencia - Entorno de Pruebas',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://staging.gataviejis.com',
    debug: false,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || '',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
  },
}

// Configuración para producción
const productionConfig: EnvironmentConfig = {
  site: {
    name: 'Gata Viejis Dental Lab',
    description: 'Laboratorio Dental de Excelencia',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gataviejis.com',
    debug: false,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || '',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
  },
}

// Función para obtener la configuración según el ambiente
export function getEnvironmentConfig(): EnvironmentConfig {
  const nodeEnv = process.env.NODE_ENV || 'development'

  switch (nodeEnv) {
    case 'production':
      return productionConfig
    case 'staging':
      return stagingConfig
    case 'development':
    default:
      return developmentConfig
  }
}

// Función para validar que todas las variables requeridas estén presentes
export function validateEnvironmentConfig(): boolean {
  const config = getEnvironmentConfig()

  // Validar Firebase
  if (!config.firebase.apiKey || !config.firebase.authDomain || !config.firebase.projectId) {
    console.error('❌ Firebase configuration is incomplete')
    return false
  }

  // Validar base de datos
  if (!config.database.url) {
    console.error('❌ Database URL is missing')
    return false
  }

  // Validar JWT secret
  if (!config.auth.jwtSecret) {
    console.error('❌ JWT secret is missing')
    return false
  }

  console.log('✅ Environment configuration is valid')
  return true
}

// Exportar configuraciones individuales para uso directo
export const config = getEnvironmentConfig()
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isStaging = process.env.NODE_ENV === 'staging'
export const isProduction = process.env.NODE_ENV === 'production'
