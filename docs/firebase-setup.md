# 🔥 Configuración de Firebase - Montanez Lab Web

## 📋 **Resumen**

Esta guía te llevará paso a paso para configurar Firebase en tu proyecto de laboratorio dental, incluyendo autenticación, base de datos, almacenamiento y emuladores para desarrollo.

## 🚀 **PASO 1: Crear Proyecto en Firebase Console**

### 1.1 Acceder a Firebase Console

- Ve a [Firebase Console](https://console.firebase.google.com/)
- Inicia sesión con tu cuenta de Google

### 1.2 Crear Nuevo Proyecto

- Haz clic en **"Crear un proyecto"**
- **Nombre del proyecto**: `montanez-lab-web` (o el que prefieras)
- **Habilitar Google Analytics**: ✅ Recomendado para seguimiento
- Haz clic en **"Crear proyecto"**

### 1.3 Configurar Analytics (Opcional)

- Selecciona tu cuenta de Google Analytics
- Acepta los términos y condiciones
- Haz clic en **"Crear proyecto"**

## 🔐 **PASO 2: Configurar Authentication**

### 2.1 Habilitar Métodos de Autenticación

- En el menú lateral, ve a **"Authentication"**
- Haz clic en **"Comenzar"**
- En **"Sign-in method"**, habilita:
  - ✅ **Correo electrónico/contraseña**
  - ✅ **Anónimo** (opcional, para visitantes)
- Haz clic en **"Guardar"**

### 2.2 Configurar Usuarios Administradores

- Ve a la pestaña **"Users"**
- Haz clic en **"Add user"**
- Crea un usuario admin:
  - **Email**: `montzavy@gmail.com`
  - **Password**: `Admin123!` (cambia por una contraseña segura)
- Haz clic en **"Add user"**

## 🗄️ **PASO 3: Configurar Firestore Database**

### 3.1 Crear Base de Datos

- En el menú lateral, ve a **"Firestore Database"**
- Haz clic en **"Crear base de datos"**
- **Modo de inicio**: Selecciona **"Modo de prueba"** (para desarrollo)
- **Ubicación**: Selecciona la más cercana (ej: `us-central1`)
- Haz clic en **"Habilitar"**

### 3.2 Configurar Reglas de Seguridad

- Las reglas ya están configuradas en `firestore.rules`
- Para producción, cambia a **"Modo bloqueado"** y despliega las reglas

## 📁 **PASO 4: Configurar Storage**

### 4.1 Habilitar Storage

- En el menú lateral, ve a **"Storage"**
- Haz clic en **"Comenzar"**
- **Modo de inicio**: Selecciona **"Modo de prueba"** (para desarrollo)
- **Ubicación**: Misma que Firestore
- Haz clic en **"Habilitar"**

### 4.2 Configurar Reglas de Storage

- Las reglas ya están configuradas en `storage.rules`
- Para producción, despliega las reglas

## ⚙️ **PASO 5: Obtener Configuración del Proyecto**

### 5.1 Acceder a Configuración

- En la configuración del proyecto (⚙️)
- Haz clic en **"Configuración del proyecto"**
- Baja hasta **"Tus apps"**

### 5.2 Crear App Web

- Haz clic en el ícono de Web (</>)
- **Nombre de la app**: `montanez-lab-web-web`
- **Habilita Firebase Hosting**: ❌ (no lo necesitamos ahora)
- Haz clic en **"Registrar app"**

### 5.3 Copiar Configuración

Después de registrar la app, Firebase te mostrará:

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyC...',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto',
  storageBucket: 'tu-proyecto.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abc123def456',
}
```

**¡COPIA TODOS ESTOS VALORES!**

## 🔧 **PASO 6: Configurar Variables de Entorno**

### 6.1 Crear Archivo .env.local

```bash
cp env.local.example .env.local
```

### 6.2 Configurar Variables de Firebase

Edita `.env.local` y reemplaza los valores de ejemplo:

```bash
# Firebase (configurar con tus credenciales)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...tu_api_key_real
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### 6.3 Variables de Emulador (Desarrollo)

```bash
# Firebase Emulators (solo para desarrollo)
NEXT_PUBLIC_FIREBASE_USE_EMULATOR=false
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=9099
NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST=8080
NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST=9199
```

