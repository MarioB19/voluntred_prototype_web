"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, subYears } from "date-fns"
import { CalendarIcon, Download, Send } from 'lucide-react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  ChartTitle,
  ChartTooltip,
  ChartLegend
)

interface ImpactData {
  totalHours: number
  volunteers: number
  beneficiaries: number
  registeredPeople: number
  odsImpact: Array<{ name: string; value: number }>
  monthlyData: Array<{
    month: string
    hours: number
    volunteers: number
    beneficiaries: number
  }>
  yearlyData: Array<{
    year: number
    hours: number
    volunteers: number
    beneficiaries: number
  }>
}

interface Event {
  id: number
  name: string
}

interface EventStatisticsData {
  attendance: { expected: number; actual: number }
  ratings: Array<{ name: string; value: number }>
  comments: Array<{ id: number; author: string; comment: string }>
}

interface DateRange {
  from: Date
  to?: Date
}

// Mock data (unchanged)
const impactData: ImpactData = {
  totalHours: 25000,
  volunteers: 2500,
  beneficiaries: 50000,
  registeredPeople: 3000,
  odsImpact: [
    { name: 'ODS 1', value: 30 },
    { name: 'ODS 3', value: 40 },
    { name: 'ODS 4', value: 20 },
    { name: 'ODS 13', value: 10 },
  ],
  monthlyData: [
    { month: 'Ene', hours: 2000, volunteers: 200, beneficiaries: 4000 },
    { month: 'Feb', hours: 2200, volunteers: 220, beneficiaries: 4400 },
    { month: 'Mar', hours: 2100, volunteers: 210, beneficiaries: 4200 },
    { month: 'Abr', hours: 2300, volunteers: 230, beneficiaries: 4600 },
    { month: 'May', hours: 2400, volunteers: 240, beneficiaries: 4800 },
    { month: 'Jun', hours: 2600, volunteers: 260, beneficiaries: 5200 },
  ],
  yearlyData: [
    { year: 2020, hours: 20000, volunteers: 2000, beneficiaries: 40000 },
    { year: 2021, hours: 22000, volunteers: 2200, beneficiaries: 44000 },
    { year: 2022, hours: 24000, volunteers: 2400, beneficiaries: 48000 },
    { year: 2023, hours: 25000, volunteers: 2500, beneficiaries: 50000 },
  ],
}

const eventsList: Event[] = [
  { id: 1, name: 'Hackathon Ambiental 2024' },
  { id: 2, name: 'Feria de Energías Renovables' },
  { id: 3, name: 'Día Mundial del Agua' },
]

const eventStatisticsData: EventStatisticsData = {
  attendance: { expected: 100, actual: 85 },
  ratings: [
    { name: '5 estrellas', value: 30 },
    { name: '4 estrellas', value: 40 },
    { name: '3 estrellas', value: 20 },
    { name: '2 estrellas', value: 8 },
    { name: '1 estrella', value: 2 },
  ],
  comments: [
    { id: 1, author: 'Juan Pérez', comment: 'Excelente organización y muy buen ambiente.' },
    { id: 2, author: 'María García', comment: 'Me encantó la experiencia, aprendí mucho.' },
    { id: 3, author: 'Carlos Rodríguez', comment: 'Buena iniciativa, pero faltó un poco más de tiempo para las actividades.' },
  ],
}

const ImpactAndStatistics: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(eventsList[0].id)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subYears(new Date(), 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState<'yearly' | 'monthly'>('yearly')

  return (
    <div className="space-y-6 bg-black text-white p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-400">Impacto y Estadísticas</h2>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="summary" className="text-white data-[state=active]:bg-blue-500 text-xs md:text-sm">
            Resumen
          </TabsTrigger>
          <TabsTrigger value="events" className="text-white data-[state=active]:bg-blue-500 text-xs md:text-sm">
            Eventos
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-blue-500 text-xs md:text-sm">
            Reportes
          </TabsTrigger>
        </TabsList>
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
      </Tabs>
    </div>
  )
}

