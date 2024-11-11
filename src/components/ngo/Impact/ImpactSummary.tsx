"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, Bar } from 'react-chartjs-2'
import { ImpactData } from '@/data/ngo/dashboard'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

export const ImpactSummary: React.FC<{ data: ImpactData }> = ({ data }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const pieChartData = {
    labels: data.odsImpact.map((item) => item.name),
    datasets: [
      {
        data: data.odsImpact.map((item) => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Voluntarios',
        data: data.monthlyData.map((item) => item.volunteers),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Beneficiarios',
        data: data.monthlyData.map((item) => item.beneficiaries),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  }

  const toggleCard = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-blue-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-green-400">Métricas Generales</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => toggleCard('metrics')}>
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
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-gray-300">
                    Total de horas de voluntariado: <span className="text-white font-bold">{data.totalHours}</span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-300">
                    Número de voluntarios: <span className="text-white font-bold">{data.volunteers}</span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-300">
                    Beneficiarios impactados: <span className="text-white font-bold">{data.beneficiaries}</span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-300">
                    Personas registradas: <span className="text-white font-bold">{data.registeredPeople}</span>
                  </p>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="bg-gray-800 border-blue-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-green-400">ODS Impactados</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => toggleCard('ods')}>
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
              <CardContent>
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

      <Card className="bg-gray-800 border-blue-500 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-green-400">Tendencias Mensuales</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => toggleCard('trends')}>
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
              <CardContent>
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