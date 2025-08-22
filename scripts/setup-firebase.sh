#!/bin/bash

# Script para configurar Firebase en el proyecto
# Configuración automática de Firebase CLI y emuladores

echo "🚀 Configurando Firebase para Montanez Lab Web..."

# Verificar si Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "📦 Instalando Firebase CLI..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI ya está instalado"
fi

# Verificar si el usuario está logueado en Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Iniciando sesión en Firebase..."
    firebase login
else
    echo "✅ Usuario ya está logueado en Firebase"
fi

# Verificar si el proyecto está configurado
if [ ! -f ".firebaserc" ]; then
    echo "🏗️  Configurando proyecto Firebase..."
    echo "Por favor, selecciona tu proyecto de Firebase:"
    firebase projects:list
    
    read -p "Ingresa el ID de tu proyecto Firebase: " PROJECT_ID
    
    if [ ! -z "$PROJECT_ID" ]; then
        firebase use $PROJECT_ID
        echo "✅ Proyecto configurado: $PROJECT_ID"
    else
        echo "❌ No se ingresó un ID de proyecto válido"
        exit 1
    fi
else
    echo "✅ Proyecto Firebase ya está configurado"
fi

# Instalar dependencias de Firebase
echo "📦 Instalando dependencias de Firebase..."
npm install firebase

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
    echo "📝 Creando archivo .env.local..."
    cp env.local.example .env.local
    echo "✅ Archivo .env.local creado"
    echo "⚠️  IMPORTANTE: Configura las variables de Firebase en .env.local"
else
    echo "✅ Archivo .env.local ya existe"
fi

# Verificar configuración de emuladores
echo "🔧 Verificando configuración de emuladores..."
if [ -f "firebase.json" ]; then
    echo "✅ firebase.json configurado"
else
    echo "❌ firebase.json no encontrado"
fi

if [ -f "firestore.rules" ]; then
    echo "✅ firestore.rules configurado"
else
    echo "❌ firestore.rules no encontrado"
fi

if [ -f "storage.rules" ]; then
    echo "✅ storage.rules configurado"
else
    echo "❌ storage.rules no encontrado"
fi

if [ -f "firestore.indexes.json" ]; then
    echo "✅ firestore.indexes.json configurado"
else
    echo "❌ firestore.indexes.json no encontrado"
fi

echo ""
echo "🎉 Configuración de Firebase completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de Firebase en .env.local"
echo "2. Ejecuta: firebase emulators:start"
echo "3. Ejecuta: bun run dev"
echo ""
echo "🔗 Recursos útiles:"
echo "- Firebase Console: https://console.firebase.google.com/"
echo "- Firebase Docs: https://firebase.google.com/docs"
echo "- Emuladores: http://localhost:4000"
