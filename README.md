# 🦷 Gata Viejis - Laboratorio Dental

Sitio web moderno y profesional para laboratorio dental con tecnología de vanguardia, diseño responsive y optimizaciones de performance.

## ✨ Características Principales

### 🎨 **Diseño y UX**

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Tema Dual**: Light y Dark mode con transiciones suaves
- **Animaciones**: Framer Motion para micro-interacciones elegantes
- **Accesibilidad**: Cumple estándares WCAG 2.1 AA
- **Performance**: Lazy loading, skeleton loaders y optimizaciones

### 🚀 **Funcionalidades**

- **Hero Carousel**: Presentación dinámica de servicios
- **Galería Interactiva**: Modal con filtros por categorías
- **Formularios Inteligentes**: Validación en tiempo real
- **WhatsApp Integration**: Chat directo con prioridades
- **Sistema de Citas**: Agendamiento online inteligente
- **Panel Admin**: Dashboard para gestión de consultas

### 🛠️ **Tecnologías**

- **Next.js 15**: Framework React con App Router
- **TypeScript**: Tipado estático completo
- **Tailwind CSS**: Sistema de diseño utility-first
- **Framer Motion**: Animaciones fluidas
- **Firebase**: Backend y autenticación
- **Bun**: Runtime y package manager

## 📁 Estructura del Proyecto

```
montanez-lab-web/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel administrativo
│   ├── api/               # API routes
│   └── globals.css        # Estilos globales
├── components/             # Componentes React
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Secciones principales
│   ├── ui/                # Componentes base (Radix UI)
│   └── admin/             # Componentes del dashboard
├── data/                  # Datos estáticos y mock
├── lib/                   # Utilidades y configuración
│   ├── design-system/     # Sistema de diseño
│   ├── config/            # Configuración del sitio
│   └── firebase/          # Servicios de Firebase
├── hooks/                 # Custom React hooks
├── contexts/              # Context providers
├── types/                 # Definiciones de TypeScript
└── public/                # Assets estáticos
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
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Playfair Display', 'Georgia', 'serif'],
}

// Escala de tamaños
fontSize: {
  xs: '0.75rem',    // 12px
  base: '1rem',     // 16px
  xl: '1.25rem',    // 20px
  '4xl': '2.25rem', // 36px
}
```

### **Espaciado**

```typescript
// Sistema de espaciado consistente
spacing: {
  'section-padding': 'py-16 md:py-20 lg:py-24',
  'container-padding': 'px-4 md:px-6 lg:px-8',
  'card-padding': 'p-6 md:p-8',
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
- npm, yarn, pnpm o bun

### **Instalación**

```bash
# Clonar repositorio
git clone https://github.com/username/montanez-lab-web.git
cd montanez-lab-web

# Instalar dependencias
bun install
# o
npm install

# Variables de entorno
cp env.local.example .env.local
# Configurar variables de Firebase y otros servicios

# Desarrollo
bun run dev
# o
npm run dev
```

### **Variables de Entorno**

```bash
# Información del sitio
NEXT_PUBLIC_SITE_NAME=Gata viejis
NEXT_PUBLIC_SITE_DESCRIPTION=Laboratorio Dental
NEXT_PUBLIC_SITE_URL=https://dentallabpro.com

# Información de contacto
NEXT_PUBLIC_CONTACT_PHONE=+51 1 234 5678
NEXT_PUBLIC_CONTACT_WHATSAPP=+51 1 234 5678
NEXT_PUBLIC_CONTACT_EMAIL=info@dentallabpro.com
NEXT_PUBLIC_CONTACT_ADDRESS_STREET=Av. Javier Prado Este 1234
NEXT_PUBLIC_CONTACT_ADDRESS_CITY=Lima
NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY=Perú

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=51912345678

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Analytics
NEXT_PUBLIC_GA_ID=

# Email (Resend)
RESEND_API_KEY=
```

**📋 Archivos de configuración disponibles:**

- `env.example` - Variables de entorno para producción
- `env.local.example` - Variables de entorno para desarrollo local

## 🚀 Scripts Disponibles

```bash
# Desarrollo
bun run dev          # Servidor de desarrollo
bun run build        # Build de producción
bun run start        # Servidor de producción
bun run lint         # Linting con ESLint
bun run type-check   # Verificación de tipos
bun run analyze      # Análisis del bundle
```

## 📊 Performance y Optimizaciones

### **Lazy Loading**

- **Componentes**: React.lazy() para secciones pesadas
- **Imágenes**: Intersection Observer API
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
- **Custom Events**: Formularios, clicks en WhatsApp
- **Conversion Tracking**: Objetivos de negocio

### **Performance Monitoring**

- **Core Web Vitals**: LCP, FID, CLS
- **User Experience**: Métricas de engagement
- **Error Tracking**: Monitoreo de errores

## 🧪 Testing

### **Estrategia de Testing**

- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Componentes y hooks
- **E2E Tests**: Playwright para flujos completos
- **Visual Regression**: Comparación de UI

### **Coverage Goals**

- **Components**: >90% coverage
- **Hooks**: >95% coverage
- **Utils**: >100% coverage

## 🚀 Deployment

### **Plataformas Soportadas**

- **Vercel**: Deploy automático con Git
- **Netlify**: Build y deploy automático
- **AWS Amplify**: CI/CD completo
- **Docker**: Containerización

### **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - run: npm run deploy
```

## 📚 Documentación Adicional

- **Design System**: `/docs/design-system.md`
- **API Reference**: `/docs/api.md`
- **Component Library**: `/docs/components.md`
- **Performance Guide**: `/docs/performance.md`

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

- **Desarrollador**: [Tu Nombre]
- **Email**: [tu-email@ejemplo.com]
- **Website**: [tu-website.com]
- **LinkedIn**: [tu-linkedin]

---

**Gata Viejis** - Laboratorio Dental de Vanguardia 🦷✨
