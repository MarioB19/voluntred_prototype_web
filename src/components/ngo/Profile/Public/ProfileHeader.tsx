"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NGOProfile } from '@/data/ngo/Profile'
import { StaticImageData } from 'next/image'
import { motion } from "framer-motion"
import { Building2, Target } from 'lucide-react'

export interface ProfileHeaderProps {
  profileData: NGOProfile
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileData }) => {
  const getImageSrc = (logo: string | StaticImageData): string => {
    if (typeof logo === 'string') {
      return logo
    }
    return logo.src
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                {profileData.logo && (
                  <AvatarImage src={getImageSrc(profileData.logo)} alt={profileData.name} />
                )}
                <AvatarFallback className="text-4xl font-bold">{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center md:text-left">
              <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-2">{profileData.name}</CardTitle>
              <p className="text-lg text-gray-200 italic">{profileData.slogan}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Building2 className="mr-2 h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Sobre Nosotros</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{profileData.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Target className="mr-2 h-5 w-5 text-green-400" />
              <h3 className="text-xl font-semibold text-white">ODS Alineados</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.alignedODS.map((ods, index) => (
                <motion.div
                  key={ods}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.2 }}
                >
                  <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                    {ods}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProfileHeader