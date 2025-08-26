# 🔐 Configuración de Entornos desde GitHub - Montañez Lab

Esta guía explica **exactamente** dónde y cómo configurar las variables de entorno para **staging** y **producción** directamente desde GitHub.

## 🎯 **Dónde Configurar Variables de Entorno**

### **📍 Ubicación en GitHub:**

```
https://github.com/ymontanezt/montanez-lab-web/settings/secrets/actions
```

### **📋 Pasos para Acceder:**

1. **Ir a tu repositorio**: `ymontanez-lab-web`
2. **Hacer clic en "Settings"** (pestaña)
3. **Hacer clic en "Secrets and variables"** (menú izquierdo)
4. **Hacer clic en "Actions"** (submenú)
5. **Hacer clic en "New repository secret"**

## 🔐 **Variables Requeridas para STAGING**

### **Configurar estas variables para staging:**

| **Variable**                   | **Valor**                                               | **Descripción**                      |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------ |
| `STAGING_SITE_URL`             | `https://staging.montanez-website.web.app`              | URL del entorno de staging           |
| `STAGING_FIREBASE_API_KEY`     | `AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8`               | API Key de Firebase para staging     |
| `STAGING_FIREBASE_AUTH_DOMAIN` | `montanez-website.firebaseapp.com`                      | Dominio de autenticación de Firebase |
| `STAGING_FIREBASE_PROJECT_ID`  | `montanez-website`                                      | ID del proyecto de Firebase          |
| `STAGING_DATABASE_URL`         | `postgresql://staging-server:5432/montanez_lab_staging` | URL de base de datos de staging      |
| `STAGING_JWT_SECRET`           | `staging_jwt_secret_2024`                               | Secret JWT para staging              |

### **Cómo Configurar:**

1. **Hacer clic en "New repository secret"**
2. **Name**: `STAGING_SITE_URL`
3. **Value**: `https://staging.montanez-website.web.app`
4. **Hacer clic en "Add secret"**
5. **Repetir** para cada variable

## 🔐 **Variables Requeridas para PRODUCCIÓN**

### **Configurar estas variables para producción:**

| **Variable**                | **Valor**                                         | **Descripción**                      |
| --------------------------- | ------------------------------------------------- | ------------------------------------ |
| `PROD_SITE_URL`             | `https://montanez-website.web.app`                | URL del entorno de producción        |
| `PROD_FIREBASE_API_KEY`     | `AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8`         | API Key de Firebase para producción  |
| `PROD_FIREBASE_AUTH_DOMAIN` | `montanez-website.firebaseapp.com`                | Dominio de autenticación de Firebase |
| `PROD_FIREBASE_PROJECT_ID`  | `montanez-website`                                | ID del proyecto de Firebase          |
| `PROD_DATABASE_URL`         | `postgresql://prod-server:5432/montanez_lab_prod` | URL de base de datos de producción   |
| `PROD_JWT_SECRET`           | `prod_jwt_secret_2024`                            | Secret JWT para producción           |

## 🚀 **Configuración Automática con GitHub CLI**

### **Si prefieres usar comandos:**

```bash
# Configurar variables de staging
gh secret set STAGING_SITE_URL --body "https://staging.montanez-website.web.app"
gh secret set STAGING_FIREBASE_API_KEY --body "AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8"
gh secret set STAGING_FIREBASE_AUTH_DOMAIN --body "montanez-website.firebaseapp.com"
gh secret set STAGING_FIREBASE_PROJECT_ID --body "montanez-website"
gh secret set STAGING_DATABASE_URL --body "postgresql://staging-server:5432/montanez_lab_staging"
gh secret set STAGING_JWT_SECRET --body "staging_jwt_secret_2024"

# Configurar variables de producción
gh secret set PROD_SITE_URL --body "https://montanez-website.web.app"
gh secret set PROD_FIREBASE_API_KEY --body "AIzaSyCxK9AygHIEIujQiyO5y_sSlflhaKqGbH8"
gh secret set PROD_FIREBASE_AUTH_DOMAIN --body "montanez-website.firebaseapp.com"
gh secret set PROD_FIREBASE_PROJECT_ID --body "montanez-website"
gh secret set PROD_DATABASE_URL --body "postgresql://prod-server:5432/montanez_lab_prod"
gh secret set PROD_JWT_SECRET --body "prod_jwt_secret_2024"
```

