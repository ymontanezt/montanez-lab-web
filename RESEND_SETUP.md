# 🚀 Configuración de Resend para Montañez Lab

## 📋 Pasos para Configurar el Sistema de Emails

### 1. Crear Archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
# ========================================
# CONFIGURACIÓN DE EMAIL - RESEND
# ========================================
RESEND_API_KEY=re_cYT8xZX2_5Yf27dsm5CZwzajQhT8CTbBD
RESEND_FROM_EMAIL=montzavy@gmail.com
RESEND_FROM_NAME=Montañez Lab

# ========================================
# OTRAS CONFIGURACIONES NECESARIAS
# ========================================
NEXT_PUBLIC_CONTACT_EMAIL=montzavy@gmail.com
NEXT_PUBLIC_CONTACT_ADMIN_EMAIL=mmontanezt@gmail.com
```

### 2. Verificar Dominio en Resend

1. Ve a [Resend Dashboard](https://resend.com/domains)
2. Verifica que tu dominio esté configurado
3. Si usas Gmail, asegúrate de que esté verificado

### 3. Probar el Sistema

Ejecuta el script de prueba:

```bash
# Instalar tsx si no lo tienes
bun add -g tsx

# Ejecutar prueba
bun run tsx scripts/test-email.ts
```

### 4. Verificar Funcionamiento

- ✅ Emails de contacto se envían al admin
- ✅ Confirmaciones de cita se envían al cliente
- ✅ Notificaciones de cita se envían al admin
- ✅ Todos los emails tienen diseño profesional

## 🔧 Funcionalidades Implementadas

### 📧 Formulario de Contacto
- **Notificación al Admin**: Email con detalles completos de la consulta
- **Confirmación al Cliente**: Email de confirmación de recepción
- **Sistema de Urgencia**: Priorización automática de consultas

### 📅 Sistema de Citas
- **Confirmación al Cliente**: Email con detalles de la cita
- **Notificación al Admin**: Email con información completa para gestión
- **Recordatorios**: Sistema de notificaciones automáticas

### 🎨 Diseño de Emails
- **Responsive**: Se adapta a móviles y desktop
- **Profesional**: Branding consistente con Montañez Lab
- **Accesible**: Versión texto plano incluida

## 🚨 Solución de Problemas

### Error: "RESEND_API_KEY no configurado"
- Verifica que el archivo `.env.local` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo después de crear el archivo

### Error: "Unauthorized" o "Invalid API Key"
- Verifica que la API key sea correcta
- Asegúrate de que la cuenta de Resend esté activa

### Error: "Domain not verified"
- Verifica tu dominio en el dashboard de Resend
- Si usas Gmail, asegúrate de que esté verificado

### Emails no llegan
- Revisa la carpeta de spam
- Verifica logs en la consola del navegador
- Revisa el dashboard de Resend para confirmar envío

## 📊 Monitoreo y Logs

### Logs de Desarrollo
```bash
# Ver logs en tiempo real
bun run dev

# Ver logs de build
bun run build
```

### Dashboard de Resend
- [Resend Dashboard](https://resend.com/emails)
- Monitorea envíos, entregas y bounces
- Revisa estadísticas de engagement

## 🔒 Seguridad

### Variables de Entorno
- **NUNCA** commits el archivo `.env.local`
- **NUNCA** expongas tu API key públicamente
- Usa diferentes API keys para desarrollo y producción

### Validación de Emails
- Todos los emails se validan antes del envío
- Sistema de rate limiting implementado
- Manejo de errores robusto

## 📈 Próximos Pasos

### Mejoras Futuras
- [ ] Sistema de plantillas de email
- [ ] Programación automática de recordatorios
- [ ] Integración con WhatsApp Business
- [ ] Analytics de engagement de emails

### Producción
- [ ] Configurar variables de entorno en Firebase
- [ ] Implementar monitoreo de emails
- [ ] Configurar alertas de fallos
- [ ] Backup de configuración

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en la consola
2. Verifica la configuración de variables de entorno
3. Prueba con el script de test
4. Revisa el dashboard de Resend

**Contacto**: montzavy@gmail.com
**Documentación**: [Resend Docs](https://resend.com/docs)
