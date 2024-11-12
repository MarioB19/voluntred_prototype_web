"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Star, Calendar, Award, TrendingUp, ChevronDown, ChevronUp } from "lucide-react"
import { pastEvents } from "@/data/volunteer/PersonalCalendar"

export default function ParticipationHistory() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
          <Award className="mr-2 h-6 w-6" />
          Historial de Participación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence>
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Card className="bg-gray-800 border-blue-500 hover:border-green-400 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400">{event.title}</h3>
                        <p className="text-sm text-gray-300 flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {event.date.toLocaleDateString()}
                        </p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                              {Array.from({ length: event.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 inline-block text-yellow-400" fill="currentColor" />
                              ))}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Calificación: {event.rating}/5</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="mt-2 text-sm text-gray-300 flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-green-400" />
                      <span className="font-semibold text-green-400 mr-2">Impacto:</span>
                      {event.impact}
                    </div>
                    <AnimatePresence>
                      {expandedEvent === event.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 text-sm text-gray-300"
                        >
                          <p>Detalles adicionales sobre el evento y tu participación...</p>
                          <p className="mt-2">Habilidades desarrolladas: Liderazgo, Trabajo en equipo, Comunicación</p>
                          <p className="mt-2">Horas de voluntariado: 8</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="mt-2 w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                    >
                      {expandedEvent === event.id ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" />
                          Menos detalles
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" />
                          Más detalles
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}