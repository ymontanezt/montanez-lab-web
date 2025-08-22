'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Input } from './input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens, utilityClasses } from '@/lib/design-system/color-tokens'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Firebase functions - loaded only when needed
let createAppointment: any = null
let getAvailableTimeSlots: any = null
let validateAppointmentData: any = null

// Load Firebase functions on demand
const loadFirebaseFunctions = async () => {
  if (!createAppointment) {
    const module = await import('@/lib/firebase/appointments')
    createAppointment = module.createAppointment
    getAvailableTimeSlots = module.getAvailableTimeSlots
    validateAppointmentData = module.validateAppointmentData
  }
}

// Types
interface CreateAppointmentData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
}

interface AppointmentSlot {
  id: string
  date: string
  time: string
  available: boolean
}

interface AppointmentFormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes: string
}

interface ValidationErrors {
  name?: string
  email?: string
  phone?: string
  service?: string
  date?: string
  time?: string
  notes?: string
}

interface AppointmentSchedulerProps {
  className?: string
  onSubmit?: (data: AppointmentFormData) => void
}

export function AppointmentScheduler({ className, onSubmit }: AppointmentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const { toast } = useToast()

  // Configuración de horarios de trabajo
  const WORK_HOURS = {
    start: 8, // 8:00 AM
    end: 18, // 6:00 PM
    minAdvance: 24, // Mínimo 24h de anticipación
    maxAdvance: 90, // Máximo 90 días de anticipación
  }

  // Duración de citas por servicio (en minutos)
  const SERVICE_DURATIONS = {
    'Consulta general': 30,
    'Limpieza dental': 60,
    Blanqueamiento: 90,
    Ortodoncia: 45,
    Implantes: 120,
    Prótesis: 90,
    Endodoncia: 90,
    'Cirugía oral': 120,
  }

  // Generar horarios base para mejor UX
  const generateTimeSlots = useCallback((startHour: number, endHour: number): string[] => {
    const slots: string[] = []
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    return slots
  }, [])

  // Obtener fecha de hoy como string para comparaciones
  const todayString = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])

  // Cargar horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    const loadAvailableSlots = async () => {
      if (!selectedDate) {
        setAvailableSlots([])
        return
      }

      // Usar horarios base inmediatamente para mejor UX
      const baseSlots = generateTimeSlots(WORK_HOURS.start, WORK_HOURS.end)
      setAvailableSlots(baseSlots)

      // Cargar Firebase solo cuando sea necesario
      try {
        await loadFirebaseFunctions()
        if (getAvailableTimeSlots) {
          setLoadingSlots(true)
          const slots = await getAvailableTimeSlots(selectedDate)
          if (slots && slots.length > 0) {
            setAvailableSlots(slots)
          }
        }
      } catch (error) {
        console.warn('⚠️ Error cargando horarios de Firebase, usando horarios base:', error)
        // Mantener horarios base si hay error
      } finally {
        setLoadingSlots(false)
      }
    }

    // Cargar inmediatamente sin delay
    loadAvailableSlots()
  }, [selectedDate])

  // Feriados de Perú 2024-2025 (ejemplo)
  const PERU_HOLIDAYS = [
    '2024-01-01', // Año Nuevo
    '2024-01-06', // Día de los Reyes
    '2024-04-01', // Lunes Santo
    '2024-05-01', // Día del Trabajo
    '2024-06-29', // San Pedro y San Pablo
    '2024-07-28', // Día de la Independencia
    '2024-07-29', // Día de la Independencia
    '2024-08-30', // Santa Rosa de Lima
    '2024-10-08', // Combate de Angamos
    '2024-11-01', // Día de Todos los Santos
    '2024-12-08', // Inmaculada Concepción
    '2024-12-25', // Navidad
    '2025-01-01', // Año Nuevo 2025
    '2025-01-06', // Día de los Reyes 2025
  ]

  // Función para verificar si una fecha es válida
  const isValidDate = useCallback((date: string): boolean => {
    const selectedDate = new Date(date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Verificar que no sea hoy o pasado
    if (selectedDate <= today) return false

    // Verificar anticipación mínima (24h)
    if (selectedDate < tomorrow) return false

    // Verificar anticipación máxima (90 días)
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate() + WORK_HOURS.maxAdvance)
    if (selectedDate > maxDate) return false

    // Verificar que no sea domingo (0 = domingo)
    if (selectedDate.getDay() === 0) return false

    // Verificar que no sea feriado
    if (PERU_HOLIDAYS.includes(date)) return false

    return true
  }, [])

  // Función para verificar disponibilidad de horario
  const isTimeSlotAvailable = (date: string, time: string): boolean => {
    // Simular citas existentes (en un sistema real, esto vendría de la base de datos)
    const existingAppointments = [
      { date: '2024-12-20', time: '09:00', duration: 60 },
      { date: '2024-12-20', time: '10:30', duration: 90 },
      { date: '2024-12-20', time: '14:00', duration: 30 },
      { date: '2024-12-21', time: '09:00', duration: 120 },
      { date: '2024-12-21', time: '15:00', duration: 45 },
    ]

    // Verificar si hay conflicto con citas existentes
    const selectedTime = new Date(`2000-01-01T${time}`)
    const selectedHour = selectedTime.getHours()
    const selectedMinute = selectedTime.getMinutes()

    // Verificar horarios de trabajo
    if (selectedHour < WORK_HOURS.start || selectedHour >= WORK_HOURS.end) {
      return false
    }

    // Verificar conflictos con citas existentes
    const serviceDuration =
      SERVICE_DURATIONS[formData.service as keyof typeof SERVICE_DURATIONS] || 30

    for (const appointment of existingAppointments) {
      if (appointment.date === date) {
        const aptTime = new Date(`2000-01-01T${appointment.time}`)
        const aptHour = aptTime.getHours()
        const aptMinute = aptTime.getMinutes()

        // Calcular si hay solapamiento
        const aptStart = aptHour * 60 + aptMinute
        const aptEnd = aptStart + appointment.duration
        const slotStart = selectedHour * 60 + selectedMinute
        const slotEnd = slotStart + serviceDuration

        if (slotStart < aptEnd && slotEnd > aptStart) {
          return false // Hay conflicto
        }
      }
    }

    return true
  }

  // Generar fechas disponibles con validaciones
  const availableDates = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 90 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      return dateString
    }).filter(isValidDate)
  }, [])

  // Horarios disponibles (solo horarios de trabajo)
  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + WORK_HOURS.start
    const minute = (i % 2) * 30
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }).filter(time => {
    const [hour] = time.split(':')
    return parseInt(hour) < WORK_HOURS.end
  })

  // Servicios disponibles
  const services = [
    'Consulta general',
    'Limpieza dental',
    'Blanqueamiento',
    'Ortodoncia',
    'Implantes',
    'Prótesis',
    'Endodoncia',
    'Cirugía oral',
  ]

  // Validación de campos
  const validateField = (field: keyof AppointmentFormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        return value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : undefined
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Email inválido' : undefined
      case 'phone':
        if (value && value.length !== 9) return 'Teléfono debe tener exactamente 9 dígitos (Perú)'
        return undefined
      case 'service':
        return !value ? 'Selecciona un servicio' : undefined
      case 'date':
        if (!value) return 'Selecciona una fecha'
        if (!isValidDate(value)) return 'Fecha no válida o no disponible'
        return undefined
      case 'time':
        if (!value) return 'Selecciona un horario'
        if (!isTimeSlotAvailable(selectedDate, value)) return 'Horario no disponible'
        return undefined
      default:
        return undefined
    }
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setFormData(prev => ({ ...prev, date }))
    setSelectedTime('')
    setErrors(prev => ({ ...prev, date: undefined, time: undefined }))
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setFormData(prev => ({ ...prev, time }))
    setErrors(prev => ({ ...prev, time: undefined }))
  }

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Validar en tiempo real
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
      const field = key as keyof AppointmentFormData
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Cargar Firebase solo cuando se envía el formulario
      await loadFirebaseFunctions()

      if (!createAppointment) {
        throw new Error('Firebase no está disponible')
      }

      // Preparar datos para Firebase
      const appointmentData: CreateAppointmentData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes?.trim() || '',
      }

      // Crear cita en Firebase
      const appointmentId = await createAppointment(appointmentData)

      console.log('✅ Cita creada exitosamente con ID:', appointmentId)

      // Mostrar toast de éxito
      toast({
        title: '🎉 ¡Cita agendada exitosamente!',
        description:
          'Recibirás un email de confirmación con todos los detalles. También hemos notificado a nuestro equipo.',
        duration: 5000,
      })

      // Llamar callback si existe
      if (onSubmit) {
        onSubmit({
          ...appointmentData,
          notes: appointmentData.notes || '',
        })
      }

      // Resetear formulario
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      })
      setSelectedDate('')
      setSelectedTime('')
      setErrors({})

      // Recargar horarios disponibles (con manejo de errores)
      if (selectedDate) {
        try {
          const slots = await getAvailableTimeSlots(selectedDate)
          setAvailableSlots(slots)
        } catch (error) {
          console.warn('⚠️ No se pudieron recargar horarios:', error)
          // No mostrar error al usuario por esto
        }
      }

      // Ocultar mensaje de éxito después de 8 segundos
      setTimeout(() => setIsSubmitted(false), 8000)
    } catch (error) {
      console.error('❌ Error al crear cita:', error)

      // Mostrar toast de error
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'

      toast({
        title: '❌ Error al agendar cita',
        description: errorMessage,
        variant: 'destructive',
      })

      // También mantener el error en el estado para compatibilidad
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-200">
          ¡Cita agendada exitosamente!
        </h3>
        <p className="text-sm text-green-600 dark:text-green-300">
          Te enviaremos un email de confirmación con los detalles.
        </p>
      </motion.div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="mb-4 text-center">
        <h3 className="mb-2 text-xl font-bold text-gray-600 dark:text-gray-300">Agenda tu cita</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selecciona fecha, horario y servicio para tu consulta
        </p>

        {/* Información de horarios */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              Horario: {WORK_HOURS.start}:00 - {WORK_HOURS.end}:00
            </span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Anticipación: {WORK_HOURS.minAdvance}h</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Información personal */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <User className="h-4 w-4" />
              Nombre completo *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder="Tu nombre completo"
              className={cn(
                'rounded-lg border-green-200 bg-white px-3 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/30',
                errors.name && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              )}
              required
            />
            {errors.name && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Mail className="h-4 w-4" />
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder="tu@email.com"
              className={cn(
                'rounded-lg border-green-200 bg-white px-3 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/30',
                errors.email && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              )}
              required
            />
            {errors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Phone className="h-4 w-4" />
              Teléfono
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="+51 999 999 999"
              className={cn(
                'rounded-lg border-green-200 bg-white px-3 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/30',
                errors.phone && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              )}
            />
            {errors.phone && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <FileText className="h-4 w-4" />
              Servicio *
            </label>
            <Select
              value={formData.service}
              onValueChange={value => handleInputChange('service', value)}
            >
              <SelectTrigger
                className={cn(
                  'w-full rounded-lg border-green-200 bg-white px-3 py-2 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/30',
                  errors.service && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                )}
              >
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent className="w-full min-w-[300px]">
                {services.map(service => (
                  <SelectItem key={service} value={service}>
                    <div className="flex w-full items-center justify-between">
                      <span>{service}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {SERVICE_DURATIONS[service as keyof typeof SERVICE_DURATIONS]} min
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.service}
              </p>
            )}
          </div>
        </div>

        {/* Selección de fecha */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Calendar className="h-4 w-4" />
            Selecciona fecha *
          </label>
          <div className="grid max-h-40 grid-cols-7 gap-1.5 overflow-y-auto rounded-lg border border-green-200 p-2 dark:border-gray-600">
            {availableDates.map(date => {
              const dateObj = new Date(date)
              const isSelected = selectedDate === date
              const isToday = date === todayString
              const isHoliday = PERU_HOLIDAYS.includes(date)

              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  disabled={isHoliday}
                  className={cn(
                    'rounded-md border p-2 text-center transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50',
                    isSelected
                      ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : isHoliday
                        ? 'border-red-200 bg-red-50 text-red-400 dark:border-red-800 dark:bg-red-900/20 dark:text-red-500'
                        : 'border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-gray-600 dark:hover:border-green-600 dark:hover:bg-green-900/10',
                    isToday && 'ring-2 ring-green-300 dark:ring-green-600'
                  )}
                  title={isHoliday ? 'Feriado - No disponible' : undefined}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {dateObj.toLocaleDateString('es-ES', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-semibold">{dateObj.getDate()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {dateObj.toLocaleDateString('es-ES', { month: 'short' })}
                  </div>
                  {isHoliday && <div className="mt-1 text-xs text-red-500">🎉</div>}
                </button>
              )
            })}
          </div>
          {errors.date && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-3 w-3" />
              {errors.date}
            </p>
          )}
        </div>

        {/* Selección de horario */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4" />
              Selecciona horario *
              {loadingSlots && <Loader2 className="h-4 w-4 animate-spin text-green-600" />}
            </label>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Cargando horarios disponibles...
                </div>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    No hay horarios disponibles para esta fecha. Por favor, selecciona otra fecha.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {availableSlots.map(time => {
                  const isSelected = selectedTime === time

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        'rounded-md border p-2 text-center text-sm transition-all hover:scale-105',
                        isSelected
                          ? 'border-green-600 bg-green-50 text-green-700 shadow-md dark:bg-green-900/20 dark:text-green-300'
                          : 'border-green-200 text-gray-700 hover:border-green-300 hover:bg-green-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-green-600 dark:hover:bg-gray-800'
                      )}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            )}

            {errors.time && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.time}
              </p>
            )}
          </motion.div>
        )}

        {/* Notas adicionales */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <FileText className="h-4 w-4" />
            Notas adicionales
          </label>
          <textarea
            value={formData.notes}
            onChange={e => handleInputChange('notes', e.target.value)}
            placeholder="Información adicional sobre tu consulta..."
            rows={2}
            className={`w-full resize-none rounded-lg border-green-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/30`}
          />
        </div>

        {/* Mensaje de error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-700 dark:text-red-300">{submitError}</p>
            </div>
          </motion.div>
        )}

        {/* Botón de envío */}
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !formData.name ||
            !formData.email ||
            !formData.service ||
            !formData.date ||
            !formData.time ||
            loadingSlots
          }
          className="group w-full bg-green-800 font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Agendando cita...
            </div>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              Confirmar cita
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
