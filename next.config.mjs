/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para export estático (Firebase)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
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
    optimizePackageImports: ['@radix-ui/react-icons', 'framer-motion'],
  },
  
  // Configuración de react strict mode
  reactStrictMode: true,
};

export default nextConfig;
