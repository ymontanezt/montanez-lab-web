// Gallery images mock data with TypeScript types
// Replaces galleryImages.json with type-safe data

import { GalleryImage } from '@/types'

// Reemplazando todas las imágenes placeholder con imágenes reales
// placeholder-ao5ah.png -> modern-dental-lab.png, dental-scanner-workflow.png, dental-team-laboratory.png
// placeholder-f9rtw.png -> professional-female-dentist.png, modern-dental-lab.png
// placeholder-sbtz0.png -> dental-team-laboratory.png, professional-male-dentist.png

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    title: 'Laboratorio Dental Moderno',
    description:
      'Instalaciones de vanguardia con tecnología CAD/CAM para fabricación de prótesis dentales de alta precisión.',
    src: '/modern-dental-lab.png',
    alt: 'Laboratorio dental moderno con equipos de última generación',
    category: 'laboratory',
    tags: ['Laboratorio', 'Moderno', 'Tecnología', 'CAD/CAM', 'Precisión'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-01'),
    title: 'Equipo de Laboratorio Dental',
    description:
      'Profesionales especializados trabajando en conjunto para crear prótesis dentales de la más alta calidad.',
    src: '/dental-team-laboratory.png',
    alt: 'Equipo de laboratorio dental trabajando en prótesis',
    category: 'laboratory',
    tags: ['Equipo', 'Laboratorio', 'Profesionales', 'Calidad', 'Colaboración'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-12-01'),
    title: 'Técnico Dental Especializado',
    description:
      'Técnico dental experto utilizando tecnología avanzada para fabricar prótesis con precisión milimétrica.',
    src: '/dental-technician-portrait.png',
    alt: 'Técnico dental trabajando con tecnología avanzada',
    category: 'laboratory',
    tags: ['Técnico', 'Dental', 'Especializado', 'Tecnología', 'Precisión'],
    width: 800,
    height: 1200,
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-12-01'),
    title: 'Especialista en Ortodoncia',
    description:
      'Ortodoncista profesional evaluando casos complejos con tecnología digital avanzada para planificación de tratamientos.',
    src: '/female-orthodontist-portrait.png',
    alt: 'Especialista en ortodoncia utilizando tecnología digital',
    category: 'orthodontics',
    tags: ['Ortodoncia', 'Especialista', 'Tecnología Digital', 'Evaluación', 'Planificación'],
    width: 800,
    height: 1200,
    isActive: true,
    order: 4,
  },
  {
    id: '5',
    createdAt: new Date('2024-11-18'),
    updatedAt: new Date('2024-12-01'),
    title: 'Especialista en Implantes',
    description:
      'Cirujano especializado en implantes dentales utilizando tecnología de vanguardia para resultados óptimos.',
    src: '/male-implant-specialist.png',
    alt: 'Especialista en implantes dentales con tecnología avanzada',
    category: 'implants',
    tags: ['Implantes', 'Cirujano', 'Especializado', 'Tecnología', 'Resultados'],
    width: 800,
    height: 1200,
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    createdAt: new Date('2024-11-12'),
    updatedAt: new Date('2024-12-01'),
    title: 'Flujo de Trabajo con Escáner',
    description:
      'Proceso completo de digitalización dental desde el escaneo hasta la fabricación final de prótesis.',
    src: '/dental-scanner-workflow.png',
    alt: 'Flujo de trabajo digital con escáner dental',
    category: 'equipment',
    tags: ['Flujo de Trabajo', 'Digitalización', 'Escáner', 'Proceso', 'Fabricación'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 6,
  },
  {
    id: '7',
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-12-01'),
    title: 'Prótesis de Porcelana Premium',
    description:
      'Fabricación de prótesis de porcelana de alta calidad con tecnología CAD/CAM. Materiales premium que garantizan durabilidad y estética natural.',
    src: '/modern-dental-lab.png',
    alt: 'Prótesis de porcelana fabricadas con tecnología CAD/CAM',
    category: 'prosthetics',
    tags: ['Prótesis', 'Porcelana', 'CAD/CAM', 'Premium', 'Estética'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 7,
  },
  {
    id: '8',
    createdAt: new Date('2024-11-22'),
    updatedAt: new Date('2024-12-01'),
    title: 'Dentista Profesional Femenina',
    description:
      'Especialista en prótesis digitales y tecnología CAD/CAM. Enfoque en la personalización y atención al detalle para cada paciente.',
    src: '/professional-female-dentist.png',
    alt: 'Dentista profesional utilizando tecnología digital',
    category: 'prosthetics',
    tags: ['Prótesis', 'Digital', 'CAD/CAM', 'Tecnología', 'Personalización'],
    width: 800,
    height: 1200,
    isActive: true,
    order: 8,
  },
  {
    id: '9',
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-12-01'),
    title: 'Antes y Después - Prótesis',
    description:
      'Transformación completa de sonrisa con prótesis digitales. Resultado natural y funcional que mejora la calidad de vida del paciente.',
    src: '/dental-team-laboratory.png',
    alt: 'Comparación antes y después de tratamiento con prótesis',
    category: 'before-after',
    tags: ['Antes y Después', 'Prótesis', 'Transformación', 'Sonrisa', 'Resultados'],
    width: 1200,
    height: 600,
    isActive: true,
    order: 9,
  },
  {
    id: '10',
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-12-01'),
    title: 'Antes y Después - Carillas',
    description:
      'Transformación estética con carillas de porcelana ultra-finas. Diseño digital personalizado para una sonrisa natural y armoniosa.',
    src: '/modern-dental-lab.png',
    alt: 'Comparación antes y después de tratamiento con carillas',
    category: 'before-after',
    tags: ['Antes y Después', 'Carillas', 'Estética', 'Porcelana', 'Diseño Digital'],
    width: 1200,
    height: 600,
    isActive: true,
    order: 10,
  },
  {
    id: '11',
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-12-01'),
    title: 'Equipamiento de Laboratorio',
    description:
      'Tecnología de vanguardia para fabricación dental de precisión. Incluye escáneres 3D, fresadoras CNC y software de planificación avanzado.',
    src: '/dental-team-laboratory.png',
    alt: 'Equipos modernos de laboratorio dental con tecnología avanzada',
    category: 'equipment',
    tags: ['Equipamiento', 'Laboratorio', 'Tecnología', 'Precisión', 'Innovación'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 11,
  },
  {
    id: '12',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-12-01'),
    title: 'Escáner Intraoral 3D',
    description:
      'Escáner intraoral de última generación para captura digital precisa de la boca del paciente. Tecnología que revoluciona la odontología moderna.',
    src: '/professional-male-dentist.png',
    alt: 'Escáner intraoral 3D capturando imagen digital de la boca',
    category: 'equipment',
    tags: ['Escáner', 'Intraoral', '3D', 'Digital', 'Tecnología'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 12,
  },
  {
    id: '13',
    createdAt: new Date('2024-11-17'),
    updatedAt: new Date('2024-12-01'),
    title: 'Fresadora CNC Dental',
    description:
      'Fresadora CNC de alta precisión para fabricación de prótesis y restauraciones dentales. Control digital que garantiza exactitud milimétrica.',
    src: '/dental-scanner-workflow.png',
    alt: 'Fresadora CNC dental fabricando prótesis con precisión',
    category: 'equipment',
    tags: ['Fresadora', 'CNC', 'Precisión', 'Digital', 'Fabricación'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 13,
  },
  {
    id: '14',
    createdAt: new Date('2024-11-14'),
    updatedAt: new Date('2024-12-01'),
    title: 'Modelos 3D Digitales',
    description:
      'Creación de modelos 3D digitales para planificación de tratamientos. Visualización completa de la anatomía dental del paciente.',
    src: '/professional-female-dentist.png',
    alt: 'Modelos 3D digitales de dientes para planificación de tratamiento',
    category: 'laboratory',
    tags: ['Modelos 3D', 'Digital', 'Planificación', 'Anatomía', 'Visualización'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 14,
  },
  {
    id: '15',
    createdAt: new Date('2024-11-19'),
    updatedAt: new Date('2024-12-01'),
    title: 'Prótesis Removibles Avanzadas',
    description:
      'Fabricación de prótesis removibles con materiales biocompatibles y diseño digital personalizado. Máxima comodidad y funcionalidad.',
    src: '/dental-team-laboratory.png',
    alt: 'Prótesis removibles fabricadas con tecnología digital avanzada',
    category: 'prosthetics',
    tags: ['Prótesis', 'Removibles', 'Biocompatibles', 'Diseño Digital', 'Comodidad'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 15,
  },
  {
    id: '16',
    createdAt: new Date('2024-11-23'),
    updatedAt: new Date('2024-12-01'),
    title: 'Cirugía Guiada por Computadora',
    description:
      'Sistema de cirugía guiada por computadora para colocación precisa de implantes. Tecnología que minimiza riesgos y maximiza resultados.',
    src: '/modern-dental-lab.png',
    alt: 'Sistema de cirugía guiada por computadora para implantes',
    category: 'implants',
    tags: ['Cirugía Guiada', 'Computadora', 'Implantes', 'Precisión', 'Tecnología'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 16,
  },
  {
    id: '17',
    createdAt: new Date('2024-11-26'),
    updatedAt: new Date('2024-12-01'),
    title: 'Ortodoncia Invisible Personalizada',
    description:
      'Tratamiento de ortodoncia invisible con alineadores transparentes personalizados. Tecnología que combina estética y efectividad.',
    src: '/modern-dental-lab.png',
    alt: 'Alineadores transparentes personalizados para ortodoncia invisible',
    category: 'orthodontics',
    tags: ['Ortodoncia', 'Invisible', 'Alineadores', 'Transparentes', 'Personalizados'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 17,
  },
  {
    id: '18',
    createdAt: new Date('2024-11-29'),
    updatedAt: new Date('2024-12-01'),
    title: 'Laboratorio de Cerámica',
    description:
      'Especialistas en cerámica dental trabajando con materiales premium. Cada pieza es única y diseñada para durar toda la vida.',
    src: '/professional-male-dentist.png',
    alt: 'Especialistas trabajando en laboratorio de cerámica dental',
    category: 'laboratory',
    tags: ['Cerámica', 'Dental', 'Materiales Premium', 'Durabilidad', 'Especialistas'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 18,
  },
  {
    id: '19',
    createdAt: new Date('2024-11-21'),
    updatedAt: new Date('2024-12-01'),
    title: 'Control de Calidad Avanzado',
    description:
      'Sistema de control de calidad que garantiza la excelencia en cada trabajo. Verificación digital y manual de cada detalle.',
    src: '/dental-scanner-workflow.png',
    alt: 'Sistema de control de calidad digital para prótesis dentales',
    category: 'laboratory',
    tags: ['Control de Calidad', 'Excelencia', 'Verificación', 'Digital', 'Detalles'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 19,
  },
  {
    id: '20',
    createdAt: new Date('2024-11-16'),
    updatedAt: new Date('2024-12-01'),
    title: 'Prótesis de Implantes',
    description:
      'Fabricación de prótesis sobre implantes con tecnología digital avanzada. Resultados que restauran la función y estética dental.',
    src: '/dental-team-laboratory.png',
    alt: 'Prótesis sobre implantes fabricadas con tecnología digital',
    category: 'implants',
    tags: ['Prótesis', 'Implantes', 'Tecnología Digital', 'Función', 'Estética'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 20,
  },
  {
    id: '21',
    createdAt: new Date('2024-11-13'),
    updatedAt: new Date('2024-12-01'),
    title: 'Diseño Digital de Sonrisa',
    description:
      'Software avanzado para diseño digital de sonrisa. Visualización previa de resultados antes del tratamiento.',
    src: '/professional-female-dentist.png',
    alt: 'Diseño digital de sonrisa con software avanzado',
    category: 'aesthetics',
    tags: ['Diseño Digital', 'Sonrisa', 'Software', 'Visualización', 'Resultados'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 21,
  },
  {
    id: '22',
    createdAt: new Date('2024-11-27'),
    updatedAt: new Date('2024-12-01'),
    title: 'Materiales Premium',
    description:
      'Selección de materiales premium para prótesis dentales. Garantía de durabilidad y biocompatibilidad.',
    src: '/modern-dental-lab.png',
    alt: 'Materiales premium para prótesis dentales',
    category: 'prosthetics',
    tags: ['Materiales', 'Premium', 'Prótesis', 'Durabilidad', 'Biocompatibilidad'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 22,
  },
  {
    id: '23',
    createdAt: new Date('2024-11-24'),
    updatedAt: new Date('2024-12-01'),
    title: 'Tecnología de Escaneo',
    description:
      'Equipos de escaneo dental de última generación para captura digital precisa de la anatomía bucal.',
    src: '/dental-scanner-workflow.png',
    alt: 'Equipos de escaneo dental de última generación',
    category: 'equipment',
    tags: ['Tecnología', 'Escaneo', 'Dental', 'Digital', 'Anatomía'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 23,
  },
  {
    id: '24',
    createdAt: new Date('2024-11-11'),
    updatedAt: new Date('2024-12-01'),
    title: 'Resultados de Tratamiento',
    description:
      'Casos exitosos de tratamientos dentales realizados con tecnología avanzada y materiales premium.',
    src: '/dental-team-laboratory.png',
    alt: 'Resultados exitosos de tratamientos dentales',
    category: 'before-after',
    tags: ['Resultados', 'Tratamientos', 'Tecnología', 'Materiales', 'Éxito'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 24,
  },
  {
    id: '25',
    createdAt: new Date('2024-11-09'),
    updatedAt: new Date('2024-12-01'),
    title: 'Innovación en Odontología',
    description:
      'Últimas innovaciones en tecnología dental para tratamientos más precisos, cómodos y efectivos.',
    src: '/modern-dental-lab.png',
    alt: 'Innovaciones en tecnología dental',
    category: 'equipment',
    tags: ['Innovación', 'Odontología', 'Tecnología', 'Precisión', 'Efectividad'],
    width: 1200,
    height: 800,
    isActive: true,
    order: 25,
  },
]

// Helper function to get active gallery images
export const getActiveGalleryImages = (): GalleryImage[] => {
  return galleryImages.filter(image => image.isActive).sort((a, b) => a.order - b.order)
}

// Helper function to get gallery images by category
export const getGalleryImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'all') {
    return getActiveGalleryImages()
  }
  return getActiveGalleryImages().filter(image => image.category === category)
}

// Helper function to get gallery image by ID
export const getGalleryImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === id)
}

// Helper function to get random gallery images
export const getRandomGalleryImages = (count: number, seed?: number): GalleryImage[] => {
  const activeImages = getActiveGalleryImages()
  // Usar un seed para evitar problemas de hidratación
  const random = seed ? ((seed * 9301 + 49297) % 233280) / 233280 : 0.5
  const shuffled = [...activeImages].sort(() => 0.5 - random)
  return shuffled.slice(0, count)
}
