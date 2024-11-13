import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Event } from "@/data/ngo/Events"
import EventList from './EventList'

interface EventCategoryProps {
  title: string
  events: Event[]
  onSelectEvent: (event: Event) => void
  color: string
}

export default function EventCategory({ title, events, onSelectEvent, color }: EventCategoryProps) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Card className={`bg-gray-800 border-l-4 ${color} transition-all duration-300 ease-in-out`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs font-medium">
            {events.length} eventos
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
          onClick={toggleExpand}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {isExpanded && (
          <div className="pt-2">
            <EventList events={events} onSelectEvent={onSelectEvent} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}