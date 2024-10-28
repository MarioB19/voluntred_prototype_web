"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, MapPin, Users, Edit, Copy, Trash2, MessageCircle, Plus, Eye } from 'lucide-react'
import { format } from "date-fns"
import { Grid, History, FileText } from 'lucide-react'

interface Event {
  id: number
  title: string
  category: string
  location: string
  date: Date
  time: string
  ong: string
  ods: string
  description: string
  objectives: string[]
  requirements: string[]
  participants: number
  coordinates: { lat: number; lng: number }
  sponsors: Array<{ name: string; image: string }>
  status: 'draft' | 'published'
}

// Mock data (unchanged)
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Limpieza de playa",
    category: "Medio Ambiente",
    location: "Playa del Carmen",
    date: new Date("2024-05-15"),
    time: "09:00",
    ong: "EcoMar",
    ods: "14. Vida Submarina",
    description: "Jornada de limpieza para preservar nuestras playas y proteger la vida marina.",
    objectives: ["Recoger 100kg de basura", "Concientizar sobre la contaminación marina"],
    requirements: ["Llevar guantes", "Protector solar", "Ropa cómoda"],
    participants: 50,
    coordinates: { lat: 20.6296, lng: -87.0739 },
    sponsors: [
      { name: "EcoClean", image: "/placeholder.svg?height=50&width=100" },
      { name: "AguaPura", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'published'
  },
  {
    id: 2,
    title: "Reforestación urbana",
    category: "Medio Ambiente",
    location: "Parque Central",
    date: new Date("2024-06-01"),
    time: "08:00",
    ong: "VerdeVida",
    ods: "15. Vida de Ecosistemas Terrestres",
    description: "Plantación de árboles nativos para mejorar la calidad del aire en la ciudad.",
    objectives: ["Plantar 200 árboles", "Educar sobre la importancia de las áreas verdes urbanas"],
    requirements: ["Llevar pala (si es posible)", "Ropa de trabajo", "Agua"],
    participants: 100,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "GreenFuture", image: "/placeholder.svg?height=50&width=100" },
      { name: "CiudadVerde", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'published'
  },
  {
    id: 3,
    title: "Taller de reciclaje",
    category: "Educación",
    location: "Centro Comunitario",
    date: new Date("2023-04-22"),
    time: "15:00",
    ong: "ReciclaAprende",
    ods: "12. Producción y Consumo Responsables",
    description: "Taller práctico sobre técnicas de reciclaje y reutilización de materiales.",
    objectives: ["Enseñar 5 técnicas de reciclaje", "Crear objetos útiles con materiales reciclados"],
    requirements: ["Traer materiales reciclables", "Tijeras", "Pegamento"],
    participants: 30,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "EcoInnovación", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'published'
  },
  {
    id: 4,
    title: "Maratón solidario",
    category: "Deporte",
    location: "Circuito Urbano",
    date: new Date("2024-09-10"),
    time: "07:00",
    ong: "CorredoresSolidarios",
    ods: "3. Salud y Bienestar",
    description: "Carrera benéfica para recaudar fondos para hospitales infantiles.",
    objectives: ["Recaudar $50,000", "Promover la actividad física"],
    requirements: ["Inscripción previa", "Ropa deportiva", "Hidratación"],
    participants: 500,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "DeportesSanos", image: "/placeholder.svg?height=50&width=100" },
      { name: "AguaVital", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'published'
  },
  {
    id: 5,
    title: "Feria de empleo juvenil",
    category: "Empleo",
    location: "Centro de Convenciones",
    date: new Date("2023-11-15"),
    time: "10:00",
    ong: "JóvenesAlTrabajo",
    ods: "8. Trabajo Decente y Crecimiento Económico",
    description: "Feria de empleo enfocada en oportunidades para jóvenes recién graduados.",
    objectives: ["Conectar 200 jóvenes con empleadores", "Ofrecer talleres de preparación laboral"],
    requirements: ["CV impreso", "Vestimenta formal", "Identificación oficial"],
    participants: 1000,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "EmpleoFuturo", image: "/placeholder.svg?height=50&width=100" },
      { name: "TalentoJoven", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'published'
  },
  {
    id: 6,
    title: "Campaña de donación de sangre",
    category: "Salud",
    location: "Plaza Principal",
    date: new Date("2024-07-05"),
    time: "09:00",
    ong: "SangreVida",
    ods: "3. Salud y Bienestar",
    description: "Campaña de donación de sangre para abastecer hospitales locales.",
    objectives: ["Recolectar 100 unidades de sangre", "Concientizar sobre la importancia de la donación"],
    requirements: ["Mayor de 18 años", "Ayuno de 4 horas", "Identificación oficial"],
    participants: 200,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "HospitalCentral", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'published'
  },
  {
    id: 7,
    title: "Festival de arte urbano",
    category: "Arte y Cultura",
    location: "Barrio Histórico",
    date: new Date("2024-08-20"),
    time: "11:00",
    ong: "ArteCallejero",
    ods: "11. Ciudades y Comunidades Sostenibles",
    description: "Festival de arte urbano para revitalizar espacios públicos.",
    objectives: ["Crear 10 murales", "Involucrar a la comunidad en el arte"],
    requirements: ["Inscripción previa para artistas", "Materiales propios"],
    participants: 50,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "PinturasCrea", image: "/placeholder.svg?height=50&width=100" },
      { name: "GaleríaUrbana", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'draft'
  },
  {
    id: 8,
    title: "Hackathon por la educación",
    category: "Tecnología",
    location: "Campus Universitario",
    date: new Date("2024-10-15"),
    time: "08:00",
    ong: "TechEdu",
    ods: "4. Educación de Calidad",
    description: "Hackathon para desarrollar soluciones tecnológicas para la educación.",
    objectives: ["Crear 5 prototipos funcionales", "Fomentar la innovación en educación"],
    requirements: ["Conocimientos de programación", "Laptop", "Trabajo en equipo"],
    participants: 100,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "SoftwareEdu", image: "/placeholder.svg?height=50&width=100" },
      { name: "InnovaTech", image: "/placeholder.svg?height=50&width=100" }
    ],
    status: 'draft'
  }
]

