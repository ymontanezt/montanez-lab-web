'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-2xl text-center">
        {/* Icono animado */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 shadow-2xl dark:from-slate-700 dark:to-slate-600"
        >
          <AlertTriangle className="h-16 w-16 text-blue-600 dark:text-blue-400" />
        </motion.div>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-6xl font-bold text-slate-800 md:text-7xl lg:text-8xl dark:text-slate-100"
        >
          404
        </motion.h1>

        {/* Subtítulo */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 text-2xl font-semibold text-slate-700 md:text-3xl dark:text-slate-200"
        >
          ¡Ups! Página no encontrada
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 text-lg text-slate-600 md:text-xl dark:text-slate-300"
        >
          La página que buscas no existe o ha sido movida.
          <br className="hidden md:block" />
          No te preocupes, te ayudamos a encontrar el camino de vuelta.
        </motion.p>

        {/* Botón de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center"
        >
          {/* Botón principal - Ir al inicio */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
          >
            <Home className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Ir al Inicio
          </Link>
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 rounded-2xl border border-slate-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50"
        >
          <h3 className="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-200">
            ¿Necesitas ayuda?
          </h3>
          <p className="mb-4 text-slate-600 dark:text-slate-300">
            Si crees que esto es un error, puedes contactarnos directamente.
          </p>
          <a
            href="tel:+51969960969"
            className="inline-flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Llamar a Soporte
          </a>
        </motion.div>

        {/* Decoración de fondo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/20"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-slate-100/30 blur-3xl dark:bg-slate-800/20"></div>
        </div>
      </div>
    </div>
  )
}