## 🔍 **Verificar Variables Configuradas**

### **Desde GitHub:**

1. **Settings** → **Secrets and variables** → **Actions**
2. **Ver lista** de todas las variables configuradas

### **Desde CLI:**

```bash
# Listar todos los secrets
gh secret list

# Ver valor de un secret específico (no se puede ver el valor, solo si existe)
gh secret list | grep STAGING
```

## 🎯 **Cuándo se Usan Estas Variables**

### **Variables de Staging:**

- **Se usan cuando**: Push a rama `develop`
- **Workflow**: `deploy-staging`
- **Entorno**: Staging/Preview

### **Variables de Producción:**

- **Se usan cuando**: Push a rama `main`
- **Workflow**: `deploy-production`
- **Entorno**: Production

## 🚨 **Variables Críticas - NO DEJAR VACÍAS**

### **⚠️ IMPORTANTE:**

- **NUNCA** subas archivos `.env` al repositorio
- **SIEMPRE** usa GitHub Secrets para variables sensibles
- **VERIFICA** que todas las variables estén configuradas antes del deploy

### **🔒 Variables Sensibles:**

- ✅ **NEXT*PUBLIC*\*** → Se pueden ver en el cliente
- ❌ **FIREBASE\_\*** → Solo en servidor (pero las usamos como NEXT_PUBLIC para el cliente)
- ❌ **JWT_SECRET** → Solo en servidor
- ❌ **DATABASE_URL** → Solo en servidor

## 🔄 **Flujo de Configuración Completo**

### **1. Configurar Secrets en GitHub:**

```
GitHub → Settings → Secrets → Actions → New repository secret
```

### **2. Configurar Vercel:**

```
Vercel Dashboard → Project → Settings → Environment Variables
```

### **3. Conectar Dominios:**

```
Vercel → Settings → Domains → Add Domain
```

### **4. Probar Despliegue:**

```
Push a develop → Staging automático
Push a main → Producción automático
```

## 🛠️ **Troubleshooting**

### **Error: "Secret not found"**

1. **Verificar** que el secret esté configurado en GitHub
2. **Verificar** que el nombre sea exacto (mayúsculas/minúsculas)
3. **Verificar** que esté en la sección correcta (Actions)

### **Error: "Environment variable missing"**

1. **Verificar** que la variable esté configurada en Vercel
2. **Verificar** que el entorno sea correcto (Production/Preview)
3. **Verificar** que el nombre coincida exactamente

### **Error: "Build failed"**

1. **Verificar** logs en GitHub Actions
2. **Verificar** que todas las variables estén configuradas
3. **Verificar** que el build funcione localmente

## 📱 **Acceso Rápido a GitHub Secrets**

### **URL Directa:**

```
https://github.com/ymontanezt/montanez-lab-web/settings/secrets/actions
```

### **Desde el Repositorio:**

1. **Repositorio** → **Settings** (pestaña)
2. **Secrets and variables** → **Actions**
3. **New repository secret**

## ✅ **Checklist de Configuración**

### **Staging (develop):**

- [ ] `STAGING_SITE_URL`
- [ ] `STAGING_FIREBASE_API_KEY`
- [ ] `STAGING_FIREBASE_AUTH_DOMAIN`
- [ ] `STAGING_FIREBASE_PROJECT_ID`
- [ ] `STAGING_DATABASE_URL`
- [ ] `STAGING_JWT_SECRET`

### **Producción (main):**

- [ ] `PROD_SITE_URL`
- [ ] `PROD_FIREBASE_API_KEY`
- [ ] `PROD_FIREBASE_AUTH_DOMAIN`
- [ ] `PROD_FIREBASE_PROJECT_ID`
- [ ] `PROD_DATABASE_URL`
- [ ] `PROD_JWT_SECRET`

---

**💡 TIP**: Después de configurar todas las variables, haz un push a `develop` para probar el deploy automático a staging.

**Última actualización**: $(date)
**Versión**: 1.0.0
