"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, MapPin, ChevronRight, Users, Target } from "lucide-react"
import { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
  onViewDetails: (event: Event) => void
}

export default function EventCard({ event, onViewDetails }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-green-400">{event.title}</CardTitle>
            <Badge variant="outline" className="bg-blue-800 text-white border-blue-400">
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-blue-300 line-clamp-2">{event.description}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center text-blue-300">
              <Clock className="mr-1 h-3 w-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-blue-300">
              <MapPin className="mr-1 h-3 w-3" />
              <span className="truncate max-w-[150px]">{event.location}</span>
            </div>
            <div className="flex items-center text-blue-300">
              <Users className="mr-1 h-3 w-3" />
              <span>{event.participants} participantes</span>
            </div>
            <div className="flex items-center text-blue-300">
              <Target className="mr-1 h-3 w-3" />
              <span>{event.ods}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-blue-300">Patrocinado por:</span>
            {event.sponsors.map((sponsor, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={sponsor.image} alt={sponsor.name} />
                      <AvatarFallback>{sponsor.name[0]}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sponsor.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            onClick={() => onViewDetails(event)}
          >
            Ver más información
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}