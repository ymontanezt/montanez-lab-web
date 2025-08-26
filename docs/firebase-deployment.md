# 🚀 Manual de Deployment - Firebase Hosting

> **Guía completa para desplegar Montañez Lab en Firebase Hosting**

## 🎯 **Resumen Ejecutivo**

Este manual describe el proceso completo de deployment del proyecto Montañez Lab en Firebase Hosting, incluyendo configuración, build, deploy y monitoreo.

## 📋 **Prerrequisitos**

### **1. Herramientas Requeridas**
- **Node.js:** 18.0.0 o superior
- **Bun:** 1.0.0 o superior (recomendado)
- **Git:** Para control de versiones
- **Firebase CLI:** Para deployment

### **2. Cuentas y Proyectos**
- **Cuenta Firebase:** [firebase.google.com](https://firebase.google.com)
- **Proyecto Firebase:** `montanez-website`
- **Cuenta GitHub:** Para control de versiones

## 🔧 **Instalación y Configuración**

### **1. Instalar Firebase CLI**

```bash
# Instalación global
npm install -g firebase-tools

# Verificar instalación
firebase --version
```

### **2. Login a Firebase**

```bash
# Login con tu cuenta de Google
firebase login

# Verificar que estés logueado
firebase projects:list
```

### **3. Inicializar Proyecto Firebase**

```bash
# Navegar al directorio del proyecto
cd montanez-lab-web

# Inicializar Firebase
firebase init

# Seleccionar opciones:
# ✅ Hosting: Configure files for Firebase Hosting
# ✅ Firestore: Configure security rules and indexes
# ✅ Storage: Configure security rules for Cloud Storage
# ✅ Emulators: Set up local emulators for Firebase products
```

### **4. Configuración de Firebase**

#### **firebase.json**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

#### **.firebaserc**
```json
{
  "projects": {
    "default": "montanez-website"
  }
}
```

## 🏗️ **Proceso de Build**

### **1. Variables de Entorno**

#### **Desarrollo (.env.local)**
```bash
NODE_ENV=development
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG=true
```

#### **Producción (.env.production)**
```bash
NODE_ENV=production
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_SITE_URL=https://montanez-website.web.app
NEXT_PUBLIC_DEBUG=false
```

### **2. Scripts de Build**

```bash
# Instalar dependencias
npm install
# o
bun install

# Build de desarrollo
npm run build:dev
# o
bun run build:dev

# Build de producción
npm run build
# o
bun run build

# Build estático para Firebase
npm run build:static
# o
bun run build:static
```

### **3. Configuración de Next.js para Firebase**

#### **next.config.mjs**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para export estático
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## 🚀 **Proceso de Deploy**

### **1. Deploy Manual**

#### **Paso 1: Build de Producción**
```bash
# Asegurar que estés en la rama correcta
git checkout main
git pull origin main

# Instalar dependencias
npm install

# Build de producción
npm run build

# Verificar que el build sea exitoso
ls -la out/
```

#### **Paso 2: Deploy a Firebase**
```bash
# Deploy solo hosting
firebase deploy --only hosting

# Deploy completo (hosting + firestore + storage)
firebase deploy

# Deploy específico por entorno
firebase deploy --only hosting --project montanez-website
```

#### **Paso 3: Verificar Deploy**
```bash
# Ver estado del deploy
firebase hosting:channel:list

# Abrir el sitio
firebase hosting:open
```

### **2. Deploy Automatizado (Opcional)**

#### **Script de Deploy**
```bash
#!/bin/bash
# scripts/deploy-firebase.sh

set -e

echo "🚀 Iniciando deploy a Firebase..."

# Verificar que estés en main
if [[ $(git branch --show-current) != "main" ]]; then
    echo "❌ Error: Debes estar en la rama main para hacer deploy"
    exit 1
fi

# Verificar que no haya cambios sin commitear
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ Error: Hay cambios sin commitear"
    exit 1
fi

# Pull de cambios recientes
echo "📥 Actualizando repositorio..."
git pull origin main

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Build de producción
echo "🏗️ Construyendo proyecto..."
npm run build

# Verificar build
if [ ! -d "out" ]; then
    echo "❌ Error: Build falló - directorio 'out' no encontrado"
    exit 1
fi

# Deploy a Firebase
echo "🚀 Desplegando a Firebase..."
firebase deploy --only hosting

echo "✅ Deploy completado exitosamente!"
echo "🌐 Sitio disponible en: https://montanez-website.web.app"
```

#### **Hacer el Script Ejecutable**
```bash
chmod +x scripts/deploy-firebase.sh
```

## 🔒 **Configuración de Seguridad**

### **1. Reglas de Firestore**

#### **firestore.rules**
```typescript
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
    
    match /hero-slides/{slideId} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### **2. Reglas de Storage**

#### **storage.rules**
```typescript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Lectura pública para imágenes del sitio
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Escritura solo para admins autenticados
    match /{allPaths=**} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### **3. Headers de Seguridad**

#### **Configuración en firebase.json**
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          },
          {
            "key": "Permissions-Policy",
            "value": "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ]
  }
}
```

## 📊 **Monitoreo y Logs**

### **1. Logs de Firebase**

```bash
# Ver logs de hosting
firebase hosting:log

