"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Plus, Upload, Link as LinkIcon, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const NGOProfile = () => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Perfil de la ONG</h1>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-green-500 hover:bg-green-600">
          {isEditing ? 'Ver Perfil Público' : 'Editar Perfil'}
        </Button>
      </div>
      {isEditing ? <EditProfile /> : <PublicProfile />}
    </div>
  )
}

const PublicProfile = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
             
              <AvatarFallback>NGO</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-white">ONG Ejemplo</CardTitle>
              <p className="text-sm text-gray-400">Trabajando por un mundo mejor</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Somos una organización dedicada a mejorar la calidad de vida de las comunidades más vulnerables a través de proyectos sostenibles y educación.
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">ODS Alineados</h3>
            <div className="flex flex-wrap gap-2">
              {['1. Fin de la Pobreza', '4. Educación de Calidad', '13. Acción por el Clima'].map((ods) => (
                <Badge key={ods} variant="secondary">{ods}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Galería Multimedia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img key={i} src={`/experiencia.jpg`} alt={`Imagen ${i}`} className="rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="past">Pasados</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <ScrollArea className="h-[300px]">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="mb-4 bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Evento Próximo {i}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 flex items-center"><Calendar className="mr-2 h-4 w-4" /> 15 de Mayo, 2024</p>
                      <p className="text-sm text-gray-300 flex items-center"><Clock className="mr-2 h-4 w-4" /> 10:00 AM</p>
                      <p className="text-sm text-gray-300 flex items-center"><MapPin className="mr-2 h-4 w-4" /> Parque Central</p>
                      <p className="text-sm text-gray-300 flex items-center"><Users className="mr-2 h-4 w-4" /> 50 voluntarios necesarios</p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="past">
              <ScrollArea className="h-[300px]">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="mb-4 bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Evento Pasado {i}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 flex items-center"><Calendar className="mr-2 h-4 w-4" /> 15 de Abril, 2024</p>
                      <p className="text-sm text-gray-300 flex items-center"><Users className="mr-2 h-4 w-4" /> 45 voluntarios participaron</p>
                      <Button variant="outline" size="sm" className="mt-2">Ver Detalles</Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Patrocinadores y Aliados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={`/empresa.jpg`} alt={`Patrocinador ${i}`} />
                  <AvatarFallback>S{i}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-300 text-center">Patrocinador {i}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const EditProfile = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Información de la Organización</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="NGO Logo" />
                <AvatarFallback>NGO</AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Cambiar Logo
              </Button>
            </div>
            <div>
              <Label htmlFor="ngo-name">Nombre de la Organización</Label>
              <Input id="ngo-name" defaultValue="ONG Ejemplo" className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="ngo-description">Descripción</Label>
              <Textarea id="ngo-description" defaultValue="Somos una organización dedicada a mejorar la calidad de vida de las comunidades más vulnerables a través de proyectos sostenibles y educación." className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <Label>ODS Alineados</Label>
              <div className="grid grid-cols-2 gap-2">
                {['1. Fin de la Pobreza', '2. Hambre Cero', '3. Salud y Bienestar', '4. Educación de Calidad'].map((ods) => (
                  <div key={ods} className="flex items-center space-x-2">
                    <Checkbox id={ods} />
                    <label htmlFor={ods} className="text-sm text-gray-300">{ods}</label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" defaultValue="Calle Principal 123, Ciudad" className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" defaultValue="+1234567890" className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" defaultValue="contacto@ongejemplo.org" className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="website">Sitio Web</Label>
              <Input id="website" type="url" defaultValue="https://www.ongejemplo.org" className="bg-gray-700 border-gray-600 text-white" />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Redes Sociales</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {[
              { icon: Facebook, label: 'Facebook', placeholder: 'https://facebook.com/ongejemplo' },
              { icon: Twitter, label: 'Twitter', placeholder: 'https://twitter.com/ongejemplo' },
              { icon: Instagram, label: 'Instagram', placeholder: 'https://instagram.com/ongejemplo' },
              { icon: Linkedin, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/ongejemplo' },
            ].map((social) => (
              <div key={social.label} className="flex items-center space-x-2">
                <social.icon className="h-5 w-5 text-gray-400" />
                <Input placeholder={social.placeholder} className="bg-gray-700 border-gray-600 text-white" />
              </div>
            ))}
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Galería Multimedia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative group">
                <img src={`/experiencia.jpg`} alt={`Imagen ${i}`} className="rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" /> Agregar Imagen o Video
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Documentos y Certificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <LinkIcon className="mr-2 h-4 w-4  text-gray-400" />
                  <span className="text-sm text-gray-300">Documento {i}.pdf</span>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            <Upload className="mr-2 h-4 w-4" /> Subir Nuevo Documento
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-green-500 hover:bg-green-600">Guardar Cambios</Button>
      </div>
    </div>
  )
}

export default NGOProfile