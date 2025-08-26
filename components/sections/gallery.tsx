'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/types'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens, componentColors } from '@/lib/design-system/color-tokens'
import { Filter, X, ChevronLeft, ChevronRight, Calendar, Tag, Eye } from 'lucide-react'
import { GallerySkeleton } from '@/components/ui/skeleton'

interface GalleryProps {
  images: GalleryImage[]
  className?: string
  showTitle?: boolean
  maxItems?: number
  columns?: 2 | 3 | 4
}

export function Gallery({
  images,
  className,
  showTitle = true,
  maxItems = 8,
  columns = 3,
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  // Configuración del accordion
  const initialItems = 4
  const expandedItems = 12

  // Filtrar solo imágenes válidas (con src válido y que existan)
  const validImages = useMemo(() => {
    return images.filter(
      img =>
        img.src &&
        img.src.trim() !== '' &&
        img.src.startsWith('/') &&
        !img.src.includes('placeholder') &&
        img.isActive !== false
    )
  }, [images])

  // Obtener categorías únicas de las imágenes válidas
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(validImages.map(img => img.category)))]
    return cats
  }, [validImages])

  // Filtrar imágenes por categoría
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return validImages
    }
    return validImages.filter(img => img.category === selectedCategory)
  }, [validImages, selectedCategory])

  // Aplicar límite del accordion
  const displayedImages = useMemo(() => {
    const limit = isExpanded ? expandedItems : initialItems
    return filteredImages.slice(0, limit)
  }, [filteredImages, isExpanded, expandedItems, initialItems])

  // Verificar si se pueden mostrar más imágenes
  const canShowMore = filteredImages.length > initialItems
  const canShowLess = isExpanded && filteredImages.length > initialItems

  // Encontrar índice de la imagen seleccionada
  const selectedImageIndex = useMemo(() => {
    return filteredImages.findIndex(img => img.id === selectedImage?.id)
  }, [filteredImages, selectedImage])

  // Simular loading para mostrar skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!validImages.length) {
    return (
      <section className={cn('py-16 md:py-20', className)}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            No hay imágenes disponibles en este momento
          </h2>
        </div>
      </section>
    )
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  const handleImageSelect = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(selectedImageIndex)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsExpanded(false) // Resetear accordion al cambiar categoría
  }

  const handlePreviousImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const handleNextImage = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'laboratory':
        return '🔬'
      case 'implants':
        return '🦷'
      case 'orthodontics':
        return '🦷'
      case 'prosthetics':
        return '🦿'
      case 'before-after':
        return '✨'
      case 'equipment':
        return '⚙️'
      case 'aesthetics':
        return '✨'
      default:
        return '🖼️'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'laboratory':
        return 'Laboratorio'
      case 'implants':
        return 'Implantes'
      case 'orthodontics':
        return 'Ortodoncia'
      case 'prosthetics':
        return 'Prótesis'
      case 'before-after':
        return 'Antes y Después'
      case 'equipment':
        return 'Equipamiento'
      case 'aesthetics':
        return 'Estética'
      default:
        return 'General'
    }
  }

  return (
    <section className={cn('py-16 md:py-20', className)}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Nuestro trabajo en imágenes
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Explora nuestra galería de casos exitosos y trabajos realizados con tecnología de
              vanguardia
            </p>
          </motion.div>
        )}

        {/* Filtros por categorías */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-semibold">Filtrar por:</span>
          </div>
          {categories.map(category => (
            <button
              key={`filter-${category}`}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                'gallery-filter-button',
                selectedCategory === category ? 'selected' : ''
              )}
            >
              <span className="text-base text-gray-700 dark:text-gray-300">
                {getCategoryIcon(category)}
              </span>
              <span>{category === 'all' ? 'Todos' : getCategoryLabel(category)}</span>
            </button>
          ))}
        </div>

        {/* Grid de imágenes */}
        <div className={cn('grid gap-6', gridCols[columns])}>
          {isLoading ? (
            <GallerySkeleton />
          ) : (
            displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20`}
                onClick={() => handleImageSelect(image)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    onError={e => {
                      console.error(`Error loading image: ${image.src} for image ID: ${image.id}`)
                      const target = e.target as HTMLImageElement
                      target.src = '/gallery-placeholder.svg'
                      target.onerror = null
                    }}
                  />

                  {/* Overlay mejorado con mejor contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Badge de categoría */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/98 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-xl backdrop-blur-sm">
                      <span className="text-sm">{getCategoryIcon(image.category)}</span>
                      {getCategoryLabel(image.category)}
                    </span>
                  </div>

                  {/* Información de la imagen */}
                  <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                    <h3 className="mb-2 text-lg font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed font-medium text-gray-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                        {image.description}
                      </p>
                    )}

                    {/* Tags */}
                    {image.tags && image.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {image.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm ${colorTokens.border.brand.accent}/40 ${colorTokens.background.brand.accent}/98`}
                          >
                            <Tag className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            {tag}
                          </span>
                        ))}
                        {image.tags.length > 3 && (
                          <span className="inline-flex items-center rounded-full border border-gray-700/40 bg-gray-800/98 px-2.5 py-1 text-xs font-semibold text-gray-50 shadow-lg backdrop-blur-sm">
                            +{image.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Indicador de hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/30 shadow-2xl backdrop-blur-sm">
                      <Eye className="h-10 w-10 text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Botones de Accordion */}
        {canShowMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                'group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300',
                isExpanded
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
              )}
            >
              {isExpanded ? (
                <>
                  <span>Ver menos galería</span>
                  <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    ↑
                  </motion.div>
                </>
              ) : (
                <>
                  <span>Ver más galería</span>
                  <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                    ↓
                  </motion.div>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Modal para imagen seleccionada */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/95 p-4 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`relative my-8 max-h-[95vh] w-full max-w-7xl overflow-hidden rounded-2xl border bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-900 ${colorTokens.border.brand.light}`}
                onClick={e => e.stopPropagation()}
              >
                {/* Header del modal */}
                <div
                  className={`sticky top-0 z-20 border-b bg-gradient-to-r from-gray-50 to-white p-4 md:p-6 dark:border-gray-600 dark:from-gray-800 dark:to-gray-900 ${colorTokens.border.brand.light}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                        {selectedImage.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium">
                            {selectedImage.createdAt.toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full border px-2 py-1 text-xs font-semibold dark:border-gray-700 dark:bg-gray-900/20 ${colorTokens.border.brand.light} ${colorTokens.background.brand.light} ${colorTokens.text.brand.primary} dark:${colorTokens.text.brand.accent}`}
                          >
                            {getCategoryLabel(selectedImage.category)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedImage(null)}
                      className={`ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-gray-100 text-gray-600 shadow-sm transition-all duration-200 hover:scale-110 hover:bg-gray-200 hover:text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 ${colorTokens.border.brand.light}`}
                      aria-label="Cerrar modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="max-h-[calc(95vh-120px)] overflow-y-auto">
                  {/* Imagen principal */}
                  <div className="relative bg-gray-50 dark:bg-gray-800">
                    <div className="flex min-h-[400px] items-center justify-center p-4">
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        width={1200}
                        height={800}
                        className={`h-auto max-w-full rounded-lg border object-contain shadow-lg dark:border-gray-600 ${colorTokens.border.brand.light}`}
                        onError={e => {
                          const target = e.target as HTMLImageElement
                          target.src = '/gallery-placeholder.svg'
                          target.onerror = null
                        }}
                      />
                    </div>
                  </div>

                  {/* Navegación entre imágenes */}
                  {filteredImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePreviousImage}
                        className={`absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full border p-3 text-white shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 ${colorTokens.border.brand.accent}/50 ${colorTokens.background.brand.primary}/95 hover:${colorTokens.hover.background.brand.primary}`}
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full border p-3 text-white shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 ${colorTokens.border.brand.accent}/50 ${colorTokens.background.brand.primary}/95 hover:${colorTokens.hover.background.brand.primary}`}
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      <div
                        className={`absolute top-4 left-4 z-10 rounded-full border px-4 py-2 text-sm font-bold text-white shadow-xl backdrop-blur-sm ${colorTokens.border.brand.accent}/50 ${colorTokens.background.brand.primary}/95`}
                      >
                        {currentImageIndex + 1} de {filteredImages.length}
                      </div>
                    </>
                  )}

                  {/* Información detallada */}
                  <div className="bg-white p-4 md:p-6 dark:bg-gray-900">
                    {selectedImage.description && (
                      <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                          <span
                            className={`h-2 w-2 rounded-full ${colorTokens.background.brand.accent}`}
                          ></span>
                          Descripción del Trabajo
                        </h3>
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">
                          {selectedImage.description}
                        </p>
                      </div>
                    )}

                    {selectedImage.tags && selectedImage.tags.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                          <Tag
                            className={`h-5 w-5 ${colorTokens.text.brand.accent} dark:${colorTokens.text.brand.accent}`}
                          />
                          Características y Tecnologías
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${colorTokens.border.brand.light} bg-gradient-to-r from-blue-50 to-teal-50 ${colorTokens.text.brand.primary} dark:${colorTokens.border.brand.primary}/50 dark:from-blue-900/30 dark:to-teal-900/30 dark:${colorTokens.text.brand.accent}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Información técnica */}
                    <div
                      className={`grid grid-cols-1 gap-4 rounded-xl border bg-gray-50 p-4 md:grid-cols-2 dark:border-gray-600 dark:bg-gray-800 ${colorTokens.border.brand.light}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border dark:border-gray-700 dark:bg-gray-900/30 ${colorTokens.border.brand.light} ${colorTokens.background.brand.light}`}
                        >
                          <span className="text-lg">{getCategoryIcon(selectedImage.category)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Categoría
                          </p>
                          <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {getCategoryLabel(selectedImage.category)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Fecha de Trabajo
                          </p>
                          <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {selectedImage.createdAt.toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
