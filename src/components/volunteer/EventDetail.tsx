"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  Target,
  Building,
  ArrowLeft,
} from "lucide-react"
import { Event } from "@/lib/types"

interface EventDetailProps {
  event: Event
  onBack: () => void
}

export default function EventDetail({ event, onBack }: EventDetailProps) {
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = () => {
    setIsRegistering(true)
    // Simular un proceso de registro
    setTimeout(() => {
      setIsRegistering(false)
      alert("¡Te has registrado exitosamente para este evento!")
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-black text-white"
    >
      <Button
        variant="ghost"
        className="text-blue-400 hover:text-blue-300"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la lista de eventos
      </Button>

      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl text-green-400">{event.title}</CardTitle>
          <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
            {event.category}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-blue-300">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center text-blue-300">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {event.date.toLocaleDateString()}
            </div>
            <div className="flex items-center text-blue-300">
              <Clock className="mr-2 h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center text-blue-300">
              <Building className="mr-2 h-4 w-4" />
              {event.ong}
            </div>
            <div className="flex items-center text-blue-300">
              <Target className="mr-2 h-4 w-4" />
              {event.ods}
            </div>
            <div className="flex items-center text-blue-300">
              <Users className="mr-2 h-4 w-4" />
              {event.participants} participantes
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Descripción</h3>
            <p className="text-white">{event.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Objetivos</h3>
            <ul className="list-disc list-inside text-white">
              {event.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Requisitos</h3>
            <ul className="list-disc list-inside text-white">
              {event.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Patrocinadores</h3>
            <div className="flex flex-wrap gap-4">
              {event.sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="w-16 h-8 object-contain mr-2"
                  />
                  <span className="text-sm text-blue-300">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15007.59326670526!2d${event.coordinates.lng}!3d${event.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2s!4v1652893703651!5m2!1ses!2s`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-400 text-black hover:bg-green-500"
            onClick={handleRegister}
            disabled={isRegistering}
          >
            {isRegistering ? "Registrando..." : "Inscribirse al evento"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
