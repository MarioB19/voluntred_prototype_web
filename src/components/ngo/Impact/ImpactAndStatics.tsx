"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { subYears } from "date-fns"
import { ImpactSummary } from './ImpactSummary'
import { EventStatistics } from './EventStatics'
import { ReportsAndExport } from './ReportsAndExport'
import { impactData, eventsList, eventStatisticsData } from '@/data/ngo/dashboard'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info } from 'lucide-react'

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
    <div className="space-y-6 bg-gray-900 text-white p-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-400">Impacto y Estadísticas</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Mostrar información"
        >
          <Info className="h-6 w-6 text-blue-400" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: showInfo ? 1 : 0, height: showInfo ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        {showInfo && (
          <Card className="bg-gray-800 border-blue-500 mb-4">
            <CardContent className="p-4">
              <p className="text-sm text-gray-300">
                Esta sección muestra el impacto de tu organización a través de estadísticas clave, 
                eventos realizados y reportes detallados. Utiliza las pestañas para navegar entre 
                las diferentes vistas y obtener una visión completa de tu impacto social.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 rounded-lg mb-4">
          <TabsTrigger value="summary" className="text-white data-[state=active]:bg-blue-500 text-xs sm:text-sm py-3">
            Resumen
          </TabsTrigger>
          <TabsTrigger value="events" className="text-white data-[state=active]:bg-blue-500 text-xs sm:text-sm py-3">
            Eventos
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-blue-500 text-xs sm:text-sm py-3">
            Reportes
          </TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
      </Tabs>
    </div>
  )
}