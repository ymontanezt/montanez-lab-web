'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/auth-context'
import { LoginForm } from '@/components/login-form'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RechartsDashboard } from '@/components/admin/recharts-dashboard'
import { ContactManagement } from '@/components/admin/contact-management'
import { AppointmentManagement } from '@/components/admin/appointment-management'
import { CorporateSidebar } from '@/components/admin/corporate-sidebar'

import { Reports } from '@/components/admin/reports'
import { SystemSettings } from '@/components/admin/system-settings'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { signOutUser } from '@/lib/auth'
import { useToast } from '@/hooks/use-toast'
import {
  LogOut,
  BarChart3,
  MessageSquare,
  Settings,
  FileText,
  Loader2,
  Microscope,
  Bell,
  Download,
  Calendar,
  Menu,
} from 'lucide-react'
import { getAllContacts } from '@/lib/firebase/contacts'
import { getAllAppointments } from '@/lib/firebase/appointments'

import { ExcelExporter } from '@/lib/excel-export'
import { cn } from '@/lib/design-system/utilities'

type ActiveTab = 'dashboard' | 'contacts' | 'appointments' | 'reports' | 'settings' | 'manual'

export default function AdminPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [stats, setStats] = useState<any>(null)
  const [exporting, setExporting] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [dashboardData, setDashboardData] = useState<{ contacts: any[]; appointments: any[] }>({
    contacts: [],
    appointments: [],
  })
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOutUser()
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleExportData = async () => {
    setExporting(true)
    try {
      // Obtener todos los datos
      const [contacts, appointments] = await Promise.all([getAllContacts(), getAllAppointments()])

      // Crear instancia del exportador Excel
      const excelExporter = new ExcelExporter()

      // Preparar datos para exportación
      const exportData = {
        contacts,
        appointments,
        stats,
        period: 'General',
      }

      // Exportar a Excel
      await excelExporter.exportDashboard(exportData)

      toast({
        title: 'Dashboard exportado a Excel',
        description: 'El archivo Excel se ha descargado exitosamente con todas las hojas y datos',
      })
    } catch (error) {
      console.error('Error exportando a Excel:', error)
      toast({
        title: 'Error',
        description: 'No se pudo exportar el dashboard a Excel',
        variant: 'destructive',
      })
    } finally {
      setExporting(false)
    }
  }

  const loadDashboardData = async () => {
    try {

      const [contacts, appointments] = await Promise.all([getAllContacts(), getAllAppointments()])
      
      setDashboardData({ contacts, appointments })
    } catch (error) {
      console.error('❌ Error cargando datos del dashboard:', error)
    }
  }

  // Cargar datos cuando se active la pestaña dashboard
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData()
    }
  }, [activeTab])

  const tabs = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Resumen y estadísticas',
    },
    {
      id: 'contacts' as ActiveTab,
      label: 'Contactos',
      icon: MessageSquare,
      description: 'Gestionar consultas',
      badge: stats?.contacts?.new || 0,
    },
    {
      id: 'appointments' as ActiveTab,
      label: 'Citas',
      icon: Calendar,
      description: 'Gestionar citas',
      badge: stats?.appointments?.pending || 0,
    },
    {
      id: 'reports' as ActiveTab,
      label: 'Reportes',
      icon: FileText,
      description: 'Generar reportes',
    },
    {
      id: 'settings' as ActiveTab,
      label: 'Configuración',
      icon: Settings,
      description: 'Ajustes del sistema',
    },
    {
      id: 'manual' as ActiveTab,
      label: 'Manual de Usuario',
      icon: FileText,
      description: 'Guía del sistema',
    },
  ]

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Cargando panel administrativo...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-teal-100 bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 p-2.5 shadow-sm">
                  <Microscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-teal-800">Montañez Lab</h1>
                  <p className="text-sm text-teal-600">Panel Administrativo</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 sm:gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-slate-700">Bienvenido</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <Bell className="h-4 w-4" />
              </Button>

              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Cerrar Sesión</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Corporate Sidebar */}
        <CorporateSidebar
          activeTab={activeTab}
          onTabChange={(tab: string) => setActiveTab(tab as ActiveTab)}
          stats={stats}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={cn(
          "flex-1 transition-all duration-300 ease-in-out lg:ml-0",
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
        )}>
          <div className="p-3 lg:p-4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="heading-secondary">Dashboard Principal</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportData}
                      disabled={exporting}
                      className="w-full sm:w-auto"
                    >
                      {exporting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {exporting ? 'Exportando...' : 'Exportar a Excel'}
                    </Button>
                  </div>
                  <DashboardStats onStatsLoad={setStats} />
                  <RechartsDashboard
                    contacts={dashboardData.contacts}
                    appointments={dashboardData.appointments}
                    stats={stats}
                  />
                </div>
              )}

              {activeTab === 'contacts' && (
                <div className="space-y-6">
                  <ContactManagement />
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <AppointmentManagement />
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <Reports />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <SystemSettings />
                </div>
              )}

              {activeTab === 'manual' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="heading-secondary">Manual de Usuario</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('/admin/manual', '_blank')}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Abrir Manual
                    </Button>
                  </div>
                  <div className="bg-teal-50 border-l-4 border-teal-400 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-3">
                      📖 Manual Completo del Sistema
                    </h3>
                    <p className="text-teal-700 mb-4">
                      Accede a la guía completa del sistema Montañez Lab. El manual incluye:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-teal-700 mb-4">
                      <li>Instalación y configuración</li>
                      <li>Uso del sistema y funcionalidades</li>
                      <li>Panel de administración</li>
                      <li>Deployment y producción</li>
                      <li>Soporte y contacto</li>
                    </ul>
                    <Button
                      onClick={() => window.open('/admin/manual', '_blank')}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Abrir Manual Completo
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
