"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Users, Clock, MapPin, ChevronRight, ChevronDown, ChevronUp, Star } from "lucide-react"
import { recommendedEvents } from "@/data/volunteer/dashboard"

export default function RecommendedEvents() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const toggleEvent = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id)
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-500 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-400 to-blue-500">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Eventos Recomendados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[60vh] pr-2">
          <div className="space-y-3">
            {recommendedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-blue-800 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm truncate">{event.title}</h3>
                          <p className="text-xs text-blue-300 truncate">{event.organization}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-400 text-black text-xs px-2 py-0.5 ml-2 flex-shrink-0">
                          {event.sdg}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-blue-200">
                        <div className="flex items-center">
                          <CalendarDays className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEvent(event.id)}
                          className="text-blue-300 hover:text-blue-100 p-1 h-6 hover:bg-blue-600/50 rounded-full"
                        >
                          {expandedEvent === event.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <AnimatePresence>
                        {expandedEvent === event.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2 mt-2"
                          >
                            <Separator className="bg-blue-600" />
                            <div className="flex items-center text-xs text-blue-200">
                              <Clock className="mr-2 h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{event.time}</span>
                            </div>
                            <div className="flex items-center text-xs text-blue-200">
                              <MapPin className="mr-2 h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center text-xs text-blue-200">
                              <Users className="mr-2 h-3 w-3 flex-shrink-0" />
                              <span>{event.participants} participantes</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Button 
                        className="w-full mt-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium text-xs py-1 h-8 transition-all duration-300 transform hover:scale-105"
                        onClick={() => {/* Handle registration */}}
                      >
                        Inscribirse <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}