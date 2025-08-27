export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-600">Cargando Montañez Lab...</p>

        {/* Dental Icon */}
        <div className="mt-6 text-2xl opacity-60 dark:opacity-80 dark:text-teal-400">🦷</div>
      </div>
    </div>
  )
}
