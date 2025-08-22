import type React from 'react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/contexts/theme-context'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import { GoogleAnalytics } from '@next/third-parties/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '600', '700', '900'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '500', '600'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: 'DentalLab Pro - Laboratorio Dental Moderno | Lima, Perú',
  description:
    'Laboratorio dental profesional en Lima, Perú con tecnología CAD/CAM avanzada. Prótesis dentales, coronas, implantes y servicios especializados con 15+ años de experiencia.',
  generator: 'Next.js',
  applicationName: 'DentalLab Pro',
  keywords: [
    'laboratorio dental Lima',
    'prótesis dental Lima',
    'coronas dentales Perú',
    'implantes dentales profesionales',
    'tecnología CAD CAM dental',
    'laboratorio protésico certificado',
    'salud bucal Perú',
    'odontología avanzada',
    'escáner intraoral 3D',
    'prótesis digitales Lima',
    'laboratorio dental cerca de mí',
    'dentistas profesionales Lima',
  ],
  authors: [{ name: 'DentalLab Pro', url: 'https://dentallab-pro.com' }],
  creator: 'DentalLab Pro',
  publisher: 'DentalLab Pro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://dentallab-pro.com',
    siteName: 'DentalLab Pro',
    title: 'DentalLab Pro - Laboratorio Dental Profesional | Lima, Perú',
    description:
      'Laboratorio dental líder en Lima, Perú con tecnología de vanguardia. Especialistas en prótesis dentales, coronas, implantes y soluciones odontológicas avanzadas.',
    images: [
      {
        url: '/modern-dental-lab.png',
        width: 1200,
        height: 630,
        alt: 'DentalLab Pro - Laboratorio Dental Moderno en Lima, Perú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentalLab Pro - Laboratorio Dental Profesional Lima',
    description:
      'Laboratorio dental con tecnología CAD/CAM avanzada en Lima, Perú. Prótesis de alta calidad y servicios especializados.',
    images: ['/modern-dental-lab.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'healthcare',
  metadataBase: new URL('https://dentallab-pro.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/',
      es: '/es',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* SEO y Meta Tags */}
        <meta name="geo.region" content="PE-LIM" />
        <meta name="geo.placename" content="Lima" />
        <meta name="geo.position" content="-12.0464;-77.0428" />
        <meta name="ICBM" content="-12.0464, -77.0428" />

        {/* Mobile y PWA */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DentalLab Pro" />
        <meta name="application-name" content="DentalLab Pro" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="theme-color" content="#22c55e" />

        {/* Canonical y Alternates */}
        <link rel="canonical" href="https://dentallab-pro.com" />
        <link rel="alternate" hrefLang="es-pe" href="https://dentallab-pro.com" />
        <link rel="alternate" hrefLang="es" href="https://dentallab-pro.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://dentallab-pro.com" />

        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <AuthProvider>
              <ThemeProvider>
                {children}
                <Toaster />
                <PWAInstallPrompt />
              </ThemeProvider>
            </AuthProvider>
          </Suspense>
        </ErrorBoundary>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  )
}
