// Sistema de tokens de colores estandarizado para light y dark mode
// Garantiza contraste y visibilidad en ambos temas

export const colorTokens = {
  // Colores base del sistema
  background: {
    primary: 'bg-white dark:bg-gray-950',
    secondary: 'bg-gray-50 dark:bg-gray-900',
    tertiary: 'bg-gray-100 dark:bg-gray-800',
    muted: 'bg-gray-200 dark:bg-gray-700',
    card: 'bg-white dark:bg-gray-900',
    overlay: 'bg-black/50 dark:bg-black/70',
  },

  // Colores de texto
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-800 dark:text-gray-300',
    tertiary: 'text-gray-700 dark:text-gray-400',
    muted: 'text-gray-600 dark:text-gray-500',
    inverse: 'text-white dark:text-gray-900',
    accent: 'text-primary-600 dark:text-primary-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  },

  // Colores de bordes
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
    accent: 'border-primary-300 dark:border-primary-600',
    focus: 'border-primary-500 dark:border-primary-400',
    error: 'border-red-300 dark:border-red-600',
    success: 'border-green-300 dark:border-green-600',
  },

  // Estados de hover
  hover: {
    background: {
      primary: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      secondary: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      accent: 'hover:bg-primary-50 dark:hover:bg-primary-900/20',
      card: 'hover:bg-white dark:hover:bg-gray-800',
    },
    text: {
      primary: 'hover:text-gray-900 dark:hover:text-white',
      secondary: 'hover:text-gray-700 dark:hover:text-gray-300',
      accent: 'hover:text-primary-700 dark:hover:text-primary-300',
      inverse: 'hover:text-white dark:hover:text-gray-900',
    },
    border: {
      primary: 'hover:border-gray-300 dark:hover:border-gray-600',
      accent: 'hover:border-primary-400 dark:hover:border-primary-500',
    },
  },

  // Estados de focus
  focus: {
    ring: {
      primary: 'focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/30',
      error: 'focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/30',
      success: 'focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/30',
    },
    border: {
      primary: 'focus:border-primary-500 dark:focus:border-primary-400',
      error: 'focus:border-red-500 dark:focus:border-red-400',
      success: 'focus:border-green-500 dark:focus:border-green-400',
    },
  },

  // Estados activos/seleccionados
  active: {
    background: {
      primary: 'bg-primary-100 dark:bg-primary-900/30',
      secondary: 'bg-gray-200 dark:bg-gray-700',
      accent: 'bg-primary-50 dark:bg-primary-900/20',
    },
    text: {
      primary: 'text-primary-700 dark:text-primary-300',
      secondary: 'text-gray-900 dark:text-white',
    },
    border: {
      primary: 'border-primary-500 dark:border-primary-400',
      secondary: 'border-gray-400 dark:border-gray-500',
    },
  },

  // Estados deshabilitados
  disabled: {
    background: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-400 dark:text-gray-600',
    border: 'border-gray-200 dark:border-gray-700',
    cursor: 'cursor-not-allowed',
  },

  // Gradientes
  gradient: {
    primary: 'from-primary-50 to-primary-100 dark:from-primary-950/20 dark:to-primary-900/20',
    secondary: 'from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20',
    accent: 'from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20',
  },

  // Sombras
  shadow: {
    sm: 'shadow-sm dark:shadow-gray-900/20',
    md: 'shadow-md dark:shadow-gray-900/30',
    lg: 'shadow-lg dark:shadow-gray-900/40',
    xl: 'shadow-xl dark:shadow-gray-900/50',
  },
}

// Clases utilitarias predefinidas
export const utilityClasses = {
  // Contenedores
  container: {
    primary: `${colorTokens.background.primary} ${colorTokens.border.primary} ${colorTokens.shadow.md}`,
    secondary: `${colorTokens.background.secondary} ${colorTokens.border.primary}`,
    card: `${colorTokens.background.card} ${colorTokens.border.primary} ${colorTokens.shadow.md}`,
    overlay: `${colorTokens.background.overlay}`,
  },

  // Botones
  button: {
    primary: `${colorTokens.background.primary} ${colorTokens.text.primary} ${colorTokens.border.primary} ${colorTokens.hover.background.primary} ${colorTokens.hover.text.primary} ${colorTokens.focus.ring.primary}`,
    secondary: `${colorTokens.background.secondary} ${colorTokens.text.secondary} ${colorTokens.border.primary} ${colorTokens.hover.background.secondary} ${colorTokens.hover.text.primary} ${colorTokens.focus.ring.primary}`,
    accent: `bg-primary-600 dark:bg-primary-500 ${colorTokens.text.inverse} ${colorTokens.hover.background.accent} ${colorTokens.focus.ring.primary}`,
    ghost: `${colorTokens.text.secondary} ${colorTokens.hover.background.primary} ${colorTokens.hover.text.primary} ${colorTokens.focus.ring.primary}`,
  },

  // Inputs
  input: {
    base: `${colorTokens.background.primary} ${colorTokens.text.primary} ${colorTokens.border.secondary} ${colorTokens.focus.border.primary} ${colorTokens.focus.ring.primary}`,
    error: `${colorTokens.background.primary} ${colorTokens.text.primary} ${colorTokens.border.error} ${colorTokens.focus.border.error} ${colorTokens.focus.ring.error}`,
    success: `${colorTokens.background.primary} ${colorTokens.text.primary} ${colorTokens.border.success} ${colorTokens.focus.border.success} ${colorTokens.focus.ring.success}`,
  },

  // Enlaces
  link: {
    primary: `${colorTokens.text.accent} ${colorTokens.hover.text.primary} ${colorTokens.focus.ring.primary}`,
    secondary: `${colorTokens.text.secondary} ${colorTokens.hover.text.primary} ${colorTokens.focus.ring.primary}`,
    inverse: `${colorTokens.text.inverse} ${colorTokens.hover.text.inverse} ${colorTokens.focus.ring.primary}`,
  },

  // Navegación
  navigation: {
    item: `text-gray-900 dark:text-gray-200 ${colorTokens.hover.text.accent} ${colorTokens.focus.ring.primary}`,
    active: `${colorTokens.text.accent} ${colorTokens.active.background.accent}`,
    mobile: `text-gray-900 dark:text-gray-200 ${colorTokens.hover.background.primary} hover:text-gray-900 dark:hover:text-white`,
  },

  // Estados
  state: {
    loading: `${colorTokens.text.muted} ${colorTokens.background.secondary}`,
    success: `${colorTokens.text.success} ${colorTokens.background.secondary}`,
    error: `${colorTokens.text.error} ${colorTokens.background.secondary}`,
    warning: `${colorTokens.text.warning} ${colorTokens.background.secondary}`,
  },
}

// Función helper para combinar clases
export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Función para aplicar tema condicional
export function themeClass(lightClass: string, darkClass: string): string {
  return `${lightClass} ${darkClass}`
}
