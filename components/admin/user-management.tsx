'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  updateAdminStatus,
  updateAdminPermissions,
  getDefaultPermissions,
  type AdminData,
  type CreateAdminData,
  type AdminPermissions,
} from '@/lib/firebase/admins'
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  Crown,
  User,
  UserCheck,
  UserX,
  Search,
  Filter,
  RotateCcw,
  Loader2,
  Settings,
  Phone,
  Mail,
  Calendar,
  Clock,
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function UserManagement() {
  const [admins, setAdmins] = useState<AdminData[]>([])
  const [filteredAdmins, setFilteredAdmins] = useState<AdminData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [createData, setCreateData] = useState<CreateAdminData>({
    email: '',
    name: '',
    password: '',
    role: 'viewer',
    phone: '',
    department: '',
  })
  const [editData, setEditData] = useState<Partial<AdminData>>({})
  const [tempPermissions, setTempPermissions] = useState<AdminPermissions | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    loadAdmins()
  }, [])

  useEffect(() => {
    filterAdmins()
  }, [admins, searchTerm, roleFilter, statusFilter])

  const loadAdmins = async () => {
    setLoading(true)
    try {
      const adminList = await getAllAdmins()
      setAdmins(adminList)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los administradores',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filterAdmins = () => {
    let filtered = admins

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        admin =>
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.department?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(admin => admin.role === roleFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(admin => admin.status === statusFilter)
    }

    setFilteredAdmins(filtered)
  }

  const handleCreateAdmin = async () => {
    try {
      if (!createData.email || !createData.name || !createData.password) {
        toast({
          title: 'Error',
          description: 'Completa todos los campos requeridos',
          variant: 'destructive',
        })
        return
      }

      await createAdmin(createData, user?.email || 'unknown')
      await loadAdmins()
      setIsCreateDialogOpen(false)
      setCreateData({
        email: '',
        name: '',
        password: '',
        role: 'viewer',
        phone: '',
        department: '',
      })
      toast({
        title: 'Administrador creado',
        description: 'El nuevo administrador ha sido creado exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear el administrador',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateAdmin = async () => {
    if (!selectedAdmin?.id) return

    try {
      await updateAdmin(selectedAdmin.id, editData)
      await loadAdmins()
      setIsEditDialogOpen(false)
      setEditData({})
      toast({
        title: 'Administrador actualizado',
        description: 'Los cambios han sido guardados exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar el administrador',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateStatus = async (adminId: string, status: AdminData['status']) => {
    try {
      await updateAdminStatus(adminId, status)
      await loadAdmins()
      toast({
        title: 'Estado actualizado',
        description: 'El estado del administrador ha sido actualizado',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar el estado',
        variant: 'destructive',
      })
    }
  }

  const handleUpdatePermissions = async () => {
    if (!selectedAdmin?.id || !tempPermissions) return

    try {
      await updateAdminPermissions(selectedAdmin.id, tempPermissions)
      await loadAdmins()
      setIsPermissionsDialogOpen(false)
      setTempPermissions(null)
      toast({
        title: 'Permisos actualizados',
        description: 'Los permisos han sido actualizados exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudieron actualizar los permisos',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteAdmin = async (adminId: string, adminEmail: string) => {
    if (adminEmail === user?.email) {
      toast({
        title: 'Error',
        description: 'No puedes eliminar tu propia cuenta',
        variant: 'destructive',
      })
      return
    }

    try {
      await deleteAdmin(adminId)
      await loadAdmins()
      toast({
        title: 'Administrador eliminado',
        description: 'El administrador ha sido eliminado exitosamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo eliminar el administrador',
        variant: 'destructive',
      })
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin'
      case 'admin':
        return 'Administrador'
      case 'moderator':
        return 'Moderador'
      case 'viewer':
        return 'Visualizador'
      default:
        return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'admin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'moderator':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'viewer':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo'
      case 'inactive':
        return 'Inactivo'
      case 'suspended':
        return 'Suspendido'
      default:
        return status
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="h-4 w-4" />
      case 'admin':
        return <Shield className="h-4 w-4" />
      case 'moderator':
        return <UserCheck className="h-4 w-4" />
      case 'viewer':
        return <Eye className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  // Función helper para formatear fechas de manera segura
  const formatDate = (
    dateString: string | undefined,
    formatString: string = 'dd/MM/yyyy'
  ): string => {
    if (!dateString) return 'Fecha no disponible'

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Fecha inválida'
      return format(date, formatString, { locale: es })
    } catch (error) {
      return 'Fecha inválida'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Cargando administradores...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Gestión de Usuarios Administradores</h3>
          <p className="text-muted-foreground">Administra usuarios, roles y permisos del sistema</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={loadAdmins} variant="outline" disabled={loading}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Admin
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative mt-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Nombre, email, departamento..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Rol</label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="moderator">Moderador</SelectItem>
                <SelectItem value="viewer">Visualizador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Estado</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
                <SelectItem value="suspended">Suspendidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Badge variant="secondary" className="text-sm">
              {filteredAdmins.length} de {admins.length} usuarios
            </Badge>
          </div>
        </div>
      </Card>

      {/* Lista de administradores */}
      <div className="space-y-4">
        {filteredAdmins.map(admin => (
          <motion.div
            key={admin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      {getRoleIcon(admin.role)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{admin.name}</h3>
                        <Badge className={getRoleColor(admin.role)}>
                          {getRoleLabel(admin.role)}
                        </Badge>
                        <Badge className={getStatusColor(admin.status)}>
                          {getStatusLabel(admin.status)}
                        </Badge>
                        {admin.email === user?.email && <Badge variant="outline">Tú</Badge>}
                      </div>

                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {admin.email}
                        </div>
                        {admin.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {admin.phone}
                          </div>
                        )}
                        {admin.department && (
                          <div className="flex items-center gap-1">
                            <Settings className="h-3 w-3" />
                            {admin.department}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(admin.createdAt, 'dd/MM/yyyy')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {admin.lastLogin && (
                    <div className="text-muted-foreground text-sm">
                      <Clock className="mr-1 inline h-3 w-3" />
                      Último acceso: {formatDate(admin.lastLogin, 'dd/MM/yyyy HH:mm')}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin)
                      setTempPermissions(admin.permissions)
                      setIsPermissionsDialogOpen(true)
                    }}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin)
                      setEditData({
                        name: admin.name,
                        phone: admin.phone,
                        department: admin.department,
                        role: admin.role,
                      })
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Select
                    value={admin.status}
                    onValueChange={value =>
                      handleUpdateStatus(admin.id!, value as AdminData['status'])
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="suspended">Suspendido</SelectItem>
                    </SelectContent>
                  </Select>

                  {admin.email !== user?.email && (
                    <ConfirmationDialog
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                      title="Eliminar administrador"
                      description={`¿Estás seguro de que quieres eliminar al administrador ${admin.email}? Esta acción no se puede deshacer y perderá todos sus permisos de acceso.`}
                      confirmText="Sí, eliminar"
                      cancelText="Cancelar"
                      variant="destructive"
                      onConfirm={() => handleDeleteAdmin(admin.id!, admin.email)}
                    />
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredAdmins.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            <Users className="mx-auto mb-4 h-12 w-12" />
            <p>No se encontraron administradores con los filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Dialog para crear administrador */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Administrador</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="create-name">Nombre *</Label>
                <Input
                  id="create-name"
                  value={createData.name}
                  onChange={e => setCreateData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <Label htmlFor="create-email">Email *</Label>
                <Input
                  id="create-email"
                  type="email"
                  value={createData.email}
                  onChange={e => setCreateData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="create-password">Contraseña *</Label>
                <div className="relative">
                  <Input
                    id="create-password"
                    type={showPassword ? 'text' : 'password'}
                    value={createData.password}
                    onChange={e => setCreateData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="create-role">Rol *</Label>
                <Select
                  value={createData.role}
                  onValueChange={value => setCreateData(prev => ({ ...prev, role: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="moderator">Moderador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="create-phone">Teléfono</Label>
                <Input
                  id="create-phone"
                  value={createData.phone}
                  onChange={e => setCreateData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+51 989 253 275"
                />
              </div>
              <div>
                <Label htmlFor="create-department">Departamento</Label>
                <Input
                  id="create-department"
                  value={createData.department}
                  onChange={e => setCreateData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Área de trabajo"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAdmin}>Crear Administrador</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar administrador */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Administrador</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-name">Nombre</Label>
                <Input
                  id="edit-name"
                  value={editData.name || ''}
                  onChange={e => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Rol</Label>
                <Select
                  value={editData.role}
                  onValueChange={value => setEditData(prev => ({ ...prev, role: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="moderator">Moderador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-phone">Teléfono</Label>
                <Input
                  id="edit-phone"
                  value={editData.phone || ''}
                  onChange={e => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+51 989 253 275"
                />
              </div>
              <div>
                <Label htmlFor="edit-department">Departamento</Label>
                <Input
                  id="edit-department"
                  value={editData.department || ''}
                  onChange={e => setEditData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Área de trabajo"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateAdmin}>Guardar Cambios</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para permisos */}
      <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gestionar Permisos - {selectedAdmin?.name}</DialogTitle>
          </DialogHeader>

          {tempPermissions && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(tempPermissions).map(([permission, enabled]) => (
                  <div key={permission} className="flex items-center justify-between">
                    <div>
                      <Label htmlFor={permission} className="capitalize">
                        {permission.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                    <Switch
                      id={permission}
                      checked={enabled}
                      onCheckedChange={checked =>
                        setTempPermissions(prev =>
                          prev ? { ...prev, [permission]: checked } : null
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdatePermissions}>Guardar Permisos</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
