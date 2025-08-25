'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle } from 'lucide-react'

export function TodoManager() {
  const { toast } = useToast()

  const handleMarkAllDone = () => {
    toast({
      title: '¡Proyecto Completado!',
      description:
        'Todas las tareas han sido completadas exitosamente. El sitio web del laboratorio dental está listo.',
    })
  }

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <div className="mb-6 text-center">
        <h2 className="heading-secondary mb-2">Estado del Proyecto</h2>
        <p className="text-muted-foreground">Sitio Web Montañez Lab - Completado</p>
      </div>

      <div className="space-y-3">
        {[
          { task: 'Setup Project Structure & Design System', status: 'done' },
          { task: 'Build Landing Page with Hero & Services', status: 'done' },
          { task: 'Create Gallery Carousel & Testimonials', status: 'done' },
          { task: 'Implement Contact Form with Validation', status: 'done' },
          {
            task: 'Setup Firebase Integration & Authentication',
            status: 'done',
          },
          { task: 'Build Admin Dashboard', status: 'done' },
          { task: 'Add WhatsApp Integration & Email Service', status: 'done' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-muted/30 flex items-center gap-3 rounded-lg p-3"
          >
            <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{item.task}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button onClick={handleMarkAllDone} className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" />
          Proyecto Completado
        </Button>
      </motion.div>
    </Card>
  )
}
