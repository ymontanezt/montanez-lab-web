// Script para crear usuarios administradores usando Firebase Admin SDK
// Ejecutar con: bun run scripts/create-admin-users.js

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'montanez-website.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'montanez-website',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'montanez-website.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '732778846970',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:732778846970:web:0ea43dd8a288c8c5f28743',
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Usuarios administradores a crear
const adminUsers = [
  {
    email: 'admin@montanez-lab.com',
    password: 'MontanezLab2024!',
    displayName: 'Administrador Principal',
    role: 'super_admin',
    permissions: ['all'],
  },
  {
    email: 'yuri@montanez-lab.com',
    password: 'YuriAdmin2024!',
    displayName: 'Yuri Montanez',
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
        displayName: userData.displayName,
      })

      console.log(`✅ Documento de admin creado para: ${userData.email}`)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️ Usuario ${userData.email} ya existe, verificando...`)

        try {
          // Intentar iniciar sesión para verificar
          const signInResult = await signInWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          )

          console.log(`✅ Usuario ${userData.email} verificado correctamente`)

          // Verificar si ya existe el documento de admin
          const adminDoc = doc(db, 'admins', userData.email)
          await setDoc(
            adminDoc,
            {
              uid: signInResult.user.uid,
              email: userData.email,
              role: userData.role,
              permissions: userData.permissions,
              createdAt: new Date().toISOString(),
              active: true,
              displayName: userData.displayName,
            },
            { merge: true }
          )

          console.log(`✅ Documento de admin actualizado para: ${userData.email}`)
        } catch (signInError) {
          console.error(`❌ Error verificando usuario ${userData.email}:`, signInError.message)
        }
      } else {
        console.error(`❌ Error creando usuario ${userData.email}:`, error.message)
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
