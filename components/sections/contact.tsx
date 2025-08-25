'use client'

import { motion } from 'framer-motion'
import { ContactForm } from '@/components/ui/contact-form'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import { env } from '@/lib/config/env'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

interface ContactProps {
  className?: string
  showTitle?: boolean
  variant?: 'default' | 'minimal'
}

export function Contact({ className, showTitle = true, variant = 'default' }: ContactProps) {
  const variants = {
    default: `bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-blue-200 dark:border-blue-800`,
    minimal: 'bg-gray-50 dark:bg-gray-900',
  }

  const handleContactSubmit = (data: any) => {
    console.log('Formulario de contacto enviado:', data)
    // Aquí puedes integrar con tu API de email
  }

  return (
    <section className={cn('py-16 md:py-20', className)}>
      <div className="container mx-auto px-4">
        <div className={cn('rounded-2xl p-6 md:p-8 lg:p-10', variants[variant])}>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Contáctanos
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                ¿Tienes alguna consulta? Envíanos un mensaje y te responderemos pronto
              </p>
            </motion.div>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-1">
            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Teléfono */}
                <div className="flex flex-col items-center rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-blue-800 dark:bg-gray-800">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
                    <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Teléfono
                  </h3>
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    {env.contact.phone}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Lun - Vie: 8:00 AM - 8:00 PM
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-blue-800 dark:bg-gray-800">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    info@dentallabpro.com
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Respuesta en 24 horas</p>
                </div>

                {/* Dirección con enlace a Maps */}
                <div className="flex flex-col items-center rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-blue-800 dark:bg-gray-800">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Dirección
                  </h3>
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    Av. Javier Prado Este 1234
                  </p>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    {env.contact.address.city}, {env.contact.address.country}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(env.contact.address.street)},+${encodeURIComponent(env.contact.address.city)},+${encodeURIComponent(env.contact.address.country)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <MapPin className="h-3 w-3" />
                    Ver en Maps
                  </a>
                </div>

                {/* Horarios */}
                <div className="flex flex-col items-center rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-blue-800 dark:bg-gray-800">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Horarios
                  </h3>
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    Lun - Vie: 8:00 AM - 8:00 PM
                  </p>
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    Sáb: 9:00 AM - 2:00 PM
                  </p>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Urgencias 24/7
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Formulario de contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <div className="mx-auto max-w-4xl rounded-xl border border-blue-200 bg-white p-6 shadow-xl md:p-8 dark:border-blue-800 dark:bg-gray-900">
                <div className="mb-6 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
                    <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                    Envíanos un mensaje
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Completa el formulario y nos pondremos en contacto contigo pronto
                  </p>
                </div>

                <ContactForm onSubmit={handleContactSubmit} variant="default" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
