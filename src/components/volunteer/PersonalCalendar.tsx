"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin, ChevronRight } from "lucide-react"
import EventDetail from "./EventDetail"
import { Event } from "@/lib/types"

const scheduledEvents: Event[] = [
    {
      id: 1,
      title: "Limpieza de Playa",
      date: new Date(2024,10,28),
      time: "09:00 AM - 1:00 PM",
      location: "Playa del Carmen",
      category: "Medio Ambiente",
      ong: "OceanClean",
      ods: "14. Vida Submarina",
      description: "Únete a nosotros para limpiar la playa y proteger la vida marina. Esta actividad es crucial para mantener nuestros ecosistemas costeros saludables y libres de contaminación.",
      objectives: ["Recoger 100kg de basura", "Educar sobre el impacto del plástico en los océanos", "Fomentar prácticas sostenibles en la comunidad local"],
      requirements: ["Llevar guantes", "Protector solar", "Botella de agua reutilizable", "Ropa cómoda"],
      participants: 28,
      coordinates: { lat: 20.6296, lng: -87.0739 },
      sponsors: [
        { name: "EcoTech", image: "/empresa.jpg" },
        { name: "GreenFuture", image: "/empresa.jpg" }
      ]
    },
    {
      id: 2,
      title: "Taller de Reciclaje Creativo",
      date: new Date(2024, 10,29),
      time: "3:00 PM - 6:00 PM",
      location: "Centro Comunitario La Esperanza",
      category: "Educación",
      ong: "EcoArte",
      ods: "12. Producción y Consumo Responsables",
      description: "Aprende a crear arte y objetos útiles a partir de materiales reciclados. Este taller te enseñará técnicas creativas para dar nueva vida a objetos que normalmente descartarías.",
      objectives: ["Crear 5 proyectos por participante", "Reducir el desperdicio doméstico", "Inspirar la creatividad y la conciencia ambiental"],
      requirements: ["Traer materiales reciclables", "Tijeras", "Pegamento", "Imaginación y entusiasmo"],
      participants: 15,
      coordinates: { lat: 19.4326, lng: -99.1332 },
      sponsors: [
        { name: "CreativeRecycle", image: "/empresa.jpg" },
        { name: "ArtEco", image: "/empresa.jpg" }
      ]
    },
    {
      id: 3,
      title: "Maratón de Reforestación",
      date: new Date(2024, 10,30),
      time: "7:00 AM - 2:00 PM",
      location: "Bosque de Chapultepec",
      category: "Medio Ambiente",
      ong: "Pulmones Verdes",
      ods: "15. Vida de Ecosistemas Terrestres",
      description: "Participa en nuestra maratón de plantación de árboles para celebrar el Día Mundial del Medio Ambiente. Ayúdanos a restaurar y proteger nuestros bosques urbanos.",
      objectives: ["Plantar 1000 árboles nativos", "Educar sobre la importancia de los bosques urbanos", "Fomentar la conexión con la naturaleza"],
      requirements: ["Ropa y calzado adecuados para trabajo de campo", "Guantes de jardinería", "Botella de agua", "Protector solar"],
      participants: 200,
      coordinates: { lat: 19.4204, lng: -99.1925 },
      sponsors: [
        { name: "GreenCity", image: "/empresa.jpg" },
        { name: "EcoFriends", image: "/empresa.jpg" }
      ]
    },
    {
      id: 4,
      title: "Campaña de Donación de Alimentos",
      date: new Date(2024, 10,27),
      time: "10:00 AM - 4:00 PM",
      location: "Plaza Principal",
      category: "Acción Social",
      ong: "Alimentos para Todos",
      ods: "2. Hambre Cero",
      description: "Ayúdanos a combatir el hambre en nuestra comunidad. Recolectaremos alimentos no perecederos para distribuir a familias necesitadas y bancos de alimentos locales.",
      objectives: ["Recolectar 2 toneladas de alimentos", "Sensibilizar sobre la inseguridad alimentaria", "Fortalecer la red de apoyo comunitario"],
      requirements: ["Donaciones de alimentos no perecederos", "Voluntarios para clasificar y empacar", "Vehículos para transporte (opcional)"],
      participants: 50,
      coordinates: { lat: 19.4326, lng: -99.1332 },
      sponsors: [
        { name: "FoodBank", image: "/empresa.jpg" },
        { name: "CommunityHelpers", image: "/empresa.jpg" }
      ]
    },
    {
      id: 5,
      title: "Hackathon por la Educación",
      date: new Date(2024, 10, 27),
      time: "9:00 AM - 9:00 PM",
      location: "Universidad Tecnológica",
      category: "Tecnología",
      ong: "TechEdu",
      ods: "4. Educación de Calidad",
      description: "Únete a nuestro hackathon de 12 horas para desarrollar soluciones tecnológicas innovadoras que mejoren el acceso y la calidad de la educación en comunidades marginadas.",
      objectives: ["Desarrollar 10 prototipos de aplicaciones educativas", "Conectar desarrolladores con organizaciones educativas", "Fomentar la innovación en EdTech"],
      requirements: ["Laptop", "Conocimientos de programación", "Pasión por la educación y la tecnología"],
      participants: 100,
      coordinates: { lat: 19.4978, lng: -99.1269 },
      sponsors: [
        { name: "TechForGood", image: "/empresa.jpg" },
        { name: "EduInnovate", image: "/empresa.jpg" }
      ]
    },
  ]
  
  // Mock data for past events
  const pastEvents = [
    { id: 1, title: "Donación de Alimentos", date: new Date(2024, 3, 10), rating: 5, impact: "2000 personas alimentadas" },
    { id: 2, title: "Construcción de Viviendas", date: new Date(2024, 2, 20), rating: 4, impact: "3 casas construidas" },
    { id: 3, title: "Limpieza de Río", date: new Date(2024, 1, 5), rating: 5, impact: "500 kg de basura recolectada" },
  ]

  


