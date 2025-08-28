# 📚 Manual de Usuario - Panel de Administración Montañez Lab

> **Guía completa para administradores del sitio web Montañez Lab**

## 📋 **Tabla de Contenidos**

1. [🎯 Introducción](#-introducción)
2. [🚀 Acceso al Panel](#-acceso-al-panel)
3. [📊 Dashboard Principal](#-dashboard-principal)
4. [👥 Gestión de Contactos](#-gestión-de-contactos)
5. [📅 Gestión de Citas](#-gestión-de-citas)
6. [⚙️ Configuración del Sistema](#️-configuración-del-sistema)
7. [📱 Navegación Móvil](#-navegación-móvil)
8. [🔧 Solución de Problemas](#-solución-de-problemas)
9. [📞 Soporte Técnico](#-soporte-técnico)

---

## 🎯 **Introducción**

### **¿Qué es el Panel de Administración?**

El **Panel de Administración Montañez Lab** es una herramienta web que permite a los administradores gestionar todo el contenido del sitio web, incluyendo:

- 📊 **Estadísticas** del sitio en tiempo real
- 👥 **Mensajes de contacto** de clientes
- 📅 **Citas y reservas** de pacientes
- ⚙️ **Configuración** del sistema
- 📈 **Reportes** y análisis

### **¿Quién Puede Usarlo?**

- 🔐 **Administradores autorizados** con credenciales válidas
- 👨‍💼 **Personal del laboratorio** designado
- 🛡️ **Usuarios con permisos** específicos

---

## 🚀 **Acceso al Panel**

### **URL de Acceso**

```
🌐 Panel de Administración:
https://montanez-website.web.app/admin

🔐 Acceso Directo:
https://montanez-website.web.app/admin
```

### **Proceso de Login**

1. **Navegar** a la URL del panel
2. **Ingresar credenciales**:
   - 📧 **Email**: Tu email de administrador
   - 🔑 **Contraseña**: Tu contraseña segura
3. **Hacer clic** en "Iniciar Sesión"
4. **Verificar** que aparezca el dashboard

### **🔒 Seguridad**

- ✅ **Sesiones seguras** con Firebase Auth
- 🔄 **Logout automático** por inactividad
- 🛡️ **Protección de rutas** administrativas
- 📱 **Autenticación de dos factores** (opcional)

---

## 📊 **Dashboard Principal**

### **🎯 Vista General**

El dashboard principal muestra una **vista completa** del estado del sitio web:

#### **📈 Estadísticas Principales**

- **👥 Contactos Totales**: Número total de mensajes recibidos
- **📅 Citas Activas**: Citas pendientes y confirmadas
- **📊 Visitas del Sitio**: Estadísticas de tráfico
- **🎯 Conversiones**: Tasa de conversión de visitantes

#### **📋 Accesos Rápidos**

- **➕ Nuevo Contacto**: Agregar contacto manualmente
- **📅 Nueva Cita**: Crear cita desde el panel
- **📊 Reportes**: Generar reportes detallados
- **⚙️ Configuración**: Ajustar parámetros del sistema

### **🎨 Personalización del Dashboard**

- **🔄 Actualización automática** cada 5 minutos
- **📱 Diseño responsive** para todos los dispositivos
- **🌙 Modo oscuro** disponible
- **📊 Gráficos interactivos** con datos en tiempo real

---

## 👥 **Gestión de Contactos**

### **📋 Lista de Contactos**

#### **🔍 Filtros Disponibles**

- **📅 Fecha**: Filtrar por rango de fechas
- **🏷️ Estado**: Nuevo, Leído, Respondido, Archivado
- **⭐ Prioridad**: Alta, Media, Baja
- **🔍 Búsqueda**: Buscar por nombre, email o asunto

#### **📊 Estados de Contacto**

| **Estado** | **Color** | **Descripción** | **Acción Requerida** |
|------------|-----------|-----------------|----------------------|
| 🆕 **Nuevo** | 🔵 Slate | Mensaje recién recibido | Revisar y responder |
| 👁️ **Leído** | 🟡 Amber | Mensaje revisado | Preparar respuesta |
| ✅ **Respondido** | 🟢 Emerald | Respuesta enviada | Seguimiento si es necesario |
| 📁 **Archivado** | ⚫ Slate | Conversación cerrada | Sin acción requerida |

#### **🎯 Acciones Disponibles**

- **👁️ Ver Detalles**: Ver mensaje completo y notas
- **💬 Responder**: Enviar respuesta al cliente
- **🏷️ Cambiar Estado**: Actualizar estado del contacto
- **🗑️ Eliminar**: Eliminar contacto del sistema
- **📝 Agregar Notas**: Notas internas del administrador

### **💬 Sistema de Respuestas**

#### **📧 Respuesta Automática**

- **✅ Confirmación**: Cliente recibe confirmación inmediata
- **📱 Notificación**: Email enviado automáticamente
- **📊 Seguimiento**: Registro de todas las respuestas

#### **✍️ Respuesta Manual**

1. **Hacer clic** en "Responder"
2. **Escribir mensaje** personalizado
3. **Agregar notas** internas si es necesario
4. **Enviar respuesta** al cliente
5. **Estado se actualiza** automáticamente

### **📝 Notas del Administrador**

- **🔒 Privadas**: Solo visibles para administradores
- **📅 Timestamp**: Fecha y hora automática
- **👤 Autor**: Identificación del administrador
- **🔄 Historial**: Todas las notas se mantienen

---

## 📅 **Gestión de Citas**

### **📋 Lista de Citas**

#### **🔍 Filtros Disponibles**

- **📅 Fecha**: Filtrar por fecha específica
- **🏷️ Estado**: Pendiente, Confirmada, Completada, Cancelada
- **🦷 Servicio**: Tipo de servicio dental
- **🔍 Búsqueda**: Buscar por nombre o email

#### **📊 Estados de Cita**

| **Estado** | **Color** | **Descripción** | **Acción Requerida** |
|------------|-----------|-----------------|----------------------|
| ⏳ **Pendiente** | 🟡 Amber | Cita agendada, pendiente de confirmación | Contactar al paciente |
| ✅ **Confirmada** | 🔵 Blue | Cita confirmada por el paciente | Preparar para la cita |
| 🎉 **Completada** | 🟢 Emerald | Cita realizada exitosamente | Seguimiento post-cita |
| ❌ **Cancelada** | 🔴 Rose | Cita cancelada por el paciente | Reagendar si es necesario |

#### **🎯 Acciones Disponibles**

- **👁️ Ver Detalles**: Ver información completa de la cita
- **📞 Confirmar**: Marcar cita como confirmada
- **✅ Completar**: Marcar cita como completada
- **❌ Cancelar**: Cancelar cita
- **🔄 Reagendar**: Cambiar fecha/hora de la cita

### **📅 Calendario de Citas**

#### **📱 Vista de Calendario**

- **📅 Vista Mensual**: Todas las citas del mes
- **📅 Vista Semanal**: Citas de la semana actual
- **📅 Vista Diaria**: Citas del día seleccionado
- **🎨 Colores por Estado**: Identificación visual rápida

#### **📊 Gestión de Horarios**

- **⏰ Horarios Disponibles**: Configuración de horarios de trabajo
- **🚫 Días No Laborables**: Configuración de días festivos
- **⏱️ Duración de Citas**: Tiempo estándar por tipo de servicio
- **👥 Disponibilidad del Equipo**: Calendario del personal

---

## ⚙️ **Configuración del Sistema**

### **🔧 Configuración General**

#### **🏢 Información del Laboratorio**

- **📛 Nombre**: Montañez Lab
- **📍 Dirección**: Av. Catalina de Wanka 1234, Huancayo, Perú
- **📞 Teléfono**: +51 989 253 275
- **📧 Email**: montzavy@gmail.com
- **🌐 Sitio Web**: https://montanez-website.web.app

#### **⏰ Horarios de Atención**

- **🕐 Lunes a Viernes**: 8:00 AM - 6:00 PM
- **🕐 Sábados**: 8:00 AM - 2:00 PM
- **🚫 Domingos**: Cerrado
- **🚫 Días Festivos**: Consultar calendario

### **🎨 Personalización del Sitio**

#### **🖼️ Imágenes y Contenido**

- **🖼️ Logo**: Logo principal del laboratorio
- **🖼️ Hero Images**: Imágenes de la página principal
- **📝 Textos**: Contenido editable del sitio
- **🎨 Colores**: Paleta de colores de la marca

#### **📱 Configuración Móvil**

- **📱 PWA**: Aplicación web progresiva
- **🔔 Notificaciones**: Notificaciones push
- **📱 Responsive**: Diseño adaptativo
- **⚡ Performance**: Optimización para móviles

### **📧 Configuración de Email**

#### **📨 Servicio de Email**

- **📧 Proveedor**: Resend
- **📧 Remitente**: montzavy@gmail.com
- **📧 Nombre**: Montañez Lab
- **📧 Plantillas**: Plantillas personalizables

#### **📋 Tipos de Email**

- **📧 Confirmación de Contacto**: Respuesta automática
- **📧 Confirmación de Cita**: Confirmación de reserva
- **📧 Recordatorio de Cita**: Recordatorio 24h antes
- **📧 Seguimiento**: Email post-cita

---

## 📱 **Navegación Móvil**

### **📱 Optimización Móvil**

#### **🎯 Características Móviles**

- **📱 Touch Gestures**: Navegación con gestos táctiles
- **📱 Swipe Navigation**: Navegación por deslizamiento
- **📱 Responsive Design**: Adaptación automática a pantallas
- **📱 Fast Loading**: Carga rápida en dispositivos móviles

#### **📱 Menú Móvil**

- **🍔 Menú Hamburguesa**: Menú colapsable
- **📱 Sidebar Responsive**: Barra lateral adaptativa
- **📱 Touch Friendly**: Botones y elementos táctiles
- **📱 Gesture Support**: Soporte para gestos

### **📱 Funcionalidades Móviles**

#### **📱 Dashboard Móvil**

- **📊 Gráficos Responsive**: Gráficos adaptados a móvil
- **📱 Cards Touch**: Tarjetas optimizadas para touch
- **📱 Swipe Actions**: Acciones por deslizamiento
- **📱 Pull to Refresh**: Actualizar deslizando hacia abajo

#### **📱 Gestión Móvil**

- **📱 Formularios Touch**: Formularios optimizados para móvil
- **📱 Selectores Touch**: Selectores táctiles
- **📱 Modales Responsive**: Ventanas modales adaptativas
- **📱 Notificaciones Push**: Notificaciones móviles

---

## 🔧 **Solución de Problemas**

### **🚨 Problemas Comunes**

#### **🔐 Problemas de Login**

| **Problema** | **Solución** |
|--------------|--------------|
| **Contraseña incorrecta** | Verificar credenciales o resetear contraseña |
| **Usuario no autorizado** | Contactar al administrador principal |
| **Sesión expirada** | Hacer login nuevamente |
| **Error de conexión** | Verificar conexión a internet |

#### **📱 Problemas Móviles**

| **Problema** | **Solución** |
|--------------|--------------|
| **Sitio no carga** | Verificar conexión y limpiar cache |
| **Elementos cortados** | Rotar dispositivo o usar modo escritorio |
| **Lentitud** | Cerrar otras aplicaciones |
| **No se puede hacer scroll** | Reiniciar navegador |

#### **📧 Problemas de Email**

| **Problema** | **Solución** |
|--------------|--------------|
| **Emails no se envían** | Verificar configuración de Resend |
| **Spam en bandeja de entrada** | Revisar carpeta de spam |
| **Plantillas no se cargan** | Verificar conexión a internet |
| **Emails duplicados** | Limpiar cache del navegador |

### **🔧 Soluciones Técnicas**

#### **🧹 Limpieza de Cache**

```bash
# Limpiar cache del navegador
1. Abrir DevTools (F12)
2. Click derecho en botón de refresh
3. Seleccionar "Empty Cache and Hard Reload"
```

#### **📱 Reinicio de Dispositivo**

```bash
# Para problemas persistentes en móvil
1. Cerrar todas las aplicaciones
2. Reiniciar dispositivo
3. Limpiar cache del navegador
4. Intentar acceso nuevamente
```

#### **🌐 Verificar Conexión**

```bash
# Verificar conectividad
1. Probar otros sitios web
2. Verificar WiFi/4G
3. Reiniciar router si es necesario
4. Contactar proveedor de internet
```

---

## 📞 **Soporte Técnico**

### **👥 Equipo de Soporte**

#### **🔧 Desarrollador Principal**

- **👤 Nombre**: [Tu Nombre]
- **📧 Email**: montzavy@gmail.com
- **📞 Teléfono**: +51 989 253 275
- **🕐 Horario**: Lunes a Viernes 9:00 AM - 6:00 PM

#### **👨‍💼 Administrador del Sistema**

- **👤 Nombre**: [Nombre del Admin]
- **📧 Email**: mmontanezt@gmail.com
- **📞 Teléfono**: [Teléfono del Admin]
- **🕐 Horario**: Lunes a Viernes 8:00 AM - 6:00 PM

### **📞 Canales de Soporte**

#### **🚨 Soporte Urgente**

- **📞 Teléfono**: +51 969 960 969
- **📧 Email**: montzavy@gmail.com
- **⏰ Disponibilidad**: 24/7 para emergencias críticas

#### **📧 Soporte por Email**

- **📧 General**: montzavy@gmail.com
- **📧 Técnico**: montzavy@gmail.com
- **📧 Administrativo**: mmontanezt@gmail.com
- **⏰ Respuesta**: Dentro de 24 horas

#### **💬 Soporte en Línea**

- **🌐 Chat**: Disponible en el panel de administración
- **📱 WhatsApp**: +51 989 253 275
- **💬 Telegram**: [Usuario de Telegram]
- **⏰ Horario**: Lunes a Viernes 9:00 AM - 6:00 PM

### **📋 Proceso de Soporte**

#### **🔄 Flujo de Soporte**

1. **📝 Reportar Problema**: Describir el problema detalladamente
2. **🔍 Análisis**: El equipo técnico analiza el problema
3. **🛠️ Solución**: Implementación de la solución
4. **✅ Verificación**: Confirmación de que el problema se resolvió
5. **📊 Seguimiento**: Monitoreo para evitar recurrencia

#### **📊 Niveles de Soporte**

| **Nivel** | **Tiempo de Respuesta** | **Tipo de Problema** |
|-----------|-------------------------|----------------------|
| **🟢 Nivel 1** | 2-4 horas | Problemas básicos de uso |
| **🟡 Nivel 2** | 4-8 horas | Problemas de funcionalidad |
| **🔴 Nivel 3** | 8-24 horas | Problemas críticos del sistema |
| **⚫ Nivel 4** | 24-48 horas | Problemas de infraestructura |

---

## 🎯 **Consejos de Uso**

### **💡 Mejores Prácticas**

#### **📊 Gestión Eficiente**

- **🔄 Revisar contactos** al menos 2 veces al día
- **📅 Confirmar citas** 24 horas antes
- **📝 Mantener notas** actualizadas
- **📊 Revisar estadísticas** semanalmente

#### **🔒 Seguridad**

- **🔐 Cerrar sesión** al terminar de usar
- **🔑 Cambiar contraseña** regularmente
- **📱 No compartir** credenciales
- **🖥️ Usar dispositivos** seguros

#### **📱 Optimización Móvil**

- **📱 Usar modo horizontal** para tablas
- **🔄 Actualizar página** si hay problemas
- **📱 Usar gestos táctiles** para navegación
- **📱 Mantener navegador** actualizado

### **🚀 Funcionalidades Avanzadas**

#### **📊 Reportes Automáticos**

- **📅 Reportes diarios** por email
- **📊 Estadísticas semanales** automáticas
- **📈 Análisis de tendencias** mensuales
- **📋 Exportación de datos** en Excel

#### **🔔 Notificaciones Inteligentes**

- **📧 Alertas de contacto** en tiempo real
- **📅 Recordatorios de citas** automáticos
- **📊 Notificaciones de estadísticas** diarias
- **🚨 Alertas de sistema** críticas

---

## 📚 **Recursos Adicionales**

### **📖 Documentación Técnica**

- **[🔧 Guía de Desarrollador](./developer-guide.md)**: Documentación técnica completa
- **[🎨 Sistema de Diseño](./design-system.md)**: Guías de diseño y UI/UX
- **[🔥 Configuración Firebase](./firebase-setup.md)**: Setup y configuración
- **[📱 Optimización Móvil](./performance-optimizations.md)**: Mejoras de performance

### **🎥 Videos Tutoriales**

- **[📱 Uso del Panel Móvil](https://youtube.com/watch?v=...)**: Tutorial completo
- **[📊 Gestión de Contactos](https://youtube.com/watch?v=...)**: Guía paso a paso
- **[📅 Gestión de Citas](https://youtube.com/watch?v=...)**: Tutorial de citas
- **[⚙️ Configuración del Sistema](https://youtube.com/watch?v=...)**: Setup completo

### **📱 Aplicaciones Móviles**

- **📱 PWA**: Instalar como aplicación móvil
- **📱 Notificaciones Push**: Recibir alertas en tiempo real
- **📱 Modo Offline**: Funcionalidad sin conexión
- **📱 Sincronización**: Datos sincronizados automáticamente

---

## 🎉 **Conclusión**

El **Panel de Administración Montañez Lab** es una herramienta poderosa y fácil de usar que permite gestionar eficientemente todo el sitio web del laboratorio dental.

### **✨ Beneficios Principales**

- **🚀 Eficiencia**: Gestión centralizada de todas las operaciones
- **📊 Visibilidad**: Estadísticas en tiempo real del negocio
- **📱 Accesibilidad**: Uso desde cualquier dispositivo
- **🔒 Seguridad**: Sistema seguro y confiable
- **📈 Crecimiento**: Herramientas para escalar el negocio

### **🎯 Próximos Pasos**

1. **📚 Leer** este manual completo
2. **🔐 Acceder** al panel de administración
3. **📊 Explorar** todas las funcionalidades
4. **📱 Probar** en dispositivos móviles
5. **📞 Contactar** soporte si es necesario

---

**🔄 Última actualización:** Diciembre 2024  
**📚 Versión del manual:** 2.0  
**👥 Equipo:** Montañez Lab Web Team  
**📧 Soporte:** montzavy@gmail.com

---

## 🆘 **¿Necesitas Ayuda?**

Si tienes alguna pregunta o necesitas soporte técnico:

- **📞 Llamar**: +51 969 960 969
- **📧 Email**: montzavy@gmail.com
- **💬 Chat**: Disponible en el panel de administración
- **📱 WhatsApp**: +51 989 253 275

**¡Estamos aquí para ayudarte a aprovechar al máximo el Panel de Administración Montañez Lab! 🚀**
