// Services section component
// Reusable services section with grid layout and cards

'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { ServicesSkeleton } from '@/components/ui/skeleton'

interface ServicesProps {
  services: Service[]
  className?: string
  variant?: 'default' | 'grid' | 'list'
  showBadge?: boolean
  showFeatures?: boolean
  showBenefits?: boolean
  maxDisplayed?: number
  category?: string
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

export const Services: React.FC<ServicesProps> = ({
  services,
  className,
  variant = 'default',
  showBadge = true,
  showFeatures = true,
  showBenefits = false,
  maxDisplayed,
  category,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  // Filter services if category is specified
  const filteredServices = category
    ? services.filter(service => service.category === category)
    : services

  // Limit displayed services if maxDisplayed is specified
  const displayServices = maxDisplayed ? filteredServices.slice(0, maxDisplayed) : filteredServices

  // Simular loading para mostrar skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // 1.2 segundos de loading

    return () => clearTimeout(timer)
  }, [])

  // Variants
  const variants = {
    default: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    list: 'space-y-6',
  }

  const containerVariants = {
    default: 'container mx-auto px-4',
    grid: 'container mx-auto px-4',
    list: 'w-full',
  }

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
    >
      <div className={containerVariants[variant]}>
        {/* Section Header */}
        {showBadge && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Microscope className="mr-2 h-4 w-4" />
              Servicios Especializados
            </Badge>
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

        {/* Services Grid */}
        {isLoading ? (
          <ServicesSkeleton />
        ) : (
          <div className={variants[variant]}>
            {displayServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Microscope

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={cn(
                      'group h-full border-0 shadow-lg transition-all duration-300 hover:shadow-xl',
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
          </div>
        )}
      </div>
    </section>
  )
}

export default Services