export default function PersonalCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

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

  useEffect(() => {
    console.log("Fecha seleccionada:", selectedDate)
    console.log("Eventos para la fecha seleccionada:", eventsForSelectedDate)
  }, [selectedDate, eventsForSelectedDate])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-black text-white"
    >
      <h1 className="text-3xl font-bold text-green-400">Calendario Personal</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendario de Eventos */}
        <Card className="bg-gray-900 border-blue-500">
          <CardHeader>
            <CardTitle className="text-green-400">Calendario de Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date)
                }
              }}
              className="rounded-md border border-blue-500"
              modifiers={{
                hasEvent: (date) =>
                  scheduledEvents.some((event) => isSameDate(event.date, date)),
              }}
              modifiersClassNames={{
                hasEvent: "text-green-400 font-bold underline",
              }}
            />
          </CardContent>
        </Card>

        {/* Eventos Programados */}
        <Card className="bg-gray-900 border-blue-500">
          <CardHeader>
            <CardTitle className="text-green-400">Eventos Programados</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 p-4 bg-gray-800 rounded-lg border border-blue-500 hover:border-green-400 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-blue-400">{event.title}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-300 flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-green-400" />
                        {event.time}
                      </p>
                      <p className="text-sm text-gray-300 flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-green-400" />
                        {event.location}
                      </p>
                    </div>
                    <Button
                      className="mt-2 w-full bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Ver más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400 text-center italic">
                  No hay eventos programados para esta fecha.
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Historial de Participación */}
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-green-400">Historial de Participación</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-4 bg-gray-800 rounded-lg border border-blue-500 hover:border-green-400 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">{event.title}</h3>
                    <p className="text-sm text-gray-300">{event.date.toLocaleDateString()}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                    {Array.from({ length: event.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 inline-block text-yellow-400" />
                    ))}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-gray-300 flex items-center">
                  <span className="font-semibold text-green-400 mr-2">Impacto:</span>{" "}
                  {event.impact}
                </p>
              </motion.div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Detalle del Evento Seleccionado */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
