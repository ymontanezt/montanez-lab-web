'use client'

import { useEffect, useState } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

export interface WebVitalsData {
  cls?: number
  inp?: number
  fcp?: number
  lcp?: number
  ttfb?: number
}

interface WebVitalsOptions {
  reportAllChanges?: boolean
  onReport?: (metric: Metric) => void
}

export function useWebVitals({ reportAllChanges = false, onReport }: WebVitalsOptions = {}) {
  const [vitals, setVitals] = useState<WebVitalsData>({})

  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      setVitals(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric.value,
      }))
      onReport?.(metric)
    }

    // Get Core Web Vitals
    onCLS(handleMetric, { reportAllChanges })
    onINP(handleMetric)
    onFCP(handleMetric, { reportAllChanges })
    onLCP(handleMetric, { reportAllChanges })
    onTTFB(handleMetric, { reportAllChanges })
  }, [reportAllChanges, onReport])

  return vitals
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState({
    navigationTiming: null as PerformanceNavigationTiming | null,
    resourceTimings: [] as PerformanceResourceTiming[],
    memoryInfo: null as any,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    // Resource timing
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

    // Memory info (Chrome only)
    const memory = (performance as any).memory

    setPerformanceData({
      navigationTiming: navigation,
      resourceTimings: resources,
      memoryInfo: memory,
    })

    // Observer for new resource entries
    const observer = new PerformanceObserver(list => {
      const newEntries = list.getEntries() as PerformanceResourceTiming[]
      setPerformanceData(prev => ({
        ...prev,
        resourceTimings: [...prev.resourceTimings, ...newEntries],
      }))
    })

    observer.observe({ entryTypes: ['resource'] })

    return () => observer.disconnect()
  }, [])

  return performanceData
}

// Page load metrics
export function usePageLoadMetrics() {
  const [metrics, setMetrics] = useState({
    domContentLoaded: 0,
    loadComplete: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paintEntries = performance.getEntriesByType('paint')

    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')

    setMetrics({
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
      loadComplete: navigation.loadEventEnd - navigation.startTime,
      firstPaint: firstPaint?.startTime || 0,
      firstContentfulPaint: firstContentfulPaint?.startTime || 0,
    })
  }, [])

  return metrics
}

// Resource loading analysis
export function useResourceAnalysis() {
  const [analysis, setAnalysis] = useState({
    totalResources: 0,
    totalSize: 0,
    slowestResource: null as PerformanceResourceTiming | null,
    resourcesByType: {} as Record<string, number>,
    failedResources: [] as PerformanceResourceTiming[],
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

    let totalSize = 0
    let slowestResource: PerformanceResourceTiming | null = null
    const resourcesByType: Record<string, number> = {}
    const failedResources: PerformanceResourceTiming[] = []

    resources.forEach(resource => {
      // Calculate total size
      if (resource.transferSize) {
        totalSize += resource.transferSize
      }

      // Find slowest resource
      if (!slowestResource || resource.duration > slowestResource.duration) {
        slowestResource = resource
      }

      // Group by type
      const type = getResourceType(resource.name)
      resourcesByType[type] = (resourcesByType[type] || 0) + 1

      // Track failed resources
      if (resource.transferSize === 0 && resource.duration > 0) {
        failedResources.push(resource)
      }
    })

    setAnalysis({
      totalResources: resources.length,
      totalSize,
      slowestResource,
      resourcesByType,
      failedResources,
    })
  }, [])

  return analysis
}

// Helper function to determine resource type
function getResourceType(url: string): string {
  if (url.includes('.js')) return 'JavaScript'
  if (url.includes('.css')) return 'CSS'
  if (url.match(/\.(jpg|jpeg|png|gif|svg|webp)/)) return 'Image'
  if (url.match(/\.(woff|woff2|ttf|eot)/)) return 'Font'
  if (url.includes('/api/')) return 'API'
  return 'Other'
}

// Performance score calculation
export function usePerformanceScore() {
  const vitals = useWebVitals()
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const { cls, inp, lcp } = vitals

    if (cls !== undefined && inp !== undefined && lcp !== undefined) {
      // Simple scoring algorithm based on Core Web Vitals thresholds
      let score = 100

      // LCP scoring (Good: ≤2.5s, Needs Improvement: ≤4s, Poor: >4s)
      if (lcp > 4000) score -= 40
      else if (lcp > 2500) score -= 20

      // INP scoring (Good: ≤200ms, Needs Improvement: ≤500ms, Poor: >500ms)
      if (inp > 500) score -= 30
      else if (inp > 200) score -= 15

      // CLS scoring (Good: ≤0.1, Needs Improvement: ≤0.25, Poor: >0.25)
      if (cls > 0.25) score -= 30
      else if (cls > 0.1) score -= 15

      setScore(Math.max(0, score))
    }
  }, [vitals])

  return {
    score,
    grade: getPerformanceGrade(score),
    vitals,
  }
}

function getPerformanceGrade(score: number | null): string {
  if (score === null) return 'N/A'
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}
