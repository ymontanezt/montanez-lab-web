# 🦷 Montañez Lab - Laboratorio Dental de Excelencia

> **Sitio web profesional y moderno para laboratorio dental con panel de administración completo**

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

## 🚀 **Características Principales**

### **🎨 Frontend Moderno**

- **Next.js 13+** con App Router para máxima performance
- **TypeScript** para código tipo-seguro y mantenible
- **Tailwind CSS** para diseño responsive y moderno
- **Framer Motion** para animaciones fluidas
- **PWA** con service worker y funcionalidad offline

### **🔥 Backend Robusto**

- **Firebase Firestore** para base de datos NoSQL
- **Firebase Auth** para autenticación segura
- **Firebase Storage** para gestión de archivos
- **Firebase Hosting** para deployment automático

### **📱 Experiencia Mobile-First**

- **Diseño responsive** optimizado para todos los dispositivos
- **Touch gestures** para navegación intuitiva
- **Carousels horizontales** con scroll snap
- **Optimización de performance** para dispositivos móviles

### **👨‍💼 Panel de Administración**

- **Dashboard** con estadísticas en tiempo real
- **Gestión de citas** y contactos
- **Sistema de slides** para el hero principal
- **Configuración del sistema** centralizada

## 🏗️ **Arquitectura del Proyecto**

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

## ⚙️ **Configuración y Entornos**

### **Entornos Disponibles**

El proyecto mantiene **solo 2 entornos** para simplificar la gestión:

- **🔄 Desarrollo:** `http://localhost:3000` - Debug habilitado
- **🚀 Producción:** `https://montanez-website.web.app` - Optimizado

### **Tecnologías Principales**

- **Frontend:** Next.js 13+ con App Router
- **Styling:** Tailwind CSS + CSS Modules
- **Backend:** Firebase (Firestore, Auth, Storage)
- **Base de Datos:** Firestore (NoSQL)
- **Autenticación:** Firebase Auth
- **Deployment:** Firebase Hosting
- **Lenguaje:** TypeScript
- **Gestión de Estado:** React Context + Hooks

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

## 📋 **Flujo de Trabajo Git**

### **Reglas Estrictas**

- **🚫 Solo Admin puede hacer merge** a ramas principales
- **🚫 No hay push automático** a ninguna rama principal
- **✅ Feature branches** para desarrollo individual
- **✅ Pull Requests** obligatorios para todos los merges

### **Estructura de Ramas**

```
main (producción)
├── develop (desarrollo)
│   ├── feature/nueva-funcionalidad
│   ├── bugfix/correccion-error
│   └── hotfix/urgencia-produccion
└── release/v1.0.0
```

### **Flujo de Trabajo**

1. **Crear feature branch** desde `develop`
2. **Desarrollo y commits** en la rama feature
3. **Push solo a feature branch** (NO a develop)
4. **Crear Pull Request** a `develop`
5. **Admin revisa y hace merge**
6. **Admin hace merge** de `develop` a `main`

## 🔥 **Firebase y Base de Datos**

### **Servicios Utilizados**

- **Firestore:** Base de datos NoSQL para citas, contactos y contenido
- **Firebase Auth:** Autenticación de usuarios y admins
- **Firebase Storage:** Almacenamiento de imágenes y archivos
- **Firebase Hosting:** Deployment y hosting del sitio web

### **Colecciones Principales**

- **`appointments`:** Sistema de citas y reservas
- **`contacts`:** Mensajes de contacto de clientes
- **`hero-slides`:** Slides dinámicos del hero principal
- **`users`:** Usuarios administradores del sistema

## 📱 **Funcionalidades Principales**

### **Para Clientes**

- **🌐 Sitio web responsive** con diseño moderno
- **📅 Sistema de citas** online con confirmación
- **📞 Formulario de contacto** con notificaciones
- **🖼️ Galería de trabajos** con filtros por categoría
- **👥 Información del equipo** especializado
- **📱 PWA** instalable como aplicación móvil

### **Para Administradores**

- **📊 Dashboard** con estadísticas en tiempo real
- **📋 Gestión de citas** con estados y seguimiento
- **💬 Gestión de contactos** con sistema de respuestas
- **🖼️ Gestión de slides** del hero principal
- **⚙️ Configuración del sistema** centralizada
- **📊 Reportes y exportación** de datos

## 🚀 **Deployment y Producción**

### **Plataforma de Hosting**

- **Firebase Hosting** para deployment automático
- **CDN global** con HTTPS automático
- **Build estático** optimizado de Next.js
- **Dominio personalizado** configurable

### **Proceso de Deploy**

```bash
# Build de producción
bun run build

# Deploy a Firebase
firebase deploy --only hosting

# Deploy completo
firebase deploy
```

## 📊 **Performance y Optimización**

