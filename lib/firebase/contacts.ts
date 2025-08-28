import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { db } from './config'
import { sendEmail } from '../email'

export interface CreateContactData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt?: string
  status?: 'new' | 'read' | 'replied' | 'archived'
}

export interface Contact extends CreateContactData {
  id: string
  createdAt: string
  status: 'new' | 'read' | 'replied' | 'archived'
  updatedAt?: string
  adminNotes?: string
  priority?: 'low' | 'medium' | 'high'
  source?: 'website' | 'admin' | 'api'
}

export interface ContactEmailData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  contactId: string
}

/**
 * Crear un nuevo contacto en Firestore
 */
export const createContact = async (data: CreateContactData): Promise<string> => {
  try {
    const contactData = {
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      status: data.status || 'new',
      updatedAt: new Date().toISOString(),
      priority: 'medium',
      source: 'website',
    }

    const docRef = await addDoc(collection(db, 'contacts'), contactData)
    const contactId = docRef.id


    return contactId
  } catch (error) {
    console.error('❌ Error al crear contacto:', error)
    throw new Error('No se pudo crear el contacto. Por favor, inténtalo de nuevo.')
  }
}

/**
 * Enviar email de notificación de contacto
 */
export const sendContactEmail = async (contactData: ContactEmailData): Promise<boolean> => {
  try {
    // Email para el admin
    const adminEmailPromise = sendEmail({
      to: process.env.NEXT_PUBLIC_CONTACT_ADMIN_EMAIL || 'mmontanezt@gmail.com',
      subject: `Nuevo mensaje de contacto: ${contactData.subject}`,
      text: `
Nuevo mensaje de contacto recibido:

Nombre: ${contactData.name}
Email: ${contactData.email}
Teléfono: ${contactData.phone}
Asunto: ${contactData.subject}
Mensaje: ${contactData.message}
ID de contacto: ${contactData.contactId}

Fecha: ${new Date().toLocaleString('es-PE')}
      `.trim(),
      html: `
        <h2>Nuevo mensaje de contacto recibido</h2>
        <p><strong>Nombre:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Teléfono:</strong> ${contactData.phone}</p>
        <p><strong>Asunto:</strong> ${contactData.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        <p><strong>ID de contacto:</strong> ${contactData.contactId}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-PE')}</p>
      `,
    })

    // Email de confirmación para el usuario
    const userEmailPromise = sendEmail({
      to: contactData.email,
      subject: `Confirmación de mensaje: ${contactData.subject}`,
      text: `
Hola ${contactData.name},

Hemos recibido tu mensaje con el asunto: "${contactData.subject}"

Tu mensaje:
${contactData.message}

Nos pondremos en contacto contigo en las próximas 24 horas.

Gracias por contactarnos.

Saludos,
Equipo Montañez Lab
      `.trim(),
      html: `
        <h2>Confirmación de mensaje recibido</h2>
        <p>Hola <strong>${contactData.name}</strong>,</p>
        <p>Hemos recibido tu mensaje con el asunto: <strong>"${contactData.subject}"</strong></p>
        <p><strong>Tu mensaje:</strong></p>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        <p>Nos pondremos en contacto contigo en las próximas 24 horas.</p>
        <p>Gracias por contactarnos.</p>
        <br>
        <p>Saludos,<br><strong>Equipo Montañez Lab</strong></p>
      `,
    })

    // Enviar ambos emails en paralelo
    const [adminEmailSent, userEmailSent] = await Promise.allSettled([
      adminEmailPromise,
      userEmailPromise,
    ])

    if (adminEmailSent.status === 'fulfilled' && adminEmailSent.value) {

    } else if (adminEmailSent.status === 'rejected') {
      console.warn('⚠️ Error enviando email al admin:', adminEmailSent.reason)
    }

    if (userEmailSent.status === 'fulfilled' && userEmailSent.value) {

    } else if (userEmailSent.status === 'rejected') {
      console.warn('⚠️ Error enviando email al usuario:', userEmailSent.reason)
    }

    return true
  } catch (error) {
    console.error('❌ Error al enviar emails de contacto:', error)
    throw new Error('No se pudieron enviar los emails de confirmación.')
  }
}

/**
 * Obtener todos los contactos (para admin)
 */
export const getAllContacts = async (): Promise<Contact[]> => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(q)
    const contacts: Contact[] = []

    querySnapshot.forEach(doc => {
      contacts.push({
        id: doc.id,
        ...doc.data(),
      } as Contact)
    })

    return contacts
  } catch (error) {
    console.error('❌ Error al obtener contactos:', error)
    throw new Error('No se pudieron obtener los contactos.')
  }
}

/**
 * Obtener contactos por estado
 */
export const getContactsByStatus = async (status: Contact['status']): Promise<Contact[]> => {
  try {
    const q = query(
      collection(db, 'contacts'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    const contacts: Contact[] = []

    querySnapshot.forEach(doc => {
      contacts.push({
        id: doc.id,
        ...doc.data(),
      } as Contact)
    })

    return contacts
  } catch (error) {
    console.error('❌ Error al obtener contactos por estado:', error)
    throw new Error('No se pudieron obtener los contactos.')
  }
}

/**
 * Obtener un contacto específico
 */
export const getContactById = async (id: string): Promise<Contact | null> => {
  try {
    const docRef = doc(db, 'contacts', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Contact
    }

    return null
  } catch (error) {
    console.error('❌ Error al obtener contacto:', error)
    throw new Error('No se pudo obtener el contacto.')
  }
}

/**
 * Actualizar estado de un contacto
 */
export const updateContactStatus = async (
  id: string,
  status: Contact['status'],
  adminNotes?: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'contacts', id)
    await updateDoc(docRef, {
      status,
      adminNotes,
      updatedAt: new Date().toISOString(),
    })


  } catch (error) {
    console.error('❌ Error al actualizar estado de contacto:', error)
    throw new Error('No se pudo actualizar el estado del contacto.')
  }
}

/**
 * Eliminar un contacto
 */
export const deleteContact = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'contacts', id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('❌ Error al eliminar contacto:', error)
    throw new Error('No se pudo eliminar el contacto.')
  }
}

/**
 * Obtener estadísticas de contactos
 */
export const getContactStats = async () => {
  try {
    const allContacts = await getAllContacts()

    const stats = {
      total: allContacts.length,
      new: allContacts.filter(c => c.status === 'new').length,
      read: allContacts.filter(c => c.status === 'read').length,
      replied: allContacts.filter(c => c.status === 'replied').length,
      archived: allContacts.filter(c => c.status === 'archived').length,
      today: allContacts.filter(c => {
        const today = new Date().toDateString()
        const contactDate = new Date(c.createdAt).toDateString()
        return today === contactDate
      }).length,
      thisWeek: allContacts.filter(c => {
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return new Date(c.createdAt) >= weekAgo
      }).length,
    }

    return stats
  } catch (error) {
    console.error('❌ Error al obtener estadísticas de contactos:', error)
    throw new Error('No se pudieron obtener las estadísticas.')
  }
}
