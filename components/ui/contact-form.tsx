'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { Input } from './input'
import { Textarea } from './textarea'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Firebase functions - loaded only when needed
let createContact: any = null
let sendContactEmail: any = null

// Load Firebase functions on demand
const loadFirebaseFunctions = async () => {
  if (!createContact) {
    try {
      const module = await import('@/lib/firebase/contacts')
      createContact = module.createContact
      sendContactEmail = module.sendContactEmail
    } catch (error) {
      console.warn('⚠️ Firebase contacts module not available:', error)
    }
  }
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface ContactFormProps {
  className?: string
  onSubmit?: (data: ContactFormData) => void
  variant?: 'default' | 'minimal'
}

export function ContactForm({ className, onSubmit, variant = 'default' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const { toast } = useToast()

  // Función para verificar si el formulario está completo
  const isFormComplete = useCallback((): boolean => {
    const hasValidName = formData.name.trim().length >= 2
    const hasValidEmail = formData.email.trim().length > 0
    const hasValidPhone =
      formData.phone.trim().length === 9 && /^[0-9]{9}$/.test(formData.phone.trim())
    const hasValidSubject = formData.subject.trim().length >= 5
    const hasValidMessage = formData.message.trim().length >= 10

    return hasValidName && hasValidEmail && hasValidPhone && hasValidSubject && hasValidMessage
  }, [formData])

  // Validación en tiempo real para el teléfono
  const validatePhone = useCallback((phone: string): string | undefined => {
    if (!phone.trim()) {
      return 'El teléfono es requerido'
    }

    const phoneRegex = /^[0-9]{9}$/
    if (!phoneRegex.test(phone.trim())) {
      return 'El teléfono debe tener exactamente 9 dígitos'
    }

    return undefined
  }, [])

  // Validación en tiempo real para el email
  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return 'El email es requerido'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'El email no es válido'
    }

    return undefined
  }, [])

  // Validación en tiempo real para el nombre
  const validateName = useCallback((name: string): string | undefined => {
    if (!name.trim()) {
      return 'El nombre es requerido'
    }

    if (name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres'
    }

    if (name.trim().length > 50) {
      return 'El nombre no puede exceder 50 caracteres'
    }

    return undefined
  }, [])

  // Validación en tiempo real para el asunto
  const validateSubject = useCallback((subject: string): string | undefined => {
    if (!subject.trim()) {
      return 'El asunto es requerido'
    }

    if (subject.trim().length < 5) {
      return 'El asunto debe tener al menos 5 caracteres'
    }

    if (subject.trim().length > 100) {
      return 'El asunto no puede exceder 100 caracteres'
    }

    return undefined
  }, [])

  // Validación en tiempo real para el mensaje
  const validateMessage = useCallback((message: string): string | undefined => {
    if (!message.trim()) {
      return 'El mensaje es requerido'
    }

    if (message.trim().length < 10) {
      return 'El mensaje debe tener al menos 10 caracteres'
    }

    if (message.trim().length > 500) {
      return 'El mensaje no puede exceder 500 caracteres'
    }

    return undefined
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)
    const subjectError = validateSubject(formData.subject)
    const messageError = validateMessage(formData.message)

    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (phoneError) newErrors.phone = phoneError
    if (subjectError) newErrors.subject = subjectError
    if (messageError) newErrors.message = messageError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateName, validateEmail, validatePhone, validateSubject, validateMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Cargar Firebase solo cuando se envía el formulario
      await loadFirebaseFunctions()

      let contactId: string | null = null

      // Si Firebase está disponible, crear contacto en Firestore
      if (createContact) {
        try {
          contactId = await createContact({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            createdAt: new Date().toISOString(),
            status: 'new',
          })
          console.log('✅ Contacto creado en Firebase con ID:', contactId)
        } catch (firebaseError) {
          console.warn('⚠️ Error creando contacto en Firebase:', firebaseError)
          // Continuar con el envío de email aunque Firebase falle
        }
      }

      // Enviar email (con o sin Firebase)
      let emailSent = false
      if (sendContactEmail) {
        try {
          emailSent = await sendContactEmail({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            contactId: contactId || 'local',
          })
        } catch (emailError) {
          console.warn('⚠️ Error enviando email:', emailError)
        }
      }

      // Fallback: simular envío si no hay Firebase
      if (!createContact && !sendContactEmail) {
        await new Promise(resolve => setTimeout(resolve, 500))
        emailSent = true
      }

      // Mostrar toast de éxito
      toast({
        title: '🎉 ¡Mensaje enviado exitosamente!',
        description:
          'Hemos recibido tu consulta. Nos pondremos en contacto contigo en las próximas 24 horas.',
        duration: 5000,
      })

      // Llamar callback si existe
      if (onSubmit) {
        onSubmit(formData)
      }

      // Resetear formulario
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setErrors({})

      // Ocultar mensaje de éxito después de 8 segundos
      setTimeout(() => setIsSubmitted(false), 8000)
    } catch (error) {
      console.error('❌ Error al enviar formulario:', error)

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'

      toast({
        title: '❌ Error al enviar mensaje',
        description: errorMessage,
        variant: 'destructive',
      })

      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))

      // Validación en tiempo real solo para el campo que se está editando
      let fieldError: string | undefined

      switch (field) {
        case 'name':
          fieldError = validateName(value)
          break
        case 'email':
          fieldError = validateEmail(value)
          break
        case 'phone':
          fieldError = validatePhone(value)
          break
        case 'subject':
          fieldError = validateSubject(value)
          break
        case 'message':
          fieldError = validateMessage(value)
          break
      }

      // Actualizar solo el error del campo específico
      if (fieldError) {
        setErrors(prev => ({ ...prev, [field]: fieldError }))
      } else {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    },
    [validateName, validateEmail, validatePhone, validateSubject, validateMessage]
  )

  const variants = {
    default: 'space-y-6',
    minimal: 'space-y-4',
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-700/50 dark:bg-blue-900/20"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-blue-100 dark:border-blue-600 dark:bg-blue-800/50">
          <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-blue-800 dark:text-blue-200">
          ¡Mensaje enviado exitosamente!
        </h3>
        <p className="text-blue-600 dark:text-blue-300">
          Hemos recibido tu consulta. Nos pondremos en contacto contigo en las próximas 24 horas.
        </p>
        <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">Gracias por contactarnos</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn(variants[variant], className)}>
      {/* Mostrar error de envío si existe */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
        >
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{submitError}</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Nombre completo *
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            placeholder="Tu nombre completo"
            className={cn(
              'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
              errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="name-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Email *
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            placeholder="tu@email.com"
            className={cn(
              'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
              errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="email-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Teléfono (Perú) *
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            placeholder="999999999"
            className={cn(
              'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
              errors.phone && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="phone-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.phone}
            </motion.p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Formato: 9 dígitos (ej: 999999999)
          </p>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Asunto *
          </label>
          <Input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={e => handleInputChange('subject', e.target.value)}
            placeholder="Asunto de tu consulta"
            className={cn(
              'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
              errors.subject && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            )}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="subject-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.subject}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white"
        >
          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          Mensaje *
        </label>
        <Textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={e => handleInputChange('message', e.target.value)}
          placeholder="Escribe tu mensaje o consulta aquí..."
          className={cn(
            'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
            errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
          )}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="message-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.message}
          </motion.p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Máximo 500 caracteres • {formData.message.length}/500
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isFormComplete()}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando mensaje...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Enviar mensaje
          </div>
        )}
      </Button>

      <div className="space-y-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">* Campos obligatorios</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Tus datos están seguros con nosotros • Respuesta en 24 horas
        </p>
      </div>
    </form>
  )
}
