'use client'

import type React from 'react'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { MessageCircle, X, Send, Phone, Clock } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'
import { env } from '@/lib/config/env'

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const whatsappNumber = env.whatsapp.number // WhatsApp number for the dental lab
  const businessHours = 'Lun-Vie: 8:00 AM - 8:00 PM | Sáb: 9:00 AM - 2:00 PM'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa tu nombre y mensaje',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      trackWhatsAppClick(message.trim(), 'widget_form')

      // Format the WhatsApp message
      const whatsappMessage = `Hola, soy ${name.trim()}. ${message.trim()}`
      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank')

      // Reset form and close widget
      setName('')
      setMessage('')
      setIsOpen(false)

      toast({
        title: '¡Redirigiendo a WhatsApp!',
        description: 'Tu mensaje se ha preparado. Completa el envío en WhatsApp.',
      })
    } catch (error) {
      console.error('[v0] WhatsApp widget error:', error)
      toast({
        title: 'Error',
        description: 'No se pudo abrir WhatsApp. Intenta nuevamente.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const quickMessages = [
    'Hola, necesito información sobre sus servicios',
    'Quiero agendar una consulta',
    'Tengo una urgencia dental',
    'Solicito cotización para prótesis',
  ]

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed right-6 bottom-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring' }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={e => handleKeyDown(e, () => setIsOpen(!isOpen))}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(34, 197, 94, 0.7)',
              '0 0 0 10px rgba(34, 197, 94, 0)',
              '0 0 0 20px rgba(34, 197, 94, 0)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeOut',
          }}
          aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          )}

          {/* Notification badge */}
          <motion.div
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3 }}
            aria-hidden="true"
          >
            <span className="text-xs font-bold text-white">!</span>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-6 bottom-24 z-50 w-80 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring' }}
            role="dialog"
            aria-labelledby="whatsapp-title"
            aria-describedby="whatsapp-description"
          >
            <Card className="overflow-hidden border-green-200 shadow-2xl">
              {/* Header */}
              <div className="bg-green-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"
                    aria-hidden="true"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 id="whatsapp-title" className="font-semibold">
                      Gata viejis
                    </h3>
                    <div className="flex items-center gap-1 text-xs opacity-90">
                      <div className="h-2 w-2 rounded-full bg-green-300" aria-hidden="true"></div>
                      <span>En línea</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    onKeyDown={e => handleKeyDown(e, () => setIsOpen(false))}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 focus:outline-none"
                    aria-label="Cerrar chat de WhatsApp"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="max-h-60 overflow-y-auto bg-gray-50 p-4" id="whatsapp-description">
                <div className="space-y-3">
                  {/* Welcome message */}
                  <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500"
                      aria-hidden="true"
                    >
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-[80%] rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm">
                        ¡Hola! 👋 Bienvenido a DentalLab Pro. ¿En qué podemos ayudarte hoy?
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        <span>{businessHours}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick message options */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-muted-foreground px-2 text-xs">Mensajes rápidos:</p>
                    <div role="list" aria-label="Mensajes rápidos disponibles">
                      {quickMessages.map((msg, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setMessage(msg)
                            trackWhatsAppClick(msg, 'quick_message')
                          }}
                          onKeyDown={e =>
                            handleKeyDown(e, () => {
                              setMessage(msg)
                              trackWhatsAppClick(msg, 'quick_message')
                            })
                          }
                          className="block w-full rounded-lg border border-green-100 bg-white p-2 text-left text-xs transition-colors hover:bg-green-50 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          role="listitem"
                          aria-label={`Seleccionar mensaje: ${msg}`}
                        >
                          {msg}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Message Form */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="whatsapp-name" className="text-muted-foreground text-xs">
                      Tu nombre *
                    </Label>
                    <Input
                      id="whatsapp-name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ej: Dr. Juan Pérez"
                      className="mt-1 text-sm focus:ring-2 focus:ring-green-400"
                      disabled={isSubmitting}
                      required
                      aria-describedby="name-help"
                    />
                    <div id="name-help" className="sr-only">
                      Ingresa tu nombre completo para identificarte en WhatsApp
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp-message" className="text-muted-foreground text-xs">
                      Tu mensaje *
                    </Label>
                    <Textarea
                      id="whatsapp-message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Escribe tu consulta aquí..."
                      rows={3}
                      className="mt-1 resize-none text-sm focus:ring-2 focus:ring-green-400"
                      disabled={isSubmitting}
                      required
                      aria-describedby="message-help"
                    />
                    <div id="message-help" className="sr-only">
                      Describe tu consulta o necesidad. Este mensaje se enviará por WhatsApp
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !message.trim()}
                    className="w-full bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    size="sm"
                    aria-describedby="submit-help"
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          aria-hidden="true"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                        Enviar por WhatsApp
                      </>
                    )}
                  </Button>
                  <div id="submit-help" className="sr-only">
                    Al hacer clic, se abrirá WhatsApp con tu mensaje preparado para enviar
                  </div>
                </form>

                <div className="text-muted-foreground mt-3 flex items-center justify-center gap-2 text-xs">
                  <Phone className="h-3 w-3" aria-hidden="true" />
                  <a
                    href="tel:+525512345678"
                    className="hover:text-primary focus:ring-primary rounded transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    aria-label="Llamar al teléfono +52 55 1234 5678"
                  >
                    También puedes llamarnos: +52 55 1234 5678
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
