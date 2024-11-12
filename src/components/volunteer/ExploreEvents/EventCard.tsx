"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Building, Target, Users, ChevronDown, ChevronUp } from "lucide-react"
import { Event } from "@/data/volunteer/ExploreEvents"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: Event
  onViewDetails: () => void
}

export default function EventCard({ event, onViewDetails }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-green-400 mb-2">{event.title}</CardTitle>
          <Badge variant="outline" className="bg-blue-800 text-white border-blue-400 px-2 py-1 text-xs">
            {event.category}
          </Badge>
        </div>
        <p className="text-sm text-blue-300 line-clamp-2">{event.description}</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="flex items-center text-blue-300">
            <MapPin className="mr-1 h-3 w-3" />
            <span className="truncate max-w-[150px]">{event.location}</span>
          </div>
          <div className="flex items-center text-blue-300">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-blue-300">
            <Clock className="mr-1 h-3 w-3" />
            {event.time}
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center text-blue-300 text-sm">
                <Building className="mr-2 h-3 w-3" />
                {event.ong}
              </div>
              <div className="flex items-center text-blue-300 text-sm">
                <Target className="mr-2 h-3 w-3" />
                {event.ods}
              </div>
              <div className="flex items-center text-blue-300 text-sm">
                <Users className="mr-2 h-3 w-3" />
                {event.participants} participantes
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-green-400 mb-2">Patrocinadores:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.sponsors.map((sponsor, index) => (
                    <div key={index} className="flex items-center bg-gray-800 rounded-full px-3 py-1 transition-all duration-300 hover:bg-gray-700">
                      <img src={sponsor.image} alt={sponsor.name} className="w-4 h-4 object-contain mr-2 rounded-full" />
                      <span className="text-xs font-medium text-blue-300">{sponsor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300"
          onClick={onViewDetails}
        >
          Ver detalles
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-full text-blue-300 hover:text-blue-100",
            isExpanded && "bg-blue-800 hover:bg-blue-700"
          )}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Menos información
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Más información
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}