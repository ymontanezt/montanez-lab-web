'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/design-system/utilities'
import { colorTokens } from '@/lib/design-system/color-tokens'
import { utilityClasses } from '@/lib/design-system/utilities'

interface Stat {
  value: string
  label: string
  icon?: string
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
    default: `${utilityClasses.container.card} shadow-lg`,
    primary: `${colorTokens.background.secondary} ${colorTokens.border.accent} border`,
    minimal: 'bg-transparent',
  }

  const iconVariants = {
    default: colorTokens.text.accent,
    primary: colorTokens.text.accent,
    minimal: colorTokens.text.secondary,
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
                'rounded-xl p-6 text-center transition-all duration-300 hover:scale-105',
                variants[variant]
              )}
            >
              {stat.icon && (
                <div className={cn('mb-4 text-3xl', iconVariants[variant])}>{stat.icon}</div>
              )}
              <div className={`mb-2 text-3xl font-bold md:text-4xl ${colorTokens.text.primary}`}>
                {stat.value}
              </div>
              <div className={`text-sm md:text-base ${colorTokens.text.secondary}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
