import { cn } from '@/lib/utils'

interface LoadingProps {
  className?: string
  variant?: 'default' | 'spinner' | 'dots' | 'pulse' | 'bars' | 'ripple'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
}

export function Loading({
  className,
  variant = 'default',
  size = 'md',
  text,
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  const renderSpinner = () => (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-green-600',
        sizeClasses[size],
        className
      )}
    />
  )

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={cn(
            'animate-bounce rounded-full bg-green-600',
            size === 'sm'
              ? 'h-2 w-2'
              : size === 'md'
                ? 'h-3 w-3'
                : size === 'lg'
                  ? 'h-4 w-4'
                  : 'h-5 w-5'
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className={cn('animate-pulse rounded-full bg-green-600', sizeClasses[size], className)} />
  )

  const renderBars = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          className={cn(
            'animate-pulse rounded-sm bg-green-600',
            size === 'sm'
              ? 'h-4 w-1'
              : size === 'md'
                ? 'h-6 w-1.5'
                : size === 'lg'
                  ? 'h-8 w-2'
                  : 'h-12 w-3'
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )

  const renderRipple = () => (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 animate-ping rounded-full bg-green-600 opacity-75" />
      <div className="relative h-full w-full rounded-full bg-green-600" />
    </div>
  )

  const renderContent = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner()
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'bars':
        return renderBars()
      case 'ripple':
        return renderRipple()
      default:
        return renderSpinner()
    }
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="text-center">
          {renderContent()}
          {text && (
            <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">{text}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {renderContent()}
      {text && <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  )
}

// Loading específico para páginas
export function PageLoading({ className }: { className?: string }) {
  return (
    <div className={cn('flex min-h-screen items-center justify-center', className)}>
      <div className="text-center">
        <div className="relative">
          {/* Logo animado */}
          <div className="relative mx-auto mb-6 h-20 w-20">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-green-500 to-green-600" />
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white dark:bg-gray-900">
              <span className="text-3xl">🦷</span>
            </div>
          </div>

          {/* Spinner */}
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-green-600" />
        </div>

        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">Cargando...</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Preparando tu experiencia</p>
      </div>
    </div>
  )
}

// Loading para secciones
export function SectionLoading({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-16', className)}>
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-green-600" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Cargando contenido...</p>
      </div>
    </div>
  )
}

// Loading para botones
export function ButtonLoading({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <span>Procesando...</span>
    </div>
  )
}
