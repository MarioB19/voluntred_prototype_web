import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarIcon, Clock, MapPin, Users, Edit, Copy, Trash2, MessageCircle, Eye } from 'lucide-react'
import { format } from "date-fns"
import { Event } from "@/data/ngo/Events"

interface EventListProps {
  events: Event[]
  onSelectEvent?: (event: Event) => void
}

export default function EventList({ events, onSelectEvent }: EventListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-white line-clamp-2">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-400" />
                {format(new Date(event.date), 'dd MMM yyyy')}
                <span className="mx-2">•</span>
                <Clock className="mr-2 h-4 w-4 text-blue-400" />
                {event.time}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-green-400" />
                <span className="line-clamp-1">
                  {event.location
                    ? `${event.location.street || ''}, ${event.location.neighborhood || ''}, ${event.location.municipality || ''}, ${event.location.state || ''}`
                    : 'Ubicación no especificada'}
                </span>
              </p>
              <p className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-yellow-400" />
                {event.participants} participantes
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-500 text-white">
                {event.category}
              </Badge>
              {event.status === 'draft' && (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  Borrador
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between gap-2 bg-gray-900 pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-400 hover:bg-blue-400 hover:text-white"
                    onClick={() => onSelectEvent && onSelectEvent(event)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver detalles</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-green-400 hover:bg-green-400 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar evento</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-yellow-400 hover:bg-yellow-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicar evento</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-400 hover:text-white">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar evento</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-400 hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chats del evento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
