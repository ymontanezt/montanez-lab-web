'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useToast } from '@/hooks/use-toast'
import {
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  type AppointmentData,
} from '@/lib/firebase/appointments'
import { AppointmentStatusSelector, StatusDisplay, appointmentStatusConfig } from '@/components/admin/status-selector'
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Loader2,
  User,
  Reply,
  Archive,
  AlertTriangle,
  Zap,
  Target,
  Activity,
  RotateCcw,
  Microscope,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function AppointmentManagement() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentData[]>([])
  const [paginatedAppointments, setPaginatedAppointments] = useState<AppointmentData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('')
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8) // 8 citas por página

  const { toast } = useToast()

  useEffect(() => {
    loadAppointments()
  }, [])

  useEffect(() => {
    filterAppointments()
  }, [appointments, searchTerm, statusFilter, serviceFilter, dateFilter])

  useEffect(() => {
    paginateAppointments()
  }, [filteredAppointments, currentPage, itemsPerPage])

  const loadAppointments = async () => {
    setLoading(true)
    try {
      const appointmentList = await getAllAppointments()
      setAppointments(appointmentList)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las citas',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filterAppointments = () => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        appointment =>
          appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter)
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.service === serviceFilter)
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(appointment => appointment.date === dateFilter)
    }

    setFilteredAppointments(filtered)
    setCurrentPage(1) // Reset a la primera página cuando se filtran
  }

  const paginateAppointments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginated = filteredAppointments.slice(startIndex, endIndex)
    setPaginatedAppointments(paginated)
  }

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleStatusUpdate = async (
    appointmentId: string,
    newStatus: AppointmentData['status']
  ) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus)
      await loadAppointments()
      toast({
        title: 'Estado actualizado',
        description: 'El estado de la cita ha sido actualizado exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await deleteAppointment(appointmentId)
      await loadAppointments()
      toast({
        title: 'Cita eliminada',
        description: 'La cita ha sido eliminada exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la cita',
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'confirmed':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Zap className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Target className="h-4 w-4 text-yellow-500" />
      case 'low':
        return <Activity className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
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

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'limpieza dental':
        return <Microscope className="h-4 w-4" />
      case 'blanqueamiento':
        return <Zap className="h-4 w-4" />
      case 'ortodoncia':
        return <Target className="h-4 w-4" />
      case 'implantes':
        return <Activity className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getUniqueServices = () => {
    const services = appointments.map(a => a.service)
    return [...new Set(services)]
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Cargando citas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Citas</h2>
          <p className="text-muted-foreground">Administra y organiza las citas de los pacientes</p>
        </div>

        <Button onClick={loadAppointments} variant="outline" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RotateCcw className="mr-2 h-4 w-4" />
          )}
          Actualizar
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-5">
          <div>
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative mt-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Nombre, email, servicio..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Estado</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="confirmed">Confirmadas</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Servicio</label>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {getUniqueServices().map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Fecha</label>
            <Input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-end">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {filteredAppointments.length} de {appointments.length} citas
              {totalPages > 1 && (
                <span className="ml-2 text-xs opacity-75">
                  • Página {currentPage} de {totalPages}
                </span>
              )}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Lista de citas */}
      <div className="space-y-4">
        {paginatedAppointments.map(appointment => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
                        <Card className="w-full max-w-full overflow-hidden transition-shadow hover:shadow-md">
              {/* Header de la card */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start gap-3">
                  {/* Icono de cita */}
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0">
                    <Calendar className="text-primary h-6 w-6" />
                  </div>
                  
                  {/* Información principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {appointment.name}
                      </h3>
                      <StatusDisplay
                        status={appointment.status}
                        statusConfig={appointmentStatusConfig}
                        showIcon={true}
                        showDescription={false}
                      />
                    </div>
                    
                    {/* Información de contacto */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{appointment.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{appointment.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: es })} - {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido de la card */}
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getServiceIcon(appointment.service)}
                    <h4 className="text-primary font-medium truncate">
                      {appointment.service}
                    </h4>
                  </div>
                  {appointment.notes && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {appointment.notes}
                    </p>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Desktop: Botones completos */}
                  <div className="hidden lg:flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setIsViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>

                    <Select
                      value={appointment.status}
                      onValueChange={value =>
                        handleStatusUpdate(appointment.id!, value as AppointmentData['status'])
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="confirmed">Confirmada</SelectItem>
                        <SelectItem value="completed">Completada</SelectItem>
                        <SelectItem value="canceled">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>

                    <ConfirmationDialog
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      }
                      title="Eliminar cita"
                      description={`¿Estás seguro de que quieres eliminar la cita de ${appointment.name} para el ${appointment.date}? Esta acción no se puede deshacer.`}
                      confirmText="Sí, eliminar"
                      cancelText="Cancelar"
                      variant="destructive"
                      onConfirm={() => handleDeleteAppointment(appointment.id!)}
                    />
                  </div>

                  {/* Móvil: Botón para abrir modal */}
                  <div className="lg:hidden w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setIsViewDialogOpen(true)
                      }}
                      className="w-full bg-teal-50 hover:bg-teal-100 border-teal-200 hover:border-teal-300 text-teal-700 hover:text-teal-800"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Ver Detalles</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12" />
            <p>No se encontraron citas con los filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} de{' '}
              {filteredAppointments.length} citas
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => goToPage(pageNumber)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Dialog para ver cita completa */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Cita</DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 min-w-0">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 min-w-0">
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <p className="text-sm">{selectedAppointment.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm">{selectedAppointment.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Teléfono</label>
                  <p className="text-sm">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Estado</label>
                  <StatusDisplay
                    status={selectedAppointment.status}
                    statusConfig={appointmentStatusConfig}
                    showIcon={true}
                    showDescription={false}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Servicio</label>
                  <p className="text-sm font-medium">{selectedAppointment.service}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Fecha y Hora</label>
                  <p className="text-sm">
                    {format(new Date(selectedAppointment.date), 'dd/MM/yyyy', { locale: es })} -{' '}
                    {selectedAppointment.time}
                  </p>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <label className="text-sm font-medium">Notas del Paciente</label>
                  <p className="bg-muted rounded-lg p-3 text-sm whitespace-pre-wrap">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Notas del Admin</label>
                <Textarea
                  placeholder="Agregar notas internas..."
                  value={adminNotes}
                  onChange={e => setAdminNotes(e.target.value)}
                />
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 min-w-0">
                <div>
                  <label className="text-sm font-medium">Cambiar Estado</label>
                  <AppointmentStatusSelector
                    value={selectedAppointment.status}
                    onValueChange={(newStatus) => 
                      handleStatusUpdate(selectedAppointment.id!, newStatus as AppointmentData['status'])
                    }
                    className="w-full"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      // Aquí podrías implementar la actualización de notas
                      setIsViewDialogOpen(false)
                    }}
                    className="w-full"
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
