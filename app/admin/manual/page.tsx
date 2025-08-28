'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Settings, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Rocket, 
  HelpCircle,
  ChevronRight,
  Download,
  Printer
} from 'lucide-react'

export default function UserManualPage() {
  const [activeSection, setActiveSection] = useState('inicio')

  const sections = [
    { id: 'inicio', title: '🏠 Inicio', icon: BookOpen },
    { id: 'caracteristicas', title: '✨ Características', icon: BarChart3 },
    { id: 'instalacion', title: '⚙️ Instalación', icon: Settings },
    { id: 'uso', title: '📱 Uso del Sistema', icon: Users },
    { id: 'admin', title: '👨‍💼 Panel Admin', icon: Settings },
    { id: 'emails', title: '📧 Sistema de Emails', icon: MessageSquare },
    { id: 'deployment', title: '🚀 Deployment', icon: Rocket },
    { id: 'soporte', title: '🆘 Soporte', icon: HelpCircle },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const exportToPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              🏥 Montañez Lab
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manual Completo de Usuario - Sistema de Gestión Dental
            </p>
            <p className="text-lg text-gray-500 mt-2">
              Guía paso a paso para administradores y usuarios
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-600" />
                Navegación
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <button
                  onClick={exportToPDF}
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                                           <Printer className="h-4 w-4" />
                  Imprimir PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Descargar
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Inicio */}
            <motion.section
              id="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-teal-600" />
                Introducción al Sistema
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Montañez Lab es un sistema web completo para la gestión de laboratorios dentales, 
                diseñado para optimizar procesos, mejorar la experiencia del cliente y facilitar 
                la administración del negocio.
              </p>
              
              <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg mb-6">
                <p className="text-teal-800 font-medium">
                  🎯 <strong>Objetivo Principal:</strong> Proporcionar una plataforma integral que 
                  permita gestionar citas, contactos, servicios y contenido del sitio web de manera 
                  eficiente y profesional.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Tecnologías Utilizadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-teal-50 to-indigo-50 p-6 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">Frontend</h4>
                  <p className="text-gray-700">Next.js 15, React 19, TypeScript, Tailwind CSS</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Backend</h4>
                  <p className="text-gray-700">Firebase Firestore, Firebase Auth, Firebase Storage</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Deployment</h4>
                  <p className="text-gray-700">Firebase Hosting, CI/CD automatizado</p>
                </div>
              </div>
            </motion.section>

            {/* Características */}
            <motion.section
              id="caracteristicas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-teal-600" />
                Características Principales
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎨 Sitio Web Profesional</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-teal-50 to-indigo-50 p-6 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">Diseño Responsive</h4>
                      <p className="text-gray-700">Adaptable a todos los dispositivos (móvil, tablet, desktop)</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Performance Optimizado</h4>
                      <p className="text-gray-700">Core Web Vitals optimizados para mejor SEO</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">PWA Ready</h4>
                      <p className="text-gray-700">Instalable como aplicación móvil</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">📅 Sistema de Citas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">Reserva Online</h4>
                      <p className="text-gray-700">Formulario de reserva 24/7 para clientes</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">Gestión de Estados</h4>
                      <p className="text-gray-700">Control completo del flujo de citas</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-lime-50 p-6 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">Notificaciones</h4>
                      <p className="text-gray-700">Email automático de confirmación</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">👥 Gestión de Contactos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Formulario de Contacto</h4>
                      <p className="text-gray-700">Captura de mensajes con validación automática</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-2">Sistema de Estados</h4>
                      <p className="text-gray-700">Nuevo, Leído, Respondido, Archivado</p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
                      <h4 className="font-semibold text-rose-800 mb-2">Respuestas Automáticas</h4>
                      <p className="text-gray-700">Confirmación inmediata vía Resend</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">👨‍💼 Panel de Administración</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">Dashboard Inteligente</h4>
                      <p className="text-gray-700">Estadísticas en tiempo real y métricas clave</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                      <h4 className="font-semibold text-amber-800 mb-2">Sidebar Colapsable</h4>
                      <p className="text-gray-700">Navegación elegante y responsive</p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-200">
                      <h4 className="font-semibold text-violet-800 mb-2">Gestión de Contenido</h4>
                      <p className="text-gray-700">Control total de servicios y galería</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Tecnologías Avanzadas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-2">Next.js 15</h4>
                      <p className="text-gray-700">App Router y optimizaciones de performance</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">Firebase Suite</h4>
                      <p className="text-gray-700">Backend completo y escalable</p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
                      <h4 className="font-semibold text-rose-800 mb-2">Resend Email</h4>
                      <p className="text-gray-700">Sistema de emails profesional</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Instalación */}
            <motion.section
              id="instalacion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="h-8 w-8 text-teal-600" />
                Instalación y Configuración
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Prerrequisitos</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Node.js 18.0.0 o superior</li>
                <li>Bun 1.0.0 o superior (recomendado)</li>
                <li>Git para control de versiones</li>
                <li>Cuenta de Firebase</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Instalación Paso a Paso</h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Clonar el Repositorio',
                    description: 'Descarga el código fuente desde GitHub',
                    code: 'git clone https://github.com/ymontanezt/montanez-lab-web.git\ncd montanez-lab-web'
                  },
                  {
                    step: 2,
                    title: 'Instalar Dependencias',
                    description: 'Instala todas las librerías necesarias',
                    code: 'bun install\n# o\nnpm install'
                  },
                  {
                    step: 3,
                    title: 'Configurar Variables de Entorno',
                    description: 'Crea el archivo .env.local con tu configuración',
                    code: 'cp env.local.example .env.local\n# Edita .env.local con tus valores'
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-500">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{item.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Uso del Sistema */}
            <motion.section
              id="uso"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="h-8 w-8 text-teal-600" />
                Uso del Sistema
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🌐 Navegación del Sitio Web</h3>
              
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Página Principal</h4>
              <p className="text-gray-700 mb-4">La página principal incluye:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Hero section con carrusel de servicios</li>
                <li>Sección de servicios destacados</li>
                <li>Galería de trabajos realizados</li>
                <li>Equipo especializado</li>
                <li>Estadísticas del laboratorio</li>
                <li>Formulario de contacto</li>
              </ul>

              <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg mb-6">
                <p className="text-teal-800 font-medium">
                  ✅ <strong>Optimizado para Móvil:</strong> El sitio está completamente optimizado 
                  para dispositivos móviles con navegación táctil y diseño responsive.
                </p>
              </div>
            </motion.section>

            {/* Panel de Administración */}
            <motion.section
              id="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="h-8 w-8 text-teal-600" />
                Panel de Administración
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🔐 Acceso al Panel</h3>
              <div className="space-y-4 mb-6">
                {[
                  'Navegar a /admin desde tu navegador',
                  'Usar tus credenciales de administrador',
                  'Verificar que tienes acceso completo'
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📊 Dashboard Principal</h3>
              <p className="text-gray-700 mb-4">El dashboard muestra estadísticas en tiempo real:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Total de citas del día/mes</li>
                <li>Mensajes de contacto pendientes</li>
                <li>Usuarios activos</li>
                <li>Gráficos de tendencias</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">👥 Gestión de Contactos</h3>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
                <h4 className="font-semibold text-blue-800 mb-3">Funcionalidades Principales:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">📋 Lista de Contactos</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Filtros por estado y fecha</li>
                      <li>• Búsqueda por nombre/email</li>
                      <li>• Paginación inteligente</li>
                      <li>• Vista de cards responsive</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">🏷️ Estados de Contacto</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• 🆕 Nuevo (Slate)</li>
                      <li>• 👁️ Leído (Amber)</li>
                      <li>• ✅ Respondido (Emerald)</li>
                      <li>• 📁 Archivado (Slate)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📅 Gestión de Citas</h3>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200 mb-6">
                <h4 className="font-semibold text-emerald-800 mb-3">Funcionalidades Principales:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-emerald-700 mb-2">📋 Lista de Citas</h5>
                    <ul className="text-sm text-emerald-600 space-y-1">
                      <li>• Filtros por estado y servicio</li>
                      <li>• Búsqueda por paciente</li>
                      <li>• Vista de calendario</li>
                      <li>• Gestión de horarios</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-emerald-700 mb-2">🏷️ Estados de Cita</h5>
                    <ul className="text-sm text-emerald-600 space-y-1">
                      <li>• ⏳ Pendiente (Amber)</li>
                      <li>• ✅ Confirmada (Blue)</li>
                      <li>• 🎉 Completada (Emerald)</li>
                      <li>• ❌ Cancelada (Rose)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎨 Características del UI</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-2">🎭 Sidebar Elegante</h4>
                  <p className="text-gray-700 text-sm">Colapsable, responsive y con navegación intuitiva</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">🏷️ Badges Delgados</h4>
                  <p className="text-gray-700 text-sm">Estados con colores profesionales y diseño compacto</p>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-200">
                  <h4 className="font-semibold text-violet-800 mb-2">📱 Mobile First</h4>
                  <p className="text-gray-700 text-sm">Optimizado para todos los dispositivos móviles</p>
                </div>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
                <p className="text-teal-800 font-medium">
                  💡 <strong>Pro Tip:</strong> El panel de administración está completamente optimizado para móvil. 
                  Puedes gestionar contactos y citas desde cualquier dispositivo con la misma eficiencia que en desktop.
                </p>
              </div>
            </motion.section>

            {/* Sistema de Emails */}
            <motion.section
              id="emails"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-teal-600" />
                Sistema de Emails con Resend
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📧 Servicio de Email Profesional</h3>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200 mb-6">
                <h4 className="font-semibold text-rose-800 mb-3">✨ Resend - Plataforma de Email Moderna</h4>
                <p className="text-rose-700 mb-4">
                  Utilizamos Resend como proveedor de email para garantizar la entrega confiable y profesional de todas las comunicaciones:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-rose-700 mb-2">🚀 Ventajas de Resend</h5>
                    <ul className="text-sm text-rose-600 space-y-1">
                      <li>• Entrega garantizada del 99.9%</li>
                      <li>• API moderna y fácil de usar</li>
                      <li>• Analytics detallados de emails</li>
                      <li>• Plantillas personalizables</li>
                      <li>• Soporte técnico 24/7</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-rose-700 mb-2">📊 Métricas Disponibles</h5>
                    <ul className="text-sm text-rose-600 space-y-1">
                      <li>• Tasa de apertura</li>
                      <li>• Clicks en enlaces</li>
                      <li>• Tasa de rebote</li>
                      <li>• Tiempo de entrega</li>
                      <li>• Estado de entrega</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Tipos de Email Automáticos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">👥 Confirmación de Contacto</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Enviado inmediatamente al cliente</li>
                    <li>• Confirma recepción del mensaje</li>
                    <li>• Incluye número de ticket</li>
                    <li>• Promete respuesta en 24h</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-3">📅 Confirmación de Cita</h4>
                  <ul className="text-sm text-emerald-600 space-y-1">
                    <li>• Detalles completos de la cita</li>
                    <li>• Fecha, hora y servicio</li>
                    <li>• Instrucciones de preparación</li>
                    <li>• Información de contacto</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">⚙️ Configuración del Sistema</h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: 1,
                    title: 'Configurar Variables de Entorno',
                    description: 'Agregar credenciales de Resend al archivo .env.local',
                    code: 'RESEND_API_KEY=re_...\nRESEND_FROM_EMAIL=montzavy@gmail.com\nRESEND_FROM_NAME=Montañez Lab'
                  },
                  {
                    step: 2,
                    title: 'Verificar Dominio',
                    description: 'Configurar y verificar tu dominio en el dashboard de Resend',
                    code: 'https://resend.com/domains'
                  },
                  {
                    step: 3,
                    title: 'Probar Sistema',
                    description: 'Enviar email de prueba para verificar configuración',
                    code: 'bun run test:email'
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 p-6 rounded-lg border-l-4 border-rose-500">
                    <div className="flex items-start gap-4">
                      <div className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        {item.code && (
                          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                            <code>{item.code}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🔍 Monitoreo y Troubleshooting</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">📊 Dashboard de Resend</h4>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• Logs de envío</li>
                    <li>• Estadísticas de entrega</li>
                    <li>• Reportes de bounces</li>
                    <li>• Análisis de engagement</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">🚨 Problemas Comunes</h4>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• Emails en spam</li>
                    <li>• Dominio no verificado</li>
                    <li>• API key inválida</li>
                    <li>• Límite de envíos</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Soluciones</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Verificar configuración</li>
                    <li>• Revisar logs de error</li>
                    <li>• Contactar soporte</li>
                    <li>• Actualizar credenciales</li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r-lg">
                <p className="text-rose-800 font-medium">
                  📧 <strong>Pro Tip:</strong> El sistema de emails con Resend garantiza que todos los clientes reciban 
                  confirmaciones profesionales y oportunas, mejorando significativamente la experiencia del cliente y 
                  reduciendo la carga de trabajo administrativa.
                </p>
              </div>
            </motion.section>

            {/* Deployment */}
            <motion.section
              id="deployment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Rocket className="h-8 w-8 text-teal-600" />
                Deployment y Producción
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Deploy Automatizado</h3>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 mb-6">
                <h4 className="font-semibold text-green-800 mb-3">✨ Script de Deploy Inteligente</h4>
                <p className="text-green-700 mb-4">
                  Hemos creado un script automatizado que maneja todo el proceso de deploy en un solo comando:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">🔄 Proceso Completo</h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Limpieza automática de cache</li>
                      <li>• Instalación de dependencias</li>
                      <li>• Build optimizado</li>
                      <li>• Deploy a Firebase</li>
                      <li>• Verificación del resultado</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">⚡ Comandos Disponibles</h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• <code className="bg-green-200 px-1 rounded">bun run deploy</code> - Deploy completo</li>
                      <li>• <code className="bg-green-200 px-1 rounded">bun run deploy:clean</code> - Solo limpiar</li>
                      <li>• <code className="bg-green-200 px-1 rounded">bun run deploy:build</code> - Solo build</li>
                      <li>• <code className="bg-green-200 px-1 rounded">bun run deploy:only</code> - Solo deploy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🌐 Deploy a Firebase</h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: 1,
                    title: 'Deploy Automatizado (Recomendado)',
                    description: 'Un solo comando para todo el proceso',
                    code: 'bun run deploy'
                  },
                  {
                    step: 2,
                    title: 'Deploy Manual',
                    description: 'Si prefieres controlar cada paso',
                    code: 'bun run build\nfirebase deploy --only hosting'
                  },
                  {
                    step: 3,
                    title: 'Verificar Deploy',
                    description: 'Confirma que todo funcione correctamente',
                    code: 'https://montanez-website.web.app'
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        {item.code && (
                          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                            <code>{item.code}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📊 Monitoreo del Deploy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🌐 URLs de Verificación</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Sitio Principal</li>
                    <li>• Panel Admin</li>
                    <li>• Firebase Console</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">📈 Métricas</h4>
                  <ul className="text-sm text-emerald-600 space-y-1">
                    <li>• Tiempo total</li>
                    <li>• Archivos procesados</li>
                    <li>• Estado de cada paso</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">🔄 Rollback</h4>
                  <ul className="text-sm text-amber-600 space-y-1">
                    <li>• Versiones disponibles</li>
                    <li>• Rollback rápido</li>
                    <li>• Verificación post-rollback</li>
                  </ul>
                </div>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
                <p className="text-teal-800 font-medium">
                  🚀 <strong>Pro Tip:</strong> El script de deploy automatizado reduce el tiempo de deploy de 10-15 minutos 
                  a solo 3-5 minutos, y elimina la posibilidad de errores humanos en el proceso.
                </p>
              </div>
            </motion.section>

            {/* Soporte */}
            <motion.section
              id="soporte"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-teal-600" />
                Soporte y Contacto
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📞 Canales de Soporte</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-teal-50 to-indigo-50 p-6 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">Email de Soporte</h4>
                  <p className="text-gray-700">montzavy@gmail.com</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Email de Admin</h4>
                  <p className="text-gray-700">mmontanezt@gmail.com</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Teléfono</h4>
                  <p className="text-gray-700">+51 989 253 275</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">📚 Recursos Adicionales</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Documentación Técnica:</strong> docs/README.md</li>
                <li><strong>Flujo de Trabajo Git:</strong> docs/git-workflow.md</li>
                <li><strong>Manual de Deployment:</strong> docs/firebase-deployment.md</li>
                <li><strong>GitHub Issues:</strong> Para reportar bugs</li>
              </ul>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
