'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'

// Interfaces base para botones
interface BaseButtonProps {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

// Variantes especializadas de botones

interface GradientButtonProps extends BaseButtonProps {
  gradient?: 'primary' | 'secondary' | 'accent'
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradient = 'primary', children, ...props }, ref) => {
    const gradients = {
      primary:
        'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700',
      secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      accent:
        'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    }

    return (
      <Button
        ref={ref}
        className={cn(
          gradients[gradient],
          'text-white shadow-lg transition-all duration-300 hover:shadow-xl',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
GradientButton.displayName = 'GradientButton'

interface FloatingButtonProps extends BaseButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ className, position = 'bottom-right', children, ...props }, ref) => {
    const positions = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'top-right': 'fixed top-6 right-6',
      'top-left': 'fixed top-6 left-6',
    }

    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(positions[position], 'z-50')}
      >
        <Button
          ref={ref}
          className={cn(
            'h-14 w-14 rounded-full shadow-lg hover:shadow-xl',
            utilityClasses.button.primary,
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  }
)
FloatingButton.displayName = 'FloatingButton'

interface AnimatedButtonProps extends BaseButtonProps {
  animation?: 'bounce' | 'pulse' | 'wiggle' | 'glow'
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animation = 'bounce', children, ...props }, ref) => {
    const animations = {
      bounce: {
        whileHover: { y: -2 },
        whileTap: { y: 0 },
      },
      pulse: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        animate: { scale: [1, 1.02, 1] },
        transition: { duration: 2, repeat: Infinity },
      },
      wiggle: {
        whileHover: { rotate: [0, -3, 3, -3, 0] },
        transition: { duration: 0.5 },
      },
      glow: {
        whileHover: {
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
          scale: 1.02,
        },
      },
    }

    return (
      <motion.div {...animations[animation]}>
        <Button ref={ref} className={cn('transition-all duration-300', className)} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  }
)
AnimatedButton.displayName = 'AnimatedButton'

interface LoadingButtonProps extends BaseButtonProps {
  isLoading?: boolean
  loadingText?: string
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { className, isLoading = false, loadingText = 'Cargando...', children, disabled, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn('relative', className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </motion.div>
            <span className="invisible">{children}</span>
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)
LoadingButton.displayName = 'LoadingButton'

interface SocialButtonProps extends BaseButtonProps {
  platform: 'whatsapp' | 'facebook' | 'instagram' | 'twitter' | 'linkedin'
}

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, platform, children, ...props }, ref) => {
    const platformStyles = {
      whatsapp: 'bg-green-500 hover:bg-green-600 text-white',
      facebook: 'bg-blue-600 hover:bg-blue-700 text-white',
      instagram:
        'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
      twitter: 'bg-blue-400 hover:bg-blue-500 text-white',
      linkedin: 'bg-blue-700 hover:bg-blue-800 text-white',
    }

    const platformIcons = {
      whatsapp: '📱',
      facebook: '📘',
      instagram: '📷',
      twitter: '🐦',
      linkedin: '💼',
    }

    return (
      <Button
        ref={ref}
        className={cn(
          'flex items-center gap-2 transition-all duration-300',
          platformStyles[platform],
          className
        )}
        {...props}
      >
        <span className="text-lg">{platformIcons[platform]}</span>
        {children}
      </Button>
    )
  }
)
SocialButton.displayName = 'SocialButton'

// Los componentes ya están exportados individualmente arriba
