'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-bold text-gray-800">¡Oops! Algo salió mal</h1>

        <p className="mx-auto mb-8 max-w-md text-lg text-gray-600">
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente o contacta con nuestro
          soporte técnico.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <RefreshCw className="mr-2 h-5 w-5" />
            Intentar nuevamente
          </Button>

          <Button asChild variant="outline" size="lg">
            <a href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Ir al Inicio
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