### **Core Web Vitals**

- **LCP:** < 2.5s (Largest Contentful Paint)
- **FID:** < 100ms (First Input Delay)
- **CLS:** < 0.1 (Cumulative Layout Shift)

### **Lighthouse Score**

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

### **Optimizaciones Implementadas**

- **Lazy loading** de componentes y imágenes
- **Code splitting** automático de Next.js
- **Image optimization** con formatos modernos
- **Bundle analysis** y optimización
- **Service worker** para cache inteligente

## 🔒 **Seguridad y Autenticación**

### **Medidas de Seguridad**

- **Firebase Security Rules** para Firestore y Storage
- **Content Security Policy** configurado
- **Headers de seguridad** implementados
- **Validación de datos** en frontend y backend
- **Rate limiting** para APIs

### **Sistema de Autenticación**

- **Firebase Auth** con proveedores múltiples
- **Roles de usuario** (Usuario, Admin)
- **Tokens JWT** para sesiones seguras
- **Protección de rutas** administrativas

## 📚 **Documentación**

### **Documentación Disponible**

- **[📚 Documentación Completa](./docs/README.md)** - Guía técnica completa
- **[📋 Flujo de Trabajo Git](./docs/git-workflow.md)** - Reglas y procesos Git
- **[👥 Guía de Usuario](./docs/user-guide.md)** - Manual para usuarios finales
- **[🔌 API Reference](./docs/api-reference.md)** - Documentación de APIs
- **[🎨 Design System](./docs/design-system.md)** - Sistema de diseño
- **[🔥 Firebase Setup](./docs/firebase-setup.md)** - Configuración de Firebase

## 🐛 **Troubleshooting**

### **Problemas Comunes**

- **Firebase not initialized:** Verificar variables de entorno
- **Permission denied:** Verificar reglas de Firestore
- **Build errors:** Ejecutar `npm run type-check`
- **Performance issues:** Usar `npm run analyze`

### **Logs y Debugging**

```bash
# Habilitar debug en desarrollo
NEXT_PUBLIC_DEBUG=true

# Ver logs de Firebase
firebase functions:log
firebase hosting:log
```

## 📞 **Soporte y Contacto**

### **Equipo de Desarrollo**

- **Desarrollador Principal:** [Tu Nombre]
- **Email:** montzavy@gmail.com
- **Admin Email:** mmontanezt@gmail.com

### **Información de Contacto**

- **📧 Email:** montzavy@gmail.com
- **📞 Teléfono:** +51 989 253 275
- **🆘 Soporte:** +51 969 960 969
- **📍 Dirección:** Av. Catalina de Wanka 1234, Huancayo, Perú

### **Recursos Útiles**

- **GitHub Issues:** [Reportar problemas](https://github.com/ymontanezt/montanez-lab-web/issues)
- **GitHub Discussions:** [Discusiones](https://github.com/ymontanezt/montanez-lab-web/discussions)
- **Documentación Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Documentación Firebase:** [firebase.google.com/docs](https://firebase.google.com/docs)

## 🤝 **Contribución**

### **Cómo Contribuir**

1. **Fork** del repositorio
2. **Crear feature branch** desde `develop`
3. **Desarrollo** con commits descriptivos
4. **Crear Pull Request** a `develop`
5. **Esperar revisión** del admin
6. **Merge** después de aprobación

### **Convenciones de Código**

- **Commits:** Conventional Commits
- **Naming:** camelCase para variables, PascalCase para componentes
- **Code Style:** ESLint + Prettier
- **TypeScript:** Tipado estricto

## 📝 **Changelog**

### **v1.0.0** - _Fecha_

- ✅ **Implementación inicial** del sitio web completo
- ✅ **Panel de administración** con todas las funcionalidades
- ✅ **Sistema de citas y contactos** integrado
- ✅ **Integración completa** con Firebase
- ✅ **Optimización mobile** con carousels horizontales
- ✅ **Actualización de marca** a Montañez Lab
- ✅ **Limpieza de entornos** (solo develop y production)
- ✅ **Eliminación de Vercel y GitHub Actions**
- ✅ **Documentación consolidada** y mejorada

## 📄 **Licencia**

Este proyecto es privado y propiedad de **Montañez Lab**. Todos los derechos reservados.

---

## 🎉 **¡Gracias por usar Montañez Lab!**

Este proyecto representa la excelencia en desarrollo web para laboratorios dentales, con un enfoque en **performance**, **usabilidad** y **profesionalismo**.

**⭐ Si te gusta el proyecto, ¡dale una estrella en GitHub!**

---

**🔄 Última actualización:** [Fecha]  
**📚 Documentación:** [docs/README.md](./docs/README.md)  
**🌐 Sitio web:** [https://montanez-website.web.app](https://montanez-website.web.app)
