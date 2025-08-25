'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Service } from '@/types'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens, utilityClasses } from '@/lib/design-system/color-tokens'
import {
  Microscope,
  Shield,
  Zap,
  Award,
  Users,
  Clock,
  Heart,
  Star,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

interface ServicesCarouselProps {
  services: Service[]
  className?: string
  showBadge?: boolean
  showFeatures?: boolean
  showBenefits?: boolean
  maxDisplayed?: number
}

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<any>> = {
  Microscope: Microscope,
  Shield: Shield,
  Zap: Zap,
  Award: Award,
  Users: Users,
  Clock: Clock,
  Heart: Heart,
  Star: Star,
  Target: Target,
  TrendingUp: TrendingUp,
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  services,
  className,
  showBadge = true,
  showFeatures = true,
  showBenefits = false,
  maxDisplayed,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Filter and limit services
  const displayServices = maxDisplayed ? services.slice(0, maxDisplayed) : services
  const totalServices = displayServices.length

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalServices > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalServices)
      }, 5000) // Change every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, totalServices])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setVisibleCount(1) // Mobile: 1 service
        } else if (window.innerWidth < 1024) {
          setVisibleCount(2) // Tablet: 2 services
        } else {
          setVisibleCount(3) // Desktop: 3 services
        }
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalServices)
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + totalServices) % totalServices)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const maxIndex = Math.max(0, totalServices - visibleCount)

  if (!displayServices.length) {
    return (
      <div className={cn('py-12 text-center', className)}>
        <p className="text-muted-foreground">No se encontraron servicios.</p>
      </div>
    )
  }

  return (
    <section
      id="servicios"
      className={cn('py-16 md:py-20', className)}
      aria-label="Nuestros servicios"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {showBadge && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary/10 text-primary mb-4 inline-flex items-center rounded-full px-4 py-2 text-sm">
              <Microscope className="mr-2 h-4 w-4" />
              Servicios Especializados
            </div>
            <h2
              className={cn(
                'mb-4 text-3xl font-bold md:text-4xl lg:text-5xl',
                colorTokens.text.primary
              )}
            >
              Soluciones Dentales Integrales
            </h2>
            <p className={cn('mx-auto max-w-3xl text-lg', colorTokens.text.muted)}>
              Ofrecemos una amplia gama de servicios dentales con tecnología de vanguardia para
              garantizar la mejor calidad y resultados excepcionales.
            </p>
          </motion.div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalServices > visibleCount && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 hover:bg-background absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full border-2 border-gray-200 shadow-lg backdrop-blur-sm hover:border-gray-300"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 hover:bg-background absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full border-2 border-gray-200 shadow-lg backdrop-blur-sm hover:border-gray-300"
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Services Carousel */}
          <div ref={carouselRef} className="overflow-hidden">
            <motion.div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {displayServices.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Microscope

                return (
                  <motion.div
                    key={service.id}
                    className="w-full flex-shrink-0"
                    style={{ width: `${100 / visibleCount}%` }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        'group h-full border-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl',
                        colorTokens.background.card
                      )}
                    >
                      <div className="p-6">
                        {/* Service Icon */}
                        <div
                          className={cn(
                            'mb-4 flex h-16 w-16 items-center justify-center rounded-xl',
                            service.color
                          )}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>

                        {/* Service Title */}
                        <h3 className={cn('mb-3 text-xl font-semibold', colorTokens.text.primary)}>
                          {service.title}
                        </h3>

                        {/* Service Description */}
                        <p className={cn('mb-4 text-sm leading-relaxed', colorTokens.text.muted)}>
                          {service.shortDescription}
                        </p>

                        {/* Features */}
                        {showFeatures && service.features && (
                          <div className="mb-4 space-y-2">
                            {service.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className={cn('text-xs', colorTokens.text.muted)}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Benefits */}
                        {showBenefits && service.benefits && (
                          <div className="mb-4 space-y-2">
                            {service.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className={cn('text-xs', colorTokens.text.muted)}>
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action Button */}
                        <div className="mt-auto">
                          <Button asChild className="group-hover:bg-primary-600 w-full" size="sm">
                            <Link
                              href={`/servicios/${service.slug}`}
                              className="flex items-center justify-center gap-2"
                            >
                              Ver Detalles
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Dots Indicators */}
          {totalServices > visibleCount && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'h-3 w-3 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Ir al servicio ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ServicesCarousel
