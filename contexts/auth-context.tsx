'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { type AuthUser, onAuthStateChange } from '@/lib/auth'
import { isUserAdmin, getAdminInfo, type AdminUser } from '@/lib/firebase/admin'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  adminInfo: AdminUser | null
  adminLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  adminInfo: null,
  adminLoading: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminInfo, setAdminInfo] = useState<AdminUser | null>(null)
  const [adminLoading, setAdminLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChange(async user => {
      setUser(user)
      setLoading(false)

      // Verificar si el usuario es admin
      if (user?.email) {
        setAdminLoading(true)
        try {
          const adminStatus = await isUserAdmin(user.email)
          setIsAdmin(adminStatus)

          if (adminStatus) {
            const adminData = await getAdminInfo(user.email)
            setAdminInfo(adminData)
          }
        } catch (error) {
          console.warn('⚠️ Error verificando admin status:', error)
          setIsAdmin(false)
        } finally {
          setAdminLoading(false)
        }
      } else {
        setIsAdmin(false)
        setAdminInfo(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    adminInfo,
    adminLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
