'use client'

import { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { X, MessageCircle, Send, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { env } from '@/lib/config/env'

interface WhatsAppChatProps {
  isOpen: boolean
  onClose: () => void
}

const PRIORITY_OPTIONS = [
  {
    value: 'baja',
    label: 'Baja',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  {
    value: 'media',
    label: 'Media',
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  },
  {
    value: 'alta',
    label: 'Alta',
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  },
  {
    value: 'urgente',
    label: 'Urgente',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
]

const SERVICE_OPTIONS = [
  'Prótesis',
  'Ortodoncia',
  'Implantes',
  'Endodoncia',
  'Cirugía',
  'Estética',
  'Otros',
]

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    priority: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Verificar si el formulario está completo
  const isFormComplete = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.service.trim() !== '' &&
      formData.priority.trim() !== '' &&
      formData.message.trim() !== ''
    )
  }

  // Validar campo individual
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Nombre muy corto' : ''
      case 'service':
        return value.trim() === '' ? 'Selecciona un servicio' : ''
      case 'priority':
        return value.trim() === '' ? 'Selecciona prioridad' : ''
      case 'message':
        return value.trim().length < 10 ? 'Mensaje muy corto' : ''
      default:
        return ''
    }
  }

  // Manejar cambio en input
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validar solo el campo que cambió
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }))
  }

  // Enviar a WhatsApp
  const handleWhatsAppSubmit = () => {
    if (!isFormComplete()) return

    setIsSubmitting(true)

    // Crear mensaje para WhatsApp más compacto
    const message = `🦷 *Consulta Dental - Montañez Lab*

Hola, me interesa el servicio de *${formData.service}*

*📋 Datos:* ${formData.name} | *Prioridad:* ${formData.priority.toUpperCase()}
*💬 Consulta:* ${formData.message}

---
*Enviado desde la web Montañez Lab*`

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message)

    // Crear enlace de WhatsApp con el número correcto
    const whatsappUrl = `https://wa.me/${env.whatsapp.number}?text=${encodedMessage}`

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank')

    // Resetear formulario
    setTimeout(() => {
      setFormData({
        name: '',
        service: '',
        priority: '',
        message: '',
      })
      setErrors({})
      setIsSubmitting(false)
      setIsOpen(false)
    }, 1000)
  }

  return (
    <>
      {/* Botón flotante - Reducido de tamaño */}
      <button
        onClick={() => setIsOpen(true)}
        className="group fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl"
        aria-label="Abrir chat de WhatsApp"
      >
        <svg
          className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-start bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: -20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] w-80 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-900"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 rounded-t-2xl bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Agenda tu consulta</h3>
                      <p className="text-sm text-green-100">Te contactaremos por WhatsApp</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Formulario */}
              <div className="space-y-4 p-4">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    placeholder="Tu nombre completo"
                    className={cn(
                      'h-11 border-green-200 focus:border-green-500 focus:ring-green-500/20 dark:border-green-700 dark:focus:border-green-400 dark:focus:ring-green-400/20',
                      errors.name &&
                        'border-red-300 focus:border-red-400 dark:border-red-500 dark:focus:border-red-400'
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Servicio - Select mejorado */}
                <div className="space-y-2">
                  <Label
                    htmlFor="service"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Servicio de interés
                  </Label>
                  <div className="relative">
                    <select
                      id="service"
                      value={formData.service}
                      onChange={e => handleInputChange('service', e.target.value)}
                      className={cn(
                        'h-11 w-full cursor-pointer appearance-none rounded-lg border border-green-200 bg-white px-4 py-2 text-sm text-gray-900 transition-all duration-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-green-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-green-500 dark:focus:border-green-400 dark:focus:ring-green-400/20',
                        errors.service &&
                          'border-red-300 focus:border-red-400 dark:border-red-500 dark:focus:border-red-400',
                        !formData.service && 'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      {SERVICE_OPTIONS.map(service => (
                        <option key={service} value={service} className="py-2">
                          {service}
                        </option>
                      ))}
                    </select>

                    {/* Icono de flecha personalizado */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-4 w-4 text-gray-400 transition-transform duration-200 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.service && (
                    <p className="text-xs text-red-500 dark:text-red-400">{errors.service}</p>
                  )}
                </div>

                {/* Prioridad */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nivel de prioridad
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIORITY_OPTIONS.map(priority => (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => handleInputChange('priority', priority.value)}
                        className={cn(
                          'rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200',
                          formData.priority === priority.value
                            ? `${priority.color} border-current shadow-sm`
                            : 'border-green-200 bg-gray-50 text-gray-600 hover:border-green-300 hover:bg-green-50 dark:border-green-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-green-500 dark:hover:bg-green-900/20'
                        )}
                      >
                        {priority.label}
                      </button>
                    ))}
                  </div>
                  {errors.priority && (
                    <p className="text-xs text-red-500 dark:text-red-400">{errors.priority}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Detalles de la consulta
                  </Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    placeholder="Describe tu consulta o necesidad..."
                    rows={3}
                    className={cn(
                      'w-full resize-none rounded-lg border border-green-200 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-green-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-green-500 dark:focus:border-green-400 dark:focus:ring-green-400/20',
                      errors.message &&
                        'border-red-300 focus:border-red-400 dark:border-red-500 dark:focus:border-red-400'
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Botón de envío */}
                <Button
                  onClick={handleWhatsAppSubmit}
                  disabled={!isFormComplete() || isSubmitting}
                  className={cn(
                    'h-12 w-full rounded-lg text-sm font-semibold transition-all duration-300',
                    isFormComplete() && !isSubmitting
                      ? 'transform bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:scale-[1.02] hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/25 active:scale-[0.98]'
                      : 'cursor-not-allowed bg-green-300 text-green-600 opacity-60 dark:bg-green-700 dark:text-green-300'
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {isFormComplete() ? 'Enviar por WhatsApp' : 'Completa todos los campos'}
                    </div>
                  )}
                </Button>

                {/* Información de redirección */}
                <div className="border-t border-green-100 pt-2 text-center dark:border-green-800">
                  <p className="text-xs text-green-600 dark:text-green-400">
                    📱 Se abrirá WhatsApp con tu mensaje pre-llenado
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
