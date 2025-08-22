'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  FileText,
} from 'lucide-react'

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts'

interface DashboardChartsProps {
  contacts: any[]
  appointments: any[]
  stats: any
}

export function RechartsDashboard({ contacts, appointments, stats }: DashboardChartsProps) {
  // Preparar datos para contactos por estado
  const contactsData = () => {
    const statusCount = contacts.reduce((acc: any, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
      return acc
    }, {})

    const statusMap: { [key: string]: { name: string; color: string } } = {
      new: { name: 'Nuevos', color: '#3B82F6' },
      read: { name: 'Leídos', color: '#F59E0B' },
      replied: { name: 'Respondidos', color: '#10B981' },
      archived: { name: 'Archivados', color: '#6B7280' },
    }

    return Object.entries(statusCount).map(([status, count]) => ({
      name: statusMap[status]?.name || status,
      value: count as number,
      color: statusMap[status]?.color || '#6B7280',
    }))
  }

  // Preparar datos para citas por estado
  const appointmentsData = () => {
    const statusCount = appointments.reduce((acc: any, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1
      return acc
    }, {})

    const statusMap: { [key: string]: { name: string; color: string } } = {
      pending: { name: 'Pendientes', color: '#F59E0B' },
      confirmed: { name: 'Confirmadas', color: '#3B82F6' },
      completed: { name: 'Completadas', color: '#10B981' },
      cancelled: { name: 'Canceladas', color: '#EF4444' },
    }

    return Object.entries(statusCount).map(([status, count]) => ({
      name: statusMap[status]?.name || status,
      value: count as number,
      fill: statusMap[status]?.color || '#6B7280',
    }))
  }

  // Preparar datos para servicios
  const servicesData = () => {
    const serviceCount = appointments.reduce((acc: any, appointment) => {
      acc[appointment.service] = (acc[appointment.service] || 0) + 1
      return acc
    }, {})

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

    return Object.entries(serviceCount).map(([service, count], index) => ({
      name: service,
      value: count as number,
      fill: colors[index % colors.length],
    }))
  }

  // Preparar datos para tendencias temporales
  const trendsData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        day: date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
      }
    })

    return last7Days.map(({ day, fullDate }) => {
      const dayContacts = contacts.filter(c => {
        try {
          const contactDate = new Date(c.createdAt).toISOString().split('T')[0]
          return contactDate === fullDate
        } catch {
          return false
        }
      }).length

      const dayAppointments = appointments.filter(a => {
        try {
          const appointmentDate = new Date(a.createdAt || a.date).toISOString().split('T')[0]
          return appointmentDate === fullDate
        } catch {
          return false
        }
      }).length

      return {
        day,
        contactos: dayContacts,
        citas: dayAppointments,
      }
    })
  }

  // Componente personalizado para tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Componente personalizado para etiquetas del pie
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null // No mostrar etiquetas menores al 5%

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  console.log('📊 RECHARTS: Datos preparados:', {
    contactsCount: contacts.length,
    appointmentsCount: appointments.length,
    contactsData: contactsData(),
    appointmentsData: appointmentsData(),
    servicesData: servicesData(),
    trendsData: trendsData(),
  })

  return (
    <div className="space-y-6">
      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contactos</CardTitle>
              <MessageSquare className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
              <p className="text-muted-foreground text-xs">
                {contacts.filter(c => c.status === 'new').length} nuevos
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
              <Calendar className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-muted-foreground text-xs">
                {appointments.filter(a => a.status === 'pending').length} pendientes
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Respuesta</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.length > 0
                  ? Math.round(
                      (contacts.filter(c => c.status === 'replied').length / contacts.length) * 100
                    )
                  : 0}
                %
              </div>
              <p className="text-muted-foreground text-xs">Contactos respondidos</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Confirmadas</CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.length > 0
                  ? Math.round(
                      (appointments.filter(a => a.status === 'confirmed').length /
                        appointments.length) *
                        100
                    )
                  : 0}
                %
              </div>
              <p className="text-muted-foreground text-xs">Tasa de confirmación</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Gráficos */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Contactos
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Citas
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tendencias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contactos por Estado</CardTitle>
                <CardDescription>Distribución de contactos según su estado actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={contactsData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contactsData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citas por Estado</CardTitle>
                <CardDescription>Distribución de citas según su estado actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentsData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Contactos</CardTitle>
              <CardDescription>Métricas detalladas de los contactos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {contacts.filter(c => c.status === 'new').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Nuevos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {contacts.filter(c => c.status === 'read').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Leídos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {contacts.filter(c => c.status === 'replied').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Respondidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {contacts.filter(c => c.status === 'archived').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Archivados</div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={contactsData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contactsData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Citas</CardTitle>
              <CardDescription>Métricas detalladas de las citas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {appointments.filter(a => a.status === 'pending').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Pendientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Confirmadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {appointments.filter(a => a.status === 'completed').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Completadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {appointments.filter(a => a.status === 'cancelled').length}
                  </div>
                  <div className="text-muted-foreground text-sm">Canceladas</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="mb-4 font-medium">Citas por Estado</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={appointmentsData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 font-medium">Citas por Servicio</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={servicesData()}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {servicesData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias Temporales</CardTitle>
              <CardDescription>
                Evolución de contactos y citas en los últimos 7 días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="contactos"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="citas"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
