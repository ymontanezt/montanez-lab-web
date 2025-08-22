import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './config'

export interface AdminUser {
  uid: string
  email: string
  role: 'super_admin' | 'admin' | 'moderator'
  permissions: string[]
  createdAt: string
  active: boolean
  lastLogin?: string
}

/**
 * Verificar si un usuario es administrador
 */
export const isUserAdmin = async (email: string): Promise<boolean> => {
  try {
    const adminDoc = doc(db, 'admins', email)
    const adminSnap = await getDoc(adminDoc)

    if (adminSnap.exists()) {
      const adminData = adminSnap.data() as AdminUser
      return (adminData.active && adminData.role === 'super_admin') || adminData.role === 'admin'
    }

    return false
  } catch (error) {
    console.warn('⚠️ Error verificando si usuario es admin:', error)
    return false
  }
}

/**
 * Obtener información completa del administrador
 */
export const getAdminInfo = async (email: string): Promise<AdminUser | null> => {
  try {
    const adminDoc = doc(db, 'admins', email)
    const adminSnap = await getDoc(adminDoc)

    if (adminSnap.exists()) {
      return adminSnap.data() as AdminUser
    }

    return null
  } catch (error) {
    console.error('❌ Error obteniendo información de admin:', error)
    return null
  }
}

/**
 * Verificar permisos específicos del administrador
 */
export const hasAdminPermission = async (email: string, permission: string): Promise<boolean> => {
  try {
    const adminInfo = await getAdminInfo(email)

    if (!adminInfo) return false

    // Super admin tiene todos los permisos
    if (adminInfo.role === 'super_admin') return true

    // Verificar permiso específico
    return adminInfo.permissions.includes(permission) || adminInfo.permissions.includes('all')
  } catch (error) {
    console.warn('⚠️ Error verificando permisos de admin:', error)
    return false
  }
}

/**
 * Actualizar último login del administrador
 */
export const updateAdminLastLogin = async (email: string): Promise<void> => {
  try {
    const adminDoc = doc(db, 'admins', email)
    await updateDoc(adminDoc, {
      lastLogin: new Date().toISOString(),
    })
  } catch (error) {
    console.warn('⚠️ Error actualizando último login de admin:', error)
  }
}
