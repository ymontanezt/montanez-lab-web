'use client'

import { useGesture } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'
import { useState, useCallback, useEffect } from 'react'

interface UseTouchGesturesOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onPinch?: (scale: number) => void
  onDoubleTap?: () => void
  minPinchScale?: number
  maxPinchScale?: number
  swipeThreshold?: number
}

export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onPinch,
  onDoubleTap,
  minPinchScale = 0.5,
  maxPinchScale = 3,
  swipeThreshold = 50,
}: UseTouchGesturesOptions = {}) {
  const [{ scale, rotation }, api] = useSpring(() => ({
    scale: 1,
    rotation: 0,
  }))

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
        // Solo detectar swipes horizontales rápidos
        if (!down && Math.abs(mx) > swipeThreshold && Math.abs(vx) > 0.5) {
          if (xDir > 0 && onSwipeRight) {
            onSwipeRight()
          } else if (xDir < 0 && onSwipeLeft) {
            onSwipeLeft()
          }
        }
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s], memo }) => {
        if (first) {
          const { width, height, top, left } = memo ?? { width: 0, height: 0, top: 0, left: 0 }
          const tx = ox - (left + width / 2)
          const ty = oy - (top + height / 2)
          memo = [tx, ty]
        }

        const newScale = Math.max(minPinchScale, Math.min(maxPinchScale, s))
        api.start({ scale: newScale })
        onPinch?.(newScale)
        return memo
      },
      onDoubleClick: () => {
        onDoubleTap?.()
        // Reset scale on double tap
        api.start({ scale: 1, rotation: 0 })
      },
    },
    {
      drag: {
        filterTaps: true,
        threshold: 10,
      },
      pinch: {
        scaleBounds: { min: minPinchScale, max: maxPinchScale },
        rubberband: true,
      },
    }
  )

  const reset = useCallback(() => {
    api.start({ scale: 1, rotation: 0 })
  }, [api])

  return {
    bind,
    style: { scale, rotation },
    reset,
    animated,
  }
}

// Hook específico para galería con navegación
export function useGalleryGestures(
  currentIndex: number,
  totalItems: number,
  onNext: () => void,
  onPrevious: () => void,
  onClose?: () => void
) {
  const [isZoomed, setIsZoomed] = useState(false)

  const gestures = useTouchGestures({
    onSwipeLeft: () => {
      if (!isZoomed && currentIndex < totalItems - 1) {
        onNext()
      }
    },
    onSwipeRight: () => {
      if (!isZoomed && currentIndex > 0) {
        onPrevious()
      }
    },
    onPinch: scale => {
      setIsZoomed(scale > 1.1)
    },
    onDoubleTap: () => {
      setIsZoomed(false)
    },
  })

  return {
    ...gestures,
    isZoomed,
    canSwipe: !isZoomed,
  }
}

// Hook para carrusel con autoplay
export function useCarouselGestures(
  itemCount: number,
  onChangeIndex: (index: number) => void,
  autoPlayInterval?: number
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    const newIndex = (currentIndex + 1) % itemCount
    setCurrentIndex(newIndex)
    onChangeIndex(newIndex)
  }, [currentIndex, itemCount, onChangeIndex])

  const previous = useCallback(() => {
    const newIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    onChangeIndex(newIndex)
  }, [currentIndex, itemCount, onChangeIndex])

  const gestures = useTouchGestures({
    onSwipeLeft: next,
    onSwipeRight: previous,
  })

  // Auto-play logic
  useEffect(() => {
    if (!autoPlayInterval || isPaused) return

    const interval = setInterval(() => {
      if (!isPaused) {
        next()
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlayInterval, isPaused, next])

  return {
    ...gestures,
    currentIndex,
    next,
    previous,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    isPaused,
  }
}
