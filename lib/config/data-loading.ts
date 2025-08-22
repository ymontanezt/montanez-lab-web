// Configuraciones para optimizar la carga de datos
import { useState, useEffect } from 'react'

export const dataLoadingConfig = {
  // Configuración de caché de datos
  cache: {
    // Habilitar caché de datos
    enabled: true,
    // Tiempo de vida del caché para datos estáticos (ms)
    staticData: 60 * 60 * 1000, // 1 hora
    // Tiempo de vida del caché para datos dinámicos (ms)
    dynamicData: 5 * 60 * 1000, // 5 minutos
    // Tiempo de vida del caché para datos de usuario (ms)
    userData: 2 * 60 * 1000, // 2 minutos
  },

  // Configuración de lazy loading
  lazyLoading: {
    // Habilitar lazy loading
    enabled: true,
    // Umbral para cargar datos cuando están cerca del viewport
    threshold: 0.1,
    // Margen para precargar datos
    rootMargin: '100px',
    // Delay antes de cargar datos no críticos
    delay: 500,
  },

  // Configuración de preloading
  preloading: {
    // Habilitar preloading de datos críticos
    enabled: true,
    // Datos que se deben precargar
    criticalData: ['services', 'heroSlides', 'teamMembers'],
    // Solo preload en conexiones rápidas
    fastConnectionOnly: true,
  },

  // Configuración de compresión
  compression: {
    // Habilitar compresión de datos
    enabled: true,
    // Algoritmo de compresión preferido
    algorithm: 'gzip',
    // Nivel de compresión
    level: 6,
  },

  // Configuración de fallbacks
  fallbacks: {
    // Habilitar fallbacks para datos
    enabled: true,
    // Mostrar skeleton mientras se cargan los datos
    showSkeleton: true,
    // Duración del skeleton (ms)
    skeletonDuration: 1000,
    // Mostrar datos en caché mientras se actualizan
    showCachedData: true,
  },
}

// Función para verificar si se debe usar caché
export const shouldUseCache = (dataType: 'static' | 'dynamic' | 'user'): boolean => {
  if (!dataLoadingConfig.cache.enabled) return false

  // Verificar si estamos en modo desarrollo
  if (process.env.NODE_ENV === 'development') return false

  return true
}

// Función para obtener el TTL del caché
export const getCacheTTL = (dataType: 'static' | 'dynamic' | 'user'): number => {
  switch (dataType) {
    case 'static':
      return dataLoadingConfig.cache.staticData
    case 'dynamic':
      return dataLoadingConfig.cache.dynamicData
    case 'user':
      return dataLoadingConfig.cache.userData
    default:
      return dataLoadingConfig.cache.staticData
  }
}

// Función para verificar si se debe habilitar el preload
export const shouldPreloadData = (): boolean => {
  if (!dataLoadingConfig.preloading.enabled) return false

  // Verificar conexión
  if (dataLoadingConfig.preloading.fastConnectionOnly) {
    const connection = (navigator as any).connection
    if (connection) {
      const isSlow =
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g'
      if (isSlow) return false
    }
  }

  return true
}

// Función para precargar datos críticos
export const preloadCriticalData = async (): Promise<void> => {
  if (!shouldPreloadData()) return

  try {
    // Precargar datos críticos
    const dataPromises = dataLoadingConfig.preloading.criticalData.map(async dataType => {
      switch (dataType) {
        case 'services':
          return import('@/data/services').then(module => module.getActiveServices())
        case 'heroSlides':
          return import('@/data/hero-slides').then(module => module.getActiveHeroSlides())
        case 'teamMembers':
          return import('@/data/team-members').then(module => module.getActiveTeamMembers())
        default:
          return Promise.resolve()
      }
    })

    await Promise.allSettled(dataPromises)
  } catch (error) {
    console.warn('Error preloading critical data:', error)
  }
}

// Función para optimizar la carga de datos
export const optimizeDataLoading = (dataType: string, data: any): any => {
  // Comprimir datos si está habilitado
  if (dataLoadingConfig.compression.enabled) {
    // Aquí se implementaría la lógica de compresión
    // Por ahora solo retornamos los datos sin modificar
    return data
  }

  return data
}

// Hook para lazy loading de datos
export const useLazyData = <T>(
  dataLoader: () => Promise<T>,
  dependencies: any[] = []
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isSubscribed = true

    const loadData = async () => {
      if (!dataLoadingConfig.lazyLoading.enabled) return

      setLoading(true)
      setError(null)

      try {
        const result = await dataLoader()
        if (isSubscribed) {
          setData(optimizeDataLoading('dynamic', result))
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err as Error)
        }
      } finally {
        if (isSubscribed) {
          setLoading(false)
        }
      }
    }

    // Delay para lazy loading
    const timeoutId = setTimeout(loadData, dataLoadingConfig.lazyLoading.delay)

    return () => {
      isSubscribed = false
      clearTimeout(timeoutId)
    }
  }, dependencies)

  return { data, loading, error }
}
