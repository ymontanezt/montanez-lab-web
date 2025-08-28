'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/design-system/utilities'

// Configuración de estados para contactos
export const contactStatusConfig = {
  new: {
    label: 'Nuevo',
    color: 'bg-slate-600 text-white',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-700',
    icon: '🆕',
    description: 'Consulta recién recibida'
  },
  read: {
    label: 'Leído',
    color: 'bg-amber-600 text-white',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    icon: '👁️',
    description: 'Consulta revisada por admin'
  },
  replied: {
    label: 'Respondido',
    color: 'bg-emerald-600 text-white',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    icon: '✅',
    description: 'Respuesta enviada al cliente'
  },
  archived: {
    label: 'Archivado',
    color: 'bg-slate-500 text-white',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-600',
    icon: '📁',
    description: 'Consulta archivada'
  }
}

// Configuración de estados para citas
export const appointmentStatusConfig = {
  pending: {
    label: 'Pendiente',
    color: 'bg-amber-600 text-white',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    icon: '⏳',
    description: 'Cita agendada, pendiente de confirmación'
  },
  confirmed: {
    label: 'Confirmada',
    color: 'bg-blue-600 text-white',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    icon: '✅',
    description: 'Cita confirmada por el cliente'
  },
  completed: {
    label: 'Completada',
    color: 'bg-emerald-600 text-white',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    icon: '🎉',
    description: 'Cita completada exitosamente'
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-rose-600 text-white',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    icon: '❌',
    description: 'Cita cancelada por el cliente'
  }
}

interface StatusSelectorProps {
  value: string
  onValueChange: (value: string) => void
  statusConfig: Record<string, {
    label: string
    color: string
    bgColor: string
    borderColor: string
    textColor: string
    icon: string
    description: string
  }>
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function StatusSelector({ 
  value, 
  onValueChange, 
  statusConfig, 
  placeholder = "Seleccionar estado",
  className,
  disabled = false
}: StatusSelectorProps) {
  const currentStatus = statusConfig[value as keyof typeof statusConfig]

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn(
        "w-full border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        currentStatus ? currentStatus.borderColor : "border-gray-200",
        currentStatus ? currentStatus.bgColor : "bg-white",
        currentStatus ? currentStatus.textColor : "text-gray-700",
        "focus:ring-2 focus:ring-offset-2",
        currentStatus ? `focus:ring-${currentStatus.color.split('-')[1]}-500` : "focus:ring-blue-500",
        "rounded-lg",
        className
      )}>
        <SelectValue placeholder={placeholder}>
          {currentStatus && (
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                currentStatus.bgColor,
                currentStatus.borderColor,
                "border-2"
              )}>
                <span className="text-lg">{currentStatus.icon}</span>
              </div>
              <span className="font-semibold">{currentStatus.label}</span>
              <div className={cn(
                "w-3 h-3 rounded-full ml-auto",
                currentStatus.color.replace('bg-', 'bg-').replace('text-white', '')
              )} />
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      
      <SelectContent className="max-h-96 bg-white/95 backdrop-blur-sm border-2 border-gray-100 shadow-xl">
        {Object.entries(statusConfig).map(([key, status]) => (
          <SelectItem 
            key={key} 
            value={key}
            className="cursor-pointer transition-all duration-200"
          >
            <motion.div 
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                "hover:bg-gradient-to-r hover:shadow-md",
                status.bgColor,
                `hover:${status.borderColor}`,
                "border border-transparent hover:border-opacity-50"
              )}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                status.bgColor,
                status.borderColor,
                "border-2"
              )}>
                <span className="text-lg">{status.icon}</span>
              </div>
              <div className="flex-1">
                <div className={cn("font-semibold", status.textColor)}>
                  {status.label}
                </div>
                <div className="text-xs opacity-75 text-gray-600">
                  {status.description}
                </div>
              </div>
              <div className={cn(
                "w-3 h-3 rounded-full",
                status.color.replace('bg-', 'bg-').replace('text-white', '')
              )} />
            </motion.div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Componente específico para contactos
export function ContactStatusSelector({ value, onValueChange, className, disabled }: {
  value: string
  onValueChange: (value: string) => void
  className?: string
  disabled?: boolean
}) {
  return (
    <StatusSelector
      value={value}
      onValueChange={onValueChange}
      statusConfig={contactStatusConfig}
      placeholder="Seleccionar estado del contacto"
      className={className}
      disabled={disabled}
    />
  )
}

// Componente específico para citas
export function AppointmentStatusSelector({ value, onValueChange, className, disabled }: {
  value: string
  onValueChange: (value: string) => void
  className?: string
  disabled?: boolean
}) {
  return (
    <StatusSelector
      value={value}
      onValueChange={onValueChange}
      statusConfig={appointmentStatusConfig}
      placeholder="Seleccionar estado de la cita"
      className={className}
      disabled={disabled}
    />
  )
}

// Componente para mostrar el estado actual (solo visual)
export function StatusDisplay({ 
  status, 
  statusConfig, 
  className,
  showIcon = true,
  showDescription = false 
}: {
  status: string
  statusConfig: Record<string, {
    label: string
    color: string
    bgColor: string
    borderColor: string
    textColor: string
    icon: string
    description: string
  }>
  className?: string
  showIcon?: boolean
  showDescription?: boolean 
}) {
  const currentStatus = statusConfig[status as keyof typeof statusConfig]

  if (!currentStatus) return null

  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all duration-200 shadow-sm",
        currentStatus.borderColor,
        currentStatus.bgColor,
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {showIcon && (
        <span className="text-sm">{currentStatus.icon}</span>
      )}
      <span className={cn("text-xs font-medium", currentStatus.textColor)}>
        {currentStatus.label}
      </span>
      {showDescription && (
        <span className={cn("text-xs opacity-75", currentStatus.textColor)}>
          {currentStatus.description}
        </span>
      )}
    </motion.div>
  )
}
