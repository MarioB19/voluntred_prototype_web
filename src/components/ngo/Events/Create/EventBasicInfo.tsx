"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Clock } from 'lucide-react'
import { Event } from "@/data/ngo/Events"

interface EventBasicInfoProps {
  eventData: Partial<Event>
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }
  ) => void
  handleDateChange: (date: Date | undefined) => void
}

const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
  eventData,
  handleInputChange,
  handleDateChange,
}) => {
  const categories = [
    "Medio Ambiente",
    "Educación",
    "Salud",
    "Derechos Humanos",
    "Desarrollo Comunitario",
    "Arte y Cultura",
    "Tecnología",
    "Otros",
  ]
  const odsList = [
    "1. Fin de la pobreza",
    "2. Hambre cero",
    "3. Salud y bienestar",
    "4. Educación de calidad",
    "5. Igualdad de género",
    "6. Agua limpia y saneamiento",
    "7. Energía asequible y no contaminante",
    "8. Trabajo decente y crecimiento económico",
    "9. Industria, innovación e infraestructura",
    "10. Reducción de las desigualdades",
    "11. Ciudades y comunidades sostenibles",
    "12. Producción y consumo responsables",
    "13. Acción por el clima",
    "14. Vida submarina",
    "15. Vida de ecosistemas terrestres",
    "16. Paz, justicia e instituciones sólidas",
    "17. Alianzas para lograr los objetivos",
  ]

  const handleSelectChange = (name: string) => (value: string) => {
    handleInputChange({ name, value })
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-green-900 border-none shadow-lg overflow-hidden">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-200">
            Título del Evento
          </Label>
          <Input
            id="title"
            name="title"
            value={eventData.title || ''}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="Ingrese el título del evento"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-gray-200">
            Categoría
          </Label>
          <Select onValueChange={handleSelectChange('category')} value={eventData.category}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Seleccione una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-200">
            Descripción Detallada
          </Label>
          <Textarea
            id="description"
            name="description"
            value={eventData.description || ''}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[100px]"
            placeholder="Describa el evento en detalle"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-200">Fecha del Evento</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Calendar
                mode="single"
                selected={eventData.date}
                onSelect={handleDateChange}
                className="bg-gray-800 border-gray-700 text-white rounded-md shadow-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium text-gray-200">
              Hora del Evento
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="time"
                id="time"
                name="time"
                value={eventData.time || ''}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white text-sm pl-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ods" className="text-sm font-medium text-gray-200">
            ODS Alineado
          </Label>
          <Select onValueChange={handleSelectChange('ods')} value={eventData.ods}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Seleccione un ODS" />
            </SelectTrigger>
            <SelectContent>
              {odsList.map((ods) => (
                <SelectItem key={ods} value={ods}>
                  {ods}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventBasicInfo
