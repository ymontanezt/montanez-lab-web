# Sistema de Diseño - Gata viejis

Una guía completa del sistema de diseño unificado para garantizar consistencia visual y funcional en ambos temas (claro/oscuro).

## 🎨 **Tokens de Colores**

### **Estructura de Colores**

```typescript
// Importar tokens
import { colorTokens, utilityClasses } from '@/lib/design-system/color-tokens'
```

### **Colores de Fondo**

| Token                              | Light Mode    | Dark Mode     | Uso                     |
| ---------------------------------- | ------------- | ------------- | ----------------------- |
| `colorTokens.background.primary`   | `bg-white`    | `bg-gray-950` | Fondos principales      |
| `colorTokens.background.secondary` | `bg-gray-50`  | `bg-gray-900` | Fondos secundarios      |
| `colorTokens.background.tertiary`  | `bg-gray-100` | `bg-gray-800` | Fondos terciarios       |
| `colorTokens.background.muted`     | `bg-gray-200` | `bg-gray-700` | Fondos apagados         |
| `colorTokens.background.card`      | `bg-white`    | `bg-gray-900` | Tarjetas y contenedores |

### **Colores de Texto**

| Token                        | Light Mode         | Dark Mode          | Uso                |
| ---------------------------- | ------------------ | ------------------ | ------------------ |
| `colorTokens.text.primary`   | `text-gray-900`    | `text-white`       | Textos principales |
| `colorTokens.text.secondary` | `text-gray-700`    | `text-gray-300`    | Textos secundarios |
| `colorTokens.text.tertiary`  | `text-gray-600`    | `text-gray-400`    | Textos terciarios  |
| `colorTokens.text.muted`     | `text-gray-500`    | `text-gray-500`    | Textos apagados    |
| `colorTokens.text.accent`    | `text-primary-600` | `text-primary-400` | Textos de acento   |

### **Colores de Bordes**

| Token                          | Light Mode           | Dark Mode            | Uso                |
| ------------------------------ | -------------------- | -------------------- | ------------------ |
| `colorTokens.border.primary`   | `border-gray-200`    | `border-gray-700`    | Bordes principales |
| `colorTokens.border.secondary` | `border-gray-300`    | `border-gray-600`    | Bordes secundarios |
| `colorTokens.border.focus`     | `border-primary-500` | `border-primary-400` | Estados de focus   |

## 🎯 **Estados Interactivos**

### **Hover States**

```typescript
// Ejemplo de uso
<div className={`${colorTokens.text.secondary} ${colorTokens.hover.text.primary}`}>
  Texto que cambia en hover
</div>
```

| Token                              | Light Mode               | Dark Mode                |
| ---------------------------------- | ------------------------ | ------------------------ |
| `colorTokens.hover.text.primary`   | `hover:text-gray-900`    | `hover:text-white`       |
| `colorTokens.hover.text.secondary` | `hover:text-gray-700`    | `hover:text-gray-300`    |
| `colorTokens.hover.text.accent`    | `hover:text-primary-700` | `hover:text-primary-300` |

### **Focus States**

```typescript
// Ejemplo de uso
<input className={`${utilityClasses.input.base}`} />
```

| Token                              | Descripción                                                             |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `colorTokens.focus.ring.primary`   | `focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/30` |
| `colorTokens.focus.border.primary` | `focus:border-primary-500 dark:focus:border-primary-400`                |

## 🧩 **Clases Utilitarias**

### **Contenedores**

```typescript
// Tarjeta estándar
<div className={utilityClasses.container.card}>
  Contenido de la tarjeta
</div>

// Contenedor principal
<div className={utilityClasses.container.primary}>
  Contenido principal
</div>
```

### **Botones**

```typescript
// Botón primario
<button className={utilityClasses.button.primary}>
  Botón Principal
</button>

// Botón secundario
<button className={utilityClasses.button.secondary}>
  Botón Secundario
</button>

// Botón de acento
<button className={utilityClasses.button.accent}>
  Botón de Acento
</button>

// Botón fantasma
<button className={utilityClasses.button.ghost}>
  Botón Fantasma
</button>
```

### **Inputs**

```typescript
// Input base
<input className={utilityClasses.input.base} />

// Input con error
<input className={utilityClasses.input.error} />

// Input con éxito
<input className={utilityClasses.input.success} />
```

### **Enlaces**

```typescript
// Enlace primario
<a className={utilityClasses.link.primary}>Enlace</a>

// Enlace secundario
<a className={utilityClasses.link.secondary}>Enlace</a>

// Enlace inverso (para fondos oscuros)
<a className={utilityClasses.link.inverse}>Enlace</a>
```

### **Navegación**

```typescript
// Item de navegación
<a className={utilityClasses.navigation.item}>Home</a>

// Item activo
<a className={utilityClasses.navigation.active}>Activo</a>

// Navegación móvil
<a className={utilityClasses.navigation.mobile}>Item Móvil</a>
```

## 🎭 **Sistema de Animaciones**

### **Importar Animaciones**

```typescript
import {
  commonAnimations,
  enterVariants,
  hoverVariants,
  transitions,
} from '@/lib/design-system/animations'
```

### **Animaciones de Entrada**

