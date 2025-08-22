// Firebase configuration and initialization
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

function initializeFirebase() {
  // Only initialize on client side
  if (typeof window === 'undefined') {
    return { app: null, auth: null, db: null }
  }

  if (app && auth && db) {
    return { app, auth, db }
  }

  try {
    // Check if all required env vars are present
    const hasAllVars = Object.values(firebaseConfig).every(value => value)

    if (!hasAllVars) {
      console.warn('Firebase: Missing environment variables')
      return { app: null, auth: null, db: null }
    }

    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)

    return { app, auth, db }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    return { app: null, auth: null, db: null }
  }
}

export function getFirebaseAuth(): Auth | null {
  const { auth } = initializeFirebase()
  return auth
}

export function getFirebaseDb(): Firestore | null {
  const { db } = initializeFirebase()
  return db
}

export function getFirebaseApp(): FirebaseApp | null {
  const { app } = initializeFirebase()
  return app
}

// Legacy exports for backward compatibility
export { auth, db }
export default app
