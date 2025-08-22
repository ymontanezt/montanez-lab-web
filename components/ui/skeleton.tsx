import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button' | 'image'
  lines?: number
}

export function Skeleton({ className, variant = 'default', lines = 1 }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded'

  if (variant === 'card') {
    return (
      <div className={cn('space-y-4 p-6', className)}>
        <div className="flex items-center space-x-4">
          <div className={cn('h-12 w-12 rounded-full', baseClasses)} />
          <div className="flex-1 space-y-2">
            <div className={cn('h-4 w-3/4', baseClasses)} />
            <div className={cn('h-3 w-1/2', baseClasses)} />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn('h-3', i === 0 ? 'w-full' : i === 1 ? 'w-5/6' : 'w-4/6', baseClasses)}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'text') {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn('h-4', i === 0 ? 'w-full' : i === 1 ? 'w-5/6' : 'w-4/6', baseClasses)}
          />
        ))}
      </div>
    )
  }

  if (variant === 'avatar') {
    return <div className={cn('h-12 w-12 rounded-full', baseClasses, className)} />
  }

  if (variant === 'button') {
    return <div className={cn('h-10 w-24 rounded-lg', baseClasses, className)} />
  }

  if (variant === 'image') {
    return <div className={cn('aspect-square rounded-lg', baseClasses, className)} />
  }

  return <div className={cn('h-4 w-full', baseClasses, className)} />
}

// Skeleton específico para la galería
export function GallerySkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
          <div className="relative aspect-square">
            <Skeleton variant="image" className="h-full w-full" />
            {/* Overlay skeleton */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent dark:from-gray-600/50" />
            {/* Badge skeleton */}
            <div className="absolute top-3 left-3">
              <div className="h-6 w-20 rounded-full bg-white/80 dark:bg-gray-800/80" />
            </div>
            {/* Content skeleton */}
            <div className="absolute right-0 bottom-0 left-0 space-y-2 p-4">
              <div className="h-5 w-3/4 rounded bg-white/80 dark:bg-gray-800/80" />
              <div className="h-3 w-1/2 rounded bg-white/80 dark:bg-gray-800/80" />
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-full bg-green-500/80" />
                <div className="h-6 w-20 rounded-full bg-green-500/80" />
              </div>
            </div>
          </div>
        </div>
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
