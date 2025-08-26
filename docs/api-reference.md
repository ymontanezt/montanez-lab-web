# 🔌 API Reference - Montañez Lab

## 🎯 **Introducción**

Esta documentación describe todos los endpoints de la API, servicios de Firebase, y funciones disponibles en el proyecto **Montañez Lab**.

## 🌐 **API Routes (Next.js)**

### **Base URL**

```
Development: http://localhost:3000/api
Production: https://[your-domain].web.app/api
```

### **Endpoints Disponibles**

#### **POST /api/send-email**

Envía formularios de contacto por email.

**Request Body:**

```typescript
{
  name: string // Nombre completo del cliente
  email: string // Email del cliente
  phone: string // Teléfono del cliente
  clinic: string // Nombre de la clínica
  service: string // Servicio de interés
  urgency: 'low' | 'medium' | 'high' // Nivel de urgencia
  message: string // Mensaje detallado
}
```

**Response:**

```typescript
{
  success: boolean       // true si se envió correctamente
  message: string        // Mensaje de confirmación o error
  error?: string         // Detalle del error si falla
}
```

**Ejemplo de Uso:**

```typescript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Dr. Juan Pérez',
    email: 'juan@clinica.com',
    phone: '+51 989 253 275',
    clinic: 'Clínica Dental Pérez',
    service: 'Prótesis Digitales',
    urgency: 'medium',
    message: 'Necesito información sobre prótesis digitales para mi paciente.',
  }),
})

const result = await response.json()
```

## 🔥 **Firebase Services**

### **Configuración Base**

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

### **Firestore Collections**

#### **Contacts Collection**

```typescript
// Estructura del documento
interface Contact {
  id: string
  name: string
  email: string
  phone: string
  clinic: string
  service: string
  urgency: 'low' | 'medium' | 'high'
  message: string
  status: 'pending' | 'contacted' | 'completed'
  createdAt: Timestamp
  updatedAt: Timestamp
  notes?: string
  assignedTo?: string
}
```

**Operaciones CRUD:**

```typescript
// Crear contacto
export async function createContact(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) {
  const docRef = await addDoc(collection(db, 'contacts'), {
    ...contactData,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

// Obtener todos los contactos
export async function getContacts() {
  const querySnapshot = await getDocs(collection(db, 'contacts'))
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Contact[]
}

// Obtener contacto por ID
export async function getContactById(id: string) {
  const docRef = doc(db, 'contacts', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Contact
  }
  return null
}

// Actualizar contacto
export async function updateContact(id: string, updates: Partial<Contact>) {
  const docRef = doc(db, 'contacts', id)
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  })
}

// Eliminar contacto
export async function deleteContact(id: string) {
  const docRef = doc(db, 'contacts', id)
  await deleteDoc(docRef)
}
```

#### **Services Collection**

```typescript
// Estructura del documento
interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  duration: string
  category: string
  features: string[]
  benefits: string[]
  process: string[]
  image: string
  isActive: boolean
  order: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Operaciones CRUD:**

```typescript
// Obtener servicios activos
export async function getActiveServices() {
  const q = query(
    collection(db, 'services'),
    where('isActive', '==', true),
    orderBy('order', 'asc')
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Service[]
}

// Obtener servicio por slug
export async function getServiceBySlug(slug: string) {
  const q = query(
    collection(db, 'services'),
    where('slug', '==', slug),
    where('isActive', '==', true)
  )

  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Service
  }
  return null
}
```

#### **Users Collection (Admin)**

```typescript
// Estructura del documento
interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
  isActive: boolean
  lastLogin: Timestamp
  createdAt: Timestamp
  permissions: {
    canViewContacts: boolean
    canEditContacts: boolean
    canDeleteContacts: boolean
    canManageUsers: boolean
    canViewAnalytics: boolean
  }
}
```

**Operaciones CRUD:**

```typescript
// Crear usuario admin
export async function createAdminUser(userData: Omit<AdminUser, 'id' | 'createdAt'>) {
  const docRef = await addDoc(collection(db, 'users'), {
    ...userData,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  })
  return docRef.id
}

// Verificar permisos de usuario
export async function checkUserPermissions(
  userId: string,
  permission: keyof AdminUser['permissions']
) {
  const user = await getAdminUserById(userId)
  return user?.permissions[permission] || false
}
```

### **Firebase Storage**

#### **Upload de Archivos**

```typescript
// Subir imagen
export async function uploadImage(file: File, path: string) {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

// Eliminar archivo
export async function deleteFile(path: string) {
  const fileRef = ref(storage, path)
  await deleteObject(fileRef)
}

// Obtener URL de descarga
export async function getFileUrl(path: string) {
  const fileRef = ref(storage, path)
  return getDownloadURL(fileRef)
}
```

### **Firebase Authentication**

#### **Autenticación de Usuarios**

```typescript
// Login
export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw new Error('Error en autenticación: ' + error.message)
  }
}

