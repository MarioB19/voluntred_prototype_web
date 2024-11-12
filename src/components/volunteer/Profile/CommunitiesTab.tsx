"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ChevronRight } from "lucide-react"
import { communitiesData } from "@/data/volunteer/Profile"

export default function CommunitiesTab() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-blue-900 border-blue-500 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
          <Users className="mr-2 h-6 w-6" />
          Comunidades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {communitiesData.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-4"
            >
              <Card className="bg-gray-800/50 border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-blue-400">{community.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/50">
                          {community.members} miembros
                        </Badge>
                        <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-500/50">
                          {community.role}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black transition-all duration-200"
                    >
                      Ver Comunidad
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
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