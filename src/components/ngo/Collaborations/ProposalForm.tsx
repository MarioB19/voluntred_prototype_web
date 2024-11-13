"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, Calendar, Gift, FileText, Paperclip } from 'lucide-react'
import { eventOptions, sponsorshipTypes, sponsorBenefits } from '@/data/ngo/Collaborations'

const ProposalForm = () => {
  const [selectedEvent, setSelectedEvent] = useState("")
  const [sponsorshipType, setSponsorshipType] = useState("")
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])

  const handleBenefitChange = (benefitId: string) => {
    setSelectedBenefits(prev => 
      prev.includes(benefitId) 
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    )
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/30 shadow-lg">
      <CardHeader className="pb-4 border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Enviar Propuesta de Patrocinio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="event" className="text-sm font-medium text-gray-300">Seleccionar Evento</Label>
          <Select onValueChange={setSelectedEvent}>
            <SelectTrigger id="event" className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Seleccione un evento" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {eventOptions.map(option => (
                <SelectItem key={option.value} value={option.value} className="text-gray-300 focus:bg-blue-500 focus:text-white">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">Beneficios para el Patrocinador</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsorBenefits.map(benefit => (
              <div key={benefit.id} className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-md">
                <Checkbox 
                  id={benefit.id} 
                  checked={selectedBenefits.includes(benefit.id)}
                  onCheckedChange={() => handleBenefitChange(benefit.id)}
                  className="border-blue-400 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={benefit.id} className="text-sm text-gray-300 flex-grow">{benefit.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sponsorship-type" className="text-sm font-medium text-gray-300">Tipo de Patrocinio Solicitado</Label>
          <Select onValueChange={setSponsorshipType}>
            <SelectTrigger id="sponsorship-type" className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Seleccione el tipo de patrocinio" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {sponsorshipTypes.map(type => (
                <SelectItem key={type.value} value={type.value} className="text-gray-300 focus:bg-blue-500 focus:text-white">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-gray-300">Mensaje Personalizado</Label>
          <Textarea 
            id="message" 
            placeholder="Escriba su carta de presentación aquí..." 
            className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 min-h-[120px]" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file" className="text-sm font-medium text-gray-300">Adjuntar Documentos (opcional)</Label>
          <div className="flex items-center space-x-2">
            <Input 
              id="file" 
              type="file" 
              multiple 
              className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 file:bg-blue-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-blue-600 transition-colors" 
            />
            <Paperclip className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300">
          <Send className="mr-2 h-5 w-5" /> Enviar Propuesta
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProposalForm