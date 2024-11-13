"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Event } from "@/data/ngo/Events"
import EventBasicInfo from './EventBasicInfo'
import EventDetails from './EventDetails'
import EventLocation from './EventLocation'
import EventPreview from './EventPreview'
import { CheckCircle } from 'lucide-react'

interface NGOCreateEventProps {
  isOpen: boolean
  onClose: () => void
}

const NGOCreateEvent: React.FC<NGOCreateEventProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: '',
    category: '',
    location: {},
    date: new Date(),
    time: '',
    ong: '',
    ods: '',
    description: '',
    objectives: [],
    requirements: [],
    participants: 0,
    coordinates: { lat: 0, lng: 0 },
    sponsors: [],
    status: 'draft'
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }
  ) => {
    const name = 'name' in e ? e.name : e.target.name;
    const value = 'value' in e ? e.value : e.target.value;
    setEventData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setEventData(prevData => ({ ...prevData, date }))
    }
  }

  const handlePublish = () => {
    setShowSuccessDialog(true)
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    onClose()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EventBasicInfo eventData={eventData} handleInputChange={handleInputChange} handleDateChange={handleDateChange} />
      case 2:
        return <EventDetails eventData={eventData} setEventData={setEventData} />
      case 3:
        return <EventLocation eventData={eventData} setEventData={setEventData} />
      case 4:
        return <EventPreview eventData={eventData} setEventData={setEventData} onPublish={handlePublish}/>
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              {step === 1 ? "Información Básica del Evento" :
               step === 2 ? "Detalles del Evento" :
               step === 3 ? "Ubicación del Evento" :
               "Vista Previa del Evento"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete la información del evento en los siguientes pasos.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {renderStep()}
            <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-2 sm:space-y-0">
              {step > 1 && (
                <Button 
                  type="button" 
                  onClick={() => setStep(step - 1)} 
                  variant="outline" 
                  className="text-sm bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Anterior
                </Button>
              )}
              {step < 4 && (
                <Button 
                  type="button" 
                  onClick={() => setStep(step + 1)} 
                  className="ml-auto text-sm bg-blue-600 hover:bg-blue-700"
                >
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-400 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Evento Creado Correctamente
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Su evento ha sido creado y publicado exitosamente en la plataforma.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleCloseSuccessDialog}
              className="text-sm bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NGOCreateEvent