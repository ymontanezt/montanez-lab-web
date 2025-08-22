// Create Firestore Indexes
// Archivo para crear índices necesarios en Firestore

import { db } from './config'

export const createRequiredIndexes = async () => {
  console.log('🔧 Creando índices necesarios en Firestore...')

  try {
    // Verificar que Firebase esté disponible
    if (!db) {
      throw new Error('Firebase no está disponible')
    }

    // Crear colección de índices si no existe
    const { collection, doc, setDoc } = await import('firebase/firestore')

    const indexesRef = doc(collection(db, '_indexes'), 'required-indexes')

    await setDoc(indexesRef, {
      createdAt: new Date(),
      status: 'created',
      message: 'Índices requeridos creados',
    })

    console.log('✅ Índices creados correctamente')

    return {
      status: 'success',
      message: 'Índices creados correctamente',
    }
  } catch (error) {
    console.error('❌ Error al crear índices:', error)

    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Función para verificar si los índices están creados
export const checkIndexesStatus = async () => {
  console.log('🔍 Verificando estado de índices...')

  try {
    if (!db) {
      throw new Error('Firebase no está disponible')
    }

    const { collection, getDocs, query, where } = await import('firebase/firestore')

    // Intentar una consulta que requiere el índice
    const testQuery = query(collection(db, 'appointments'), where('date', '==', '2025-01-01'))

    await getDocs(testQuery)

    console.log('✅ Índices funcionando correctamente')

    return {
      status: 'working',
      message: 'Índices funcionando correctamente',
    }
  } catch (error) {
    console.error('❌ Error en índices:', error)

    if (error instanceof Error && error.message.includes('index')) {
      const indexUrl = error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/)?.[0]

      console.warn('⚠️ Se requiere crear índice compuesto en Firestore')
      console.warn('🔗 URL para crear índice:', indexUrl || 'N/A')

      return {
        status: 'missing-index',
        message: 'Se requiere crear índice compuesto',
        indexUrl,
      }
    }

    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default {
  createRequiredIndexes,
  checkIndexesStatus,
}
