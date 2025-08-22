// Design System Utilities
// Predefined CSS classes based on design tokens for consistency

import { designTokens } from './tokens'

// Typography utilities
export const typography = {
  // Headings
  'heading-primary': 'font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight',
  'heading-secondary': 'font-serif font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight',
  'heading-tertiary': 'font-serif font-semibold text-xl md:text-2xl leading-tight',
  'heading-quaternary': 'font-serif font-semibold text-lg md:text-xl leading-tight',

  // Body text
  'body-large': 'font-sans text-lg md:text-xl leading-relaxed',
  'body-regular': 'font-sans text-base md:text-lg leading-relaxed',
  'body-small': 'font-sans text-sm md:text-base leading-relaxed',
  'body-xs': 'font-sans text-xs leading-relaxed',

  // Special text
  'text-caption': 'font-sans text-xs font-medium uppercase tracking-wider',
  'text-label': 'font-sans text-sm font-medium',
  'text-helper': 'font-sans text-xs text-muted-foreground',
} as const

// Spacing utilities
export const spacing = {
  'section-padding': 'py-16 md:py-20 lg:py-24',
  'section-padding-sm': 'py-12 md:py-16',
  'section-padding-lg': 'py-20 md:py-24 lg:py-32',
  'container-padding': 'px-4 md:px-6 lg:px-8',
  'card-padding': 'p-6 md:p-8',
  'button-padding': 'px-6 py-3',
  'button-padding-sm': 'px-4 py-2',
  'button-padding-lg': 'px-8 py-4',
} as const

// Layout utilities
export const layout = {
  container: 'container mx-auto',
  'container-sm': 'max-w-4xl mx-auto',
  'container-md': 'max-w-6xl mx-auto',
  'container-lg': 'max-w-7xl mx-auto',
  'container-xl': 'max-w-screen-xl mx-auto',
  'grid-responsive': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
  'grid-responsive-2': 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
  'grid-responsive-4': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
  'flex-center': 'flex items-center justify-center',
  'flex-between': 'flex items-center justify-between',
  'flex-col-center': 'flex flex-col items-center justify-center',
} as const

// Animation utilities
export const animation = {
  'fade-in': 'animate-in fade-in duration-500',
  'slide-up': 'animate-in slide-in-from-bottom-4 duration-500',
  'slide-down': 'animate-in slide-in-from-top-4 duration-500',
  'slide-left': 'animate-in slide-in-from-right-4 duration-500',
  'slide-right': 'animate-in slide-in-from-left-4 duration-500',
  'scale-in': 'animate-in zoom-in-95 duration-500',
  'hover-lift': 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
  'hover-scale': 'transition-all duration-300 hover:scale-105',
  'focus-ring': 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
} as const

// Color utilities
export const colors = {
  'bg-primary': 'bg-primary-500',
  'bg-primary-light': 'bg-primary-100',
  'bg-primary-dark': 'bg-primary-700',
  'text-primary': 'text-primary-600',
  'text-primary-light': 'text-primary-500',
  'text-primary-dark': 'text-primary-700',
  'border-primary': 'border-primary-300',
  'border-primary-light': 'border-primary-200',
  'border-primary-dark': 'border-primary-500',
} as const

// Component-specific utilities
export const components = {
  // Cards
  'card-base': 'bg-card text-card-foreground rounded-lg border border-border shadow-sm',
  'card-hover': 'card-base hover:shadow-md transition-shadow duration-300',
  'card-elevated': 'card-base shadow-md hover:shadow-lg transition-shadow duration-300',

  // Buttons
  'btn-primary':
    'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2',
  'btn-secondary':
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary focus:ring-offset-2',
  'btn-outline':
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2',
  'btn-ghost':
    'hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2',

  // Forms
  'input-base':
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  'label-base':
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',

  // Navigation
  'nav-link':
    'text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  'nav-link-active': 'text-primary',
} as const

// Combined utilities object
export const utilities = {
  typography,
  spacing,
  layout,
  animation,
  colors,
  components,
} as const

// Helper function to combine multiple utility classes
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Export individual utilities for direct import
export type TypographyUtility = keyof typeof typography
export type SpacingUtility = keyof typeof spacing
export type LayoutUtility = keyof typeof layout
export type AnimationUtility = keyof typeof animation
export type ColorUtility = keyof typeof colors
export type ComponentUtility = keyof typeof components