// Logout
export async function signOutUser() {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error('Error en logout: ' + error.message)
  }
}

// Verificar estado de autenticación
export function onAuthStateChanged(callback: (user: User | null) => void) {
  return auth.onAuthStateChanged(callback)
}

// Obtener usuario actual
export function getCurrentUser() {
  return auth.currentUser
}
```

## 📊 **Analytics y Tracking**

### **Google Analytics 4**

```typescript
// lib/analytics.ts

// Eventos de tracking
export const trackingEvents = {
  // Navegación
  navClick: (section: string) =>
    event({
      action: 'click',
      category: 'navigation',
      label: section,
    }),

  // Formularios
  contactFormSubmit: (service: string) =>
    event({
      action: 'submit',
      category: 'form',
      label: service,
    }),

  contactFormError: (error: string) =>
    event({
      action: 'error',
      category: 'form',
      label: error,
    }),

  // Contacto
  whatsappClick: () =>
    event({
      action: 'click',
      category: 'contact',
      label: 'whatsapp',
    }),

  phoneClick: () =>
    event({
      action: 'click',
      category: 'contact',
      label: 'phone',
    }),

  emailClick: () =>
    event({
      action: 'click',
      category: 'contact',
      label: 'email',
    }),

  // Servicios
  serviceView: (serviceName: string) =>
    event({
      action: 'view',
      category: 'service',
      label: serviceName,
    }),

  serviceClick: (serviceName: string) =>
    event({
      action: 'click',
      category: 'service',
      label: serviceName,
    }),

  // Galería
  galleryImageClick: (imageName: string) =>
    event({
      action: 'click',
      category: 'gallery',
      label: imageName,
    }),

  // PWA
  pwaInstallPrompt: () =>
    event({
      action: 'prompt',
      category: 'pwa',
      label: 'install_prompt',
    }),

  pwaInstallSuccess: () =>
    event({
      action: 'install',
      category: 'pwa',
      label: 'success',
    }),
}

// Core Web Vitals
export function trackWebVitals() {
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(metric => {
      event({
        action: 'CLS',
        category: 'web-vitals',
        value: Math.round(metric.value * 1000),
        label: metric.id,
      })
    })

    onINP(metric => {
      event({
        action: 'INP',
        category: 'web-vitals',
        value: Math.round(metric.value),
        label: metric.id,
      })
    })

    onFCP(metric => {
      event({
        action: 'FCP',
        category: 'web-vitals',
        value: Math.round(metric.value),
        label: metric.id,
      })
    })

    onLCP(metric => {
      event({
        action: 'LCP',
        category: 'web-vitals',
        value: Math.round(metric.value),
        label: metric.id,
      })
    })

    onTTFB(metric => {
      event({
        action: 'TTFB',
        category: 'web-vitals',
        value: Math.round(metric.value),
        label: metric.id,
      })
    })
  })
}

