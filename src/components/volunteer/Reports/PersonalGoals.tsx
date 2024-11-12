"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Edit2, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { reportsData } from "@/data/volunteer/Reports"

export default function PersonalGoals() {
  const [goals, setGoals] = useState(reportsData.metasPersonales)
  const [newGoal, setNewGoal] = useState("")

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), title: newGoal, progress: 0 }])
      setNewGoal("")
    }
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
          <Target className="mr-2 h-6 w-6" />
          Metas Personales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatePresence>
          {goals.map((meta) => (
            <motion.div
              key={meta.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-white">{meta.title}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-500 text-white">
                    {meta.progress}%
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar meta</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => deleteGoal(meta.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar meta</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Progress 
                value={meta.progress} 
                className="h-2 bg-gray-700 [&>div]:progress-indicator" 
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
            Agregar Nueva Meta
          </h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Descripción de la meta"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="bg-gray-800 border-blue-500 text-white placeholder-gray-400"
            />
            <Button
              onClick={addGoal}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}