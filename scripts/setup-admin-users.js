// Script para crear usuarios administradores de prueba
// Ejecutar con: bun run scripts/setup-admin-users.js

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

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

// Permisos por defecto según el rol
const getDefaultPermissions = role => {
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

// Datos de usuarios administradores de prueba
const testAdmins = [
  {
    email: 'admin@montanez-lab.com',
    name: 'Administrador Principal',
    role: 'super_admin',
    status: 'active',
    phone: '+51 987 654 321',
    department: 'Administración',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    email: 'yuri@montanez-lab.com',
    name: 'Yuri Montañez',
    role: 'super_admin',
    status: 'active',
    phone: '+51 987 654 322',
    department: 'Dirección',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    email: 'moderador@montanez-lab.com',
    name: 'Moderador de Prueba',
    role: 'moderator',
    status: 'active',
    phone: '+51 987 654 323',
    department: 'Atención al Cliente',
    createdBy: 'admin@montanez-lab.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    email: 'viewer@montanez-lab.com',
    name: 'Visualizador de Prueba',
    role: 'viewer',
    status: 'active',
    phone: '+51 987 654 324',
    department: 'Soporte',
    createdBy: 'admin@montanez-lab.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

async function createAdminUsers() {
  console.log('🚀 Creando usuarios administradores...')

  try {
    for (const admin of testAdmins) {
      // Agregar permisos según el rol
      const adminData = {
        ...admin,
        permissions: getDefaultPermissions(admin.role),
      }

      await addDoc(collection(db, 'admins'), adminData)
      console.log(`✅ Admin creado: ${admin.name} (${admin.role})`)
    }

    console.log('\n🎉 Usuarios administradores creados exitosamente!')
    console.log(`📊 ${testAdmins.length} administradores creados`)
    console.log('\n📋 Usuarios creados:')
    testAdmins.forEach(admin => {
      console.log(`  • ${admin.email} - ${admin.name} (${admin.role})`)
    })
    console.log(
      '\n🔐 Nota: Estos usuarios deben ser creados manualmente en Firebase Authentication'
    )
    console.log('   O puedes usar la interfaz de administración para crearlos con contraseñas.')
  } catch (error) {
    console.error('❌ Error creando usuarios administradores:', error)
  }
}

// Ejecutar el script
createAdminUsers().catch(console.error)
