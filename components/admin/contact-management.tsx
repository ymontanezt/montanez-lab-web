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
import { getAllContacts, updateContactStatus, deleteContact } from '@/lib/firebase/contacts'
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  Loader2,
  Calendar,
  User,
  Reply,
  Archive,
  AlertTriangle,
  Zap,
  Target,
  Activity,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  priority?: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt?: string
  adminNotes?: string
}

export function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [paginatedContacts, setPaginatedContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState('')
  const [adminNotes, setAdminNotes] = useState('')

  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // 10 contactos por página

  const { toast } = useToast()

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, statusFilter, priorityFilter])

  useEffect(() => {
    paginateContacts()
  }, [filteredContacts, currentPage, itemsPerPage])

  const loadContacts = async () => {
    setLoading(true)
    try {
      const contactList = await getAllContacts()
      setContacts(contactList)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los contactos',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filterContacts = () => {
    let filtered = contacts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(contact => contact.priority === priorityFilter)
    }

    setFilteredContacts(filtered)
    setCurrentPage(1) // Reset a la primera página cuando se filtran
  }

  const paginateContacts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginated = filteredContacts.slice(startIndex, endIndex)
    setPaginatedContacts(paginated)
  }

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleStatusUpdate = async (contactId: string, newStatus: Contact['status']) => {
    try {
      await updateContactStatus(contactId, newStatus, adminNotes)
      await loadContacts()
      toast({
        title: 'Estado actualizado',
        description: 'El estado del contacto ha sido actualizado exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    try {
      await deleteContact(contactId)
      await loadContacts()
      toast({
        title: 'Contacto eliminado',
        description: 'El contacto ha sido eliminado exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el contacto',
        variant: 'destructive',
      })
    }
  }

  const handleReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return

    try {
      // Aquí podrías implementar el envío del email de respuesta
      await updateContactStatus(selectedContact.id, 'replied', `Respuesta enviada: ${replyMessage}`)
      await loadContacts()
      setIsReplyDialogOpen(false)
      setReplyMessage('')
      toast({
        title: 'Respuesta enviada',
        description: 'El contacto ha sido marcado como respondido',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la respuesta',
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'read':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400'
      case 'replied':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
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
      case 'new':
        return 'Nuevo'
      case 'read':
        return 'Leído'
      case 'replied':
        return 'Respondido'
      case 'archived':
        return 'Archivado'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Cargando contactos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Contactos</h2>
          <p className="text-muted-foreground">
            Administra y responde a las consultas de los usuarios
          </p>
        </div>

        <Button onClick={loadContacts} variant="outline" disabled={loading}>
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
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative mt-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Nombre, email, asunto..."
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
                <SelectItem value="new">Nuevos</SelectItem>
                <SelectItem value="read">Leídos</SelectItem>
                <SelectItem value="replied">Respondidos</SelectItem>
                <SelectItem value="archived">Archivados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Prioridad</label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Badge variant="secondary" className="text-sm">
              {filteredContacts.length} de {contacts.length} contactos
              {totalPages > 1 && (
                <span className="ml-2 text-xs">
                  • Página {currentPage} de {totalPages}
                </span>
              )}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Lista de contactos */}
      <div className="space-y-4">
        {paginatedContacts.map(contact => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <Card className="w-full max-w-full overflow-hidden transition-shadow hover:shadow-md">
              {/* Header de la card */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0">
                    <User className="text-primary h-6 w-6" />
                  </div>
                  
                  {/* Información principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {contact.name}
                      </h3>
                      {getPriorityIcon(contact.priority || 'medium')}
                      <Badge className={getStatusColor(contact.status)}>
                        {getStatusLabel(contact.status)}
                      </Badge>
                    </div>
                    
                    {/* Información de contacto */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {format(new Date(contact.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido de la card */}
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-primary font-medium mb-2 truncate">
                    {contact.subject}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {contact.message}
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Desktop: Botones completos */}
                  <div className="hidden lg:flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact)
                        setIsViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact)
                        setIsReplyDialogOpen(true)
                      }}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Responder
                    </Button>

                    <Select
                      value={contact.status}
                      onValueChange={value =>
                        handleStatusUpdate(contact.id, value as Contact['status'])
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nuevo</SelectItem>
                        <SelectItem value="read">Leído</SelectItem>
                        <SelectItem value="replied">Respondido</SelectItem>
                        <SelectItem value="archived">Archivado</SelectItem>
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
                      title="Eliminar contacto"
                      description={`¿Estás seguro de que quieres eliminar el contacto de ${contact.name}? Esta acción no se puede deshacer.`}
                      confirmText="Sí, eliminar"
                      cancelText="Cancelar"
                      variant="destructive"
                      onConfirm={() => handleDeleteContact(contact.id)}
                    />
                  </div>

                  {/* Móvil: Botón para abrir modal */}
                  <div className="lg:hidden w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact)
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

        {filteredContacts.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            <MessageSquare className="mx-auto mb-4 h-12 w-12" />
            <p>No se encontraron contactos con los filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredContacts.length)} de{' '}
              {filteredContacts.length} contactos
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

      {/* Dialog para ver contacto completo */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader className="text-center lg:text-left">
            <DialogTitle className="text-xl lg:text-2xl">Detalles del Contacto</DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6 min-w-0">
              {/* Header con avatar y información principal */}
              <div className="text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                    <User className="text-primary h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedContact.name}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                      {getPriorityIcon(selectedContact.priority || 'medium')}
                      <Badge className={`${getStatusColor(selectedContact.status)} text-sm`}>
                        {getStatusLabel(selectedContact.status)}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(selectedContact.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de información de contacto */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 min-w-0">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 min-w-0">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email</label>
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <p className="text-sm font-medium truncate">{selectedContact.email}</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 min-w-0">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Teléfono</label>
                  <div className="flex items-center gap-2 min-w-0">
                    <Phone className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <p className="text-sm font-medium truncate">{selectedContact.phone}</p>
                  </div>
                </div>
              </div>

              {/* Asunto y mensaje */}
              <div className="space-y-4 min-w-0">
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 min-w-0">
                  <label className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-2 block">Asunto</label>
                  <p className="text-lg font-semibold text-teal-800 dark:text-teal-200 break-words">{selectedContact.subject}</p>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 min-w-0">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Mensaje</label>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">{selectedContact.message}</p>
                </div>
              </div>

              {/* Notas del admin */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2 block">Notas del Admin</label>
                <Textarea
                  placeholder="Agregar notas internas..."
                  value={adminNotes}
                  onChange={e => setAdminNotes(e.target.value)}
                  className="border-blue-200 dark:border-blue-600"
                />
              </div>

              {/* Botones de acción para móvil */}
              <div className="lg:hidden space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsViewDialogOpen(false)
                      setIsReplyDialogOpen(true)
                    }}
                    className="w-full bg-teal-50 hover:bg-teal-100 border-teal-200 hover:border-teal-300 text-teal-700 hover:text-teal-800"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Responder
                  </Button>
                  <Select
                    value={selectedContact.status}
                    onValueChange={value =>
                      handleStatusUpdate(selectedContact.id, value as Contact['status'])
                    }
                  >
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nuevo</SelectItem>
                      <SelectItem value="read">Leído</SelectItem>
                      <SelectItem value="replied">Respondido</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center">
                  <ConfirmationDialog
                    trigger={
                      <Button
                        variant="outline"
                        className="w-full bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Contacto
                      </Button>
                    }
                    title="Eliminar contacto"
                    description={`¿Estás seguro de que quieres eliminar el contacto de ${selectedContact.name}? Esta acción no se puede deshacer.`}
                    confirmText="Sí, eliminar"
                    cancelText="Cancelar"
                    variant="destructive"
                    onConfirm={() => handleDeleteContact(selectedContact.id)}
                  />
                </div>
              </div>

              {/* Botones para desktop */}
              <div className="hidden lg:flex justify-end gap-2">
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedContact.id, selectedContact.status)
                    setIsViewDialogOpen(false)
                  }}
                >
                  Guardar Notas
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para responder */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Responder a {selectedContact?.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mensaje Original</label>
              <p className="text-muted-foreground bg-muted rounded-lg p-3 text-sm">
                {selectedContact?.message}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Tu Respuesta</label>
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                Enviar Respuesta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
