"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NGOProfile } from '@/data/ngo/Profile'
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Globe } from 'lucide-react'

interface ContactInfoProps {
  editedData: NGOProfile
  setEditedData: React.Dispatch<React.SetStateAction<NGOProfile>>
}

const ContactInfo: React.FC<ContactInfoProps> = ({ editedData, setEditedData }) => {
  const handleContactInfoChange = (field: keyof NGOProfile['contactInfo'], value: string) => {
    setEditedData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }))
  }

  const inputFields = [
    { id: 'address', label: 'Dirección', icon: MapPin, type: 'text' },
    { id: 'phone', label: 'Teléfono', icon: Phone, type: 'tel' },
    { id: 'email', label: 'Correo Electrónico', icon: Mail, type: 'email' },
    { id: 'website', label: 'Sitio Web', icon: Globe, type: 'url' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Información de Contacto
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            {inputFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <Label htmlFor={field.id} className="text-sm font-medium text-gray-300 mb-2 block flex items-center">
                  <field.icon className="mr-2 h-5 w-5 text-blue-400" />
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    id={field.id}
                    type={field.type}
                    value={editedData.contactInfo[field.id as keyof NGOProfile['contactInfo']]}
                    onChange={(e) => handleContactInfoChange(field.id as keyof NGOProfile['contactInfo'], e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white pl-4 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:bg-gray-600"
                    placeholder={`Ingrese ${field.label.toLowerCase()}`}
                  />
                </div>
              </motion.div>
            ))}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ContactInfo