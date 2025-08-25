// Header component
// Reusable header with navigation and branding

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import {
  Sparkles,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  MessageCircle,
  ArrowRight,
} from 'lucide-react'

interface HeaderProps {
  className?: string
  variant?: 'default' | 'transparent' | 'solid'
  showContactInfo?: boolean
}

interface NavigationItem {
  id: string
  label: string
  href: string
  children?: NavigationItem[]
}

export const Header: React.FC<HeaderProps> = ({
  className,
  variant = 'default',
  showContactInfo = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      // Update active section based on scroll position - Mejorada
      const sections = siteConfig.navigation.main.map(item => item.id)
      const headerHeight = 80 // Altura del header fijo
      const scrollPositionWithOffset = scrollPosition + headerHeight + 50 // Offset más preciso

      // Buscar la sección más cercana al viewport
      let closestSection = 'inicio'
      let minDistance = Infinity

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          const sectionCenter = offsetTop + offsetHeight / 2
          const distance = Math.abs(scrollPositionWithOffset - sectionCenter)

          if (distance < minDistance) {
            minDistance = distance
            closestSection = section
          }
        }
      }

      setActiveSection(closestSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to section - Mejorada para móvil
  const scrollToSection = (sectionId: string) => {
    console.log('🚀 Navegando a:', sectionId)

    // Cerrar menú móvil primero
    setIsMenuOpen(false)

    // Función que ejecuta el scroll
    const executeScroll = () => {
      const element = document.getElementById(sectionId)

      if (element) {
        console.log('✅ Elemento encontrado:', sectionId, element)

        // Calcular offset para el header fijo
        const headerHeight = 120 // Altura del header + margen extra
        const elementPosition = Math.max(0, element.offsetTop - headerHeight)

        // Scroll suave a la posición
        if (typeof window !== 'undefined') {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          })
        }

        // Actualizar el estado activo
        setActiveSection(sectionId)

        // Focus en el elemento para accesibilidad (opcional)
        try {
          element.focus({ preventScroll: true })
        } catch (e) {
          // Ignorar errores de focus si el elemento no es focusable
        }
      } else {
        console.log('❌ Elemento NO encontrado para:', sectionId)
        // Debug: mostrar todas las secciones disponibles
        const allElements = document.querySelectorAll('section[id], [id*="' + sectionId + '"]')
        console.log(
          '📍 Elementos disponibles:',
          Array.from(allElements).map(el => ({ id: el.id, tag: el.tagName }))
        )

        // Fallback: buscar por variaciones del nombre
        const fallbackSelectors = [
          `#${sectionId}`,
          `section[id="${sectionId}"]`,
          `[data-section="${sectionId}"]`,
          `[id*="${sectionId}"]`,
        ]

        let fallbackElement: HTMLElement | null = null
        for (const selector of fallbackSelectors) {
          fallbackElement = document.querySelector(selector) as HTMLElement
          if (fallbackElement) {
            console.log('🔄 Elemento encontrado con fallback:', selector, fallbackElement)
            break
          }
        }

        if (fallbackElement) {
          const headerHeight = 120
          const elementPosition = Math.max(0, fallbackElement.offsetTop - headerHeight)

          if (typeof window !== 'undefined') {
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth',
            })
          }

          setActiveSection(sectionId)
        } else {
          console.log('🚫 No se pudo encontrar la sección:', sectionId)
        }
      }
    }

    // Pequeño delay para asegurar que el menú se cierre
    setTimeout(executeScroll, 150)
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  // Header variants mejorados con mejor contraste
  const headerVariants = {
    default:
      'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-blue-200/80 dark:border-blue-800/80 shadow-sm',
    transparent: 'bg-transparent',
    solid: 'bg-white dark:bg-gray-900 border-b border-blue-200 dark:border-blue-800 shadow-md',
  }

  const isTransparent = variant === 'transparent' && !isScrolled

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        headerVariants[variant],
        isTransparent ? 'bg-transparent' : headerVariants.default,
        className
      )}
      role="banner"
    >
      {/* Top contact bar mejorado */}
      {showContactInfo && (
        <div
          className={`bg-gradient-to-r ${colorTokens.gradient.brand.primary} py-2 text-sm text-white`}
        >
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 transition-colors hover:text-blue-100">
                <Phone className="h-4 w-4" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 transition-colors hover:text-blue-100">
                <Mail className="h-4 w-4" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 transition-colors hover:text-blue-100">
              <MapPin className="h-4 w-4" />
              <span>
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main header mejorado */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and branding mejorado */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="group flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorTokens.gradient.brand.primary} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
              >
                <span className="text-2xl">🦷</span>
              </div>
              <div>
                <h1
                  className={`text-xl font-bold text-gray-900 transition-colors group-hover:${colorTokens.text.brand.primary} dark:text-white dark:group-hover:${colorTokens.text.brand.primary}`}
                >
                  {siteConfig.name}
                </h1>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {siteConfig.description}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop navigation mejorado */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            role="navigation"
            aria-label="Navegación principal"
          >
            {siteConfig.navigation.main.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={e => handleKeyDown(e, () => scrollToSection(item.id))}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                  activeSection === item.id
                    ? `${colorTokens.active.background.brand.primary} font-semibold ${colorTokens.active.text.brand.primary}`
                    : `text-gray-700 hover:bg-gray-50 hover:${colorTokens.hover.text.brand.primary} dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:${colorTokens.hover.text.brand.primary}`
                )}
                aria-current={activeSection === item.id ? 'page' : undefined}
                aria-label={`Ir a sección ${item.label}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-lg bg-blue-100 dark:bg-blue-800/50"
                    layoutId="activeSection"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA and mobile menu button mejorados */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Theme Toggle */}
            <ThemeToggle />

            <Button
              size="sm"
              onClick={() => scrollToSection('contacto')}
              className={`group hidden rounded-full bg-gradient-to-r ${colorTokens.gradient.brand.primary} px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:${colorTokens.hover.background.brand.primary} hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 md:flex`}
            >
              Contactar
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            {/* Mobile menu button mejorado */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:hidden dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile navigation mejorado */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t border-blue-200/80 bg-white/95 shadow-lg backdrop-blur-md lg:hidden dark:border-blue-800/80 dark:bg-gray-900/95"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav
              className="container mx-auto px-4 py-4"
              role="navigation"
              aria-label="Navegación móvil"
            >
              <div className="space-y-2">
                {siteConfig.navigation.main.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                      activeSection === item.id
                        ? 'bg-blue-50 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-blue-400'
                    )}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile CTA mejorado */}
              <div className="mt-6 border-t border-blue-200 pt-4 dark:border-blue-800">
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contacto')}
                  className="group w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Contactar
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
