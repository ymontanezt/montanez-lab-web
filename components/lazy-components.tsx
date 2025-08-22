import { lazy, Suspense } from 'react'
import { Loading, SectionLoading } from '@/components/ui/loading'

// Lazy loading de componentes pesados
export const LazyGallery = lazy(() =>
  import('@/components/sections/gallery').then(module => ({ default: module.Gallery }))
)
export const LazyServices = lazy(() =>
  import('@/components/sections/services').then(module => ({ default: module.Services }))
)
export const LazyTeam = lazy(() =>
  import('@/components/sections/team').then(module => ({ default: module.Team }))
)
export const LazyTestimonials = lazy(() =>
  import('@/components/sections/testimonials').then(module => ({ default: module.Testimonials }))
)
export const LazyContact = lazy(() =>
  import('@/components/sections/contact').then(module => ({ default: module.Contact }))
)
export const LazyStats = lazy(() =>
  import('@/components/sections/stats').then(module => ({ default: module.Stats }))
)
export const LazyHero = lazy(() =>
  import('@/components/sections/hero').then(module => ({ default: module.Hero }))
)

// Lazy loading de componentes de UI pesados
export const LazyAppointmentScheduler = lazy(() =>
  import('@/components/ui/appointment-scheduler').then(module => ({
    default: module.AppointmentScheduler,
  }))
)
export const LazyWhatsAppChat = lazy(() =>
  import('@/components/ui/whatsapp-chat').then(module => ({ default: module.WhatsAppChat }))
)

// Wrapper para componentes lazy con loading elegante
export function LazyComponentWrapper({
  children,
  fallback = <SectionLoading />,
  className,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>{children}</div>
    </Suspense>
  )
}

// Componentes específicos con fallbacks personalizados
export function LazyGalleryWrapper({
  className,
  images,
  maxItems = 8,
  columns = 3,
}: {
  className?: string
  images: any[]
  maxItems?: number
  columns?: 2 | 3 | 4
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyGallery images={images} maxItems={maxItems} columns={columns} />
    </LazyComponentWrapper>
  )
}

export function LazyServicesWrapper({
  className,
  services,
  showBadge = true,
  showFeatures = true,
  showBenefits = false,
  maxDisplayed,
  category,
}: {
  className?: string
  services: any[]
  showBadge?: boolean
  showFeatures?: boolean
  showBenefits?: boolean
  maxDisplayed?: number
  category?: string
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyServices
        services={services}
        showBadge={showBadge}
        showFeatures={showFeatures}
        showBenefits={showBenefits}
        maxDisplayed={maxDisplayed}
        category={category}
      />
    </LazyComponentWrapper>
  )
}

export function LazyTeamWrapper({
  className,
  members,
  maxItems = 6,
  columns = 3,
}: {
  className?: string
  members: any[]
  maxItems?: number
  columns?: 2 | 3 | 4
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyTeam members={members} maxItems={maxItems} columns={columns} />
    </LazyComponentWrapper>
  )
}

export function LazyTestimonialsWrapper({
  className,
  testimonials,
  maxItems = 3,
}: {
  className?: string
  testimonials: any[]
  maxItems?: number
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyTestimonials testimonials={testimonials} maxItems={maxItems} />
    </LazyComponentWrapper>
  )
}

export function LazyContactWrapper({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'minimal'
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyContact variant={variant} />
    </LazyComponentWrapper>
  )
}

export function LazyStatsWrapper({
  className,
  stats,
  variant = 'primary',
  columns = 4,
}: {
  className?: string
  stats: any[]
  variant?: 'default' | 'primary' | 'minimal'
  columns?: 2 | 3 | 4
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyStats stats={stats} variant={variant} columns={columns} />
    </LazyComponentWrapper>
  )
}

export function LazyHeroWrapper({
  className,
  slides,
  autoPlay = true,
  autoPlayInterval = 6000,
  showStats = true,
  showPlayButton = true,
  variant = 'default',
}: {
  className?: string
  slides: any[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showStats?: boolean
  showPlayButton?: boolean
  variant?: 'default' | 'minimal' | 'fullscreen'
}) {
  return (
    <LazyComponentWrapper fallback={<SectionLoading className={className} />} className={className}>
      <LazyHero
        slides={slides}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        showStats={showStats}
        showPlayButton={showPlayButton}
        variant={variant}
      />
    </LazyComponentWrapper>
  )
}

// Wrapper para componentes de UI
export function LazyAppointmentSchedulerWrapper({
  className,
  onSubmit,
}: {
  className?: string
  onSubmit: (data: any) => void
}) {
  return (
    <LazyComponentWrapper
      fallback={<Loading variant="spinner" size="lg" text="Cargando programador..." />}
      className={className}
    >
      <LazyAppointmentScheduler onSubmit={onSubmit} />
    </LazyComponentWrapper>
  )
}

export function LazyWhatsAppChatWrapper() {
  return (
    <Suspense fallback={<Loading variant="dots" size="md" />}>
      <LazyWhatsAppChat />
    </Suspense>
  )
}
