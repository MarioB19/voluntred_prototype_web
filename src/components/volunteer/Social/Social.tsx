"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, MessageCircle, Users } from 'lucide-react'
import ExperiencesTab from "./ExperiencesTab"
import ChatsTab from "./ChatsTab"
import CommunitiesTab from "./CommunitiesTab"
import { experiences, chats, communities } from "@/data/volunteer/Social"

export default function Social() {
  const [activeTab, setActiveTab] = useState("experiencias")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const tabs = [
    { id: "experiencias", icon: Share2, label: "Experiencias" },
    { id: "chats", icon: MessageCircle, label: "Chats de Eventos" },
    { id: "comunidades", icon: Users, label: "Comunidades" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-6"
    >
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/30 shadow-lg">
        <CardContent className="p-4 md:p-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-8 text-center"
          >
            Social Hub
          </motion.h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-200 ease-in-out py-2 px-3 md:py-3 md:px-4"
                >
                  <tab.icon className={`w-6 h-6 ${isMobile ? '' : 'mr-2'}`} />
                  {!isMobile && <span>{tab.label}</span>}
                </TabsTrigger>
              ))}
            </TabsList>

          
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <TabsContent value="experiencias">
                  <ExperiencesTab experiences={experiences} />
                </TabsContent>

                <TabsContent value="chats">
                  <ChatsTab chats={chats} />
                </TabsContent>

                <TabsContent value="comunidades">
                  <CommunitiesTab communities={communities} />
                </TabsContent>
              </motion.div>
         
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}