# 📋 Flujo de Trabajo Git - Montañez Lab

> **Guía completa del flujo de trabajo Git para el proyecto Montañez Lab**

## 🎯 **Resumen Ejecutivo**

Este proyecto utiliza un **flujo de trabajo Git simplificado** con **solo 2 entornos** (develop y production) y **restricciones estrictas de merge** para mantener la calidad del código.

## 🌿 **Estructura de Ramas**

### **Ramas Principales**

```
main (producción)
├── develop (desarrollo)
│   ├── feature/nueva-funcionalidad
│   ├── bugfix/correccion-error
│   └── hotfix/urgencia-produccion
└── release/v1.0.0
```

### **Descripción de Ramas**

| Rama        | Propósito                   | Merge Permitido             | Quién Puede Merge |
| ----------- | --------------------------- | --------------------------- | ----------------- |
| `main`      | **Producción**              | Solo desde `develop`        | **Solo Admin**    |
| `develop`   | **Desarrollo**              | Solo desde feature branches | **Solo Admin**    |
| `feature/*` | **Nuevas funcionalidades**  | Solo a `develop`            | **Solo Admin**    |
| `bugfix/*`  | **Corrección de bugs**      | Solo a `develop`            | **Solo Admin**    |
| `hotfix/*`  | **Urgencias de producción** | Solo a `main`               | **Solo Admin**    |

## 🚫 **Reglas Estrictas**

### **1. Solo Admin Puede Hacer Merge**

- ❌ **Ningún desarrollador** puede hacer merge directo
- ❌ **No hay push automático** a ninguna rama principal
- ✅ **Solo el usuario admin** puede aprobar y hacer merge
- ✅ **Todos los merges** requieren revisión previa

### **2. Restricciones de Push**

```bash
# ❌ PROHIBIDO - Push directo a ramas principales
git push origin main        # DENEGADO
git push origin develop     # DENEGADO

# ✅ PERMITIDO - Push solo a feature branches
git push origin feature/nueva-funcionalidad  # PERMITIDO
git push origin bugfix/correccion-error      # PERMITIDO
```

### **3. Flujo de Merge**

```
Feature Branch → Pull Request → develop → Pull Request → main
     ↓              ↓           ↓           ↓         ↓
   Desarrollo    Revisión    Testing    Revisión  Producción
```

## 🔄 **Flujo de Trabajo Completo**

### **Paso 1: Iniciar Nueva Funcionalidad**

```bash
# 1. Asegurar que develop esté actualizada
git checkout develop
git pull origin develop

# 2. Crear nueva rama feature
git checkout -b feature/nueva-funcionalidad

# 3. Verificar que estás en la rama correcta
git branch
# * feature/nueva-funcionalidad
#   develop
#   main
```

### **Paso 2: Desarrollo y Commits**

```bash
# 1. Hacer cambios en el código
# 2. Agregar archivos modificados
git add .

# 3. Hacer commit con mensaje descriptivo
git commit -m "feat: implementar sistema de notificaciones

- Agregar componente NotificationCenter
- Implementar hook useNotifications
- Integrar con Firebase Cloud Messaging
- Agregar tests unitarios"

# 4. Push a la rama feature (NO a develop)
git push origin feature/nueva-funcionalidad
```

### **Paso 3: Crear Pull Request**

1. **Ir a GitHub** → **Pull Requests** → **New Pull Request**
2. **Base branch:** `develop`
3. **Compare branch:** `feature/nueva-funcionalidad`
4. **Título:** `feat: implementar sistema de notificaciones`
5. **Descripción:** Detallar cambios y funcionalidad
6. **Assignees:** Asignar al admin
7. **Reviewers:** Solicitar revisión del admin

### **Paso 4: Revisión y Merge (Admin)**

#### **Revisión del Admin:**

- ✅ **Revisar código** en GitHub
- ✅ **Verificar tests** pasen
- ✅ **Comprobar build** exitoso
- ✅ **Revisar cambios** de archivos

#### **Merge a develop:**

```bash
# Solo el admin puede hacer esto
git checkout develop
git pull origin develop
git merge feature/nueva-funcionalidad
git push origin develop

# Eliminar rama feature (opcional)
git branch -d feature/nueva-funcionalidad
git push origin --delete feature/nueva-funcionalidad
```

### **Paso 5: Deploy a Producción (Admin)**

```bash
# 1. Crear Pull Request: develop → main
# 2. Revisar cambios acumulados
# 3. Aprobar y merge a main
# 4. Deploy automático a producción

# Solo el admin puede hacer merge a main
git checkout main
git pull origin main
git merge develop
git push origin main
```

## 📝 **Convenciones de Commits**

### **Formato Estándar**

