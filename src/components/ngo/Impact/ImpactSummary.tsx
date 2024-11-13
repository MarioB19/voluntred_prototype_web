"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, Bar } from 'react-chartjs-2'
import { ImpactData } from '@/data/ngo/Impacto'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, Users, Heart, UserPlus, Target, TrendingUp } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export const ImpactSummary: React.FC<{ data: ImpactData }> = ({ data }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const pieChartData = {
    labels: data.odsImpact.map((item) => item.name),
    datasets: [
      {
        data: data.odsImpact.map((item) => item.value),
        backgroundColor: [
          'rgba(56, 189, 248, 0.6)',
          'rgba(52, 211, 153, 0.6)',
          'rgba(251, 146, 60, 0.6)',
          'rgba(249, 115, 22, 0.6)',
          'rgba(236, 72, 153, 0.6)',
        ],
      },
    ],
  }

  const barChartData = {
    labels: data.monthlyData.map((item) => item.month),
    datasets: [
      {
        label: 'Horas de Voluntariado',
        data: data.monthlyData.map((item) => item.hours),
        backgroundColor: 'rgba(56, 189, 248, 0.6)',
      },
      {
        label: 'Voluntarios',
        data: data.monthlyData.map((item) => item.volunteers),
        backgroundColor: 'rgba(52, 211, 153, 0.6)',
      },
      {
        label: 'Beneficiarios',
        data: data.monthlyData.map((item) => item.beneficiaries),
        backgroundColor: 'rgba(251, 146, 60, 0.6)',
      },
    ],
  }

  const toggleCard = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-blue-500 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-700">
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Métricas Generales
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => toggleCard('metrics')} className="text-blue-400 hover:text-blue-300">
            {expandedCard === 'metrics' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <AnimatePresence>
          {(expandedCard === 'metrics' || expandedCard === null) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Total de horas de voluntariado</p>
                      <p className="text-lg font-bold text-white">{data.totalHours}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Número de voluntarios</p>
                      <p className="text-lg font-bold text-white">{data.volunteers}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-8 w-8 text-red-400" />
                    <div>
                      <p className="text-sm text-gray-400">Beneficiarios impactados</p>
                      <p className="text-lg font-bold text-white">{data.beneficiaries}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserPlus className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">Personas registradas</p>
                      <p className="text-lg font-bold text-white">{data.registeredPeople}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="bg-gray-800 border-blue-500 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-700">
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
            <Target className="mr-2 h-5 w-5" />
            ODS Impactados
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => toggleCard('ods')} className="text-blue-400 hover:text-blue-300">
            {expandedCard === 'ods' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <AnimatePresence>
          {(expandedCard === 'ods' || expandedCard === null) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-4">
                <div className="h-64 sm:h-80">
                  <Pie
                    data={pieChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            color: 'white',
                            font: {
                              size: 12
                            },
                            padding: 20
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="bg-gray-800 border-blue-500 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-700">
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Tendencias Mensuales
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => toggleCard('trends')} className="text-blue-400 hover:text-blue-300">
            {expandedCard === 'trends' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <AnimatePresence>
          {(expandedCard === 'trends' || expandedCard === null) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-4">
                <div className="h-80 sm:h-96">
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          ticks: { color: 'white', font: { size: 10 } },
                          grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        y: {
                          ticks: { color: 'white', font: { size: 10 } },
                          grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                      },
                      plugins: {
                        legend: {
                          labels: { color: 'white', font: { size: 12 } },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}