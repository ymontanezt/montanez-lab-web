// Firebase Admins Service
// Servicio para gestionar administradores en Firestore

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
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './config'

// Tipos para los administradores
export interface AdminData {
  id?: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'moderator' | 'viewer'
  status: 'active' | 'inactive' | 'suspended'
  permissions: AdminPermissions
  createdAt?: string
  updatedAt?: string
  lastLogin?: string
  createdBy?: string
  profileImage?: string
  phone?: string
  department?: string
}

export interface AdminPermissions {
  dashboard: boolean
  contacts: boolean
  appointments: boolean
  reports: boolean
  settings: boolean
  users: boolean
  createUsers: boolean
  deleteUsers: boolean
  exportData: boolean
}

export interface CreateAdminData {
  email: string
  name: string
  password: string
  role: 'admin' | 'moderator' | 'viewer'
  phone?: string
  department?: string
}

// Permisos por defecto según el rol
export const getDefaultPermissions = (role: AdminData['role']): AdminPermissions => {
  switch (role) {
    case 'super_admin':
      return {
        dashboard: true,
        contacts: true,
        appointments: true,
        reports: true,
        settings: true,
        users: true,
        createUsers: true,
        deleteUsers: true,
        exportData: true,
      }
    case 'admin':
      return {
        dashboard: true,
        contacts: true,
        appointments: true,
        reports: true,
        settings: true,
        users: true,
        createUsers: true,
        deleteUsers: false,
        exportData: true,
      }
    case 'moderator':
      return {
        dashboard: true,
        contacts: true,
        appointments: true,
        reports: true,
        settings: false,
        users: false,
        createUsers: false,
        deleteUsers: false,
        exportData: true,
      }
    case 'viewer':
      return {
        dashboard: true,
        contacts: true,
        appointments: true,
        reports: true,
        settings: false,
        users: false,
        createUsers: false,
        deleteUsers: false,
        exportData: false,
      }
  }
}

/**
 * Crear un nuevo administrador
 */
export const createAdmin = async (data: CreateAdminData, createdBy: string): Promise<string> => {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    const user = userCredential.user

    // Actualizar perfil del usuario
    await updateProfile(user, {
      displayName: data.name,
    })

    // Crear documento en Firestore
    const adminData: Omit<AdminData, 'id'> = {
      email: data.email,
      name: data.name,
      role: data.role,
      status: 'active',
      permissions: getDefaultPermissions(data.role),
      phone: data.phone,
      department: data.department,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy,
    }

    const docRef = await addDoc(collection(db, 'admins'), adminData)
    console.log('✅ Administrador creado exitosamente con ID:', docRef.id)

    return docRef.id
  } catch (error) {
    console.error('❌ Error al crear administrador:', error)
    throw new Error('No se pudo crear el administrador. Verifique que el email no esté en uso.')
  }
}

/**
 * Obtener todos los administradores
 */
export const getAllAdmins = async (): Promise<AdminData[]> => {
  try {
    const q = query(collection(db, 'admins'), orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(q)
    const admins: AdminData[] = []

    querySnapshot.forEach(doc => {
      admins.push({
        id: doc.id,
        ...doc.data(),
      } as AdminData)
    })

    return admins
  } catch (error) {
    console.error('❌ Error al obtener administradores:', error)
    return []
  }
}

/**
 * Obtener administrador por email
 */
export const getAdminByEmail = async (email: string): Promise<AdminData | null> => {
  try {
    const q = query(collection(db, 'admins'), where('email', '==', email), limit(1))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as AdminData
  } catch (error) {
    console.error('❌ Error al obtener administrador:', error)
    return null
  }
}

/**
 * Actualizar administrador
 */
export const updateAdmin = async (adminId: string, updates: Partial<AdminData>): Promise<void> => {
  try {
    const adminRef = doc(db, 'admins', adminId)
    await updateDoc(adminRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    })

    console.log('✅ Administrador actualizado exitosamente')
  } catch (error) {
    console.error('❌ Error al actualizar administrador:', error)
    throw new Error('No se pudo actualizar el administrador.')
  }
}

/**
 * Actualizar estado del administrador
 */
export const updateAdminStatus = async (
  adminId: string,
  status: AdminData['status']
): Promise<void> => {
  try {
    await updateAdmin(adminId, { status })
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error)
    throw new Error('No se pudo actualizar el estado del administrador.')
  }
}

/**
 * Actualizar permisos del administrador
 */
export const updateAdminPermissions = async (
  adminId: string,
  permissions: AdminPermissions
): Promise<void> => {
  try {
    await updateAdmin(adminId, { permissions })
  } catch (error) {
    console.error('❌ Error al actualizar permisos:', error)
    throw new Error('No se pudieron actualizar los permisos.')
  }
}

/**
 * Eliminar administrador
 */
export const deleteAdmin = async (adminId: string): Promise<void> => {
  try {
    // Solo eliminar de Firestore (no de Auth por seguridad)
    await deleteDoc(doc(db, 'admins', adminId))
    console.log('✅ Administrador eliminado exitosamente')
  } catch (error) {
    console.error('❌ Error al eliminar administrador:', error)
    throw new Error('No se pudo eliminar el administrador.')
  }
}

/**
 * Actualizar último login
 */
export const updateLastLogin = async (email: string): Promise<void> => {
  try {
    const admin = await getAdminByEmail(email)
    if (admin && admin.id) {
      await updateAdmin(admin.id, {
        lastLogin: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error('❌ Error al actualizar último login:', error)
  }
}

/**
 * Obtener estadísticas de administradores
 */
export const getAdminStats = async () => {
  try {
    const admins = await getAllAdmins()

    const stats = {
      total: admins.length,
      active: admins.filter(admin => admin.status === 'active').length,
      inactive: admins.filter(admin => admin.status === 'inactive').length,
      suspended: admins.filter(admin => admin.status === 'suspended').length,
      byRole: {
        super_admin: admins.filter(admin => admin.role === 'super_admin').length,
        admin: admins.filter(admin => admin.role === 'admin').length,
        moderator: admins.filter(admin => admin.role === 'moderator').length,
        viewer: admins.filter(admin => admin.role === 'viewer').length,
      },
    }

    return stats
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error)
    return {
      total: 0,
      active: 0,
      inactive: 0,
      suspended: 0,
      byRole: {
        super_admin: 0,
        admin: 0,
        moderator: 0,
        viewer: 0,
      },
    }
  }
}
