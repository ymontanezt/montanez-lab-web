#!/bin/bash

# Script de deploy para Firebase Hosting
# Requiere: Firebase CLI instalado globalmente (npm install -g firebase-tools)

echo "🚀 Iniciando deploy a Firebase Hosting..."

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
rm -rf .next out

# Build estático
echo "🔨 Construyendo aplicación estática..."
bun run build

# Verificar que se creó la carpeta out
if [ ! -d "out" ]; then
    echo "❌ Error: No se creó la carpeta 'out'"
    exit 1
fi

echo "✅ Build completado exitosamente"

# Deploy a Firebase
echo "🚀 Desplegando a Firebase Hosting..."
firebase deploy --only hosting

echo "🎉 Deploy completado!"
echo "🌐 Tu sitio está disponible en: https://[TU-PROJECT-ID].web.app"
