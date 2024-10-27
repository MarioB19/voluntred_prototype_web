"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Search, Users, Heart, Bell, User, MapPin, Clock, Award, ChevronRight, Settings, LogOut, Edit, Camera, MessageCircle, Send, Moon, Sun, ArrowLeft, Share2, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const lightColors = {
  primary: "#FF3B30",
  secondary: "#007AFF",
  accent: "#4CD964",
  background: "#F2F2F7",
  text: "#000000",
  logoBackground: "#FF3B30",
  logoText: "#FFFFFF",
}

const darkColors = {
  primary: "#FF453A",
  secondary: "#0A84FF",
  accent: "#32D74B",
  background: "#1C1C1E",
  text: "#FFFFFF",
  logoBackground: "#FF453A",
  logoText: "#FFFFFF",
}

interface NGO {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  description: string;
  ods: string;
  category: string;
  participants: number;
  maxParticipants: number;
  organizer: NGO;
  requirements: string[];
  contactEmail: string;
  website: string;
  sponsors: Sponsor[];
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("eventos")
  const [favorites, setFavorites] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [activeTab, selectedEvent])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const colors = isDarkMode ? darkColors : lightColors

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    )
  }

  const showConfirmationDialog = (action: () => void) => {
    setConfirmAction(() => action)
    setShowConfirmDialog(true)
  }

  const events: Event[] = [
    {
      id: "1",
      title: "Limpieza de Playa",
      image: "/placeholder.svg?height=400&width=800",
      date: "15 de Julio, 2023",
      time: "09:00 AM",
      location: "Playa del Sol, Ciudad Costera",
      description: "Únete a nosotros para limpiar la playa local y proteger nuestro ecosistema marino. Esta actividad es parte de nuestro programa mensual de conservación costera. Trabajaremos en equipos para recolectar basura, clasificar materiales reciclables y documentar los tipos de desechos encontrados para futuros estudios ambientales.",
      ods: "14. Vida Submarina",
      category: "Medio Ambiente",
      participants: 45,
      maxParticipants: 100,
      organizer: {
        id: "ong1",
        name: "EcoMar",
        logo: "/placeholder.svg?height=100&width=100",
        description: "ONG dedicada a la conservación de ecosistemas marinos y costeros."
      },
      requirements: ["Llevar guantes", "Botella de agua reutilizable", "Protector solar"],
      contactEmail: "info@ecomar.org",
      website: "https://www.ecomar.org/limpieza-playa",
      sponsors: [
        { id: "s1", name: "EcoClean", logo: "/placeholder.svg?height=50&width=50" },
        { id: "s2", name: "OceanLife", logo: "/placeholder.svg?height=50&width=50" }
      ]
    },
    {
      id: "2",
      title: "Maratón por la Educación",
      image: "/placeholder.svg?height=400&width=800",
      date: "22 de Julio, 2023",
      time: "07:00 AM",
      location: "Parque Central, Ciudad Deportiva",
      description: "Corre por una buena causa. Los fondos recaudados irán a programas educativos para niños de bajos recursos. Habrá carreras de 5K, 10K y media maratón. Todos los participantes recibirán una medalla y una camiseta conmemorativa.",
      ods: "4. Educación de Calidad",
      category: "Deporte",
      participants: 230,
      maxParticipants: 500,
      organizer: {
        id: "ong2",
        name: "Fundación Educación para Todos",
        logo: "/placeholder.svg?height=100&width=100",
        description: "ONG enfocada en mejorar el acceso a la educación en comunidades vulnerables."
      },
      requirements: ["Estar en buena condición física", "Llevar ropa deportiva cómoda"],
      contactEmail: "info@educacionparatodos.org",
      website: "https://www.educacionparatodos.org/maraton",
      sponsors: [
        { id: "s3", name: "SportLife", logo: "/placeholder.svg?height=50&width=50" },
        { id: "s4", name: "HealthyDrink", logo: "/placeholder.svg?height=50&width=50" }
      ]
    },
    {
      id: "3",
      title: "Plantación de Árboles",
      image: "/placeholder.svg?height=400&width=800",
      date: "5 de Agosto, 2023",
      time: "10:00 AM",
      location: "Bosque Nacional, Ciudad Verde",
      description: "Ayuda a combatir el cambio climático plantando árboles en nuestra comunidad. Aprenderás sobre especies nativas y técnicas de plantación. Cada voluntario plantará al menos 5 árboles y recibirá un certificado de participación.",
      ods: "13. Acción por el Clima",
      category: "Medio Ambiente",
      participants: 80,
      maxParticipants: 150,
      organizer: {
        id: "ong3",
        name: "Asociación Bosques Vivos",
        logo: "/placeholder.svg?height=100&width=100",
        description: "ONG dedicada a la reforestación y conservación de bosques nativos."
      },
      requirements: ["Llevar guantes de jardinería", "Botas resistentes", "Protector solar"],
      contactEmail: "voluntarios@bosquesvivos.org",
      website: "https://www.bosquesvivos.org/plantacion",
      sponsors: [
        { id: "s5", name: "GreenLife", logo: "/placeholder.svg?height=50&width=50" },
        { id: "s6", name: "EcoTools", logo: "/placeholder.svg?height=50&width=50" }
      ]
    }
  ]

  const chats = [
    { id: 1, name: "Grupo Limpieza de Playa", lastMessage: "¿Alguien trae bolsas extra?", time: "10:30 AM" },
    { id: 2, name: "María González", lastMessage: "Gracias por tu ayuda ayer", time: "Ayer" },
    { id: 3, name: "Equipo Maratón", lastMessage: "La ruta está lista para mañana", time: "Lun" },
  ]
  
  const renderLogo = () => (
    <motion.h1 
      className="text-xl font-bold px-4 py-2 rounded"
      style={{ 
        backgroundColor: colors.logoBackground, 
        color: colors.logoText,
        fontFamily: "'Roboto', sans-serif"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      VoluntRED
    </motion.h1>
  )

  const renderChatView = () => {
    if (selectedChat === null) {
      return (
        <div className="space-y-4">
          {chats.map(chat => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedChat(chat.id)}
            >
              <Card style={{ backgroundColor: colors.background, borderColor: colors.secondary, cursor: 'pointer' }}>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg" style={{ color: colors.text }}>{chat.name}</CardTitle>
                    <p className="text-sm" style={{ color: colors.secondary }}>{chat.lastMessage}</p>
                  </div>
                  <span className="text-xs" style={{ color: colors.text }}>{chat.time}</span>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      )
    } else {
      const chat = chats.find(c => c.id === selectedChat)
      return (
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 border-b" style={{ borderColor: colors.secondary }}>
            <Button variant="ghost" onClick={() => setSelectedChat(null)}>
              <ArrowLeft className="h-6 w-6" style={{ color: colors.text }} />
            </Button>
            <Avatar className="w-10 h-10 ml-2">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={chat?.name} />
              <AvatarFallback>{chat?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="ml-2 font-semibold" style={{ color: colors.text }}>{chat?.name}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-center text-sm" style={{ color: colors.secondary }}>No hay mensajes aún</p>
          </div>
          <div className="p-4 border-t" style={{ borderColor: colors.secondary }}>
            <div className="flex items-center">
              <Input 
                placeholder="Escribe un mensaje..." 
                className="flex-1 mr-2"
                style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }}
              />
              <Button style={{ backgroundColor: colors.primary }}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderEventList = () => (
    <div className="space-y-4">
      {events.map(event => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="overflow-hidden cursor-pointer" style={{ backgroundColor: colors.background, borderColor: colors.secondary }} onClick={() => setSelectedEvent(event)}>
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center" style={{ color: colors.text }}>
                {event.title}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                  style={{ color: favorites.includes(event.id) ? colors.primary : colors.text }}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mb-2" style={{ color: colors.text }}>
                <Calendar className="w-4 h-4 mr-1" style={{ color: colors.secondary }} />
                <span>{event.date}</span>
                <Clock className="w-4 h-4 ml-2 mr-1" style={{ color: colors.secondary }} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm mb-2" style={{ color: colors.text }}>
                <MapPin className="w-4 h-4 mr-1" style={{ color: colors.secondary }} />
                <span>{event.location}</span>
              </div>
              <p className="mb-2 text-sm" style={{ color: colors.text }}>{event.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" style={{ backgroundColor: colors.secondary, color: colors.text }}>{event.ods}</Badge>
                <Badge variant="outline" style={{ borderColor: colors.accent, color: colors.accent }}>{event.category}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm" style={{ color: colors.text }}>
                  <span>Participantes</span>
                  <span>{event.participants}/{event.maxParticipants}</span>
                </div>
                <Progress value={(event.participants / event.maxParticipants) * 100} className="h-2" style={{ backgroundColor: colors.secondary }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderEventDetail = () => {
    if (!selectedEvent) return null;

    return (
      <div className="space-y-4 pb-16">
        <Button variant="ghost" onClick={() => setSelectedEvent(null)} style={{ color: colors.text }}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la lista de eventos
        </Button>
        <Card style={{ backgroundColor: colors.background, borderColor: colors.secondary }}>
          <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-48 object-cover" />
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl" style={{ color: colors.text }}>{selectedEvent.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(selectedEvent.id)}
                style={{ color: favorites.includes(selectedEvent.id) ? colors.primary : colors.text }}
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm" style={{ color: colors.text }}>
              <Calendar className="w-5 h-5 mr-2" style={{ color: colors.secondary }} />
              <span>{selectedEvent.date}</span>
              <Clock className="w-5 h-5 ml-4 mr-2" style={{ color: colors.secondary }} />
              <span>{selectedEvent.time}</span>
            </div>
            <div className="flex items-center text-sm" style={{ color: colors.text }}>
              <MapPin className="w-5 h-5 mr-2" style={{ color: colors.secondary }} />
              <span>{selectedEvent.location}</span>
            </div>
            <p style={{ color: colors.text }}>{selectedEvent.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" style={{ backgroundColor: colors.secondary, color: colors.text }}>{selectedEvent.ods}</Badge>
              <Badge variant="outline" style={{ borderColor: colors.accent, color: colors.accent }}>{selectedEvent.category}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm" style={{ color: colors.text }}>
                <span>Participantes</span>
                <span>{selectedEvent.participants}/{selectedEvent.maxParticipants}</span>
              </div>
              <Progress value={(selectedEvent.participants / selectedEvent.maxParticipants) * 100} className="h-2" style={{ backgroundColor: colors.secondary }} />
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>Organizador</h3>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEvent.organizer.logo} alt={selectedEvent.organizer.name} />
                  <AvatarFallback>{selectedEvent.organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium" style={{ color: colors.text }}>{selectedEvent.organizer.name}</p>
                  <p className="text-sm" style={{ color: colors.secondary }}>{selectedEvent.organizer.description}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>Requisitos</h3>
              <ul className="list-disc list-inside" style={{ color: colors.text }}>
                {selectedEvent.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{   color: colors.text }}>Contacto</h3>
              <p style={{ color: colors.text }}>Email: {selectedEvent.contactEmail}</p>
              <a href={selectedEvent.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm" style={{ color: colors.secondary }}>
                <ExternalLink className="w-4 h-4 mr-1" />
                Visitar sitio web
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>Patrocinadores</h3>
              <div className="flex flex-wrap gap-4">
                {selectedEvent.sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="flex flex-col items-center">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={sponsor.logo} alt={sponsor.name} />
                      <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs mt-1" style={{ color: colors.text }}>{sponsor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              className="flex-1 mr-2" 
              style={{ backgroundColor: colors.primary, color: colors.text }}
              onClick={() => showConfirmationDialog(() => console.log(`Registrado en ${selectedEvent.title}`))}
            >
              Registrarse
            </Button>
            <Button variant="outline" style={{ borderColor: colors.secondary, color: colors.text }}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </CardFooter>
        </Card>
        <Card style={{ backgroundColor: colors.background, borderColor: colors.secondary }}>
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>Comentarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Escribe un comentario..." style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }} />
            <Button className="mt-2" style={{ backgroundColor: colors.primary, color: colors.text }}>Enviar comentario</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ease-in-out ${isDarkMode ? 'dark' : ''}`} style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* App Bar */}
      <motion.div 
        className="p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10" 
        style={{ backgroundColor: colors.primary }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {renderLogo()}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuario" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ backgroundColor: colors.background, color: colors.text }}>
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("perfil")}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("configuracion")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => showConfirmationDialog(() => console.log("Cerrar sesión"))}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="p-4 shadow fixed top-16 left-0 right-0 z-10" 
        style={{ backgroundColor: colors.background }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.secondary }} />
          <Input 
            type="search" 
            placeholder="Buscar eventos o comunidades" 
            className="pl-10" 
            style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden mt-32">
        <TabsList className="grid w-full grid-cols-4 fixed top-32 left-0 right-0 z-10" style={{ backgroundColor: colors.background }}>
          <TabsTrigger value="eventos" style={{ color: activeTab === "eventos" ? colors.primary : colors.text }}>Eventos</TabsTrigger>
          <TabsTrigger value="comunidades" style={{ color: activeTab === "comunidades" ? colors.primary : colors.text }}>Comunidades</TabsTrigger>
          <TabsTrigger value="chats" style={{ color: activeTab === "chats" ? colors.primary : colors.text }}>Chats</TabsTrigger>
          <TabsTrigger value="perfil" style={{ color: activeTab === "perfil" ? colors.primary : colors.text }}>Perfil</TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto p-4 space-y-4 mt-12 pb-16"
            ref={scrollRef}
          >
            <TabsContent value="eventos">
              {selectedEvent ? renderEventDetail() : renderEventList()}
            </TabsContent>
            <TabsContent value="comunidades">
              <Card style={{ backgroundColor: colors.background, borderColor: colors.secondary }}>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Amigos de los Animales" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle style={{ color: colors.text }}>Amigos de los Animales</CardTitle>
                    <p className="text-sm" style={{ color: colors.secondary }}>500+ miembros</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2" style={{ color: colors.text }}>Grupo dedicado al cuidado y protección de animales abandonados.</p>
                  <Badge variant="outline" className="mr-2" style={{ borderColor: colors.accent, color: colors.accent }}>Animales</Badge>
                  <Badge variant="outline" style={{ borderColor: colors.accent, color: colors.accent }}>Protección</Badge>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: colors.primary, color: colors.text }}
                    onClick={() => showConfirmationDialog(() => console.log("Unido a Amigos de los Animales"))}
                  >
                    Unirse
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="chats">
              {renderChatView()}
            </TabsContent>
            <TabsContent value="perfil">
              <Card style={{ backgroundColor: colors.background, borderColor: colors.secondary }}>
                <CardHeader>
                  <CardTitle className="text-lg" style={{ color: colors.text }}>Mi Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@usuario" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="mt-2" style={{ color: colors.secondary }}>
                      <Camera className="w-4 h-4 mr-2" />
                      Cambiar foto
                    </Button>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.text }}>Nombre</label>
                    <Input defaultValue="Juan Pérez" style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.text  }}>Correo electrónico</label>
                    <Input defaultValue="juan@example.com" type="email" style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.text }}>Biografía</label>
                    <Input defaultValue="Apasionado por el voluntariado y el cambio social." style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: colors.primary, color: colors.text }}
                    onClick={() => showConfirmationDialog(() => console.log("Cambios guardados"))}
                  >
                    Guardar Cambios
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="configuracion">
              <Card style={{ backgroundColor: colors.background, borderColor: colors.secondary }}>
                <CardHeader>
                  <CardTitle className="text-lg" style={{ color: colors.text }}>Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" style={{ color: colors.text }}>Modo Oscuro</Label>
                    <Switch
                      id="dark-mode"
                      checked={isDarkMode}
                      onCheckedChange={toggleDarkMode}
                      className="bg-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" style={{ color: colors.text }}>Notificaciones</Label>
                    <Switch id="notifications" className="bg-green-500" />
                  </div>
                  <div>
                    <Label htmlFor="language" style={{ color: colors.text }}>Idioma</Label>
                    <select
                      id="language"
                      className="w-full mt-1 p-2 rounded-md"
                      style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.secondary }}
                    >
                      <option>Español</option>
                      <option>English</option>
                      <option>Français</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: colors.primary, color: colors.text }}
                    onClick={() => showConfirmationDialog(() => console.log("Configuración guardada"))}
                  >
                    Guardar Configuración
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Bottom Navigation */}
      <motion.div 
        className="flex justify-around p-2 fixed bottom-0 left-0 right-0 z-10" 
        style={{ backgroundColor: colors.background, borderTopColor: colors.secondary, borderTopWidth: 1 }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Button variant="ghost" size="icon" onClick={() => setActiveTab("eventos")} style={{ color: activeTab === "eventos" ? colors.primary : colors.text }}>
          <Calendar className="h-6 w-6" />
          <span className="sr-only">Eventos</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setActiveTab("comunidades")} style={{ color: activeTab === "comunidades" ? colors.primary : colors.text }}>
          <Users className="h-6 w-6" />
          <span className="sr-only">Comunidades</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setActiveTab("chats")} style={{ color: activeTab === "chats" ? colors.primary : colors.text }}>
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Chats</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setActiveTab("perfil")} style={{ color: activeTab === "perfil" ? colors.primary : colors.text }}>
          <User className="h-6 w-6" />
          <span className="sr-only">Perfil</span>
        </Button>
      </motion.div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent style={{ backgroundColor: colors.background, color: colors.text }}>
          <DialogHeader>
            <DialogTitle>Confirmar acción</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres realizar esta acción?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
            <Button onClick={() => {
              confirmAction()
              setShowConfirmDialog(false)
            }}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}