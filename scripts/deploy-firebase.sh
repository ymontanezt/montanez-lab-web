#!/bin/bash

# 🚀 Script de Deploy a Firebase - Montañez Lab
# Este script automatiza el proceso de deploy a Firebase Hosting

set -e  # Salir en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Función para verificar comandos requeridos
check_requirements() {
    print_message "Verificando prerrequisitos..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado"
        exit 1
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado"
        exit 1
    fi
    
    # Verificar Firebase CLI
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLI no está instalado. Instala con: npm install -g firebase-tools"
        exit 1
    fi
    
    # Verificar Git
    if ! command -v git &> /dev/null; then
        print_error "Git no está instalado"
        exit 1
    fi
    
    print_success "Todos los prerrequisitos están instalados"
}

# Función para verificar estado del repositorio
check_repository_status() {
    print_message "Verificando estado del repositorio..."
    
    # Verificar que estés en main
    CURRENT_BRANCH=$(git branch --show-current)
    if [[ "$CURRENT_BRANCH" != "main" ]]; then
        print_error "Debes estar en la rama main para hacer deploy. Rama actual: $CURRENT_BRANCH"
        print_message "Cambia a main con: git checkout main"
        exit 1
    fi
    
    # Verificar que no haya cambios sin commitear
    if [[ -n $(git status --porcelain) ]]; then
        print_error "Hay cambios sin commitear en el repositorio"
        print_message "Commitea o stashea los cambios antes de hacer deploy"
        exit 1
    fi
    
    # Verificar que estés sincronizado con origin
    git fetch origin
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse origin/main)
    
    if [[ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]]; then
        print_warning "Tu rama local no está sincronizada con origin/main"
        print_message "Actualizando repositorio..."
        git pull origin main
    fi
    
    print_success "Repositorio verificado y actualizado"
}

# Función para instalar dependencias
install_dependencies() {
    print_message "Instalando dependencias..."
    
    # Limpiar node_modules si existe
    if [[ -d "node_modules" ]]; then
        print_message "Limpiando node_modules existente..."
        rm -rf node_modules
    fi
    
    # Limpiar cache de npm
    print_message "Limpiando cache de npm..."
    npm cache clean --force
    
    # Instalar dependencias
    print_message "Instalando dependencias con npm..."
    npm install
    
    print_success "Dependencias instaladas correctamente"
}

# Función para build del proyecto
build_project() {
    print_message "Construyendo proyecto..."
    
    # Limpiar builds anteriores
    if [[ -d "out" ]]; then
        print_message "Limpiando build anterior..."
        rm -rf out
    fi
    
    if [[ -d ".next" ]]; then
        print_message "Limpiando cache de Next.js..."
        rm -rf .next
    fi
    
    # Build de producción
    print_message "Ejecutando build de producción..."
    npm run build
    
    # Verificar que el build sea exitoso
    if [[ ! -d "out" ]]; then
        print_error "Build falló - directorio 'out' no encontrado"
        exit 1
    fi
    
    # Verificar archivos críticos
    if [[ ! -f "out/index.html" ]]; then
        print_error "Build falló - index.html no encontrado"
        exit 1
    fi
    
    print_success "Proyecto construido correctamente"
    print_message "Tamaño del build: $(du -sh out | cut -f1)"
}

# Función para deploy a Firebase
deploy_to_firebase() {
    print_message "Desplegando a Firebase..."
    
    # Verificar login a Firebase
    if ! firebase projects:list &> /dev/null; then
        print_error "No estás logueado en Firebase"
        print_message "Ejecuta: firebase login"
        exit 1
    fi
    
    # Verificar proyecto activo
    CURRENT_PROJECT=$(firebase use --only | grep -o 'montanez-website')
    if [[ "$CURRENT_PROJECT" != "montanez-website" ]]; then
        print_warning "Proyecto Firebase incorrecto. Cambiando a montanez-website..."
        firebase use montanez-website
    fi
    
    # Deploy a Firebase
    print_message "Iniciando deploy..."
    firebase deploy --only hosting
    
    print_success "Deploy a Firebase completado exitosamente!"
}

# Función para verificar deploy
verify_deploy() {
    print_message "Verificando deploy..."
    
    # Obtener URL del sitio
    SITE_URL=$(firebase hosting:sites:list | grep 'montanez-website' | awk '{print $2}')
    
    if [[ -n "$SITE_URL" ]]; then
        print_success "Sitio desplegado en: $SITE_URL"
        
        # Verificar que el sitio responda
        print_message "Verificando que el sitio responda..."
        if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" | grep -q "200"; then
            print_success "Sitio responde correctamente"
        else
            print_warning "El sitio no responde correctamente. Verifica manualmente."
        fi
    else
        print_warning "No se pudo obtener la URL del sitio"
    fi
}

# Función para limpieza
cleanup() {
    print_message "Limpiando archivos temporales..."
    
    # Limpiar archivos de build si es necesario
    if [[ "$1" == "--clean" ]]; then
        print_message "Limpiando archivos de build..."
        rm -rf out
        rm -rf .next
        print_success "Limpieza completada"
    fi
}

# Función principal
main() {
    echo "🚀 ========================================"
    echo "🚀  DEPLOY A FIREBASE - MONTAÑEZ LAB"
    echo "🚀 ========================================"
    echo ""
    
    # Parsear argumentos
    CLEAN_BUILD=false
    while [[ $# -gt 0 ]]; do
        case $1 in
            --clean)
                CLEAN_BUILD=true
                shift
                ;;
            --help)
                echo "Uso: $0 [OPCIONES]"
                echo ""
                echo "Opciones:"
                echo "  --clean     Limpiar archivos de build después del deploy"
                echo "  --help      Mostrar esta ayuda"
                echo ""
                echo "Ejemplo:"
                echo "  $0 --clean"
                exit 0
                ;;
            *)
                print_error "Opción desconocida: $1"
                print_message "Usa --help para ver las opciones disponibles"
                exit 1
                ;;
        esac
    done
    
    # Ejecutar pasos del deploy
    check_requirements
    check_repository_status
    install_dependencies
    build_project
    deploy_to_firebase
    verify_deploy
    
    if [[ "$CLEAN_BUILD" == true ]]; then
        cleanup --clean
    fi
    
    echo ""
    echo "🎉 ========================================"
    echo "🎉  DEPLOY COMPLETADO EXITOSAMENTE!"
    echo "🎉 ========================================"
    echo ""
    print_success "Sitio disponible en: https://montanez-website.web.app"
    print_message "Puedes ver el estado en: https://console.firebase.google.com/project/montanez-website/hosting"
}

# Ejecutar función principal
main "$@"
