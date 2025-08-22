// Google Analytics 4 configuration and tracking functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date().toISOString())
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId: string, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      ...data,
    })
  }
}

// Specific tracking functions for dental lab
export const trackFormSubmission = (formType: string, service: string, urgency: string) => {
  trackEvent('form_submit', 'engagement', `${formType}_${service}`, 1)
  trackConversion('AW-CONVERSION_ID/form_submission', {
    event_category: 'form',
    event_label: service,
    custom_parameters: {
      urgency_level: urgency,
      form_type: formType,
    },
  })
}

export const trackPhoneCall = (phoneNumber: string, source: string) => {
  trackEvent('phone_call', 'contact', `${source}_${phoneNumber}`, 1)
  trackConversion('AW-CONVERSION_ID/phone_call', {
    event_category: 'contact',
    event_label: source,
    phone_number: phoneNumber,
  })
}

export const trackWhatsAppClick = (message: string, source: string) => {
  trackEvent('whatsapp_click', 'contact', source, 1)
  trackConversion('AW-CONVERSION_ID/whatsapp_contact', {
    event_category: 'contact',
    event_label: source,
    message_type: message,
  })
}

export const trackServiceView = (serviceName: string, source: string) => {
  trackEvent('service_view', 'engagement', serviceName, 1)
  trackEvent('page_view', 'navigation', `service_${serviceName}`)
}

export const trackEmailClick = (emailAddress: string, source: string) => {
  trackEvent('email_click', 'contact', `${source}_${emailAddress}`, 1)
}

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', 'engagement', `${fileType}_${fileName}`, 1)
}

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', 'engagement', `${percentage}%`, percentage)
}
