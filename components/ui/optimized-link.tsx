'use client'

import Link from 'next/link'
import { ReactNode, forwardRef } from 'react'
import { useOptimizedLink } from '@/lib/config/navigation'
import { cn } from '@/lib/design-system/utilities'

interface OptimizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  title?: string
  prefetch?: boolean
  onClick?: () => void
  [key: string]: any
}

export const OptimizedLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  ({ href, children, className, title, prefetch = true, onClick, ...props }, ref) => {
    const { onMouseEnter, onClick: handleClick } = useOptimizedLink(href)

    const handleClickCombined = () => {
      handleClick()
      onClick?.()
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={cn('transition-all duration-200 hover:opacity-80', className)}
        title={title}
        prefetch={prefetch}
        onMouseEnter={onMouseEnter}
        onClick={handleClickCombined}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

OptimizedLink.displayName = 'OptimizedLink'

// Componente específico para enlaces de servicios
export const ServiceLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <OptimizedLink
        ref={ref}
        href={href}
        className={cn(
          'group relative overflow-hidden rounded-lg transition-all duration-300',
          'hover:scale-105 hover:shadow-lg',
          className
        )}
        prefetch={true}
        {...props}
      >
        {children}
      </OptimizedLink>
    )
  }
)

ServiceLink.displayName = 'ServiceLink'

// Componente para enlaces de navegación principal
export const NavLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <OptimizedLink
        ref={ref}
        href={href}
        className={cn(
          'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
          'hover:text-primary focus:text-primary',
          'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0',
          'after:bg-primary after:transition-all after:duration-300',
          'hover:after:w-full focus:after:w-full',
          className
        )}
        prefetch={true}
        {...props}
      >
        {children}
      </OptimizedLink>
    )
  }
)

NavLink.displayName = 'NavLink'
