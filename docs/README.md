# 📚 Documentación Completa - Montañez Lab

> **Laboratorio Dental de Excelencia** - Documentación técnica completa del proyecto web

## 🚀 **Índice Rápido**

- [🏗️ **Arquitectura del Proyecto**](#-arquitectura-del-proyecto)
- [⚙️ **Configuración y Entornos**](#️-configuración-y-entornos)
- [🔧 **Instalación y Desarrollo**](#-instalación-y-desarrollo)
- [🔥 **Firebase y Base de Datos**](#-firebase-y-base-de-datos)
- [📱 **Componentes y Funcionalidades**](#-componentes-y-funcionalidades)
- [🚀 **Deployment y Producción**](#-deployment-y-producción)
- [📋 **Flujo de Trabajo Git**](#-flujo-de-trabajo-git)
- [🔒 **Seguridad y Autenticación**](#-seguridad-y-autenticación)
- [📊 **Performance y Optimización**](#-performance-y-optimización)
- [🐛 **Troubleshooting**](#-troubleshooting)

---

## 🏗️ **Arquitectura del Proyecto**

### **Estructura de Carpetas**

```
montanez-lab-web/
├── app/                    # App Router de Next.js 13+
│   ├── admin/             # Panel de administración
│   ├── api/               # API Routes
│   ├── servicios/         # Páginas de servicios
│   └── globals.css        # Estilos globales
├── components/            # Componentes React reutilizables
│   ├── admin/            # Componentes del panel admin
│   ├── sections/         # Secciones principales
│   ├── ui/               # Componentes de UI base
│   └── layout/           # Componentes de layout
├── lib/                  # Utilidades y configuraciones
│   ├── config/           # Configuraciones centralizadas
│   ├── firebase/         # Configuración de Firebase
│   └── utils/            # Utilidades generales
├── hooks/                # Custom React Hooks
├── contexts/             # Contextos de React
├── data/                 # Datos estáticos
├── types/                # Definiciones de TypeScript
└── docs/                 # Documentación del proyecto
```

### **Tecnologías Principales**

- **Frontend:** Next.js 13+ con App Router
- **Styling:** Tailwind CSS + CSS Modules
- **Backend:** Firebase (Firestore, Auth, Storage)
- **Base de Datos:** Firestore (NoSQL)
- **Autenticación:** Firebase Auth
- **Deployment:** Firebase Hosting
- **Lenguaje:** TypeScript
- **Gestión de Estado:** React Context + Hooks

---

## ⚙️ **Configuración y Entornos**

### **Entornos Disponibles**

El proyecto solo mantiene **2 entornos** para simplificar la gestión:

#### **1. Desarrollo (`development`)**

- **URL:** `http://localhost:3000`
- **Debug:** Habilitado
- **Base de datos:** `montanez_lab_dev`
- **Firebase:** Proyecto de desarrollo

#### **2. Producción (`production`)**

- **URL:** `https://montanez-website.web.app`
- **Debug:** Deshabilitado
- **Base de datos:** `montanez_lab_prod`
- **Firebase:** Proyecto de producción

### **Variables de Entorno**

#### **Archivos de Configuración**

- `.env.example` - Plantilla de configuración
- `.env.local` - Configuración local (no committear)

#### **Variables Principales**

```bash
# Configuración básica
NODE_ENV=development
NEXT_PUBLIC_ENV=development

# Información del sitio
NEXT_PUBLIC_SITE_NAME=Montañez Lab
NEXT_PUBLIC_SITE_URL=https://montanez-website.web.app

# Contacto
NEXT_PUBLIC_CONTACT_EMAIL=montzavy@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+51 989 253 275
NEXT_PUBLIC_CONTACT_EMERGENCY=+51 969 960 969

# Firebase
NEXT_PUBLIC_FIREBASE_PROJECT_ID=montanez-website
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=montanez-website.firebaseapp.com

# Email
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=montzavy@gmail.com
```

---

## 🔧 **Instalación y Desarrollo**

### **Requisitos Previos**

- **Node.js:** 18.0.0 o superior
- **Bun:** 1.0.0 o superior (recomendado)
- **Git:** Para control de versiones
- **Cuenta Firebase:** Para backend

### **Instalación Inicial**

```bash
# 1. Clonar el repositorio
git clone https://github.com/ymontanezt/montanez-lab-web.git
cd montanez-lab-web

# 2. Instalar dependencias
bun install
# o
npm install

# 3. Configurar variables de entorno
cp env.local.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
bun run dev
# o
npm run dev
```

### **Scripts Disponibles**

```bash
# Desarrollo
bun run dev          # Servidor de desarrollo
bun run build        # Build de producción
bun run start        # Servidor de producción
bun run lint         # Linting con ESLint
bun run type-check   # Verificación de tipos TypeScript

# Testing
bun run test         # Ejecutar tests
bun run test:watch   # Tests en modo watch

# Utilidades
bun run clean        # Limpiar build
bun run analyze      # Análisis de bundle
```

---

## 🔥 **Firebase y Base de Datos**

### **Configuración de Firebase**

#### **1. Crear Proyecto Firebase**

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto: `montanez-website`
3. Habilitar servicios: Firestore, Auth, Storage

#### **2. Configurar Firestore**

```typescript
// Reglas de seguridad básicas
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública para contenido del sitio
    match /{document=**} {
      allow read: if true;
    }

    // Escritura solo para admins autenticados
    match /appointments/{appointmentId} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    match /contacts/{contactId} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

#### **3. Configurar Storage**

```typescript
// Reglas de Storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### **Estructura de Base de Datos**

#### **Colecciones Principales**

```typescript
// Appointments (Citas)
appointments: {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  date: Timestamp;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Contacts (Contactos)
contacts: {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Hero Slides
hero-slides: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  isActive: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 📱 **Componentes y Funcionalidades**

### **Componentes Principales**

#### **1. Secciones del Sitio**

- **Hero Section:** Carrusel principal con slides dinámicos
- **Services:** Servicios ofrecidos con carrusel
- **Team:** Equipo especializado con scroll horizontal
- **Gallery:** Galería de imágenes con filtros
- **Contact:** Formulario de contacto y información
- **Testimonials:** Testimonios de clientes

#### **2. Panel de Administración**

- **Dashboard:** Estadísticas y resumen
- **Appointments:** Gestión de citas
- **Contacts:** Gestión de contactos
- **Hero Slides:** Gestión de slides del hero
- **System Settings:** Configuración del sistema

#### **3. Componentes UI**

- **Forms:** Formularios con validación
- **Modals:** Modales para contenido expandido
- **Carousels:** Carruseles responsivos
- **Navigation:** Navegación y breadcrumbs

### **Funcionalidades Principales**

#### **1. Sistema de Citas**

- Formulario de reserva online
- Validación de disponibilidad
- Confirmación por email
- Gestión desde panel admin

#### **2. Sistema de Contacto**

- Formulario de contacto
- Notificaciones por email
- Seguimiento de mensajes
- Respuestas automáticas

#### **3. Gestión de Contenido**

- Slides del hero dinámicos
- Galería de imágenes
- Testimonios de clientes
- Información del equipo

---

## 🚀 **Deployment y Producción**

### **Deployment con Firebase**

#### **1. Configuración de Firebase**

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login a Firebase
firebase login

# Inicializar proyecto
firebase init hosting
```

#### **2. Build y Deploy**

```bash
# Build de producción
bun run build

# Deploy a Firebase
firebase deploy --only hosting

# Deploy completo (hosting + firestore + storage)
firebase deploy
```

#### **3. Configuración de Dominio**

- **Dominio principal:** `montanez-website.web.app`
- **Dominio personalizado:** Configurar en Firebase Console
- **SSL:** Automático con Firebase

### **Variables de Producción**

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_SITE_URL=https://montanez-website.web.app
NEXT_PUBLIC_DEBUG=false
```

---

## 📋 **Flujo de Trabajo Git**

### **Estructura de Ramas**

```
main (producción)
├── develop (desarrollo)
│   ├── feature/nueva-funcionalidad
│   ├── bugfix/correccion-error
│   └── hotfix/urgencia-produccion
└── release/v1.0.0
```

### **Reglas de Trabajo**

#### **1. Solo Admin Puede Hacer Merge**

- **Rama `main`:** Solo merge desde `develop` (admin)
- **Rama `develop`:** Solo merge desde feature branches (admin)
- **Feature branches:** Desarrollo individual

#### **2. Flujo de Trabajo**

```bash
# 1. Crear feature branch desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollo y commits
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push a feature branch (NO a develop)
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request a develop
# 5. Admin revisa y hace merge
# 6. Admin hace merge de develop a main
```

#### **3. Convenciones de Commits**

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de estilo
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

---

## 🔒 **Seguridad y Autenticación**

### **Sistema de Autenticación**

#### **1. Firebase Auth**

- **Proveedores:** Email/Password, Google
- **Roles:** Usuario, Admin
- **Tokens:** JWT con Firebase

#### **2. Reglas de Seguridad**

```typescript
// Solo admins pueden escribir en colecciones sensibles
match /appointments/{appointmentId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.token.admin == true;
}
```

#### **3. Content Security Policy**

```typescript
// Headers de seguridad configurados
'X-Content-Type-Options': 'nosniff',
'X-Frame-Options': 'DENY',
'X-XSS-Protection': '1; mode=block'
```

### **Validación de Datos**

#### **1. Frontend**

- Validación con React Hook Form
- Sanitización de inputs
- Validación de tipos TypeScript

#### **2. Backend**

- Validación en API routes
- Sanitización con Firebase Security Rules
- Rate limiting para APIs

---

## 📊 **Performance y Optimización**

### **Optimizaciones Implementadas**

#### **1. Next.js**

- **App Router:** Routing optimizado
- **Image Optimization:** Optimización automática de imágenes
- **Code Splitting:** División automática de código
- **Static Generation:** Generación estática cuando es posible

#### **2. React**

- **Lazy Loading:** Carga diferida de componentes
- **Memoization:** useMemo y useCallback
- **Virtual Scrolling:** Para listas largas

#### **3. CSS y Assets**

- **Tailwind CSS:** CSS utility-first
- **Purge CSS:** Eliminación de CSS no usado
- **Image Optimization:** WebP y formatos modernos

### **Métricas de Performance**

#### **1. Core Web Vitals**

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

#### **2. Lighthouse Score**

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

---

## 🐛 **Troubleshooting**

### **Problemas Comunes**

#### **1. Errores de Firebase**

```bash
# Error: Firebase not initialized
# Solución: Verificar .env.local y configuración

# Error: Permission denied
# Solución: Verificar reglas de Firestore
```

#### **2. Errores de Build**

```bash
# Error: TypeScript compilation
# Solución: npm run type-check

# Error: ESLint
# Solución: npm run lint
```

#### **3. Problemas de Performance**

```bash
# Bundle size grande
# Solución: npm run analyze

# Imágenes lentas
# Solución: Verificar optimización de Next.js
```

### **Logs y Debugging**

#### **1. Desarrollo Local**

```bash
# Habilitar debug
NEXT_PUBLIC_DEBUG=true

# Ver logs en consola
console.log('Debug info:', data);
```

#### **2. Producción**

```bash
# Firebase Functions logs
firebase functions:log

# Hosting logs
firebase hosting:log
```

---

## 📞 **Soporte y Contacto**

### **Equipo de Desarrollo**

- **Desarrollador Principal:** [Tu Nombre]
- **Email:** montzavy@gmail.com
- **Admin Email:** mmontanezt@gmail.com

### **Recursos Útiles**

- **Documentación Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Documentación Firebase:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Documentación Tailwind:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

### **Reportar Issues**

- **GitHub Issues:** [GitHub Issues](https://github.com/ymontanezt/montanez-lab-web/issues)
- **Email:** montzavy@gmail.com

---

## 📝 **Changelog**

### **v1.0.0** - _Fecha_

- ✅ Implementación inicial del sitio web
- ✅ Panel de administración completo
- ✅ Sistema de citas y contactos
- ✅ Integración con Firebase
- ✅ Optimización mobile completa
- ✅ Actualización de marca a Montañez Lab

---

**📚 Esta documentación se actualiza regularmente. Última actualización: [Fecha]**
