// Accessibility configuration
// Centralized accessibility settings for the application

export const accessibilityConfig = {
  // Nivel de compliance
  compliance: {
    level: 'AA', // WCAG 2.1 AA
    version: '2.1',
    standards: ['WCAG 2.1', 'Section 508', 'ADA'],
  },

  // Características de accesibilidad
  features: {
    skipLinks: true,
    highContrastMode: true,
    fontSizeAdjustment: true,
    motionReduction: true,
    screenReaderSupport: true,
    keyboardNavigation: true,
    focusIndicators: true,
    colorBlindSupport: true,
    dyslexiaSupport: true,
  },

  // Configuración de colores
  colors: {
    contrastRatio: 4.5, // Mínimo para AA
    highContrastRatio: 7.0, // Para AAA
    colorBlindSafe: true,
    semanticColors: true,
    focusIndicator: '#22c55e',
    errorColor: '#ef4444',
    successColor: '#22c55e',
    warningColor: '#f59e0b',
    infoColor: '#3b82f6',
  },

  // Configuración de tipografía
  typography: {
    minFontSize: 16, // px
    maxFontSize: 24, // px
    lineHeight: 1.5,
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Georgia, serif',
      monospace: 'JetBrains Mono, monospace',
    },
    fontScaling: true,
    readableLineLength: 65, // caracteres
  },

  // Configuración de navegación
  navigation: {
    skipToMain: true,
    skipToNavigation: true,
    skipToFooter: true,
    breadcrumbs: true,
    sitemap: true,
    search: true,
    keyboardShortcuts: true,
    focusTrapping: true,
  },

  // Configuración de formularios
  forms: {
    labels: true,
    descriptions: true,
    errorMessages: true,
    requiredIndicators: true,
    validationFeedback: true,
    autoComplete: true,
    fieldset: true,
    legend: true,
  },

  // Configuración de imágenes
  images: {
    altText: true,
    decorativeImages: false,
    complexImages: true,
    longDescriptions: true,
    captions: true,
    lazyLoading: true,
  },

  // Configuración de multimedia
  multimedia: {
    captions: true,
    transcripts: true,
    audioDescriptions: true,
    controls: true,
    autoplay: false,
    pauseOnFocus: true,
  },

  // Configuración de animaciones
  animations: {
    reducedMotion: true,
    motionDuration: 300, // ms
    motionEasing: 'ease-in-out',
    hoverEffects: true,
    focusEffects: true,
    loadingStates: true,
  },

  // Configuración de ARIA
  aria: {
    landmarks: true,
    roles: true,
    states: true,
    properties: true,
    liveRegions: true,
    announcements: true,
  },

  // Configuración de testing
  testing: {
    automated: true,
    manual: true,
    tools: ['axe-core', 'pa11y', 'wave', 'lighthouse', 'color-contrast-analyzer'],
    frequency: 'weekly',
    reporting: true,
  },

  // Configuración de documentación
  documentation: {
    accessibilityStatement: true,
    helpGuide: true,
    keyboardShortcuts: true,
    contactInfo: true,
    feedbackForm: true,
  },
} as const

// Helper functions
export const getComplianceConfig = () => accessibilityConfig.compliance
export const getFeaturesConfig = () => accessibilityConfig.features
export const getColorsConfig = () => accessibilityConfig.colors
export const getTypographyConfig = () => accessibilityConfig.typography
export const getNavigationConfig = () => accessibilityConfig.navigation
export const getFormsConfig = () => accessibilityConfig.forms
export const getImagesConfig = () => accessibilityConfig.images
export const getMultimediaConfig = () => accessibilityConfig.multimedia
export const getAnimationsConfig = () => accessibilityConfig.animations
export const getAriaConfig = () => accessibilityConfig.aria
export const getTestingConfig = () => accessibilityConfig.testing
export const getDocumentationConfig = () => accessibilityConfig.documentation

// Type exports
export type AccessibilityConfig = typeof accessibilityConfig
export type ComplianceConfig = typeof accessibilityConfig.compliance
export type FeaturesConfig = typeof accessibilityConfig.features
export type ColorsConfig = typeof accessibilityConfig.colors
export type TypographyConfig = typeof accessibilityConfig.typography
export type NavigationConfig = typeof accessibilityConfig.navigation
export type FormsConfig = typeof accessibilityConfig.forms
export type ImagesConfig = typeof accessibilityConfig.images
export type MultimediaConfig = typeof accessibilityConfig.multimedia
export type AnimationsConfig = typeof accessibilityConfig.animations
export type AriaConfig = typeof accessibilityConfig.aria
export type TestingConfig = typeof accessibilityConfig.testing
export type DocumentationConfig = typeof accessibilityConfig.documentation
