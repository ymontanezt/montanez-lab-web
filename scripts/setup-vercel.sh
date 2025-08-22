#!/bin/bash

# Script para automatizar la configuración de Vercel
# Este script te guía paso a paso para configurar Vercel

echo "🚀 Configuración Automática de Vercel para Dental Lab"
echo "=================================================="
echo ""

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado."
    echo "💡 Instalando Vercel CLI..."
    export PATH="/Users/ymontanez/.bun/bin:$PATH"
    
    if ! command -v vercel &> /dev/null; then
        echo "❌ No se pudo instalar Vercel CLI. Por favor instálalo manualmente:"
        echo "   bun add -g vercel"
        echo "   export PATH=\"/Users/ymontanez/.bun/bin:\$PATH\""
        exit 1
    fi
fi

echo "✅ Vercel CLI está instalado"
echo ""

# Verificar si ya estás logueado
if vercel whoami &> /dev/null; then
    echo "✅ Ya estás logueado en Vercel"
    USER_EMAIL=$(vercel whoami)
    echo "   Usuario: $USER_EMAIL"
else
    echo "❌ No estás logueado en Vercel"
    echo ""
    echo "🔐 Por favor, haz login en Vercel:"
    echo "   1. Abre tu navegador"
    echo "   2. Ve a: https://vercel.com/login"
    echo "   3. Inicia sesión con tu cuenta"
    echo "   4. Regresa aquí y presiona Enter"
    read -p "   Presiona Enter cuando hayas hecho login..."
    
    # Verificar login
    if vercel whoami &> /dev/null; then
        echo "✅ Login exitoso!"
    else
        echo "❌ Login fallido. Por favor intenta de nuevo."
        exit 1
    fi
fi

echo ""
echo "🌐 Configurando proyecto en Vercel..."
echo ""

# Verificar si el proyecto ya existe
if vercel ls | grep -q "montanez-lab-web"; then
    echo "✅ Proyecto ya existe en Vercel"
    PROJECT_URL=$(vercel ls | grep "montanez-lab-web" | awk '{print $2}')
    echo "   URL: $PROJECT_URL"
else
    echo "📦 Creando nuevo proyecto en Vercel..."
    echo ""
    echo "🔧 Configuración del proyecto:"
    echo "   - Framework: Next.js"
    echo "   - Build Command: bun run build"
    echo "   - Install Command: bun install"
    echo "   - Output Directory: .next"
    echo ""
    
    # Crear proyecto
    vercel --yes
fi

echo ""
echo "🔐 Configurando variables de entorno..."
echo ""

# Configurar variables de entorno para staging
echo "📝 Configurando variables para STAGING..."
vercel env add NEXT_PUBLIC_SITE_URL preview "https://staging.gataviejis.com"
vercel env add NEXT_PUBLIC_DEBUG preview "true"
vercel env add NODE_ENV preview "staging"

# Configurar variables de entorno para producción
echo "📝 Configurando variables para PRODUCCIÓN..."
vercel env add NEXT_PUBLIC_SITE_URL production "https://gataviejis.com"
vercel env add NEXT_PUBLIC_DEBUG production "false"
vercel env add NODE_ENV production "production"

echo ""
echo "✅ Variables de entorno configuradas"
echo ""

# Mostrar resumen
echo "🎉 ¡Configuración de Vercel completada!"
echo ""
echo "📋 Resumen de lo configurado:"
echo "   ✅ Proyecto conectado a GitHub"
echo "   ✅ Variables de entorno para staging"
echo "   ✅ Variables de entorno para producción"
echo "   ✅ Build automático configurado"
echo ""
echo "🚀 Próximos pasos:"
echo "   1. Configurar dominio personalizado en Vercel Dashboard"
echo "   2. Hacer push a 'develop' para deploy automático a staging"
echo "   3. Hacer push a 'main' para deploy automático a producción"
echo ""
echo "🌐 URLs del proyecto:"
vercel ls | grep "montanez-lab-web"

echo ""
echo "💡 Para configurar dominios personalizados:"
echo "   Vercel Dashboard → Project → Settings → Domains → Add Domain"
echo ""
echo "🔗 URLs a configurar:"
echo "   - Producción: gataviejis.com"
echo "   - Staging: staging.gataviejis.com"