```typescript
// Card con animación de entrada
<motion.div
  {...commonAnimations.cardEntry}
>
  Contenido de la tarjeta
</motion.div>

// Texto con animación
<motion.h1
  {...commonAnimations.textEntry}
>
  Título animado
</motion.h1>

// Imagen con animación
<motion.img
  {...commonAnimations.imageEntry}
  src="imagen.jpg"
/>
```

### **Animaciones de Hover**

```typescript
// Botón con hover
<motion.button
  {...commonAnimations.buttonHover}
>
  Botón Interactivo
</motion.button>

// Card con elevación
<motion.div
  {...hoverVariants.lift}
>
  Card que se eleva
</motion.div>
```

### **Animaciones de Lista**

```typescript
// Lista con stagger
<motion.div
  variants={commonAnimations.listStagger.container}
  initial="initial"
  animate="animate"
>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      variants={commonAnimations.listStagger.item}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 🔧 **Variantes de Componentes**

### **Botones Especializados**

```typescript
import {
  GradientButton,
  FloatingButton,
  AnimatedButton,
  LoadingButton,
  SocialButton
} from '@/components/ui/button-variants'

// Botón con gradiente
<GradientButton gradient="primary">
  Botón Gradiente
</GradientButton>

// Botón flotante
<FloatingButton position="bottom-right">
  <PlusIcon />
</FloatingButton>

// Botón animado
<AnimatedButton animation="bounce">
  Botón Animado
</AnimatedButton>

// Botón con loading
<LoadingButton isLoading={loading} loadingText="Guardando...">
  Guardar
</LoadingButton>

// Botón social
<SocialButton platform="whatsapp">
  Contactar por WhatsApp
</SocialButton>
```

## 📱 **Responsive Design**

### **Breakpoints Estándar**

| Breakpoint | Valor    | Uso               |
| ---------- | -------- | ----------------- |
| `sm`       | `640px`  | Móviles grandes   |
| `md`       | `768px`  | Tablets           |
| `lg`       | `1024px` | Laptops           |
| `xl`       | `1280px` | Escritorio        |
| `2xl`      | `1536px` | Pantallas grandes |

### **Patrones Responsive**

```typescript
// Texto responsive
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Título Responsive
</h1>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Contenido */}
</div>

// Espaciado responsive
<section className="py-8 md:py-16 lg:py-24">
  {/* Contenido */}
</section>
```

## ♿ **Accesibilidad**

### **Contraste**

- Todos los tokens garantizan contraste WCAG AA (4.5:1 mínimo)
- Los estados de hover mantienen contraste adecuado
- Los focus states son claramente visibles

### **Navegación por Teclado**

```typescript
// Focus ring estándar
<button className={`${utilityClasses.button.primary} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}>
  Botón Accesible
</button>
```

### **Screen Readers**

```typescript
// Contenido para screen readers
<span className="sr-only">
  Texto solo para lectores de pantalla
</span>

// Labels descriptivos
<button aria-label="Cerrar modal">
  <XIcon />
</button>
```

## 🏗️ **Patrones de Uso**

### **Componente de Sección**

```typescript
function MySection() {
  return (
    <section className={`py-16 md:py-20 ${colorTokens.background.secondary}`}>
      <div className="container mx-auto px-4">
        <motion.div
          {...commonAnimations.textEntry}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${colorTokens.text.primary}`}>
            Título de la Sección
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${colorTokens.text.secondary}`}>
            Descripción de la sección
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

### **Card Estándar**

```typescript
function StandardCard({ title, content }) {
  return (
    <motion.div
      {...commonAnimations.cardEntry}
      className={`p-6 rounded-xl transition-shadow ${utilityClasses.container.card} hover:shadow-lg`}
    >
      <h3 className={`text-xl font-semibold mb-3 ${colorTokens.text.primary}`}>
        {title}
      </h3>
      <p className={colorTokens.text.secondary}>
        {content}
      </p>
    </motion.div>
  )
}
```

### **Formulario Estándar**

```typescript
function StandardForm() {
  return (
    <form className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${colorTokens.text.secondary}`}>
          Campo de Texto
        </label>
        <input
          type="text"
          className={utilityClasses.input.base}
          placeholder="Placeholder"
        />
      </div>

      <button
        type="submit"
        className={utilityClasses.button.accent}
      >
        Enviar
      </button>
    </form>
  )
}
```

## 🚀 **Mejores Prácticas**

### **1. Consistencia**

- Siempre usar tokens en lugar de valores hardcoded
- Mantener patrones de naming consistentes
- Usar las clases utilitarias predefinidas

### **2. Performance**

- Usar lazy loading para componentes pesados
- Implementar animaciones suaves que no afecten performance
- Optimizar imágenes y assets

### **3. Mantenibilidad**

- Documentar componentes personalizados
- Usar TypeScript para type safety
- Mantener componentes pequeños y enfocados

### **4. Accesibilidad**

- Siempre incluir labels descriptivos
- Mantener orden de tabulación lógico
- Probar con lectores de pantalla

## 🔄 **Actualizaciones del Sistema**

Para actualizar colores o tokens:

1. Modificar `lib/design-system/color-tokens.ts`
2. Los cambios se aplicarán automáticamente a todos los componentes
3. Probar en ambos temas (claro/oscuro)
4. Verificar contraste y accesibilidad

Para nuevas animaciones:

1. Agregar a `lib/design-system/animations.ts`
2. Documentar en esta guía
3. Crear ejemplos de uso

---

_Esta documentación se actualiza automáticamente con cada cambio al sistema de diseño._