const ImpactSummary: React.FC<{ data: ImpactData }> = ({ data }) => {
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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-400">Métricas Generales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              Total de horas de voluntariado: <span className="text-white font-bold">{data.totalHours}</span>
            </p>
            <p className="text-sm text-gray-400">
              Número de voluntarios: <span className="text-white font-bold">{data.volunteers}</span>
            </p>
            <p className="text-sm text-gray-400">
              Beneficiarios impactados: <span className="text-white font-bold">{data.beneficiaries}</span>
            </p>
            <p className="text-sm text-gray-400">
              Personas registradas: <span className="text-white font-bold">{data.registeredPeople}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-400">ODS Impactados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right' as const,
                    labels: {
                      color: 'white',
                      font: {
                        size: 10
                      }
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-blue-500 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-400">Tendencias Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 md:h-96">
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
                    labels: { color: 'white', font: { size: 10 } },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface EventStatisticsProps {
  events: Event[]
  selectedEvent: number
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>
  statistics: EventStatisticsData
}

const EventStatistics: React.FC<EventStatisticsProps> = ({
  events,
  selectedEvent,
  setSelectedEvent,
  statistics,
}) => {
  const attendanceData = {
    labels: ['Esperada', 'Real'],
    datasets: [
      {
        data: [statistics.attendance.expected, statistics.attendance.actual],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  }

  const ratingsData = {
    labels: statistics.ratings.map((r) => r.name),
    datasets: [
      {
        data: statistics.ratings.map((r) => r.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="event-select" className="text-sm md:text-base">Seleccionar Evento</Label>
        <Select
          value={selectedEvent.toString()}
          onValueChange={(value) => setSelectedEvent(parseInt(value))}
        >
          <SelectTrigger id="event-select" className="bg-gray-700 border-gray-600 text-white text-sm md:text-base">
            <SelectValue>
              {events.find((event) => event.id === selectedEvent)?.name || 'Seleccione un evento'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.id.toString()}>
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-400">Asistencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <Bar
              data={attendanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: 'white',   font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  },
                  x: {
                    ticks: { color: 'white', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-400">Valoraciones del Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <Bar
              data={ratingsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: 'white', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  },
                  x: {
                    ticks: { color: 'white', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-400">Comentarios de Voluntarios</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] md:h-[300px]">
            {statistics.comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <p className="text-sm font-semibold text-white">{comment.author}</p>
                <p className="text-sm text-gray-400">{comment.comment}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

interface ReportsAndExportProps {
  dateRange: DateRange
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>
  reportType: 'yearly' | 'monthly'
  setReportType: React.Dispatch<React.SetStateAction<'yearly' | 'monthly'>>
  data: ImpactData
}

const ReportsAndExport: React.FC<ReportsAndExportProps> = ({
  dateRange,
  setDateRange,
  reportType,
  setReportType,
  data,
}) => {
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
        <CardTitle className="text-lg font-semibold text-green-400">Generar Reporte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="date-range" className="text-sm md:text-base">Rango de Fechas</Label>
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
                      {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Seleccionar rango de fechas</span>
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
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="report-type" className="text-sm md:text-base">Tipo de Reporte</Label>
          <Select
            value={reportType}
            onValueChange={(value: 'yearly' | 'monthly') => setReportType(value)}
          >
            <SelectTrigger id="report-type" className="bg-gray-700 border-gray-600 text-white text-sm md:text-base">
              <SelectValue>{reportType === 'yearly' ? 'Anual' : 'Mensual'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">Anual</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-md font-semibold text-green-400">Vista Previa del Reporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 md:h-96">
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
                      labels: { color: 'white', font: { size: 10 } },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        <div>
          <Label htmlFor="report-content" className="text-sm md:text-base">Contenido del Reporte</Label>
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
        </div>
        <div className="space-y-2">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm md:text-base">
            <Download className="mr-2 h-4 w-4" /> Exportar como PDF
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-sm md:text-base">
            <Download className="mr-2 h-4 w-4" /> Exportar como Excel
          </Button>
        </div>
        <div>
          <Label htmlFor="email" className="text-sm md:text-base">Enviar Reporte por Correo</Label>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2">
            <Input
              id="email"
              placeholder="Correo electrónico"
              className="bg-gray-700 border-gray-600 text-white text-sm md:text-base"
            />
            <Button className="bg-purple-500 hover:bg-purple-600 text-sm md:text-base">
              <Send className="mr-2 h-4 w-4" /> Enviar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ImpactAndStatistics