"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Target, Building } from "lucide-react"
import EventDetail from "./EventDetail"
import { Event } from "@/lib/types"



const mockEvents : Event[] = [
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

export default function ExploreEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.ong.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.ods.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (selectedEvent !== null) {
    const event = mockEvents.find(e => e.id === selectedEvent)
    if (event) {
      return <EventDetail event={event} onBack={() => setSelectedEvent(null)} />
    }
  }

  return (
    <div className="space-y-6 bg-black text-white">
      <h1 className="text-3xl font-bold text-green-400">Explorar Eventos</h1>
      
      <div className="space-y-4">
        <Input 
          type="search" 
          placeholder="Buscar eventos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border-blue-500 text-white placeholder-gray-400"
        />
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["Todos", "Categoría", "Ubicación", "Fecha", "ONG", "ODS"].map((filter) => (
            <Button 
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`${
                activeFilter === filter 
                  ? "bg-green-400 text-black" 
                  : "bg-transparent text-white border-blue-500 hover:bg-blue-900"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-900 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-green-400">{event.title}</CardTitle>
                  <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                    {event.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-blue-300">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center  text-blue-300">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Clock className="mr-2 h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Building className="mr-2 h-4 w-4" />
                    {event.ong}
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Target className="mr-2 h-4 w-4" />
                    {event.ods}
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Users className="mr-2 h-4 w-4" />
                    {event.participants} participantes
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4"
                  >
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Patrocinadores:</h4>
                    <div className="flex flex-wrap gap-4">
                      {event.sponsors.map((sponsor, index) => (
                        <div key={index} className="flex flex-col items-center bg-gray-800 rounded-lg p-3 transition-all duration-300 hover:bg-gray-700 hover:scale-105">
                          <img src={sponsor.image} alt={sponsor.name} className="w-16 h-16 object-contain mb-2" />
                          <span className="text-sm font-medium text-blue-300">{sponsor.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}