"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Upload, Building2, Megaphone, FileText, Target } from 'lucide-react'
import { NGOProfile } from '@/data/ngo/Profile'
import { StaticImageData } from 'next/image'
import { motion } from "framer-motion"

interface OrganizationInfoProps {
  editedData: NGOProfile
  setEditedData: React.Dispatch<React.SetStateAction<NGOProfile>>
}

const OrganizationInfo: React.FC<OrganizationInfoProps> = ({ editedData, setEditedData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData(prev => ({ ...prev, [name]: value }))
  }

  const getImageSrc = (logo: string | StaticImageData): string => {
    if (typeof logo === 'string') {
      return logo
    }
    return logo.src
  }

  const handleODSChange = (ods: string, checked: boolean) => {
    setEditedData(prev => ({
      ...prev,
      alignedODS: checked
        ? [...prev.alignedODS, ods]
        : prev.alignedODS.filter(item => item !== ods)
    }))
  }

  const inputFields = [
    { id: 'name', label: 'Nombre de la Organización', icon: Building2, component: Input },
    { id: 'slogan', label: 'Eslogan', icon: Megaphone, component: Input },
    { id: 'description', label: 'Descripción', icon: FileText, component: Textarea },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2 h-6 w-6 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Información de la Organización
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="h-24 w-24 border-4 border-blue-400">
                {editedData.logo && (
                  <AvatarImage src={getImageSrc(editedData.logo)} alt="NGO Logo" />
                )}
                <AvatarFallback className="text-2xl font-bold">{editedData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
                <Upload className="mr-2 h-4 w-4" /> Cambiar Logo
              </Button>
            </motion.div>

            {inputFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Label htmlFor={field.id} className="text-sm font-medium text-gray-300 mb-1 block flex items-center">
                  <field.icon className="mr-2 h-4 w-4 text-blue-400" />
                  {field.label}
                </Label>
                <field.component
                  id={field.id}
                  name={field.id}
                  value={editedData[field.id]}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:bg-gray-600"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Label className="text-sm font-medium text-gray-300 mb-2 block flex items-center">
                <Target className="mr-2 h-4 w-4 text-blue-400" />
                ODS Alineados
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {['1. Fin de la Pobreza', '2. Hambre Cero', '3. Salud y Bienestar', '4. Educación de Calidad'].map((ods) => (
                  <div key={ods} className="flex items-center space-x-2">
                    <Checkbox 
                      id={ods} 
                      checked={editedData.alignedODS.includes(ods)} 
                      onCheckedChange={(checked) => handleODSChange(ods, checked as boolean)}
                      className="border-blue-400 text-blue-400 focus:ring-blue-500"
                    />
                    <label htmlFor={ods} className="text-sm text-gray-300 cursor-pointer hover:text-blue-400 transition-colors duration-200">{ods}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default OrganizationInfo