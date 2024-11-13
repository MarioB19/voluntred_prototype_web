"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Award, Calendar, DollarSign, Eye, FileText, MessageCircle } from 'lucide-react'
import { activeSponsors } from '@/data/ngo/Collaborations'

const ActiveSponsors = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Patrocinios Activos
      </h3>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {activeSponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800 border-blue-500 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Award className="mr-2 h-5 w-5 text-blue-400" />
                  {sponsor.company}
                </CardTitle>
                <Badge variant="outline" className="mt-1 bg-blue-500/10 text-blue-400 border-blue-400">
                  {sponsor.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="mr-2 h-4 w-4" />
                    {sponsor.startDate} - {sponsor.endDate}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-green-400">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {sponsor.amount}
                  </div>
                </div>
                <Separator className="bg-gray-700" />
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Evento:</Label>
                  <p className="text-white">{sponsor.event}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Beneficios acordados:</Label>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    {sponsor.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Cumplimiento de beneficios:</Label>
                  <div className="flex items-center">
                    <Progress value={sponsor.progress} className="flex-grow mr-4" />
                    <span className="text-sm font-medium text-blue-400">{sponsor.progress}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Button>
                <Button size="sm" className="bg-green-500 hover:bg-green-600 transition-colors duration-300">
                  <FileText className="mr-2 h-4 w-4" />
                  Generar Reporte
                </Button>
                <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white transition-colors duration-300">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ActiveSponsors