// Configuraciones de navegación optimizada

export const navigationConfig = {
  // Configuración de preload de páginas
  preload: {
    // Habilitar preload de páginas críticas
    enabled: true,
    // Páginas que se deben precargar
    criticalPages: ['/', '/servicios', '/contacto', '/admin'],
    // Servicios críticos para precargar
    criticalServices: [
      '/servicios/protesis-digitales',
      '/servicios/implantologia-avanzada',
      '/servicios/ortodoncia-personalizada',
    ],
    // Delay antes de precargar (ms)
    delay: 1000,
    // Solo precargar en conexiones rápidas
    fastConnectionOnly: true,
  },

  // Configuración de transiciones
  transitions: {
    // Habilitar transiciones suaves
    enabled: true,
    // Duración de la transición (ms)
    duration: 300,
    // Easing de la transición
    easing: 'ease-in-out',
    // Reducir transiciones en dispositivos con preferencia de movimiento reducido
    respectMotionPreference: true,
  },

  // Configuración de caché de navegación
  cache: {
    // Habilitar caché de navegación
    enabled: true,
    // Número máximo de páginas en caché
    maxPages: 10,
    // Tiempo de vida del caché (ms)
    ttl: 5 * 60 * 1000, // 5 minutos
  },

  // Configuración de scroll restoration
  scrollRestoration: {
    // Habilitar restauración de scroll
    enabled: true,
    // Restaurar scroll después de la transición
    restoreAfterTransition: true,
    // Suavizar el scroll
    smooth: true,
  },

  // Configuración de loading states
  loading: {
    // Mostrar indicador de carga
    showIndicator: true,
    // Duración mínima del indicador (ms)
    minDuration: 200,
    // Duración máxima del indicador (ms)
    maxDuration: 2000,
  },
}

// Función para verificar si se debe habilitar el preload
export const shouldPreload = (): boolean => {
  if (!navigationConfig.preload.enabled) return false

  // Verificar conexión
  if (navigationConfig.preload.fastConnectionOnly) {
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

// Función para precargar una página
export const preloadPage = async (href: string): Promise<void> => {
  if (!shouldPreload()) return

  try {
    // Usar prefetch de Next.js si está disponible
    if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__) {
      const { default: Router } = await import('next/router')
      if (Router.prefetch) {
        await Router.prefetch(href)
      }
    }
  } catch (error) {
    console.warn('Error preloading page:', error)
  }
}

// Función para precargar páginas críticas
export const preloadCriticalPages = (): void => {
  if (!shouldPreload()) return

  // Precargar páginas críticas después de un delay
  setTimeout(() => {
    navigationConfig.preload.criticalPages.forEach(page => {
      preloadPage(page)
    })

    navigationConfig.preload.criticalServices.forEach(service => {
      preloadPage(service)
    })
  }, navigationConfig.preload.delay)
}

// Función para optimizar la navegación
export const optimizeNavigation = (href: string): void => {
  // Precargar la página de destino
  preloadPage(href)

  // Actualizar el título de la página para feedback inmediato
  if (typeof document !== 'undefined') {
    const link = document.querySelector(`a[href="${href}"]`)
    if (link) {
      const title = link.getAttribute('title') || link.textContent
      if (title) {
        document.title = `${title} - Montañez Lab`
      }
    }
  }
}

// Hook para optimizar enlaces
export const useOptimizedLink = (href: string) => {
  const handleMouseEnter = () => {
    if (shouldPreload()) {
      preloadPage(href)
    }
  }

  const handleClick = () => {
    optimizeNavigation(href)
  }

  return {
    onMouseEnter: handleMouseEnter,
    onClick: handleClick,
  }
}
