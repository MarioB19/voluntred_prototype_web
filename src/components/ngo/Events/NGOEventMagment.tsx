"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Grid, Calendar, History, FileText, Plus, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import EventCategory from "./EventCategory"
import NGOCreateEvent from "./Create/NGOCreateEvent"
import { mockEvents, Event } from "@/data/ngo/Events"

const NGOEventManagement = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)

  const currentDate = new Date()

  const filterEvents = (events: Event[], filter: string) => {
    switch (filter) {
      case 'upcoming':
        return events.filter(event => new Date(event.date) > currentDate && event.status === 'published')
      case 'past':
        return events.filter(event => new Date(event.date) <= currentDate && event.status === 'published')
      case 'draft':
        return events.filter(event => event.status === 'draft')
      default:
        return events
    }
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
  
  }

  useEffect(() => {
    const filtered = mockEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEvents(filtered)
  }, [searchTerm])

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 pb-2">
  Gestión de Eventos
</CardTitle>
          <Button onClick={() => setIsCreateEventOpen(true)} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold transition-all duration-200">
            <Plus className="mr-2 h-5 w-5" /> Crear Evento
          </Button>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar eventos..."
            className="pl-10 bg-gray-800 text-white border-gray-700 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gradient-to-r from-blue-900 to-green-900 p-1 rounded-lg mb-6">
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveTab("all")}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-200"
            >
              <Grid className="h-5 w-5 mr-2" />
              <span>Todos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              onClick={() => setActiveTab("upcoming")}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span>Próximos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              onClick={() => setActiveTab("past")}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-700 data-[state=active]:to-green-700 data-[state=active]:text-white transition-all duration-200"
            >
              <History className="h-5 w-5 mr-2" />
              <span>Pasados</span>
            </TabsTrigger>
            <TabsTrigger 
              value="draft" 
              onClick={() => setActiveTab("draft")}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-200"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span>Borradores</span>
            </TabsTrigger>
          </TabsList>
          <div className="space-y-6">
            <TabsContent value="all">
              <EventCategory 
                title="Próximos Eventos" 
                events={filterEvents(filteredEvents, 'upcoming')} 
                onSelectEvent={handleSelectEvent}
                color="border-green-500"
              />
              <EventCategory 
                title="Eventos Pasados" 
                events={filterEvents(filteredEvents, 'past')} 
                onSelectEvent={handleSelectEvent}
                color="border-purple-500"
              />
              <EventCategory 
                title="Borradores" 
                events={filterEvents(filteredEvents, 'draft')} 
                onSelectEvent={handleSelectEvent}
                color="border-yellow-500"
              />
            </TabsContent>
            <TabsContent value="upcoming">
              <EventCategory 
                title="Próximos Eventos" 
                events={filterEvents(filteredEvents, 'upcoming')} 
                onSelectEvent={handleSelectEvent}
                color="border-green-500"
              />
            </TabsContent>
            <TabsContent value="past">
              <EventCategory 
                title="Eventos Pasados" 
                events={filterEvents(filteredEvents, 'past')} 
                onSelectEvent={handleSelectEvent}
                color="border-purple-500"
              />
            </TabsContent>
            <TabsContent value="draft">
              <EventCategory 
                title="Borradores" 
                events={filterEvents(filteredEvents, 'draft')} 
                onSelectEvent={handleSelectEvent}
                color="border-yellow-500"
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Crear Nuevo Evento</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete la información del evento en los siguientes pasos.
            </DialogDescription>
          </DialogHeader>
          <NGOCreateEvent isOpen={isCreateEventOpen} onClose={() => setIsCreateEventOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default NGOEventManagement