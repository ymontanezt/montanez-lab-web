'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { colorTokens, componentColors } from '@/lib/design-system/color-tokens'
import { cn } from '@/lib/design-system/utilities'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
  description?: string
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = 'Video de Montañez Lab',
  description = 'Descubre nuestro laboratorio dental de vanguardia',
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isTitleExpanded, setIsTitleExpanded] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setHasError(false)
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getVideoId(videoUrl)
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`
    : ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative mx-1 w-full max-w-5xl rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200/50 md:mx-4 dark:bg-gray-900 dark:ring-gray-700/50"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between p-3 pb-3 md:p-8 md:pb-6">
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-r from-teal-50 via-white to-purple-50 dark:from-teal-900/20 dark:via-gray-900 dark:to-purple-900/20" />

              {/* Content */}
              <div className="relative z-10 min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2 md:mb-2 md:gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-purple-600 shadow-lg md:h-10 md:w-10">
                    <Play className="h-3 w-3 text-white md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <motion.h2
                      className={`bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent md:text-3xl ${colorTokens.text.primary} ${isTitleExpanded ? '' : 'overflow-hidden text-ellipsis whitespace-nowrap'} transition-all duration-300`}
                      onClick={() => setIsTitleExpanded(!isTitleExpanded)}
                      style={{ cursor: 'pointer' }}
                      animate={{
                        whiteSpace: isTitleExpanded ? 'normal' : 'nowrap',
                        overflow: isTitleExpanded ? 'visible' : 'hidden',
                        textOverflow: isTitleExpanded ? 'clip' : 'ellipsis',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {title}
                      {!isTitleExpanded && title.length > 30 && (
                        <span className="text-teal-400 dark:text-teal-300">...</span>
                      )}
                    </motion.h2>
                    {title.length > 30 && (
                      <motion.button
                        onClick={() => setIsTitleExpanded(!isTitleExpanded)}
                        className="mt-1 text-xs font-medium text-teal-600 transition-colors duration-200 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isTitleExpanded ? 'Ver menos' : 'Ver completo'}
                      </motion.button>
                    )}
                  </div>
                </div>
                <div className="ml-9 md:ml-13">
                  <motion.p
                    className={`text-xs md:text-base ${colorTokens.text.muted} ${isDescriptionExpanded ? '' : 'overflow-hidden'}`}
                    style={
                      isDescriptionExpanded
                        ? {}
                        : {
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical' as const,
                          }
                    }
                    animate={{
                      opacity: isDescriptionExpanded ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {description}
                    {!isDescriptionExpanded && description.length > 80 && (
                      <span className="text-teal-400 dark:text-teal-300">...</span>
                    )}
                  </motion.p>
                  {description.length > 80 && (
                    <motion.button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="mt-1 text-xs font-medium text-teal-600 transition-colors duration-200 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
                    </motion.button>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="relative z-10 ml-2 flex-shrink-0 rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            {/* Video Container */}
            <div className="mb-4 flex justify-center md:mb-8">
              <div className="relative aspect-video w-[calc(100%-16px)] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200/50 md:w-[calc(100%-64px)] dark:ring-gray-700/50">
                {videoId ? (
                  <>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                        <div className="px-4 text-center">
                          <div className="relative mx-auto mb-4 md:mb-6">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600 md:h-16 md:w-16"></div>
                            <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-teal-400 opacity-20 md:h-16 md:w-16"></div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-base font-medium text-gray-700 md:text-lg dark:text-gray-300">
                              Cargando video...
                            </p>
                            <div className="flex justify-center space-x-1">
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-teal-600"
                                style={{ animationDelay: '0ms' }}
                              ></div>
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-teal-600"
                                style={{ animationDelay: '150ms' }}
                              ></div>
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-teal-600"
                                style={{ animationDelay: '300ms' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <iframe
                      src={embedUrl}
                      title={title}
                      className={`h-full w-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="no-referrer-when-downgrade"
                      onLoad={() => setIsLoading(false)}
                      onError={() => {
                        setIsLoading(false)
                        setHasError(true)
                      }}
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="px-4 text-center">
                      <div className="relative mx-auto mb-4 md:mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 md:h-20 md:w-20 dark:from-red-900/30 dark:to-red-800/30">
                          <Play className="h-8 w-8 text-red-500 md:h-10 md:w-10 dark:text-red-400" />
                        </div>
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 md:h-6 md:w-6">
                          <span className="text-xs font-bold text-white">!</span>
                        </div>
                      </div>

                      <h3
                        className={`mb-2 text-lg font-bold md:text-xl ${colorTokens.text.primary}`}
                      >
                        {hasError ? 'Error al cargar el video' : 'Video no disponible'}
                      </h3>
                      <p className={`mb-4 text-sm md:mb-6 md:text-base ${colorTokens.text.muted}`}>
                        {hasError
                          ? 'Problema de conexión o video privado'
                          : 'URL inválida o video privado'}
                      </p>

                      <div className="flex flex-col justify-center gap-3 md:flex-row">
                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-teal-700 hover:to-purple-700 hover:shadow-xl md:w-auto"
                        >
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="h-5 w-5" />
                            Ver en YouTube
                          </a>
                        </Button>
                        {hasError && (
                          <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                              setHasError(false)
                              setIsLoading(true)
                            }}
                            className="w-full border-2 border-gray-300 transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-gray-50 md:w-auto dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                          >
                            Reintentar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="relative flex flex-col items-start justify-between gap-3 p-3 pt-3 md:flex-row md:items-center md:gap-4 md:p-8 md:pt-6">
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-r from-gray-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-teal-900/20" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2 md:gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md md:h-8 md:w-8">
                  <Play className="h-3 w-3 text-white md:h-4 md:w-4" />
                </div>
                <span className={`text-xs font-medium md:text-sm ${colorTokens.text.muted}`}>
                  {isLoading
                    ? 'Cargando video...'
                    : hasError
                      ? 'Error en la reproducción'
                      : 'Reproduciendo en YouTube'}
                </span>
              </div>

              <Button
                asChild
                size="sm"
                className="relative z-10 w-full bg-gradient-to-r from-teal-600 to-purple-600 py-2 text-sm text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-teal-700 hover:to-purple-700 hover:shadow-xl md:w-auto md:py-2 md:text-base"
              >
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver en YouTube
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VideoModal
