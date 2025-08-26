'use client'

import { useState, useEffect } from 'react'
import { auth, db, app } from '@/lib/firebase/config'

export function useFirebase() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return

    const initFirebase = () => {
      try {
        if (auth && db && app) {
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
