# 🌍 Configuración de Entornos - Montañez Lab

Esta documentación explica cómo configurar y gestionar los diferentes entornos (desarrollo, staging, producción) para el proyecto Montañez Lab.

## 📋 Entornos Disponibles

### 1. **Development** (`development`)

- **URL**: `http://localhost:3000`
- **Debug**: `true`
- **Base de datos**: Local
- **Firebase**: Proyecto de desarrollo

### 2. **Staging** (`staging`)

- **URL**: `https://staging.montanez-website.web.app`
- **Debug**: `false`
- **Base de datos**: Staging
- **Firebase**: Proyecto de staging

### 3. **Production** (`production`)

- **URL**: `https://montanez-website.web.app`
- **Debug**: `false`
- **Base de datos**: Producción
- **Firebase**: Proyecto de producción

## 🔐 Configuración de GitHub Secrets

### Variables Requeridas para Staging:

```
STAGING_SITE_URL=https://staging.montanez-website.web.app
STAGING_FIREBASE_API_KEY=your_staging_firebase_api_key
STAGING_FIREBASE_AUTH_DOMAIN=staging-project.firebaseapp.com
STAGING_FIREBASE_PROJECT_ID=staging-project-id
STAGING_DATABASE_URL=postgresql://staging-server:5432/montanez_lab_staging
STAGING_JWT_SECRET=your_staging_jwt_secret
```

### Variables Requeridas para Producción:

```
PROD_SITE_URL=https://montanez-website.web.app
PROD_FIREBASE_API_KEY=your_prod_firebase_api_key
PROD_FIREBASE_AUTH_DOMAIN=prod-project.firebaseapp.com
PROD_FIREBASE_PROJECT_ID=prod-project-id
PROD_DATABASE_URL=postgresql://prod-server:5432/montanez_lab_prod
PROD_JWT_SECRET=your_prod_jwt_secret
```

## 🚀 Comandos de Deploy

### Desarrollo Local:

```bash
npm run dev
```

### Build para diferentes entornos:

```bash
# Desarrollo
npm run build:dev

# Staging
npm run build:staging

# Producción
npm run build:prod
```

### Iniciar servidor para diferentes entornos:

```bash
# Desarrollo
npm run start:dev

# Staging
npm run start:staging

# Producción
npm run start:prod
```

## 🔧 Configuración Automática

### 1. **Ejecutar script de configuración**:

```bash
npm run setup:github-secrets
```

### 2. **Validar configuración de entorno**:

```bash
npm run validate:env
```

## 📁 Estructura de Archivos

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de CI/CD
├── lib/
│   └── config/
│       └── environments.ts     # Configuración de entornos
├── scripts/
│   └── setup-github-secrets.sh # Script de configuración
├── doppler.yaml                # Configuración de Doppler (opcional)
└── .doppler/
    └── project.yaml           # Configuración del proyecto
```

## 🌐 Variables de Entorno por Defecto

### Development:

```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_FIREBASE_API_KEY=dev_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dev-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dev-project-id
DATABASE_URL=postgresql://localhost:5432/montanez_lab_dev
JWT_SECRET=dev_jwt_secret
```

### Staging:

```bash
NODE_ENV=staging
NEXT_PUBLIC_SITE_URL=https://staging.montanez-website.web.app
NEXT_PUBLIC_DEBUG=false
# Otras variables se toman de GitHub Secrets
```

### Production:

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://montanez-website.web.app
NEXT_PUBLIC_DEBUG=false
# Otras variables se toman de GitHub Secrets
```

## 🔄 Flujo de Deploy

### 1. **Push a `develop`**:

- ✅ Tests automáticos
- ✅ Build de staging
- 🚀 Deploy automático a staging

### 2. **Push a `main`**:

- ✅ Tests automáticos
- ✅ Build de producción
- 🚀 Deploy automático a producción

### 3. **Deploy Manual**:

- Ir a Actions en GitHub
- Seleccionar "Deploy Montañez Lab"
- Elegir ambiente (staging/production)
- Ejecutar workflow

## 🛠️ Troubleshooting

### Error: "Environment configuration is invalid"

```bash
# Verificar que las variables estén configuradas
npm run validate:env

# Verificar GitHub Secrets
# Settings → Secrets and variables → Actions
```

### Error: "Build failed"

```bash
# Limpiar cache
npm run clean

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Deploy failed"

```bash
# Verificar logs en GitHub Actions
# Verificar que los secrets estén configurados
# Verificar permisos de deploy
```

## 📚 Recursos Adicionales

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Secrets Best Practices](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 🤝 Soporte

Si tienes problemas con la configuración:

1. **Revisar logs** en GitHub Actions
2. **Verificar secrets** en GitHub
3. **Validar configuración** con `npm run validate:env`
4. **Crear issue** en el repositorio

---

**Última actualización**: $(date)
**Versión**: 1.0.0
