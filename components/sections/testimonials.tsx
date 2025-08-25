'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Testimonial } from '@/types'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens, componentColors } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { TestimonialsSkeleton } from '@/components/ui/skeleton'

interface TestimonialsProps {
  testimonials: Testimonial[]
  className?: string
  showTitle?: boolean
  maxItems?: number
}

export function Testimonials({
  testimonials,
  className,
  showTitle = true,
  maxItems = 3,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const displayTestimonials = testimonials.slice(0, maxItems)

  // Simular loading para mostrar skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 1 segundo de loading

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (displayTestimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === displayTestimonials.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [displayTestimonials.length])

  const goToNext = () => {
    setCurrentIndex(prev => (prev === displayTestimonials.length - 1 ? 0 : prev + 1))
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? displayTestimonials.length - 1 : prev - 1))
  }

  if (!displayTestimonials.length) return null

  const currentTestimonial = displayTestimonials[currentIndex]

  return (
    <section className={cn('py-16 md:py-20', className)}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Descubre por qué los profesionales confían en nuestro laboratorio
            </p>
          </motion.div>
        )}

        <div className="relative mx-auto max-w-5xl">
          {isLoading ? (
            <TestimonialsSkeleton />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative"
              >
                {/* Card principal */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl md:p-12 dark:bg-gray-900">
                  {/* Fondo decorativo */}
                  <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-teal-200 opacity-50 dark:from-blue-900/20 dark:to-teal-800/20" />
                  <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 opacity-50 dark:from-blue-900/20 dark:to-blue-800/20" />

                  {/* Icono de comillas */}
                  <div className="relative mb-6 flex justify-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg ${colorTokens.gradient.brand.primary}`}
                    >
                      <Quote className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Testimonio */}
                  <blockquote className="relative mb-8 text-center">
                    <p className="text-lg leading-relaxed font-medium text-gray-800 md:text-xl lg:text-2xl dark:text-gray-200">
                      "{currentTestimonial.text}"
                    </p>
                  </blockquote>

                  {/* Rating */}
                  <div className="mb-6 flex justify-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < (currentTestimonial.rating || 5)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Información del autor */}
                  <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
                    {/* Avatar */}
                    <div className="relative">
                      {currentTestimonial.image ? (
                        <div
                          className={`h-16 w-16 overflow-hidden rounded-full border-4 ${colorTokens.border.brand.light} dark:${colorTokens.border.brand.primary}`}
                        >
                          <img
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-full border-4 ${colorTokens.border.brand.light} ${colorTokens.background.brand.light} ${colorTokens.text.brand.accent} dark:${colorTokens.border.brand.primary} dark:${colorTokens.background.brand.muted} dark:${colorTokens.text.brand.accent}`}
                        >
                          <span className="text-xl font-bold">
                            {currentTestimonial.name?.charAt(0) || 'C'}
                          </span>
                        </div>
                      )}

                      {/* Badge de verificado */}
                      {currentTestimonial.isVerified && (
                        <div
                          className={`absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full text-white ${colorTokens.background.brand.accent}`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Información del autor */}
                    <div className="text-center md:text-left">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {currentTestimonial.name}
                      </h4>
                      <p
                        className={`text-sm font-medium ${colorTokens.text.brand.accent} dark:${colorTokens.text.brand.accent}`}
                      >
                        {currentTestimonial.role}
                      </p>
                      {currentTestimonial.clinic && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {currentTestimonial.clinic}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Controles de navegación */}
          {displayTestimonials.length > 1 && (
            <>
              {/* Botones de navegación */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={goToPrevious}
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 dark:bg-gray-800 dark:hover:bg-gray-700 ${colorTokens.hover.background.brand.light}`}
                  aria-label="Testimonio anterior"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>

                {/* Indicadores */}
                <div className="flex gap-2">
                  {displayTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        'h-3 w-3 rounded-full transition-all duration-300',
                        index === currentIndex
                          ? `scale-125 ${colorTokens.background.brand.primary} dark:${colorTokens.background.brand.accent}`
                          : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                      )}
                      aria-label={`Ir al testimonio ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 dark:bg-gray-800 dark:hover:bg-gray-700 ${colorTokens.hover.background.brand.light}`}
                  aria-label="Testimonio siguiente"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Información de navegación */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentIndex + 1} de {displayTestimonials.length} testimonios
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
