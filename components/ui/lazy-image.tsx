import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useImageLazyLoading } from '@/hooks/use-intersection-observer'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  placeholder?: 'blur' | 'shimmer' | 'pulse' | 'none'
  priority?: boolean
  sizes?: string
  quality?: number
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  placeholder = 'shimmer',
  priority = false,
  sizes,
  quality = 75,
  onLoad,
  onError,
  fallbackSrc = '/gallery-placeholder.svg',
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { ref, isVisible } = useImageLazyLoading()
  const imageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Cargar imagen cuando sea visible
  useEffect(() => {
    if (isVisible && !isLoaded && !hasError) {
      setImageSrc(src)
    }
  }, [isVisible, src, isLoaded, hasError])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(false)
    } else {
      setHasError(true)
    }
    onError?.()
  }

  // Placeholder shimmer
  const shimmerPlaceholder = (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
      <div className="animate-shimmer h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )

  // Placeholder pulse
  const pulsePlaceholder = (
    <div className="absolute inset-0 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
  )

  // Placeholder blur
  const blurPlaceholder = <div className="absolute inset-0 rounded bg-gray-200 dark:bg-gray-700" />

  const renderPlaceholder = () => {
    switch (placeholder) {
      case 'shimmer':
        return shimmerPlaceholder
      case 'pulse':
        return pulsePlaceholder
      case 'blur':
        return blurPlaceholder
      default:
        return null
    }
  }

  if (hasError) {
    return (
      <div
        ref={imageRef}
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600',
          fill ? 'h-full w-full' : `w-${width} h-${height}`,
          className
        )}
      >
        <span className="text-2xl">🖼️</span>
      </div>
    )
  }

  return (
    <div
      ref={imageRef}
      className={cn('relative overflow-hidden', fill ? 'h-full w-full' : '', className)}
    >
      {/* Placeholder */}
      {!isLoaded && renderPlaceholder()}

      {/* Imagen */}
      {isVisible && (
        <Image
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={cn('transition-opacity duration-300', isLoaded ? 'opacity-100' : 'opacity-0')}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Overlay de carga */}
      {!isLoaded && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-green-600" />
        </div>
      )}
    </div>
  )
}

// Componente específico para imágenes de la galería
export function GalleryLazyImage({
  src,
  alt,
  className,
  ...props
}: Omit<LazyImageProps, 'fill' | 'placeholder'>) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      fill
      placeholder="shimmer"
      className={cn('aspect-square', className)}
      {...props}
    />
  )
}

// Componente específico para avatares
export function AvatarLazyImage({
  src,
  alt,
  className,
  ...props
}: Omit<LazyImageProps, 'fill' | 'placeholder'>) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      fill
      placeholder="pulse"
      className={cn('rounded-full', className)}
      {...props}
    />
  )
}

// Componente específico para imágenes de hero
export function HeroLazyImage({
  src,
  alt,
  className,
  ...props
}: Omit<LazyImageProps, 'fill' | 'placeholder'>) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      fill
      placeholder="blur"
      priority
      className={cn('object-cover', className)}
      {...props}
    />
  )
}
