"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Clock, Users, Target, TrendingUp } from 'lucide-react'
import { reportsData } from "@/data/volunteer/Reports"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function ImpactStatistics() {
  const { impactStatistics, barChartData, pieChartData } = reportsData

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6" />
          Estadísticas de Impacto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={cardVariants} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-400 mb-2 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Horas Voluntariado
            </h3>
            <p className="text-3xl font-bold text-white">{impactStatistics.horasVoluntariado}</p>
            <p className="text-sm text-green-400 mt-2 flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              +5% vs. mes anterior
            </p>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-400 mb-2 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Eventos Asistidos
            </h3>
            <p className="text-3xl font-bold text-white">{impactStatistics.eventosAsistidos}</p>
            <p className="text-sm text-green-400 mt-2 flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              +2 vs. mes anterior
            </p>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-400 mb-2 flex items-center">
              <Target className="mr-2 h-5 w-5" />
              ODS Impactados
            </h3>
            <p className="text-3xl font-bold text-white">{impactStatistics.odsImpactados}</p>
            <p className="text-sm text-yellow-400 mt-2 flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              Igual al mes anterior
            </p>
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-gray-800 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Horas de Voluntariado por Mes</h3>
            <div className="h-64">
              <Bar 
                data={barChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: 'white'
                      }
                    },
                    y: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: 'white'
                      }
                    }
                  }
                }} 
              />
            </div>
          </motion.div>
          <motion.div 
            className="bg-gray-800 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Distribución de Impacto en ODS</h3>
            <div className="h-64">
              <Pie 
                data={pieChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: 'white',
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}