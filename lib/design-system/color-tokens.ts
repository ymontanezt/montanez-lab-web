// Sistema de tokens de colores oficial de Montañez Lab
// Basado en la tarjeta de presentación oficial con verde azulado (teal) y dorado
// Garantiza contraste y visibilidad en ambos temas

export const colorTokens = {
  // Colores base de la marca Montañez Lab
  brand: {
    primary: 'from-teal-800 to-teal-900', // Verde azulado principal de la tarjeta
    secondary: 'from-teal-400 to-teal-500', // Verde azulado claro
    accent: 'from-amber-500 to-amber-600', // Dorado de la tarjeta
    logo: {
      primary: 'text-teal-800 dark:text-teal-200', // Color principal del logo
      secondary: 'text-teal-400 dark:text-teal-300', // Color secundario del logo
      accent: 'text-amber-500 dark:text-amber-400', // Color dorado del logo
    },
  },

  // Colores base del sistema
  background: {
    primary: 'bg-white dark:bg-gray-950',
    secondary: 'bg-gray-50 dark:bg-gray-900',
    tertiary: 'bg-gray-100 dark:bg-gray-800',
    muted: 'bg-gray-200 dark:bg-gray-700',
    card: 'bg-white dark:bg-gray-900',
    overlay: 'bg-black/50 dark:bg-black/70',
    brand: {
      primary: 'bg-teal-800 dark:bg-teal-200',
      secondary: 'bg-teal-400 dark:bg-teal-300',
      accent: 'bg-amber-500 dark:bg-amber-400',
      light: 'bg-teal-50 dark:bg-teal-950',
      muted: 'bg-teal-100 dark:bg-teal-900',
    },
  },

  // Colores de texto
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-800 dark:text-gray-300',
    tertiary: 'text-gray-700 dark:text-gray-400',
    muted: 'text-gray-600 dark:text-gray-500',
    inverse: 'text-white dark:text-gray-900',
    accent: 'text-teal-600 dark:text-teal-400',
    brand: {
      primary: 'text-teal-800 dark:text-teal-200',
      secondary: 'text-teal-400 dark:text-teal-300',
      accent: 'text-amber-500 dark:text-amber-400',
    },
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  },

  // Colores de bordes
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
    accent: 'border-teal-300 dark:border-teal-600',
    brand: {
      primary: 'border-teal-800 dark:border-teal-200',
      secondary: 'border-teal-400 dark:border-teal-300',
      accent: 'border-amber-500 dark:border-amber-400',
      light: 'border-teal-200 dark:border-teal-800',
    },
    focus: 'border-teal-500 dark:border-teal-400',
    error: 'border-red-300 dark:border-red-600',
    success: 'border-green-300 dark:border-green-600',
  },

  // Estados de hover
  hover: {
    background: {
      primary: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      secondary: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      accent: 'hover:bg-teal-50 dark:hover:bg-teal-900/20',
      brand: {
        primary: 'hover:bg-teal-700 dark:hover:bg-teal-300',
        secondary: 'hover:bg-teal-300 dark:hover:bg-teal-400',
        accent: 'hover:bg-amber-400 dark:hover:bg-amber-500',
        light: 'hover:bg-teal-100 dark:hover:bg-teal-900',
      },
      card: 'hover:bg-white dark:hover:bg-gray-800',
    },
    text: {
      primary: 'hover:text-gray-900 dark:hover:text-white',
      secondary: 'hover:text-gray-700 dark:hover:text-gray-300',
      accent: 'hover:text-teal-700 dark:hover:text-teal-300',
      brand: {
        primary: 'hover:text-teal-700 dark:hover:text-teal-100',
        secondary: 'hover:text-teal-300 dark:hover:text-teal-200',
        accent: 'hover:text-amber-400 dark:hover:text-amber-300',
      },
      inverse: 'hover:text-white dark:hover:text-gray-900',
    },
    border: {
      primary: 'hover:border-gray-300 dark:hover:border-gray-600',
      accent: 'hover:border-teal-400 dark:hover:border-teal-500',
      brand: {
        primary: 'hover:border-teal-700 dark:hover:border-teal-100',
        secondary: 'hover:border-teal-300 dark:hover:border-teal-200',
        accent: 'hover:border-amber-400 dark:hover:border-amber-300',
      },
    },
  },

  // Estados de focus
  focus: {
    ring: {
      primary: 'focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
      brand: 'focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
      error: 'focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/30',
      success: 'focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/30',
    },
    border: {
      primary: 'focus:border-teal-500 dark:focus:border-teal-400',
      brand: 'focus:border-teal-500 dark:focus:border-teal-400',
      error: 'focus:border-red-500 dark:focus:border-red-400',
      success: 'focus:border-green-500 dark:focus:border-green-400',
    },
  },

  // Estados activos/seleccionados
  active: {
    background: {
      primary: 'bg-teal-100 dark:bg-teal-900/30',
      secondary: 'bg-gray-200 dark:bg-gray-700',
      accent: 'bg-teal-50 dark:bg-teal-900/20',
      brand: {
        primary: 'bg-teal-100 dark:bg-teal-900/30',
        secondary: 'bg-teal-200 dark:bg-teal-800/30',
        accent: 'bg-amber-100 dark:bg-amber-900/30',
      },
    },
    text: {
      primary: 'text-teal-700 dark:text-teal-300',
      secondary: 'text-gray-900 dark:text-white',
      brand: {
        primary: 'text-teal-700 dark:text-teal-300',
        secondary: 'text-teal-500 dark:text-teal-200',
        accent: 'text-amber-600 dark:text-amber-300',
      },
    },
    border: {
      primary: 'border-teal-500 dark:border-teal-400',
      secondary: 'border-gray-400 dark:border-gray-500',
      brand: {
        primary: 'border-teal-500 dark:border-teal-400',
        secondary: 'border-teal-400 dark:border-teal-300',
        accent: 'border-amber-500 dark:border-amber-400',
      },
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
    primary: 'from-teal-800 to-teal-900 dark:from-teal-200 dark:to-teal-300',
    secondary: 'from-teal-400 to-teal-500 dark:from-teal-300 dark:to-teal-400',
    accent: 'from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500',
    brand: {
      primary: 'from-teal-800 to-teal-900 dark:from-teal-200 dark:to-teal-300',
      secondary: 'from-teal-400 to-teal-500 dark:from-teal-300 dark:to-teal-400',
      accent: 'from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500',
      logo: 'from-teal-800 via-teal-600 to-amber-500 dark:from-teal-200 dark:via-teal-400 dark:to-amber-400',
    },
    background: 'from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900',
    card: 'from-white to-gray-50 dark:from-gray-900 dark:to-gray-800',
  },

  // Sombras
  shadow: {
    primary: 'shadow-lg shadow-teal-500/10 dark:shadow-teal-400/10',
    secondary: 'shadow-md shadow-gray-500/10 dark:shadow-gray-400/10',
    accent: 'shadow-lg shadow-amber-500/20 dark:shadow-amber-400/20',
    brand: {
      primary: 'shadow-lg shadow-teal-500/20 dark:shadow-teal-400/20',
      secondary: 'shadow-md shadow-teal-400/15 dark:shadow-teal-300/15',
      accent: 'shadow-lg shadow-amber-500/25 dark:shadow-amber-400/25',
    },
    card: 'shadow-sm shadow-gray-500/5 dark:shadow-gray-400/5',
    button: 'shadow-md shadow-teal-500/25 dark:shadow-teal-400/25',
  },

  // Estados especiales
  state: {
    success: {
      background: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200 dark:border-green-700',
      icon: 'text-green-500 dark:text-green-400',
    },
    warning: {
      background: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-200 dark:border-yellow-700',
      icon: 'text-yellow-500 dark:text-yellow-400',
    },
    error: {
      background: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-200 dark:border-red-700',
      icon: 'text-red-500 dark:text-red-400',
    },
    info: {
      background: 'bg-teal-50 dark:bg-teal-900/20',
      text: 'text-teal-700 dark:text-teal-300',
      border: 'border-teal-200 dark:border-teal-700',
      icon: 'text-teal-500 dark:text-teal-400',
    },
  },
}

