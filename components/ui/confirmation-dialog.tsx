'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ConfirmationDialogProps {
  trigger: React.ReactNode
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'destructive' | 'warning' | 'info' | 'success'
  onConfirm: () => void | Promise<void>
  loading?: boolean
}

const variantConfig = {
  destructive: {
    icon: Trash2,
    iconColor: 'text-red-500',
    confirmVariant: 'destructive' as const,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    confirmVariant: 'default' as const,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  info: {
    icon: Info,
    iconColor: 'text-teal-500',
    confirmVariant: 'default' as const,
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    confirmVariant: 'default' as const,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
}

export function ConfirmationDialog({
  trigger,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'destructive',
  onConfirm,
  loading = false,
}: ConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const config = variantConfig[variant]
  const Icon = config.icon

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      setIsOpen(false)
    } catch (error) {
      console.error('Error en confirmación:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <AlertDialogHeader>
            <div
              className={`flex items-center gap-3 rounded-lg p-3 ${config.bgColor} ${config.borderColor} mb-4 border`}
            >
              <div className={`flex-shrink-0 ${config.iconColor}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <AlertDialogTitle className="text-left text-lg font-semibold">
                  {title}
                </AlertDialogTitle>
              </div>
            </div>

            <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-3 sm:gap-3">
            <AlertDialogCancel className="flex-1 sm:flex-none" disabled={isLoading || loading}>
              {cancelText}
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isLoading || loading}
              className={`flex-1 sm:flex-none ${config.confirmVariant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}`}
            >
              {isLoading || loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Procesando...
                </div>
              ) : (
                confirmText
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Hook personalizado para usar el modal de confirmación de manera programática
export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<{
    title: string
    description: string
    onConfirm: () => void | Promise<void>
    variant?: 'destructive' | 'warning' | 'info' | 'success'
    confirmText?: string
    cancelText?: string
  } | null>(null)

  const confirm = (options: {
    title: string
    description: string
    onConfirm: () => void | Promise<void>
    variant?: 'destructive' | 'warning' | 'info' | 'success'
    confirmText?: string
    cancelText?: string
  }) => {
    setConfig(options)
    setIsOpen(true)

    return new Promise<boolean>(resolve => {
      const originalOnConfirm = options.onConfirm

      setConfig({
        ...options,
        onConfirm: async () => {
          try {
            await originalOnConfirm()
            resolve(true)
          } catch (error) {
            resolve(false)
            throw error
          } finally {
            setIsOpen(false)
          }
        },
      })
    })
  }

  const ConfirmationModal = () => {
    if (!config) return null

    const variantConfig = {
      destructive: {
        icon: Trash2,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
      },
      warning: {
        icon: AlertTriangle,
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
      },
      info: {
        icon: Info,
        iconColor: 'text-teal-500',
        bgColor: 'bg-teal-50',
        borderColor: 'border-teal-200',
      },
      success: {
        icon: CheckCircle,
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      },
    }

    const currentConfig = variantConfig[config.variant || 'destructive']
    const Icon = currentConfig.icon

    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <AlertDialogHeader>
              <div
                className={`flex items-center gap-3 rounded-lg p-3 ${currentConfig.bgColor} ${currentConfig.borderColor} mb-4 border`}
              >
                <div className={`flex-shrink-0 ${currentConfig.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <AlertDialogTitle className="text-left text-lg font-semibold">
                    {config.title}
                  </AlertDialogTitle>
                </div>
              </div>

              <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed">
                {config.description}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="gap-3 sm:gap-3">
              <AlertDialogCancel className="flex-1 sm:flex-none">
                {config.cancelText || 'Cancelar'}
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={config.onConfirm}
                className={`flex-1 sm:flex-none ${config.variant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {config.confirmText || 'Confirmar'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return { confirm, ConfirmationModal }
}
