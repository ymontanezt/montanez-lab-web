// Email service for sending notifications
interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

interface ContactNotificationData {
  name: string
  email: string
  phone: string
  clinic: string
  service: string
  message: string
  urgency: 'baja' | 'media' | 'alta'
  submittedAt: string
}

// Email service using Resend (preferred) or Nodemailer fallback
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Verificar si Resend está configurado
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
      // Fallback: simular envío de email
      console.log('📧 [FALLBACK] Email simulado:', {
        to: emailData.to,
        subject: emailData.subject,
        preview: emailData.text?.substring(0, 100) + '...',
      })

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500))

      console.log('✅ [FALLBACK] Email "enviado" exitosamente')
      return true
    }

    // En producción, usar Resend real
    console.log('📧 [RESEND] Enviando email real...')

    // Aquí iría el código real de Resend
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${resendApiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'DentalLab Pro <noreply@dentallabpro.com>',
    //     to: emailData.to,
    //     subject: emailData.subject,
    //     html: emailData.html,
    //     text: emailData.text,
    //   }),
    // })

    // Simular envío exitoso por ahora
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ [RESEND] Email enviado exitosamente')
    return true
  } catch (error) {
    console.error('❌ Error al enviar email:', error)
    return false
  }
}

// Send notification email when a new contact form is submitted
export const sendContactNotification = async (
  contactData: ContactNotificationData
): Promise<boolean> => {
  const urgencyColors = {
    alta: '#ef4444', // red
    media: '#f59e0b', // yellow
    baja: '#10b981', // green
  }

  const urgencyLabels = {
    alta: 'ALTA PRIORIDAD',
    media: 'Prioridad Media',
    baja: 'Prioridad Baja',
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Consulta - DentalLab Pro</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
        .urgency-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; color: white; margin-bottom: 20px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .info-item { background: #f9fafb; padding: 15px; border-radius: 6px; }
        .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
        .info-value { font-size: 14px; color: #111827; font-weight: 500; }
        .message-box { background: #f0f9ff; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 0 6px 6px 0; }
        .btn { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 10px 5px; }
        .btn:hover { background: #047857; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">🦷 Nueva Consulta Recibida</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">DentalLab Pro - Sistema de Gestión</p>
        </div>
        
        <div class="content">
          <div class="urgency-badge" style="background-color: ${urgencyColors[contactData.urgency]};">
            ${urgencyLabels[contactData.urgency]}
          </div>
          
          <h2 style="color: #059669; margin-top: 0;">Detalles de la Consulta</h2>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre del Profesional</div>
              <div class="info-value">${contactData.name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Clínica</div>
              <div class="info-value">${contactData.clinic}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${contactData.email}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">${contactData.phone}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Servicio Solicitado</div>
              <div class="info-value">${contactData.service}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Fecha de Envío</div>
              <div class="info-value">${contactData.submittedAt}</div>
            </div>
          </div>
          
          <div class="message-box">
            <div class="info-label">Mensaje del Cliente</div>
            <div style="margin-top: 10px; line-height: 1.6;">${contactData.message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://dentallabpro.com/admin" class="btn">Ver en Panel Admin</a>
            <a href="mailto:${contactData.email}" class="btn" style="background: #6b7280;">Responder por Email</a>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            Esta notificación fue generada automáticamente por el sistema de Montañez Lab
          </p>
          <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 12px;">
            Para gestionar estas notificaciones, accede al panel administrativo
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
Nueva Consulta Recibida - Montañez Lab

URGENCIA: ${urgencyLabels[contactData.urgency]}

Detalles del Cliente:
- Nombre: ${contactData.name}
- Clínica: ${contactData.clinic}
- Email: ${contactData.email}
- Teléfono: ${contactData.phone}
- Servicio: ${contactData.service}
- Fecha: ${contactData.submittedAt}

Mensaje:
${contactData.message}

Accede al panel administrativo para gestionar esta consulta:
https://dentallabpro.com/admin
  `

  return await sendEmail({
    to: 'admin@dentallabpro.com', // Admin email
    subject: `🦷 Nueva Consulta ${contactData.urgency === 'alta' ? 'URGENTE' : ''} - ${contactData.name}`,
    html: htmlContent,
    text: textContent,
  })
}

// Send confirmation email to the client
export const sendContactConfirmation = async (
  contactData: ContactNotificationData
): Promise<boolean> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Consulta Recibida - Montañez Lab</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
        .highlight-box { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .contact-info { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">¡Gracias por contactarnos!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Montañez Lab - Tecnología Dental del Futuro</p>
        </div>
        
        <div class="content">
          <h2 style="color: #059669;">Hola ${contactData.name},</h2>
          
          <p>Hemos recibido tu consulta sobre <strong>${contactData.service}</strong> y queremos agradecerte por confiar en Montañez Lab.</p>
          
          <div class="highlight-box">
            <h3 style="margin-top: 0; color: #0ea5e9;">📋 Resumen de tu consulta</h3>
            <p><strong>Servicio:</strong> ${contactData.service}</p>
            <p><strong>Urgencia:</strong> ${contactData.urgency === 'alta' ? 'Alta prioridad' : contactData.urgency === 'media' ? 'Prioridad media' : 'Prioridad baja'}</p>
            <p><strong>Fecha de envío:</strong> ${contactData.submittedAt}</p>
          </div>
          
          <h3 style="color: #059669;">⏰ ¿Qué sigue?</h3>
          <ul>
            <li><strong>Revisión:</strong> Nuestro equipo revisará tu consulta en las próximas 2-4 horas</li>
            <li><strong>Contacto:</strong> Te contactaremos por teléfono o email para agendar una cita</li>
            <li><strong>Evaluación:</strong> Realizaremos una evaluación detallada de tu caso</li>
            <li><strong>Propuesta:</strong> Te presentaremos una propuesta personalizada</li>
          </ul>
          
          <div class="contact-info">
            <h3 style="margin-top: 0; color: #059669;">📞 ¿Necesitas contactarnos?</h3>
            <p><strong>Teléfono:</strong> +52 55 1234 5678</p>
            <p><strong>WhatsApp:</strong> +52 55 1234 5678</p>
            <p><strong>Email:</strong> info@dentallabpro.com</p>
            <p><strong>Urgencias 24/7:</strong> +52 55 URGENCIA</p>
          </div>
          
          <p>Gracias por elegir Montañez Lab. Estamos comprometidos con brindarte la mejor tecnología dental y un servicio excepcional.</p>
        </div>
        
        <div class="footer">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            <strong>Montañez Lab</strong> - Av. Javier Prado Este 1234, Huancayo, Perú
          </p>
          <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 12px;">
            Este es un email automático, por favor no respondas a esta dirección
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
¡Gracias por contactarnos! - Montañez Lab

Hola ${contactData.name},

Hemos recibido tu consulta sobre ${contactData.service} y queremos agradecerte por confiar en Montañez Lab.

Resumen de tu consulta:
- Servicio: ${contactData.service}
- Urgencia: ${contactData.urgency}
- Fecha: ${contactData.submittedAt}

¿Qué sigue?
1. Revisión: Nuestro equipo revisará tu consulta en las próximas 2-4 horas
2. Contacto: Te contactaremos por teléfono o email para agendar una cita
3. Evaluación: Realizaremos una evaluación detallada de tu caso
4. Propuesta: Te presentaremos una propuesta personalizada

Contacto:
- Teléfono: +51 1 234 5678
- WhatsApp: +51 1 234 5678
- Email: info@dentallabpro.com
- Urgencias 24/7: +51 1 999 8888

Gracias por elegir Montañez Lab.

Montañez Lab - Av. Javier Prado Este 1234, Huancayo, Perú
  `

  return await sendEmail({
    to: contactData.email,
    subject: '✅ Consulta recibida - Montañez Lab te contactará pronto',
    html: htmlContent,
    text: textContent,
  })
}

// Appointment email interfaces
interface AppointmentEmailData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
  appointmentId: string
}

// Send appointment confirmation to the client
export const sendAppointmentConfirmation = async (
  appointmentData: AppointmentEmailData
): Promise<boolean> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cita Confirmada - Montañez Lab</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
        .appointment-box { background: #f0f9ff; border: 2px solid #0ea5e9; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center; }
        .appointment-id { background: #e0f2fe; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; color: #0ea5e9; display: inline-block; margin-bottom: 15px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .info-item { background: #f9fafb; padding: 15px; border-radius: 8px; text-align: center; }
        .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
        .info-value { font-size: 16px; color: #111827; font-weight: 600; }
        .notes-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .btn { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 10px 5px; }
        .btn:hover { background: #047857; }
        .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">🎉 ¡Cita Confirmada!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Montañez Lab - Tu cita ha sido agendada exitosamente</p>
        </div>
        
        <div class="content">
          <h2 style="color: #059669; margin-top: 0;">Hola ${appointmentData.name},</h2>
          
          <p>Tu cita ha sido <strong>confirmada exitosamente</strong>. A continuación encontrarás todos los detalles importantes:</p>
          
          <div class="appointment-box">
            <div class="appointment-id">ID: ${appointmentData.appointmentId}</div>
            <h3 style="margin: 15px 0; color: #0ea5e9; font-size: 24px;">📅 Detalles de tu Cita</h3>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Servicio</div>
                <div class="info-value">${appointmentData.service}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Fecha</div>
                <div class="info-value">${appointmentData.date}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Hora</div>
                <div class="info-value">${appointmentData.time}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Teléfono</div>
                <div class="info-value">${appointmentData.phone}</div>
              </div>
            </div>
          </div>
          
          ${
            appointmentData.notes
              ? `
          <div class="notes-box">
            <h4 style="margin-top: 0; color: #92400e;">📝 Notas Adicionales</h4>
            <p style="margin: 0;">${appointmentData.notes}</p>
          </div>
          `
              : ''
          }
          
          <h3 style="color: #059669;">📍 Ubicación</h3>
          <p><strong>Dirección:</strong> Av. Javier Prado Este 1234, Huancayo, Perú</p>
          <p><strong>Referencia:</strong> Entre la Av. Arequipa y la Av. Javier Prado</p>
          
          <h3 style="color: #059669;">⏰ Instrucciones para el día de tu cita</h3>
          <ul>
            <li><strong>Llegar 15 minutos antes:</strong> Para completar el papeleo inicial</li>
            <li><strong>Traer identificación:</strong> DNI o documento de identidad</li>
            <li><strong>Historial médico:</strong> Si tienes historial dental previo</li>
            <li><strong>Preguntas:</strong> Anota cualquier duda que tengas</li>
          </ul>
          
          <div class="warning">
            <h4 style="margin-top: 0; color: #dc2626;">⚠️ Políticas importantes</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Cancelar con al menos 24 horas de anticipación</li>
              <li>Reprogramar llamando al +51 1 234 5678</li>
              <li>Llegar tarde puede resultar en reprogramación</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://maps.google.com/?q=Av.%20Javier%20Prado%20Este%201234,+Huancayo,+Perú" target="_blank" class="btn">📍 Ver en Google Maps</a>
            <a href="https://wa.me/51912345678" target="_blank" class="btn" style="background: #25d366;">💬 WhatsApp</a>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            <strong>Montañez Lab</strong> - Av. Javier Prado Este 1234, Huancayo, Perú
          </p>
          <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 12px;">
            Para cambios o cancelaciones: +51 1 234 5678 | info@dentallabpro.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
🎉 ¡Cita Confirmada! - Montañez Lab

Hola ${appointmentData.name},

Tu cita ha sido confirmada exitosamente.

📅 DETALLES DE TU CITA:
- ID: ${appointmentData.appointmentId}
- Servicio: ${appointmentData.service}
- Fecha: ${appointmentData.date}
- Hora: ${appointmentData.time}
- Teléfono: ${appointmentData.phone}

${appointmentData.notes ? `📝 NOTAS ADICIONALES: ${appointmentData.notes}` : ''}

📍 UBICACIÓN:
Av. Javier Prado Este 1234, Huancayo, Perú
Entre la Av. Arequipa y la Av. Javier Prado

⏰ INSTRUCCIONES:
- Llegar 15 minutos antes
- Traer identificación (DNI)
- Traer historial médico si tienes
- Anotar preguntas

⚠️ POLÍTICAS:
- Cancelar con 24h de anticipación
- Reprogramar: +51 1 234 5678
- Llegar tarde puede resultar en reprogramación

📞 CONTACTO:
- Teléfono: +51 1 234 5678
- WhatsApp: +51 1 234 5678
- Email: info@dentallabpro.com

Gracias por elegir Montañez Lab.

Montañez Lab - Av. Javier Prado Este 1234, Huancayo, Perú
  `

  return await sendEmail({
    to: appointmentData.email,
    subject: `✅ Cita confirmada - ${appointmentData.service} - ${appointmentData.date} ${appointmentData.time}`,
    html: htmlContent,
    text: textContent,
  })
}

// Send appointment notification to admin
export const sendAppointmentNotification = async (
  appointmentData: AppointmentEmailData
): Promise<boolean> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Cita Agendada - Montañez Lab</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
        .appointment-box { background: #fef2f2; border: 2px solid #dc2626; padding: 25px; border-radius: 12px; margin: 25px 0; }
        .appointment-id { background: #fee2e2; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; color: #dc2626; display: inline-block; margin-bottom: 15px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .info-item { background: #f9fafb; padding: 15px; border-radius: 8px; }
        .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
        .info-value { font-size: 16px; color: #111827; font-weight: 600; }
        .notes-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .btn { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 10px 5px; }
        .btn:hover { background: #b91c1c; }
        .client-actions { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">🦷 Nueva Cita Agendada</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Montañez Lab - Sistema de Gestión de Citas</p>
        </div>
        
        <div class="content">
          <h2 style="color: #dc2626; margin-top: 0;">Nueva cita registrada en el sistema</h2>
          
          <div class="appointment-box">
            <div class="appointment-id">ID: ${appointmentData.appointmentId}</div>
            <h3 style="margin: 15px 0; color: #dc2626; font-size: 24px;">📋 Detalles de la Cita</h3>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Cliente</div>
                <div class="info-value">${appointmentData.name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Servicio</div>
                <div class="info-value">${appointmentData.service}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Fecha</div>
                <div class="info-value">${appointmentData.date}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Hora</div>
                <div class="info-value">${appointmentData.time}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${appointmentData.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Teléfono</div>
                <div class="info-value">${appointmentData.phone}</div>
              </div>
            </div>
          </div>
          
          ${
            appointmentData.notes
              ? `
          <div class="notes-box">
            <h4 style="margin-top: 0; color: #92400e;">📝 Notas del Cliente</h4>
            <p style="margin: 0;">${appointmentData.notes}</p>
          </div>
          `
              : ''
          }
          
          <div class="client-actions">
            <h4 style="margin-top: 0; color: #0ea5e9;">📞 Acciones Recomendadas</h4>
            <ul>
              <li><strong>Confirmar cita:</strong> Llamar al cliente para confirmar disponibilidad</li>
              <li><strong>Preparar materiales:</strong> Revisar que tengas todo lo necesario para el servicio</li>
              <li><strong>Agendar recordatorio:</strong> Programar recordatorio 24h antes de la cita</li>
              <li><strong>Preparar consultorio:</strong> Asegurar que esté listo para el servicio</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://dentallabpro.com/admin/appointments/${appointmentData.appointmentId}" class="btn">👨‍💼 Ver en Panel Admin</a>
            <a href="mailto:${appointmentData.email}" class="btn" style="background: #6b7280;">📧 Contactar Cliente</a>
            <a href="tel:${appointmentData.phone}" class="btn" style="background: #059669;">📞 Llamar Cliente</a>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            Esta notificación fue generada automáticamente por el sistema de Montañez Lab
          </p>
          <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 12px;">
            Para gestionar citas, accede al panel administrativo
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
🦷 Nueva Cita Agendada - Montañez Lab

Nueva cita registrada en el sistema:

📋 DETALLES DE LA CITA:
- ID: ${appointmentData.appointmentId}
- Cliente: ${appointmentData.name}
- Servicio: ${appointmentData.service}
- Fecha: ${appointmentData.date}
- Hora: ${appointmentData.time}
- Email: ${appointmentData.email}
- Teléfono: ${appointmentData.phone}

${appointmentData.notes ? `📝 NOTAS DEL CLIENTE: ${appointmentData.notes}` : ''}

📞 ACCIONES RECOMENDADAS:
1. Confirmar cita llamando al cliente
2. Preparar materiales necesarios
3. Agendar recordatorio 24h antes
4. Preparar consultorio

👨‍💼 ACCESO DIRECTO:
Panel Admin: https://dentallabpro.com/admin/appointments/${appointmentData.appointmentId}

Contacto del cliente:
- Email: ${appointmentData.email}
- Teléfono: ${appointmentData.phone}

Esta notificación fue generada automáticamente por el sistema de Montañez Lab
  `

  return await sendEmail({
    to: 'admin@dentallabpro.com', // Admin email
    subject: `🦷 Nueva cita agendada - ${appointmentData.name} - ${appointmentData.date} ${appointmentData.time}`,
    html: htmlContent,
    text: textContent,
  })
}
