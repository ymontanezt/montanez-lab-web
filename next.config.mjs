/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para export estático (Firebase)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Configuración de experimental features
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'framer-motion'],
  },
  
  // Configuración de react strict mode
  reactStrictMode: true,
};

export default nextConfig;
