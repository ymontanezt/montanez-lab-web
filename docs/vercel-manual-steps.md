# 🚀 Pasos Manuales para Completar Vercel - Montañez Lab

Esta guía contiene **exactamente** los pasos que necesitas hacer manualmente para completar la configuración de Vercel.

## ✅ **Lo que YA está configurado automáticamente:**

- ✅ **GitHub Secrets** - Todas las variables configuradas
- ✅ **Workflows de CI/CD** - Automatización completa
- ✅ **Configuración de código** - Archivos listos
- ✅ **Script de configuración** - `scripts/setup-vercel.sh`

## 🔐 **PASO 1: Login en Vercel (REQUERIDO - Manual)**

### **Opción A: Desde el Navegador (Recomendado)**

1. **Abrir navegador** y ir a: https://vercel.com/login
2. **Hacer clic en "Continue with GitHub"**
3. **Autorizar** Vercel para acceder a tu cuenta de GitHub
4. **Completar** el proceso de login

### **Opción B: Desde CLI (Si funciona)**

```bash
# Agregar Vercel al PATH
export PATH="/Users/ymontanez/.bun/bin:$PATH"

# Hacer login
vercel login
```

## 🌐 **PASO 2: Conectar Proyecto a Vercel (REQUERIDO - Manual)**

### **Desde Vercel Dashboard:**

1. **Ir a**: https://vercel.com/dashboard
2. **Hacer clic en "New Project"**
3. **Importar desde GitHub**: `ymontanezt/montanez-lab-web`
4. **Configurar proyecto**:
   - **Framework Preset**: `Next.js` ✅
   - **Root Directory**: `/` ✅
   - **Build Command**: `bun run build` ✅
   - **Install Command**: `bun install` ✅
   - **Output Directory**: `.next` ✅
5. **Hacer clic en "Deploy"**

### **Desde CLI (Alternativo):**

```bash
# Ejecutar script de configuración
./scripts/setup-vercel.sh
```

## 🔐 **PASO 3: Configurar Variables de Entorno en Vercel (REQUERIDO - Manual)**

### **Desde Vercel Dashboard:**

1. **Ir al proyecto** recién creado
2. **Settings** → **Environment Variables**
3. **Agregar variables** para cada entorno:

#### **Para Staging (Preview):**

| Variable               | Value                                      | Environment |
| ---------------------- | ------------------------------------------ | ----------- |
| `NEXT_PUBLIC_SITE_URL` | `https://staging.montanez-website.web.app` | Preview     |
| `NEXT_PUBLIC_DEBUG`    | `true`                                     | Preview     |
| `NODE_ENV`             | `staging`                                  | Preview     |

#### **Para Producción (Production):**

| Variable               | Value                              | Environment |
| ---------------------- | ---------------------------------- | ----------- |
| `NEXT_PUBLIC_SITE_URL` | `https://montanez-website.web.app` | Production  |
| `NEXT_PUBLIC_DEBUG`    | `false`                            | Production  |
| `NODE_ENV`             | `production`                       | Production  |

## 🌍 **PASO 4: Configurar Dominios Personalizados (REQUERIDO - Manual)**

### **Configurar Dominio Principal:**

1. **Vercel Dashboard** → **Project** → **Settings** → **Domains**
2. **Add Domain** → `montanez-website.web.app`
3. **Configurar DNS** según las instrucciones de Vercel:

#### **Registros DNS a configurar:**

```
# Registrar A
montanez-website.web.app → 76.76.19.34

# Registrar CNAME
www.montanez-website.web.app → cname.vercel-dns.com

# Subdominio staging
staging.montanez-website.web.app → cname.vercel-dns.com
```

### **Nota sobre DNS:**

- **Necesitas acceso** a tu proveedor de DNS (donde compraste el dominio)
- **Los cambios pueden tardar** hasta 24 horas en propagarse
- **Vercel te dará** las instrucciones exactas para tu proveedor

## 🚀 **PASO 5: Probar Despliegue Automático (OPCIONAL - Automático)**

### **Después de configurar Vercel:**

1. **Hacer push a `develop`**:

   ```bash
   git push origin develop
   ```

   - ✅ Deploy automático a **Staging**
   - ✅ URL: `https://staging.montanez-website.web.app`

2. **Hacer push a `main`**:

   ```bash
   git push origin main
   ```

   - ✅ Deploy automático a **Producción**
   - ✅ URL: `https://montanez-website.web.app`

## 🔍 **Verificar que Todo Funcione:**

### **1. Verificar Deploy en Vercel:**

- **Dashboard** → **Project** → **Deployments**
- **Ver logs** de cada deploy
- **Verificar** que no haya errores

### **2. Verificar URLs:**

- **Staging**: `https://staging.montanez-website.web.app`
- **Producción**: `https://montanez-website.web.app`

### **3. Verificar Funcionalidades:**

- ✅ Página principal carga
- ✅ Firebase funciona
- ✅ Formularios funcionan
- ✅ WhatsApp funciona

## 🚨 **Problemas Comunes y Soluciones:**

### **Error: "Build Failed"**

1. **Verificar** variables de entorno en Vercel
2. **Verificar** que el build funcione localmente: `bun run build`
3. **Revisar logs** en Vercel Dashboard

### **Error: "Domain Not Working"**

1. **Verificar** configuración DNS
2. **Esperar** propagación DNS (hasta 24 horas)
3. **Verificar** certificado SSL en Vercel

### **Error: "Environment Variables Missing"**

1. **Verificar** que las variables estén en Vercel
2. **Verificar** que el entorno sea correcto (Production/Preview)
3. **Rehacer deploy** después de configurar variables

## 📱 **URLs de Acceso Rápido:**

### **Vercel:**

- **Dashboard**: https://vercel.com/dashboard
- **Login**: https://vercel.com/login

### **GitHub:**

- **Repositorio**: https://github.com/ymontanezt/montanez-lab-web
- **Secrets**: https://github.com/ymontanezt/montanez-lab-web/settings/secrets/actions

### **Documentación:**

- **Vercel Docs**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/functions/serverless-functions/runtimes/nodejs

## ✅ **Checklist de Configuración:**

- [ ] **Login en Vercel** (https://vercel.com/login)
- [ ] **Conectar proyecto** desde GitHub
- [ ] **Configurar variables** de entorno en Vercel
- [ ] **Configurar dominio** personalizado
- [ ] **Probar deploy** automático (push a develop)
- [ ] **Verificar funcionalidades** en staging
- [ ] **Probar deploy** a producción (push a main)

## 💡 **Consejos Importantes:**

1. **NO subas archivos `.env`** al repositorio
2. **SIEMPRE usa Vercel Dashboard** para variables de entorno
3. **Configura DNS ANTES** de hacer el primer deploy
4. **Prueba en staging PRIMERO** antes de ir a producción
5. **Mantén las ramas** `develop` y `main` sincronizadas

---

**🎯 Objetivo**: Tener tu web funcionando en `https://montanez-website.web.app` con deploy automático.

**⏱️ Tiempo estimado**: 15-30 minutos (dependiendo de la configuración de DNS).

**Última actualización**: $(date)
**Versión**: 1.0.0
