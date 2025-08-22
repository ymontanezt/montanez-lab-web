import { cn } from '@/lib/design-system/utilities'

interface IconProps {
  className?: string
  size?: number
  color?: string
}

// Ilustración de diente molar
export function ToothIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      <path
        d="M8 4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6C16 6.55228 15.5523 7 15 7H9C8.44772 7 8 6.55228 8 6V4Z"
        fill={color}
      />
      <path
        d="M7 6C7 5.44772 7.44772 5 8 5H16C16.5523 5 17 5.44772 17 6V8C17 8.55228 16.5523 9 16 9H8C7.44772 9 7 8.55228 7 8V6Z"
        fill={color}
      />
      <path
        d="M6 8C6 7.44772 6.44772 7 7 7H17C17.5523 7 18 7.44772 18 8V10C18 10.5523 17.5523 11 17 11H7C6.44772 11 6 10.5523 6 10V8Z"
        fill={color}
      />
      <path
        d="M5 10C5 9.44772 5.44772 9 6 9H18C18.5523 9 19 9.44772 19 10V12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12V10Z"
        fill={color}
      />
      <path
        d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12V14C20 14.5523 19.5523 15 19 15H5C4.44772 15 4 14.5523 4 14V12Z"
        fill={color}
      />
      <path
        d="M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14V16C21 16.5523 20.5523 17 20 17H4C3.44772 17 3 16.5523 3 16V14Z"
        fill={color}
      />
      <path
        d="M2 16C2 15.4477 2.44772 15 3 15H21C21.5523 15 22 15.4477 22 16V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V16Z"
        fill={color}
      />
      <path
        d="M1 18C1 17.4477 1.44772 17 2 17H22C22.5523 17 23 17.4477 23 18V20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20V18Z"
        fill={color}
      />
    </svg>
  )
}

// Ilustración de microscopio dental
export function MicroscopeIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      {/* Base del microscopio */}
      <rect x="8" y="18" width="8" height="2" fill={color} />
      <rect x="9" y="16" width="6" height="2" fill={color} />

      {/* Columna principal */}
      <rect x="11" y="8" width="2" height="8" fill={color} />

      {/* Brazo superior */}
      <rect x="4" y="8" width="16" height="2" fill={color} />

      {/* Lente objetivo */}
      <circle cx="12" cy="9" r="2" fill={color} />
      <circle cx="12" cy="9" r="1" fill="white" />

      {/* Tubo del ocular */}
      <rect x="11" y="4" width="2" height="4" fill={color} />

      {/* Ocular */}
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <circle cx="12" cy="4" r="0.8" fill="white" />

      {/* Platina */}
      <rect x="6" y="12" width="12" height="1" fill={color} />
      <rect x="7" y="13" width="10" height="0.5" fill={color} />
    </svg>
  )
}

// Ilustración de escáner dental 3D
export function ScannerIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      {/* Cuerpo del escáner */}
      <rect x="3" y="6" width="18" height="12" rx="2" fill={color} />
      <rect x="4" y="7" width="16" height="10" rx="1" fill="white" />

      {/* Pantalla */}
      <rect x="5" y="8" width="14" height="8" rx="0.5" fill="#e5e7eb" />

      {/* Botones de control */}
      <circle cx="7" cy="10" r="0.8" fill={color} />
      <circle cx="9" cy="10" r="0.8" fill={color} />
      <circle cx="11" cy="10" r="0.8" fill={color} />

      {/* Indicador de escaneo */}
      <rect x="6" y="12" width="12" height="2" rx="1" fill={color} />
      <rect x="6" y="12" width="3" height="2" rx="1" fill="white" />

      {/* Luz de escaneo */}
      <path d="M12 6L12 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6L8 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 6L16 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Ilustración de prótesis dental
