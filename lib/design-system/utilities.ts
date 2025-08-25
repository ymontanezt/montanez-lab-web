// Utilidades del sistema de diseño de Montañez Lab
// Funciones helper para trabajar con el sistema de colores

import { colorTokens, componentColors } from './color-tokens'

// Función helper para combinar clases
export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Función para aplicar tema condicional
export function themeClass(lightClass: string, darkClass: string): string {
  return `${lightClass} ${darkClass}`
}

// Función para obtener colores de marca
export function getBrandColor(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return colorTokens.brand[variant]
}

// Función para obtener colores de texto de marca
export function getBrandTextColor(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return colorTokens.text.brand[variant]
}

// Función para obtener colores de fondo de marca
export function getBrandBackgroundColor(
  variant: 'primary' | 'secondary' | 'accent' | 'light' | 'muted' = 'primary'
) {
  if (variant === 'light' || variant === 'muted') {
    return colorTokens.background.brand[variant]
  }
  return colorTokens.background.brand[variant as 'primary' | 'secondary' | 'accent']
}

// Función para obtener colores de borde de marca
export function getBrandBorderColor(
  variant: 'primary' | 'secondary' | 'accent' | 'light' = 'primary'
) {
  if (variant === 'light') {
    return colorTokens.border.brand.light
  }
  return colorTokens.border.brand[variant as 'primary' | 'secondary' | 'accent']
}

// Función para obtener colores de hover de marca
export function getBrandHoverColor(
  type: 'background' | 'text' | 'border',
  variant: 'primary' | 'secondary' | 'accent' | 'light' = 'primary'
) {
  if (type === 'background' && variant === 'light') {
    return colorTokens.hover.background.brand.light
  }
  if (type === 'background') {
    return colorTokens.hover.background.brand[variant as 'primary' | 'secondary' | 'accent']
  }
  if (type === 'text') {
    return colorTokens.hover.text.brand[variant as 'primary' | 'secondary' | 'accent']
  }
  if (type === 'border') {
    return colorTokens.hover.border.brand[variant as 'primary' | 'secondary' | 'accent']
  }
  return ''
}

// Función para obtener colores de estado
export function getStateColor(
  type: 'success' | 'warning' | 'error' | 'info',
  element: 'background' | 'text' | 'border' | 'icon'
) {
  return colorTokens.state[type][element]
}

// Función para obtener colores de componente
export function getComponentColor(
  component: keyof typeof componentColors,
  variant: string,
  element?: string
) {
  const componentColor = componentColors[component] as any
  if (element && componentColor[variant] && typeof componentColor[variant] === 'object') {
    return componentColor[variant][element]
  }
  return componentColor[variant]
}

// Función para obtener gradientes de marca
export function getBrandGradient(variant: 'primary' | 'secondary' | 'accent' | 'logo' = 'primary') {
  return colorTokens.gradient.brand[variant]
}

// Función para obtener sombras de marca
export function getBrandShadow(variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  return colorTokens.shadow.brand[variant]
}

// Clases utilitarias predefinidas para compatibilidad
export const utilityClasses = {
  // Contenedores
  container: {
    primary: `${colorTokens.background.primary} ${colorTokens.border.primary} ${colorTokens.shadow.secondary}`,
    secondary: `${colorTokens.background.secondary} ${colorTokens.border.primary}`,
    card: `${colorTokens.background.card} ${colorTokens.border.primary} ${colorTokens.shadow.card}`,
    overlay: `${colorTokens.background.overlay}`,
    brand: {
      primary: `${colorTokens.background.brand.primary} ${colorTokens.border.brand.primary} ${colorTokens.shadow.brand.primary}`,
      secondary: `${colorTokens.background.brand.secondary} ${colorTokens.border.brand.secondary} ${colorTokens.shadow.brand.secondary}`,
      accent: `${colorTokens.background.brand.accent} ${colorTokens.border.brand.accent} ${colorTokens.shadow.brand.accent}`,
    },
  },

  // Botones
  button: {
    primary: `${componentColors.button.primary.background} ${componentColors.button.primary.text} ${componentColors.button.primary.border} ${componentColors.button.primary.focus}`,
    secondary: `${componentColors.button.secondary.background} ${componentColors.button.secondary.text} ${componentColors.button.secondary.border} ${componentColors.button.secondary.focus}`,
    outline: `${componentColors.button.outline.background} ${componentColors.button.outline.text} ${componentColors.button.outline.border} ${componentColors.button.outline.focus}`,
    ghost: `${componentColors.button.ghost.background} ${componentColors.button.ghost.text} ${componentColors.button.ghost.border} ${componentColors.button.ghost.focus}`,
  },

  // Tarjetas
  card: {
    base: `${componentColors.card.background} ${componentColors.card.border} ${componentColors.card.shadow}`,
    hover: `${componentColors.card.hover.background} ${componentColors.card.hover.shadow}`,
  },

  // Inputs
  input: {
    base: `${componentColors.input.background} ${componentColors.input.border} ${componentColors.input.text} ${componentColors.input.focus.border} ${componentColors.input.focus.ring}`,
    error: `${componentColors.input.background} ${componentColors.input.error.border} ${componentColors.input.error.text}`,
  },

  // Badges
  badge: {
    primary: `${componentColors.badge.primary.background} ${componentColors.badge.primary.text} ${componentColors.badge.primary.border}`,
    secondary: `${componentColors.badge.secondary.background} ${componentColors.badge.secondary.text} ${componentColors.badge.secondary.border}`,
    accent: `${componentColors.badge.accent.background} ${componentColors.badge.accent.text} ${componentColors.badge.accent.border}`,
  },
}

// Exportar la función cn para compatibilidad
export const cn = combineClasses

// Exportar todo junto
export default {
  combineClasses,
  themeClass,
  getBrandColor,
  getBrandTextColor,
  getBrandBackgroundColor,
  getBrandBorderColor,
  getBrandHoverColor,
  getStateColor,
  getComponentColor,
  getBrandGradient,
  getBrandShadow,
  utilityClasses,
  cn,
}
