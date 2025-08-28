'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react'
import { addContactSubmission } from '@/lib/firestore'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { trackingEvents } from '@/lib/analytics'
import { env } from '@/lib/config/env'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  clinic: z.string().min(2, 'El nombre de la clínica es requerido'),
  service: z.string().min(1, 'Selecciona un servicio'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  urgency: z.enum(['baja', 'media', 'alta']),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
  'Prótesis Digitales',
  'Implantología Avanzada',
  'Ortodoncia Personalizada',
  'Estética Dental',
  'Odontopediatría',
  'Urgencias 24/7',
  'Consulta General',
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      urgency: 'media',
    },
  })

  const urgency = watch('urgency')

  const onSubmit = async (data: ContactFormData) => {
    
    setIsSubmitting(true)

    try {
      trackingEvents.contactFormSubmit()

      // Save to Firebase
      const contactId = await addContactSubmission(data)


      // Prepare email data
      const emailData = {
        ...data,
        submittedAt: format(new Date(), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es }),
      }

      // Send notification emails
      const [notificationSent, confirmationSent] = await Promise.allSettled([
        sendContactNotification(emailData),
        sendContactConfirmation(emailData),
      ])

      

      setIsSubmitted(true)
      reset()

      toast({
        title: '¡Mensaje enviado exitosamente!',
        description: 'Nos pondremos en contacto contigo dentro de las próximas 24 horas.',
      })
    } catch (error: any) {
      console.error('[v0] Error submitting form:', error)
      toast({
        title: 'Error al enviar mensaje',
        description: error.message || 'Por favor intenta nuevamente o contáctanos directamente.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 text-center"
      >
        <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle className="text-primary h-10 w-10" />
        </div>
        <h3 className="heading-tertiary mb-4">¡Mensaje Enviado!</h3>
        <p className="body-regular text-muted-foreground mb-6">
          Gracias por contactarnos. Nuestro equipo revisará tu solicitud y se pondrá en contacto
          contigo pronto.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Enviar Otro Mensaje
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Label htmlFor="name" className="text-sm font-medium">
            Nombre Completo *
          </Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Dr. Juan Pérez"
            className={`mt-2 ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && (
            <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Label htmlFor="email" className="text-sm font-medium">
            Email Profesional *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="doctor@clinica.com"
            className={`mt-2 ${errors.email ? 'border-destructive' : ''}`}
          />
          {errors.email && (
            <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </motion.div>
      </div>

      {/* Contact & Clinic Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Label htmlFor="phone" className="text-sm font-medium">
            Teléfono *
          </Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="912345678"
            className={`mt-2 ${errors.phone ? 'border-destructive' : ''}`}
          />
          {errors.phone && (
            <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.phone.message}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Label htmlFor="clinic" className="text-sm font-medium">
            Nombre de la Clínica *
          </Label>
          <Input
            id="clinic"
            {...register('clinic')}
            placeholder="Clínica Dental Sonrisa"
            className={`mt-2 ${errors.clinic ? 'border-destructive' : ''}`}
          />
          {errors.clinic && (
            <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.clinic.message}
            </p>
          )}
        </motion.div>
      </div>

      {/* Service Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Label htmlFor="service" className="text-sm font-medium">
          Servicio de Interés *
        </Label>
        <select
          id="service"
          {...register('service')}
          className={`bg-background mt-2 w-full rounded-md border px-3 py-2 ${
            errors.service ? 'border-destructive' : 'border-input'
          }`}
        >
          <option value="">Selecciona un servicio</option>
          {services.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
            <AlertCircle className="h-3 w-3" />
            {errors.service.message}
          </p>
        )}
      </motion.div>

      {/* Urgency Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Label className="mb-3 block text-sm font-medium">Nivel de Urgencia *</Label>
        <div className="flex gap-3">
          {[
            {
              value: 'baja',
              label: 'Baja',
              color: 'bg-green-100 text-green-800 border-green-200',
            },
            {
              value: 'media',
              label: 'Media',
              color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            },
            {
              value: 'alta',
              label: 'Alta',
              color: 'bg-red-100 text-red-800 border-red-200',
            },
          ].map(option => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                value={option.value}
                {...register('urgency')}
                className="sr-only"
              />
              <Badge
                variant="outline"
                className={`px-4 py-2 transition-all ${
                  urgency === option.value
                    ? option.color
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {option.label}
              </Badge>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Label htmlFor="message" className="text-sm font-medium">
          Mensaje Detallado *
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Describe tu caso, necesidades específicas, tiempos requeridos, etc."
          rows={4}
          className={`mt-2 resize-none ${errors.message ? 'border-destructive' : ''}`}
        />
        {errors.message && (
          <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
            <AlertCircle className="h-3 w-3" />
            {errors.message.message}
          </p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
        className="pt-4"
      >
        <Button type="submit" size="lg" disabled={isSubmitting} className="group w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando mensaje...
            </>
          ) : (
            <>
              Enviar Consulta
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <p className="text-muted-foreground mt-3 text-center text-xs">
          Al enviar este formulario, aceptas que nos pongamos en contacto contigo para brindarte
          información sobre nuestros servicios.
        </p>
      </motion.div>
    </form>
  )
}

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['989 253 275'],
      description: 'Lunes a Viernes: 8:00 AM - 8:00 PM',
    },
    {
      icon: Mail,
      title: 'Email',
      details: [env.contact.email, env.contact.urgencyEmail],
      description: 'Respuesta en menos de 2 horas',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      details: [
        env.contact.address.street,
        `${env.contact.address.city}, ${env.contact.address.country} ${env.contact.address.zipCode}`,
      ],
      description: 'Zona céntrica, fácil acceso',
    },
    {
      icon: Clock,
      title: 'Horarios',
      details: ['Lun - Vie: 8:00 AM - 8:00 PM', 'Sáb: 9:00 AM - 2:00 PM'],
      description: 'Urgencias 24/7 disponibles',
    },
  ]

  return (
    <div className="space-y-6">
      {contactDetails.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex gap-4"
        >
          <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
            <item.icon className="text-primary h-6 w-6" />
          </div>
          <div>
            <h4 className="mb-1 font-serif text-lg font-semibold">{item.title}</h4>
            {item.details.map((detail, detailIndex) => (
              <p key={detailIndex} className="text-foreground font-medium">
                {item.title === 'Teléfono' ? (
                  <a
                    href={`tel:${detail.replace(/\s/g, '')}`}
                    className="hover:text-primary transition-colors"
                    onClick={() => trackingEvents.phoneClick()}
                  >
                    {detail}
                  </a>
                ) : item.title === 'Email' ? (
                  <a
                    href={`mailto:${detail}`}
                    className="hover:text-primary transition-colors"
                    onClick={() => trackingEvents.emailClick()}
                  >
                    {detail}
                  </a>
                ) : (
                  detail
                )}
              </p>
            ))}
            <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
