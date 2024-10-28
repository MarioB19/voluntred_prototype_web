"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Send, FileText, MessageCircle } from 'lucide-react'

import { Users, Inbox, Activity } from 'lucide-react'


// Mock data (unchanged)
const suggestedCompanies = [
  { id: 1, name: "EcoTech Solutions", sector: "Tecnología", location: "Ciudad de México", ods: ["9. Industria, Innovación e Infraestructura", "13. Acción por el Clima"] },
  { id: 2, name: "GreenEnergy Co.", sector: "Energía", location: "Monterrey", ods: ["7. Energía Asequible y No Contaminante", "11. Ciudades y Comunidades Sostenibles"] },
  { id: 3, name: "AquaPure", sector: "Agua y Saneamiento", location: "Guadalajara", ods: ["6. Agua Limpia y Saneamiento", "3. Salud y Bienestar"] },
]

const sentProposals = [
  { id: 1, company: "EcoTech Solutions", event: "Hackathon Ambiental 2024", status: "Enviada", date: "2024-03-15" },
  { id: 2, company: "GreenEnergy Co.", event: "Feria de Energías Renovables", status: "En negociación", date: "2024-02-28" },
  { id: 3, company: "AquaPure", event: "Día Mundial del Agua", status: "Aceptada", date: "2024-01-20" },
]

const receivedProposals = [
  { id: 1, company: "BioFarm", event: "Mercado Orgánico Comunitario", status: "Pendiente", date: "2024-03-20" },
  { id: 2, company: "EduTech", event: "Taller de Programación para Jóvenes", status: "Aceptada", date: "2024-03-05" },
]

const activeSponsors = [
  { id: 1, company: "EcoTech Solutions", event: "Hackathon Ambiental 2024", type: "Financiero", amount: "$5000", benefits: ["Logo en materiales", "Stand en evento", "Menciones en RRSS"] },
  { id: 2, company: "AquaPure", event: "Día Mundial del Agua", type: "En especie", amount: "1000 botellas reutilizables", benefits: ["Logo en botellas", "Presentación en evento"] },
]

