'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Input } from './input'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'

interface Service {
  id: string
  name: string
  description: string
  category: string
  price?: string
  features?: string[]
}

interface ServiceFiltersProps {
  services: Service[]
  onFilterChange: (filteredServices: Service[]) => void
  className?: string
}

export function ServiceFilters({ services, onFilterChange, className }: ServiceFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(services.map(service => service.category))]
    return ['all', ...uniqueCategories]
  }, [services])

  // Filtrar servicios
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory

      const matchesPrice =
        priceRange === 'all' ||
        (priceRange === 'low' &&
          (!service.price || parseFloat(service.price.replace(/[^0-9.]/g, '')) < 1000)) ||
        (priceRange === 'medium' &&
          service.price &&
          parseFloat(service.price.replace(/[^0-9.]/g, '')) >= 1000 &&
          parseFloat(service.price.replace(/[^0-9.]/g, '')) < 5000) ||
        (priceRange === 'high' &&
          service.price &&
          parseFloat(service.price.replace(/[^0-9.]/g, '')) >= 5000)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [services, searchTerm, selectedCategory, priceRange])

  // Notificar cambios en los filtros
  useMemo(() => {
    onFilterChange(filteredServices)
  }, [filteredServices, onFilterChange])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setPriceRange('all')
  }

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || priceRange !== 'all'

  return (
    <div className={cn('space-y-6', className)}>
      {/* Barra de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={`w-full py-3 pr-4 pl-10 ${utilityClasses.input.base}`}
        />
        <svg
          className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        {/* Filtro por categoría */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'capitalize transition-colors duration-200',
                  selectedCategory === category
                    ? 'bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                )}
              >
                {category === 'all' ? 'Todas' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Filtro por precio */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Rango de precio
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Todos' },
              { value: 'low', label: 'Económico' },
              { value: 'medium', label: 'Medio' },
              { value: 'high', label: 'Premium' },
            ].map(range => (
              <Button
                key={range.value}
                variant={priceRange === range.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceRange(range.value)}
                className={cn(
                  'transition-colors duration-200',
                  priceRange === range.value
                    ? 'bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                )}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultados y limpiar filtros */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredServices.length} de {services.length} servicios encontrados
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Indicador de filtros activos */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20"
          >
            <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <svg
                className="h-4 w-4 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              Filtros activos:
              {searchTerm && (
                <span className="rounded bg-blue-200 px-2 py-1 dark:bg-blue-800">
                  "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="rounded bg-blue-200 px-2 py-1 capitalize dark:bg-blue-800">
                  {selectedCategory}
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="rounded bg-blue-200 px-2 py-1 dark:bg-blue-800">
                  {priceRange === 'low'
                    ? 'Económico'
                    : priceRange === 'medium'
                      ? 'Medio'
                      : 'Premium'}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
