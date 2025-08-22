# 📚 Documentación - Montañez Lab

## 🎯 **Bienvenido a la Documentación**

Esta es la documentación completa del proyecto **Montañez Lab**, un sitio web moderno y profesional para laboratorio dental. Aquí encontrarás toda la información necesaria para entender, usar y desarrollar el proyecto.

## 📖 **Guías Disponibles**

### **👥 Para Usuarios Finales**

- **[Guía de Usuario](./user-guide.md)** - Manual completo de uso del sitio web
  - Navegación y funcionalidades
  - Formularios y contacto
  - Características móviles y PWA
  - Solución de problemas comunes

### **🛠️ Para Desarrolladores**

- **[Guía de Desarrollador](./developer-guide.md)** - Documentación técnica completa
  - Arquitectura del proyecto
  - Configuración del entorno
  - Componentes y hooks
  - Deployment y CI/CD

### **🔌 Para Integración**

- **[API Reference](./api-reference.md)** - Documentación de APIs y servicios
  - Endpoints de Next.js
  - Servicios de Firebase
  - Custom hooks
  - Seguridad y validación

### **🎨 Para Diseñadores**

- **[Design System](./design-system.md)** - Sistema de diseño completo
  - Paleta de colores
  - Tipografía
  - Componentes UI
  - Guías de estilo

### **🚀 Para Deployment**

- **[Firebase Hosting](./firebase-hosting-deploy.md)** - Guía de despliegue
  - Configuración de Firebase
  - Build y deploy
  - CI/CD con GitHub Actions

### **⚡ Para Performance**

- **[Performance Optimizations](./performance-optimizations.md)** - Optimizaciones de rendimiento
  - Lazy loading
  - Bundle optimization
  - Core Web Vitals
  - PWA strategies

## 🏗️ **Arquitectura del Proyecto**

### **Stack Tecnológico**

- **Frontend**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Deploy**: Firebase Hosting
- **Package Manager**: Bun

### **Estructura de Carpetas**

```
montanez-lab-web/
├── app/                    # App Router de Next.js
├── components/             # Componentes React
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades y configuración
├── data/                   # Datos estáticos
├── public/                 # Assets estáticos
├── docs/                   # Documentación
└── scripts/                # Scripts de automatización
```

## 🚀 **Quick Start**

### **1. Instalación**

```bash
# Clonar repositorio
git clone https://github.com/ymontanezt/montanez-lab-web.git
cd montanez-lab-web

# Instalar dependencias
bun install

# Configurar variables de entorno
cp env.local.example .env.local
# Editar .env.local con tus credenciales
```

### **2. Desarrollo**

```bash
# Servidor de desarrollo
bun run dev

# Build de producción
bun run build

# Deploy a Firebase
bun run deploy:firebase
```

### **3. Scripts Disponibles**

```bash
bun run dev              # Desarrollo
bun run build            # Build
bun run lint             # Linting
bun run type-check       # Verificación de tipos
bun run analyze          # Bundle analyzer
bun run deploy:firebase  # Deploy
```

## 📱 **Características Principales**

### **🎨 UX/UI**

- Diseño responsive y moderno
- Tema dual (light/dark/system)
- Animaciones fluidas con Framer Motion
- Accesibilidad WCAG 2.1 AA

### **🚀 Performance**

- Lazy loading de componentes
- Skeleton loaders
- Optimización de imágenes
- Bundle analysis

### **📱 PWA**

- Instalable como app móvil
- Service worker con cache inteligente
- Funcionamiento offline básico
- Push notifications (próximamente)

### **📊 Analytics**

- Google Analytics 4
- Core Web Vitals tracking
- Eventos personalizados
- Performance monitoring

### **🔒 Seguridad**

- Validación de formularios
- Headers de seguridad
- Error boundaries
- Rate limiting

## 🎯 **Casos de Uso**

### **Para Clientes**

- Explorar servicios dentales
- Ver galería de trabajos
- Contactar al laboratorio
- Agendar consultas

### **Para Administradores**

- Panel de gestión
- Gestión de contactos
- Estadísticas del sitio
- Configuración del sistema

### **Para Desarrolladores**

- Componentes reutilizables
- Hooks personalizados
- Sistema de diseño
- API documentada

## 🔧 **Configuración**

### **Variables de Entorno Requeridas**

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google Analytics
NEXT_PUBLIC_GA_ID=
```

### **Dependencias Principales**

```json
{
  "next": "15.2.4",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^4.1.9",
  "framer-motion": "latest",
  "firebase": "latest"
}
```

## 📊 **Métricas y Performance**

### **Core Web Vitals**

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **FCP**: < 1.8s (First Contentful Paint)
- **TTFB**: < 800ms (Time to First Byte)

### **Bundle Size**

- **JavaScript**: < 200KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **Images**: Optimizadas con WebP/AVIF

### **Lighthouse Score**

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## 🧪 **Testing**

### **Estrategia de Testing**

- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Componentes y hooks
- **E2E Tests**: Playwright (próximamente)
- **Visual Regression**: Comparación de UI

### **Coverage Goals**

- **Components**: >90%
- **Hooks**: >95%
- **Utils**: >100%

## 🚀 **Deployment**

### **Plataforma**

- **Firebase Hosting**: CDN global, HTTPS automático
- **Build Estático**: Export optimizado de Next.js
- **CI/CD**: GitHub Actions automático

### **Environments**

- **Development**: `localhost:3000`
- **Staging**: `staging-[project].web.app`
- **Production**: `[project].web.app`

## 🤝 **Contribución**

### **Flujo de Trabajo**

1. Fork del repositorio
2. Crear rama feature
3. Hacer commits descriptivos
4. Crear Pull Request

### **Convenciones**

- **Commits**: Conventional Commits
- **Naming**: camelCase para variables, PascalCase para componentes
- **Code Style**: ESLint + Prettier

## 📞 **Soporte**

### **Canales de Ayuda**

- **Issues**: [GitHub Issues](https://github.com/ymontanezt/montanez-lab-web/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ymontanezt/montanez-lab-web/discussions)
- **Email**: ymontanezt@gmail.com

### **Recursos Adicionales**

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## 📈 **Roadmap**

### **Fase 1: Performance Crítica** ✅

- [x] Lazy loading de componentes
- [x] Skeleton loaders
- [x] Bundle optimization
- [x] Image optimization

### **Fase 2: UX/UI Avanzado** ✅

- [x] Touch gestures
- [x] Scroll animations
- [x] Dark mode avanzado
- [x] Error boundaries

### **Fase 3: Móvil y PWA Avanzado** 🚧

- [x] PWA básico
- [x] Service worker
- [ ] Push notifications
- [ ] Offline sync avanzado

### **Fase 4: Analytics y Monitoreo** 🚧

- [x] Google Analytics 4
- [x] Core Web Vitals
- [ ] Real-time dashboard
- [ ] Performance monitoring

### **Fase 5: Testing y Calidad** 📋

- [ ] Jest + Testing Library
- [ ] E2E testing con Playwright
- [ ] Visual regression testing
- [ ] Performance testing

### **Fase 6: Internacionalización** 📋

- [ ] Soporte multi-idioma
- [ ] RTL support
- [ ] Localización de contenido
- [ ] Timezone handling

---

## 🎉 **¡Gracias por usar Montañez Lab!**

Este proyecto es el resultado de muchas horas de desarrollo, testing y optimización. Esperamos que esta documentación te ayude a aprovechar al máximo todas las funcionalidades disponibles.

**¿Tienes sugerencias para mejorar la documentación?** ¡Abre un issue o discussion en GitHub!
