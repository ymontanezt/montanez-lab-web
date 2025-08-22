// Testimonials mock data with TypeScript types
// Replaces testimonials.json with type-safe data

import { Testimonial } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'La precisión de las prótesis digitales de Gata viejis ha revolucionado mi práctica. Mis pacientes están encantados con los resultados y la calidad excepcional de cada trabajo.',
    name: 'Dr. María González',
    role: 'Odontóloga Especialista',
    clinic: 'Clínica Dental González',
    image: '/professional-female-dentist.png',
    rating: 5,
    service: 'protesis-digitales',
    isVerified: true,
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'Los implantes de Gata viejis ofrecen la mejor predictibilidad quirúrgica que he experimentado en 20 años de práctica. La planificación 3D es increíblemente precisa.',
    name: 'Dr. Roberto Silva',
    role: 'Implantólogo Certificado',
    clinic: 'Centro de Implantes Silva',
    image: '/male-implant-specialist.png',
    rating: 5,
    service: 'implantologia-avanzada',
    isVerified: true,
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'Los alineadores de DentalLab Pro son los más cómodos y efectivos que he usado. Mis pacientes adolescentes los prefieren y los resultados son excepcionales.',
    name: 'Dra. Ana Rodríguez',
    role: 'Ortodoncista Certificada',
    clinic: 'Clínica de Ortodoncia Rodríguez',
    image: '/female-orthodontist-portrait.png',
    rating: 5,
    service: 'ortodoncia-personalizada',
    isVerified: true,
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'Las carillas de DentalLab Pro han transformado completamente la confianza de mis pacientes. La calidad estética es excepcional y los resultados naturales.',
    name: 'Dr. Carlos Mendoza',
    role: 'Especialista en Estética Dental',
    clinic: 'Centro de Estética Dental Mendoza',
    image: '/professional-male-dentist.png',
    rating: 5,
    service: 'estetica-dental',
    isVerified: true,
    isActive: true,
    order: 4,
  },
  {
    id: '5',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'Mi hija ahora ama ir al dentista gracias al equipo de DentalLab Pro. Su enfoque con niños es excepcional y los tratamientos son completamente indoloros.',
    name: 'María Fernández',
    role: 'Madre de Paciente',
    clinic: 'Clínica Dental Familiar',
    image: '/user-placeholder.svg',
    rating: 5,
    service: 'odontopediatria',
    isVerified: true,
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'A las 2 AM con un dolor insoportable, DentalLab Pro me atendió inmediatamente. Su servicio de urgencias es invaluable y el personal es sumamente profesional.',
    name: 'Jorge Martínez',
    role: 'Paciente de Urgencias',
    clinic: 'Paciente Particular',
    image: '/user-placeholder.svg',
    rating: 5,
    service: 'urgencias-24-7',
    isVerified: true,
    isActive: true,
    order: 6,
  },
  {
    id: '7',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'La tecnología CAD/CAM de DentalLab Pro ha mejorado significativamente la precisión de mis trabajos. Los tiempos de entrega son excelentes y la calidad es consistente.',
    name: 'Dr. Luis Pérez',
    role: 'Odontólogo General',
    clinic: 'Clínica Dental Pérez',
    image: '/user-placeholder.svg',
    rating: 5,
    service: 'protesis-digitales',
    isVerified: true,
    isActive: true,
    order: 7,
  },
  {
    id: '8',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    text: 'He trabajado con varios laboratorios, pero DentalLab Pro es el único que cumple con todos mis estándares de calidad. Sus prótesis son perfectas desde la primera vez.',
    name: 'Dra. Patricia López',
    role: 'Especialista en Rehabilitación',
    clinic: 'Centro de Rehabilitación Oral',
    image: '/user-placeholder.svg',
    rating: 5,
    service: 'protesis-digitales',
    isVerified: true,
    isActive: true,
    order: 8,
  },
]

// Helper functions
export const getActiveTestimonials = (): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.isActive).sort((a, b) => a.order - b.order)
}

export const getTestimonialById = (id: string): Testimonial | undefined => {
  return testimonials.find(testimonial => testimonial.id === id)
}

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.service === service && testimonial.isActive)
}

export const getVerifiedTestimonials = (): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.isVerified && testimonial.isActive)
}

export const getTestimonialsByRating = (rating: number): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.rating === rating && testimonial.isActive)
}

export const getRandomTestimonial = (seed?: number): Testimonial => {
  const activeTestimonials = getActiveTestimonials()
  // Usar un seed para evitar problemas de hidratación
  const random = seed ? ((seed * 9301 + 49297) % 233280) / 233280 : 0.5
  const randomIndex = Math.floor(random * activeTestimonials.length)
  return activeTestimonials[randomIndex]
}
