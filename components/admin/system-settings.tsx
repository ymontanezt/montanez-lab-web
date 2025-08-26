'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { UserManagement } from './user-management'
import {
  Settings,
  Bell,
  Users,
  Shield,
  Database,
  Mail,
  Globe,
  Save,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Monitor,
  Palette,
} from 'lucide-react'

interface SystemConfig {
  // Configuración general
  siteName: string
  siteDescription: string
  siteUrl: string
  timezone: string

  // Configuración de contacto
  contactPhone: string
  contactWhatsApp: string
  contactEmail: string
  adminEmail: string

  // Configuración de notificaciones
  emailNotifications: boolean
  whatsappNotifications: boolean
  adminNotifications: boolean

  // Configuración de seguridad
  requireAuth: boolean
  sessionTimeout: number
  maxLoginAttempts: number

  // Configuración de UI
  theme: 'light' | 'dark' | 'auto'
  language: 'es' | 'en'
  maintenanceMode: boolean

  // Configuración de Firebase
  firebaseEnabled: boolean
  firebaseProjectId: string

  // Configuración de email
  emailProvider: 'resend' | 'smtp' | 'firebase'
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string
}

export function SystemSettings() {
  const [config, setConfig] = useState<SystemConfig>({
    siteName: 'Montañez Lab',
    siteDescription: 'Laboratorio dental',
    siteUrl: 'https://montanez-website.web.app',
    timezone: 'America/Lima',
    contactPhone: '+51 989 253 275',
    contactWhatsApp: '+51 989 253 275',
    contactEmail: 'montzavy@gmail.com',
    adminEmail: 'mmontanezt@gmail.com',
    emailNotifications: true,
    whatsappNotifications: true,
    adminNotifications: true,
    requireAuth: true,
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
    theme: 'auto',
    language: 'es',
    maintenanceMode: false,
    firebaseEnabled: true,
    firebaseProjectId: 'montanez-website',
    emailProvider: 'resend',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    setLoading(true)
    try {
      // Aquí cargarías la configuración desde Firebase o localStorage
      // Por ahora usamos la configuración por defecto
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simular carga
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cargar la configuración',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    setSaving(true)
    try {
      // Aquí guardarías la configuración en Firebase
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simular guardado

      toast({
        title: 'Configuración guardada',
        description: 'Los cambios han sido aplicados exitosamente',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la configuración',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleConfigChange = (key: keyof SystemConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetConfig = () => {
    if (confirm('¿Estás seguro de que quieres restaurar la configuración por defecto?')) {
      loadConfig()
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h2>
          <p className="text-muted-foreground">
            Ajusta las configuraciones del sistema, notificaciones y preferencias
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={resetConfig} variant="outline" disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restaurar
          </Button>
          <Button onClick={saveConfig} disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar Cambios
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración General
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios Administradores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          {/* Configuración general content */}

          {/* Configuración General */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Globe className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Configuración General</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="siteName">Nombre del Sitio</Label>
                <Input
                  id="siteName"
                  value={config.siteName}
                  onChange={e => handleConfigChange('siteName', e.target.value)}
                  placeholder="Nombre del sitio web"
                />
              </div>

              <div>
                <Label htmlFor="siteDescription">Descripción</Label>
                <Input
                  id="siteDescription"
                  value={config.siteDescription}
                  onChange={e => handleConfigChange('siteDescription', e.target.value)}
                  placeholder="Descripción del sitio"
                />
              </div>

              <div>
                <Label htmlFor="siteUrl">URL del Sitio</Label>
                <Input
                  id="siteUrl"
                  value={config.siteUrl}
                  onChange={e => handleConfigChange('siteUrl', e.target.value)}
                  placeholder="https://ejemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select
                  value={config.timezone}
                  onValueChange={value => handleConfigChange('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Lima">Huancayo (GMT-5)</SelectItem>
                    <SelectItem value="America/New_York">Nueva York (GMT-5/-4)</SelectItem>
                    <SelectItem value="Europe/Madrid">Madrid (GMT+1/+2)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Configuración de Contacto */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Smartphone className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Información de Contacto</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="contactPhone">Teléfono</Label>
                <Input
                  id="contactPhone"
                  value={config.contactPhone}
                  onChange={e => handleConfigChange('contactPhone', e.target.value)}
                  placeholder="+51 989 253 275"
                />
              </div>

              <div>
                <Label htmlFor="contactWhatsApp">WhatsApp</Label>
                <Input
                  id="contactWhatsApp"
                  value={config.contactWhatsApp}
                  onChange={e => handleConfigChange('contactWhatsApp', e.target.value)}
                  placeholder="+51 989 253 275"
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Email de Contacto</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={config.contactEmail}
                  onChange={e => handleConfigChange('contactEmail', e.target.value)}
                  placeholder="info@ejemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="adminEmail">Email de Admin</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={config.adminEmail}
                  onChange={e => handleConfigChange('adminEmail', e.target.value)}
                  placeholder="admin@ejemplo.com"
                />
              </div>
            </div>
          </Card>

          {/* Configuración de Notificaciones */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Notificaciones</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                  <p className="text-muted-foreground text-sm">
                    Enviar notificaciones automáticas por email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={config.emailNotifications}
                  onCheckedChange={checked => handleConfigChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="whatsappNotifications">Notificaciones por WhatsApp</Label>
                  <p className="text-muted-foreground text-sm">
                    Enviar notificaciones automáticas por WhatsApp
                  </p>
                </div>
                <Switch
                  id="whatsappNotifications"
                  checked={config.whatsappNotifications}
                  onCheckedChange={checked => handleConfigChange('whatsappNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adminNotifications">Notificaciones de Admin</Label>
                  <p className="text-muted-foreground text-sm">
                    Notificar a administradores sobre actividades importantes
                  </p>
                </div>
                <Switch
                  id="adminNotifications"
                  checked={config.adminNotifications}
                  onCheckedChange={checked => handleConfigChange('adminNotifications', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Configuración de Seguridad */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Seguridad</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireAuth">Requerir Autenticación</Label>
                  <p className="text-muted-foreground text-sm">
                    Requerir login para acceder al admin
                  </p>
                </div>
                <Switch
                  id="requireAuth"
                  checked={config.requireAuth}
                  onCheckedChange={checked => handleConfigChange('requireAuth', checked)}
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Tiempo de Sesión (segundos)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={config.sessionTimeout}
                  onChange={e => handleConfigChange('sessionTimeout', parseInt(e.target.value))}
                  min="300"
                  max="86400"
                />
              </div>

              <div>
                <Label htmlFor="maxLoginAttempts">Máximo Intentos de Login</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={config.maxLoginAttempts}
                  onChange={e => handleConfigChange('maxLoginAttempts', parseInt(e.target.value))}
                  min="3"
                  max="10"
                />
              </div>
            </div>
          </Card>

          {/* Configuración de UI */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Palette className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Interfaz de Usuario</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="theme">Tema</Label>
                <Select
                  value={config.theme}
                  onValueChange={value => handleConfigChange('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="auto">Automático</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Idioma</Label>
                <Select
                  value={config.language}
                  onValueChange={value => handleConfigChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
                  <p className="text-muted-foreground text-sm">Activar modo mantenimiento</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={config.maintenanceMode}
                  onCheckedChange={checked => handleConfigChange('maintenanceMode', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Configuración de Firebase */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Database className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Configuración de Firebase</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="firebaseEnabled">Firebase Habilitado</Label>
                  <p className="text-muted-foreground text-sm">Usar Firebase como backend</p>
                </div>
                <Switch
                  id="firebaseEnabled"
                  checked={config.firebaseEnabled}
                  onCheckedChange={checked => handleConfigChange('firebaseEnabled', checked)}
                />
              </div>

              <div>
                <Label htmlFor="firebaseProjectId">ID del Proyecto</Label>
                <Input
                  id="firebaseProjectId"
                  value={config.firebaseProjectId}
                  onChange={e => handleConfigChange('firebaseProjectId', e.target.value)}
                  placeholder="proyecto-id"
                />
              </div>
            </div>
          </Card>

          {/* Configuración de Email */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Mail className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Configuración de Email</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="emailProvider">Proveedor de Email</Label>
                <Select
                  value={config.emailProvider}
                  onValueChange={value => handleConfigChange('emailProvider', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resend">Resend</SelectItem>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="firebase">Firebase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.emailProvider === 'smtp' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="smtpHost">Servidor SMTP</Label>
                    <Input
                      id="smtpHost"
                      value={config.smtpHost}
                      onChange={e => handleConfigChange('smtpHost', e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPort">Puerto SMTP</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={config.smtpPort}
                      onChange={e => handleConfigChange('smtpPort', parseInt(e.target.value))}
                      placeholder="587"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpUser">Usuario SMTP</Label>
                    <Input
                      id="smtpUser"
                      value={config.smtpUser}
                      onChange={e => handleConfigChange('smtpUser', e.target.value)}
                      placeholder="usuario@ejemplo.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPassword">Contraseña SMTP</Label>
                    <div className="relative">
                      <Input
                        id="smtpPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={config.smtpPassword}
                        onChange={e => handleConfigChange('smtpPassword', e.target.value)}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4">
            <Button onClick={resetConfig} variant="outline">
              Restaurar Valores
            </Button>
            <Button onClick={saveConfig} disabled={saving}>
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar Configuración
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6 space-y-6">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
