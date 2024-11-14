"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Twitter, Instagram, Linkedin, Share2 } from 'lucide-react'
import { NGOProfile } from '@/data/ngo/Profile'
import { motion } from "framer-motion"

interface SocialMediaProps {
  editedData: NGOProfile
  setEditedData: React.Dispatch<React.SetStateAction<NGOProfile>>
}

const SocialMedia: React.FC<SocialMediaProps> = ({ editedData, setEditedData }) => {
  const handleSocialMediaChange = (platform: keyof NGOProfile['socialMedia'], value: string) => {
    setEditedData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }))
  }

  const socialPlatforms = [
    { icon: Facebook, label: 'Facebook', key: 'facebook' as keyof NGOProfile['socialMedia'], color: 'text-blue-500' },
    { icon: Twitter, label: 'Twitter', key: 'twitter' as keyof NGOProfile['socialMedia'], color: 'text-sky-400' },
    { icon: Instagram, label: 'Instagram', key: 'instagram' as keyof NGOProfile['socialMedia'], color: 'text-pink-500' },
    { icon: Linkedin, label: 'LinkedIn', key: 'linkedin' as keyof NGOProfile['socialMedia'], color: 'text-blue-700' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Share2 className="mr-2 h-6 w-6 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Redes Sociales
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            {socialPlatforms.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Label 
                  htmlFor={social.key}
                  className="text-sm font-medium text-gray-300 mb-1 block flex items-center"
                >
                  <social.icon className={`mr-2 h-5 w-5 ${social.color}`} />
                  {social.label}
                </Label>
                <div className="relative">
                  <Input 
                    id={social.key}
                    value={editedData.socialMedia[social.key]} 
                    onChange={(e) => handleSocialMediaChange(social.key, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:bg-gray-600" 
                    placeholder={`https://${social.label.toLowerCase()}.com/your-profile`}
                  />
                  <social.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${social.color}`} />
                </div>
              </motion.div>
            ))}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SocialMedia