'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Target, PlusCircle, MessageCircle, Handshake, TrendingUp, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { dashboardData } from '@/data/ngo/Dashboard'

const iconMap = {
  Calendar, Users, Clock, Target, PlusCircle, MessageCircle, Handshake, TrendingUp
}

export default function NGODashboard() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard ONG
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap]
          return (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(card.title)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/30 overflow-hidden relative shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">{card.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${hoveredCard === card.title ? 'text-green-400' : 'text-blue-400'} transition-colors duration-300`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{card.value.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">{card.subtext}</p>
                </CardContent>
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition-opacity duration-300 ${hoveredCard === card.title ? 'opacity-10' : ''}`}
                />
              </Card>
            </motion.div>
          )
        })}
      </div>
      <div className="space-y-6">
        <motion.h3 
          className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Acciones Rápidas
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.quickActions.map((action, index) => {
            const Icon = iconMap[action.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <Button 
                  className={`w-full h-full py-6 bg-gradient-to-br ${action.color} hover:opacity-90 transition-opacity duration-300 text-white font-semibold text-lg shadow-lg`}
                >
                  <Icon className="mr-2 h-6 w-6" />
                  {action.title}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Eventos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dashboardData.recentEvents.map((event, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{event.name}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    {event.participants} participantes | {event.hours} horas
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dashboardData.upcomingEvents.map((event, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{event.name}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    {event.registeredParticipants} inscritos
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Top Voluntarios</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dashboardData.topVolunteers.map((volunteer, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-300 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  {volunteer.name}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  {volunteer.hours} horas | {volunteer.events} eventos
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}