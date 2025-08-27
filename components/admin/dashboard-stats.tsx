'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  Target,
  Zap,
  FileText,
} from 'lucide-react'
import { getAllContacts } from '@/lib/firebase/contacts'
import { getAllAppointments } from '@/lib/firebase/appointments'

import { useToast } from '@/hooks/use-toast'

interface DashboardStatsProps {
  onStatsLoad: (stats: any) => void
}

const statCards = [
  {
    id: 'contacts',
    title: 'Total Contactos',
    icon: MessageSquare,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconColor: 'text-teal-600',
  },
  {
    id: 'appointments',
    title: 'Total Citas',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
  },
  {
    id: 'response-rate',
    title: 'Tasa de Respuesta',
    icon: CheckCircle,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'conversion-rate',
    title: 'Tasa de Conversión',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
]

export function DashboardStats({ onStatsLoad }: DashboardStatsProps) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadRealStats()
  }, [onStatsLoad])

  const loadRealStats = async () => {
    try {
      setLoading(true)

      // Cargar datos reales de Firebase
      const [contacts, appointments] = await Promise.all([getAllContacts(), getAllAppointments()])

      // Calcular estadísticas reales
      const contactStats = {
        total: contacts.length,
        new: contacts.filter(c => c.status === 'new').length,
        read: contacts.filter(c => c.status === 'read').length,
        replied: contacts.filter(c => c.status === 'replied').length,
        archived: contacts.filter(c => c.status === 'archived').length,
        growth: calculateGrowth(contacts, 'createdAt'),
      }

      const appointmentStats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        confirmed: appointments.filter(a => a.status === 'confirmed').length,
        completed: appointments.filter(a => a.status === 'completed').length,
        cancelled: appointments.filter(a => a.status === 'cancelled').length,
        growth: calculateGrowth(appointments, 'createdAt'),
      }

      // Calcular tasas de rendimiento
      const responseRate =
        contactStats.total > 0 ? Math.round((contactStats.replied / contactStats.total) * 100) : 0

      const conversionRate =
        appointmentStats.total > 0
          ? Math.round((appointmentStats.confirmed / appointmentStats.total) * 100)
          : 0

      const realStats = {
        contacts: contactStats,
        appointments: appointmentStats,
        responseRate,
        conversionRate,
        weeklyGrowth: contactStats.growth,
        monthlyGrowth: appointmentStats.growth,
      }

      setStats(realStats)
      onStatsLoad(realStats)
    } catch (error) {
      console.error('Error cargando estadísticas reales:', error)
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las estadísticas',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateGrowth = (items: any[], dateField: string): number => {
    if (items.length === 0) return 0

    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const thisWeek = items.filter(item => {
      try {
        const itemDate = new Date(item[dateField])
        return !isNaN(itemDate.getTime()) && itemDate >= weekAgo
      } catch {
        return false
      }
    }).length

    const lastWeek = items.filter(item => {
      try {
        const itemDate = new Date(item[dateField])
        return !isNaN(itemDate.getTime()) && itemDate >= twoWeeksAgo && itemDate < weekAgo
      } catch {
        return false
      }
    }).length

    if (lastWeek === 0) return thisWeek > 0 ? 100 : 0
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-1/2 rounded bg-gray-200"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  const getStatValue = (statId: string) => {
    switch (statId) {
      case 'contacts':
        return stats?.contacts?.total || 0
      case 'appointments':
        return stats?.appointments?.total || 0
      case 'response-rate':
        return `${stats?.responseRate || 0}%`
      case 'conversion-rate':
        return `${stats?.conversionRate || 0}%`

      default:
        return 0
    }
  }

  const getStatSubtitle = (statId: string) => {
    switch (statId) {
      case 'contacts':
        return `${stats?.contacts?.new || 0} nuevos`
      case 'appointments':
        return `${stats?.appointments?.pending || 0} pendientes`
      case 'response-rate':
        return 'Contactos respondidos'
      case 'conversion-rate':
        return 'Citas confirmadas'

      default:
        return ''
    }
  }

  const getGrowthIndicator = (statId: string) => {
    let growth = 0
    switch (statId) {
      case 'contacts':
        growth = stats?.contacts?.growth || 0
        break
      case 'appointments':
        growth = stats?.appointments?.growth || 0
        break
      case 'response-rate':
        growth = stats?.weeklyGrowth || 0
        break
      case 'conversion-rate':
        growth = stats?.monthlyGrowth || 0
        break
    }

    if (growth === 0) return null

    const isPositive = growth > 0
    return (
      <Badge
        variant={isPositive ? 'default' : 'destructive'}
        className={`text-xs ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
      >
        <TrendingUp className={`mr-1 h-3 w-3 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
        {isPositive ? '+' : ''}
        {growth}%
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tarjetas de Estadísticas Principales */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <Card
              className={`${stat.bgColor} ${stat.borderColor} border-2 transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`rounded-lg bg-gradient-to-r p-2 ${stat.color} shadow-lg`}>
                    <stat.icon className={`h-6 w-6 text-white`} />
                  </div>
                  {getGrowthIndicator(stat.id)}
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{getStatValue(stat.id)}</div>
                <p className="mt-1 text-xs text-gray-500">{getStatSubtitle(stat.id)}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Resumen de Actividad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-teal-600" />
              Resumen de Actividad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Actividad de Contactos */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-teal-600" />
                  <span className="text-sm font-medium">Contactos</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Nuevos</span>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                      {stats?.contacts?.new || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Leídos</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {stats?.contacts?.read || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Respondidos</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {stats?.contacts?.replied || 0}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Actividad de Citas */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Citas</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pendientes</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {stats?.appointments?.pending || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Confirmadas</span>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                      {stats?.appointments?.confirmed || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completadas</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {stats?.appointments?.completed || 0}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Métricas de Rendimiento */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Rendimiento</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Respuesta</span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {stats?.responseRate || 0}%
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversión</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {stats?.conversionRate || 0}%
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Crecimiento</span>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                      +{stats?.weeklyGrowth || 0}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
