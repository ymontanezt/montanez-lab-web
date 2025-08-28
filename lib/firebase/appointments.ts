// Firebase Appointments Service
// Servicio para gestionar citas en Firestore

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'
import { sendAppointmentConfirmation, sendAppointmentNotification } from '../email'

// Tipos para las citas
export interface AppointmentData {
  id?: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: Timestamp
  updatedAt?: Timestamp
  userId?: string // Para usuarios autenticados
}

// Tipo para crear nueva cita
export interface CreateAppointmentData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
}

// Validación de datos de cita
export const validateAppointmentData = (data: CreateAppointmentData): string[] => {
  const errors: string[] = []

  // Validar nombre
  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres')
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Ingresa un email válido')
  }

  // Validar teléfono (formato Perú)
  const phoneRegex = /^(\+51|51)?[9][0-9]{8}$/
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Ingresa un teléfono válido de Perú (9 dígitos)')
  }

  // Validar servicio
  if (!data.service) {
    errors.push('Selecciona un servicio')
  }

  // Validar fecha
  if (!data.date) {
    errors.push('Selecciona una fecha')
  } else {
    const selectedDate = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      errors.push('La fecha no puede ser anterior a hoy')
    }

    // Verificar que no sea muy lejana (90 días)
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 90)
    if (selectedDate > maxDate) {
      errors.push('La fecha no puede ser mayor a 90 días')
    }
  }

  // Validar hora
  if (!data.time) {
    errors.push('Selecciona una hora')
  }

  return errors
}

// Crear nueva cita
export const createAppointment = async (data: CreateAppointmentData): Promise<string> => {
  try {
    // Verificar que Firebase esté disponible
    if (!db) {
      throw new Error('Firebase no está disponible. Verifica la conexión.')
    }

    // Validar datos
    const validationErrors = validateAppointmentData(data)
    if (validationErrors.length > 0) {
      throw new Error(`Errores de validación: ${validationErrors.join(', ')}`)
    }

    // Verificar disponibilidad de la fecha/hora
    const isAvailable = await checkAppointmentAvailability(data.date, data.time)
    if (!isAvailable) {
      throw new Error('La fecha y hora seleccionadas no están disponibles')
    }

    // Preparar datos para Firestore
    const appointmentData: Omit<AppointmentData, 'id'> = {
      ...data,
      phone: data.phone.replace(/\s/g, ''), // Limpiar espacios del teléfono
      status: 'pending',
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    }

    // Guardar en Firestore
    const docRef = await addDoc(collection(db, 'appointments'), appointmentData)
    const appointmentId = docRef.id

    // Enviar emails de confirmación (en paralelo para no bloquear)
    try {


      // Email al cliente
      const clientEmailPromise = sendAppointmentConfirmation({
        ...data,
        appointmentId,
        notes: data.notes || '',
      })

      // Email al admin
      const adminEmailPromise = sendAppointmentNotification({
        ...data,
        appointmentId,
        notes: data.notes || '',
      })

      // Ejecutar ambos emails en paralelo
      const [clientEmailSent, adminEmailSent] = await Promise.allSettled([
        clientEmailPromise,
        adminEmailPromise,
      ])

      if (clientEmailSent.status === 'fulfilled' && clientEmailSent.value) {

      } else if (clientEmailSent.status === 'rejected') {
        console.warn('⚠️ Error enviando email al cliente:', clientEmailSent.reason)
      }

      if (adminEmailSent.status === 'fulfilled' && adminEmailSent.value) {

      } else if (adminEmailSent.status === 'rejected') {
        console.warn('⚠️ Error enviando email al admin:', adminEmailSent.reason)
      }
    } catch (emailError) {
      console.warn('⚠️ Error en el sistema de emails:', emailError)
      // No fallar la creación de la cita por errores de email
    }

    return appointmentId
  } catch (error) {
    console.error('❌ Error al crear cita:', error)

    // Manejar errores específicos de Firebase
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('No tienes permisos para crear citas. Contacta al administrador.')
      } else if (error.message.includes('unavailable')) {
        throw new Error('Firebase no está disponible. Inténtalo más tarde.')
      } else if (error.message.includes('network')) {
        throw new Error('Error de conexión. Verifica tu internet e inténtalo de nuevo.')
      } else {
        throw new Error(`Error al crear cita: ${error.message}`)
      }
    } else {
      throw new Error('Error inesperado al crear cita. Inténtalo de nuevo.')
    }
  }
}

// Verificar disponibilidad de cita
export const checkAppointmentAvailability = async (
  date: string,
  time: string
): Promise<boolean> => {
  try {
    // Verificar que Firebase esté disponible
    if (!db) {
      console.warn('⚠️ Firebase no disponible para verificar disponibilidad')
      return true // Permitir continuar si Firebase no está disponible
    }

    // Crear un timeout para la consulta
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: La consulta tardó demasiado')), 10000)
    })

    // Buscar citas existentes en la misma fecha y hora
    const q = query(
      collection(db, 'appointments'),
      where('date', '==', date),
      where('time', '==', time),
      where('status', 'in', ['pending', 'confirmed'])
    )

    // Ejecutar consulta con timeout
    const querySnapshot = (await Promise.race([getDocs(q), timeoutPromise])) as any

    // Si no hay citas, está disponible
    return querySnapshot.empty
  } catch (error) {
    console.error('❌ Error al verificar disponibilidad:', error)

    // En caso de error, permitir continuar (fallback)
    if (error instanceof Error && error.message.includes('Timeout')) {
      console.warn('⚠️ Timeout al verificar disponibilidad, permitiendo continuar')
    }

    return true // Permitir continuar si hay error
  }
}

