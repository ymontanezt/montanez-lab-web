#!/bin/bash

# Script de deploy automatizado para Firebase
# Autor: Montañez Lab Web Team
# Fecha: $(date +%Y-%m-%d)

set -e  # Exit on any error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_status() {
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

# Función para mostrar el banner
show_banner() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    MONTANEZ LAB WEB                        ║"
    echo "║                Script de Deploy Automatizado               ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Función para verificar dependencias
check_dependencies() {
    print_status "Verificando dependencias..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null && ! command -v bun &> /dev/null; then
        print_error "Ni npm ni bun están instalados"
        exit 1
    fi
    
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLI no está instalado"
        exit 1
    fi
    
    print_success "Todas las dependencias están disponibles"
}

# Función para limpiar cache
clean_cache() {
    print_status "Limpiando cache de Next.js..."
    
    if [ -d ".next" ]; then
        rm -rf .next
        print_success "Cache de .next eliminado"
    fi
    
    if [ -d "out" ]; then
        rm -rf out
        print_success "Directorio out eliminado"
    fi
    
    if [ -f "tsconfig.tsbuildinfo" ]; then
        rm tsconfig.tsbuildinfo
        print_success "tsconfig.tsbuildinfo eliminado"
    fi
    
    print_success "Limpieza de cache completada"
}

# Función para instalar dependencias
install_dependencies() {
    print_status "Instalando dependencias..."
    
    if command -v bun &> /dev/null; then
        print_status "Usando Bun como package manager..."
        bun install
    else
        print_status "Usando npm como package manager..."
        npm install
    fi
    
    print_success "Dependencias instaladas correctamente"
}

# Función para hacer build
build_project() {
    print_status "Iniciando build de producción..."
    
    if command -v bun &> /dev/null; then
        bun run build
    else
        npm run build
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Build completado exitosamente"
    else
        print_error "Error durante el build"
        exit 1
    fi
}

# Función para verificar build
verify_build() {
    print_status "Verificando archivos de build..."
    
    if [ ! -d "out" ]; then
        print_error "Directorio 'out' no encontrado después del build"
        exit 1
    fi
    
    if [ ! -f "out/index.html" ]; then
        print_error "index.html no encontrado en el build"
        exit 1
    fi
    
    print_success "Build verificado correctamente"
}

# Función para hacer deploy
deploy_to_firebase() {
    print_status "Iniciando deploy a Firebase..."
    
    firebase deploy --only hosting
    
    if [ $? -eq 0 ]; then
        print_success "Deploy a Firebase completado exitosamente"
    else
        print_error "Error durante el deploy a Firebase"
        exit 1
    fi
}

# Función para mostrar resumen
show_summary() {
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                        DEPLOY COMPLETADO                    ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    print_success "Proceso de deploy completado exitosamente"
    print_status "URL de producción: https://montanez-website.web.app"
    print_status "Panel de administración: https://montanez-website.web.app/admin"
    
    echo ""
    print_status "Tiempo total del proceso: $SECONDS segundos"
}

# Función principal
main() {
    local start_time=$SECONDS
    
    show_banner
    check_dependencies
    clean_cache
    install_dependencies
    build_project
    verify_build
    deploy_to_firebase
    show_summary
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIONES]"
    echo ""
    echo "Opciones:"
    echo "  -h, --help     Mostrar esta ayuda"
    echo "  -c, --clean    Solo limpiar cache"
    echo "  -b, --build    Solo hacer build (sin deploy)"
    echo "  -d, --deploy   Solo hacer deploy (asume build existente)"
    echo "  -f, --force    Forzar deploy sin confirmación"
    echo ""
    echo "Ejemplos:"
    echo "  $0              # Proceso completo: limpiar + build + deploy"
    echo "  $0 --clean      # Solo limpiar cache"
    echo "  $0 --build      # Solo hacer build"
    echo "  $0 --deploy     # Solo hacer deploy"
}

# Parsear argumentos de línea de comandos
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    -c|--clean)
        show_banner
        clean_cache
        print_success "Limpieza completada"
        exit 0
        ;;
    -b|--build)
        show_banner
        check_dependencies
        clean_cache
        install_dependencies
        build_project
        verify_build
        print_success "Build completado"
        exit 0
        ;;
    -d|--deploy)
        show_banner
        check_dependencies
        verify_build
        deploy_to_firebase
        print_success "Deploy completado"
        exit 0
        ;;
    -f|--force)
        FORCE_DEPLOY=true
        main
        ;;
    "")
        main
        ;;
    *)
        print_error "Opción desconocida: $1"
        show_help
        exit 1
        ;;
esac
