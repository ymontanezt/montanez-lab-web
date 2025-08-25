'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollDepthTrackerWithSuspense } from '@/components/analytics'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import {
  LaboratoryIcon,
  QualityIcon,
  ScannerIcon,
  ToothIcon,
} from '@/components/icons/dental-icons'
import {
  LazyHeroWrapper,
  LazyStatsWrapper,
  LazyGalleryWrapper,
  LazyTestimonialsWrapper,
  LazyTeamWrapper,
  LazyContactWrapper,
} from '@/components/lazy-components'
import { ServicesCarousel } from '@/components/ui/services-carousel'
import { LazyAppointmentSchedulerWrapper } from '@/components/lazy-components'
import { LazyWhatsAppChatWrapper } from '@/components/lazy-components'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import {
  getActiveGalleryImages,
  getActiveHeroSlides,
  getActiveServices,
  getActiveTeamMembers,
  getActiveTestimonials,
  getStats,
} from '@/data'

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Get data first
  const heroSlides = getActiveHeroSlides()
  const services = getActiveServices()
  const teamMembers = getActiveTeamMembers()
  const testimonials = getActiveTestimonials()
  const galleryImages = getActiveGalleryImages()
  const stats = getStats()

  return (
    <div className="bg-background min-h-screen">
      <ScrollDepthTrackerWithSuspense />

      {/* Header */}
      <Header variant="transparent" />

      {/* Hero Section */}
      <main id="main-content">
        <section id="inicio">
          <LazyHeroWrapper
            slides={heroSlides}
            autoPlay={true}
            autoPlayInterval={6000}
            showStats={true}
            showPlayButton={true}
            variant="default"
          />
        </section>

        {/* About Section */}
        <section id="nosotros" className={`py-16 md:py-20 ${colorTokens.background.secondary}`}>
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${colorTokens.text.primary}`}>
                Laboratorio Dental de Excelencia
              </h2>
              <p className={`mx-auto max-w-3xl text-lg ${colorTokens.text.secondary}`}>
                Más de 10 años de experiencia en la fabricación de prótesis dentales de alta
                calidad, utilizando tecnología de vanguardia y materiales premium para garantizar
                resultados excepcionales.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: ToothIcon,
                  title: 'Precisión',
                  desc: 'Tolerancias de micras',
                },
                {
                  icon: ScannerIcon,
                  title: 'Tecnología',
                  desc: 'Escaneo 3D avanzado',
                },
                {
                  icon: QualityIcon,
                  title: 'Calidad',
                  desc: 'Materiales premium',
                },
                {
                  icon: LaboratoryIcon,
                  title: 'Laboratorio',
                  desc: 'Equipos de vanguardia',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl p-6 text-center transition-shadow ${utilityClasses.container.card} hover:shadow-lg`}
                >
                  <div className="mb-4 flex justify-center">
                    <item.icon size={48} className={`${colorTokens.text.brand.accent}`} />
                  </div>
                  <h3 className={`mb-2 text-xl font-semibold ${colorTokens.text.primary}`}>
                    {item.title}
                  </h3>
                  <p className={colorTokens.text.secondary}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios">
          <ServicesCarousel
            services={services}
            showBadge={true}
            showFeatures={true}
            showBenefits={true}
            maxDisplayed={7}
          />
        </section>

        {/* Appointment Section */}
        <section
          id="citas"
          className={`bg-gradient-to-br py-16 md:py-20 ${colorTokens.gradient.background}`}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${colorTokens.text.primary}`}>
                Agenda tu cita
              </h2>
              <p className={`mx-auto max-w-2xl text-lg ${colorTokens.text.secondary}`}>
                Reserva tu consulta en línea de manera fácil y rápida
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl">
              <LazyAppointmentSchedulerWrapper
                onSubmit={data => {
                  console.log('Cita agendada:', data)
                  // Aquí se va a manejar la lógica de agendamiento
                }}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <LazyStatsWrapper stats={stats} variant="primary" columns={4} />

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section id="testimonios">
            <LazyTestimonialsWrapper testimonials={testimonials} maxItems={3} />
          </section>
        )}

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <section id="galeria">
            <LazyGalleryWrapper images={galleryImages} maxItems={8} columns={4} />
          </section>
        )}

        {/* Team Section */}
        {teamMembers.length > 0 && (
          <section id="team">
            <LazyTeamWrapper members={teamMembers} maxItems={2} columns={2} />
          </section>
        )}

        {/* Contact Section */}
        <section id="contacto">
          <LazyContactWrapper variant="default" />
        </section>
      </main>

      {/* Footer */}
      <Footer variant="default" />

      {/* Scroll to Top */}
      <ScrollToTop variant="floating" />

      {/* Modal de WhatsApp */}
      <LazyWhatsAppChatWrapper />
    </div>
  )
}
