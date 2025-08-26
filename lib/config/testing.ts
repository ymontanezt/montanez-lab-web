// Testing configuration
// Centralized testing settings for the application

export const testingConfig = {
  // Configuración de Jest
  jest: {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapping: {
      '^@/(.*)$': '<rootDir>/$1',
      '^@/components/(.*)$': '<rootDir>/components/$1',
      '^@/lib/(.*)$': '<rootDir>/lib/$1',
      '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
      '^@/types/(.*)$': '<rootDir>/types/$1',
    },
    collectCoverageFrom: [
      'components/**/*.{ts,tsx}',
      'lib/**/*.{ts,tsx}',
      'hooks/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!**/.next/**',
      '!**/coverage/**',
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },

  // Configuración de Playwright
  playwright: {
    testDir: './tests/e2e',
    timeout: 30000,
    expect: {
      timeout: 5000,
    },
    use: {
      baseURL:
        process.env.NODE_ENV === 'production'
          ? 'https://montanez-website.web.app'
          : 'http://localhost:3001',
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    projects: [
      {
        name: 'chromium',
        use: { viewport: { width: 1280, height: 720 } },
      },
      {
        name: 'firefox',
        use: { viewport: { width: 1280, height: 720 } },
      },
      {
        name: 'webkit',
        use: { viewport: { width: 1280, height: 720 } },
      },
      {
        name: 'Mobile Chrome',
        use: { viewport: { width: 375, height: 667 } },
      },
      {
        name: 'Mobile Safari',
        use: { viewport: { width: 375, height: 667 } },
      },
    ],
  },

  // Configuración de Cypress
  cypress: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://montanez-website.web.app'
        : 'http://localhost:3001',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshot: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000,
    e2e: {
      specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      supportFile: 'cypress/support/e2e.ts',
    },
  },

  // Configuración de Lighthouse CI
  lighthouse: {
    ci: {
      collect: {
        url: [
          'http://localhost:3001',
          'http://localhost:3001/#servicios',
          'http://localhost:3001/#galeria',
          'http://localhost:3001/#contacto',
        ],
        numberOfRuns: 3,
        settings: {
          preset: 'desktop',
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
        },
      },
      assert: {
        assertions: {
          'categories:performance': ['warn', { minScore: 0.8 }],
          'categories:accessibility': ['error', { minScore: 0.9 }],
          'categories:best-practices': ['warn', { minScore: 0.8 }],
          'categories:seo': ['error', { minScore: 0.9 }],
        },
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  },

  // Configuración de Web Vitals
  webVitals: {
    enabled: true,
    metrics: [
      'CLS', // Cumulative Layout Shift
      'FID', // First Input Delay
      'FCP', // First Contentful Paint
      'LCP', // Largest Contentful Paint
      'TTFB', // Time to First Byte
    ],
    thresholds: {
      CLS: 0.1,
      FID: 100,
      FCP: 1800,
      LCP: 2500,
      TTFB: 800,
    },
  },

  // Configuración de accessibility testing
  accessibility: {
    enabled: true,
    rules: [
      'color-contrast',
      'heading-order',
      'label',
      'landmark-one-main',
      'list',
      'listitem',
      'region',
    ],
    level: 'AA',
    includeNotices: false,
    includeWarnings: true,
  },

  // Configuración de security testing
  security: {
    enabled: true,
    tools: ['npm audit', 'snyk', 'owasp-dependency-check', 'retire.js'],
    scanDependencies: true,
    scanVulnerabilities: true,
    autoFix: false,
  },

  // Configuración de performance testing
  performance: {
    enabled: true,
    metrics: [
      'First Contentful Paint',
      'Largest Contentful Paint',
      'First Input Delay',
      'Cumulative Layout Shift',
      'Time to Interactive',
      'Total Blocking Time',
    ],
    budgets: {
      performance: 0.8,
      accessibility: 0.9,
      'best-practices': 0.8,
      seo: 0.9,
    },
  },
} as const

// Helper functions
export const getJestConfig = () => testingConfig.jest
export const getPlaywrightConfig = () => testingConfig.playwright
export const getCypressConfig = () => testingConfig.cypress
export const getLighthouseConfig = () => testingConfig.lighthouse
export const getWebVitalsConfig = () => testingConfig.webVitals
export const getAccessibilityConfig = () => testingConfig.accessibility
export const getSecurityConfig = () => testingConfig.security
export const getPerformanceConfig = () => testingConfig.performance

// Type exports
export type TestingConfig = typeof testingConfig
export type JestConfig = typeof testingConfig.jest
export type PlaywrightConfig = typeof testingConfig.playwright
export type CypressConfig = typeof testingConfig.cypress
export type LighthouseConfig = typeof testingConfig.lighthouse
export type WebVitalsConfig = typeof testingConfig.webVitals
export type AccessibilityConfig = typeof testingConfig.accessibility
export type SecurityConfig = typeof testingConfig.security
export type PerformanceConfig = typeof testingConfig.performance
