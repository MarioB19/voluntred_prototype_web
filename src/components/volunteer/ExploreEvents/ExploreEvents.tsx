"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import EventDetail from "../EventDetail"
import EventCard from "./EventCard"
import EventFilters from "./EventFilters"
import { Event, mockEvents } from "@/data/volunteer/ExploreEvents"
import { Search, X, ArrowLeft } from "lucide-react"

export default function ExploreEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)

  useEffect(() => {
    const filtered = mockEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ong.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ods.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEvents(filtered)
  }, [searchTerm, activeFilter])

  if (selectedEvent !== null) {
    const event = mockEvents.find(e => e.id === selectedEvent)
    if (event) {
      return <EventDetail event={event} onBack={() => setSelectedEvent(null)} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-6">
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold text-green-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explorar Eventos
      </motion.h1>
      
      <motion.div 
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Buscar eventos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-blue-500 text-white placeholder-gray-400 pr-10"
          />
          {searchTerm ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          )}
        </div>
        <EventFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </motion.div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EventCard event={event} onViewDetails={() => setSelectedEvent(event.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredEvents.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-400 mt-8"
          >
            No se encontraron eventos que coincidan con tu búsqueda.
          </motion.p>
        )}
      </ScrollArea>
    </div>
  )
}