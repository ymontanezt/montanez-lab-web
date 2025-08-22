'use client'

import { useState, useEffect } from 'react'
import { getFirebaseAuth, getFirebaseDb, getFirebaseApp } from '@/lib/firebase'

export function useFirebase() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [auth, setAuth] = useState(getFirebaseAuth())
  const [db, setDb] = useState(getFirebaseDb())
  const [app, setApp] = useState(getFirebaseApp())

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return

    const initFirebase = () => {
      try {
        const newAuth = getFirebaseAuth()
        const newDb = getFirebaseDb()
        const newApp = getFirebaseApp()

        if (newAuth && newDb && newApp) {
          setAuth(newAuth)
          setDb(newDb)
          setApp(newApp)
          setIsInitialized(true)
        }
      } catch (error) {
        console.error('Firebase initialization error:', error)
      }
    }

    // Small delay to ensure environment variables are loaded
    const timer = setTimeout(initFirebase, 100)
    return () => clearTimeout(timer)
  }, [])

  return {
    auth,
    db,
    app,
    isInitialized,
    isLoading: !isInitialized && typeof window !== 'undefined',
  }
}
