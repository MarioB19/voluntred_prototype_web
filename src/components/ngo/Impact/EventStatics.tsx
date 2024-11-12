"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bar, Doughnut } from 'react-chartjs-2'
import { Event, EventStatisticsData } from '@/data/ngo/Impacto'
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react'
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
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  }

  const ratingsData = {
    labels: statistics.ratings.map((r) => r.name),
    datasets: [
      {
        data: statistics.ratings.map((r) => r.value),
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
    <div className="space-y-6 p-4">
      <div>
        <Label htmlFor="event-select" className="text-base font-medium mb-2 block">Seleccionar Evento</Label>
        <Select
          value={selectedEvent.toString()}
          onValueChange={(value) => setSelectedEvent(parseInt(value))}
        >
          <SelectTrigger id="event-select" className="bg-gray-700 border-gray-600 text-white text-base w-full">
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

      <Card className="bg-gray-800 border-blue-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-400">Asistencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
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
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-400">Valoraciones del Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
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

      <Card className="bg-gray-800 border-blue-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-400">Comentarios de Voluntarios</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] sm:h-[400px]">
            {statistics.comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="mb-4 bg-gray-700 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base font-semibold text-white">{comment.author}</p>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 text-green-400" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
                {expandedComment === comment.id ? (
                  <AnimatePresence>
                    <motion.p
                      className="text-sm text-gray-300"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {comment.comment}
                    </motion.p>
                  </AnimatePresence>
                ) : (
                  <p className="text-sm text-gray-300 truncate">{comment.comment}</p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-blue-400"
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