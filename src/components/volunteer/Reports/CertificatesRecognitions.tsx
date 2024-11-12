"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Award, Scroll } from "lucide-react"
import { reportsData } from "@/data/volunteer/Reports"

export default function CertificatesRecognitions() {
  const { certificados, insignias } = reportsData

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
          <Scroll className="mr-2 h-6 w-6" />
          Certificados y Reconocimientos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
            <Scroll className="mr-2 h-5 w-5" />
            Certificados
          </h3>
          <ScrollArea className="h-[250px] pr-4">
            {certificados.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="flex justify-between items-center mb-3 p-3 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <p className="font-semibold text-white">{cert.title}</p>
                  <p className="text-sm text-gray-400">{cert.date}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black transition-colors duration-300"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </motion.div>
            ))}
          </ScrollArea>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Insignias
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insignias.map((insignia) => (
              <motion.div
                key={insignia.id}
                variants={itemVariants}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <Award className="h-8 w-8 text-yellow-400 mr-2" />
                  <h4 className="font-semibold text-white">{insignia.title}</h4>
                </div>
                <p className="text-sm text-gray-400">{insignia.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}