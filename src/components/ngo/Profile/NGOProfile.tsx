"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PublicProfile from './Public/PublicProfile'
import EditProfile from './Edit/EditProfile'
import { ngoProfileData } from '@/data/ngo/Profile'
import { Edit3, Eye } from 'lucide-react'

const NGOProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(ngoProfileData)

  const handleSaveChanges = (newData: typeof ngoProfileData) => {
    setProfileData(newData)
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <Card className="bg-gradient-to-r from-blue-600 to-green-500 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <motion.h1 
              className="text-3xl font-bold text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Perfil de la ONG
            </motion.h1>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                {isEditing ? (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Perfil Público
                  </>
                ) : (
                  <>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={isEditing ? 'edit' : 'public'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {isEditing ? (
            <EditProfile profileData={profileData} onSave={handleSaveChanges} />
          ) : (
            <PublicProfile profileData={profileData} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default NGOProfile