export interface Stat {
  value: string
  label: string
  icon?: string
}

export const stats: Stat[] = [
  {
    value: '500+',
    label: 'Casos exitosos',
    icon: '✅',
  },
  {
    value: '50+',
    label: 'Clientes satisfechos',
    icon: '😊',
  },
  {
    value: '10+',
    label: 'Años de experiencia',
    icon: '🎯',
  },
  {
    value: '24/7',
    label: 'Soporte disponible',
    icon: '🕒',
  },
]

export function getStats() {
  return stats
}
