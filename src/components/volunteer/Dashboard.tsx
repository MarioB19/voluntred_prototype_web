"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, Clock, MapPin, ChevronRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Dashboard() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  const impactStats = [
    { label: "Horas Voluntariadas", value: 48 },
    { label: "Eventos Asistidos", value: 12 },
    { label: "Comunidades Activas", value: 3 },
  ]

  const recommendedEvents = [
    {
      id: 1,
      title: "Limpieza de Playa Costera",
      organization: "OceanClean",
      date: "15 Mayo, 2024",
      time: "09:00 AM - 1:00 PM",
      location: "Playa del Carmen",
      participants: 28,
      sdg: "14. Vida Submarina",
    },
    {
      id: 2,
      title: "Taller de Reciclaje Creativo",
      organization: "EcoArte",
      date: "22 Mayo, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Centro Comunitario La Esperanza",
      participants: 15,
      sdg: "12. Producción y Consumo Responsables",
    },
  ]

  const featuredStories = [
    {
      id: 1,
      author: "María González",
      avatar: "/avatar-maria.png",
      story: "Participar en la reforestación del Bosque La Primavera fue una experiencia increíble. Plantamos más de 200 árboles en un solo día!",
      sdg: "15. Vida de Ecosistemas Terrestres",
    },
    {
      id: 2,
      author: "Carlos Ramírez",
      avatar: "/avatar-carlos.png",
      story: "El taller de alfabetización digital para adultos mayores me enseñó la importancia de cerrar la brecha generacional en tecnología.",
      sdg: "4. Educación de Calidad",
    },
  ]

  return (
    <div className="space-y-6 bg-black text-white">
      <motion.h1 
        className="text-3xl font-bold text-green-400"
        {...fadeInUp}
      >
        Bienvenido de vuelta, Voluntario!
      </motion.h1>
      
      <motion.div {...fadeInUp}>
        <Card className="bg-gray-900 border-blue-500">
          <CardHeader>
            <CardTitle className="text-green-400">Resumen de Impacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {impactStats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-4 bg-blue-900 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-green-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-blue-300">Progreso hacia tu meta mensual</h4>
              <Progress value={60} className="h-2 bg-blue-900">
                <div className="h-full bg-green-400" style={{ width: "60%" }} />
              </Progress>
              <p className="text-sm text-blue-300 mt-2">Has completado 12 de 20 horas este mes</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeInUp}>
        <Card className="bg-gray-900 border-blue-500">
          <CardHeader>
            <CardTitle className="text-green-400">Eventos Recomendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredEvent(event.id)}
                  onHoverEnd={() => setHoveredEvent(null)}
                >
                  <Card className="bg-blue-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <p className="text-sm text-blue-300">{event.organization}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-400 text-black">{event.sdg}</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-blue-200">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-blue-200">
                          <Clock className="mr-2 h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-blue-200">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-blue-200">
                          <Users className="mr-2 h-4 w-4" />
                          {event.participants} participantes
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredEvent === event.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button className="w-full mt-4 bg-green-400 text-black hover:bg-green-500">
                          Inscribirse <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeInUp}>
        <Card className="bg-gray-900 border-blue-500">
          <CardHeader>
            <CardTitle className="text-green-400">Historias Destacadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-blue-900">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={story.avatar} alt={story.author} />
                          <AvatarFallback>{story.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{story.author}</h4>
                          <p className="text-sm text-blue-200 mt-1">{story.story}</p>
                          <Badge variant="outline" className="mt-2 border-green-400 text-green-400">{story.sdg}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}