## 🚀 **PASO 7: Configuración Automática (Recomendado)**

### 7.1 Ejecutar Script de Configuración

```bash
./scripts/setup-firebase.sh
```

Este script:

- ✅ Instala Firebase CLI si no está instalado
- ✅ Inicia sesión en Firebase
- ✅ Configura el proyecto
- ✅ Instala dependencias
- ✅ Crea archivo .env.local
- ✅ Verifica configuración

### 7.2 Configuración Manual (Alternativa)

Si prefieres configurar manualmente:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Configurar proyecto
firebase use tu-proyecto-id

# Instalar dependencias
npm install firebase
```

## 🔥 **PASO 8: Probar Configuración**

### 8.1 Verificar Conexión

```bash
# Iniciar emuladores
firebase emulators:start

# En otra terminal, iniciar la app
bun run dev
```

### 8.2 Verificar en Consola del Navegador

Deberías ver:

```
✅ Firebase configurado correctamente
✅ Conexión a Firestore establecida
✅ Conexión a Auth establecida
```

## 🧪 **PASO 9: Emuladores para Desarrollo**

### 9.1 Iniciar Emuladores

```bash
firebase emulators:start
```

### 9.2 Acceder a Emuladores

- **UI de Emuladores**: http://localhost:4000
- **Auth Emulator**: http://localhost:9099
- **Firestore Emulator**: http://localhost:8080
- **Storage Emulator**: http://localhost:9199

### 9.3 Habilitar Emuladores en Desarrollo

En `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
```

## 🚀 **PASO 10: Despliegue a Producción**

### 10.1 Cambiar a Modo Producción

- En Firebase Console, cambia Firestore a **"Modo bloqueado"**
- Despliega las reglas de seguridad

### 10.2 Desplegar Reglas

```bash
# Desplegar reglas de Firestore
firebase deploy --only firestore:rules

# Desplegar reglas de Storage
firebase deploy --only storage:rules

# Desplegar índices
firebase deploy --only firestore:indexes
```

### 10.3 Configurar Variables de Producción

En tu servidor de producción, configura las variables de entorno con los valores reales de Firebase.

## 📚 **Estructura de la Base de Datos**

### Collections Principales

- **`contacts`**: Formularios de contacto
- **`appointments`**: Citas programadas
- **`users`**: Usuarios registrados
- **`admins`**: Administradores
- **`testimonials`**: Testimonios de clientes
- **`gallery`**: Imágenes de la galería
- **`services`**: Servicios ofrecidos
- **`team`**: Miembros del equipo
- **`stats`**: Estadísticas del sitio
- **`audit-logs`**: Logs de auditoría

### Reglas de Seguridad

- **Lectura pública**: Testimonios, galería, servicios, equipo
- **Escritura restringida**: Solo administradores
- **Datos personales**: Solo usuarios autenticados
- **Contactos**: Cualquiera puede crear, solo admins pueden leer

## 🔍 **Solución de Problemas**

### Error: "Firebase App named '[DEFAULT]' already exists"

- **Solución**: Verifica que solo se inicialice Firebase una vez
- **Causa**: Múltiples inicializaciones de Firebase

### Error: "Permission denied"

- **Solución**: Verifica las reglas de Firestore/Storage
- **Causa**: Reglas de seguridad muy restrictivas

### Error: "Network request failed"

- **Solución**: Verifica conexión a internet y configuración de Firebase
- **Causa**: Problemas de red o configuración incorrecta

### Emuladores no funcionan

- **Solución**: Verifica que los puertos no estén ocupados
- **Causa**: Otros servicios usando los mismos puertos

## 📖 **Recursos Adicionales**

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security)

## 🎯 **Próximos Pasos**

1. **Configurar Firebase** siguiendo esta guía
2. **Probar emuladores** en desarrollo
3. **Implementar funcionalidades** usando Firebase
4. **Desplegar a producción** cuando esté listo
5. **Configurar monitoreo** y alertas

---

**¿Necesitas ayuda con algún paso específico?**
Revisa la consola del navegador para mensajes de error y consulta la documentación de Firebase.
