#!/bin/bash

# 🚨 Script de Rollback de Emergencia - Montañez Lab
# Este script permite hacer rollback inmediato en caso de problemas críticos

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

# Función para verificar prerrequisitos
check_requirements() {
    print_message "Verificando prerrequisitos..."
    
    # Verificar Firebase CLI
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLI no está instalado"
        exit 1
    fi
    
    # Verificar login a Firebase
    if ! firebase projects:list &> /dev/null; then
        print_error "No estás logueado en Firebase"
        print_message "Ejecuta: firebase login"
        exit 1
    fi
    
    print_success "Prerrequisitos verificados"
}

# Función para listar releases disponibles
list_releases() {
    print_message "Listando releases disponibles..."
    
    firebase hosting:releases:list
    
    print_message "Para hacer rollback, usa: $0 --rollback [RELEASE_ID]"
}

# Función para hacer rollback
do_rollback() {
    local RELEASE_ID=$1
    
    if [[ -z "$RELEASE_ID" ]]; then
        print_error "Debes especificar un RELEASE_ID"
        print_message "Uso: $0 --rollback [RELEASE_ID]"
        exit 1
    fi
    
    print_warning "🚨 INICIANDO ROLLBACK DE EMERGENCIA..."
    print_warning "Esto revertirá el sitio a la versión: $RELEASE_ID"
    
    # Confirmar rollback
    read -p "¿Estás seguro de que quieres hacer rollback? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_message "Rollback cancelado"
        exit 0
    fi
    
    # Ejecutar rollback
    print_message "Ejecutando rollback..."
    firebase hosting:releases:rollback "$RELEASE_ID"
    
    print_success "Rollback completado exitosamente!"
    print_message "El sitio ha sido revertido a la versión: $RELEASE_ID"
}

# Función para rollback automático a la versión anterior
auto_rollback() {
    print_warning "🚨 INICIANDO ROLLBACK AUTOMÁTICO..."
    print_warning "Esto revertirá el sitio a la versión anterior disponible"
    
    # Confirmar rollback automático
    read -p "¿Estás seguro de que quieres hacer rollback automático? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_message "Rollback automático cancelado"
        exit 0
    fi
    
    # Ejecutar rollback automático
    print_message "Ejecutando rollback automático..."
    firebase hosting:releases:rollback
    
    print_success "Rollback automático completado exitosamente!"
    print_message "El sitio ha sido revertido a la versión anterior"
}

# Función para verificar estado del sitio
check_site_status() {
    print_message "Verificando estado del sitio..."
    
    # Obtener URL del sitio
    SITE_URL=$(firebase hosting:sites:list | grep 'montanez-website' | awk '{print $2}')
    
    if [[ -n "$SITE_URL" ]]; then
        print_success "Sitio disponible en: $SITE_URL"
        
        # Verificar que el sitio responda
        print_message "Verificando respuesta del sitio..."
        if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" | grep -q "200"; then
            print_success "Sitio responde correctamente"
        else
            print_warning "El sitio no responde correctamente"
        fi
    else
        print_warning "No se pudo obtener la URL del sitio"
    fi
}

# Función para mostrar ayuda
show_help() {
    echo "🚨 ========================================"
    echo "🚨  ROLLBACK DE EMERGENCIA - MONTAÑEZ LAB"
    echo "🚨 ========================================"
    echo ""
    echo "Uso: $0 [COMANDO] [OPCIONES]"
    echo ""
    echo "Comandos:"
    echo "  --list                    Listar releases disponibles"
    echo "  --rollback RELEASE_ID     Hacer rollback a versión específica"
    echo "  --auto                    Rollback automático a versión anterior"
    echo "  --status                  Verificar estado del sitio"
    echo "  --help                    Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 --list                           # Listar releases"
    echo "  $0 --rollback abc123def             # Rollback a versión específica"
    echo "  $0 --auto                           # Rollback automático"
    echo "  $0 --status                         # Verificar estado"
    echo ""
    echo "⚠️  ADVERTENCIA: Este script puede causar downtime del sitio"
    echo "   Úsalo solo en casos de emergencia crítica"
}

# Función principal
main() {
    # Verificar prerrequisitos
    check_requirements
    
    # Parsear argumentos
    case "${1:-}" in
        --list)
            list_releases
            ;;
        --rollback)
            do_rollback "$2"
            ;;
        --auto)
            auto_rollback
            ;;
        --status)
            check_site_status
            ;;
        --help|"")
            show_help
            ;;
        *)
            print_error "Comando desconocido: $1"
            print_message "Usa --help para ver los comandos disponibles"
            exit 1
            ;;
    esac
}

# Ejecutar función principal
main "$@"
