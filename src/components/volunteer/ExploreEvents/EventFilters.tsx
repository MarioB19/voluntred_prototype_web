"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Filter, ChevronDown, ChevronUp, Tag, MapPin, Calendar, Building, Target } from "lucide-react"

interface EventFiltersProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

const filters = [
  { name: "Todos", icon: Filter },
  { name: "Categoría", icon: Tag },
  { name: "Ubicación", icon: MapPin },
  { name: "Fecha", icon: Calendar },
  { name: "ONG", icon: Building },
  { name: "ODS", icon: Target },
]

export default function EventFilters({ activeFilter, setActiveFilter }: EventFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between text-left font-normal bg-gradient-to-r from-gray-800 to-blue-900 border-blue-500 text-white hover:from-gray-700 hover:to-blue-800 hover:text-blue-300 transition-all duration-300"
      >
        <span className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-blue-500 bg-gray-800 p-1">
              <div className="flex space-x-2">
                <TooltipProvider>
                  {filters.map((filter) => (
                    <Tooltip key={filter.name}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveFilter(filter.name)}
                          className={cn(
                            "flex-shrink-0 transition-all duration-300 rounded-full",
                            activeFilter === filter.name
                              ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg"
                              : "bg-transparent text-blue-300 hover:text-white hover:bg-blue-700"
                          )}
                        >
                          <filter.icon className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">{filter.name}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Filtrar por {filter.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
              <ScrollBar orientation="horizontal" className="bg-gray-700" />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}