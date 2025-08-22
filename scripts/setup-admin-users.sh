#!/bin/bash

# Script para configurar usuarios administradores en Firebase
# Ejecutar después de configurar Firebase CLI

echo "🚀 Configurando usuarios administradores en Firebase..."

# Verificar si Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI no está instalado. Instalando..."
    npm install -g firebase-tools
fi

# Verificar si está logueado
if ! firebase auth:list &> /dev/null; then
    echo "🔐 Iniciando sesión en Firebase..."
    firebase login
fi

echo "✅ Firebase CLI configurado correctamente"

# Crear usuarios administradores
echo "👥 Creando usuarios administradores..."

# Usuario admin principal
echo "📧 Creando admin principal: admin@montanez-lab.com"
firebase auth:create-user \
    --email admin@montanez-lab.com \
    --password "MontanezLab2024!" \
    --display-name "Administrador Principal" \
    --email-verified

# Usuario admin secundario
echo "📧 Creando admin secundario: yuri@montanez-lab.com"
firebase auth:create-user \
    --email yuri@montanez-lab.com \
    --password "YuriAdmin2024!" \
    --display-name "Yuri Montanez" \
    --email-verified

echo "✅ Usuarios administradores creados exitosamente"

# Crear colección de administradores en Firestore
echo "🗄️ Configurando colección de administradores..."

# Crear archivo temporal para la configuración
cat > temp-admin-config.json << EOF
{
  "admin@montanez-lab.com": {
    "uid": "admin_principal",
    "email": "admin@montanez-lab.com",
    "role": "super_admin",
    "permissions": ["all"],
    "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)",
    "active": true
  },
  "yuri@montanez-lab.com": {
    "uid": "admin_secundario",
    "email": "yuri@montanez-lab.com",
    "role": "admin",
    "permissions": ["contacts", "appointments", "reports", "settings"],
    "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)",
    "active": true
  }
}
EOF

echo "📝 Archivo de configuración temporal creado: temp-admin-config.json"
echo ""
echo "🎯 Próximos pasos:"
echo "1. Ve a Firebase Console → Authentication → Users"
echo "2. Verifica que los usuarios estén creados"
echo "3. En Firestore, crea la colección 'admins'"
echo "4. Importa el archivo temp-admin-config.json"
echo ""
echo "🔑 Credenciales de acceso:"
echo "Admin Principal: admin@montanez-lab.com / MontanezLab2024!"
echo "Admin Secundario: yuri@montanez-lab.com / YuriAdmin2024!"
echo ""
echo "✅ Script completado. Revisa Firebase Console para verificar."
