'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, Type, Contrast, Settings, X, RotateCcw } from 'lucide-react'

interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement

    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
    })
  }

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        className="bg-primary hover:bg-primary/90 focus:ring-primary fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full text-white shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir panel de accesibilidad"
        title="Opciones de accesibilidad"
      >
        <Settings className="mx-auto h-6 w-6" />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-4 left-4 z-50 w-80 max-w-[calc(100vw-2rem)]"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <Card className="border-border/50 p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold">Accesibilidad</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-muted focus:ring-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors focus:ring-2 focus:outline-none"
                    aria-label="Cerrar panel de accesibilidad"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Contrast className="text-muted-foreground h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Alto Contraste</p>
                        <p className="text-muted-foreground text-xs">
                          Mejora la visibilidad del texto
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('highContrast')}
                      className={`focus:ring-primary h-6 w-12 rounded-full transition-colors focus:ring-2 focus:outline-none ${
                        settings.highContrast ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`${settings.highContrast ? 'Desactivar' : 'Activar'} alto contraste`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white transition-transform ${
                          settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Type className="text-muted-foreground h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Texto Grande</p>
                        <p className="text-muted-foreground text-xs">Aumenta el tamaño del texto</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('largeText')}
                      className={`focus:ring-primary h-6 w-12 rounded-full transition-colors focus:ring-2 focus:outline-none ${
                        settings.largeText ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`${settings.largeText ? 'Desactivar' : 'Activar'} texto grande`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white transition-transform ${
                          settings.largeText ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="text-muted-foreground h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Reducir Movimiento</p>
                        <p className="text-muted-foreground text-xs">Minimiza las animaciones</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('reducedMotion')}
                      className={`focus:ring-primary h-6 w-12 rounded-full transition-colors focus:ring-2 focus:outline-none ${
                        settings.reducedMotion ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`${settings.reducedMotion ? 'Desactivar' : 'Activar'} reducir movimiento`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white transition-transform ${
                          settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSettings}
                    className="flex-1 bg-transparent"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restablecer
                  </Button>
                  <Button size="sm" onClick={() => setIsOpen(false)} className="flex-1">
                    Aplicar
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="bg-primary focus:ring-primary fixed top-4 left-4 z-50 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Saltar al contenido principal
      </a>
      <a
        href="#navigation"
        className="bg-primary focus:ring-primary fixed top-4 left-32 z-50 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Saltar a navegación
      </a>
    </div>
  )
}
