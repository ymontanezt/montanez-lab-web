import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Phone, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceBySlug } from '../../../data'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: 'Servicio no encontrado' }
  }

  return {
    title: `${service.title} - Montañez Lab`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Simple */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Link>
        </div>
      </div>

      {/* Hero Simple */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{service.title}</h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">{service.description}</p>

            {/* Botones de Acción */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/#citas" className="inline-block">
                <Button size="lg" className="bg-green-600 px-8 py-3 text-white hover:bg-green-700">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </Button>
              </a>
              <a href="tel:+1234567890" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 px-8 py-3 text-green-600 hover:bg-green-50"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar Ahora
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Columna Izquierda - Información */}
              <div className="space-y-8">
                {/* Imagen del Servicio */}
                <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/modern-dental-lab.png"
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Características Principales */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">
                      Características del Servicio
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">Precio: {service.price}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">Duración: {service.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Beneficios */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">Beneficios</h3>
                    <div className="space-y-3">
                      {service.benefits?.slice(0, 4).map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Columna Derecha - Proceso */}
              <div className="space-y-8">
                {/* Imagen del Proceso */}
                <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/dental-scanner-workflow.png"
                    alt="Proceso del servicio"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Proceso del Servicio */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">Nuestro Proceso</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Consulta Inicial</h4>
                          <p className="text-sm text-gray-600">
                            Evaluamos tus necesidades y planificamos el tratamiento
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Ejecución</h4>
                          <p className="text-sm text-gray-600">
                            Realizamos el trabajo con la más alta calidad
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Entrega</h4>
                          <p className="text-sm text-gray-600">
                            Entregamos tu trabajo listo para usar
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Final */}
                <Card className="border-0 bg-green-50 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-3 text-xl font-semibold text-gray-900">
                      ¿Listo para comenzar?
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Contáctanos hoy mismo para agendar tu consulta
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                      <a href="/#citas">
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                          <Calendar className="mr-2 h-4 w-4" />
                          Agendar Ahora
                        </Button>
                      </a>
                      <a href="tel:+1234567890">
                        <Button
                          variant="outline"
                          className="border-green-600 text-green-600 hover:bg-green-100"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Llamar
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
