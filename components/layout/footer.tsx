'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/design-system/utilities'
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import { env } from '@/lib/config/env'

// Iconos personalizados de redes sociales con colores oficiales
const FacebookIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FFD600', stopOpacity: 1 }} />
        <stop offset="25%" style={{ stopColor: '#FF7A00', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#FF0169', stopOpacity: 1 }} />
        <stop offset="75%" style={{ stopColor: '#D300C5', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8F00FF', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)" />
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="white"
    />
  </svg>
)

const TikTokIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="2" fill="black" />
    <path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 4 15.22a6.34 6.34 0 0 0 10.12 5.13 6.31 6.31 0 0 0 1.26-3.63v-7a8.16 8.16 0 0 0 4.21 1.15V6.69a4.85 4.85 0 0 1-1.05-.09z"
      fill="white"
    />
  </svg>
)

interface FooterProps {
  className?: string
  variant?: 'default' | 'minimal'
}

export function Footer({ className, variant = 'default' }: FooterProps) {
  // Usar useEffect para evitar problemas de hidratación
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const variants = {
    default: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800',
    minimal: 'bg-white dark:bg-gray-900',
  }

  const services = [
    { name: 'Prótesis Digitales', href: '/servicios/protesis-digitales' },
    { name: 'Implantología Avanzada', href: '/servicios/implantologia-avanzada' },
    { name: 'Ortodoncia Personalizada', href: '/servicios/ortodoncia-personalizada' },
    { name: 'Estética Dental', href: '/servicios/estetica-dental' },
    { name: 'Odontopediatría', href: '/servicios/odontopediatria' },
    { name: 'Urgencias 24/7', href: '/servicios/urgencias-24-7' },
  ]

  const contactInfo = [
    {
      label: 'Teléfono',
      value: env.contact.phone,
      href: `tel:${env.contact.phone.replace(/\s/g, '')}`,
      icon: Phone,
    },
    {
      label: 'Email',
      value: 'info@dentallabpro.com',
      href: 'mailto:info@dentallabpro.com',
      icon: Mail,
    },
    {
      label: 'Dirección',
      value: `${env.contact.address.city}, ${env.contact.address.country}`,
      href: '#',
      icon: MapPin,
    },
  ]

  const schedule = [
    { day: 'Lun', hours: '8:00 AM - 8:00 PM' },
    { day: 'Mar', hours: '8:00 AM - 8:00 PM' },
    { day: 'Mié', hours: '8:00 AM - 8:00 PM' },
    { day: 'Jue', hours: '8:00 AM - 8:00 PM' },
    { day: 'Vie', hours: '8:00 AM - 8:00 PM' },
    { day: 'Sáb', hours: '9:00 AM - 2:00 PM' },
    { day: 'Dom', hours: 'Cerrado' },
  ]

  const socialLinks = [
    { href: 'https://facebook.com/gatavieja', icon: FacebookIcon },
    { href: 'https://instagram.com/gatavieja', icon: InstagramIcon },
    { href: 'https://tiktok.com/@gatavieja', icon: TikTokIcon },
  ]

  return (
    <footer className={cn('py-10 md:py-12', variants[variant], className)}>
      <div className="container mx-auto px-4">
        {/* Header del Footer */}
        <div className="mb-8 border-b border-gray-200 pb-6 text-center dark:border-gray-700">
          <div className="mb-3 inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-green-700 shadow-lg dark:from-green-500 dark:to-green-600">
              <span className="text-xl">🦷</span>
            </div>
            <div className="text-left">
              <h3 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-gray-200">
                DentalLab Pro
              </h3>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Laboratorio Dental Moderno
              </p>
            </div>
          </div>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Transformando sonrisas con tecnología de vanguardia y la más alta calidad en cada
            trabajo.
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Servicios */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 flex items-center justify-center gap-2 text-base font-semibold text-gray-900 md:justify-start dark:text-white">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Servicios
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="block text-xs text-gray-600 transition-all duration-200 hover:translate-x-1 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 flex items-center justify-center gap-2 text-base font-semibold text-gray-900 md:justify-start dark:text-white">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Contacto
            </h4>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center justify-center gap-2 md:justify-start">
                  <info.icon className="h-3 w-3 text-green-500" />
                  <Link
                    href={info.href}
                    className="text-xs text-gray-600 transition-all duration-200 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                  >
                    {info.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 flex items-center justify-center gap-2 text-base font-semibold text-gray-900 md:justify-start dark:text-white">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Horarios
            </h4>
            <ul className="space-y-2">
              {schedule.map((item, index) => (
                <li key={index} className="flex items-center justify-center gap-2 md:justify-start">
                  <Clock className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {item.day}: {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 flex items-center justify-center gap-2 text-base font-semibold text-gray-900 md:justify-start dark:text-white">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Síguenos
            </h4>
            <div className="flex justify-center gap-3 md:justify-start">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg bg-white p-2 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md dark:bg-gray-800"
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-200 pt-6 text-center dark:border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 sm:flex-row dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {currentYear} DentalLab Pro. Todos los derechos reservados.</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Laboratorio Dental Profesional.</span>
            </div>

            {/* Developed by @michcode */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 dark:text-gray-500">Desarrollado por</span>
              <Link
                href="https://www.linkedin.com/in/yuri-michael-monta%C3%B1ez-tuncar-39744496/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-green-600 transition-colors hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                <span>@michcode</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
