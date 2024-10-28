"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Award, Target, ChevronDown, ChevronUp } from "lucide-react"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const years = [2024, 2023, 2022]
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const mockData = {
  horasVoluntariado: 120,
  eventosAsistidos: 15,
  odsImpactados: 5,
  certificados: [
    { id: 1, title: "Limpieza de Playa", date: "15/05/2024" },
    { id: 2, title: "Reforestación Urbana", date: "22/06/2024" },
    { id: 3, title: "Taller de Reciclaje", date: "10/07/2024" },
  ],
  insignias: [
    { id: 1, title: "Eco Guerrero", description: "100 horas de voluntariado ambiental" },
    { id: 2, title: "Líder Comunitario", description: "Organización de 5 eventos" },
    { id: 3, title: "Innovador Social", description: "Propuesta de proyecto implementada" },
  ],
  metasPersonales: [
    { id: 1, title: "200 horas de voluntariado", progress: 60 },
    { id: 2, title: "Impactar 5 ODS", progress: 80 },
    { id: 3, title: "Organizar un evento", progress: 30 },
  ],
}

const generateMonthlyData = () => ({
  horasVoluntariado: Math.floor(Math.random() * 50) + 10,
  eventosAsistidos: Math.floor(Math.random() * 5) + 1,
  odsImpactados: Math.floor(Math.random() * 3) + 1,
})

export default function Reports() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null)

  const toggleMonth = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month)
  }

  const barChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Horas de Voluntariado',
        data: months.map(() => Math.floor(Math.random() * 50) + 10),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const pieChartData = {
    labels: ['ODS 1', 'ODS 2', 'ODS 3', 'ODS 4', 'ODS 5'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-black text-white"
    >
      <h1 className="text-3xl font-bold text-green-400">Informes y Estadísticas</h1>

      <Tabs defaultValue="impacto" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="impacto" className="text-white data-[state=active]:bg-blue-500">Impacto Personal</TabsTrigger>
          <TabsTrigger value="certificados" className="text-white data-[state=active]:bg-blue-500">Certificados</TabsTrigger>
          <TabsTrigger value="metas" className="text-white data-[state=active]:bg-blue-500">Metas Personales</TabsTrigger>
        </TabsList>

        <TabsContent value="impacto">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Estadísticas de Impacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Horas Voluntariado</h3>
                  <p className="text-3xl font-bold">{mockData.horasVoluntariado}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Eventos Asistidos</h3>
                  <p className="text-3xl font-bold">{mockData.eventosAsistidos}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">ODS Impactados</h3>
                  <p className="text-3xl font-bold">{mockData.odsImpactados}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Horas de Voluntariado por Mes</h3>
                  <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="h-64">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Distribución de Impacto en ODS</h3>
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificados">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Certificados y Reconocimientos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Certificados</h3>
                <ScrollArea className="h-[200px]">
                  {mockData.certificados.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-center mb-2 p-2 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-semibold">{cert.title}</p>
                        <p className="text-sm text-gray-400">{cert.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-green-400 border-green-400">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Insignias</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockData.insignias.map((insignia) => (
                    <div key={insignia.id} className="bg-gray-800 p-4 rounded-lg">
                      <Award className="h-8 w-8 text-yellow-400 mb-2" />
                      <h4 className="font-semibold">{insignia.title}</h4>
                      <p className="text-sm text-gray-400">{insignia.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metas">
          <Card className="bg-gray-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-green-400">Metas Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.metasPersonales.map((meta) => (
                <div key={meta.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{meta.title}</h3>
                    <Badge variant="outline">{meta.progress}%</Badge>
                  </div>
                  <Progress value={meta.progress} className="h-2" />
                </div>
              ))}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Agregar Nueva Meta</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Descripción de la meta" className="bg-gray-800 border-blue-500" />
                  <Button className="bg-green-500 hover:bg-green-600 text-black">
                    <Target className="mr-2 h-4 w-4" />
                    Agregar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-green-400">Informes Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-blue-400">Seleccionar Año</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-gray-800 border border-blue-500 rounded-md p-2"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <ScrollArea className="h-[400px]">
              {months.map((month) => {
                const monthData = generateMonthlyData()
                return (
                  <div key={month} className="mb-4">
                    <Button
                      variant="outline"
                      className="w-full justify-between text-left"
                      onClick={() => toggleMonth(month)}
                    >
                      <span>{month}</span>
                      {expandedMonth === month ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    {expandedMonth === month && (
                      <Card className="mt-2 bg-gray-800 border-blue-500">
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-blue-400">Horas Voluntariado</h4>
                              <p className="text-2xl">{monthData.horasVoluntariado}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-400">Eventos Asistidos</h4>
                              <p className="text-2xl">{monthData.eventosAsistidos}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-400">ODS Impactados</h4>
                              <p className="text-2xl">{monthData.odsImpactados}</p>
                            </div>
                          </div>
                          <div className="mt-4 h-64">
                            <h4 className="font-semibold text-blue-400 mb-2">Distribución de Horas por ODS</h4>
                            <Pie
                              data={{
                                labels: ['ODS 1', 'ODS 2', 'ODS 3', 'ODS 4', 'ODS 5'],
                                datasets: [{
                                  data: [12, 19, 3, 5, 2],
                                  backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                  ],
                                }],
                              }}
                              options={{ responsive: true, 
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    position: 'right' as const,
                                    labels: {
                                      color: 'white',
                                    },
                                  },
                                },
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )
              })}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}