'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Lock, User, Building, GraduationCap, Briefcase, Heart, Users } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type UserType = 'Empresa' | 'Universidad' | 'ONG' | 'Alumno' | 'Voluntario' | 'Empleado'

const userTypeIcons = {
  Empresa: Building,
  Universidad: GraduationCap,
  ONG: Users,
  Alumno: GraduationCap,
  Voluntario: Heart,
  Empleado: Briefcase,
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })
  const router = useRouter()

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      if (userType === 'Empresa' || userType === 'Universidad' || userType === 'ONG') {
        setDialogContent({
          title: "Solicitud enviada",
          description: `Tu solicitud de registro como ${userType} ha sido enviada. Te contactaremos pronto para revisarla.`
        })
      } else {
        setDialogContent({
          title: "Registro exitoso",
          description: `Te has registrado correctamente como ${userType}.`
        })
      }
      setDialogOpen(true)
      setTimeout(() => router.push('/'), 3000)
    } catch (error) {
      setDialogContent({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo."
      })
      setDialogOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // Here you would implement the actual social login logic
    console.log(`Logging in with ${provider}`)
    // For demonstration, we'll just show a dialog
    setDialogContent({
      title: "Inicio de sesión social",
      description: `Has iniciado sesión con ${provider === 'google' ? 'Google' : 'Facebook'}.`
    })
    setDialogOpen(true)
  }

  const renderUserTypeSelection = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(userTypeIcons).map(([type, Icon]) => (
        <Card key={type} className="bg-gray-800 border-blue-500 hover:border-green-500 cursor-pointer transition-colors" onClick={() => handleUserTypeSelect(type as UserType)}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Icon className="w-12 h-12 mb-2 text-green-400" />
            <span className="text-center text-white">{type}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderRegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <motion.div 
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            id="name" 
            type="text" 
            placeholder="Nombre completo" 
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>
        <motion.div 
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
        <motion.div 
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            id="password" 
            type="password" 
            placeholder="Contraseña" 
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>
        {(userType === 'Alumno' || userType === 'Empleado') && (
          <motion.div 
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Input 
              id="code" 
              type="text" 
              placeholder="Código proporcionado" 
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
              required 
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </motion.div>
        )}
        {(userType === 'Empresa' || userType === 'Universidad' || userType === 'ONG') && (
          <motion.div 
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <textarea 
              id="additionalInfo" 
              placeholder="Información adicional para tu solicitud" 
              className="w-full pl-3 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 rounded-md"
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
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
              Procesando...
            </span>
          ) : (
            <span className="text-lg">
              {userType === 'Empresa' || userType === 'Universidad' || userType === 'ONG'
                ? 'Enviar solicitud'
                : 'Registrarse'}
            </span>
          )}
        </Button>
      </motion.div>

      {(userType === 'Voluntario' || userType === 'Alumno' || userType === 'Empleado') && (
        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">o regístrate con</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              onClick={() => handleSocialLogin('google')}
            >
              Google
            </Button>
            <Button
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              onClick={() => handleSocialLogin('facebook')}
            >
              Facebook
            </Button>
          </div>
          {(userType === 'Alumno' || userType === 'Voluntario') && (
            <p className="text-yellow-400 text-sm text-center">
              Nota: El registro con Google o Facebook es altamente recomendado para alumnos y voluntarios.
            </p>
          )}
        </motion.div>
      )}
    </form>
  )

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
          <p className="text-gray-400">Únete a nuestra comunidad</p>
        </motion.div>

        <motion.div 
          className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-blue-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-400">
              {step === 1 ? 'Selecciona tu tipo de usuario' : `Registro como ${userType}`}
            </h2>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderUserTypeSelection()}
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderRegistrationForm()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </motion.div>
      
      </div>

      {/* Footer */}
      <motion.div 
        className="p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <p className="text-sm text-gray-400">
          Al registrarte, aceptas nuestros{' '}
          <Link href="/terms" className="text-green-400 font-semibold hover:underline">
            Términos y Condiciones
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