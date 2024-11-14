"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { NGOProfile } from '@/data/ngo/Profile'
import OrganizationInfo from './OrganizationInfo'
import ContactInfo from './ContactInfo'
import SocialMedia from './SocialMedia'
import MultimediaGallery from './MultimediaGallery'
import DocumentsCertifications from './DocumentsCertifications'
import { motion, AnimatePresence } from "framer-motion"
import { Save, X, } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface EditProfileProps {
  profileData: NGOProfile
  onSave: (newData: NGOProfile) => void
}

const EditProfile: React.FC<EditProfileProps> = ({ profileData, onSave }) => {
  const [editedData, setEditedData] = useState<NGOProfile>(profileData)
  const [activeSection, setActiveSection] = useState<string | null>("organization")

  const handleSave = () => {
    onSave(editedData)
  }

  const sections = [
    { id: "organization", title: "Información de la Organización", component: OrganizationInfo },
    { id: "contact", title: "Información de Contacto", component: ContactInfo },
    { id: "social", title: "Redes Sociales", component: SocialMedia },
    { id: "gallery", title: "Galería Multimedia", component: MultimediaGallery },
    { id: "documents", title: "Documentos y Certificaciones", component: DocumentsCertifications },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
        Editar Perfil de ONG
      </h1>

      <Accordion type="single" collapsible className="space-y-4">
        <AnimatePresence>
          {sections.map(({ id, title, component: Component }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger
                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors duration-200"
                onClick={() => setActiveSection(activeSection === id ? null : id)}
              >
                {title}
              
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Component editedData={editedData} setEditedData={setEditedData} />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AnimatePresence>
      </Accordion>

      <motion.div
        className="flex justify-end space-x-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Button
          variant="outline"
          onClick={() => setEditedData(profileData)}
          className="bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
        >
          <X className="mr-2 h-4 w-4" /> Cancelar
        </Button>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Save className="mr-2 h-4 w-4" /> Guardar Cambios
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default EditProfile