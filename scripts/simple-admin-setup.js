// Script simplificado para crear usuarios administradores
// Ejecutar con: bun run scripts/simple-admin-setup.js

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// Configuración directa de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8',
  authDomain: 'montanez-website.firebaseapp.com',
  projectId: 'montanez-website',
  storageBucket: 'montanez-website.firebasestorage.app',
  messagingSenderId: '732778846970',
  appId: '1:732778846970:web:0ea43dd8a288c8c5f28743',
}

console.log('🔧 Configuración de Firebase:', firebaseConfig)

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

console.log('✅ Firebase inicializado')

// Usuarios administradores
const adminUsers = [
  {
    email: 'admin@montanez-lab.com',
    password: 'MontanezLab2024!',
    role: 'super_admin',
    permissions: ['all'],
  },
  {
    email: 'yuri@montanez-lab.com',
    password: 'YuriAdmin2024!',
    role: 'admin',
    permissions: ['contacts', 'appointments', 'reports', 'settings'],
  },
]

async function createAdminUsers() {
  console.log('🚀 Creando usuarios administradores...')

  for (const userData of adminUsers) {
    try {
      console.log(`📧 Creando usuario: ${userData.email}`)

      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )

      const user = userCredential.user
      console.log(`✅ Usuario creado con UID: ${user.uid}`)

      // Crear documento en colección 'admins'
      const adminDoc = doc(db, 'admins', userData.email)
      await setDoc(adminDoc, {
        uid: user.uid,
        email: userData.email,
        role: userData.role,
        permissions: userData.permissions,
        createdAt: new Date().toISOString(),
        active: true,
      })

      console.log(`✅ Documento de admin creado para: ${userData.email}`)
    } catch (error) {
      console.error(`❌ Error creando usuario ${userData.email}:`, error.code, error.message)

      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️ Usuario ${userData.email} ya existe`)
      }
    }
  }

  console.log('\n🎉 Proceso completado!')
  console.log('\n🔑 Credenciales de acceso:')
  console.log('Admin Principal: admin@montanez-lab.com / MontanezLab2024!')
  console.log('Admin Secundario: yuri@montanez-lab.com / YuriAdmin2024!')
  console.log('\n🌐 Ve a: http://localhost:3002/admin')
}

// Ejecutar el script
createAdminUsers().catch(console.error)
