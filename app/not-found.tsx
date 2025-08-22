// Forzar renderizado dinámico para evitar problemas de prerendering
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">404 - Página no encontrada</h1>
        <p className="mb-6 text-gray-600">La página que buscas no existe o ha sido movida.</p>
        <a href="/" className="text-green-600 underline hover:text-green-700">
          Ir al inicio
        </a>
      </div>
    </div>
  )
}
