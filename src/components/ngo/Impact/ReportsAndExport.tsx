"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Download, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { ImpactData } from '@/data/ngo/dashboard'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { motion, AnimatePresence } from 'framer-motion'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface DateRange {
  from: Date
  to?: Date
}

interface ReportsAndExportProps {
  dateRange: DateRange
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>
  reportType: 'yearly' | 'monthly'
  setReportType: React.Dispatch<React.SetStateAction<'yearly' | 'monthly'>>
  data: ImpactData
}

export const ReportsAndExport: React.FC<ReportsAndExportProps> = ({
  dateRange,
  setDateRange,
  reportType,
  setReportType,
  data,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['dateRange', 'reportType', 'preview'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  const chartData = {
    labels:
      reportType === 'yearly'
        ? data.yearlyData.map((d) => d.year.toString())
        : data.monthlyData.map((d) => d.month),
    datasets: [
      {
        label: 'Horas',
        data:
          reportType === 'yearly'
            ? data.yearlyData.map((d) => d.hours)
            : data.monthlyData.map((d) => d.hours),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Voluntarios',
        data:
          reportType === 'yearly'
            ? data.yearlyData.map((d) => d.volunteers)
            : data.monthlyData.map((d) => d.volunteers),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Beneficiarios',
        data:
          reportType === 'yearly'
            ? data.yearlyData.map((d) => d.beneficiaries)
            : data.monthlyData.map((d) => d.beneficiaries),
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
      },
    ],
  }

  return (
    <Card className="bg-gray-900 border-blue-500">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-green-400">Generar Reporte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div layout className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="date-range" className="text-base font-medium">Rango de Fechas</Label>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('dateRange')}>
              {expandedSections.includes('dateRange') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <AnimatePresence>
            {expandedSections.includes('dateRange') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-range"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white text-sm md:text-base',
                        !dateRange && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'dd/MM/yy')} - {format(dateRange.to, 'dd/MM/yy')}
                          </>
                        ) : (
                          format(dateRange.from, 'dd/MM/yy')
                        )
                      ) : (
                        <span>Seleccionar rango</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) => setDateRange(range as DateRange)}
                      numberOfMonths={1}
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="report-type" className="text-base font-medium">Tipo de Reporte</Label>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('reportType')}>
              {expandedSections.includes('reportType') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <AnimatePresence>
            {expandedSections.includes('reportType') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Select
                  value={reportType}
                  onValueChange={(value: 'yearly' | 'monthly') => setReportType(value)}
                >
                  <SelectTrigger id="report-type" className="bg-gray-700 border-gray-600 text-white text-sm md:text-base w-full">
                    <SelectValue>{reportType === 'yearly' ? 'Anual' : 'Mensual'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">Anual</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-green-400">Vista Previa del Reporte</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('preview')}>
              {expandedSections.includes('preview') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <AnimatePresence>
            {expandedSections.includes('preview') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="h-[300px] sm:h-[400px]">
                      <Line
                        data={chartData}
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
                              position: 'bottom',
                            },
                            tooltip: {
                              mode: 'index',
                              intersect: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="report-content" className="text-base font-medium">Contenido del Reporte</Label>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('content')}>
              {expandedSections.includes('content') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <AnimatePresence>
            {expandedSections.includes('content') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2 mt-2">
                  {[
                    'Métricas Generales',
                    'ODS Impactados',
                    'Estadísticas por Evento',
                    'Comentarios de Voluntarios',
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <input type="checkbox" id={item} className="bg-gray-700 border-gray-600" />
                      <label htmlFor={item} className="text-sm text-gray-300">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="space-y-4">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-base">
            <Download className="mr-2 h-5 w-5" /> Exportar como PDF
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-base">
            <Download className="mr-2 h-5 w-5" /> Exportar como Excel
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium">Enviar Reporte por Correo</Label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              id="email"
              placeholder="Correo electrónico"
              className="bg-gray-700 border-gray-600 text-white text-sm md:text-base flex-grow"
            />
            <Button className="bg-purple-500 hover:bg-purple-600 text-base whitespace-nowrap">
              <Send className="mr-2 h-5 w-5" /> Enviar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}