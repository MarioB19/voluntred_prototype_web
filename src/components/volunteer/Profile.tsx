"use client"

import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Edit, Save, Users } from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: true,
    showBio: true,
    showSkills: true,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
  })

  const mockImpactData = [
    { label: "Horas Voluntariadas", value: 120 },
    { label: "Eventos Asistidos", value: 15 },
    { label: "Comunidades Activas", value: 3 },
    { label: "Personas Impactadas", value: 500 },
  ]

  const mockExperiences = [
    { id: 1, title: "Limpieza de Playa", date: "2024-05-15", content: "Increíble experiencia limpiando la playa. ¡Recolectamos más de 100kg de basura!" },
    { id: 2, title: "Taller de Reciclaje", date: "2024-04-22", content: "Aprendí técnicas innovadoras para reciclar y reutilizar materiales. Muy enriquecedor." },
    { id: 3, title: "Maratón de Reforestación", date: "2024-06-05", content: "Plantamos más de 200 árboles en un día. Un paso más hacia un futuro más verde." },
  ]

  const mockCommunities = [
    { id: 1, name: "Eco Guerreros", members: 1500, role: "Miembro Activo" },
    { id: 2, name: "Educadores por el Cambio", members: 800, role: "Líder de Proyecto" },
    { id: 3, name: "Rescate Animal", members: 2000, role: "Colaborador" },
  ]

  return (
    <div className="container mx-auto p-4 space-y-6 bg-black text-white">
      <Card className="bg-gray-900 border-blue-500">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32 border-4 border-blue-500">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2 text-center md:text-left">
              {isEditing ? (
                <>
                  <Input defaultValue="Nombre Usuario" className="text-2xl font-bold bg-gray-800 border-blue-500" />
                  <Input defaultValue="@username" className="text-muted-foreground bg-gray-800 border-blue-500" />
                  <Textarea placeholder="Escribe tu bio aquí..." className="mt-2 bg-gray-800 border-blue-500" />
                  <Input placeholder="Habilidades (separadas por comas)" className="mt-2 bg-gray-800 border-blue-500" />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-blue-400">Nombre Usuario</h2>
                  <p className="text-muted-foreground text-white">@username</p>
                  <p className="mt-2 text-white">Apasionado por el medio ambiente y el cambio social. Siempre buscando nuevas formas de hacer un impacto positivo en mi comunidad.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">Medio Ambiente</Badge>
                    <Badge variant="secondary">Educación</Badge>
                    <Badge variant="secondary">Desarrollo Comunitario</Badge>
                  </div>
                </>
              )}
            </div>
            <Button
              className={`${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
              {isEditing ? 'Guardar' : 'Editar Perfil'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="impact" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="impact" className="text-white data-[state=active]:bg-blue-500">Impacto</TabsTrigger>
          <TabsTrigger value="experiences" className="text-white data-[state=active]:bg-blue-500">Experiencias</TabsTrigger>
          <TabsTrigger value="communities" className="text-white data-[state=active]:bg-blue-500">Comunidades</TabsTrigger>
          <TabsTrigger value="settings" className="text-white data-[state=active]:bg-blue-500">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="impact">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Impacto Generado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockImpactData.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gray-800 rounded-lg border border-blue-500">
                    <h3 className="text-xl font-bold text-blue-400">{item.value}</h3>
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="experiences">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Experiencias Compartidas</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {mockExperiences.map((experience) => (
                  <div key={experience.id} className="mb-4 p-4 bg-gray-800 rounded-lg border border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-400">{experience.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{experience.date}</p>
                    <p className="text-white">{experience.content}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communities">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Comunidades</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {mockCommunities.map((community) => (
                  <div key={community.id} className="mb-4 p-4 bg-gray-800 rounded-lg border border-blue-500 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">{community.name}</h3>
                      <p className="text-sm text-gray-400">{community.members} miembros</p>
                      <Badge variant="outline" className="mt-2">{community.role}</Badge>
                    </div>
                    <Button variant="outline" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black">
                      <Users className="mr-2 h-4 w-4" />
                      Ver Comunidad
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Configuración de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Preferencias de Privacidad</h3>
                  <div className="space-y-4">
                    {Object.entries(privacySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="text-white">
                          {key === 'showEmail' ? 'Mostrar Email' : key === 'showBio' ? 'Mostrar Biografía' : 'Mostrar Habilidades'}
                        </Label>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, [key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="bg-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Gestión de Notificaciones</h3>
                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="text-white">
                          {key === 'emailNotifications' ? 'Notificaciones por Email' : 
                           key === 'pushNotifications' ? 'Notificaciones Push' : 'Recordatorios de Eventos'}
                        </Label>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, [key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}