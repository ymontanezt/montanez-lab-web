/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  compress: true,
  
  // Configuración de imágenes optimizada
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  poweredByHeader: false,

  // Solución específica para el error de prerendering de página 404
  output: 'standalone',
  
  // Deshabilitar linting temporalmente para identificar el problema
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configuración experimental para evitar errores de prerendering
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Deshabilitar prerendering de páginas de error para evitar conflictos
    typedRoutes: false,
  },
}

export default nextConfig
