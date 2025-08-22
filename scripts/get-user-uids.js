// Script para obtener UIDs de usuarios existentes
// Ejecutar con: bun run scripts/get-user-uids.js

import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
const auth = getAuth(app)

// Usuarios a verificar
const users = [
  { email: 'admin@montanez-lab.com', password: 'MontanezLab2024!' },
  { email: 'yuri@montanez-lab.com', password: 'YuriAdmin2024!' },
]

async function getUserUIDs() {
  console.log('🔍 Obteniendo UIDs de usuarios...')

  for (const userData of users) {
    try {
      console.log(`📧 Verificando usuario: ${userData.email}`)

      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )

      const user = userCredential.user
      console.log(`✅ Usuario ${userData.email}:`)
      console.log(`   UID: ${user.uid}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Email Verified: ${user.emailVerified}`)
      console.log(`   Created At: ${new Date(user.metadata.creationTime).toLocaleString()}`)
      console.log('')
    } catch (error) {
      console.error(`❌ Error con usuario ${userData.email}:`, error.code, error.message)
      console.log('')
    }
  }

  console.log('🎉 Proceso completado!')
}

// Ejecutar el script
getUserUIDs().catch(console.error)
