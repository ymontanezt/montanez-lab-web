'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import { env } from '@/lib/config/env'

// Iconos de redes sociales en color azul Montañez Lab
const FacebookIcon = () => (
  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const TikTokIcon = () => (
  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 4 15.22a6.34 6.34 0 0 0 10.12 5.13 6.31 6.31 0 0 0 1.26-3.63v-7a8.16 8.16 0 0 0 4.21 1.15V6.69a4.85 4.85 0 0 1-1.05-.09z" />
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
    minimal: `${colorTokens.background.primary} dark:${colorTokens.background.secondary}`,
  }

  const services = [
    { name: 'Prótesis Fija (Zirconio)', href: '/servicios/protesis-fija-zirconio' },
    { name: 'Prótesis Fija (Disilicato)', href: '/servicios/protesis-fija-disilicato' },
    { name: 'Prótesis Fija (Metal Porcelana)', href: '/servicios/protesis-fija-metal-porcelana' },
    { name: 'Ivocrom', href: '/servicios/ivocrom' },
    { name: 'Prótesis Totales', href: '/servicios/protesis-totales' },
    { name: 'Flexibles', href: '/servicios/protesis-flexibles' },
    { name: 'Prótesis Removibles (PPR)', href: '/servicios/protesis-removibles-ppr' },
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
      value: env.contact.email,
      href: `mailto:${env.contact.email}`,
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
    { day: 'Lun - Vie', hours: '8:00 AM - 8:00 PM' },
    { day: 'Sáb', hours: '9:00 AM - 2:00 PM' },
    { day: 'Dom', hours: 'Cerrado' },
  ]

  const socialLinks = [
    { href: 'https://facebook.com/montanezlab', icon: FacebookIcon },
    { href: 'https://instagram.com/montanezlab', icon: InstagramIcon },
    { href: 'https://tiktok.com/@montanezlab', icon: TikTokIcon },
  ]

  return (
    <footer className={cn('py-6 md:py-10 lg:py-12', variants[variant], className)}>
      <div className="container mx-auto px-4">
        {/* Header del Footer */}
        <div className="mb-6 border-b border-blue-200 pb-4 text-center dark:border-blue-800">
          <div className="mb-2 inline-flex items-center gap-2 md:gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${colorTokens.gradient.brand.primary} shadow-lg md:h-10 md:w-10`}
            >
              <span className="text-lg md:text-xl">🦷</span>
            </div>
            <div className="text-left">
              <h3 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-lg font-bold text-transparent md:text-xl dark:from-white dark:to-gray-200">
                Montañez Lab
              </h3>
              <p
                className={`text-xs font-medium ${colorTokens.text.muted} dark:${colorTokens.text.muted}`}
              >
                Laboratorio Dental Moderno
              </p>
            </div>
          </div>
          <p
            className={`mx-auto max-w-xl text-xs leading-relaxed ${colorTokens.text.muted} md:text-sm dark:${colorTokens.text.tertiary}`}
          >
            Especialistas en prótesis dentales de alta calidad con tecnología avanzada y materiales
            premium para restaurar tu sonrisa.
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="mb-6 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Servicios */}
          <div className="text-center md:text-left">
            <h4
              className={`mb-3 flex items-center justify-center gap-2 text-sm font-semibold ${colorTokens.text.primary} md:justify-start dark:${colorTokens.text.inverse}`}
            >
              <div
                className={`h-2 w-2 rounded-full ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.primary}`}
              ></div>
              Servicios
            </h4>
            <ul className="space-y-1.5">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className={`block text-xs ${colorTokens.text.muted} transition-all duration-200 hover:translate-x-1 hover:${colorTokens.hover.text.accent} dark:${colorTokens.text.tertiary} dark:hover:${colorTokens.hover.text.accent}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h4
              className={`mb-3 flex items-center justify-center gap-2 text-sm font-semibold ${colorTokens.text.primary} md:justify-start dark:${colorTokens.text.inverse}`}
            >
              <div
                className={`h-2 w-2 rounded-full ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.primary}`}
              ></div>
              Contacto
            </h4>
            <ul className="space-y-1.5">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center justify-center gap-2 md:justify-start">
                  <info.icon
                    className={`h-3 w-3 ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.primary}`}
                  />
                  <Link
                    href={info.href}
                    className={`text-xs ${colorTokens.text.muted} transition-all duration-200 hover:${colorTokens.hover.text.accent} dark:${colorTokens.text.tertiary} dark:hover:${colorTokens.hover.text.accent}`}
                  >
                    {info.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div className="text-center md:text-left">
            <h4
              className={`mb-3 flex items-center justify-center gap-2 text-sm font-semibold ${colorTokens.text.primary} md:justify-start dark:${colorTokens.text.inverse}`}
            >
              <div
                className={`h-2 w-2 rounded-full ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.primary}`}
              ></div>
              Horarios
            </h4>
            <ul className="space-y-1.5">
              {schedule.map((item, index) => (
                <li key={index} className="flex items-center justify-center gap-2 md:justify-start">
                  <Clock
                    className={`h-3 w-3 ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.primary}`}
                  />
                  <span
                    className={`text-xs ${colorTokens.text.muted} dark:${colorTokens.text.tertiary}`}
                  >
                    {item.day}: {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="text-center md:text-left">
            <h4
              className={`mb-3 flex items-center justify-center gap-2 text-sm font-semibold ${colorTokens.text.primary} md:justify-start dark:${colorTokens.text.inverse}`}
            >
              <div
                className={`h-2 w-2 rounded-full ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.primary}`}
              ></div>
              Síguenos
            </h4>
            <div className="flex justify-center gap-2 md:justify-start md:gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-lg border ${colorTokens.border.brand.light} ${colorTokens.background.brand.light} p-1.5 shadow-sm transition-all duration-200 hover:scale-110 ${colorTokens.hover.background.brand.light} hover:shadow-md md:p-2 dark:${colorTokens.border.brand.primary} dark:${colorTokens.background.brand.muted} dark:${colorTokens.hover.background.brand.light}`}
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div
          className={`border-t-2 ${colorTokens.border.brand.light} pt-4 text-center dark:${colorTokens.border.brand.light}`}
        >
          <div
            className={`flex flex-col items-center justify-between gap-3 text-xs ${colorTokens.text.muted} sm:flex-row md:text-sm dark:${colorTokens.text.muted}`}
          >
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
              <span>© {currentYear} Montañez Lab. Todos los derechos reservados.</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Laboratorio Dental.</span>
            </div>

            {/* Enlaces Útiles */}
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/user-manual.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 font-semibold ${colorTokens.text.brand.primary} transition-colors hover:${colorTokens.hover.text.brand.primary} dark:${colorTokens.text.brand.primary} dark:hover:${colorTokens.hover.text.brand.primary}`}
              >
                <span>📖 Manual de Usuario</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              <span className={`${colorTokens.text.muted} dark:${colorTokens.text.muted}`}>|</span>
              <span className={`${colorTokens.text.muted} dark:${colorTokens.text.muted}`}>
                Desarrollado por
              </span>
              <Link
                href="https://www.linkedin.com/in/yuri-michael-monta%C3%B1ez-tuncar-39744496/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 font-semibold ${colorTokens.text.brand.primary} transition-colors hover:${colorTokens.hover.text.brand.primary} dark:${colorTokens.text.brand.primary} dark:hover:${colorTokens.hover.text.brand.primary}`}
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
