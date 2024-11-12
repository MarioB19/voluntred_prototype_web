"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  Target,
  Building,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { Event } from "@/lib/types"

interface EventDetailProps {
  event: Event
  onBack: () => void
}

export default function EventDetail({ event, onBack }: EventDetailProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [isMapExpanded, setIsMapExpanded] = useState(false)

  const handleRegister = () => {
    setIsRegistering(true)
    // Simular un proceso de registro
    setTimeout(() => {
      setIsRegistering(false)
      alert("¡Te has registrado exitosamente para este evento!")
    }, 1500)
  }

  const getStaticMapUrl = (lat: number, lon: number, zoom: number, width: number, height: number) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-gradient-to-b from-gray-900 to-black text-white p-6 max-w-4xl mx-auto"
    >
      <Button
        variant="ghost"
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la lista de eventos
      </Button>

      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500 shadow-lg">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-green-400">{event.title}</CardTitle>
              <CardDescription className="text-blue-300">{event.ong}</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-900 text-white border-blue-500 px-3 py-1">
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-blue-300 bg-gray-700 rounded-lg p-3 transition-colors hover:bg-gray-600">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{event.location}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-blue-300 bg-gray-700 rounded-lg p-3 transition-colors hover:bg-gray-600">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>{event.date.toLocaleDateString()}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fecha del evento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-blue-300 bg-gray-700 rounded-lg p-3 transition-colors hover:bg-gray-600">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>{event.time}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hora del evento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-blue-300 bg-gray-700 rounded-lg p-3 transition-colors hover:bg-gray-600">
                    <Target className="mr-2 h-5 w-5" />
                    <span>{event.ods}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Objetivo de Desarrollo Sostenible</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-blue-300 bg-gray-700 rounded-lg p-3 transition-colors hover:bg-gray-600">
                    <Users className="mr-2 h-5 w-5" />
                    <span>{event.participants} participantes</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Número de participantes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-2">Descripción</h3>
            <p className="text-white leading-relaxed">{event.description}</p>
          </div>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Objetivos</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {event.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Requisitos</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {event.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Patrocinadores</h3>
                    <ScrollArea className="h-24">
                      <div className="flex flex-wrap gap-4">
                        {event.sponsors.map((sponsor, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-700 rounded-lg p-2 transition-colors hover:bg-gray-600"
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
                    </ScrollArea>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="outline"
            onClick={() => setShowMore(!showMore)}
            className="w-full text-blue-400 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
          >
            {showMore ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Mostrar más
              </>
            )}
          </Button>

          <div className={`relative ${isMapExpanded ? 'h-[600px]' : 'h-[300px]'} transition-all duration-300 ease-in-out`}>
            <div className="absolute inset-0 bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                src={getStaticMapUrl(event.coordinates.lat, event.coordinates.lng, 15, isMapExpanded ? 600 : 300, isMapExpanded ? 600 : 300)}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="Mapa de la ubicación del evento"
              ></iframe>
              <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-75 p-2 rounded">
                <h4 className="text-sm font-semibold text-white">{event.title}</h4>
                <p className="text-xs text-gray-300">{event.location}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 z-10 bg-white text-black hover:bg-gray-200"
              onClick={() => setIsMapExpanded(!isMapExpanded)}
            >
              {isMapExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-400 text-black hover:bg-green-500 font-semibold text-lg py-6 transition-colors duration-200"
            onClick={handleRegister}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-t-2 border-b-2 border-black rounded-full"
              />
            ) : (
              "Inscribirse al evento"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}