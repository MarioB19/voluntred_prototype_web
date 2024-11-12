"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { impactData, ImpactItem } from "@/data/volunteer/Profile"

export default function ImpactTab() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
          <Sparkles className="mr-2 h-6 w-6" />
          Impacto Generado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactData.map((item: ImpactItem, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <motion.div
                    className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.1 + 0.2 }}
                  >
                    {item.value}
                  </motion.div>
                  <p className="text-sm text-gray-300 text-center">{item.label}</p>
                  {item.icon && (
                    <item.icon className="mt-2 h-6 w-6 text-green-400 opacity-50" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}