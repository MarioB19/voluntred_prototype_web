"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pie } from "react-chartjs-2"
import { ChevronDown, ChevronUp, Calendar, Clock, Users, Target, TrendingUp } from "lucide-react"
import { reportsData } from "@/data/volunteer/Reports"

const generateMonthlyData = () => ({
  horasVoluntariado: Math.floor(Math.random() * 50) + 10,
  eventosAsistidos: Math.floor(Math.random() * 5) + 1,
  odsImpactados: Math.floor(Math.random() * 3) + 1,
})

export default function MonthlyReports() {
  const { years, months } = reportsData
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null)

  const toggleMonth = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month)
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          Informes Mensuales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">Seleccionar Año</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-gray-700 border border-blue-500 rounded-md p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-gray-600"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <ScrollArea className="h-[500px] pr-4">
            <motion.div layout className="space-y-4">
              {months.map((month) => {
                const monthData = generateMonthlyData()
                return (
                  <motion.div key={month} layout>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => toggleMonth(month)}
                    >
                      <span className="text-lg font-semibold">{month}</span>
                      <motion.div
                        animate={{ rotate: expandedMonth === month ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </Button>
                    <AnimatePresence>
                      {expandedMonth === month && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="mt-2 bg-gray-800 border-blue-500 overflow-hidden">
                            <CardContent className="pt-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                  <h4 className="font-semibold text-blue-400 flex items-center mb-2">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Horas Voluntariado
                                  </h4>
                                  <p className="text-3xl font-bold text-white">{monthData.horasVoluntariado}</p>
                                  <p className="text-sm text-green-400 flex items-center mt-2">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    +5% vs. mes anterior
                                  </p>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                  <h4 className="font-semibold text-blue-400 flex items-center mb-2">
                                    <Users className="mr-2 h-4 w-4" />
                                    Eventos Asistidos
                                  </h4>
                                  <p className="text-3xl font-bold text-white">{monthData.eventosAsistidos}</p>
                                  <p className="text-sm text-green-400 flex items-center mt-2">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    +2 vs. mes anterior
                                  </p>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                  <h4 className="font-semibold text-blue-400 flex items-center mb-2">
                                    <Target className="mr-2 h-4 w-4" />
                                    ODS Impactados
                                  </h4>
                                  <p className="text-3xl font-bold text-white">{monthData.odsImpactados}</p>
                                  <p className="text-sm text-yellow-400 flex items-center mt-2">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    Igual al mes anterior
                                  </p>
                                </motion.div>
                              </div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 h-64"
                              >
                                <h4 className="font-semibold text-blue-400 mb-2">Distribución de Horas por ODS</h4>
                                <Pie
                                  data={{
                                    labels: ['ODS 1', 'ODS 2', 'ODS 3', 'ODS 4', 'ODS 5'],
                                    datasets: [{
                                      data: [12, 19, 3, 5, 2],
                                      backgroundColor: [
                                        'rgba(255, 99, 132, 0.8)',
                                        'rgba(54, 162, 235, 0.8)',
                                        'rgba(255, 206, 86, 0.8)',
                                        'rgba(75, 192, 192, 0.8)',
                                        'rgba(153, 102, 255, 0.8)',
                                      ],
                                    }],
                                  }}
                                  options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                      legend: {
                                        position: 'right' as const,
                                        labels: {
                                          color: 'white',
                                          font: {
                                            size: 12,
                                          },
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </ScrollArea>
        </motion.div>
      </CardContent>
    </Card>
  )
}