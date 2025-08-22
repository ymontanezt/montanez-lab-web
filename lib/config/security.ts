// Security configuration
// Centralized security settings for the application

export const securityConfig = {
  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-eval'", // Required for Next.js
      "'unsafe-inline'", // Required for Next.js
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://ssl.google-analytics.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      'https://fonts.googleapis.com',
    ],
    'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'connect-src': [
      "'self'",
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://www.googletagmanager.com',
      'https://firestore.googleapis.com',
      'https://identitytoolkit.googleapis.com',
    ],
    'frame-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
  },

  // Headers de seguridad
  securityHeaders: {
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },

  // Configuración de rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: 'Demasiadas requests desde esta IP, intenta nuevamente más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Configuración de CORS
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://dentallabpro.com', 'https://www.dentallabpro.com']
        : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 horas
  },

  // Configuración de autenticación
  auth: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutos
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutos
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
  },

  // Configuración de validación
  validation: {
    maxInputLength: 1000,
    allowedFileTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    sanitizeHtml: true,
    preventSqlInjection: true,
    preventXss: true,
  },

  // Configuración de logging
  logging: {
    enabled: true,
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    logSecurityEvents: true,
    logUserActions: true,
    logErrors: true,
    retentionDays: 90,
  },

  // Configuración de monitoreo
  monitoring: {
    enabled: true,
    trackFailedLogins: true,
    trackSuspiciousActivity: true,
    alertOnSecurityBreach: true,
    metricsCollection: true,
  },
} as const

// Helper functions
export const getCSPString = () => {
  return Object.entries(securityConfig.csp)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
}

export const getSecurityHeaders = () => securityConfig.securityHeaders
export const getRateLimitConfig = () => securityConfig.rateLimit
export const getCorsConfig = () => securityConfig.cors
export const getAuthConfig = () => securityConfig.auth
export const getValidationConfig = () => securityConfig.validation
export const getLoggingConfig = () => securityConfig.logging
export const getMonitoringConfig = () => securityConfig.monitoring

// Type exports
export type SecurityConfig = typeof securityConfig
export type CSPConfig = typeof securityConfig.csp
export type SecurityHeaders = typeof securityConfig.securityHeaders
export type RateLimitConfig = typeof securityConfig.rateLimit
export type CorsConfig = typeof securityConfig.cors
export type AuthConfig = typeof securityConfig.auth
export type ValidationConfig = typeof securityConfig.validation
export type LoggingConfig = typeof securityConfig.logging
export type MonitoringConfig = typeof securityConfig.monitoring
