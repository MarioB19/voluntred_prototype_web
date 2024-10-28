'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically handle the forgot password logic
    // For this example, we'll simulate an API call with a timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      setDialogContent({
        title: "Correo enviado",
        description: "Se ha enviado un enlace de recuperación a tu correo electrónico."
      })
      setDialogOpen(true)
      // Redirect to login page after dialog is closed
      setTimeout(() => router.push('/'), 3000)
    } catch (error) {
      setDialogContent({
        title: "Error",
        description: "Hubo un problema al enviar el correo. Por favor, intenta de nuevo."
      })
      setDialogOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Status Bar */}
      <div className="h-6 bg-green-500" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Volunt</span>
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">RED</span>
          </h1>
          <p className="text-gray-400">Recupera tu acceso</p>
        </motion.div>

        <motion.div 
          className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-blue-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-400">Olvidé mi contraseña</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <motion.div 
                  className="relative"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Correo Electrónico" 
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded transition-colors duration-300" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="text-lg">Enviar enlace de recuperación</span>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/" className="text-sm text-blue-400 hover:underline">
                Volver al inicio de sesión
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        className="p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-sm text-gray-400">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-green-400 font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </motion.div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-green-400">{dialogContent.title}</DialogTitle>
            <DialogDescription className="text-gray-300">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}