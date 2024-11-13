"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { subYears } from "date-fns"
import { ImpactSummary } from './ImpactSummary'
import { EventStatistics } from './EventStatics'
import { ReportsAndExport } from './ReportsAndExport'
import { impactData, eventsList, eventStatisticsData } from '@/data/ngo/Impacto'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info, BarChart2, Calendar, FileText } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement)

interface DateRange {
  from: Date
  to?: Date
}

export default function ImpactAndStatistics() {
  const [selectedEvent, setSelectedEvent] = useState<number>(eventsList[0].id)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subYears(new Date(), 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState<'yearly' | 'monthly'>('yearly')
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Impacto y Estadísticas
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInfo(!showInfo)}
          className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300"
        >
          <Info className="h-4 w-4 mr-2" />
          {showInfo ? 'Ocultar Info' : 'Mostrar Info'}
        </Button>
      </motion.div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-400">Información</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Esta sección muestra el impacto de tu organización a través de estadísticas clave, 
                  eventos realizados y reportes detallados. Utiliza las pestañas para navegar entre 
                  las diferentes vistas y obtener una visión completa de tu impacto social.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 rounded-lg mb-6 p-1">
          <TabsTrigger 
            value="summary" 
            className="flex items-center justify-center space-x-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500 rounded-md transition-all duration-300"
          >
            <BarChart2 className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Resumen</span>
          </TabsTrigger>
          <TabsTrigger 
            value="events" 
            className="flex items-center justify-center space-x-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500 rounded-md transition-all duration-300"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Eventos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center justify-center space-x-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500 rounded-md transition-all duration-300"
          >
            <FileText className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Reportes</span>
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="summary" className="mt-4">
              <ImpactSummary data={impactData} />
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <EventStatistics
                events={eventsList}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                statistics={eventStatisticsData}
              />
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <ReportsAndExport
                dateRange={dateRange}
                setDateRange={setDateRange}
                reportType={reportType}
                setReportType={setReportType}
                data={impactData}
              />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}