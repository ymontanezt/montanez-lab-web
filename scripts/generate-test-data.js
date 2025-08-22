// Script para generar datos de prueba para el dashboard
// Ejecutar con: bun run scripts/generate-test-data.js

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8',
  authDomain: 'montanez-website.firebaseapp.com',
  projectId: 'montanez-website',
  storageBucket: 'montanez-website.firebasestorage.app',
  messagingSenderId: '732778846970',
  appId: '1:732778846970:web:0ea43dd8a288c8c5f28743',
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Datos de prueba para contactos
const testContacts = [
  {
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '987654321',
    subject: 'Consulta sobre blanqueamiento dental',
    message:
      'Hola, me gustaría saber más sobre el servicio de blanqueamiento dental. ¿Cuánto tiempo dura el tratamiento?',
    status: 'new',
    priority: 'medium',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
  },
  {
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '912345678',
    subject: 'Información sobre implantes',
    message:
      'Buenos días, necesito información sobre implantes dentales. ¿Cuál es el proceso y cuánto tiempo toma?',
    status: 'read',
    priority: 'high',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 horas atrás
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '945678912',
    subject: 'Cita para limpieza dental',
    message: 'Quisiera agendar una cita para limpieza dental. ¿Tienen disponibilidad esta semana?',
    status: 'replied',
    priority: 'low',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
  },
  {
    name: 'Luis Pérez',
    email: 'luis.perez@email.com',
    phone: '978912345',
    subject: 'Duda sobre ortodoncia',
    message: 'Hola, tengo dudas sobre el tratamiento de ortodoncia. ¿Pueden darme una consulta?',
    status: 'new',
    priority: 'medium',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
  },
  {
    name: 'Sofia Torres',
    email: 'sofia.torres@email.com',
    phone: '934567891',
    subject: 'Emergencia dental',
    message: 'Tengo un dolor intenso en una muela. ¿Pueden atenderme hoy?',
    status: 'read',
    priority: 'high',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
  },
]

// Datos de prueba para citas
const testAppointments = [
  {
    name: 'Roberto Silva',
    email: 'roberto.silva@email.com',
    phone: '956789123',
    service: 'Limpieza dental',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 días adelante
    time: '10:00',
    notes: 'Primera visita, paciente con ansiedad dental',
    status: 'confirmed',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
  },
  {
    name: 'Carmen Vega',
    email: 'carmen.vega@email.com',
    phone: '923456789',
    service: 'Blanqueamiento dental',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 día adelante
    time: '14:30',
    notes: 'Paciente regular, sin alergias conocidas',
    status: 'pending',
    priority: 'low',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 horas atrás
  },
  {
    name: 'Diego Morales',
    email: 'diego.morales@email.com',
    phone: '967891234',
    service: 'Consulta general',
    date: new Date().toISOString().split('T')[0], // Hoy
    time: '16:00',
    notes: 'Dolor en muela del juicio',
    status: 'confirmed',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
  },
  {
    name: 'Patricia Ruiz',
    email: 'patricia.ruiz@email.com',
    phone: '978912345',
    service: 'Ortodoncia',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 semana adelante
    time: '09:00',
    notes: 'Revisión de brackets, ajuste necesario',
    status: 'confirmed',
    priority: 'medium',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 días atrás
  },
]

async function generateTestData() {
  console.log('🚀 Generando datos de prueba...')

  try {
    // Generar contactos de prueba
    console.log('📧 Generando contactos de prueba...')
    for (const contact of testContacts) {
      await addDoc(collection(db, 'contacts'), contact)
      console.log(`✅ Contacto creado: ${contact.name}`)
    }

    // Generar citas de prueba
    console.log('📅 Generando citas de prueba...')
    for (const appointment of testAppointments) {
      await addDoc(collection(db, 'appointments'), appointment)
      console.log(`✅ Cita creada: ${appointment.name} - ${appointment.service}`)
    }

    console.log('\n🎉 Datos de prueba generados exitosamente!')
    console.log(`📊 ${testContacts.length} contactos creados`)
    console.log(`📅 ${testAppointments.length} citas creadas`)
    console.log('\n🌐 Ve a: http://localhost:3002/admin para ver el dashboard')
  } catch (error) {
    console.error('❌ Error generando datos de prueba:', error)
  }
}

// Ejecutar el script
generateTestData().catch(console.error)