// Obtener citas por fecha
export const getAppointmentsByDate = async (date: string): Promise<AppointmentData[]> => {
  try {
    // Verificar que Firebase esté disponible
    if (!db) {
      console.warn('⚠️ Firebase no disponible para obtener citas')
      return []
    }

    // Crear un timeout para la consulta
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: La consulta tardó demasiado')), 8000)
    })

    // Consulta simple sin orderBy para evitar problemas de índice
    const q = query(collection(db, 'appointments'), where('date', '==', date))

    // Ejecutar consulta con timeout
    const querySnapshot = (await Promise.race([getDocs(q), timeoutPromise])) as any

    const appointments: AppointmentData[] = []

    querySnapshot.forEach((doc: any) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
      } as AppointmentData)
    })

    // Ordenar en memoria para evitar problemas de índice
    appointments.sort((a, b) => a.time.localeCompare(b.time))

    return appointments
  } catch (error) {
    console.error('❌ Error al obtener citas por fecha:', error)

    // Si es error de índice, mostrar instrucciones
    if (error instanceof Error && error.message.includes('index')) {
      console.warn('⚠️ Error de índice en Firestore. Considera crear el índice compuesto.')
      console.warn(
        '🔗 URL para crear índice:',
        error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/)?.[0] || 'N/A'
      )
    }

    return []
  }
}

// Obtener todas las citas (para admin)
export const getAllAppointments = async (limitCount: number = 50): Promise<AppointmentData[]> => {
  try {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'), limit(limitCount))

    const querySnapshot = await getDocs(q)
    const appointments: AppointmentData[] = []

    querySnapshot.forEach(doc => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
      } as AppointmentData)
    })

    return appointments
  } catch (error) {
    console.error('❌ Error al obtener todas las citas:', error)
    return []
  }
}

// Actualizar estado de cita
export const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentData['status']
): Promise<void> => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status,
      updatedAt: serverTimestamp(),
    })


  } catch (error) {
    console.error('❌ Error al actualizar estado de cita:', error)
    throw error
  }
}

// Actualizar cita completa
export const updateAppointment = async (
  appointmentId: string,
  data: Partial<AppointmentData>
): Promise<void> => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })


  } catch (error) {
    console.error('❌ Error al actualizar cita:', error)
    throw error
  }
}

// Eliminar cita
export const deleteAppointment = async (appointmentId: string): Promise<void> => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await deleteDoc(appointmentRef)


  } catch (error) {
    console.error('❌ Error al eliminar cita:', error)
    throw error
  }
}

// Obtener citas por email (para usuarios)
export const getAppointmentsByEmail = async (email: string): Promise<AppointmentData[]> => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('email', '==', email),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    const appointments: AppointmentData[] = []

    querySnapshot.forEach(doc => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
      } as AppointmentData)
    })

    return appointments
  } catch (error) {
    console.error('❌ Error al obtener citas por email:', error)
    return []
  }
}

// Obtener estadísticas de citas
export const getAppointmentStats = async () => {
  try {
    const allAppointments = await getAllAppointments(1000)

    const stats = {
      total: allAppointments.length,
      pending: allAppointments.filter(apt => apt.status === 'pending').length,
      confirmed: allAppointments.filter(apt => apt.status === 'confirmed').length,
      completed: allAppointments.filter(apt => apt.status === 'completed').length,
      cancelled: allAppointments.filter(apt => apt.status === 'cancelled').length,
      thisMonth: allAppointments.filter(apt => {
        const aptDate = new Date(apt.createdAt?.toDate?.() || apt.date)
        const now = new Date()
        return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear()
      }).length,
    }

    return stats
  } catch (error) {
    console.error('❌ Error al obtener estadísticas de citas:', error)
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      thisMonth: 0,
    }
  }
}

// Generar horarios disponibles para una fecha
export const getAvailableTimeSlots = async (date: string): Promise<string[]> => {
  try {
    // Horarios base (cada 30 minutos de 8:00 a 18:00)
    const baseSlots = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
    ]

    // Verificar que Firebase esté disponible
    if (!db) {
      console.warn('⚠️ Firebase no disponible, usando horarios base')
      return baseSlots
    }

    // Crear un timeout para la consulta
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: La consulta tardó demasiado')), 8000)
    })

    // Obtener citas existentes para la fecha
    const existingAppointments = (await Promise.race([
      getAppointmentsByDate(date),
      timeoutPromise,
    ])) as AppointmentData[]

    const bookedSlots = existingAppointments
      .filter(apt => apt.status === 'pending' || apt.status === 'confirmed')
      .map(apt => apt.time)

    // Filtrar horarios disponibles
    const availableSlots = baseSlots.filter(slot => !bookedSlots.includes(slot))

    // Si es hoy, filtrar horarios pasados
    const today = new Date().toISOString().split('T')[0]
    if (date === today) {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      return availableSlots.filter(slot => {
        const [hour, minute] = slot.split(':').map(Number)
        const slotTime = hour * 60 + minute
        const currentTime = currentHour * 60 + currentMinute

        // Permitir solo horarios con al menos 2 horas de anticipación
        return slotTime > currentTime + 120
      })
    }

    return availableSlots
  } catch (error) {
    console.error('❌ Error al obtener horarios disponibles:', error)

    // En caso de error, devolver horarios base como fallback
    if (error instanceof Error && error.message.includes('Timeout')) {
      console.warn('⚠️ Timeout al obtener horarios, usando horarios base')
    }

    return [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
    ]
  }
}

export default {
  createAppointment,
  checkAppointmentAvailability,
  getAppointmentsByDate,
  getAllAppointments,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByEmail,
  getAppointmentStats,
  getAvailableTimeSlots,
  validateAppointmentData,
}
