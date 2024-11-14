"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, ImageIcon } from 'lucide-react'
import { NGOProfile } from '@/data/ngo/Profile'
import { motion, AnimatePresence } from "framer-motion"

interface MultimediaGalleryProps {
  editedData: NGOProfile
  setEditedData: React.Dispatch<React.SetStateAction<NGOProfile>>
}

const MultimediaGallery: React.FC<MultimediaGalleryProps> = ({ editedData, setEditedData }) => {
  const handleRemoveImage = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  const handleAddImage = () => {
    setEditedData(prev => ({
      ...prev,
      gallery: [...prev.gallery, "/placeholder.svg?height=200&width=200"]
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
            <ImageIcon className="mr-2 h-6 w-6 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Galería Multimedia
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            layout
          >
            <AnimatePresence>
              {editedData.gallery.map((image, i) => (
                <motion.div
                  key={i}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={image} alt={`Imagen ${i + 1}`} className="rounded-lg w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(i)}
                      className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar imagen</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleAddImage}
            >
              <Plus className="mr-2 h-5 w-5" /> Agregar Imagen o Video
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default MultimediaGallery