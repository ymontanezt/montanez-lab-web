export interface Stat {
  value: string
  label: string
  icon?: string
}

export const stats: Stat[] = [
  {
    value: '500+',
    label: 'Casos exitosos',
    icon: 'success',
  },
  {
    value: '50+',
    label: 'Clientes satisfechos',
    icon: 'clients',
  },
  {
    value: '10+',
    label: 'Años de experiencia',
    icon: 'experience',
  },
  {
    value: '24/7',
    label: 'Soporte disponible',
    icon: 'support',
  },
]

export function getStats() {
  return stats
}
