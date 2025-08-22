// Test Firebase Connection
// Archivo para probar la conexión a Firebase

import { db, auth } from './config'

export const testFirebaseConnection = async () => {
  console.log('🧪 Probando conexión a Firebase...')

  try {
    // Verificar que db esté disponible
    if (!db) {
      throw new Error('Firebase Firestore no está disponible')
    }

    console.log('✅ Firestore disponible')

    // Verificar que auth esté disponible
    if (!auth) {
      throw new Error('Firebase Auth no está disponible')
    }

    console.log('✅ Auth disponible')

    // Intentar una operación simple de Firestore
    const { collection, getDocs, limit, query } = await import('firebase/firestore')

    console.log('🚀 Intentando consulta de prueba...')

    const testQuery = query(collection(db, '_health'), limit(1))
    const testSnapshot = await getDocs(testQuery)

    console.log('✅ Consulta de prueba exitosa')

    return {
      status: 'connected',
      firestore: 'available',
      auth: 'available',
      testQuery: 'success',
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('❌ Error en prueba de conexión:', error)

    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
}

export const testAppointmentCreation = async () => {
  console.log('🧪 Probando creación de cita...')

  try {
    const { createAppointment } = await import('./appointments')

    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '999999999',
      service: 'Consulta general',
      date: '2025-12-31',
      time: '10:00',
      notes: 'Cita de prueba',
    }

    console.log('🚀 Creando cita de prueba...')

    const appointmentId = await createAppointment(testData)

    console.log('✅ Cita de prueba creada:', appointmentId)

    return {
      status: 'success',
      appointmentId,
      message: 'Cita de prueba creada exitosamente',
    }
  } catch (error) {
    console.error('❌ Error en prueba de creación:', error)

    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'No se pudo crear la cita de prueba',
    }
  }
}

export default {
  testFirebaseConnection,
  testAppointmentCreation,
}
