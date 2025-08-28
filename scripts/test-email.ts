#!/usr/bin/env tsx

/**
 * Script de prueba para el sistema de emails de Montañez Lab
 * Prueba el envío de emails usando Resend
 */

import { sendEmail, sendContactNotification, sendAppointmentConfirmation } from '../lib/email'

// Configuración de prueba
const testConfig = {
  resendApiKey: 're_cYT8xZX2_5Yf27dsm5CZwzajQhT8CTbBD',
  testEmail: 'montzavy@gmail.com', // Email de prueba
}

async function testBasicEmail() {
  console.log('🧪 Probando envío de email básico...')
  
  try {
    const result = await sendEmail({
      to: testConfig.testEmail,
      subject: '🧪 Prueba de Email - Montañez Lab',
      html: `
        <h1>Prueba de Sistema de Emails</h1>
        <p>Este es un email de prueba para verificar que Resend esté funcionando correctamente.</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-PE')}</p>
        <p><strong>Estado:</strong> ✅ Sistema funcionando</p>
      `,
      text: 'Prueba de Sistema de Emails - Montañez Lab - Sistema funcionando correctamente'
    })
    
    if (result) {
      console.log('✅ Email básico enviado exitosamente')
    } else {
      console.log('❌ Fallo en envío de email básico')
    }
  } catch (error) {
    console.error('❌ Error en email básico:', error)
  }
}

async function testContactNotification() {
  console.log('\n🧪 Probando notificación de contacto...')
  
  try {
    const contactData = {
      name: 'Dr. Juan Pérez',
      email: 'juan.perez@clinica.com',
      phone: '+51 999 888 777',
      clinic: 'Clínica Dental San Juan',
      service: 'Prótesis Fija de Zirconio',
      message: 'Necesito cotización para 3 coronas de zirconio para mi paciente. ¿Podrían enviarme información sobre precios y tiempos de entrega?',
      urgency: 'media' as const,
      submittedAt: new Date().toLocaleString('es-PE')
    }
    
    const result = await sendContactNotification(contactData)
    
    if (result) {
      console.log('✅ Notificación de contacto enviada exitosamente')
    } else {
      console.log('❌ Fallo en notificación de contacto')
    }
  } catch (error) {
    console.error('❌ Error en notificación de contacto:', error)
  }
}

async function testAppointmentConfirmation() {
  console.log('\n🧪 Probando confirmación de cita...')
  
  try {
    const appointmentData = {
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+51 988 777 666',
      service: 'Consulta de Ortodoncia',
      date: '15 de Diciembre, 2024',
      time: '10:00 AM',
      notes: 'Primera consulta, paciente interesada en brackets estéticos',
      appointmentId: 'APT-2024-001'
    }
    
    const result = await sendAppointmentConfirmation(appointmentData)
    
    if (result) {
      console.log('✅ Confirmación de cita enviada exitosamente')
    } else {
      console.log('❌ Fallo en confirmación de cita')
    }
  } catch (error) {
    console.error('❌ Error en confirmación de cita:', error)
  }
}

async function testAppointmentNotification() {
  console.log('\n🧪 Probando notificación de cita para admin...')
  
  try {
    const appointmentData = {
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+51 977 666 555',
      service: 'Implante Dental',
      date: '20 de Diciembre, 2024',
      time: '2:00 PM',
      notes: 'Paciente requiere evaluación para implante en molar inferior derecho',
      appointmentId: 'APT-2024-002'
    }
    
    // Importar la función de notificación de admin
    const { sendAppointmentNotification } = await import('../lib/email')
    const result = await sendAppointmentNotification(appointmentData)
    
    if (result) {
      console.log('✅ Notificación de cita para admin enviada exitosamente')
    } else {
      console.log('❌ Fallo en notificación de cita para admin')
    }
  } catch (error) {
    console.error('❌ Error en notificación de cita para admin:', error)
  }
}

async function main() {
  console.log('🚀 ========================================')
  console.log('🚀  PRUEBA DEL SISTEMA DE EMAILS')
  console.log('🚀  Montañez Lab - Resend Integration')
  console.log('🚀 ========================================')
  console.log('')
  
  // Configurar la API key de Resend
  process.env.RESEND_API_KEY = testConfig.resendApiKey
  process.env.RESEND_FROM_EMAIL = 'montzavy@gmail.com'
  process.env.RESEND_FROM_NAME = 'Montañez Lab'
  
  console.log('🔑 Configuración:')
  console.log(`   API Key: ${testConfig.resendApiKey.substring(0, 10)}...`)
  console.log(`   From Email: ${process.env.RESEND_FROM_EMAIL}`)
  console.log(`   From Name: ${process.env.RESEND_FROM_NAME}`)
  console.log('')
  
  console.log('⚠️  IMPORTANTE: Asegúrate de que gmail.com esté verificado en Resend')
  console.log('   Ve a: https://resend.com/domains')
  console.log('')
  
  // Ejecutar pruebas con delays
  await testBasicEmail()
  await new Promise(resolve => setTimeout(resolve, 1000)) // Delay 1 segundo
  
  await testContactNotification()
  await new Promise(resolve => setTimeout(resolve, 1000)) // Delay 1 segundo
  
  await testAppointmentConfirmation()
  await new Promise(resolve => setTimeout(resolve, 1000)) // Delay 1 segundo
  
  await testAppointmentNotification()
  
  console.log('\n🎉 ========================================')
  console.log('🎉  PRUEBAS COMPLETADAS')
  console.log('🎉 ========================================')
  console.log('')
  console.log('📧 Verifica tu email para confirmar que los mensajes llegaron correctamente')
  console.log('🔍 Revisa el dashboard de Resend para ver logs de envío')
  console.log('')
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(console.error)
}

export { main as testEmailSystem }
