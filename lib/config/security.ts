/**
 * Configuración de seguridad para Montañez Lab
 * Solo mantenemos develop y production
 */

export const securityConfig = {
  // Configuración de CORS
  cors: {
    origin: ['https://montanez-website.web.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  },

  // Configuración de Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://www.gstatic.com',
      'https://www.google.com',
      'https://firebase.googleapis.com',
      'https://firebaseinstallations.googleapis.com',
      'https://apis.google.com',
    ],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': [
      "'self'",
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://firestore.googleapis.com',
      'https://identitytoolkit.googleapis.com',
      'https://securetoken.googleapis.com',
      'https://www.googleapis.com',
      'https://www.google.com',
      'https://google.com',
      'https://firebase.googleapis.com',
      'https://firebaseinstallations.googleapis.com',
      'https://*.firebaseapp.com',
      'https://*.firebaseio.com',
      'https://*.firebase.com',
      'https://apis.google.com',
    ],
    'frame-src': [
      "'self'",
      'https://www.youtube.com',
      'https://youtube.com',
      'https://www.youtube-nocookie.com',
      'https://*.firebaseapp.com',
      'https://*.firebaseio.com',
    ],
  },

  // Configuración de rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: 'Demasiadas requests desde esta IP, intenta de nuevo más tarde.',
  },

  // Configuración de autenticación
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret_change_in_production',
    jwtExpiresIn: '24h',
    refreshTokenExpiresIn: '7d',
    bcryptRounds: 12,
  },

  // Configuración de sesiones
  session: {
    secret: process.env.SESSION_SECRET || 'default_session_secret_change_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  },

  // Configuración de headers de seguridad
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },
}

export default securityConfig
