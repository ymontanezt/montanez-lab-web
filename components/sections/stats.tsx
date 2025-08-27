'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens, componentColors } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'
import { StatsIcon } from '@/components/ui/stats-icons'

interface Stat {
  value: string
  label: string
  icon?: 'success' | 'clients' | 'experience' | 'support'
}

interface StatsProps {
  stats: Stat[]
  className?: string
  variant?: 'default' | 'primary' | 'minimal'
  columns?: 2 | 3 | 4
}

export function Stats({ stats, className, variant = 'default', columns = 4 }: StatsProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  const variants = {
    default: `${utilityClasses.container.card} shadow-lg hover:shadow-xl`,
    primary: `${colorTokens.background.brand.light} ${colorTokens.border.brand.light} border-2 hover:${colorTokens.border.brand.accent} hover:${colorTokens.background.brand.muted}`,
    minimal: 'bg-transparent',
  }

  return (
    <section className={cn('py-10 md:py-14', className)}>
      <div className="container mx-auto px-4">
        <div className={cn('grid gap-6', gridCols[columns])}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105',
                variants[variant]
              )}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600" />
              </div>

              {/* Icon Container */}
              {stat.icon && (
                <div className="relative mb-6 flex justify-center">
                  <div
                    className={`rounded-2xl p-4 ${colorTokens.background.brand.light} group-hover:${colorTokens.background.brand.muted} transition-colors duration-300`}
                  >
                    <StatsIcon type={stat.icon} className="h-10 w-10 md:h-12 md:w-12" />
                  </div>
                </div>
              )}

              {/* Value */}
              <div
                className={`relative mb-3 text-4xl font-bold md:text-5xl lg:text-6xl ${colorTokens.text.brand.primary} group-hover:${colorTokens.text.brand.accent} transition-colors duration-300`}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                className={`relative text-sm font-medium md:text-base ${colorTokens.text.secondary} group-hover:${colorTokens.text.primary} transition-colors duration-300`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