export function ProsthesisIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      {/* Base de la prótesis */}
      <path
        d="M4 8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V8Z"
        fill={color}
      />

      {/* Dientes individuales */}
      <rect x="5" y="9" width="2" height="6" rx="0.5" fill="white" />
      <rect x="8" y="9" width="2" height="6" rx="0.5" fill="white" />
      <rect x="11" y="9" width="2" height="6" rx="0.5" fill="white" />
      <rect x="14" y="9" width="2" height="6" rx="0.5" fill="white" />
      <rect x="17" y="9" width="2" height="6" rx="0.5" fill="white" />

      {/* Detalles de los dientes */}
      <rect x="5.5" y="10" width="1" height="1" rx="0.2" fill={color} />
      <rect x="8.5" y="10" width="1" height="1" rx="0.2" fill={color} />
      <rect x="11.5" y="10" width="1" height="1" rx="0.2" fill={color} />
      <rect x="14.5" y="10" width="1" height="1" rx="0.2" fill={color} />
      <rect x="17.5" y="10" width="1" height="1" rx="0.2" fill={color} />

      {/* Ganchos de sujeción */}
      <path
        d="M3 10C3 9.44772 3.44772 9 4 9V9C4.55228 9 5 9.44772 5 10V14C5 14.5523 4.55228 15 4 15V15C3.44772 15 3 14.5523 3 14V10Z"
        fill={color}
      />
      <path
        d="M19 10C19 9.44772 19.4477 9 20 9V9C20.5523 9 21 9.44772 21 10V14C21 14.5523 20.5523 15 20 15V15C19.4477 15 19 14.5523 19 14V10Z"
        fill={color}
      />
    </svg>
  )
}

// Ilustración de laboratorio dental
export function LaboratoryIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      {/* Mesa de trabajo */}
      <rect x="2" y="16" width="20" height="2" fill={color} />
      <rect x="3" y="14" width="18" height="2" fill={color} />

      {/* Fresa dental */}
      <rect x="8" y="8" width="8" height="6" rx="1" fill={color} />
      <rect x="9" y="9" width="6" height="4" fill="white" />
      <circle cx="12" cy="11" r="1" fill={color} />

      {/* Escáner 3D */}
      <rect x="4" y="6" width="6" height="4" rx="1" fill={color} />
      <rect x="4.5" y="6.5" width="5" height="3" fill="white" />
      <circle cx="7" cy="8" r="0.8" fill={color} />

      {/* Monitor */}
      <rect x="14" y="6" width="6" height="4" rx="1" fill={color} />
      <rect x="14.5" y="6.5" width="5" height="3" fill="white" />
      <rect x="15" y="7" width="4" height="2" fill={color} />

      {/* Herramientas */}
      <path
        d="M6 12L8 14L6 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12L16 14L18 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Ilustración de sello de calidad
export function QualityIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      {/* Círculo exterior */}
      <circle cx="12" cy="12" r="10" fill={color} />
      <circle cx="12" cy="12" r="8" fill="white" />

      {/* Estrella de calidad */}
      <path
        d="M12 4L13.5 8.5L18 8.5L14.5 11.5L16 16L12 13L8 16L9.5 11.5L6 8.5L10.5 8.5L12 4Z"
        fill={color}
      />

      {/* Texto "CALIDAD" */}
      <text x="12" y="20" textAnchor="middle" fontSize="3" fill={color} fontWeight="bold">
        CALIDAD
      </text>
    </svg>
  )
}

// Ilustración de implante dental
export function ImplantIcon({ className, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('transition-colors', className)}
    >
      {/* Corona */}
      <path
        d="M8 4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6C16 6.55228 15.5523 7 15 7H9C8.44772 7 8 6.55228 8 6V4Z"
        fill={color}
      />

      {/* Perno del implante */}
      <rect x="11" y="7" width="2" height="8" fill={color} />

      {/* Base del implante */}
      <path
        d="M10 15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V17C14 17.5523 13.5523 18 13 18H11C10.4477 18 10 17.5523 10 17V15Z"
        fill={color}
      />

      {/* Hilos de rosca */}
      <path d="M11 8L13 8" stroke="white" strokeWidth="0.5" />
      <path d="M11 10L13 10" stroke="white" strokeWidth="0.5" />
      <path d="M11 12L13 12" stroke="white" strokeWidth="0.5" />
      <path d="M11 14L13 14" stroke="white" strokeWidth="0.5" />
    </svg>
  )
}
