# Deploy en Firebase Hosting

## Configuración

### 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

**Nota**: Requiere Node.js 20+ o superior.

### 2. Login en Firebase

```bash
firebase login
```

### 3. Inicializar proyecto (si es la primera vez)

```bash
firebase init hosting
```

## Deploy

### Opción 1: Script automatizado

```bash
./scripts/deploy-firebase.sh
```

### Opción 2: Comandos manuales

```bash
# Build estático
bun run build

# Deploy
firebase deploy --only hosting
```

## Configuración del proyecto

### Firebase.json

El archivo `firebase.json` ya está configurado para:

- Usar la carpeta `out` como directorio público
- Configurar rewrites para SPA
- Optimizar cache de archivos estáticos
- URLs limpias sin trailing slash

### Next.js

La aplicación está configurada con `output: 'export'` en `next.config.mjs` para generar archivos estáticos.

## Ventajas de Firebase Hosting

✅ **Simplicidad**: No hay problemas de SSR/SSG  
✅ **Integración**: Funciona perfectamente con Firebase Auth y Firestore  
✅ **Performance**: CDN global y optimizaciones automáticas  
✅ **SSL**: HTTPS automático  
✅ **Gratis**: Plan gratuito generoso

## Troubleshooting

### Error de Node.js

Si tienes Node.js < 20, actualiza o usa Docker:

```bash
docker run --rm -it -v $(pwd):/app -w /app node:20-alpine sh
npm install -g firebase-tools
firebase login
```

### Error de build

```bash
# Limpiar cache
rm -rf .next out
bun run build
```

### Error de deploy

```bash
# Verificar configuración
firebase projects:list
firebase use [PROJECT-ID]
```
