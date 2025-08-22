'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/design-system/utilities'

interface ScrollToTopProps {
  className?: string
  threshold?: number
  variant?: 'default' | 'floating' | 'minimal'
}

export function ScrollToTop({ className, threshold = 300, variant = 'default' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const variants = {
    default: 'fixed bottom-6 right-6 z-40',
    floating: 'fixed bottom-6 right-6 z-40 shadow-2xl',
    minimal: 'fixed bottom-6 right-6 z-40',
  }

  const buttonVariants = {
    default:
      'w-12 h-12 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors',
    floating:
      'w-14 h-14 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full hover:bg-primary-50 dark:hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl',
    minimal:
      'w-10 h-10 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors',
  }

  const iconSizes = {
    default: 'w-6 h-6',
    floating: 'w-7 h-7',
    minimal: 'w-5 h-5',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={scrollToTop}
          className={cn(
            'focus:ring-primary-500 flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:outline-none',
            variants[variant],
            buttonVariants[variant],
            className
          )}
          aria-label="Volver al inicio"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className={iconSizes[variant]} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