const NGOEventManagement = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)

  const currentDate = new Date()

  const filterEvents = (events: Event[], filter: string) => {
    switch (filter) {
      case 'upcoming':
        return events.filter(event => event.date > currentDate && event.status === 'published')
      case 'past':
        return events.filter(event => event.date <= currentDate && event.status === 'published')
      case 'draft':
        return events.filter(event => event.status === 'draft')
      default:
        return events
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Gestión de Eventos</h2>
        <Button onClick={() => setIsCreateEventOpen(true)} className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Crear Evento
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-800">
  <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
    <Grid className="h-5 w-5" />
    <span className="sr-only">Todos</span>
  </TabsTrigger>
  <TabsTrigger value="upcoming" onClick={() => setActiveTab("upcoming")}>
    <CalendarIcon className="h-5 w-5" />
    <span className="sr-only">Próximos</span>
  </TabsTrigger>
  <TabsTrigger value="past" onClick={() => setActiveTab("past")}>
    <History className="h-5 w-5" />
    <span className="sr-only">Pasados</span>
  </TabsTrigger>
  <TabsTrigger value="draft" onClick={() => setActiveTab("draft")}>
    <FileText className="h-5 w-5" />
    <span className="sr-only">Borradores</span>
  </TabsTrigger>
</TabsList>
        <TabsContent value="all" className="mt-4">
          <EventList events={mockEvents} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <EventList events={filterEvents(mockEvents, 'upcoming')} />
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <EventList events={filterEvents(mockEvents, 'past')} />
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <EventList events={filterEvents(mockEvents, 'draft')} />
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-lg sm:max-w-2xl md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Evento</DialogTitle>
            <DialogDescription>
              Complete la información del evento en los siguientes pasos.
            </DialogDescription>
          </DialogHeader>
          <NGOCreateEvent onClose={() => setIsCreateEventOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-white">{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-gray-400 flex items-center">
              <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> {format(event.date, 'dd/MM/yyyy')}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 flex items-center mt-1">
              <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> {event.time}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 flex items-center mt-1">
              <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> {event.location}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 flex items-center mt-1">
              <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> {event.participants} participantes
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-full text-xs bg-blue-500 text-white">
                {event.category}
              </span>
              {event.status === 'draft' && (
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-500 text-white">
                  Borrador
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-start gap-2">
            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white text-xs">
              <Eye className="mr-1 h-3 w-3" /> Ver
            </Button>
            <Button variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white text-xs">
              <Edit className="mr-1 h-3 w-3" /> Editar
            </Button>
            <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-white text-xs">
              <Copy className="mr-1 h-3 w-3" /> Duplicar
            </Button>
            <Button variant="outline" size="sm" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white text-xs">
              <Trash2 className="mr-1 h-3 w-3" /> Eliminar
            </Button>
            <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white text-xs">
              <MessageCircle className="mr-1 h-3 w-3" /> Chats
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const NGOCreateEvent = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1)
  
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: '',
    category: '',
    location: '',
    date: new Date(),
    time: '',
    ong: '',
    ods: '',
    description: '',
    objectives: [],
    requirements: [],
    participants: 0,
    coordinates: { lat: 0, lng: 0 },
    sponsors: [],
    status: 'draft'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setEventData(prevData => ({ ...prevData, date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Event Data:', eventData)
    onClose()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm">Título del Evento</Label>
              <Input id="title" name="title" value={eventData.title} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white text-sm" />
            </div>
            <div>
              <Label htmlFor="category" className="text-sm">Categoría</Label>
              <Input id="category" name="category" value={eventData.category} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white text-sm" />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm">Descripción Detallada</Label>
              <Textarea id="description" name="description" value={eventData.description} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white text-sm" />
            </div>
            <div>
              <Label className="text-sm">Fecha del Evento</Label>
              <Calendar
                mode="single"
                selected={eventData.date}
                onSelect={handleDateChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-sm">Hora del Evento</Label>
              <Input type="time" id="time" name="time" value={eventData.time} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white text-sm" />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm">Ubicación</Label>
              <Input id="location" name="location" value={eventData.location} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white text-sm" />
            </div>
            <div>
              <Label htmlFor="ods" className="text-sm">ODS Alineado</Label>
              <Input id="ods" name="ods" value={eventData.ods} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-white text-sm" />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="objectives" className="text-sm">Objetivos (separados por comas)</Label>
              <Textarea 
                id="objectives" 
                name="objectives" 
                value={eventData.objectives?.join(', ')} 
                onChange={(e) => setEventData(prevData => ({ ...prevData, objectives: e.target.value.split(',').map(item => item.trim()) }))}
                className="bg-gray-800 border-gray-700 text-white text-sm" 
              />
            </div>
            <div>
              <Label htmlFor="requirements" className="text-sm">Requisitos (separados por comas)</Label>
              <Textarea 
                id="requirements" 
                name="requirements" 
                value={eventData.requirements?.join(', ')} 
                onChange={(e) => setEventData(prevData => ({ ...prevData, requirements: e.target.value.split(',').map(item => item.trim()) }))}
                className="bg-gray-800 border-gray-700 text-white text-sm" 
              />
            </div>
            <div>
              <Label htmlFor="participants" className="text-sm">Número de Participantes</Label>
              <Input 
                type="number" 
                id="participants" 
                name="participants" 
                value={eventData.participants} 
                onChange={(e) => setEventData(prevData => ({ ...prevData, participants: parseInt(e.target.value) || 0 }))}
                className="bg-gray-800 border-gray-700 text-white text-sm" 
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Coordenadas</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="number" 
                  placeholder="Latitud" 
                  value={eventData.coordinates?.lat}
                //  onChange={(e) => setEventData(prevData => ({ ...prevData, coordinates: { ...prevData.coordinates, lat: parseFloat(e.target.value) || 0 } }))}
                  className="bg-gray-800 border-gray-700 text-white text-sm"
                />
                <Input 
                  type="number" 
                  placeholder="Longitud"
                  value={eventData.coordinates?.lng}
               //   onChange={(e) => setEventData(prevData => ({ ...prevData, coordinates: { ...prevData.coordinates, lng: parseFloat(e.target.value) || 0 } }))}
                  className="bg-gray-800 border-gray-700 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm">Patrocinadores</Label>
              <div className="space-y-2">
                {eventData.sponsors?.map((sponsor, index) => (
                  <div key={index} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input 
                      placeholder="Nombre  del patrocinador"
                      value={sponsor.name}
                      onChange={(e) => {
                        const newSponsors = [...(eventData.sponsors || [])]
                        newSponsors[index] = { ...newSponsors[index], name: e.target.value }
                        setEventData(prevData => ({ ...prevData, sponsors: newSponsors }))
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-sm"
                    />
                    <Input 
                      placeholder="URL de la imagen"
                      value={sponsor.image}
                      onChange={(e) => {
                        const newSponsors = [...(eventData.sponsors || [])]
                        newSponsors[index] = { ...newSponsors[index], image: e.target.value }
                        setEventData(prevData => ({ ...prevData, sponsors: newSponsors }))
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-sm"
                    />
                  </div>
                ))}
                <Button 
                  type="button" 
                  onClick={() => setEventData(prevData => ({ ...prevData, sponsors: [...(prevData.sponsors || []), { name: '', image: '' }] }))}
                  className="bg-blue-500 hover:bg-blue-600 text-sm"
                >
                  Agregar Patrocinador
                </Button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vista Previa del Evento</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg sm:text-xl font-bold">{eventData.title}</h4>
              <p className="text-gray-400 mt-2 text-sm">{eventData.description}</p>
              <div className="mt-4 space-y-2">
                <p className="flex items-center text-sm"><CalendarIcon className="mr-2 h-4 w-4" /> {eventData.date ? format(eventData.date, 'dd/MM/yyyy') : 'Fecha no seleccionada'}</p>
                <p className="flex items-center text-sm"><Clock className="mr-2 h-4 w-4" /> {eventData.time}</p>
                <p className="flex items-center text-sm"><MapPin className="mr-2 h-4 w-4" /> {eventData.location}</p>
                <p className="flex items-center text-sm"><Users className="mr-2 h-4 w-4" /> {eventData.participants} participantes</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="outline" 
                className="flex-1 text-sm"
                onClick={() => setEventData(prevData => ({ ...prevData, status: 'draft' }))}
              >
                Guardar como Borrador
              </Button>
              <Button 
                className="flex-1 bg-green-500 hover:bg-green-600 text-sm"
                onClick={() => setEventData(prevData => ({ ...prevData, status: 'published' }))}
              >
                Publicar Ahora
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderStep()}
      <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-2 sm:space-y-0">
        {step > 1 && (
          <Button type="button" onClick={() => setStep(step - 1)} variant="outline" className="text-sm">
            Anterior
          </Button>
        )}
        {step < 4 ? (
          <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto text-sm">
            Siguiente
          </Button>
        ) : (
          <Button type="submit" className="ml-auto bg-green-500 hover:bg-green-600 text-sm">
            Finalizar
          </Button>
        )}
      </div>
    </form>
  )
}

export default NGOEventManagement