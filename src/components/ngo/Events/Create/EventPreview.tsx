"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Users, Target, Clipboard, Globe } from 'lucide-react'
import { format } from "date-fns"
import { Event } from '@/data/ngo/Events'

interface EventPreviewProps {
  eventData: Partial<Event>
  setEventData: React.Dispatch<React.SetStateAction<Partial<Event>>>
  onPublish: () => void
}
const EventPreview: React.FC<EventPreviewProps> = ({ eventData, setEventData, onPublish }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePublish = () => {
    setShowConfirmation(true)
  }

  const confirmPublish = () => {
    setEventData(prevData => ({ ...prevData, status: 'published' }))
    setShowConfirmation(false)
    onPublish()
  }

  return (
    <>
      <Card className="w-full bg-gradient-to-br from-blue-900 to-green-900 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Vista Previa del Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{eventData.title}</h2>
            <Badge variant="secondary" className="bg-blue-500 text-white">
              {eventData.category}
            </Badge>
          </div>
          <p className="text-gray-200 text-lg">{eventData.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-3 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-blue-300" />
              <span>{eventData.date ? format(eventData.date, 'dd/MM/yyyy') : 'Fecha no seleccionada'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-3 rounded-lg">
              <Clock className="h-5 w-5 text-blue-300" />
              <span>{eventData.time || 'Hora no especificada'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-3 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-300" />
              <span>{eventData.location?.street}, {eventData.location?.neighborhood}, {eventData.location?.municipality}, {eventData.location?.state}</span>
            </div>
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-3 rounded-lg">
              <Users className="h-5 w-5 text-blue-300" />
              <span>{eventData.participants || 0} participantes</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Target className="h-5 w-5 text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold">Objetivos</h3>
                <ul className="list-disc list-inside">
                  {eventData.objectives?.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clipboard className="h-5 w-5 text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold">Requisitos</h3>
                <ul className="list-disc list-inside">
                  {eventData.requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {eventData.ods && (
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-3 rounded-lg">
              <Globe className="h-5 w-5 text-blue-300" />
              <span>ODS: {eventData.ods}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="outline" 
            className="flex-1 text-sm border-white text-white hover:bg-white hover:text-black transition-colors duration-200"
            onClick={() => setEventData(prevData => ({ ...prevData, status: 'draft' }))}
          >
            Guardar como Borrador
          </Button>
          <Button 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm transition-colors duration-200"
            onClick={handlePublish}
          >
            Publicar Ahora
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-400">Confirmar Publicación de Evento</DialogTitle>
            <DialogDescription className="text-gray-400">
              ¿Está seguro de que desea publicar este evento? Una vez publicado, será visible para todos los usuarios en la plataforma.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="text-sm bg-gray-800 hover:bg-gray-700 text-white"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={confirmPublish}
              className="text-sm bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Confirmar y Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EventPreview