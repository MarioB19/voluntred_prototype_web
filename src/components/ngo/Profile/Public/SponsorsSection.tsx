"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NGOProfile } from '@/data/ngo/Profile'
import { motion } from "framer-motion"
import { Users, ExternalLink } from 'lucide-react'

export interface SponsorsSectionProps {
  sponsors: NGOProfile['sponsors']
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors }) => {
  const getImageSrc = (logo: string | { src: string }) => {
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
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Patrocinadores y Aliados
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {sponsors.map((sponsor, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-3 transition-transform duration-300 ease-in-out group-hover:scale-110">
                    <AvatarImage src={getImageSrc(sponsor.logo)} alt={sponsor.name} />
                    <AvatarFallback className="text-2xl font-bold bg-blue-500 text-white">
                      {sponsor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="text-white h-8 w-8" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-300 text-center group-hover:text-blue-400 transition-colors duration-300">
                  {sponsor.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SponsorsSection