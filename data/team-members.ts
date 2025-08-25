// Team members mock data with TypeScript types
// Replaces teamMembers.json with type-safe data

import { TeamMember } from '@/types'

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    name: 'Evelyn Montañez Tuncar',
    role: 'Directora General',
    specialty: 'Administración y Gestión Dental',
    experience: '25+ años de experiencia',
    image: '/professional-female-dentist.png',
    bio: 'Directora general con más de 25 años de experiencia en la gestión y administración de laboratorios dentales. Líder en innovación y calidad de servicio.',
    certifications: [
      'Administradora de Empresas',
      'Especialista en Gestión de Salud',
      'Máster en Administración Hospitalaria',
    ],
    education: [
      {
        degree: 'Administradora de Empresas',
        institution: 'Universidad Nacional Mayor de San Marcos',
        year: 1998,
        country: 'Perú',
      },
      {
        degree: 'Máster en Administración de Salud',
        institution: 'Universidad de Barcelona',
        year: 2003,
        country: 'España',
      },
    ],
    languages: ['Español', 'Inglés', 'Portugués'],
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    name: 'Dr. Carlos Mendoza',
    role: 'Director Médico',
    specialty: 'Implantología y Cirugía Oral',
    experience: '20+ años de experiencia',
    image: '/professional-male-dentist.png',
    bio: 'Especialista en implantología con más de 20 años de experiencia. Líder en innovación dental y tecnología CAD/CAM.',
    certifications: [
      'Certificación en Implantología Avanzada',
      'Especialista en Cirugía Oral',
      'Máster en Odontología Digital',
    ],
    education: [
      {
        degree: 'Doctor en Odontología',
        institution: 'Universidad Nacional Mayor de San Marcos',
        year: 2003,
        country: 'Perú',
      },
      {
        degree: 'Especialidad en Implantología',
        institution: 'Universidad de Barcelona',
        year: 2008,
        country: 'España',
      },
    ],
    languages: ['Español', 'Inglés', 'Portugués'],
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    name: 'Dra. María González',
    role: 'Especialista en Prótesis',
    specialty: 'Prótesis Digitales y Estética',
    experience: '15+ años de experiencia',
    image: '/professional-female-dentist.png',
    bio: 'Especialista en prótesis digitales con enfoque en estética dental. Experta en tecnología CAD/CAM y materiales premium.',
    certifications: [
      'Especialista en Prótesis Dental',
      'Certificación en Estética Dental',
      'Experta en Tecnología CAD/CAM',
    ],
    education: [
      {
        degree: 'Doctor en Odontología',
        institution: 'Universidad Peruana Cayetano Heredia',
        year: 2008,
        country: 'Perú',
      },
      {
        degree: 'Especialidad en Prótesis',
        institution: 'Universidad de Michigan',
        year: 2012,
        country: 'Estados Unidos',
      },
    ],
    languages: ['Español', 'Inglés'],
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    name: 'Dr. Roberto Silva',
    role: 'Implantólogo Senior',
    specialty: 'Implantología y Regeneración Ósea',
    experience: '18+ años de experiencia',
    image: '/male-implant-specialist.png',
    bio: 'Especialista en implantología con enfoque en casos complejos y regeneración ósea. Experto en cirugía guiada por computadora.',
    certifications: [
      'Certificación en Implantología Avanzada',
      'Especialista en Regeneración Ósea',
      'Experto en Cirugía Guiada',
    ],
    education: [
      {
        degree: 'Doctor en Odontología',
        institution: 'Universidad Nacional de Trujillo',
        year: 2005,
        country: 'Perú',
      },
      {
        degree: 'Especialidad en Implantología',
        institution: 'Universidad de Harvard',
        year: 2010,
        country: 'Estados Unidos',
      },
    ],
    languages: ['Español', 'Inglés', 'Francés'],
    isActive: true,
    order: 4,
  },
  {
    id: '5',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    name: 'Dra. Ana Rodríguez',
    role: 'Ortodoncista',
    specialty: 'Ortodoncia Invisible y Personalizada',
    experience: '12+ años de experiencia',
    image: '/female-orthodontist-portrait.png',
    bio: 'Especialista en ortodoncia invisible y tratamientos personalizados. Experta en alineadores transparentes y brackets estéticos.',
    certifications: [
      'Especialista en Ortodoncia',
      'Certificación en Alineadores Invisibles',
      'Experta en Ortodoncia Estética',
    ],
    education: [
      {
        degree: 'Doctor en Odontología',
        institution: 'Universidad Científica del Sur',
        year: 2011,
        country: 'Perú',
      },
      {
        degree: 'Especialidad en Ortodoncia',
        institution: 'Universidad de Pennsylvania',
        year: 2015,
        country: 'Estados Unidos',
      },
    ],
    languages: ['Español', 'Inglés'],
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01'),
    name: 'Téc. Luis Hernández',
    role: 'Técnico Dental Senior',
    specialty: 'Tecnología CAD/CAM y Fresado',
    experience: '10+ años de experiencia',
    image: '/dental-technician-portrait.png',
    bio: 'Técnico dental especializado en tecnología CAD/CAM y fresado CNC. Experto en materiales premium y control de calidad.',
    certifications: [
      'Técnico Dental Certificado',
      'Especialista en Tecnología CAD/CAM',
      'Certificación en Fresado CNC',
    ],
    education: [
      {
        degree: 'Técnico Dental',
        institution: 'Instituto Tecnológico del Perú',
        year: 2013,
        country: 'Perú',
      },
      {
        degree: 'Certificación en CAD/CAM',
        institution: 'Instituto Alemán de Tecnología Dental',
        year: 2016,
        country: 'Alemania',
      },
    ],
    languages: ['Español', 'Inglés', 'Alemán'],
    isActive: true,
    order: 6,
  },
]

// Helper functions
export const getActiveTeamMembers = (): TeamMember[] => {
  return teamMembers.filter(member => member.isActive).sort((a, b) => a.order - b.order)
}

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id)
}

export const getTeamMembersByRole = (role: string): TeamMember[] => {
  return teamMembers.filter(member => member.role === role && member.isActive)
}

export const getTeamMembersBySpecialty = (specialty: string): TeamMember[] => {
  return teamMembers.filter(member => member.specialty.includes(specialty) && member.isActive)
}
