import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  root?: Element | null
  freezeOnceVisible?: boolean
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>
  isIntersecting: boolean
  isVisible: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
  freezeOnceVisible = true,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const ref = useRef<HTMLElement>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries

      if (entry) {
        setEntry(entry)
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      }
    },
    [isVisible]
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [handleIntersection, threshold, rootMargin, root])

  return {
    ref,
    isIntersecting,
    isVisible,
    entry,
  }
}

// Hook específico para lazy loading de imágenes
export function useImageLazyLoading(options?: UseIntersectionObserverOptions) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  })

  return { ref, isVisible }
}

// Hook para lazy loading de componentes
export function useComponentLazyLoading(options?: UseIntersectionObserverOptions) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '100px',
    ...options,
  })

  return { ref, isVisible }
}

// Hook para lazy loading de secciones completas
export function useSectionLazyLoading(options?: UseIntersectionObserverOptions) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '200px',
    ...options,
  })

  return { ref, isVisible }
}

// Hook para lazy loading de listas
export function useListLazyLoading(options?: UseIntersectionObserverOptions) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '150px',
    ...options,
  })

  return { ref, isVisible }
}
