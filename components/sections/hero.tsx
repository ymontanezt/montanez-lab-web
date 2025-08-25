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
    autoPlay ? autoPlayInterval : undefined
  )

  // State for swipe feedback
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay || !isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isPlaying, slides.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(autoPlay)

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPlaying(false)
    // Resume auto-play after manual navigation
    setTimeout(() => setIsPlaying(autoPlay), 3000)
  }

  const goToNext = () => {
    if (isMobile) {
      setSwipeDirection('left')
      setTimeout(() => setSwipeDirection(null), 1000)
      triggerHapticFeedback()
    }
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const goToPrevious = () => {
    if (isMobile) {
      setSwipeDirection('right')
      setTimeout(() => setSwipeDirection(null), 1000)
      triggerHapticFeedback()
    }
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))
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
              <div className="from-primary-100 to-primary-200 flex h-full w-full items-center justify-center bg-gradient-to-r">
                <span className="text-primary-400 text-8xl">🦷</span>
              </div>
            )}

            {/* Fondo oscuro mejorado para mayor contraste de textos */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
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
                <div className="flex flex-col items-center gap-2">
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
                  <span className="text-center text-xs text-white/80">Ver video promocional</span>
                </div>
              )}
            </motion.div>

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
            onClick={() => goToSlide(idx)}
            className={cn(
              'h-3 w-3 rounded-full border-2 border-white transition-all duration-200',
              currentSlide === idx ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}

        {/* Mobile hint for touch gestures */}
        {/* 
          En móvil se muestra un indicador de que se puede deslizar
          para navegar entre slides, ya que los botones están ocultos
        */}
        {isMobile && slides.length > 1 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-3 w-3 text-white/50" />
              <div className="flex gap-1">
                <div className="h-1 w-1 rounded-full bg-white/50"></div>
                <div className="h-1 w-1 rounded-full bg-white/50"></div>
                <div className="h-1 w-1 rounded-full bg-white/50"></div>
              </div>
              <ChevronRight className="h-3 w-3 text-white/50" />
            </div>
          </div>
        )}
      </div>

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
