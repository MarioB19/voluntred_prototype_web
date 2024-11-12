"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EventList from "./EventList"
import ParticipationHistory from "./ParticipationHistory"
import { scheduledEvents } from "@/data/volunteer/PersonalCalendar"
import { Event } from "@/lib/types"
import { CalendarDays, MapPin, Users, Target, Clock, X, History } from "lucide-react"

export default function PersonalCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const eventsForSelectedDate = scheduledEvents.filter((event) =>
    isSameDate(event.date, selectedDate)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-400">Calendario Personal</h1>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showHistory ? "Ver Calendario" : "Ver Historial"}
            <History className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {!showHistory ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800/50 border-blue-500/50 shadow-lg backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <CardTitle className="text-2xl font-bold text-green-400 mb-4">Calendario de Eventos</CardTitle>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border border-blue-500/50 bg-gray-800/30 p-3"
                        modifiers={{
                          hasEvent: (date) =>
                            scheduledEvents.some((event) => isSameDate(event.date, date)),
                        }}
                        modifiersClassNames={{
                          hasEvent: "bg-green-400 text-gray-900 font-bold",
                        }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-green-400 mb-4">Eventos del Día</CardTitle>
                      <EventList 
                        events={eventsForSelectedDate} 
                        onSelectEvent={setSelectedEvent} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800/50 border-blue-500/50 shadow-lg backdrop-blur-sm">
                <CardHeader>
                 
                </CardHeader>
                <CardContent>
                  <ParticipationHistory />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-gray-800/95 text-white border-blue-500/50 max-w-3xl backdrop-blur-sm">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-green-400">
                {selectedEvent?.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white hover:bg-blue-600/20"
              >
             
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/50">
                {selectedEvent?.category}
              </Badge>
            </div>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh] pr-4">
            {selectedEvent && (
              <div className="space-y-6">
                <p className="text-blue-200 leading-relaxed">{selectedEvent.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-blue-300">
                    <Clock className="mr-2 h-5 w-5 text-green-400" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <MapPin className="mr-2 h-5 w-5 text-green-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Users className="mr-2 h-5 w-5 text-green-400" />
                    <span>{selectedEvent.participants} participantes</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Target className="mr-2 h-5 w-5 text-green-400" />
                    <span>{selectedEvent.ods}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Objetivos</h3>
                  <ul className="space-y-2 text-blue-200">
                    {selectedEvent.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Requisitos</h3>
                  <ul className="space-y-2 text-blue-200">
                    {selectedEvent.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </ScrollArea>
          <div className="mt-6">
            <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300">
              Inscribirse al evento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}