'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  stats?: any
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function ModernSidebar({ activeTab, onTabChange, stats, isCollapsed, onToggleCollapse }: SidebarProps) {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Resumen y estadísticas',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
    },
    {
      id: 'contacts',
      label: 'Contactos',
      icon: MessageSquare,
      description: 'Gestionar consultas',
      badge: stats?.contacts?.new || 0,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'appointments',
      label: 'Citas',
      icon: Calendar,
      description: 'Gestionar citas',
      badge: stats?.appointments?.pending || 0,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600',
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FileText,
      description: 'Generar reportes',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600',
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: Settings,
      description: 'Ajustes del sistema',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      iconColor: 'text-slate-600',
    },
    {
      id: 'manual',
      label: 'Manual',
      icon: FileText,
      description: 'Guía del sistema',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      iconColor: 'text-teal-600',
    },
  ]

  return (
    <motion.div
      className={cn(
        'relative h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-50">
        <Button
          onClick={onToggleCollapse}
          size="sm"
          className="h-6 w-6 rounded-full bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-gray-600" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Logo Section */}
      <div className="p-4 border-b border-gray-100">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-shrink-0">
            <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-2 shadow-lg">
              <Microscope className="h-6 w-6 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-lg font-bold text-transparent truncate">
                Montañez Lab
              </h1>
              <p className="text-xs text-gray-500 truncate">Panel Administrativo</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'w-full rounded-xl p-3 text-left transition-all duration-300 relative overflow-hidden group',
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-${tab.color.split('-')[1]}-500/25`
                : `${tab.bgColor} hover:shadow-md hover:scale-[1.02] border border-transparent hover:border-${tab.color.split('-')[1]}-200`
            )}
            whileHover={{
              scale: activeTab === tab.id ? 1 : 1.02,
              y: activeTab === tab.id ? 0 : -2,
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            {/* Active Background Animation */}
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-lg p-2 flex-shrink-0 transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : `${tab.iconColor} ${tab.bgColor}`
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{tab.label}</div>
                    <div
                      className={cn(
                        'text-xs truncate transition-colors duration-200',
                        activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
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
                  variant={activeTab === tab.id ? 'secondary' : 'destructive'}
                  className={cn(
                    'text-xs font-bold transition-all duration-200',
                    activeTab === tab.id
                      ? 'border-white/30 bg-white/20 text-white'
                      : 'bg-red-500 text-white'
                  )}
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
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <div className="space-y-2">
            {stats?.contacts?.new > 0 && (
              <div className="bg-emerald-100 rounded-lg p-2 text-center">
                <div className="text-emerald-600 text-xs font-bold">{stats.contacts.new}</div>
                <div className="text-emerald-500 text-[10px]">Nuevos</div>
              </div>
            )}
            {stats?.appointments?.pending > 0 && (
              <div className="bg-purple-100 rounded-lg p-2 text-center">
                <div className="text-purple-600 text-xs font-bold">{stats.appointments.pending}</div>
                <div className="text-purple-500 text-[10px]">Pendientes</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 p-2">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Estado del Sistema</p>
                <p className="text-xs text-gray-500">Todo funcionando</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
