"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Trash2,
  Building,
  RouteIcon as Road,
  MapIcon as City,
  Globe,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { Event, Location, Coordinates, Sponsor } from "@/data/ngo/Events"

interface EventLocationProps {
  eventData: Partial<Event>
  setEventData: React.Dispatch<React.SetStateAction<Partial<Event>>>
}

const EventLocation: React.FC<EventLocationProps> = ({ eventData, setEventData }) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false)

  const handleAddressChange = (field: keyof Location, value: string) => {
    setEventData(prevData => ({
      ...prevData,
      location: {
        ...(prevData.location ?? {}),
        [field]: value,
      },
    }))
  }

  const handleSponsorChange = (index: number, field: keyof Sponsor, value: string) => {
    const newSponsors = [...(eventData.sponsors ?? [])]
    newSponsors[index] = { ...(newSponsors[index] ?? {}), [field]: value }
    setEventData(prevData => ({ ...prevData, sponsors: newSponsors }))
  }

  const addSponsor = () => {
    setEventData(prevData => ({
      ...prevData,
      sponsors: [...(prevData.sponsors ?? []), { name: '', image: '' }],
    }))
  }

  const removeSponsor = (index: number) => {
    setEventData(prevData => ({
      ...prevData,
      sponsors: (prevData.sponsors ?? []).filter((_, i) => i !== index),
    }))
  }

  const getStaticMapUrl = (
    lat: number,
    lon: number,
    zoom: number,
    width: number,
    height: number
  ) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${
      lon - 0.01
    },${lat - 0.01},${lon + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-green-900 border-none shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Ubicación del Evento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-200">Dirección del Evento</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Road className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Calle y número"
                  value={eventData.location?.street || ''}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Colonia"
                  value={eventData.location?.neighborhood || ''}
                  onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <City className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Municipio"
                  value={eventData.location?.municipality || ''}
                  onChange={(e) => handleAddressChange('municipality', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Estado"
                  value={eventData.location?.state || ''}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-200">Mapa</Label>
            <div
              className={`relative ${
                isMapExpanded ? 'h-[400px]' : 'h-[200px]'
              } transition-all duration-300 ease-in-out`}
            >
              <div className="absolute inset-0 bg-gray-700 rounded-lg overflow-hidden">
                <iframe
                  src={getStaticMapUrl(
                    eventData.coordinates?.lat || 0,
                    eventData.coordinates?.lng || 0,
                    15,
                    isMapExpanded ? 400 : 200,
                    isMapExpanded ? 400 : 200
                  )}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  title="Mapa de la ubicación del evento"
                ></iframe>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-white text-black hover:bg-gray-200"
                onClick={() => setIsMapExpanded(!isMapExpanded)}
              >
                {isMapExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-200">Patrocinadores</Label>
          <div className="space-y-4">
            {(eventData.sponsors ?? []).map((sponsor, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
              >
                <Input
                  placeholder="Nombre del patrocinador"
                  value={sponsor.name || ''}
                  onChange={(e) => handleSponsorChange(index, 'name', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <Input
                  placeholder="URL de la imagen"
                  value={sponsor.image || ''}
                  onChange={(e) => handleSponsorChange(index, 'image', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <Button
                  type="button"
                  onClick={() => removeSponsor(index)}
                  variant="destructive"
                  size="icon"
                  className="mt-2 sm:mt-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addSponsor}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <Plus className="h-4 w-4 mr-2" /> Agregar Patrocinador
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventLocation
