'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/auth-context'
import { LoginForm } from '@/components/login-form'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RechartsDashboard } from '@/components/admin/recharts-dashboard'
import { ContactManagement } from '@/components/admin/contact-management'
import { AppointmentManagement } from '@/components/admin/appointment-management'

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
} from 'lucide-react'
import { getAllContacts } from '@/lib/firebase/contacts'
import { getAllAppointments } from '@/lib/firebase/appointments'

import { ExcelExporter } from '@/lib/excel-export'

type ActiveTab = 'dashboard' | 'contacts' | 'appointments' | 'reports' | 'settings'

export default function AdminPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [stats, setStats] = useState<any>(null)
  const [exporting, setExporting] = useState(false)
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
      console.log('🔄 Cargando datos del dashboard...')
      const [contacts, appointments] = await Promise.all([getAllContacts(), getAllAppointments()])
      console.log('✅ Datos cargados:', {
        contactsCount: contacts.length,
        appointmentsCount: appointments.length,
        contacts: contacts.slice(0, 2), // Solo los primeros 2 para debug
        appointments: appointments.slice(0, 2), // Solo los primeros 2 para debug
      })
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
      <header className="border-border sticky top-0 z-40 border-b bg-gradient-to-r from-slate-50 to-blue-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-2 shadow-lg">
                  <Microscope className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text font-serif text-lg font-bold text-transparent">
                  Montañez Lab
                </span>
              </div>
              <Badge
                variant="secondary"
                className="hidden border-blue-200 bg-blue-100 text-blue-800 md:flex"
              >
                Admin Panel
              </Badge>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-blue-700">Bienvenido</p>
                <p className="text-xs text-blue-600">{user?.email}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50"
              >
                <Bell className="h-4 w-4" />
              </Button>

              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Cerrar Sesión</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="space-y-3 lg:w-64">
            <motion.h2
              className="mb-4 px-2 text-lg font-semibold text-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Navegación
            </motion.h2>
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'border border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50 hover:shadow-md'
                }`}
                whileHover={{
                  scale: activeTab === tab.id ? 1 : 1.02,
                  y: activeTab === tab.id ? 0 : -2,
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        activeTab === tab.id ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{tab.label}</div>
                      <div
                        className={`text-xs ${
                          activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        {tab.description}
                      </div>
                    </div>
                  </div>
                  {tab.badge && tab.badge > 0 && (
                    <Badge
                      variant={activeTab === tab.id ? 'secondary' : 'destructive'}
                      className={`text-xs ${
                        activeTab === tab.id ? 'border-white/30 bg-white/20 text-white' : ''
                      }`}
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="heading-secondary">Dashboard Principal</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportData}
                      disabled={exporting}
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
                  <h1 className="heading-secondary">Gestión de Contactos</h1>
                  <ContactManagement />
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <h1 className="heading-secondary">Gestión de Citas</h1>
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
