# 🛠️ Guía de Desarrollador - Montañez Lab

## 🎯 **Introducción**

Esta guía está diseñada para desarrolladores que trabajen en el proyecto **Montañez Lab**. Incluye información técnica detallada sobre la arquitectura, componentes, y procesos de desarrollo.

## 🏗️ **Arquitectura del Proyecto**

### **Stack Tecnológico**

- **Frontend**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **Estado**: React Hooks + Context API
- **Animaciones**: Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Deploy**: Firebase Hosting
- **Package Manager**: Bun

### **Estructura de Carpetas**

```
montanez-lab-web/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel administrativo
│   ├── api/               # API routes
│   ├── servicios/         # Páginas dinámicas de servicios
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/             # Componentes React
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Secciones principales
│   ├── ui/                # Componentes base (Radix UI)
│   ├── admin/             # Componentes del dashboard
│   └── error-boundary.tsx # Manejo de errores
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades y configuración
├── data/                   # Datos estáticos
├── public/                 # Assets estáticos
├── docs/                   # Documentación
└── scripts/                # Scripts de automatización
```

## 🔧 **Configuración del Entorno**

### **Requisitos del Sistema**

- **Node.js**: 18.0.0 o superior
- **Bun**: 1.0.0 o superior (recomendado)
- **Git**: Para control de versiones
- **Firebase CLI**: Para deploy

### **Instalación Inicial**

```bash
# Clonar repositorio
git clone https://github.com/ymontanezt/montanez-lab-web.git
cd montanez-lab-web

# Instalar dependencias
bun install

# Configurar variables de entorno
cp env.local.example .env.local
# Editar .env.local con tus credenciales

# Verificar instalación
bun run type-check
bun run lint
```

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

# Email (opcional)
RESEND_API_KEY=
```

## 🚀 **Scripts de Desarrollo**

### **Comandos Principales**

```bash
# Desarrollo
bun run dev              # Servidor de desarrollo
bun run build            # Build de producción
bun run start            # Servidor de producción
bun run export           # Build estático para Firebase

# Calidad de Código
bun run lint             # ESLint
bun run lint:fix         # ESLint con auto-fix
bun run type-check       # Verificación de tipos
bun run format           # Prettier
bun run format:check     # Verificar formato

# Análisis
bun run analyze          # Bundle analyzer
bun run clean            # Limpiar builds

# Deploy
bun run deploy:firebase  # Deploy a Firebase Hosting
```

### **Scripts Personalizados**

```bash
# Validar configuración
bun run validate:env     # Validar variables de entorno

# Setup
bun run setup:github-secrets  # Configurar GitHub Secrets
```

## 🎨 **Sistema de Diseño**

### **Configuración de Tailwind**

```typescript
// tailwind.config.ts
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        serif: ['Montserrat', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### **Tokens de Diseño**

```typescript
// lib/design-system/tokens.ts
export const tokens = {
  spacing: {
    'section-padding': 'py-16 md:py-20 lg:py-24',
    'container-padding': 'px-4 md:px-6 lg:px-8',
    'card-padding': 'p-6 md:p-8',
  },
  borderRadius: {
    card: 'rounded-lg',
    button: 'rounded-md',
    input: 'rounded-md',
  },
  shadows: {
    card: 'shadow-lg',
    button: 'shadow-md',
    modal: 'shadow-2xl',
  },
}
```

## 🧩 **Componentes**

### **Estructura de Componentes**

```typescript
// Ejemplo de componente
interface ComponentProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Component({
  variant = 'default',
  size = 'md',
  children,
  className
}: ComponentProps) {
  return (
    <div className={cn(
      'base-classes',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}
```

### **Componentes Base (UI)**

- **Button**: Botones con variantes y estados
- **Card**: Contenedores de contenido
- **Input**: Campos de formulario
- **Modal**: Ventanas emergentes
- **Skeleton**: Placeholders de carga
- **Toast**: Notificaciones del sistema

### **Componentes de Sección**

- **Hero**: Carrusel principal con estadísticas
- **Services**: Grid de servicios con filtros
- **Gallery**: Galería de imágenes con modal
- **Team**: Información del equipo
- **Testimonials**: Opiniones de clientes
- **Contact**: Formulario de contacto

### **Componentes Especializados**

- **WhatsAppWidget**: Chat flotante
- **PWAInstallPrompt**: Prompt de instalación
- **ErrorBoundary**: Manejo de errores
- **ThemeToggle**: Cambio de tema

## 🪝 **Custom Hooks**

### **Hooks de Animación**

```typescript
// hooks/use-scroll-animation.ts
export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}
```

### **Hooks de Gestos**

```typescript
// hooks/use-touch-gestures.ts
export function useGalleryGestures(onSwipe: (direction: 'left' | 'right') => void) {
  const bind = useGesture({
    onDrag: ({ direction: [x], velocity: [vx] }) => {
      if (Math.abs(vx) > 0.5) {
        onSwipe(x > 0 ? 'right' : 'left')
      }
    },
  })

  return bind
}
```

### **Hooks de Performance**

```typescript
// hooks/use-web-vitals.ts
export function useWebVitals() {
  const [vitals, setVitals] = useState<WebVitalsData>({})

  useEffect(() => {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(setVitals)
      onINP(setVitals)
      onFCP(setVitals)
      onLCP(setVitals)
      onTTFB(setVitals)
    })
  }, [])

  return vitals
}
```

## 🔥 **Firebase Integration**

### **Configuración**

```typescript
// lib/firebase/config.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
```

### **Servicios de Firebase**

```typescript
// lib/firebase/services.ts
export class FirebaseService {
  // Firestore
  async getCollection(collection: string) {
    const querySnapshot = await getDocs(collection(db, collection))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  }

  // Storage
  async uploadFile(file: File, path: string) {
    const storageRef = ref(storage, path)
    return uploadBytes(storageRef, file)
  }

  // Auth
  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }
}
```

## 📱 **PWA Configuration**

### **Manifest**

```json
// public/manifest.json
{
  "name": "Montañez Lab",
  "short_name": "Montañez Lab",
  "description": "Laboratorio Dental de Vanguardia",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#22c55e",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### **Service Worker**

```typescript
// next.config.mjs - PWA config
const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
  ],
})
```

## 📊 **Analytics y Tracking**

### **Google Analytics 4**

```typescript
// lib/analytics.ts
export const trackingEvents = {
  navClick: (section: string) =>
    event({
      action: 'click',
      category: 'navigation',
      label: section,
    }),

  contactFormSubmit: (service: string) =>
    event({
      action: 'submit',
      category: 'form',
      label: service,
    }),

  whatsappClick: () =>
    event({
      action: 'click',
      category: 'contact',
      label: 'whatsapp',
    }),
}
```

### **Core Web Vitals**

```typescript
// hooks/use-web-vitals.ts
export function useWebVitals() {
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(metric => {
        event({
          action: 'CLS',
          category: 'web-vitals',
          value: Math.round(metric.value * 1000),
        })
      })
      // ... otros métricos
    })
  }, [])
}
```

## 🚀 **Performance Optimization**

### **Lazy Loading**

```typescript
// components/lazy-components.tsx
import dynamic from 'next/dynamic'

