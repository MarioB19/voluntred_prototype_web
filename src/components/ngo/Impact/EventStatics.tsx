"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bar, Doughnut } from 'react-chartjs-2'
import { Event, EventStatisticsData } from '@/data/ngo/Impacto'
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Users, Star, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface EventStatisticsProps {
  events: Event[]
  selectedEvent: number
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>
  statistics: EventStatisticsData
}

export const EventStatistics: React.FC<EventStatisticsProps> = ({
  events,
  selectedEvent,
  setSelectedEvent,
  statistics,
}) => {
  const [expandedComment, setExpandedComment] = useState<number | null>(null)

  const attendanceData = {
    labels: ['Esperada', 'Real'],
    datasets: [
      {
        data: [statistics.attendance.expected, statistics.attendance.actual],
        backgroundColor: ['rgba(56, 189, 248, 0.6)', 'rgba(52, 211, 153, 0.6)'],
      },
    ],
  }

  const ratingsData = {
    labels: statistics.ratings.map((r) => r.name),
    datasets: [
      {
        data: statistics.ratings.map((r) => r.value),
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

  return (
    <div className="space-y-6 p-4">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <Label htmlFor="event-select" className="text-lg font-medium mb-2 block text-white">Seleccionar Evento</Label>
        <Select
          value={selectedEvent.toString()}
          onValueChange={(value) => setSelectedEvent(parseInt(value))}
        >
          <SelectTrigger id="event-select" className="bg-gray-700 border-gray-600 text-white text-base w-full">
            <SelectValue>
              {events.find((event) => event.id === selectedEvent)?.name || 'Seleccione un evento'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {events.map((event) => (
              <SelectItem key={event.id} value={event.id.toString()} className="text-white hover:bg-gray-600">
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800 border-blue-500 shadow-lg">
          <CardHeader className="border-b border-gray-700 pb-3">
            <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 flex items-center">
              <Users className="mr-2 h-6 w-6" />
              Asistencia
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64">
              <Bar
                data={attendanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'white', font: { size: 12 } },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    },
                    x: {
                      ticks: { color: 'white', font: { size: 12 } },
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

        <Card className="bg-gray-800 border-blue-500 shadow-lg">
          <CardHeader className="border-b border-gray-700 pb-3">
            <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 flex items-center">
              <Star className="mr-2 h-6 w-6" />
              Valoraciones del Evento
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64">
              <Doughnut
                data={ratingsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: 'white',
                        font: { size: 12 },
                        padding: 20,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-blue-500 shadow-lg">
        <CardHeader className="border-b border-gray-700 pb-3">
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 flex items-center">
            <MessageSquare className="mr-2 h-6 w-6" />
            Comentarios de Voluntarios
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ScrollArea className="h-[400px] pr-4">
            {statistics.comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="mb-4 bg-gray-700 rounded-lg p-4 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base font-semibold text-white">{comment.author}</p>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-green-500/20">
                      <ThumbsUp className="h-4 w-4 text-green-400" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-red-500/20">
                      <ThumbsDown className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {expandedComment === comment.id ? (
                    <motion.p
                      key="expanded"
                      className="text-sm text-gray-300"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {comment.comment}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="collapsed"
                      className="text-sm text-gray-300 truncate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {comment.comment}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-blue-400 hover:bg-blue-500/20"
                  onClick={() => setExpandedComment(expandedComment === comment.id ? null : comment.id)}
                >
                  {expandedComment === comment.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Más
                    </>
                  )}
                </Button>
              </motion.div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}