// Colores específicos para componentes
export const componentColors = {
  // Botones
  button: {
    primary: {
      background: 'bg-teal-800 hover:bg-teal-700 dark:bg-teal-200 dark:hover:bg-teal-300',
      text: 'text-white dark:text-gray-900',
      border: 'border-teal-800 dark:border-teal-200',
      focus: 'focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
    },
    secondary: {
      background: 'bg-teal-100 hover:bg-teal-200 dark:bg-teal-800 dark:hover:bg-teal-700',
      text: 'text-teal-800 dark:text-teal-200',
      border: 'border-teal-200 dark:border-teal-700',
      focus: 'focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
    },
    outline: {
      background: 'bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/20',
      text: 'text-teal-800 dark:text-teal-200',
      border: 'border-teal-300 dark:border-teal-600',
      focus: 'focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
    },
    ghost: {
      background: 'bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/20',
      text: 'text-teal-800 dark:text-teal-200',
      border: 'border-transparent',
      focus: 'focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
    },
  },

  // Tarjetas
  card: {
    background: 'bg-white dark:bg-gray-900',
    border: 'border-gray-200 dark:border-gray-700',
    shadow: 'shadow-sm shadow-gray-500/5 dark:shadow-gray-400/5',
    hover: {
      background: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      shadow: 'hover:shadow-md hover:shadow-gray-500/10 dark:hover:shadow-gray-400/10',
    },
  },

  // Inputs
  input: {
    background: 'bg-white dark:bg-gray-900',
    border: 'border-gray-300 dark:border-gray-600',
    text: 'text-gray-900 dark:text-white',
    placeholder: 'placeholder-gray-500 dark:placeholder-gray-400',
    focus: {
      border: 'focus:border-teal-500 dark:focus:border-teal-400',
      ring: 'focus:ring-teal-500/20 dark:focus:ring-teal-400/30',
    },
    error: {
      border: 'border-red-300 dark:border-red-600',
      text: 'text-red-600 dark:text-red-400',
    },
  },

  // Badges
  badge: {
    primary: {
      background: 'bg-teal-100 dark:bg-teal-900/30',
      text: 'text-teal-800 dark:text-teal-200',
      border: 'border-teal-200 dark:border-teal-700',
    },
    secondary: {
      background: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-800 dark:text-gray-200',
      border: 'border-gray-200 dark:border-gray-700',
    },
    accent: {
      background: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-800 dark:text-amber-200',
      border: 'border-amber-200 dark:border-amber-700',
    },
  },
}

// Exportar todo junto
export default {
  colorTokens,
  componentColors,
}
