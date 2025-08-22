/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  compress: true,
  
  // Configuración de imágenes para export estático
  images: {
    unoptimized: true, // Deshabilitar optimización para export estático
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  poweredByHeader: false,

  // Configuración para export estático (Firebase Hosting)
  output: 'export',
  
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

module.exports = withBundleAnalyzer(nextConfig)