# Ver logs de functions (si las hay)
firebase functions:log

# Ver logs de firestore
firebase firestore:log

# Ver logs de storage
firebase storage:log
```

### **2. Analytics y Performance**

#### **Firebase Analytics**
- **Dashboard:** [Firebase Console](https://console.firebase.google.com)
- **Métricas:** Usuarios activos, eventos, conversiones
- **Performance:** Core Web Vitals, tiempo de carga

#### **Google Analytics**
- **Dashboard:** [Google Analytics](https://analytics.google.com)
- **Métricas:** Tráfico, comportamiento, conversiones
- **Reportes:** Personalizados y automatizados

### **3. Monitoreo de Errores**

#### **Firebase Crashlytics**
```bash
# Habilitar Crashlytics en el proyecto
firebase crashlytics:enable
```

#### **Error Boundaries en React**
```typescript
// components/error-boundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    // Enviar a Firebase Crashlytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: true,
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Algo salió mal</h1>
          <p>Hemos detectado un error y estamos trabajando para solucionarlo.</p>
          <button onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 🔄 **Rollback y Recuperación**

### **1. Rollback de Deploy**

```bash
# Ver historial de deploys
firebase hosting:releases:list

# Rollback a versión anterior
firebase hosting:releases:rollback [RELEASE_ID]

# Rollback a versión específica
firebase hosting:releases:rollback [RELEASE_ID] --to [TARGET_RELEASE_ID]
```

### **2. Recuperación de Emergencias**

#### **Script de Recuperación**
```bash
#!/bin/bash
# scripts/emergency-rollback.sh

set -e

echo "🚨 Iniciando rollback de emergencia..."

# Rollback inmediato a la versión anterior
firebase hosting:releases:rollback

echo "✅ Rollback de emergencia completado!"
echo "🌐 Sitio restaurado a versión anterior"
```

## 📱 **Configuración de Dominio Personalizado**

### **1. Agregar Dominio Personalizado**

```bash
# Agregar dominio personalizado
firebase hosting:sites:add [SITE_ID] --project [PROJECT_ID]

# Configurar dominio
firebase hosting:sites:list
```

### **2. Configuración DNS**

#### **Registros A**
```
montanez-lab.com → 151.101.1.195
montanez-lab.com → 151.101.65.195
```

#### **Registros CNAME**
```
www.montanez-lab.com → montanez-website.web.app
```

### **3. Verificación SSL**

```bash
# Verificar estado del SSL
firebase hosting:sites:list

# Forzar renovación de SSL
firebase hosting:sites:update [SITE_ID]
```

## 🧪 **Testing y Validación**

### **1. Testing Local**

```bash
# Iniciar emuladores de Firebase
firebase emulators:start

# Testing en emuladores
npm run test:firebase

# Testing de integración
npm run test:integration
```

### **2. Testing de Producción**

```bash
# Build de testing
npm run build:test

# Deploy a staging (si está configurado)
firebase deploy --only hosting --project montanez-website-staging

# Testing en staging
npm run test:e2e:staging
```

## 📚 **Comandos Útiles**

### **1. Gestión de Proyectos**

```bash
# Listar proyectos
firebase projects:list

# Cambiar proyecto activo
firebase use [PROJECT_ID]

# Ver configuración actual
firebase projects:list
```

### **2. Gestión de Hosting**

```bash
# Ver sitios de hosting
firebase hosting:sites:list

# Crear nuevo sitio
firebase hosting:sites:create [SITE_ID]

# Eliminar sitio
firebase hosting:sites:delete [SITE_ID]
```

### **3. Gestión de Emuladores**

```bash
# Iniciar emuladores
firebase emulators:start

# Iniciar emuladores específicos
firebase emulators:start --only hosting,firestore

# Ver logs de emuladores
firebase emulators:start --inspect-functions
```

## 🐛 **Troubleshooting**

### **1. Problemas Comunes**

#### **Error: Build falla**
```bash
# Verificar dependencias
npm install

# Limpiar cache
npm run clean

# Verificar variables de entorno
cat .env.production
```

#### **Error: Deploy falla**
```bash
# Verificar login
firebase login --reauth

# Verificar proyecto
firebase use --add

# Verificar permisos
firebase projects:list
```

#### **Error: SSL no funciona**
```bash
# Verificar configuración DNS
nslookup montanez-lab.com

# Forzar renovación SSL
firebase hosting:sites:update [SITE_ID]
```

### **2. Logs y Debugging**

```bash
# Habilitar debug
export FIREBASE_DEBUG=true

# Ver logs detallados
firebase deploy --debug

# Ver logs de hosting
firebase hosting:log --debug
```

## 📞 **Soporte y Contacto**

### **Recursos de Ayuda**
- **Firebase Documentation:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Firebase Console:** [console.firebase.google.com](https://console.firebase.google.com)
- **Firebase Support:** [firebase.google.com/support](https://firebase.google.com/support)

### **Contacto del Equipo**
- **Email:** montzavy@gmail.com
- **Admin Email:** mmontanezt@gmail.com

---

**📚 Esta documentación se actualiza regularmente. Última actualización: [Fecha]**
