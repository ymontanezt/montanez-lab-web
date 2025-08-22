# 🦷 Montañez Lab - Laboratorio Dental

Sitio web moderno y profesional para laboratorio dental con tecnología de vanguardia, diseño responsive, optimizaciones de performance y despliegue en Firebase Hosting.

## ✨ Características Principales

### 🎨 **Diseño y UX**

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Tema Dual**: Light, Dark y System mode con transiciones suaves
- **Animaciones**: Framer Motion para micro-interacciones elegantes
- **Accesibilidad**: Cumple estándares WCAG 2.1 AA
- **Performance**: Lazy loading, skeleton loaders y optimizaciones avanzadas

### 🚀 **Funcionalidades**

- **Hero Carousel**: Presentación dinámica de servicios
- **Galería Interactiva**: Modal con filtros por categorías y touch gestures
- **Formularios Inteligentes**: Validación en tiempo real con analytics
- **WhatsApp Integration**: Chat directo con prioridades
- **Sistema de Citas**: Agendamiento online inteligente
- **Panel Admin**: Dashboard para gestión de consultas
- **PWA**: Instalable como aplicación móvil

### 🛠️ **Tecnologías**

- **Next.js 15**: Framework React con App Router y export estático
- **TypeScript**: Tipado estático completo
- **Tailwind CSS**: Sistema de diseño utility-first
- **Framer Motion**: Animaciones fluidas
- **Firebase**: Backend, autenticación y hosting
- **Bun**: Runtime y package manager
- **PWA**: Service Worker y manifest optimizado

## 📁 Estructura del Proyecto

```
montanez-lab-web/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel administrativo
│   ├── api/               # API routes
│   ├── servicios/         # Páginas de servicios
│   └── globals.css        # Estilos globales
├── components/             # Componentes React
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Secciones principales
│   ├── ui/                # Componentes base (Radix UI)
│   ├── admin/             # Componentes del dashboard
│   └── error-boundary.tsx # Manejo de errores
├── hooks/                 # Custom React hooks
│   ├── use-scroll-animation.ts
│   ├── use-touch-gestures.ts
│   └── use-web-vitals.ts
├── data/                  # Datos estáticos y mock
├── lib/                   # Utilidades y configuración
│   ├── analytics.ts       # Google Analytics y tracking
│   ├── firebase/          # Servicios de Firebase
│   └── config/            # Configuración del sitio
├── public/                # Assets estáticos y PWA
└── docs/                  # Documentación completa
```

## 🎨 Sistema de Diseño

### **Paleta de Colores**

```typescript
// Colores primarios (verde dental)
primary: {
  50: '#f0fdf4',   // Verde muy claro
  500: '#22c55e',  // Verde principal
  600: '#16a34a',  // Verde oscuro
  900: '#14532d',  // Verde muy oscuro
}

// Escala de grises
gray: {
  50: '#f9fafb',   // Blanco suave
  900: '#111827',  // Negro suave
  950: '#030712',  // Negro puro
}
```

### **Tipografía**

```typescript
// Fuentes principales
fontFamily: {
  sans: ['Open Sans', 'system-ui', 'sans-serif'],
  serif: ['Montserrat', 'Georgia', 'serif'],
}

// Escala de tamaños
fontSize: {
  xs: '0.75rem',    // 12px
  base: '1rem',     // 16px
  xl: '1.25rem',    // 20px
  '4xl': '2.25rem', // 36px
}
```

## 🚀 Componentes Principales

### **Hero Section**

```tsx
<Hero
  slides={heroSlides}
  autoPlay={true}
  autoPlayInterval={6000}
  showStats={true}
  showPlayButton={true}
  variant="default"
/>
```

### **Services Grid**

```tsx
<Services
  services={services}
  showBadge={true}
  showFeatures={true}
  showBenefits={false}
  maxDisplayed={6}
  columns={3}
/>
```

### **Gallery with Filters**

```tsx
<Gallery images={galleryImages} maxItems={8} columns={4} showTitle={true} showFilters={true} />
```

### **Contact Form**

```tsx
<ContactForm onSubmit={handleSubmit} variant="default" showTitle={true} />
```

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: `< 768px` - Espaciado compacto
- **Tablet**: `768px - 1024px` - Espaciado medio
- **Desktop**: `> 1024px` - Espaciado generoso

### **Grid System**

```typescript
const gridCols = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}
```

## 🔧 Configuración y Setup

### **Requisitos**

- Node.js 18+ o Bun 1.0+
- Firebase CLI para deploy

### **Instalación**

