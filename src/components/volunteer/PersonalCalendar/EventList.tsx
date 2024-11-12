"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import EventCard from "./EventCard"
import { Event } from "@/lib/types"
import { Search, Calendar, X } from "lucide-react"

interface EventListProps {
  events: Event[]
  onSelectEvent: (event: Event) => void
}

export default function EventList({ events, onSelectEvent }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<string | null>(null)

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !filter || event.category === filter
    return matchesSearch && matchesFilter
  })

  const categories = Array.from(new Set(events.map((event) => event.category)))

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          Eventos Programados
        </CardTitle>
        <div className="mt-4 space-y-2">
          <div className="relative">
            <Input
              type="text"
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
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filter === category ? "default" : "secondary"}
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => setFilter(filter === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <EventCard event={event} onViewDetails={() => onSelectEvent(event)} />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 text-center italic mt-8"
              >
                No hay eventos programados que coincidan con tu búsqueda.
              </motion.p>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}