'use client'

// Google Analytics 4 configuration and tracking
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: URL | string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    })
  }
}

// Track custom events
interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Predefined tracking events for montanez lab
export const trackingEvents = {
  // Navigation events
  navClick: (section: string) =>
    event({
      action: 'click',
      category: 'Navigation',
      label: section,
    }),

  // Service events
  serviceView: (serviceName: string) =>
    event({
      action: 'view',
      category: 'Service',
      label: serviceName,
    }),

  serviceInquiry: (serviceName: string) =>
    event({
      action: 'inquiry',
      category: 'Service',
      label: serviceName,
    }),

  // Contact events
  contactFormSubmit: () =>
    event({
      action: 'submit',
      category: 'Contact',
      label: 'Contact Form',
    }),

  whatsappClick: () =>
    event({
      action: 'click',
      category: 'Contact',
      label: 'WhatsApp',
    }),

  phoneClick: () =>
    event({
      action: 'click',
      category: 'Contact',
      label: 'Phone',
    }),

  emailClick: () =>
    event({
      action: 'click',
      category: 'Contact',
      label: 'Email',
    }),

  // Engagement events
  galleryImageView: (imageCategory: string) =>
    event({
      action: 'view',
      category: 'Gallery',
      label: imageCategory,
    }),

  testimonialRead: () =>
    event({
      action: 'read',
      category: 'Testimonial',
    }),

  downloadBrochure: () =>
    event({
      action: 'download',
      category: 'Marketing Material',
      label: 'Brochure',
    }),

  // Business events
  appointmentRequest: (method: string) =>
    event({
      action: 'request',
      category: 'Appointment',
      label: method,
    }),

  quoteRequest: (serviceType: string) =>
    event({
      action: 'request',
      category: 'Quote',
      label: serviceType,
    }),

  // Technical events
  searchPerformed: (query: string) =>
    event({
      action: 'search',
      category: 'Site Search',
      label: query,
    }),

  errorOccurred: (errorType: string) =>
    event({
      action: 'error',
      category: 'Technical',
      label: errorType,
    }),

  // Performance events
  pageLoadTime: (loadTime: number) =>
    event({
      action: 'timing',
      category: 'Performance',
      label: 'Page Load',
      value: Math.round(loadTime),
    }),
}

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return

  // Track Core Web Vitals
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(metric => {
      event({
        action: 'CLS',
        category: 'Web Vitals',
        label: metric.id,
        value: Math.round(metric.value * 1000),
      })
    })

    onINP(metric => {
      event({
        action: 'INP',
        category: 'Web Vitals',
        label: metric.id,
        value: Math.round(metric.value),
      })
    })

    onFCP(metric => {
      event({
        action: 'FCP',
        category: 'Web Vitals',
        label: metric.id,
        value: Math.round(metric.value),
      })
    })

    onLCP(metric => {
      event({
        action: 'LCP',
        category: 'Web Vitals',
        label: metric.id,
        value: Math.round(metric.value),
      })
    })

    onTTFB(metric => {
      event({
        action: 'TTFB',
        category: 'Web Vitals',
        label: metric.id,
        value: Math.round(metric.value),
      })
    })
  })
}

// User engagement tracking
export const trackUserEngagement = () => {
  if (typeof window === 'undefined') return

  let startTime = Date.now()
  let isVisible = !document.hidden

  // Track time on page
  const trackTimeOnPage = () => {
    const timeSpent = Date.now() - startTime
    if (timeSpent > 10000) {
      // Only track if user spent more than 10 seconds
      event({
        action: 'time_on_page',
        category: 'Engagement',
        value: Math.round(timeSpent / 1000),
      })
    }
  }

  // Track scroll depth
  let maxScrollDepth = 0
  const trackScrollDepth = () => {
    const scrollDepth = Math.round(
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
    )

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth

      // Track scroll milestones
      if (scrollDepth >= 25 && scrollDepth < 50) {
        event({ action: 'scroll_25', category: 'Engagement' })
      } else if (scrollDepth >= 50 && scrollDepth < 75) {
        event({ action: 'scroll_50', category: 'Engagement' })
      } else if (scrollDepth >= 75 && scrollDepth < 90) {
        event({ action: 'scroll_75', category: 'Engagement' })
      } else if (scrollDepth >= 90) {
        event({ action: 'scroll_90', category: 'Engagement' })
      }
    }
  }

  // Track visibility changes
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isVisible) {
        trackTimeOnPage()
        isVisible = false
      }
    } else {
      startTime = Date.now()
      isVisible = true
    }
  }

  // Add event listeners
  window.addEventListener('scroll', trackScrollDepth, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('beforeunload', trackTimeOnPage)

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', trackScrollDepth)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('beforeunload', trackTimeOnPage)
  }
}

// Device and browser information
export const trackDeviceInfo = () => {
  if (typeof window === 'undefined') return

  const deviceInfo = {
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    device_pixel_ratio: window.devicePixelRatio || 1,
    color_depth: window.screen.colorDepth,
    touch_support: 'ontouchstart' in window,
  }

  // Track device capabilities
  event({
    action: 'device_info',
    category: 'Technical',
    label: JSON.stringify(deviceInfo),
  })

  // Track connection information if available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    event({
      action: 'connection_type',
      category: 'Technical',
      label: connection.effectiveType || 'unknown',
    })
  }
}

// Enhanced tracking hook
export const useAnalytics = () => {
  return {
    trackEvent: event,
    trackPageView: pageview,
    ...trackingEvents,
  }
}

// Type definitions for gtag
declare global {
  interface Window {
    gtag: (command: 'config' | 'event', targetId: string, config?: Record<string, any>) => void
  }
}
