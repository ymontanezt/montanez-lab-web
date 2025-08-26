// Firestore database service functions
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase/config'

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  phone: string
  clinic: string
  service: string
  message: string
  urgency: 'baja' | 'media' | 'alta'
  status: 'nuevo' | 'contactado' | 'completado'
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Collections
const CONTACTS_COLLECTION = 'contacts'

// Add a new contact submission
export const addContactSubmission = async (
  contactData: Omit<ContactSubmission, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    if (!db) {
      throw new Error('Firebase no está configurado')
    }
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), {
      ...contactData,
      status: 'nuevo',
      createdAt: now,
      updatedAt: now,
    })

    console.log('[v0] Contact submission added with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('[v0] Error adding contact submission:', error)
    throw new Error('Error al guardar la información de contacto')
  }
}

// Get all contact submissions (for admin dashboard)
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    if (!db) {
      throw new Error('Firebase no está configurado')
    }
    const q = query(collection(db, CONTACTS_COLLECTION), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const contacts: ContactSubmission[] = []
    querySnapshot.forEach(doc => {
      contacts.push({
        id: doc.id,
        ...doc.data(),
      } as ContactSubmission)
    })

    return contacts
  } catch (error) {
    console.error('[v0] Error getting contact submissions:', error)
    throw new Error('Error al obtener las consultas')
  }
}

// Get contact submissions by status
export const getContactSubmissionsByStatus = async (
  status: ContactSubmission['status']
): Promise<ContactSubmission[]> => {
  try {
    if (!db) {
      throw new Error('Firebase no está configurado')
    }
    const q = query(
      collection(db, CONTACTS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const contacts: ContactSubmission[] = []
    querySnapshot.forEach(doc => {
      contacts.push({
        id: doc.id,
        ...doc.data(),
      } as ContactSubmission)
    })

    return contacts
  } catch (error) {
    console.error('[v0] Error getting contact submissions by status:', error)
    throw new Error('Error al obtener las consultas por estado')
  }
}

// Update contact submission status
export const updateContactStatus = async (
  contactId: string,
  status: ContactSubmission['status']
): Promise<void> => {
  try {
    if (!db) {
      throw new Error('Firebase no está configurado')
    }
    const contactRef = doc(db, CONTACTS_COLLECTION, contactId)
    await updateDoc(contactRef, {
      status,
      updatedAt: Timestamp.now(),
    })

    console.log('[v0] Contact status updated:', contactId, status)
  } catch (error) {
    console.error('[v0] Error updating contact status:', error)
    throw new Error('Error al actualizar el estado de la consulta')
  }
}

// Delete contact submission
export const deleteContactSubmission = async (contactId: string): Promise<void> => {
  try {
    if (!db) {
      throw new Error('Firebase no está configurado')
    }
    await deleteDoc(doc(db, CONTACTS_COLLECTION, contactId))
    console.log('[v0] Contact submission deleted:', contactId)
  } catch (error) {
    console.error('[v0] Error deleting contact submission:', error)
    throw new Error('Error al eliminar la consulta')
  }
}

// Get contact submissions count by status (for dashboard stats)
export const getContactStats = async () => {
  try {
    const allContacts = await getContactSubmissions()

    const stats = {
      total: allContacts.length,
      nuevo: allContacts.filter(c => c.status === 'nuevo').length,
      contactado: allContacts.filter(c => c.status === 'contactado').length,
      completado: allContacts.filter(c => c.status === 'completado').length,
      urgente: allContacts.filter(c => c.urgency === 'alta').length,
    }

    return stats
  } catch (error) {
    console.error('[v0] Error getting contact stats:', error)
    throw new Error('Error al obtener las estadísticas')
  }
}
