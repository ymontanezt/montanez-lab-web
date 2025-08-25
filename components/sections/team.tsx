'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TeamMember } from '@/types'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import { Award, Star } from 'lucide-react'
import { TeamSkeleton } from '@/components/ui/skeleton'

interface TeamProps {
  members: TeamMember[]
  className?: string
  showTitle?: boolean
  maxItems?: number
  columns?: 2 | 3 | 4
}

export function Team({
  members,
  className,
  showTitle = true,
  maxItems = 6,
  columns = 3,
}: TeamProps) {
  const [isLoading, setIsLoading] = useState(true)
  const displayMembers = members.slice(0, maxItems)

  // Simular loading para mostrar skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1300) // 1.3 segundos de loading

    return () => clearTimeout(timer)
  }, [])

  if (!displayMembers.length) return null

  // Para 2 miembros, usar layout especial centrado
  const isSmallTeam = displayMembers.length <= 2
  const gridCols = isSmallTeam
    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
    : {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      }

  return (
    <section
      className={cn(
        'bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 dark:from-gray-900 dark:to-gray-800',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Nuestro equipo especializado
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Conoce a los profesionales que hacen posible la excelencia en cada trabajo
            </p>
          </motion.div>
        )}

        <div
          className={cn(
            'grid gap-8 md:gap-10',
            isSmallTeam ? gridCols : (gridCols as any)[columns]
          )}
        >
          {isLoading ? (
            <TeamSkeleton />
          ) : (
            displayMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-white shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-600 dark:bg-gray-900">
                  {/* Imagen del miembro */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name || 'Miembro del equipo'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        onError={e => {
                          const target = e.target as HTMLImageElement
                          target.src = '/user-placeholder.svg'
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                        <span className="text-6xl text-green-600 dark:text-green-400">👤</span>
                      </div>
                    )}

                    {/* Overlay con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Badge de experiencia */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-600/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                        <Star className="h-3 w-3" />
                        {member.experience}
                      </span>
                    </div>
                  </div>

                  {/* Información del miembro - Simplificada */}
                  <div className="p-6">
                    {/* Nombre y rol */}
                    <div className="mb-4 text-center">
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        {member.name || 'Miembro del equipo'}
                      </h3>
                      <p className="mb-1 text-lg font-semibold text-green-600 dark:text-green-400">
                        {member.role || 'Especialista'}
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {member.specialty || 'Especialidad'}
                      </p>
                    </div>

                    {/* Bio simplificada */}
                    {member.bio && (
                      <div className="mb-4">
                        <p className="line-clamp-3 text-center text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                          {member.bio}
                        </p>
                      </div>
                    )}

                    {/* Solo las certificaciones más importantes */}
                    {member.certifications && member.certifications.length > 0 && (
                      <div className="text-center">
                        <h4 className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                          <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                          Certificaciones
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                          {member.certifications.slice(0, 2).map((cert, idx) => (
                            <span
                              key={idx}
                              className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-700/50 dark:bg-green-900/30 dark:text-green-300"
                            >
                              {cert}
                            </span>
                          ))}
                          {member.certifications.length > 2 && (
                            <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                              +{member.certifications.length - 2} más
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Indicador de hover */}
                  <div className="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Mensaje adicional para equipos pequeños */}
        {isSmallTeam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-6 py-3 dark:border-green-700/50 dark:bg-green-900/20">
              <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Equipo en crecimiento • Más especialistas próximamente
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
