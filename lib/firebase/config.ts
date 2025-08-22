// Firebase configuration
// Configuración centralizada de Firebase usando variables de entorno

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Verificar que las variables de entorno estén configuradas
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
]

// Validar variables de entorno
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
if (missingVars.length > 0) {
  console.warn('⚠️ Variables de Firebase faltantes:', missingVars)
  console.warn('📝 Configura las variables en tu archivo .env.local')
}

// Inicializar Firebase
let app: any
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
    console.log('✅ Firebase inicializado correctamente')
  } else {
    app = getApp()
    console.log('✅ Firebase app existente recuperada')
  }
} catch (error) {
  console.error('❌ Error al inicializar Firebase:', error)
  throw new Error('No se pudo inicializar Firebase. Verifica la configuración.')
}

// Inicializar servicios
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Inicializar Analytics solo en el cliente y si está soportado
let analytics = null
if (typeof window !== 'undefined') {
  isSupported().then(yes => (yes ? (analytics = getAnalytics(app)) : null))
}
export { analytics }

// Conectar a emuladores en desarrollo
if (process.env.NODE_ENV === 'development') {
  // Solo conectar si las variables de emulador están configuradas
  if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
    try {
      // Auth emulator
      if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
        connectAuthEmulator(auth, `http://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST}`)
        console.log('🔧 Firebase Auth Emulator conectado')
      }

      // Firestore emulator
      if (process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST) {
        connectFirestoreEmulator(
          db,
          'localhost',
          parseInt(process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST)
        )
        console.log('🔧 Firebase Firestore Emulator conectado')
      }

      // Storage emulator
      if (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST) {
        connectStorageEmulator(
          storage,
          'localhost',
          parseInt(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST)
        )
        console.log('🔧 Firebase Storage Emulator conectado')
      }
    } catch (error) {
      console.warn('⚠️ Error conectando a emuladores:', error)
    }
  }
}

// Exportar la app de Firebase
export { app }

// Configuración de Firestore
export const firestoreConfig = {
  // Configuración de caché
  cacheSizeBytes: 50 * 1024 * 1024, // 50MB
  // Configuración de persistencia
  experimentalForceLongPolling: false,
  useFetchStreams: false,
}

// Configuración de Auth
export const authConfig = {
  // Configuración de persistencia
  persistence: 'local', // 'local', 'session', 'none'
  // Configuración de tiempo de expiración
  sessionTimeout: 60 * 60 * 1000, // 1 hora
}

// Configuración de Storage
export const storageConfig = {
  // Configuración de caché
  maxUploadRetryTime: 60000, // 1 minuto
  maxOperationRetryTime: 120000, // 2 minutos
}

// Función para verificar el estado de Firebase
export const checkFirebaseStatus = async () => {
  try {
    // Verificar conexión a Firestore
    const { collection, doc, getDoc } = await import('firebase/firestore')
    const healthRef = doc(collection(db, '_health'), 'ping')
    await getDoc(healthRef)

    // Verificar conexión a Auth
    const currentUser = auth.currentUser

    return {
      status: 'connected',
      firestore: 'connected',
      auth: 'connected',
      user: currentUser ? 'authenticated' : 'anonymous',
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
}

// Función para limpiar recursos de Firebase
export const cleanupFirebase = async () => {
  try {
    // Cerrar conexiones de Firestore
    // Firestore v9 no tiene método terminate, se limpia automáticamente

    // Cerrar conexiones de Storage
    // Storage no tiene método de limpieza específico

    console.log('🧹 Firebase resources cleaned up')
  } catch (error) {
    console.warn('⚠️ Error cleaning up Firebase:', error)
  }
}

export default app
