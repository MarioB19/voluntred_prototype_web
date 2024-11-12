"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp } from "lucide-react"
import { impactStats, ImpactStat } from "@/data/volunteer/dashboard"

export default function ImpactSummary() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-purple-900 border-blue-500 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-400 to-blue-500">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Sparkles className="mr-2 h-5 w-5" />
          Resumen de Impacto
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-6">
          {impactStats.map((stat: ImpactStat, index: number) => {
            const Icon = stat.icon
            return (
              <motion.div 
                key={index}
                className="relative overflow-hidden"
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
              >
                <Card className="bg-gradient-to-br from-blue-800 to-indigo-900 border-blue-400 h-full">
                  <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full">
                    <Icon className="h-6 w-6 text-green-400 mb-2" />
                    <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                    <span className="text-xs text-green-400">{stat.label}</span>
                  </CardContent>
                </Card>
                <AnimatePresence>
                  {hoveredStat === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-90 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white text-sm font-medium">¡Buen trabajo!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-blue-300 flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Progreso hacia tu meta mensual
          </h4>
          <div className="bg-blue-800 p-3 rounded-lg">
            <Progress 
              value={60} 
              className="h-2 bg-blue-700"
            >
              <div className="h-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: "60%" }} />
            </Progress>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-blue-300">12 de 20 horas</p>
              <span className="text-xs font-medium text-green-400">60%</span>
            </div>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium text-sm py-2 transition-all duration-300 transform hover:scale-105"
          >
            Ver detalles completos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}