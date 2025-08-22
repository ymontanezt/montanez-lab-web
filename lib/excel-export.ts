// Servicio de exportación a Excel con gráficos
// Utiliza xlsx para crear archivos Excel profesionales

import * as XLSX from 'xlsx'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export interface ExcelExportData {
  contacts: any[]
  appointments: any[]
  stats: any
  period: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

export class ExcelExporter {
  private workbook: XLSX.WorkBook
  private currentRow: number

  constructor() {
    this.workbook = XLSX.utils.book_new()
    this.currentRow = 0
  }

  /**
   * Exportar dashboard completo a Excel
   */
  async exportDashboard(data: ExcelExportData): Promise<void> {
    try {
      // Limpiar y validar datos antes de exportar
      const cleanData = this.cleanAndValidateData(data)

      // Crear hoja de resumen
      this.createSummarySheet(cleanData)

      // Crear hoja de contactos
      this.createContactsSheet(cleanData.contacts)

      // Crear hoja de citas
      this.createAppointmentsSheet(cleanData.appointments)

      // Crear hoja de estadísticas
      this.createStatsSheet(cleanData.stats)

      // Crear hoja de gráficos
      this.createChartsSheet(cleanData)

      // Crear hoja de análisis
      this.createAnalysisSheet(cleanData)

      // Generar y descargar archivo
      this.downloadFile('Dashboard_Completo')
    } catch (error) {
      console.error('Error exportando a Excel:', error)
      throw new Error('No se pudo exportar el dashboard a Excel')
    }
  }

  /**
   * Limpiar y validar datos antes de la exportación
   */
  private cleanAndValidateData(data: ExcelExportData): ExcelExportData {
    const cleanContacts = data.contacts
      .filter(contact => {
        // Validar que el contacto tenga los campos mínimos requeridos
        return contact && typeof contact === 'object' && contact.id && contact.name && contact.email
      })
      .map(contact => ({
        ...contact,
        // Asegurar que las fechas sean válidas
        createdAt: this.validateDate(contact.createdAt),
        // Asegurar que otros campos tengan valores por defecto
        status: contact.status || 'new',
        priority: contact.priority || 'medium',
        phone: contact.phone || 'Sin teléfono',
        subject: contact.subject || 'Sin asunto',
        message: contact.message || 'Sin mensaje',
      }))

    const cleanAppointments = data.appointments
      .filter(appointment => {
        // Validar que la cita tenga los campos mínimos requeridos
        return (
          appointment &&
          typeof appointment === 'object' &&
          appointment.id &&
          appointment.name &&
          appointment.email
        )
      })
      .map(appointment => ({
        ...appointment,
        // Asegurar que las fechas sean válidas
        date: this.validateDate(appointment.date),
        createdAt: this.validateDate(appointment.createdAt),
        // Asegurar que otros campos tengan valores por defecto
        status: appointment.status || 'pending',
        service: appointment.service || 'Sin servicio',
        time: appointment.time || 'Sin hora',
        notes: appointment.notes || 'Sin notas',
      }))

    return {
      contacts: cleanContacts,
      appointments: cleanAppointments,
      stats: data.stats || {},
      period: data.period || 'General',
    }
  }

  /**
   * Validar y normalizar una fecha
   */
  private validateDate(dateString: any): string {
    if (!dateString) return new Date().toISOString()

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        console.warn('Fecha inválida encontrada, usando fecha actual:', dateString)
        return new Date().toISOString()
      }
      return date.toISOString()
    } catch (error) {
      console.warn('Error validando fecha, usando fecha actual:', dateString, error)
      return new Date().toISOString()
    }
  }

  /**
   * Crear hoja de resumen ejecutivo
   */
  private createSummarySheet(data: ExcelExportData): void {
    const summaryData = [
      ['DASHBOARD DENTAL LAB PRO - RESUMEN EJECUTIVO'],
      [''],
      ['Fecha de Exportación:', format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es })],
      ['Período:', data.period || 'General'],
      [''],
      ['RESUMEN GENERAL'],
      ['Total Contactos:', data.contacts.length],
      ['Total Citas:', data.appointments.length],
      [''],
      ['CONTACTOS POR ESTADO'],
      ...this.getContactsByStatus(data.contacts),
      [''],
      ['CITAS POR ESTADO'],
      ...this.getAppointmentsByStatus(data.appointments),
      [''],
      ['CITAS POR SERVICIO'],
      ...this.getAppointmentsByService(data.appointments),
      [''],
      ['MÉTRICAS DE RENDIMIENTO'],
      ['Tasa de Respuesta:', this.calculateResponseRate(data.contacts) + '%'],
      ['Citas Confirmadas:', this.calculateConfirmedRate(data.appointments) + '%'],
      ['Promedio de Contactos por Día:', this.calculateDailyAverage(data.contacts)],
      ['Promedio de Citas por Día:', this.calculateDailyAverage(data.appointments)],
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(summaryData)

    // Aplicar estilos
    this.applySummaryStyles(worksheet)

    XLSX.utils.book_append_sheet(this.workbook, worksheet, 'Resumen Ejecutivo')
  }

  /**
   * Crear hoja de contactos
   */
  private createContactsSheet(contacts: any[]): void {
    if (contacts.length === 0) return

    const headers = [
      'ID',
      'Nombre',
      'Email',
      'Teléfono',
      'Asunto',
      'Estado',
      'Prioridad',
      'Fecha de Creación',
      'Mensaje',
      'Notas del Admin',
    ]

    const contactData = contacts.map(contact => [
      contact.id,
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      this.translateStatus(contact.status),
      this.translatePriority(contact.priority),
      this.formatDate(contact.createdAt),
      contact.message,
      contact.adminNotes || '',
    ])

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...contactData])

    // Aplicar estilos
    this.applyDataTableStyles(worksheet, 'Contactos')

    XLSX.utils.book_append_sheet(this.workbook, worksheet, 'Contactos')
  }

  /**
   * Crear hoja de citas
   */
  private createAppointmentsSheet(appointments: any[]): void {
    if (appointments.length === 0) return

    const headers = [
      'ID',
      'Nombre',
      'Email',
      'Teléfono',
      'Servicio',
      'Fecha',
      'Hora',
      'Estado',
      'Notas',
      'Fecha de Creación',
    ]

    const appointmentData = appointments.map(appointment => [
      appointment.id,
      appointment.name,
      appointment.email,
      appointment.phone,
      appointment.service,
      this.formatDate(appointment.date),
      appointment.time,
      this.translateStatus(appointment.status),
      appointment.notes || '',
      this.formatDate(appointment.createdAt),
    ])

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...appointmentData])

    // Aplicar estilos
    this.applyDataTableStyles(worksheet, 'Citas')

    XLSX.utils.book_append_sheet(this.workbook, worksheet, 'Citas')
  }

  /**
   * Crear hoja de estadísticas
   */
  private createStatsSheet(stats: any): void {
    if (!stats) return

    const statsData = [
      ['ESTADÍSTICAS DEL DASHBOARD'],
      [''],
      ['MÉTRICAS GENERALES'],
      ['Total de Contactos:', stats.contacts?.total || 0],
      ['Contactos Nuevos:', stats.contacts?.new || 0],
      ['Contactos Leídos:', stats.contacts?.read || 0],
      ['Contactos Respondidos:', stats.contacts?.replied || 0],
      [''],
      ['Total de Citas:', stats.appointments?.total || 0],
      ['Citas Pendientes:', stats.appointments?.pending || 0],
      ['Citas Confirmadas:', stats.appointments?.confirmed || 0],
      ['Citas Completadas:', stats.appointments?.completed || 0],
      [''],
      ['CRECIMIENTO Y TENDENCIAS'],
      ['Crecimiento Semanal Contactos:', (stats.contacts?.growth || 0) + '%'],
      ['Crecimiento Semanal Citas:', (stats.appointments?.growth || 0) + '%'],
      ['Tasa de Conversión:', (stats.conversionRate || 0) + '%'],
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(statsData)

    // Aplicar estilos
    this.applySummaryStyles(worksheet)

    XLSX.utils.book_append_sheet(this.workbook, worksheet, 'Estadísticas')
  }

  /**
   * Crear hoja de gráficos (datos para gráficos)
   */
  private createChartsSheet(data: ExcelExportData): void {
    const chartData = [
      ['DATOS PARA GRÁFICOS'],
      [''],
      ['CONTACTOS POR ESTADO - DATOS'],
      ['Estado', 'Cantidad', 'Porcentaje'],
      ...this.getContactsByStatusForCharts(data.contacts),
      [''],
      ['CITAS POR ESTADO - DATOS'],
      ['Estado', 'Cantidad', 'Porcentaje'],
      ...this.getAppointmentsByStatusForCharts(data.appointments),
      [''],
      ['CITAS POR SERVICIO - DATOS'],
      ['Servicio', 'Cantidad', 'Porcentaje'],
      ...this.getAppointmentsByServiceForCharts(data.appointments),
      [''],
      ['EVOLUCIÓN TEMPORAL'],
      ['Fecha', 'Contactos', 'Citas'],
      ...this.getTemporalEvolution(data.contacts, data.appointments),
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(chartData)

    // Aplicar estilos
    this.applyDataTableStyles(worksheet, 'Datos para Gráficos')

    XLSX.utils.book_append_sheet(this.workbook, worksheet, 'Datos para Gráficos')
  }

  /**
   * Crear hoja de análisis
   */
  private createAnalysisSheet(data: ExcelExportData): void {
    const analysisData = [
      ['ANÁLISIS Y RECOMENDACIONES'],
      [''],
      ['ANÁLISIS DE CONTACTOS'],
      ['Total de Consultas:', data.contacts.length],
      ['Consultas por Responder:', data.contacts.filter(c => c.status === 'new').length],
      ['Tiempo Promedio de Respuesta:', this.calculateAverageResponseTime(data.contacts)],
      ['Consultas de Alta Prioridad:', data.contacts.filter(c => c.priority === 'high').length],
      [''],
      ['ANÁLISIS DE CITAS'],
      ['Total de Citas:', data.appointments.length],
      [
        'Citas Pendientes de Confirmación:',
        data.appointments.filter(a => a.status === 'pending').length,
      ],
      ['Tasa de Confirmación:', this.calculateConfirmedRate(data.appointments) + '%'],
      ['Servicio Más Solicitado:', this.getMostRequestedService(data.appointments)],
      [''],
      ['RECOMENDACIONES'],
      ['1. Priorizar respuestas a consultas nuevas'],
      ['2. Confirmar citas pendientes'],
      ['3. Revisar consultas de alta prioridad'],
      ['4. Analizar servicios más demandados'],
      ['5. Optimizar tiempos de respuesta'],
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(analysisData)

    // Aplicar estilos
    this.applySummaryStyles(worksheet)

    XLSX.utils.book_append_sheet(this.workbook, worksheet, 'Análisis')
  }

  /**
   * Aplicar estilos a la hoja de resumen
   */
  private applySummaryStyles(worksheet: XLSX.WorkSheet): void {
    // Establecer ancho de columnas
    const colWidths = [{ wch: 30 }, { wch: 20 }]
    worksheet['!cols'] = colWidths

    // Aplicar estilos a celdas específicas
    if (worksheet['A1']) {
      worksheet['A1'].s = {
        font: { bold: true, size: 16, color: { rgb: '1F4E79' } },
        alignment: { horizontal: 'center' },
      }
    }
  }

  /**
   * Aplicar estilos a tablas de datos
   */
  private applyDataTableStyles(worksheet: XLSX.WorkSheet, title: string): void {
    // Establecer ancho de columnas
    const colWidths = [
      { wch: 15 },
      { wch: 25 },
      { wch: 30 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 40 },
      { wch: 20 },
    ]
    worksheet['!cols'] = colWidths

    // Aplicar estilos al título
    if (worksheet['A1']) {
      worksheet['A1'].s = {
        font: { bold: true, size: 14, color: { rgb: '2E7D32' } },
        alignment: { horizontal: 'center' },
      }
    }

    // Aplicar estilos a los headers
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1')
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: col })
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true, color: { rgb: 'FFFFFF' } },
          fill: { fgColor: { rgb: '1976D2' } },
          alignment: { horizontal: 'center' },
        }
      }
    }
  }

  /**
   * Descargar archivo Excel
   */
  private downloadFile(baseName: string): void {
    const fileName = `${baseName}_${format(new Date(), 'dd-MM-yyyy_HH-mm')}.xlsx`

    XLSX.writeFile(this.workbook, fileName)
  }

  // Funciones helper para procesar datos
  private getContactsByStatus(contacts: any[]): [string, number][] {
    const statusCount = contacts.reduce((acc: any, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
      return acc
    }, {})

    return Object.entries(statusCount).map(([status, count]) => [
      this.translateStatus(status),
      count as number,
    ])
  }

  private getAppointmentsByStatus(appointments: any[]): [string, number][] {
    const statusCount = appointments.reduce((acc: any, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
      return acc
    }, {})

    return Object.entries(statusCount).map(([status, count]) => [
      this.translateStatus(status),
      count as number,
    ])
  }

  private getAppointmentsByService(appointments: any[]): [string, number][] {
    const serviceCount = appointments.reduce((acc: any, appointment) => {
      acc[appointment.service] = (acc[appointment.service] || 0) + 1
      return acc
    }, {})

    return Object.entries(serviceCount).map(([service, count]) => [service, count as number])
  }

  private getContactsByStatusForCharts(contacts: any[]): [string, number, string][] {
    const statusCount = contacts.reduce((acc: any, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
      return acc
    }, {})

    const total = contacts.length
    return Object.entries(statusCount).map(([status, count]) => [
      this.translateStatus(status),
      count as number,
      total > 0 ? (((count as number) / total) * 100).toFixed(1) + '%' : '0%',
    ])
  }

  private getAppointmentsByStatusForCharts(appointments: any[]): [string, number, string][] {
    const statusCount = appointments.reduce((acc: any, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
      return acc
    }, {})

    const total = appointments.length
    return Object.entries(statusCount).map(([status, count]) => [
      this.translateStatus(status),
      count as number,
      total > 0 ? (((count as number) / total) * 100).toFixed(1) + '%' : '0%',
    ])
  }

  private getAppointmentsByServiceForCharts(appointments: any[]): [string, number, string][] {
    const serviceCount = appointments.reduce((acc: any, appointment) => {
      acc[appointment.service] = (acc[appointment.service] || 0) + 1
      return acc
    }, {})

    const total = appointments.length
    return Object.entries(serviceCount).map(([service, count]) => [
      service,
      count as number,
      total > 0 ? (((count as number) / total) * 100).toFixed(1) + '%' : '0%',
    ])
  }

  private getTemporalEvolution(contacts: any[], appointments: any[]): [string, number, number][] {
    // Agrupar por fecha (últimos 30 días)
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return format(date, 'yyyy-MM-dd')
    }).reverse()

    return last30Days.map(date => [
      format(new Date(date), 'dd/MM/yyyy', { locale: es }),
      contacts.filter(c => {
        try {
          if (!c.createdAt) return false
          const contactDate = new Date(c.createdAt)
          if (isNaN(contactDate.getTime())) return false
          return format(contactDate, 'yyyy-MM-dd') === date
        } catch (error) {
          return false
        }
      }).length,
      appointments.filter(a => {
        try {
          if (!a.date) return false
          const appointmentDate = new Date(a.date)
          if (isNaN(appointmentDate.getTime())) return false
          return format(appointmentDate, 'yyyy-MM-dd') === date
        } catch (error) {
          return false
        }
      }).length,
    ])
  }

  private calculateResponseRate(contacts: any[]): number {
    if (contacts.length === 0) return 0
    const responded = contacts.filter(c => c.status === 'replied').length
    return Math.round((responded / contacts.length) * 100)
  }

  private calculateConfirmedRate(appointments: any[]): number {
    if (appointments.length === 0) return 0
    const confirmed = appointments.filter(a => a.status === 'confirmed').length
    return Math.round((confirmed / appointments.length) * 100)
  }

  private calculateDailyAverage(items: any[]): number {
    if (items.length === 0) return 0

    const dates = items
      .map(item => {
        try {
          const dateString = item.createdAt || item.date
          if (!dateString) return null

          const date = new Date(dateString)
          if (isNaN(date.getTime())) return null

          return format(date, 'yyyy-MM-dd')
        } catch (error) {
          console.warn('Fecha inválida encontrada:', item.createdAt || item.date)
          return null
        }
      })
      .filter(Boolean) // Filtrar fechas nulas

    if (dates.length === 0) return 0

    const uniqueDates = new Set(dates).size
    return uniqueDates > 0 ? Math.round(items.length / uniqueDates) : 0
  }

  private calculateAverageResponseTime(contacts: any[]): string {
    const respondedContacts = contacts.filter(c => c.status === 'replied')
    if (respondedContacts.length === 0) return 'N/A'

    // Simulación de tiempo de respuesta (en producción esto vendría de la base de datos)
    return '24 horas'
  }

  private getMostRequestedService(appointments: any[]): string {
    if (appointments.length === 0) return 'N/A'

    const serviceCount = appointments.reduce((acc: any, appointment) => {
      acc[appointment.service] = (acc[appointment.service] || 0) + 1
      return acc
    }, {})

    const mostRequested = Object.entries(serviceCount).reduce((a, b) =>
      serviceCount[a[0]] > serviceCount[b[0]] ? a : b
    )

    return mostRequested[0]
  }

  private translateStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      new: 'Nuevo',
      read: 'Leído',
      replied: 'Respondido',
      archived: 'Archivado',
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada',
    }
    return statusMap[status] || status
  }

  private translatePriority(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      high: 'Alta',
      medium: 'Media',
      low: 'Baja',
    }
    return priorityMap[priority] || priority
  }

  private formatDate(dateString: string): string {
    try {
      if (!dateString) return 'Sin fecha'

      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Fecha inválida'

      return format(date, 'dd/MM/yyyy HH:mm', { locale: es })
    } catch (error) {
      console.warn('Error formateando fecha:', dateString, error)
      return 'Fecha inválida'
    }
  }
}
