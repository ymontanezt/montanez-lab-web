# 🚀 Guía Rápida de Deploy - Montañez Lab

> **Deploy automatizado en un solo comando**

## ⚡ **Deploy Rápido**

### **🚀 Deploy Completo (Recomendado)**

```bash
# Deploy completo: limpiar + build + deploy
bun run deploy
# o
npm run deploy
```

### **🔧 Opciones de Deploy**

```bash
# Solo limpiar cache
bun run deploy:clean

# Solo hacer build (sin deploy)
bun run deploy:build

# Solo hacer deploy (asume build existente)
bun run deploy:only
```

## 📋 **Requisitos Previos**

### **✅ Dependencias Necesarias**

- **Node.js** 18.0.0+
- **Bun** 1.0.0+ (recomendado) o **npm**
- **Firebase CLI** instalado y configurado
- **Git** para control de versiones

### **🔐 Configuración Firebase**

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login a Firebase
firebase login

# Configurar proyecto
firebase use montanez-website
```

## 🎯 **Flujo de Deploy**

### **📊 Proceso Automatizado**

1. **🧹 Limpieza**: Elimina cache y archivos temporales
2. **📦 Instalación**: Instala dependencias actualizadas
3. **🔨 Build**: Compila el proyecto para producción
4. **✅ Verificación**: Valida archivos de build
5. **🚀 Deploy**: Sube a Firebase Hosting
6. **📊 Resumen**: Muestra estadísticas del proceso

### **⏱️ Tiempo Estimado**

- **🔄 Deploy completo**: 3-5 minutos
- **🔨 Solo build**: 1-2 minutos
- **🚀 Solo deploy**: 30 segundos - 1 minuto

## 🛠️ **Scripts Disponibles**

### **📁 Ubicación de Scripts**

```
scripts/
└── deploy-firebase.sh    # Script principal de deploy
```

### **🔧 Funcionalidades del Script**

- **🎨 Colores en terminal** para mejor legibilidad
- **✅ Verificación de dependencias** antes de ejecutar
- **🚨 Manejo de errores** con salida limpia
- **📊 Estadísticas** del proceso de deploy
- **🔄 Opciones flexibles** para diferentes necesidades

## 📱 **Uso en Diferentes Entornos**

### **💻 Desarrollo Local**

```bash
# Desde el directorio del proyecto
./scripts/deploy-firebase.sh

# Con npm/bun
bun run deploy
```

### **🖥️ Servidor CI/CD**

```bash
# En scripts de CI/CD
chmod +x scripts/deploy-firebase.sh
./scripts/deploy-firebase.sh --force
```

### **📱 Dispositivos Móviles**

```bash
# Usando terminal móvil
ssh usuario@servidor
cd /ruta/al/proyecto
./scripts/deploy-firebase.sh
```

## 🔍 **Troubleshooting**

### **🚨 Errores Comunes**

#### **❌ Firebase no inicializado**

```bash
# Solución: Verificar configuración
firebase projects:list
firebase use montanez-website
```

#### **❌ Permisos de script**

```bash
# Solución: Hacer ejecutable
chmod +x scripts/deploy-firebase.sh
```

#### **❌ Dependencias faltantes**

```bash
# Solución: Instalar manualmente
bun install
# o
npm install
```

#### **❌ Error de build**

```bash
# Solución: Limpiar y reintentar
bun run clean
bun run deploy
```

### **🔧 Comandos de Debug**

```bash
# Ver logs detallados
./scripts/deploy-firebase.sh --help

# Solo verificar dependencias
./scripts/deploy-firebase.sh --clean

# Ver estado de Firebase
firebase hosting:channel:list
```

## 📊 **Monitoreo del Deploy**

### **🌐 URLs de Verificación**

- **🌍 Sitio Principal**: https://montanez-website.web.app
- **👨‍💼 Panel Admin**: https://montanez-website.web.app/admin
- **📊 Firebase Console**: https://console.firebase.google.com/project/montanez-website

### **📈 Métricas de Deploy**

- **⏱️ Tiempo total** del proceso
- **📁 Archivos procesados** y tamaño
- **✅ Estado** de cada paso
- **🚨 Errores** si los hay

## 🎯 **Mejores Prácticas**

### **📋 Antes del Deploy**

1. **✅ Commit** todos los cambios
2. **🧪 Test** en desarrollo local
3. **📱 Verificar** responsive design
4. **🔍 Revisar** console por errores

### **🚀 Durante el Deploy**

1. **⏳ No interrumpir** el proceso
2. **📊 Monitorear** logs en tiempo real
3. **✅ Verificar** cada paso exitoso
4. **🚨 Atender** errores si aparecen

### **🎉 Después del Deploy**

1. **🌐 Verificar** sitio en producción
2. **📱 Probar** en diferentes dispositivos
3. **🔍 Revisar** funcionalidades críticas
4. **📊 Monitorear** performance

## 🔄 **Rollback (En Caso de Emergencia)**

### **🚨 Rollback Rápido**

```bash
# Listar versiones disponibles
firebase hosting:releases:list

# Rollback a versión anterior
firebase hosting:releases:rollback [VERSION_ID]
```

### **📋 Proceso de Rollback**

1. **🚨 Identificar** problema en producción
2. **📊 Listar** versiones disponibles
3. **🔄 Seleccionar** versión estable anterior
4. **✅ Ejecutar** rollback
5. **🌐 Verificar** sitio restaurado

## 📚 **Recursos Adicionales**

### **📖 Documentación**

- **[📚 Manual de Usuario](./user-manual.md)**: Guía completa del panel admin
- **[🔧 Guía de Desarrollador](./developer-guide.md)**: Documentación técnica
- **[🔥 Firebase Setup](./firebase-setup.md)**: Configuración de Firebase

### **🔗 Enlaces Útiles**

- **Firebase Console**: https://console.firebase.google.com
- **Firebase CLI Docs**: https://firebase.google.com/docs/cli
- **Next.js Deploy**: https://nextjs.org/docs/deployment

---

## 🎉 **¡Deploy Exitoso!**

Con estos scripts automatizados, el deploy de Montañez Lab es **simple, rápido y confiable**.

### **🚀 Comandos Principales**

```bash
# Deploy completo (recomendado)
bun run deploy

# Solo limpiar
bun run deploy:clean

# Solo build
bun run deploy:build

# Solo deploy
bun run deploy:only
```

---

**🔄 Última actualización:** Diciembre 2024  
**📚 Versión:** 2.0  
**👥 Equipo:** Montañez Lab Web Team  
**📧 Soporte:** montzavy@gmail.com