// Tracking de engagement
export function trackUserEngagement() {
  let startTime = Date.now()
  let maxScrollDepth = 0

  // Tiempo en página
  const trackTimeOnPage = () => {
    const timeSpent = Date.now() - startTime
    if (timeSpent > 10000) {
      // Solo track si pasó más de 10 segundos
      event({
        action: 'time_on_page',
        category: 'engagement',
        value: Math.round(timeSpent / 1000),
      })
    }
  }

  // Scroll depth
  const trackScrollDepth = () => {
    const scrollDepth = Math.round(
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
    )

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth

      // Track scroll milestones
      if (scrollDepth >= 25 && scrollDepth < 50) {
        event({
          action: 'scroll_milestone',
          category: 'engagement',
          label: '25_percent',
        })
      } else if (scrollDepth >= 50 && scrollDepth < 75) {
        event({
          action: 'scroll_milestone',
          category: 'engagement',
          label: '50_percent',
        })
      } else if (scrollDepth >= 75 && scrollDepth < 100) {
        event({
          action: 'scroll_milestone',
          category: 'engagement',
          label: '75_percent',
        })
      } else if (scrollDepth >= 100) {
        event({
          action: 'scroll_milestone',
          category: 'engagement',
          label: '100_percent',
        })
      }
    }
  }

  // Event listeners
  window.addEventListener('scroll', trackScrollDepth)
  window.addEventListener('beforeunload', trackTimeOnPage)

  // Cleanup
  return () => {
    window.removeEventListener('scroll', trackScrollDepth)
    window.removeEventListener('beforeunload', trackTimeOnPage)
  }
}
```

## 🪝 **Custom Hooks API**

### **useFirebase Hook**

```typescript
// hooks/use-firebase.ts
export function useFirebase() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Firebase ya está inicializado en config
      setIsInitialized(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }, [])

  return {
    isInitialized,
    error,
    db,
    auth,
    storage,
  }
}
```

### **useContacts Hook**

```typescript
// hooks/use-contacts.ts
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getContacts()
      setContacts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar contactos')
    } finally {
      setLoading(false)
    }
  }, [])

  const addContact = useCallback(
    async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const id = await createContact(contactData)
        await fetchContacts() // Recargar lista
        return id
      } catch (err) {
        throw new Error('Error al crear contacto: ' + err.message)
      }
    },
    [fetchContacts]
  )

  const updateContact = useCallback(
    async (id: string, updates: Partial<Contact>) => {
      try {
        await updateContact(id, updates)
        await fetchContacts() // Recargar lista
      } catch (err) {
        throw new Error('Error al actualizar contacto: ' + err.message)
      }
    },
    [fetchContacts]
  )

  const deleteContact = useCallback(
    async (id: string) => {
      try {
        await deleteContact(id)
        await fetchContacts() // Recargar lista
      } catch (err) {
        throw new Error('Error al eliminar contacto: ' + err.message)
      }
    },
    [fetchContacts]
  )

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    refresh: fetchContacts,
  }
}
```

### **useServices Hook**

```typescript
// hooks/use-services.ts
export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getActiveServices()
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar servicios')
    } finally {
      setLoading(false)
    }
  }, [])

  const getServiceBySlug = useCallback(async (slug: string) => {
    try {
      return await getServiceBySlug(slug)
    } catch (err) {
      throw new Error('Error al obtener servicio: ' + err.message)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return {
    services,
    loading,
    error,
    getServiceBySlug,
    refresh: fetchServices,
  }
}
```

## 🔒 **Seguridad y Validación**

### **Validación de Inputs**

```typescript
// lib/validation.ts
import { z } from 'zod'

// Schema para formulario de contacto
export const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 dígitos'),
  clinic: z.string().min(2, 'El nombre de la clínica debe tener al menos 2 caracteres'),
  service: z.string().min(1, 'Debe seleccionar un servicio'),
  urgency: z.enum(['low', 'medium', 'high']),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Validar datos del formulario
export function validateContactForm(data: unknown): ContactFormData {
  return contactFormSchema.parse(data)
}
```

### **Middleware de Seguridad**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Headers de seguridad
  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // CSP para producción
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 📱 **PWA API**

### **Service Worker Events**

```typescript
// Service Worker - runtimeCaching strategies
const runtimeCaching = [
  // Fuentes de Google
  {
    urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts-webfonts',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 días
      },
    },
  },

  // Imágenes estáticas
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60, // 24 horas
      },
    },
  },

  // API calls
  {
    urlPattern: /^https:\/\/.*\.(?:json|xml)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'api-cache',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60, // 24 horas
      },
    },
  },
]
```

### **PWA Install Prompt**

```typescript
// components/pwa-install-prompt.tsx
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  const installPWA = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice

      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installation accepted')
        setIsInstalled(true)
        setShowPrompt(false)
      } else {
        console.log('PWA installation declined')
      }

      setDeferredPrompt(null)
    } catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  return {
    showPrompt,
    isInstalled,
    installPWA,
    dismissPrompt: () => setShowPrompt(false),
  }
}
```

## 🚀 **Performance API**

### **Bundle Analyzer**

```typescript
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// Uso: ANALYZE=true bun run build
```

### **Lazy Loading**

```typescript
// components/lazy-components.tsx
import dynamic from 'next/dynamic'

export const LazyGallery = dynamic(() => import('./sections/gallery'), {
  loading: () => <GallerySkeleton />,
  ssr: false, // Deshabilitar SSR para componentes pesados
})

export const LazyAdmin = dynamic(() => import('./admin/page'), {
  loading: () => <AdminSkeleton />,
  ssr: false,
})
```

## 🔍 **Error Handling**

### **Error Boundaries**

```typescript
// components/error-boundary.tsx
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    this.props.onError?.(error, errorInfo)

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToService(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}
```

### **API Error Handling**

```typescript
// lib/api-error.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error
  }

  if (error instanceof Error) {
    return new APIError(error.message, 500)
  }

  return new APIError('Error desconocido', 500)
}
```

---

## 📚 **Recursos Adicionales**

- **Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com)
- **Google Analytics**: [analytics.google.com](https://analytics.google.com)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**¿Necesitas ayuda con la API?** Revisa los logs de Firebase o contacta al equipo de desarrollo.
