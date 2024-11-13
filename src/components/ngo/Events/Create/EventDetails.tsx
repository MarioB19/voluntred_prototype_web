import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Target, Clipboard, Users } from 'lucide-react'
import { Event } from "@/data/ngo/Events"

interface EventDetailsProps {
  eventData: Partial<Event>
  setEventData: React.Dispatch<React.SetStateAction<Partial<Event>>>
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventData, setEventData }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-green-900 border-none shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Detalles del Evento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="objectives" className="text-sm font-medium text-gray-200 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Objetivos
          </Label>
          <Textarea 
            id="objectives" 
            name="objectives" 
            value={eventData.objectives?.join('\n')} 
            onChange={(e) => setEventData(prevData => ({ ...prevData, objectives: e.target.value.split('\n').filter(item => item.trim() !== '') }))}
            className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[100px]" 
            placeholder="Ingrese cada objetivo en una nueva línea"
          />
        </div>

        <Separator className="bg-gray-700" />

        <div className="space-y-4">
          <Label htmlFor="requirements" className="text-sm font-medium text-gray-200 flex items-center">
            <Clipboard className="w-4 h-4 mr-2" />
            Requisitos
          </Label>
          <Textarea 
            id="requirements" 
            name="requirements" 
            value={eventData.requirements?.join('\n')} 
            onChange={(e) => setEventData(prevData => ({ ...prevData, requirements: e.target.value.split('\n').filter(item => item.trim() !== '') }))}
            className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[100px]" 
            placeholder="Ingrese cada requisito en una nueva línea"
          />
        </div>

        <Separator className="bg-gray-700" />

        <div className="space-y-4">
          <Label htmlFor="participants" className="text-sm font-medium text-gray-200 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Número de Participantes
          </Label>
          <Input 
            type="number" 
            id="participants" 
            name="participants" 
            value={eventData.participants || ''} 
            onChange={(e) => setEventData(prevData => ({ ...prevData, participants: parseInt(e.target.value) || 0 }))}
            className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200" 
            placeholder="Ej: 50"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default EventDetails