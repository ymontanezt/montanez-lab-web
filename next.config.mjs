/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para export estático (Firebase)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configuración de webpack para optimización
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones solo para producción
    if (!dev && !isServer) {
      // Optimizar bundle
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Configuración de experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'framer-motion'],
  },
  
  // Configuración de compresión
  compress: true,
  
  // Configuración de powered by
  poweredByHeader: false,
  
  // Configuración de react strict mode
  reactStrictMode: true,
  
  // Configuración de swc minify
  swcMinify: true,
};

export default nextConfig;
