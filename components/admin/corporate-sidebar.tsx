'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/design-system/utilities'
import {
  BarChart3,
  MessageSquare,
  Settings,
  FileText,
  Calendar,
  Microscope,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Bell,
  Zap,
  Target,
  Activity,
  TrendingUp,
  DollarSign,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

interface CorporateSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  stats?: any
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function CorporateSidebar({ activeTab, onTabChange, stats, isCollapsed, onToggleCollapse }: CorporateSidebarProps) {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Resumen general',
      badge: null,
    },
    {
      id: 'contacts',
      label: 'Contactos',
      icon: MessageSquare,
      description: 'Gestión de consultas',
      badge: stats?.contacts?.new || 0,
    },
    {
      id: 'appointments',
      label: 'Citas',
      icon: Calendar,
      description: 'Gestión de citas',
      badge: stats?.appointments?.pending || 0,
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FileText,
      description: 'Análisis y estadísticas',
      badge: null,
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: Settings,
      description: 'Ajustes del sistema',
      badge: null,
    },
    {
      id: 'manual',
      label: 'Manual',
      icon: FileText,
      description: 'Documentación',
      badge: null,
    },
  ]

  // Estado para móviles
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-teal-200 rounded-lg p-2 shadow-lg"
      >
        <BarChart3 className="h-5 w-5 text-teal-600" />
      </button>

      {/* Sidebar */}
      <motion.div
                      className={cn(
          'fixed lg:relative h-screen bg-white border-r border-teal-100 transition-all duration-300 ease-in-out shadow-sm z-50',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-8 z-50">
        <Button
          onClick={onToggleCollapse}
          size="sm"
          className="h-7 w-7 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-gray-600" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Logo Section */}
      <div className="p-6 border-b border-teal-100">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-shrink-0">
            <div className="rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 p-2.5 shadow-sm">
              <Microscope className="h-5 w-5 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-teal-600 truncate">Panel Administrativo</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'w-full rounded-lg p-3 text-left transition-all duration-200 relative group',
              activeTab === tab.id
                ? 'bg-teal-50 border border-teal-200 text-teal-900 shadow-sm'
                : 'text-slate-600 hover:bg-teal-50 hover:text-teal-900 border border-transparent hover:border-teal-200'
            )}
            whileHover={{
              scale: 1.01,
              y: -1,
            }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-lg p-2 flex-shrink-0 transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-slate-500 group-hover:text-teal-700'
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm">{tab.label}</div>
                    <div
                      className={cn(
                        'text-xs truncate transition-colors duration-200',
                        activeTab === tab.id ? 'text-teal-600' : 'text-slate-400'
                      )}
                    >
                      {tab.description}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Badge */}
              {tab.badge && tab.badge > 0 && !isCollapsed && (
                <Badge
                  variant="destructive"
                  className="text-xs font-medium bg-red-500 text-white"
                >
                  {tab.badge}
                </Badge>
              )}

              {/* Collapsed Badge */}
              {tab.badge && tab.badge > 0 && isCollapsed && (
                <div className="absolute -top-1 -right-1">
                  <div className="h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </div>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </nav>

      {/* Quick Stats (Collapsed View) */}
      {isCollapsed && (
        <div className="absolute bottom-6 left-0 right-0 px-2">
          <div className="space-y-2">
            {stats?.contacts?.new > 0 && (
              <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-200">
                <div className="text-teal-700 text-xs font-semibold">{stats.contacts.new}</div>
                <div className="text-teal-500 text-[10px]">Nuevos</div>
              </div>
            )}
            {stats?.appointments?.pending > 0 && (
              <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-200">
                <div className="text-teal-700 text-xs font-semibold">{stats.appointments.pending}</div>
                <div className="text-teal-500 text-[10px]">Pendientes</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-teal-200 p-2">
                <Activity className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-teal-700">Estado del Sistema</p>
                <p className="text-xs text-teal-600">Operativo</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-500"></div>
              <span className="text-xs text-teal-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
    </>
  )
}
