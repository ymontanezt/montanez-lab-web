// Configuraciones de rendimiento para la aplicación

export const performanceConfig = {
  // Configuración de lazy loading
  lazyLoading: {
    // Umbral para cargar componentes cuando están cerca del viewport
    threshold: 0.1,
    // Margen para precargar componentes
    rootMargin: '50px',
  },

  // Configuración de animaciones
  animations: {
    // Duración mínima para animaciones
    minDuration: 300,
    // Duración máxima para animaciones
    maxDuration: 800,
    // Reducir animaciones en dispositivos con preferencia de movimiento reducido
    respectMotionPreference: true,
  },

  // Configuración de imágenes
  images: {
    // Tamaño máximo de imagen antes de comprimir
    maxSize: 1024 * 1024, // 1MB
    // Formatos preferidos para optimización
    preferredFormats: ['webp', 'avif'],
    // Calidad de compresión
    quality: 85,
  },

  // Configuración de caché
  cache: {
    // Tiempo de vida del caché para páginas estáticas
    staticPages: 60 * 60 * 24 * 30, // 30 días
    // Tiempo de vida del caché para datos dinámicos
    dynamicData: 60 * 60, // 1 hora
    // Tiempo de vida del caché para imágenes
    images: 60 * 60 * 24 * 7, // 7 días
  },

  // Configuración de preload
  preload: {
    // Precargar páginas de servicios críticas
    criticalServices: ['protesis-digitales', 'implantologia-avanzada'],
    // Precargar recursos críticos
    criticalResources: ['/modern-dental-lab.png', '/dental-scanner-workflow.png'],
  },

  // Configuración de compresión
  compression: {
    // Nivel de compresión para archivos estáticos
    level: 6,
    // Tamaño mínimo para comprimir
    threshold: 1024, // 1KB
  },
}

// Función para verificar si el dispositivo prefiere movimiento reducido
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Función para obtener la duración de animación optimizada
export const getOptimizedAnimationDuration = (baseDuration: number): number => {
  if (prefersReducedMotion()) {
    return Math.min(baseDuration * 0.5, performanceConfig.animations.minDuration)
  }
  return Math.min(baseDuration, performanceConfig.animations.maxDuration)
}

// Función para verificar si el dispositivo tiene conexión lenta
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false

  const connection = (navigator as any).connection
  if (!connection) return false

  return (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.effectiveType === '3g'
  )
}

// Función para optimizar la carga de imágenes basada en la conexión
export const getImageOptimization = () => {
  const isSlow = isSlowConnection()

  return {
    quality: isSlow ? 70 : performanceConfig.images.quality,
    format: isSlow ? 'webp' : 'avif',
    lazy: isSlow,
  }
}
