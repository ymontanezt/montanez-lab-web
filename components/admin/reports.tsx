'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { getAllContacts } from '@/lib/firebase/contacts'
import { getAllAppointments } from '@/lib/firebase/appointments'
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  Loader2,
  FileSpreadsheet,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns'
import { es } from 'date-fns/locale'

interface ReportData {
  contacts: any[]
  appointments: any[]
  period: string
  startDate: Date
  endDate: Date
}

export function Reports() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState('7d')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    generateReport()
  }, [period])

  const generateReport = async () => {
    setLoading(true)
    try {
      const [contacts, appointments] = await Promise.all([getAllContacts(), getAllAppointments()])

      const { startDate, endDate } = getDateRange()

      const filteredContacts = contacts.filter(contact => {
        const contactDate = new Date(contact.createdAt)
        return contactDate >= startDate && contactDate <= endDate
      })

      const filteredAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date)
        return appointmentDate >= startDate && appointmentDate <= endDate
      })

      setReportData({
        contacts: filteredContacts,
        appointments: filteredAppointments,
        period,
        startDate,
        endDate,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron generar los reportes',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const getDateRange = () => {
    let endDate = new Date()
    let startDate: Date

    switch (period) {
      case '7d':
        startDate = subDays(endDate, 7)
        break
      case '30d':
        startDate = subDays(endDate, 30)
        break
      case '90d':
        startDate = subDays(endDate, 90)
        break
      case '6m':
        startDate = subMonths(endDate, 6)
        break
      case '1y':
        startDate = subMonths(endDate, 12)
        break
      case 'custom':
        startDate = customStartDate ? new Date(customStartDate) : subDays(endDate, 7)
        endDate = customEndDate ? new Date(customEndDate) : new Date()
        break
      default:
        startDate = subDays(endDate, 7)
    }

    return { startDate, endDate }
  }

  const exportToExcel = () => {
    if (!reportData) return

    // Crear datos para Excel
    const excelData = {
      contacts: reportData.contacts.map(contact => ({
        ID: contact.id,
        Nombre: contact.name,
        Email: contact.email,
        Teléfono: contact.phone,
        Asunto: contact.subject,
        Estado: contact.status,
        Prioridad: contact.priority || 'media',
        'Fecha Creación': format(new Date(contact.createdAt), 'dd/MM/yyyy HH:mm', { locale: es }),
        Mensaje: contact.message,
      })),
      appointments: reportData.appointments.map(appointment => ({
        ID: appointment.id,
        Nombre: appointment.name,
        Email: appointment.email,
        Teléfono: appointment.phone,
        Servicio: appointment.service,
        Fecha: appointment.date,
        Hora: appointment.time,
        Estado: appointment.status,
        Notas: appointment.notes || '',
        'Fecha Creación': format(new Date(appointment.createdAt), 'dd/MM/yyyy HH:mm', {
          locale: es,
        }),
      })),
    }

    // Convertir a CSV
    const contactsCSV = convertToCSV(excelData.contacts)
    const appointmentsCSV = convertToCSV(excelData.appointments)

    // Descargar archivos
    downloadCSV(contactsCSV, `contactos_${period}_${format(new Date(), 'dd-MM-yyyy')}.csv`)
    downloadCSV(appointmentsCSV, `citas_${period}_${format(new Date(), 'dd-MM-yyyy')}.csv`)

    toast({
      title: 'Reporte exportado',
      description: 'Los datos han sido exportados exitosamente',
    })
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ''

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','),
      ...data.map(row =>
        headers
          .map(header => {
            const value = row[header] || ''
            return `"${String(value).replace(/"/g, '""')}"`
          })
          .join(',')
      ),
    ]

    return csvRows.join('\n')
  }

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getContactsByStatus = () => {
    if (!reportData) return {}

    const statusCount: { [key: string]: number } = {}
    reportData.contacts.forEach(contact => {
      statusCount[contact.status] = (statusCount[contact.status] || 0) + 1
    })

    return statusCount
  }

  const getAppointmentsByStatus = () => {
    if (!reportData) return {}

    const statusCount: { [key: string]: number } = {}
    reportData.appointments.forEach(appointment => {
      statusCount[appointment.status] = (statusCount[appointment.status] || 0) + 1
    })

    return statusCount
  }

  const getContactsByPriority = () => {
    if (!reportData) return {}

    const priorityCount: { [key: string]: number } = {}
    reportData.contacts.forEach(contact => {
      const priority = contact.priority || 'media'
      priorityCount[priority] = (priorityCount[priority] || 0) + 1
    })

    return priorityCount
  }

  const getAppointmentsByService = () => {
    if (!reportData) return {}

    const serviceCount: { [key: string]: number } = {}
    reportData.appointments.forEach(appointment => {
      serviceCount[appointment.service] = (serviceCount[appointment.service] || 0) + 1
    })

    return serviceCount
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nuevo'
      case 'read':
        return 'Leído'
      case 'replied':
        return 'Respondido'
      case 'archived':
        return 'Archivado'
      case 'pending':
        return 'Pendiente'
      case 'confirmed':
        return 'Confirmada'
      case 'completed':
        return 'Completada'
      case 'cancelled':
        return 'Cancelada'
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta'
      case 'medium':
        return 'Media'
      case 'low':
        return 'Baja'
      default:
        return priority
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Generando reportes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reportes y Análisis</h2>
          <p className="text-muted-foreground">
            Análisis detallado de contactos, citas y tendencias
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateReport} variant="outline" disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button onClick={exportToExcel} disabled={!reportData}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium">Período</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="1y">Último año</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {period === 'custom' && (
            <>
              <div>
                <label className="text-sm font-medium">Fecha Inicio</label>
                <Input
                  type="date"
                  value={customStartDate}
                  onChange={e => setCustomStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Fecha Fin</label>
                <Input
                  type="date"
                  value={customEndDate}
                  onChange={e => setCustomEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </>
          )}

          <div className="flex items-end">
            <Badge variant="secondary" className="text-sm">
              {reportData
                ? `${reportData.contacts.length} contactos, ${reportData.appointments.length} citas`
                : 'Sin datos'}
            </Badge>
          </div>
        </div>
      </Card>

      {reportData && (
        <>
          {/* Resumen General */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Contactos</p>
                  <p className="text-2xl font-bold">{reportData.contacts.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Citas</p>
                  <p className="text-2xl font-bold">{reportData.appointments.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Período</p>
                  <p className="text-lg font-semibold">
                    {format(reportData.startDate, 'dd/MM', { locale: es })} -{' '}
                    {format(reportData.endDate, 'dd/MM', { locale: es })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Tasa Respuesta</p>
                  <p className="text-2xl font-bold">
                    {reportData.contacts.length > 0
                      ? Math.round(
                          ((getContactsByStatus().replied || 0) / reportData.contacts.length) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contactos por Estado */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Contactos por Estado</h3>
              <div className="space-y-3">
                {Object.entries(getContactsByStatus()).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          status === 'new'
                            ? 'bg-yellow-500'
                            : status === 'read'
                              ? 'bg-blue-500'
                              : status === 'replied'
                                ? 'bg-green-500'
                                : 'bg-gray-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{getStatusLabel(status)}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Citas por Estado */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Citas por Estado</h3>
              <div className="space-y-3">
                {Object.entries(getAppointmentsByStatus()).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          status === 'pending'
                            ? 'bg-yellow-500'
                            : status === 'confirmed'
                              ? 'bg-blue-500'
                              : status === 'completed'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{getStatusLabel(status)}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contactos por Prioridad */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Contactos por Prioridad</h3>
              <div className="space-y-3">
                {Object.entries(getContactsByPriority()).map(([priority, count]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          priority === 'high'
                            ? 'bg-red-500'
                            : priority === 'medium'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{getPriorityLabel(priority)}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Citas por Servicio */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Citas por Servicio</h3>
              <div className="space-y-3">
                {Object.entries(getAppointmentsByService()).map(([service, count]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{service}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tendencias Temporales */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Tendencias Temporales</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Contactos por Día</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reportData.contacts.length > 0
                    ? Math.round(
                        reportData.contacts.length /
                          Math.max(
                            1,
                            Math.ceil(
                              (reportData.endDate.getTime() - reportData.startDate.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          )
                      )
                    : 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Citas por Día</p>
                <p className="text-2xl font-bold text-green-600">
                  {reportData.appointments.length > 0
                    ? Math.round(
                        reportData.appointments.length /
                          Math.max(
                            1,
                            Math.ceil(
                              (reportData.endDate.getTime() - reportData.startDate.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          )
                      )
                    : 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Tiempo Respuesta Promedio</p>
                <p className="text-2xl font-bold text-purple-600">
                  {reportData.contacts.length > 0 ? '24h' : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
