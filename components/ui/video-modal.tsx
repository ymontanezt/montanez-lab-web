'use client'

import React, { useEffect } from 'react'
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
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <div>
                <h2 className={`text-2xl font-bold ${colorTokens.text.primary}`}>{title}</h2>
                <p className={`mt-1 text-sm ${colorTokens.text.muted}`}>{description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={`rounded-full ${colorTokens.hover.background.primary} ${colorTokens.text.muted} hover:${colorTokens.text.primary}`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-b-2xl">
              {videoId ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  className="h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center ${colorTokens.background.secondary}`}
                >
                  <div className="text-center">
                    <Play className={`mx-auto mb-4 h-16 w-16 ${colorTokens.text.muted}`} />
                    <p className={`text-lg ${colorTokens.text.muted}`}>Video no disponible</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 p-6 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Play className={`h-4 w-4 ${colorTokens.text.brand.accent}`} />
                <span className={`text-sm ${colorTokens.text.muted}`}>
                  Reproduciendo en YouTube
                </span>
              </div>
              <Button
                asChild
                size="sm"
                className={`${componentColors.button.outline.background} ${componentColors.button.outline.text} ${componentColors.button.outline.border} ${componentColors.button.outline.focus}`}
              >
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
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
