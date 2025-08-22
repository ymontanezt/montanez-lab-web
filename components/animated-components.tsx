'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { getOptimizedAnimationDuration, prefersReducedMotion } from '@/lib/config/performance'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  const getInitialState = () => {
    if (!shouldAnimate) return { opacity: 1, x: 0, y: 0 }

    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 }
      case 'down':
        return { opacity: 0, y: -30 }
      case 'left':
        return { opacity: 0, x: -30 }
      case 'right':
        return { opacity: 0, x: 30 }
      default:
        return { opacity: 0, y: 30 }
    }
  }

  const getAnimateState = () => {
    if (!shouldAnimate) return { opacity: 1, x: 0, y: 0 }

    switch (direction) {
      case 'up':
        return { opacity: 1, y: 0 }
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
        return { opacity: 1, x: 0 }
      case 'right':
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  const duration = getOptimizedAnimationDuration(600)

  return (
    <motion.div
      className={className}
      initial={getInitialState()}
      whileInView={shouldAnimate ? getAnimateState() : undefined}
      transition={{
        duration: shouldAnimate ? duration : 0,
        delay: shouldAnimate ? delay : 0,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedNav({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  const duration = getOptimizedAnimationDuration(600)

  return (
    <motion.nav
      initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: shouldAnimate ? duration : 0 }}
      className={className}
    >
      {children}
    </motion.nav>
  )
}

export function AnimatedHero({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  const duration = getOptimizedAnimationDuration(800)

  return (
    <motion.div
      className={className}
      initial={shouldAnimate ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: shouldAnimate ? duration : 0 }}
    >
      {children}
    </motion.div>
  )
}

// Componente para lazy loading de imágenes
export function LazyImage({
  src,
  alt,
  className = '',
  placeholder = '/placeholder-logo.svg',
}: {
  src: string
  alt: string
  className?: string
  placeholder?: string
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    let isSubscribed = true

    if (imageRef && imageSrc === placeholder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting && isSubscribed) {
                setImageSrc(src)
                observer.unobserve(imageRef)
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '50px',
          }
        )
        observer.observe(imageRef)
      } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        setImageSrc(src)
      }
    }

    return () => {
      isSubscribed = false
      if (observer) {
        observer.disconnect()
      }
    }
  }, [src, imageRef, imageSrc, placeholder])

  return <img ref={setImageRef} src={imageSrc} alt={alt} className={className} loading="lazy" />
}
