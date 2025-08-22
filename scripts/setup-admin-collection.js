// Script para configurar la colección de administradores en Firestore
// Ejecutar con: bun run scripts/setup-admin-collection.js

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

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

// Configuración de administradores
const adminUsers = [
  {
    email: 'admin@montanez-lab.com',
    uid: 'dJemVLKNt9WPs8QUWKzQaMprb3O2',
    role: 'super_admin',
    permissions: ['all'],
    displayName: 'Administrador Principal',
  },
  {
    email: 'yuri@montanez-lab.com',
    uid: 'rWvOLgCCU6Peq2WLTWouPGnuX8p1',
    role: 'admin',
    permissions: ['contacts', 'appointments', 'reports', 'settings'],
    displayName: 'Yuri Montanez',
  },
]

async function setupAdminCollection() {
  console.log('🚀 Configurando colección de administradores...')

  for (const adminData of adminUsers) {
    try {
      console.log(`📧 Configurando admin: ${adminData.email}`)

      // Crear documento en colección 'admins'
      const adminDoc = doc(db, 'admins', adminData.email)
      await setDoc(adminDoc, {
        uid: adminData.uid,
        email: adminData.email,
        role: adminData.role,
        permissions: adminData.permissions,
        displayName: adminData.displayName,
        createdAt: new Date().toISOString(),
        active: true,
        lastLogin: null,
      })

      console.log(`✅ Documento de admin creado para: ${adminData.email}`)
      console.log(`   UID: ${adminData.uid}`)
      console.log(`   Role: ${adminData.role}`)
      console.log(`   Permissions: ${adminData.permissions.join(', ')}`)
      console.log('')
    } catch (error) {
      console.error(`❌ Error configurando admin ${adminData.email}:`, error.message)
      console.log('')
    }
  }

  console.log('🎉 Colección de administradores configurada!')
  console.log('\n🔑 Credenciales de acceso:')
  console.log('Admin Principal: admin@montanez-lab.com / MontanezLab2024!')
  console.log('Admin Secundario: yuri@montanez-lab.com / YuriAdmin2024!')
  console.log('\n🌐 Ve a: http://localhost:3002/admin')
}

// Ejecutar el script
setupAdminCollection().catch(console.error)
