import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Headers de seguridad
  const securityHeaders = {
    // Protección XSS
    'X-XSS-Protection': '1; mode=block',

    // Prevenir clickjacking
    'X-Frame-Options': 'DENY',

    // Prevenir MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://www.google.com https://firebase.googleapis.com https://firebaseinstallations.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://www.google.com https://google.com https://firebase.googleapis.com https://firebaseinstallations.googleapis.com https://*.firebaseapp.com https://*.firebaseio.com https://*.firebase.com",
      "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
      "media-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),

    // Permissions Policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

    // HSTS (HTTP Strict Transport Security)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

    // Cache Control para recursos estáticos
    'Cache-Control':
      request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/api/') ||
      request.nextUrl.pathname.includes('.')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=0, must-revalidate',
  }

  // Aplicar headers de seguridad
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Headers específicos para APIs
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  // Headers para imágenes y assets
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Vary', 'Accept-Encoding')
  }

  // Headers para HTML
  if (request.nextUrl.pathname.endsWith('.html') || request.nextUrl.pathname === '/') {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
    response.headers.set('Vary', 'Accept-Encoding')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
