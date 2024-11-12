"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, Instagram, Facebook, Linkedin } from "lucide-react"
import { userData } from "@/data/volunteer/Profile"

interface ProfileHeaderProps {
  isEditing: boolean
  setIsEditing: (value: boolean) => void
}

export default function ProfileHeader({ isEditing, setIsEditing }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 border-blue-500 shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-end mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className={`${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="mr-2 h-5 w-5" /> : <Edit className="mr-2 h-5 w-5" />}
                {isEditing ? 'Guardar' : 'Editar Perfil'}
              </Button>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Avatar className="w-32 h-32 border-4 border-blue-500">
                  <AvatarImage src={userData.avatar} alt={userData.username} />
                  <AvatarFallback className="text-4xl">{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
              
              <AnimatePresence>
                {!isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3"
                  >
                    {userData.socialMedia.instagram && (
                      <motion.a
                        href={userData.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram className="h-4 w-4 text-white" />
                      </motion.a>
                    )}
                    {userData.socialMedia.facebook && (
                      <motion.a
                        href={userData.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Facebook className="h-4 w-4 text-white" />
                      </motion.a>
                    )}
                    {userData.socialMedia.linkedin && (
                      <motion.a
                        href={userData.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full max-w-2xl space-y-4 mt-8 text-center">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Input defaultValue={userData.name} className="text-2xl font-bold bg-gray-800/50 border-blue-500" placeholder="Nombre" />
                    <Input defaultValue={userData.username} className="text-muted-foreground bg-gray-800/50 border-blue-500" placeholder="Nombre de usuario" />
                    <Textarea defaultValue={userData.bio} className="bg-gray-800/50 border-blue-500" placeholder="Biografía" />
                    <Input defaultValue={userData.skills.join(", ")} className="bg-gray-800/50 border-blue-500" placeholder="Habilidades (separadas por comas)" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input defaultValue={userData.socialMedia.instagram} className="bg-gray-800/50 border-blue-500" placeholder="URL de Instagram" />
                      <Input defaultValue={userData.socialMedia.facebook} className="bg-gray-800/50 border-blue-500" placeholder="URL de Facebook" />
                      <Input defaultValue={userData.socialMedia.linkedin} className="bg-gray-800/50 border-blue-500" placeholder="URL de LinkedIn" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <motion.h2
                      className="text-3xl font-bold text-blue-400"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {userData.name}
                    </motion.h2>
                    <motion.p
                      className="text-xl text-blue-300"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.1 }}
                    >
                      {userData.username}
                    </motion.p>
                    <motion.p
                      className="text-gray-300 text-lg max-w-xl mx-auto"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.2 }}
                    >
                      {userData.bio}
                    </motion.p>
                    <motion.div
                      className="flex flex-wrap gap-2 justify-center"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.3 }}
                    >
                      {userData.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-blue-600 text-white px-4 py-1.5 text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}