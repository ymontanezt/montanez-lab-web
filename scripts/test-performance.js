#!/usr/bin/env node

/**
 * Script para probar el rendimiento de las páginas de servicios
 * Uso: node scripts/test-performance.js
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

// Configuración
const config = {
  baseUrl: 'http://localhost:3000',
  services: [
    '/servicios/protesis-digitales',
    '/servicios/implantologia-avanzada',
    '/servicios/ortodoncia-personalizada',
    '/servicios/estetica-dental',
    '/servicios/odontopediatria',
    '/servicios/urgencias-24-7',
  ],
  iterations: 3,
  timeout: 10000,
}

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

// Función para hacer request HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const protocol = url.startsWith('https:') ? https : http

    const req = protocol.get(url, res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        const endTime = Date.now()
        const responseTime = endTime - startTime

        resolve({
          statusCode: res.statusCode,
          responseTime,
          contentLength: data.length,
          headers: res.headers,
        })
      })
    })

    req.on('error', error => {
      reject(error)
    })

    req.setTimeout(config.timeout, () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

// Función para calcular estadísticas
function calculateStats(times) {
  const sorted = times.sort((a, b) => a - b)
  const sum = times.reduce((acc, time) => acc + time, 0)
  const mean = sum / times.length
  const median = sorted[Math.floor(sorted.length / 2)]
  const min = sorted[0]
  const max = sorted[sorted.length - 1]

  // Desviación estándar
  const variance = times.reduce((acc, time) => acc + Math.pow(time - mean, 2), 0) / times.length
  const stdDev = Math.sqrt(variance)

  return { mean, median, min, max, stdDev }
}

// Función para formatear tiempo
function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`
  return `${(ms / 60000).toFixed(2)}m`
}

// Función para mostrar resultados
function displayResults(results) {
  console.log('\n' + '='.repeat(80))
  console.log(`${colors.bright}${colors.cyan}RESULTADOS DE PRUEBAS DE RENDIMIENTO${colors.reset}`)
  console.log('='.repeat(80))

  let totalRequests = 0
  let successfulRequests = 0
  let totalResponseTime = 0

  results.forEach((result, index) => {
    const serviceName = config.services[index]
    console.log(`\n${colors.bright}${colors.yellow}${serviceName}${colors.reset}`)
    console.log('-'.repeat(serviceName.length))

    if (result.success) {
      successfulRequests++
      const stats = calculateStats(result.responseTimes)

      console.log(`✅ Estado: ${colors.green}Exitoso${colors.reset}`)
      console.log(`📊 Promedio: ${colors.cyan}${formatTime(stats.mean)}${colors.reset}`)
      console.log(`📈 Mediana: ${colors.cyan}${formatTime(stats.median)}${colors.reset}`)
      console.log(`📉 Mínimo: ${colors.cyan}${formatTime(stats.min)}${colors.reset}`)
      console.log(`📈 Máximo: ${colors.cyan}${formatTime(stats.max)}${colors.reset}`)
      console.log(`📊 Desv. Est.: ${colors.cyan}${formatTime(stats.stdDev)}${colors.reset}`)
      console.log(
        `📏 Tamaño: ${colors.cyan}${(result.avgContentLength / 1024).toFixed(2)}KB${colors.reset}`
      )

      totalResponseTime += stats.mean
    } else {
      console.log(`❌ Estado: ${colors.red}Fallido${colors.reset}`)
      console.log(`🚫 Error: ${colors.red}${result.error.message}${colors.reset}`)
    }

    totalRequests++
  })

  // Resumen general
  console.log('\n' + '='.repeat(80))
  console.log(`${colors.bright}${colors.magenta}RESUMEN GENERAL${colors.reset}`)
  console.log('='.repeat(80))

  const successRate = (successfulRequests / totalRequests) * 100
  const avgResponseTime = totalResponseTime / successfulRequests

  console.log(`📊 Total de Pruebas: ${colors.cyan}${totalRequests}${colors.reset}`)
  console.log(`✅ Exitosas: ${colors.green}${successfulRequests}${colors.reset}`)
  console.log(`❌ Fallidas: ${colors.red}${totalRequests - successfulRequests}${colors.reset}`)
  console.log(`📈 Tasa de Éxito: ${colors.cyan}${successRate.toFixed(1)}%${colors.reset}`)
  console.log(`⚡ Tiempo Promedio: ${colors.cyan}${formatTime(avgResponseTime)}${colors.reset}`)

  // Evaluación de rendimiento
  console.log('\n' + '='.repeat(80))
  console.log(`${colors.bright}${colors.blue}EVALUACIÓN DE RENDIMIENTO${colors.reset}`)
  console.log('='.repeat(80))

  if (avgResponseTime < 500) {
    console.log(`🎉 ${colors.green}EXCELENTE: Navegación instantánea (<500ms)${colors.reset}`)
  } else if (avgResponseTime < 1000) {
    console.log(`🚀 ${colors.green}MUY BUENO: Navegación rápida (<1s)${colors.reset}`)
  } else if (avgResponseTime < 2000) {
    console.log(`👍 ${colors.yellow}BUENO: Navegación aceptable (<2s)${colors.reset}`)
  } else if (avgResponseTime < 3000) {
    console.log(`⚠️  ${colors.yellow}REGULAR: Navegación lenta (<3s)${colors.reset}`)
  } else {
    console.log(`🐌 ${colors.red}LENTO: Navegación muy lenta (>3s)${colors.reset}`)
  }

  // Recomendaciones
  console.log('\n' + '='.repeat(80))
  console.log(`${colors.bright}${colors.cyan}RECOMENDACIONES${colors.reset}`)
  console.log('='.repeat(80))

  if (avgResponseTime > 2000) {
    console.log(`🔧 ${colors.yellow}Considerar implementar:${colors.reset}`)
    console.log(`   • Generación estática de páginas`)
    console.log(`   • Optimización de imágenes`)
    console.log(`   • Lazy loading de componentes`)
    console.log(`   • Caché de navegación`)
  } else if (avgResponseTime > 1000) {
    console.log(`🔧 ${colors.yellow}Mejoras menores:${colors.reset}`)
    console.log(`   • Optimización de bundles`)
    console.log(`   • Preload de recursos críticos`)
  } else {
    console.log(`🎯 ${colors.green}¡Excelente rendimiento!${colors.reset}`)
    console.log(`   • Mantener las optimizaciones actuales`)
    console.log(`   • Monitorear métricas regularmente`)
  }
}

// Función principal
async function runPerformanceTest() {
  console.log(`${colors.bright}${colors.blue}🚀 INICIANDO PRUEBAS DE RENDIMIENTO${colors.reset}`)
  console.log(`${colors.cyan}URL Base: ${config.baseUrl}${colors.reset}`)
  console.log(`${colors.cyan}Servicios a probar: ${config.services.length}${colors.reset}`)
  console.log(`${colors.cyan}Iteraciones por servicio: ${config.iterations}${colors.reset}`)
  console.log(`${colors.cyan}Timeout: ${config.timeout}ms${colors.reset}\n`)

  const results = []

  for (let i = 0; i < config.services.length; i++) {
    const service = config.services[i]
    const url = `${config.baseUrl}${service}`

    console.log(`${colors.yellow}🔄 Probando: ${service}${colors.reset}`)

    const responseTimes = []
    const contentLengths = []
    let success = false
    let error = null

    try {
      for (let j = 0; j < config.iterations; j++) {
        const result = await makeRequest(url)
        responseTimes.push(result.responseTime)
        contentLengths.push(result.contentLength)

        process.stdout.write(`  ${j + 1}/${config.iterations} - ${formatTime(result.responseTime)}`)

        if (j < config.iterations - 1) {
          process.stdout.write(' | ')
        }
      }

      success = true
      const avgContentLength =
        contentLengths.reduce((acc, len) => acc + len, 0) / contentLengths.length

      results.push({
        success: true,
        responseTimes,
        avgContentLength,
      })

      console.log(`\n  ✅ ${colors.green}Completado${colors.reset}`)
    } catch (err) {
      error = err
      results.push({
        success: false,
        error,
      })

      console.log(`\n  ❌ ${colors.red}Error: ${err.message}${colors.reset}`)
    }

    // Pausa entre servicios
    if (i < config.services.length - 1) {
      console.log(`  ⏳ Esperando 1 segundo...\n`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  // Mostrar resultados
  displayResults(results)

  // Guardar resultados en archivo
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `performance-test-${timestamp}.json`

  const report = {
    timestamp: new Date().toISOString(),
    config,
    results,
    summary: {
      totalRequests: config.services.length * config.iterations,
      successfulRequests: results.filter(r => r.success).length,
      successRate: (results.filter(r => r.success).length / config.services.length) * 100,
      avgResponseTime:
        results
          .filter(r => r.success)
          .reduce((acc, r) => acc + calculateStats(r.responseTimes).mean, 0) /
        results.filter(r => r.success).length,
    },
  }

  fs.writeFileSync(filename, JSON.stringify(report, null, 2))
  console.log(`\n📄 ${colors.cyan}Reporte guardado en: ${filename}${colors.reset}`)
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  runPerformanceTest().catch(console.error)
}

module.exports = { runPerformanceTest, calculateStats, formatTime }
