import type React from 'react'
import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/contexts/theme-context'
import { Suspense } from 'react'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'

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
  title: 'Montañez Lab - Laboratorio Dental | Huancayo, Perú',
  description:
    'Laboratorio dental en Huancayo, Perú con tecnología CAD/CAM avanzada. Prótesis dentales, coronas, implantes y servicios especializados con 15+ años de experiencia.',
  generator: 'Next.js',
  applicationName: 'Montañez Lab',
  keywords: [
    'laboratorio dental Huancayo',
    'prótesis dental Huancayo',
    'coronas dentales Perú',
    'implantes dentales profesionales',
    'tecnología CAD CAM dental',
    'laboratorio protésico certificado',
    'salud bucal Perú',
    'odontología avanzada',
    'escáner intraoral 3D',
    'prótesis digitales Huancayo',
    'laboratorio dental cerca de mí',
    'dentistas profesionales Huancayo',
  ],
  authors: [{ name: 'Montañez Lab', url: 'https://montanez-website.web.app' }],
  creator: 'Montañez Lab',
  publisher: 'Montañez Lab',
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
    url: 'https://montanez-website.web.app',
    siteName: 'Montañez Lab',
    title: 'Montañez Lab - Laboratorio Dental | Huancayo, Perú',
    description:
      'Laboratorio dental líder en Huancayo, Perú con tecnología de vanguardia. Especialistas en prótesis dentales, coronas, implantes y soluciones odontológicas avanzadas.',
    images: [
      {
        url: '/modern-dental-lab.png',
        width: 1200,
        height: 630,
        alt: 'Montañez Lab - Laboratorio Dental Moderno en Huancayo, Perú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montañez Lab - Laboratorio Dental Huancayo',
    description:
      'Laboratorio dental con tecnología CAD/CAM avanzada en Huancayo, Perú. Prótesis de alta calidad y servicios especializados.',
    images: ['/modern-dental-lab.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'healthcare',
  metadataBase: new URL('https://montanez-website.web.app'),
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
        <meta name="geo.region" content="PE-JUN" />
        <meta name="geo.placename" content="Junín, Perú" />
        <meta name="geo.position" content="-11.1589;-75.9934" />
        <meta name="ICBM" content="-11.1589, -75.9934" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Montañez Lab" />
        <meta property="og:locale" content="es_PE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@montanezlab" />
        
        {/* PWA */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Montañez Lab" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/montserrat-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/opensans-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DentalLaboratory",
              "name": "Montañez Lab",
              "description": "Laboratorio Dental Moderno en Junín, Perú",
              "url": "https://montanez-lab.com",
              "telephone": "+51 989 253 275",
              "email": "montzavy@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Junín",
                "addressRegion": "Junín",
                "addressCountry": "PE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -11.1589,
                "longitude": -75.9935
              },
              "openingHours": "Mo-Fr 08:00-18:00",
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <AuthProvider>
            <ThemeProvider>
              {children}
              <Toaster />
              <PWAInstallPrompt />
            </ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
