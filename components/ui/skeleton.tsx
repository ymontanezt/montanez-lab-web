import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
}

export function Skeleton({ className, width, height, variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  }

  const style = {
    width: width,
    height: height,
  }

  return <div className={cn(baseClasses, variantClasses[variant], className)} style={style} />
}

// Skeleton especializados
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" className={i === lines - 1 ? 'w-3/4' : 'w-full'} />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton variant="rounded" className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-6 w-3/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export function AvatarSkeleton({ size = 40, className }: { size?: number; className?: string }) {
  return <Skeleton variant="circular" width={size} height={size} className={className} />
}

export function GallerySkeleton({ items = 6, className }: { items?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton key={i} variant="rounded" className="aspect-square w-full" />
      ))}
    </div>
  )
}

// Skeleton para servicios
export function ServicesSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center space-x-4">
            <Skeleton variant="avatar" className="h-12 w-12" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="mt-4 flex gap-2">
            <Skeleton variant="button" />
            <Skeleton variant="button" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Skeleton para testimonios
export function TestimonialsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center space-x-4">
            <Skeleton variant="avatar" className="h-12 w-12" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <div key={starIndex} className="h-4 w-4 rounded bg-yellow-300/50" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Skeleton para el equipo
export function TeamSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="group text-center">
          <div className="relative mx-auto mb-4">
            <Skeleton variant="image" className="h-48 w-48 rounded-full" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-gray-300/50 to-transparent dark:from-gray-600/50" />
          </div>
          <div className="space-y-2">
            <Skeleton className="mx-auto h-5 w-3/4" />
            <Skeleton className="mx-auto h-4 w-1/2" />
            <Skeleton className="mx-auto h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
