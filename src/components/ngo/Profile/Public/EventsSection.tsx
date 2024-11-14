"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, CalendarCheck } from 'lucide-react'
import { NGOProfile } from '@/data/ngo/Profile'
import { motion, AnimatePresence } from "framer-motion"

export interface EventsSectionProps {
  events: NGOProfile['events']
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming")

  const EventCard: React.FC<{ event: NGOProfile['events']['upcoming'][0] | NGOProfile['events']['past'][0], isPast: boolean }> = ({ event, isPast }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4 bg-gray-700 border-gray-600 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 py-3">
          <CardTitle className="text-lg font-semibold text-white">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-300 flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-blue-400" /> {event.date}
            </p>
            {!isPast && (
              <p className="text-sm text-gray-300 flex items-center">
                <Clock className="mr-2 h-4 w-4 text-green-400" /> {event.time}
              </p>
            )}
            {!isPast && (
              <p className="text-sm text-gray-300 flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-red-400" /> {event.location}
              </p>
            )}
            <p className="text-sm text-gray-300 flex items-center">
              <Users className="mr-2 h-4 w-4 text-yellow-400" /> 
              {isPast ? `${event.volunteers} voluntarios participaron` : `${event.volunteers} voluntarios necesarios`}
            </p>
          </div>
          {isPast && (
            <Button variant="outline" size="sm" className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
              Ver Detalles
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <CalendarCheck className="mr-2 h-6 w-6 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Eventos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="upcoming" className="w-full" onValueChange={(value) => setActiveTab(value as "upcoming" | "past")}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger 
                value="upcoming"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Próximos
              </TabsTrigger>
              <TabsTrigger 
                value="past"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Pasados
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[400px] rounded-md border border-gray-700 p-4">
              <AnimatePresence mode="wait">
                {activeTab === "upcoming" && (
                  <TabsContent value="upcoming" className="mt-0">
                    {events.upcoming.map((event, i) => (
                      <EventCard key={i} event={event} isPast={false} />
                    ))}
                  </TabsContent>
                )}
                {activeTab === "past" && (
                  <TabsContent value="past" className="mt-0">
                    {events.past.map((event, i) => (
                      <EventCard key={i} event={event} isPast={true} />
                    ))}
                  </TabsContent>
                )}
              </AnimatePresence>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EventsSection