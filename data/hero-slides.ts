// Hero slides mock data with TypeScript types
// Replaces heroSlides.json with type-safe data

import { HeroSlide } from '@/types'

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    title: 'Tecnología Dental de Vanguardia',
    subtitle: 'Transformamos Sonrisas con Precisión Digital',
    description:
      'Descubre cómo nuestra tecnología CAD/CAM revoluciona la odontología moderna, ofreciendo resultados excepcionales en cada tratamiento.',
    cta: 'Conoce Nuestros Servicios',
    image: '/modern-dental-lab.png',
    alt: 'Laboratorio dental moderno con tecnología avanzada',
    isActive: true,
    order: 1,
    stats: {
      'Años de Experiencia': '15+',
      'Casos Exitosos': '10,000+',
      'Satisfacción Cliente': '98%',
      Tecnología: 'CAD/CAM',
    },
  },
  {
    id: '2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    title: 'Implantes Dentales de Precisión',
    subtitle: 'Restauración Completa con Garantía',
    description:
      'Nuestros implantes dentales combinan materiales premium con planificación digital 3D para resultados naturales y duraderos.',
    cta: 'Consulta Gratuita',
    image: '/dental-scanner-workflow.png',
    alt: 'Escáner dental 3D y planificación de implantes',
    isActive: true,
    order: 2,
    stats: {
      'Tasa de Éxito': '98%',
      Garantía: '5 Años',
      Materiales: 'Titanio Grado 5',
      Planificación: '3D Digital',
    },
  },
  {
    id: '3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    title: 'Ortodoncia Personalizada',
    subtitle: 'Sonrisas Perfectas, Tratamientos Únicos',
    description:
      'Diseñamos cada tratamiento ortodóntico específicamente para ti, utilizando tecnología invisible y técnicas innovadoras.',
    cta: 'Evaluación Personalizada',
    image: '/female-orthodontist-portrait.png',
    alt: 'Aparatos ortodónticos personalizados y alineadores invisibles',
    isActive: true,
    order: 3,
    stats: {
      'Reducción Tiempo': '40%',
      Comodidad: 'Máxima',
      Opciones: 'Estéticas',
      Seguimiento: 'Digital',
    },
  },
  {
    id: '4',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    title: 'Estética Dental Avanzada',
    subtitle: 'Transforma tu Sonrisa en 2 Semanas',
    description:
      'Carillas de porcelana ultra-finas y tratamientos estéticos que transforman completamente tu apariencia dental.',
    cta: 'Transforma tu Sonrisa',
    image: '/professional-female-dentist.png',
    alt: 'Carillas de porcelana y sonrisas transformadas',
    isActive: true,
    order: 4,
    stats: {
      Transformación: 'Inmediata',
      Durabilidad: '10+ Años',
      Naturalidad: '100%',
      Resistencia: 'Máxima',
    },
  },
]

// Helper functions
export const getActiveHeroSlides = (): HeroSlide[] => {
  return heroSlides.filter(slide => slide.isActive).sort((a, b) => a.order - b.order)
}

export const getHeroSlideById = (id: string): HeroSlide | undefined => {
  return heroSlides.find(slide => slide.id === id)
}
