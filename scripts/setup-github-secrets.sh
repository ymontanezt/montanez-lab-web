#!/bin/bash

# Script para configurar GitHub Secrets automáticamente
# Requiere: gh CLI instalado y autenticado

echo "🔐 Configurando GitHub Secrets para Dental Lab..."

# Verificar si gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI no está instalado. Instalando..."
    brew install gh
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo "❌ No estás autenticado con GitHub. Autenticando..."
    gh auth login
fi

# Obtener el nombre del repositorio actual
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
echo "📦 Repositorio: $REPO"

# Array de secrets para desarrollo
DEV_SECRETS=(
    "NODE_ENV=development"
    "NEXT_PUBLIC_SITE_URL=http://localhost:3000"
    "NEXT_PUBLIC_DEBUG=true"
    "NEXT_PUBLIC_SITE_NAME=Montañez Lab Dental Lab"
    "NEXT_PUBLIC_SITE_DESCRIPTION=Laboratorio Dental de Excelencia"
    "NEXT_PUBLIC_COMPANY_NAME=Montañez Lab"
    "NEXT_PUBLIC_CONTACT_EMAIL=info@montanez-lab.com"
    "NEXT_PUBLIC_CONTACT_PHONE=+51 64 234 5678"
    "NEXT_PUBLIC_FIREBASE_API_KEY=dev_firebase_key_here"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dev-project.firebaseapp.com"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID=dev-project-id"
    "DATABASE_URL=postgresql://localhost:5432/dental_lab_dev"
    "JWT_SECRET=dev_jwt_secret_here"
)

# Array de secrets para producción
PROD_SECRETS=(
    "NODE_ENV=production"
    "NEXT_PUBLIC_SITE_URL=https://montanez-lab.com"
    "NEXT_PUBLIC_DEBUG=false"
    "NEXT_PUBLIC_SITE_NAME=Montañez Lab Dental Lab"
    "NEXT_PUBLIC_SITE_DESCRIPTION=Laboratorio Dental de Excelencia"
    "NEXT_PUBLIC_COMPANY_NAME=Montañez Lab"
    "NEXT_PUBLIC_CONTACT_EMAIL=info@montanez-lab.com"
    "NEXT_PUBLIC_CONTACT_PHONE=+51 64 234 5678"
    "NEXT_PUBLIC_FIREBASE_API_KEY=prod_firebase_key_here"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prod-project.firebaseapp.com"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID=prod-project-id"
    "DATABASE_URL=postgresql://prod-server:5432/dental_lab_prod"
    "JWT_SECRET=prod_jwt_secret_here"
)

echo "📝 Configurando secrets de DESARROLLO..."
for secret in "${DEV_SECRETS[@]}"; do
    IFS='=' read -r key value <<< "$secret"
    echo "   🔑 $key"
    # Nota: Los secrets reales se configuran manualmente en GitHub
done

echo "📝 Configurando secrets de PRODUCCIÓN..."
for secret in "${PROD_SECRETS[@]}"; do
    IFS='=' read -r key value <<< "$secret"
    echo "   🔑 $key"
    # Nota: Los secrets reales se configuran manualmente en GitHub
done

echo ""
echo "✅ Configuración completada!"
echo ""
echo "📋 PASOS MANUALES REQUERIDOS:"
echo "1. Ve a: https://github.com/$(gh repo view --json nameWithOwner --jq .nameWithOwner)/settings/secrets/actions"
echo "2. Haz clic en 'New repository secret'"
echo "3. Agrega cada variable con su valor real"
echo ""
echo "🔐 SECRETS A CONFIGURAR:"
echo "   - NODE_ENV"
echo "   - NEXT_PUBLIC_SITE_URL"
echo "   - NEXT_PUBLIC_DEBUG"
echo "   - NEXT_PUBLIC_SITE_NAME"
echo "   - NEXT_PUBLIC_SITE_DESCRIPTION"
echo "   - NEXT_PUBLIC_COMPANY_NAME"
echo "   - NEXT_PUBLIC_CONTACT_EMAIL"
echo "   - NEXT_PUBLIC_CONTACT_PHONE"
echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "   - DATABASE_URL"
echo "   - JWT_SECRET"
echo ""
echo "💡 TIP: Puedes usar 'gh secret set' para configurarlos desde CLI"
