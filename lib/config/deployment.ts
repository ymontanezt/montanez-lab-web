// Deployment configuration
// Centralized deployment settings for different environments

export const deploymentConfig = {
  // Entorno de desarrollo
  development: {
    name: 'Development',
    url: 'http://localhost:3001',
    apiUrl: 'http://localhost:3001/api',
    environment: 'development',
    debug: true,
    logging: 'verbose',
    cache: false,
    compression: false,
    security: {
      strict: false,
      csp: false,
      hsts: false,
    },
    performance: {
      minify: false,
      bundleAnalyzer: true,
      sourceMaps: true,
    },
  },

  // Entorno de staging
  staging: {
    name: 'Staging',
    url: 'https://staging.montanez-website.web.app',
    apiUrl: 'https://staging.montanez-website.web.app/api',
    environment: 'staging',
    debug: true,
    logging: 'info',
    cache: true,
    compression: true,
    security: {
      strict: true,
      csp: true,
      hsts: true,
    },
    performance: {
      minify: true,
      bundleAnalyzer: false,
      sourceMaps: false,
    },
  },

  // Entorno de producción
  production: {
    name: 'Production',
    url: 'https://montanez-website.web.app',
    apiUrl: 'https://montanez-website.web.app/api',
    environment: 'production',
    debug: false,
    logging: 'warn',
    cache: true,
    compression: true,
    security: {
      strict: true,
      csp: true,
      hsts: true,
    },
    performance: {
      minify: true,
      bundleAnalyzer: false,
      sourceMaps: false,
    },
  },

  // Configuración de CDN
  cdn: {
    enabled: process.env.NODE_ENV === 'production',
    domain: 'https://cdn.montanez-website.web.app',
    images: true,
    static: true,
    fonts: true,
    cache: {
      maxAge: 60 * 60 * 24 * 365, // 1 año
      staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 días
    },
  },

  // Configuración de monitoreo
  monitoring: {
    enabled: process.env.NODE_ENV === 'production',
    services: {
      sentry: true,
      logRocket: false,
      hotjar: true,
      googleAnalytics: true,
      googleTagManager: true,
    },
    alerts: {
      errorRate: 0.01, // 1%
      responseTime: 2000, // 2 segundos
      availability: 0.999, // 99.9%
    },
  },

  // Configuración de backup
  backup: {
    enabled: process.env.NODE_ENV === 'production',
    frequency: 'daily',
    retention: 30, // días
    storage: 's3',
    encryption: true,
  },

  // Configuración de SSL/TLS
  ssl: {
    enabled: process.env.NODE_ENV !== 'development',
    certificate: 'lets-encrypt',
    redirect: true,
    hsts: true,
    ocsp: true,
  },

  // Configuración de compresión
  compression: {
    enabled: process.env.NODE_ENV !== 'development',
    algorithm: 'gzip',
    level: 6,
    threshold: 1024,
    filter: (req: any, res: any) => {
      if (req.headers['x-no-compression']) {
        return false
      }
      return true
    },
  },

  // Configuración de cache
  cache: {
    enabled: process.env.NODE_ENV !== 'development',
    strategy: 'stale-while-revalidate',
    maxAge: 60 * 60 * 24 * 30, // 30 días
    staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 días
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      Vary: 'Accept-Encoding',
    },
  },

  // Configuración de rate limiting
  rateLimit: {
    enabled: process.env.NODE_ENV === 'production',
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: 'Demasiadas requests desde esta IP, intenta nuevamente más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Configuración de CORS
  cors: {
    enabled: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://montanez-website.web.app', 'https://www.montanez-website.web.app']
        : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 horas
  },
} as const

// Helper functions
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return deploymentConfig[env as keyof typeof deploymentConfig] || deploymentConfig.development
}

export const getCDNConfig = () => deploymentConfig.cdn
export const getMonitoringConfig = () => deploymentConfig.monitoring
export const getBackupConfig = () => deploymentConfig.backup
export const getSSLConfig = () => deploymentConfig.ssl
export const getCompressionConfig = () => deploymentConfig.compression
export const getCacheConfig = () => deploymentConfig.cache
export const getRateLimitConfig = () => deploymentConfig.rateLimit
export const getCorsConfig = () => deploymentConfig.cors

// Type exports
export type DeploymentConfig = typeof deploymentConfig
export type EnvironmentConfig = typeof deploymentConfig.development
export type CDNConfig = typeof deploymentConfig.cdn
export type MonitoringConfig = typeof deploymentConfig.monitoring
export type BackupConfig = typeof deploymentConfig.backup
export type SSLConfig = typeof deploymentConfig.ssl
export type CompressionConfig = typeof deploymentConfig.compression
export type CacheConfig = typeof deploymentConfig.cache
export type RateLimitConfig = typeof deploymentConfig.rateLimit
export type CorsConfig = typeof deploymentConfig.cors
