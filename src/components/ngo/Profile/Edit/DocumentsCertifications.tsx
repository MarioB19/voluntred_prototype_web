"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LinkIcon, Trash2, Upload, FileText } from 'lucide-react'
import { NGOProfile } from '@/data/ngo/Profile'
import { motion, AnimatePresence } from "framer-motion"

interface DocumentsCertificationsProps {
  editedData: NGOProfile
  setEditedData: React.Dispatch<React.SetStateAction<NGOProfile>>
}

const DocumentsCertifications: React.FC<DocumentsCertificationsProps> = ({ editedData, setEditedData }) => {
  const handleRemoveDocument = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const handleAddDocument = () => {
    setEditedData(prev => ({
      ...prev,
      documents: [...prev.documents, { name: "Nuevo Documento.pdf", url: "#" }]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <FileText className="mr-2 h-6 w-6 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Documentos y Certificaciones
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[200px] mb-4 rounded-md border border-gray-700">
            <AnimatePresence>
              {editedData.documents.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between py-3 px-4 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <LinkIcon className="mr-3 h-5 w-5 text-blue-400" />
                    <span className="text-sm text-gray-300">{doc.name}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveDocument(i)}
                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={handleAddDocument}
          >
            <Upload className="mr-2 h-5 w-5" /> Subir Nuevo Documento
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DocumentsCertifications