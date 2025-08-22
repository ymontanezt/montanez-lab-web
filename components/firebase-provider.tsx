'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useFirebase } from '@/hooks/use-firebase'

interface FirebaseContextType {
  auth: any
  db: any
  app: any
  isInitialized: boolean
  isLoading: boolean
}

const FirebaseContext = createContext<FirebaseContextType | null>(null)

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const firebase = useFirebase()

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>
}

export function useFirebaseContext() {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error('useFirebaseContext must be used within FirebaseProvider')
  }
  return context
}
