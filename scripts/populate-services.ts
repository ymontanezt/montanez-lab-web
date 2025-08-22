import { db } from '../lib/firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const services = [
  {
    slug: 'protesis-digitales',
    title: 'Prótesis Digitales',
    subtitle: 'Tecnología CAD/CAM de Vanguardia',
    description:
      'Diseño y fabricación de prótesis con tecnología CAD/CAM de última generación para resultados precisos y naturales que superan las expectativas de nuestros pacientes.',
    shortDescription: 'Fabricación de prótesis utilizando tecnología CAD/CAM de última generación',
    image: '/modern-dental-lab.png',
    icon: 'Microscope',
    color: 'bg-blue-500',
    category: 'prosthetics',
    isActive: true,
    order: 1,
    features: [
      'Escaneo 3D de alta precisión',
      'Diseño CAD personalizado',
      'Fresado CNC de precisión milimétrica',
      'Materiales premium biocompatibles',
      'Ajuste perfecto garantizado',
      'Durabilidad excepcional',
    ],
    benefits: [
      'Reducción del 80% en tiempo de fabricación',
      'Precisión milimétrica en cada pieza',
      'Materiales de grado médico certificados',
      'Garantía extendida de 5 años',
      'Seguimiento post-instalación incluido',
    ],
    process: [
      {
        step: '1',
        title: 'Escaneo Digital',
        description: 'Captura 3D precisa de la estructura oral del paciente',
        icon: 'scan',
        duration: '15-30 min',
      },
      {
        step: '2',
        title: 'Diseño CAD',
        description: 'Modelado digital personalizado según especificaciones',
        icon: 'design',
        duration: '1-2 horas',
      },
      {
        step: '3',
        title: 'Fabricación CNC',
        description: 'Fresado de precisión con materiales premium',
        icon: 'manufacture',
        duration: '2-4 horas',
      },
      {
        step: '4',
        title: 'Control de Calidad',
        description: 'Verificación exhaustiva antes de la entrega',
        icon: 'quality',
        duration: '30-60 min',
      },
    ],
    testimonial: {
      text: 'La precisión de las prótesis digitales de DentalLab Pro ha revolucionado mi práctica. Mis pacientes están encantados con los resultados.',
      author: 'Dr. María González',
      role: 'Odontóloga Especialista',
      rating: 5,
      clinic: 'Clínica Dental González',
    },
    price: 'Desde S/ 4,500',
    duration: '3-5 días hábiles',
  },
  {
    slug: 'implantologia-avanzada',
    title: 'Implantología Avanzada',
    subtitle: 'Soluciones Completas de Implantes',
    description:
      'Soluciones completas de implantes con materiales biocompatibles premium y técnicas quirúrgicas innovadoras para restaurar la funcionalidad y estética dental.',
    shortDescription: 'Soluciones completas para implantes dentales con planificación digital',
    image: '/dental-scanner-workflow.png',
    icon: 'Shield',
    color: 'bg-green-500',
    category: 'implantology',
    isActive: true,
    order: 2,
    features: [
      'Titanio grado médico certificado',
      'Planificación 3D avanzada',
      'Cirugía guiada por computadora',
      'Seguimiento integral post-quirúrgico',
      'Prótesis sobre implantes',
      'Técnicas mínimamente invasivas',
    ],
    benefits: [
      'Tasa de éxito del 98% en implantes',
      'Recuperación más rápida',
      'Resultados estéticamente superiores',
      'Durabilidad de por vida',
      'Preservación del hueso maxilar',
    ],
    process: [
      {
        step: '1',
        title: 'Evaluación 3D',
        description: 'Tomografía y planificación digital completa',
        icon: 'evaluation',
        duration: '1-2 horas',
      },
      {
        step: '2',
        title: 'Cirugía Guiada',
        description: 'Colocación precisa con guías quirúrgicas',
        icon: 'surgery',
        duration: '2-4 horas',
      },
      {
        step: '3',
        title: 'Osteointegración',
        description: 'Período de cicatrización y fusión ósea',
        icon: 'healing',
        duration: '2-6 meses',
      },
      {
        step: '4',
        title: 'Prótesis Final',
        description: 'Colocación de corona o prótesis definitiva',
        icon: 'prosthesis',
        duration: '1-2 horas',
      },
    ],
    testimonial: {
      text: 'Los implantes de DentalLab Pro ofrecen la mejor predictibilidad quirúrgica que he experimentado en 20 años de práctica.',
      author: 'Dr. Roberto Silva',
      role: 'Implantólogo Certificado',
      rating: 5,
      clinic: 'Centro de Implantes Silva',
    },
    price: 'Desde S/ 7,500',
    duration: '2-4 meses (incluye osteointegración)',
  },
  {
    slug: 'ortodoncia-personalizada',
    title: 'Ortodoncia Personalizada',
    subtitle: 'Corrección Dental Innovadora',
    description:
      'Aparatos ortodónticos personalizados con técnicas innovadoras para corrección dental efectiva, cómoda y estéticamente superior.',
    shortDescription: 'Aparatos ortodónticos diseñados específicamente para cada paciente',
    image: '/professional-female-dentist.png',
    icon: 'Zap',
    color: 'bg-purple-500',
    category: 'orthodontics',
    isActive: true,
    order: 3,
    features: [
      'Brackets estéticos de zafiro',
      'Alineadores invisibles personalizados',
      'Análisis digital de sonrisa',
      'Tratamiento acelerado disponible',
      'Monitoreo digital continuo',
      'Retención post-tratamiento',
    ],
    benefits: [
      'Reducción del 40% en tiempo de tratamiento',
      'Comodidad superior durante el proceso',
      'Resultados predecibles y precisos',
      'Opciones estéticas discretas',
      'Seguimiento digital avanzado',
    ],
    process: [
      {
        step: '1',
        title: 'Diagnóstico Digital',
        description: 'Análisis 3D completo de la maloclusión',
        icon: 'diagnosis',
        duration: '1-2 horas',
      },
      {
        step: '2',
        title: 'Plan de Tratamiento',
        description: 'Diseño personalizado del movimiento dental',
        icon: 'planning',
        duration: '1-2 semanas',
      },
      {
        step: '3',
        title: 'Fabricación',
        description: 'Creación de aparatos ortodónticos personalizados',
        icon: 'manufacture',
        duration: '2-3 semanas',
      },
      {
        step: '4',
        title: 'Seguimiento',
        description: 'Monitoreo y ajustes durante el tratamiento',
        icon: 'monitoring',
        duration: 'Cada 4-6 semanas',
      },
    ],
    testimonial: {
      text: 'Los alineadores de DentalLab Pro son los más cómodos y efectivos que he usado. Mis pacientes adolescentes los prefieren.',
      author: 'Dra. Ana Rodríguez',
      role: 'Ortodoncista Certificada',
      rating: 5,
      clinic: 'Clínica de Ortodoncia Rodríguez',
    },
    price: 'Desde S/ 10,500',
    duration: '12-24 meses',
  },
  {
    slug: 'estetica-dental',
    title: 'Estética Dental',
    subtitle: 'Sonrisas Perfectas y Naturales',
    description:
      'Tratamientos estéticos avanzados para lograr la sonrisa perfecta con materiales de alta calidad y técnicas innovadoras de armonización facial.',
    shortDescription: 'Carillas, coronas y restauraciones estéticas de alta calidad',
    image: '/modern-dental-lab.png',
    icon: 'Award',
    color: 'bg-pink-500',
    category: 'aesthetics',
    isActive: true,
    order: 4,
    features: [
      'Carillas de porcelana ultra-finas',
      'Blanqueamiento profesional avanzado',
      'Diseño digital de sonrisa',
      'Armonización facial completa',
      'Materiales estéticos premium',
      'Resultados naturales garantizados',
    ],
    benefits: [
      'Transformación inmediata de la sonrisa',
      'Resultados naturales y duraderos',
      'Mínima invasión del diente natural',
      'Resistencia superior a manchas',
      'Armonía facial perfecta',
    ],
    process: [
      {
        step: '1',
        title: 'Análisis Estético',
        description: 'Evaluación facial y diseño de sonrisa digital',
        icon: 'analysis',
        duration: '1-2 horas',
      },
      {
        step: '2',
        title: 'Preparación',
        description: 'Preparación mínima y toma de impresiones',
        icon: 'preparation',
        duration: '1-2 horas',
      },
      {
        step: '3',
        title: 'Fabricación',
        description: 'Creación artesanal de carillas personalizadas',
        icon: 'manufacture',
        duration: '1-2 semanas',
      },
      {
        step: '4',
        title: 'Cementado',
        description: 'Colocación definitiva y ajustes finales',
        icon: 'cementation',
        duration: '1-2 horas',
      },
    ],
    testimonial: {
      text: 'Las carillas de DentalLab Pro han transformado completamente la confianza de mis pacientes. La calidad estética es excepcional.',
      author: 'Dr. Carlos Mendoza',
      role: 'Especialista en Estética Dental',
      rating: 5,
      clinic: 'Centro de Estética Dental Mendoza',
    },
    price: 'Desde S/ 2,400 por carilla',
    duration: '2-3 semanas',
  },
  {
    slug: 'odontopediatria',
    title: 'Odontopediatría',
    subtitle: 'Cuidado Dental Especializado para Niños',
    description:
      'Cuidado dental especializado para niños con técnicas adaptadas, ambiente amigable y enfoque preventivo para establecer hábitos saludables desde temprana edad.',
    shortDescription: 'Soluciones especializadas para el cuidado dental infantil',
    image: '/dental-team-laboratory.png',
    icon: 'Users',
    color: 'bg-orange-500',
    category: 'pediatrics',
    isActive: true,
    order: 5,
    features: [
      'Tratamientos sin dolor garantizados',
      'Sedación consciente disponible',
      'Prevención temprana especializada',
      'Educación dental interactiva',
      'Ambiente lúdico y amigable',
      'Seguimiento del desarrollo dental',
    ],
    benefits: [
      'Experiencia dental positiva para niños',
      'Prevención de problemas futuros',
      'Establecimiento de hábitos saludables',
      'Reducción de ansiedad dental',
      'Desarrollo dental óptimo',
    ],
    process: [
      {
        step: '1',
        title: 'Primera Visita',
        description: 'Adaptación y evaluación inicial en ambiente amigable',
        icon: 'first-visit',
        duration: '30-45 min',
      },
      {
        step: '2',
        title: 'Diagnóstico',
        description: 'Evaluación completa del desarrollo dental',
        icon: 'diagnosis',
        duration: '45-60 min',
      },
      {
        step: '3',
        title: 'Tratamiento',
        description: 'Procedimientos adaptados a la edad del niño',
        icon: 'treatment',
        duration: '30-90 min',
      },
      {
        step: '4',
        title: 'Seguimiento',
        description: 'Monitoreo del crecimiento y desarrollo',
        icon: 'monitoring',
        duration: 'Cada 6 meses',
      },
    ],
    testimonial: {
      text: 'Mi hija ahora ama ir al dentista gracias al equipo de DentalLab Pro. Su enfoque con niños es excepcional.',
      author: 'María Fernández',
      role: 'Madre de Paciente',
      rating: 5,
      clinic: 'Clínica Dental Familiar',
    },
    price: 'Desde S/ 240',
    duration: '30-45 minutos por sesión',
  },
  {
    slug: 'urgencias-24-7',
    title: 'Urgencias 24/7',
    subtitle: 'Atención Inmediata Cuando Más lo Necesitas',
    description:
      'Atención de emergencias dentales las 24 horas con respuesta rápida, tratamiento inmediato y alivio del dolor para situaciones críticas.',
    shortDescription: 'Servicio de emergencia disponible las 24 horas del día',
    image: '/dental-team-laboratory.png',
    icon: 'Clock',
    color: 'bg-red-500',
    category: 'emergency',
    isActive: true,
    order: 6,
    features: [
      'Disponibilidad total 24/7',
      'Respuesta inmediata garantizada',
      'Alivio del dolor en minutos',
      'Tratamiento de urgencia completo',
      'Equipo especializado en emergencias',
      'Seguimiento post-urgencia incluido',
    ],
    benefits: [
      'Atención inmediata sin esperas',
      'Alivio rápido del dolor dental',
      'Prevención de complicaciones',
      'Tranquilidad total para familias',
      'Resolución definitiva de emergencias',
    ],
    process: [
      {
        step: '1',
        title: 'Llamada de Emergencia',
        description: 'Contacto inmediato con especialista de guardia',
        icon: 'emergency-call',
        duration: 'Inmediato',
      },
      {
        step: '2',
        title: 'Evaluación Rápida',
        description: 'Diagnóstico inmediato de la emergencia',
        icon: 'evaluation',
        duration: '15-30 min',
      },
      {
        step: '3',
        title: 'Tratamiento Urgente',
        description: 'Intervención inmediata para aliviar el problema',
        icon: 'treatment',
        duration: '30-90 min',
      },
      {
        step: '4',
        title: 'Plan de Seguimiento',
        description: 'Programación de tratamiento definitivo',
        icon: 'follow-up',
        duration: '1-2 semanas',
      },
    ],
    testimonial: {
      text: 'A las 2 AM con un dolor insoportable, DentalLab Pro me atendió inmediatamente. Su servicio de urgencias es invaluable.',
      author: 'Jorge Martínez',
      role: 'Paciente de Urgencias',
      rating: 5,
      clinic: 'Paciente Particular',
    },
    price: 'Desde S/ 450',
    duration: 'Atención inmediata',
  },
]

async function populateServices() {
  try {
    console.log('🚀 Iniciando población de servicios...')

    const servicesCollection = collection(db, 'services')

    for (const service of services) {
      const serviceData = {
        ...service,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(servicesCollection, serviceData)
      console.log(`✅ Servicio "${service.title}" creado con ID: ${docRef.id}`)
    }

    console.log('🎉 Todos los servicios han sido creados exitosamente!')
  } catch (error) {
    console.error('❌ Error al poblar servicios:', error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  populateServices()
}

export { populateServices }
