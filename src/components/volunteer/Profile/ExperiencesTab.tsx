"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, BookOpen } from "lucide-react"
import { experiencesData } from "@/data/volunteer/Profile"

export default function ExperiencesTab() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
          <BookOpen className="mr-2 h-6 w-6" />
          Experiencias Compartidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {experiencesData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="mb-4 bg-gray-800/50 border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200">
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{experience.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {experience.date}
                  </div>
                  <p className="text-gray-200 mb-3 leading-relaxed">{experience.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.tags && experience.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="bg-blue-600/20 text-blue-300 border-blue-500/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}