const NGOCollaborations = () => {
  const [activeTab, setActiveTab] = useState("collaborations")

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Colaboraciones y Patrocinios</h2>
      <Tabs defaultValue="collaborations" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-gray-800">
        <TabsTrigger value="collaborations" onClick={() => setActiveTab("collaborations")}>
          <Users className="h-5 w-5" />
          <span className="sr-only">Colaboraciones</span>
        </TabsTrigger>
        <TabsTrigger value="proposals" onClick={() => setActiveTab("proposals")}>
          <FileText className="h-5 w-5" />
          <span className="sr-only">Propuestas</span>
        </TabsTrigger>
        <TabsTrigger value="sent" onClick={() => setActiveTab("sent")}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviadas</span>
        </TabsTrigger>
        <TabsTrigger value="received" onClick={() => setActiveTab("received")}>
          <Inbox className="h-5 w-5" />
          <span className="sr-only">Recibidas</span>
        </TabsTrigger>
        <TabsTrigger value="active" onClick={() => setActiveTab("active")}>
          <Activity className="h-5 w-5" />
          <span className="sr-only">Activos</span>
        </TabsTrigger>
      </TabsList>
        <TabsContent value="collaborations" className="mt-4">
          <CollaborationsPanel />
        </TabsContent>
        <TabsContent value="proposals" className="mt-4">
          <ProposalForm />
        </TabsContent>
        <TabsContent value="sent" className="mt-4">
          <SentProposals />
        </TabsContent>
        <TabsContent value="received" className="mt-4">
          <ReceivedProposals />
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <ActiveSponsors />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const CollaborationsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Empresas Sugeridas</h3>
        <Button className="bg-green-500 hover:bg-green-600">
          <Search className="mr-2 h-4 w-4" /> Buscar Empresas
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suggestedCompanies.map((company) => (
          <Card key={company.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Sector: {company.sector}</p>
              <p className="text-sm text-gray-400">Ubicación: {company.location}</p>
              <div className="mt-2 space-y-1">
                {company.ods.map((ods, index) => (
                  <Badge key={index} variant="secondary" className="mr-1">
                    {ods}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                Ver Perfil
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                Enviar Propuesta
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

const ProposalForm = () => {
  const [selectedEvent, setSelectedEvent] = useState("")
  const [sponsorshipType, setSponsorshipType] = useState("")

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Enviar Propuesta de Patrocinio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="event">Seleccionar Evento</Label>
          <Select onValueChange={setSelectedEvent}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Seleccione un evento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hackathon">Hackathon Ambiental 2024</SelectItem>
              <SelectItem value="feria">Feria de Energías Renovables</SelectItem>
              <SelectItem value="dia-agua">Día Mundial del Agua</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Beneficios para el Patrocinador</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="visibility" />
              <label htmlFor="visibility" className="text-sm text-gray-300">Visibilidad en materiales promocionales</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="social-media" />
              <label htmlFor="social-media" className="text-sm text-gray-300">Menciones en redes sociales</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="volunteering" />
              <label htmlFor="volunteering" className="text-sm text-gray-300">Oportunidades de voluntariado corporativo</label>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="sponsorship-type">Tipo de Patrocinio Solicitado</Label>
          <Select onValueChange={setSponsorshipType}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Seleccione el tipo de patrocinio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financiero</SelectItem>
              <SelectItem value="in-kind">En especie</SelectItem>
              <SelectItem value="services">Servicios</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="message">Mensaje Personalizado</Label>
          <Textarea id="message" placeholder="Escriba su carta de presentación aquí..." className="bg-gray-700 border-gray-600 text-white" />
        </div>
        <div>
          <Label htmlFor="file">Adjuntar Documentos (opcional)</Label>
          <Input id="file" type="file" multiple className="bg-gray-700 border-gray-600 text-white" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-500 hover:bg-green-600">
          <Send className="mr-2 h-4 w-4" /> Enviar Propuesta
        </Button>
      </CardFooter>
    </Card>
  )
}

const SentProposals = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Solicitudes Enviadas</h3>
      {sentProposals.map((proposal) => (
        <Card key={proposal.id} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">{proposal.company}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">Evento: {proposal.event}</p>
            <p className="text-sm text-gray-400">Fecha de envío: {proposal.date}</p>
            <Badge 
              variant={
                proposal.status === "Enviada" ? "default" :
                proposal.status === "En negociación" ? "secondary" :
                proposal.status === "Aceptada" ? "outline" : "destructive"
              }
              className="mt-2"
            >
              {proposal.status}
            </Badge>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
              Ver Detalles
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const ReceivedProposals = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Solicitudes Recibidas</h3>
      {receivedProposals.map((proposal) => (
        <Card key={proposal.id} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">{proposal.company}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">Evento: {proposal.event}</p>
            <p className="text-sm text-gray-400">Fecha de recepción: {proposal.date}</p>
            <Badge 
              variant={proposal.status === "Aceptada" ? "outline" : "secondary"}
              className="mt-2"
            >
              {proposal.status}
            </Badge>
          </CardContent>
          <CardFooter className="space-x-2">
            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
              Ver Detalles
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              Aceptar
            </Button>
            <Button variant="destructive" size="sm">
              Rechazar
            </Button>
            <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">
              Responder
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const ActiveSponsors = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Patrocinios Activos</h3>
      {activeSponsors.map((sponsor) => (
        <Card key={sponsor.id} className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">{sponsor.company}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">Evento: {sponsor.event}</p>
            <p className="text-sm text-gray-400">Tipo de patrocinio: {sponsor.type}</p>
            <p className="text-sm text-gray-400">Monto/Valor: {sponsor.amount}</p>
            <div className="mt-2">
              <Label className="text-sm text-gray-300">Beneficios acordados:</Label>
              <ul className="list-disc list-inside text-sm text-gray-400">
                
                {sponsor.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <Label className="text-sm text-gray-300">Cumplimiento de beneficios:</Label>
              <Progress value={33} className="mt-2" />
            </div>
          </CardContent>
          <CardFooter className="space-x-2">
            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
              Ver Detalles
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              Generar Reporte
            </Button>
            <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">
              Enviar Mensaje
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default NGOCollaborations