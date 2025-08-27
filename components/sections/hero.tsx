// Hero section component
// Reusable hero section with carousel and call-to-action

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HeroSlide } from '@/types'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens, componentColors } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import { ChevronLeft, ChevronRight, Play, ExternalLink, ArrowRight, Sparkles } from 'lucide-react'
import { VideoModal } from '@/components/ui/video-modal'
import { useIsMobile } from '@/hooks/use-mobile'
import { useCarouselGestures } from '@/hooks/use-touch-gestures'
import Link from 'next/link'

// Estilos CSS para el carrusel horizontal móvil
const mobileCarouselStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .hero-carousel-mobile {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  .hero-slide-mobile {
    scroll-snap-align: start;
  }
`

interface HeroProps {
  slides: HeroSlide[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showStats?: boolean
  showPlayButton?: boolean
  variant?: 'default' | 'minimal' | 'fullscreen'
}

export const Hero: React.FC<HeroProps> = ({
  slides,
  className,
  autoPlay = true,
  autoPlayInterval = 6000,
  showStats = true,
  showPlayButton = true,
  variant = 'default',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const isMobile = useIsMobile()

  // Touch gestures for mobile carousel navigation
  // Permite navegación por gestos táctiles en dispositivos móviles
  const { bind: carouselBind, style: carouselStyle } = useCarouselGestures(
    slides.length,
    index => {
      setCurrentSlide(index)
      setIsPlaying(false)
      // Resume auto-play after manual navigation
      setTimeout(() => setIsPlaying(autoPlay), 3000)
    },
    undefined // Deshabilitar auto-play del hook para evitar conflictos
  )

  // Función para sincronizar el carrusel móvil con el auto-play
  const syncMobileCarousel = (slideIndex: number) => {
    if (!isMobile || typeof window === 'undefined') return

    const carousel = document.querySelector('.hero-carousel-mobile') as HTMLElement
    if (carousel) {
      const slideWidth = carousel.clientWidth
      const targetScrollLeft = slideIndex * slideWidth
      
      // Scroll instantáneo para evitar problemas de sincronización
      carousel.scrollLeft = targetScrollLeft
    }
  }

  // Función para sincronizar el scroll horizontal con el estado del carousel
  const handleScrollSync = (event: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return

    const target = event.target as HTMLDivElement
    const scrollLeft = target.scrollLeft
    const slideWidth = target.clientWidth
    const newSlideIndex = Math.round(scrollLeft / slideWidth)

    // Solo actualizar si el índice cambió y es válido
    if (newSlideIndex !== currentSlide && newSlideIndex >= 0 && newSlideIndex < slides.length) {
      setCurrentSlide(newSlideIndex)
      setIsPlaying(false)
      
      // Resume auto-play after manual navigation
      setTimeout(() => setIsPlaying(autoPlay), 3000)
    }

    // Verificar si llegamos al final del carousel
    const isAtEnd = scrollLeft >= (target.scrollWidth - target.clientWidth - 10)
    if (isAtEnd) {
      handleMobileCarouselEnd()
    }
  }

  // State for swipe feedback
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [isRestarting, setIsRestarting] = useState(false)

  // Función para manejar gestos táctiles en móvil
  const handleMobileSwipe = (direction: 'left' | 'right') => {
    if (!isMobile) return

    setSwipeDirection(direction)
    setTimeout(() => setSwipeDirection(null), 1000)
    triggerHapticFeedback()

    if (direction === 'left') {
      // Swipe izquierda = siguiente slide
      const newSlideIndex = (currentSlide + 1) % slides.length
      setCurrentSlide(newSlideIndex)
      syncMobileCarousel(newSlideIndex)
      
      // Si llegamos al final, reiniciar automáticamente
      if (newSlideIndex === 0) {
        setTimeout(() => {
          handleMobileCarouselEnd()
        }, 1000) // Pequeña pausa antes de reiniciar
      }
    } else {
      // Swipe derecha = slide anterior
      const newSlideIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
      setCurrentSlide(newSlideIndex)
      syncMobileCarousel(newSlideIndex)
    }

    // Pausar auto-play temporalmente
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(autoPlay), 3000)
  }

  // Auto-advance carousel with auto-restart
  useEffect(() => {
    if (!autoPlay || !isPlaying) return

    const interval = setInterval(() => {
      const newSlideIndex = (currentSlide + 1) % slides.length
      setCurrentSlide(newSlideIndex)
      // Sincronizar con el carrusel móvil
      syncMobileCarousel(newSlideIndex)
      
      // Si llegamos al final, pausar brevemente antes de reiniciar
      if (newSlideIndex === 0) {
        setIsPlaying(false)
        setTimeout(() => setIsPlaying(true), 1000) // Pausa de 1 segundo antes de reiniciar
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isPlaying, slides.length, currentSlide])

  // Función para auto-reiniciar el carousel móvil cuando llegue al final
  const handleMobileCarouselEnd = () => {
    if (!isMobile) return

    const carousel = document.querySelector('.hero-carousel-mobile') as HTMLElement
    if (carousel) {
      const isAtEnd = carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth - 10)
      
      if (isAtEnd) {
        setIsRestarting(true)
        // Reiniciar al inicio con animación suave
        setTimeout(() => {
          carousel.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
          setCurrentSlide(0)
          setIsRestarting(false)
        }, 500) // Pequeña pausa antes de reiniciar
      }
    }
  }

  // Sincronizar carrusel móvil cuando cambie currentSlide
  useEffect(() => {
    if (isMobile) {
      syncMobileCarousel(currentSlide)
    }
  }, [currentSlide, isMobile])

  // Inicializar el carrusel móvil en la posición correcta
  useEffect(() => {
    if (isMobile && typeof window !== 'undefined') {
      // Asegurar que el carrusel esté en la posición inicial
      const carousel = document.querySelector('.hero-carousel-mobile') as HTMLElement
      if (carousel) {
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
          carousel.scrollLeft = 0
        }, 100)
      }
    }
  }, [isMobile])

  // Pause auto-play on hover (solo en desktop)
  const handleMouseEnter = () => !isMobile && setIsPlaying(false)
  const handleMouseLeave = () => !isMobile && setIsPlaying(autoPlay)

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPlaying(false)
    // Resume auto-play after manual navigation
    setTimeout(() => setIsPlaying(autoPlay), 3000)
    // Sincronizar carrusel móvil
    syncMobileCarousel(index)
  }

  const goToNext = () => {
    if (isMobile) {
      setSwipeDirection('left')
      setTimeout(() => setSwipeDirection(null), 1000)
      triggerHapticFeedback()
    }
    const newSlideIndex = (currentSlide + 1) % slides.length
    setCurrentSlide(newSlideIndex)
    // Sincronizar carrusel móvil
    syncMobileCarousel(newSlideIndex)
    
    // Si llegamos al final, reiniciar automáticamente
    if (newSlideIndex === 0) {
      setTimeout(() => {
        handleMobileCarouselEnd()
      }, 1000) // Pequeña pausa antes de reiniciar
    }
  }

  const goToPrevious = () => {
    if (isMobile) {
      setSwipeDirection('right')
      setTimeout(() => setSwipeDirection(null), 1000)
      triggerHapticFeedback()
    }
    const newSlideIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    setCurrentSlide(newSlideIndex)
    // Sincronizar carrusel móvil
    syncMobileCarousel(newSlideIndex)
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  // Scroll to services section
  const scrollToServices = () => {
    const element = document.getElementById('servicios')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Open YouTube video modal
  const openYouTubeVideo = () => {
    setIsVideoModalOpen(true)
  }

  // Haptic feedback for mobile devices
  const triggerHapticFeedback = () => {
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(50) // Short vibration for feedback
    }
  }

  // Hero variants
  const heroVariants = {
    default: 'min-h-[60vh] md:min-h-screen',
    minimal: 'min-h-[50vh] md:min-h-[70vh]',
    fullscreen: 'min-h-screen',
  }

  const contentVariants = {
    default: 'max-w-2xl',
    minimal: 'max-w-xl',
    fullscreen: 'max-w-4xl',
  }

  if (!slides.length) return null

  return (
    <section
      id="inicio"
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        heroVariants[variant],
        className
      )}
      role="banner"
      aria-label="Sección principal"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Estilos CSS para el carrusel móvil */}
      <style jsx>{mobileCarouselStyles}</style>
      {/* Background Images */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Swipe Direction Indicator */}
        {isMobile && swipeDirection && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={cn(
                'flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm',
                swipeDirection === 'left' ? 'mr-8 ml-auto' : 'mr-auto ml-8'
              )}
            >
              <span className="text-sm font-medium">
                {swipeDirection === 'left' ? 'Siguiente' : 'Anterior'}
              </span>
              {swipeDirection === 'left' ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </div>
          </motion.div>
        )}

        {/* Carrusel horizontal para móvil */}
        {isMobile ? (
          <div
            className="hero-carousel-mobile scrollbar-hide flex h-full w-full overflow-x-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onScroll={handleScrollSync}
          >
            {/* Indicador de reinicio */}
            {isRestarting && (
              <div className="absolute top-4 right-4 z-20 rounded-full bg-teal-500/90 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
                🔄 Reiniciando...
              </div>
            )}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="hero-slide-mobile relative h-full w-full flex-shrink-0"
                style={{ width: '100vw' }}
              >
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={85}
                    sizes="100vw"
                    onError={e => {
                      const target = e.target as HTMLImageElement
                      target.src = '/logo-placeholder.svg'
                    }}
                  />
                ) : (
                  <div className="from-primary-100 to-primary-200 flex h-full w-full items-center justify-center bg-gradient-to-r dark:from-teal-900/30 dark:to-teal-800/30">
                    <span className="text-primary-400 text-8xl drop-shadow-lg dark:text-teal-400 dark:drop-shadow-2xl">🦷</span>
                  </div>
                )}

                {/* Fondo oscuro mejorado para mayor contraste de textos */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/50 dark:via-black/40 dark:to-black/60"
                  aria-hidden="true"
                />

                {/* Solo imagen y overlay - sin contenido duplicado */}
              </div>
            ))}
          </div>
        ) : (
          /* Versión desktop con AnimatePresence */
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {slides[currentSlide].image ? (
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  fill
                  className="object-cover"
                  priority={currentSlide === 0}
                  quality={85}
                  sizes="100vw"
                  onError={e => {
                    const target = e.target as HTMLImageElement
                    target.src = '/logo-placeholder.svg'
                  }}
                />
              ) : (
                <div className="from-primary-100 to-primary-200 flex h-full w-full items-center justify-center bg-gradient-to-r dark:from-teal-900/30 dark:to-teal-800/30">
                  <span className="text-primary-400 text-8xl drop-shadow-lg dark:text-teal-400 dark:drop-shadow-2xl">🦷</span>
                </div>
              )}

              {/* Fondo oscuro mejorado para mayor contraste de textos */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/50 dark:via-black/40 dark:to-black/60"
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Hero Content */}
      <div
        {...(isMobile ? carouselBind() : {})}
        className={cn(
          'relative z-10 mx-auto flex w-full flex-col items-center px-4 py-6 text-center md:py-12',
          contentVariants[variant],
          isMobile && 'cursor-grab select-none active:cursor-grabbing'
        )}
      >
        <div className="relative flex w-full flex-col items-center gap-2 text-center md:w-auto md:gap-4">
          <div className="relative flex w-full flex-col items-center gap-2 px-4 py-4 text-center md:w-auto md:gap-3 md:px-6 md:py-8">
            {isMobile ? (
              // Versión sin animaciones para móvil
              <>
                <h2
                  className="mb-2 text-2xl font-bold text-white md:mb-4 md:text-4xl lg:text-5xl"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  {slides[currentSlide].title}
                </h2>

                <p
                  className="mb-2 text-base font-semibold text-white md:mb-4 md:text-xl lg:text-2xl"
                  style={{
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {slides[currentSlide].subtitle}
                </p>

                {slides[currentSlide].description && (
                  <p
                    className="mb-4 hidden text-sm leading-relaxed text-white sm:inline-block md:mb-8 md:text-lg"
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  >
                    {slides[currentSlide].description}
                  </p>
                )}

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className={`group px-8 py-3 text-base font-bold text-white shadow-lg md:text-lg ${componentColors.button.primary.background} ${componentColors.button.primary.text} ${componentColors.button.primary.border} ${componentColors.button.primary.focus}`}
                    onClick={scrollToServices}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {slides[currentSlide].cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Botón de video mejorado con mejor contraste */}
                  {showPlayButton && slides[currentSlide].videoUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="group h-14 w-14 rounded-full border-2 border-white/60 bg-transparent p-0 text-white shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2"
                      onClick={openYouTubeVideo}
                      aria-label="Ver video en YouTube"
                      title="Ver video promocional"
                    >
                      <Play className="ml-1 h-6 w-6" />
                    </Button>
                  )}
                </div>
              </>
            ) : (
              // Versión con animaciones para desktop
              <>
                <AnimatePresence>
                  <motion.h2
                    key={`title-${currentSlide}`}
                    className="mb-2 text-2xl font-bold text-white md:mb-4 md:text-4xl lg:text-5xl"
                    style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {slides[currentSlide].title}
                  </motion.h2>
                </AnimatePresence>

                <AnimatePresence>
                  <motion.p
                    key={`subtitle-${currentSlide}`}
                    className="mb-2 text-base font-semibold text-white md:mb-4 md:text-xl lg:text-2xl"
                    style={{
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                </AnimatePresence>

                <AnimatePresence>
                  <motion.p
                    key={`description-${currentSlide}`}
                    className="mb-4 hidden text-sm leading-relaxed text-white sm:inline-block md:mb-8 md:text-lg"
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <Button
                    size="lg"
                    className={`group px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 md:text-lg ${componentColors.button.primary.background} ${componentColors.button.primary.text} ${componentColors.button.primary.border} ${componentColors.button.primary.focus}`}
                    onClick={scrollToServices}
                  >
                    <Sparkles className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
                    {slides[currentSlide].cta}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>

                  {/* Botón de video mejorado con mejor contraste */}
                  {showPlayButton && slides[currentSlide].videoUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="group h-14 w-14 rounded-full border-2 border-white/60 bg-transparent p-0 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/30 focus:ring-2 focus:ring-white focus:ring-offset-2"
                      onClick={openYouTubeVideo}
                      aria-label="Ver video en YouTube"
                      title="Ver video promocional"
                    >
                      <Play className="ml-1 h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                    </Button>
                  )}
                </motion.div>
              </>
            )}

            {/* Stats - only on desktop */}
            {showStats && slides[currentSlide].stats && (
              <motion.div
                className="mt-6 hidden justify-center gap-6 md:flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center">
                    <span className="text-lg font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                      {value}
                    </span>
                    <span className="text-xs font-medium text-white/90 capitalize drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                      {key}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              goToSlide(idx)
              // En móvil, también hacer scroll al slide correspondiente
              if (isMobile) {
                const carousel = document.querySelector('.hero-carousel-mobile') as HTMLElement
                if (carousel) {
                  carousel.scrollTo({
                    left: idx * carousel.clientWidth,
                    behavior: 'smooth',
                  })
                }
              }
            }}
            className={cn(
              'h-3 w-3 rounded-full border-2 border-white transition-all duration-200',
              currentSlide === idx ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Indicador de swipe en móvil */}
      {isMobile && swipeDirection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <ChevronRight 
              className={cn(
                "h-8 w-8 text-white transition-transform",
                swipeDirection === 'left' ? "rotate-0" : "rotate-180"
              )} 
            />
          </div>
        </motion.div>
      )}

      {/* Navigation buttons - Hidden on mobile for touch gestures */}
      {/* 
        Los botones de navegación se ocultan en móvil para permitir:
        1. Scroll horizontal nativo por gestos táctiles
        2. Mejor experiencia de usuario en dispositivos móviles
        3. Evitar superposición con controles táctiles
        4. Navegación por swipe con feedback visual y háptico
      */}
      {!isMobile && (
        <>
          <button
            onClick={goToPrevious}
            onKeyDown={e => handleKeyDown(e, goToPrevious)}
            className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            onKeyDown={e => handleKeyDown(e, goToNext)}
            className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={slides[currentSlide].videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
        title={`${slides[currentSlide].title} - Montañez Lab`}
        description={slides[currentSlide].description}
      />
    </section>
  )
}

export default Hero