```bash
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### **Tipos de Commit**

| Tipo       | Descripción             | Ejemplo                                            |
| ---------- | ----------------------- | -------------------------------------------------- |
| `feat`     | Nueva funcionalidad     | `feat: agregar sistema de citas`                   |
| `fix`      | Corrección de bug       | `fix: resolver error en formulario de contacto`    |
| `docs`     | Documentación           | `docs: actualizar README con nuevas instrucciones` |
| `style`    | Cambios de estilo       | `style: ajustar espaciado en componentes`          |
| `refactor` | Refactorización         | `refactor: simplificar lógica de autenticación`    |
| `test`     | Tests                   | `test: agregar tests para componente Hero`         |
| `chore`    | Tareas de mantenimiento | `chore: actualizar dependencias`                   |

### **Ejemplos de Commits**

```bash
# ✅ BUENOS EJEMPLOS
feat(auth): implementar autenticación con Google OAuth
fix(contact): resolver validación de email en formulario
docs(setup): agregar instrucciones de instalación
style(ui): mejorar responsive design en mobile
refactor(api): simplificar endpoints de citas
test(components): agregar tests para Gallery
chore(deps): actualizar Next.js a v14

# ❌ MALOS EJEMPLOS
update stuff
fixed bug
wip
quick fix
```

## 🔒 **Protección de Ramas**

### **Configuración de GitHub**

#### **Rama `main`:**

- ✅ **Require pull request reviews before merging**
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- ✅ **Restrict pushes that create files that are larger than 100 MB**
- ✅ **Restrict pushes that create files with specified file extensions**

#### **Rama `develop`:**

- ✅ **Require pull request reviews before merging**
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**

### **Status Checks Requeridos**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

## 🚨 **Manejo de Urgencias (Hotfix)**

### **Situaciones de Hotfix**

- 🔥 **Bug crítico en producción**
- 🔥 **Vulnerabilidad de seguridad**
- 🔥 **Error que afecta funcionalidad core**

### **Proceso de Hotfix**

```bash
# 1. Crear rama hotfix desde main
git checkout main
git pull origin main
git checkout -b hotfix/error-critico-produccion

# 2. Hacer cambios mínimos necesarios
# 3. Commit y push
git add .
git commit -m "fix: resolver error crítico en producción"
git push origin hotfix/error-critico-produccion

# 4. Crear Pull Request: hotfix → main
# 5. Admin revisa y merge
# 6. Deploy inmediato
# 7. Merge hotfix a develop
```

## 📊 **Métricas y Seguimiento**

### **Indicadores de Calidad**

- **Pull Requests abiertos:** < 5
- **Tiempo promedio de review:** < 24h
- **Tasa de merge:** > 90%
- **Builds fallidos:** < 5%

### **Herramientas de Seguimiento**

- **GitHub Insights:** Métricas del repositorio
- **Pull Request Templates:** Estandarización de PRs
- **Issue Templates:** Reportes estructurados
- **Automated Checks:** Validaciones automáticas

## 🛠️ **Comandos Útiles**

### **Gestión de Ramas**

```bash
# Ver todas las ramas
git branch -a

# Ver ramas remotas
git branch -r

# Ver ramas locales
git branch

# Eliminar rama local
git branch -d nombre-rama

# Eliminar rama remota
git push origin --delete nombre-rama
```

### **Sincronización**

```bash
# Actualizar develop
git checkout develop
git pull origin develop

# Actualizar feature branch
git checkout feature/nombre
git rebase develop

# Resolver conflictos si los hay
git add .
git rebase --continue
```

### **Limpieza**

```bash
# Limpiar ramas locales obsoletas
git remote prune origin

# Limpiar ramas locales mergeadas
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d

# Ver commits no pushados
git log origin/develop..HEAD
```

## ❓ **Preguntas Frecuentes**

### **Q: ¿Puedo hacer push directo a develop?**

**A: NO.** Solo el admin puede hacer merge a develop. Debes crear un Pull Request.

### **Q: ¿Qué pasa si mi feature branch se queda obsoleta?**

**A:** Usa `git rebase develop` para actualizar tu rama con los últimos cambios.

### **Q: ¿Puedo hacer merge de develop a main?**

**A: NO.** Solo el admin puede hacer merge a main. Solicita un deploy.

### **Q: ¿Cómo manejo conflictos de merge?**

**A:** Resuelve conflictos en tu feature branch antes de crear el Pull Request.

### **Q: ¿Qué hago si encuentro un bug crítico en producción?**

**A:** Crea una rama hotfix y solicita revisión inmediata del admin.

## 📞 **Soporte y Contacto**

### **Para Dudas sobre Git:**

- **Email:** montzavy@gmail.com
- **Admin Email:** mmontanezt@gmail.com

### **Recursos Adicionales:**

- **Git Documentation:** [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Guides:** [guides.github.com](https://guides.github.com)
- **Conventional Commits:** [conventionalcommits.org](https://conventionalcommits.org)

---

**📋 Esta documentación se actualiza regularmente. Última actualización: [Fecha]**
