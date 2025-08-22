import { db } from './config'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'

export interface ServiceData {
  id?: string
  slug: string
  title: string
  subtitle: string
  description: string
  shortDescription: string
  image: string
  icon: string
  color: string
  category: string
  isActive: boolean
  order: number
  features: string[]
  benefits: string[]
  process: {
    step: string
    title: string
    description: string
    icon: string
    duration: string
  }[]
  testimonial: {
    text: string
    author: string
    role: string
    rating: number
    clinic: string
  }
  price: string
  duration: string
  createdAt: any
  updatedAt: any
}

// Colección de servicios
const SERVICES_COLLECTION = 'services'

// ===== SERVICIOS =====

export const getAllServices = async (): Promise<ServiceData[]> => {
  try {
    const q = query(
      collection(db, SERVICES_COLLECTION),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ServiceData[]
  } catch (error) {
    console.error('Error getting services:', error)
    throw error
  }
}

export const getServiceBySlug = async (slug: string): Promise<ServiceData | null> => {
  try {
    const q = query(
      collection(db, SERVICES_COLLECTION),
      where('slug', '==', slug),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) return null

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as ServiceData
  } catch (error) {
    console.error('Error getting service by slug:', error)
    throw error
  }
}

export const getServicesByCategory = async (category: string): Promise<ServiceData[]> => {
  try {
    const q = query(
      collection(db, SERVICES_COLLECTION),
      where('category', '==', category),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ServiceData[]
  } catch (error) {
    console.error('Error getting services by category:', error)
    throw error
  }
}

export const searchServices = async (query: string): Promise<ServiceData[]> => {
  try {
    const allServices = await getAllServices()
    const lowercaseQuery = query.toLowerCase()

    return allServices.filter(
      service =>
        service.title.toLowerCase().includes(lowercaseQuery) ||
        service.description.toLowerCase().includes(lowercaseQuery) ||
        service.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    )
  } catch (error) {
    console.error('Error searching services:', error)
    throw error
  }
}