```bash
# Clonar repositorio
git clone https://github.com/ymontanezt/montanez-lab-web.git
cd montanez-lab-web

# Instalar dependencias
bun install

# Variables de entorno
cp env.local.example .env.local
# Configurar variables de Firebase y otros servicios

# Desarrollo
bun run dev

# Build para producción
bun run build

# Deploy a Firebase
bun run deploy:firebase
```

### **Variables de Entorno**

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

## 🚀 Scripts Disponibles

```bash
# Desarrollo
bun run dev              # Servidor de desarrollo
bun run build            # Build de producción
bun run start            # Servidor de producción
bun run lint             # Linting con ESLint
bun run type-check       # Verificación de tipos
bun run analyze          # Análisis del bundle

# Deploy
bun run export           # Build estático
bun run deploy:firebase  # Deploy a Firebase Hosting
```

## 📊 Performance y Optimizaciones

### **Lazy Loading**

- **Componentes**: React.lazy() para secciones pesadas
- **Imágenes**: Intersection Observer API con OptimizedImage
- **Skeleton Loaders**: Placeholders elegantes durante carga

### **Bundle Optimization**

- **Code Splitting**: División automática por rutas
- **Tree Shaking**: Eliminación de código no utilizado
- **Dynamic Imports**: Carga bajo demanda

### **Image Optimization**

- **Formatos Modernos**: WebP, AVIF con fallbacks
- **Responsive Images**: srcset para diferentes dispositivos
- **Lazy Loading**: Carga solo cuando es visible

## 🔒 Seguridad

### **Headers de Seguridad**

```typescript
// next.config.mjs
const securityHeaders = [
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
]
```

### **Validación de Formularios**

- **Client-side**: Validación en tiempo real
- **Server-side**: Sanitización de inputs
- **Rate Limiting**: Protección contra spam

## 📈 Analytics y Tracking

### **Google Analytics 4**

- **Page Views**: Tracking automático de navegación
- **Custom Events**: Formularios, clicks en WhatsApp, servicios
- **Conversion Tracking**: Objetivos de negocio

### **Performance Monitoring**

- **Core Web Vitals**: LCP, INP, CLS, FCP, TTFB
- **User Experience**: Métricas de engagement
- **Error Tracking**: Monitoreo de errores con Error Boundaries

## 🚀 PWA (Progressive Web App)

### **Características PWA**

- **Instalable**: Se puede instalar en dispositivos móviles
- **Offline**: Funcionamiento básico sin conexión
- **Service Worker**: Cache inteligente de recursos
- **Manifest**: Configuración para instalación

### **Service Worker**

```typescript
// Cache strategies implementadas
- Fonts: Cache First (365 días)
- Images: Stale While Revalidate (24 horas)
- JS/CSS: Stale While Revalidate (24 horas)
- API: Stale While Revalidate (24 horas)
```

## 🎯 Touch Gestures

### **Gestos Soportados**

- **Swipe**: Navegación en galería y carruseles
- **Pinch**: Zoom en imágenes
- **Double Tap**: Reset de zoom
- **Touch Navigation**: Navegación táctil optimizada

## 🧪 Testing

### **Estrategia de Testing**

- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Componentes y hooks
- **E2E Tests**: Playwright para flujos completos
- **Visual Regression**: Comparación de UI

## 🚀 Deployment

### **Firebase Hosting**

- **Build Estático**: Export optimizado de Next.js
- **CDN Global**: Distribución de contenido mundial
- **HTTPS Automático**: Seguridad por defecto
- **Deploy Automático**: Con GitHub Actions

### **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase
on:
  push:
    branches: [main, develop]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: firebase deploy --only hosting
```

## 📚 Documentación Adicional

- **Design System**: `/docs/design-system.md`
- **Environment Setup**: `/docs/environment-setup.md`
- **Firebase Deployment**: `/docs/firebase-hosting-deploy.md`
- **Performance Guide**: `/docs/performance-optimizations.md`

## 🤝 Contribución

### **Guidelines**

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

### **Code Style**

- **TypeScript**: Tipado estricto
- **ESLint**: Reglas de código
- **Prettier**: Formateo automático
- **Husky**: Pre-commit hooks

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Desarrollador**: michcode
- **Email**: ymontanezt@gmail.com
- **GitHub**: [ymontanezt](https://github.com/ymontanezt)
- **Proyecto**: [montanez-lab-web](https://github.com/ymontanezt/montanez-lab-web)

---

**Montañez Lab** - Laboratorio Dental de Vanguardia 🦷✨

_Construido con Next.js 15, TypeScript, Tailwind CSS y Firebase_