export const LazyGallery = dynamic(() => import('./sections/gallery'), {
  loading: () => <GallerySkeleton />,
  ssr: false,
})

export const LazyAdmin = dynamic(() => import('./admin/page'), {
  loading: () => <AdminSkeleton />,
  ssr: false,
})
```

### **Image Optimization**

```typescript
// components/ui/optimized-image.tsx
export function OptimizedImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative">
      {!isLoaded && !hasError && <Skeleton className="w-full h-full" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        {...props}
      />
    </div>
  )
}
```

### **Bundle Analysis**

```bash
# Analizar bundle
bun run analyze

# Ver resultados en http://localhost:8888
```

## 🧪 **Testing**

### **Estrategia de Testing**

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### **Testing Utilities**

```typescript
// __tests__/utils/test-utils.tsx
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/theme-context'

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
    ...options,
  })
}

export * from '@testing-library/react'
export { render }
```

## 🚀 **Deployment**

### **Firebase Hosting**

```bash
# Configurar Firebase
firebase login
firebase init hosting

# Build y deploy
bun run build
firebase deploy --only hosting

# O usar script automatizado
bun run deploy:firebase
```

### **CI/CD con GitHub Actions**

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

### **Environment Management**

```bash
# Scripts de setup
./scripts/setup-firebase.sh      # Configurar Firebase
./scripts/setup-admin-users.js   # Crear usuarios admin
./scripts/deploy-firebase.sh     # Deploy automatizado
```

## 🔍 **Debugging y Troubleshooting**

### **Errores Comunes**

#### **Hydration Error**

```typescript
// Solución: Usar suppressHydrationWarning
<div suppressHydrationWarning>
  {typeof window !== 'undefined' && <ClientOnlyComponent />}
</div>
```

#### **Image Loading Issues**

```typescript
// Solución: Manejo de errores
<img
  src={src}
  alt={alt}
  onError={(e) => {
    e.currentTarget.src = '/fallback-image.jpg'
  }}
/>
```

#### **Firebase Connection Issues**

```typescript
// Verificar conexión
import { testConnection } from '@/lib/firebase/test-connection'

testConnection().then(result => {
  console.log('Firebase connection:', result)
})
```

### **Debug Tools**

```bash
# Bundle analyzer
bun run analyze

# Type checking
bun run type-check

# Linting
bun run lint

# Performance testing
bun run test:performance
```

## 📚 **Recursos y Referencias**

### **Documentación Oficial**

- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Firebase](https://firebase.google.com/docs)

### **Librerías Utilizadas**

- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)

### **Herramientas de Desarrollo**

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

## 🤝 **Contribución**

### **Flujo de Trabajo**

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Hacer commits descriptivos: `git commit -m "feat: agregar nueva funcionalidad"`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Convenciones de Código**

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
- **Naming**: camelCase para variables, PascalCase para componentes
- **Imports**: Agrupados por tipo (React, librerías, locales)
- **Types**: Interfaces para props, types para uniones

### **Code Review Checklist**

- [ ] Código compila sin errores
- [ ] Tests pasan
- [ ] Linting sin warnings
- [ ] Documentación actualizada
- [ ] Performance considerada
- [ ] Accesibilidad verificada

---

## 🎯 **Próximos Pasos**

1. **Implementar Testing**: Configurar Jest y Testing Library
2. **E2E Testing**: Agregar Playwright para testing end-to-end
3. **Performance Monitoring**: Implementar métricas en tiempo real
4. **Internationalization**: Soporte para múltiples idiomas
5. **Advanced PWA**: Push notifications y offline sync

---

**¿Necesitas ayuda técnica?** Contacta al equipo de desarrollo o revisa los issues en GitHub.
