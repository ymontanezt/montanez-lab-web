// Sistema de animaciones estandarizadas
// Proporciona animaciones consistentes en toda la aplicación

// Configuraciones de transiciones
export const transitions = {
  // Transiciones rápidas para elementos pequeños
  fast: {
    duration: 0.15,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  // Transiciones normales para la mayoría de elementos
  normal: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  // Transiciones lentas para elementos grandes
  slow: {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  // Transición elástica para elementos divertidos
  elastic: {
    duration: 0.6,
    ease: [0.68, -0.55, 0.265, 1.55],
  },
  // Transición suave para elementos importantes
  smooth: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
}

// Variantes de entrada estándar
export const enterVariants = {
  // Entrada desde abajo
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  // Entrada desde arriba
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  // Entrada desde la izquierda
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  // Entrada desde la derecha
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  // Entrada con escala
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  // Entrada con rotación
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
  },
  // Entrada simple de fade
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
}

// Variantes de hover estándar
export const hoverVariants = {
  // Elevación suave
  lift: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 0, scale: 0.98 },
  },
  // Escala simple
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  // Rotación suave
  rotate: {
    whileHover: { rotate: 2 },
    whileTap: { rotate: 0 },
  },
  // Brillo
  glow: {
    whileHover: {
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      scale: 1.02,
    },
  },
  // Bounce suave
  bounce: {
    whileHover: { y: -4 },
    whileTap: { y: 0 },
  },
}

// Animaciones de loading
export const loadingVariants = {
  // Spinner rotando
  spin: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  // Pulso
  pulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  // Bounce dots
  dots: {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Animaciones de stagger para listas
export const staggerVariants = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
}

// Configuraciones de viewport para animaciones
export const viewportConfig = {
  // Una sola vez al entrar en vista
  once: {
    once: true,
    margin: '0px 0px -100px 0px',
  },
  // Repetir cada vez que entra/sale
  repeat: {
    once: false,
    margin: '0px 0px -50px 0px',
  },
  // Activar cuando está completamente visible
  full: {
    once: true,
    amount: 1,
  },
  // Activar cuando está parcialmente visible
  partial: {
    once: true,
    amount: 0.3,
  },
}

// Configuraciones predefinidas comunes
export const commonAnimations = {
  // Para cards y contenedores
  cardEntry: {
    ...enterVariants.slideUp,
    transition: transitions.normal,
    viewport: viewportConfig.once,
  },
  // Para textos y títulos
  textEntry: {
    ...enterVariants.fade,
    transition: transitions.slow,
    viewport: viewportConfig.partial,
  },
  // Para botones
  buttonHover: {
    ...hoverVariants.lift,
    transition: transitions.fast,
  },
  // Para imágenes
  imageEntry: {
    ...enterVariants.scale,
    transition: transitions.smooth,
    viewport: viewportConfig.once,
  },
  // Para elementos de lista
  listStagger: {
    ...staggerVariants,
    transition: transitions.normal,
  },
}

// Utilidades para crear animaciones personalizadas
export function createStaggerAnimation(
  staggerDelay: number = 0.1,
  baseVariant: keyof typeof enterVariants = 'slideUp'
) {
  return {
    container: {
      animate: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    },
    item: enterVariants[baseVariant],
  }
}

export function createDelayedAnimation(
  delay: number,
  variant: keyof typeof enterVariants = 'fade'
) {
  return {
    ...enterVariants[variant],
    transition: {
      ...transitions.normal,
      delay,
    },
  }
}

// Presets para diferentes tipos de componentes
export const componentAnimations = {
  // Para modales y overlays
  modal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: transitions.fast,
  },
  // Para notificaciones y toasts
  toast: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: transitions.normal,
  },
  // Para navegación y menús
  menu: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: transitions.normal,
  },
  // Para formularios
  form: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: transitions.smooth,
  },
}
