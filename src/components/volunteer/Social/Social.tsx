"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, MessageCircle, Users } from "lucide-react"
import ExperiencesTab from "./ExperiencesTab"
import ChatsTab from "./ChatsTab"
import CommunitiesTab from "./CommunitiesTab"
import { experiences, chats, communities } from "@/data/volunteer/Social"

export default function Social() {
  const [activeTab, setActiveTab] = useState("experiencias")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6"
    >
      <Card className="bg-gray-800 border-blue-500">
        <CardContent className="p-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-green-400 mb-6 text-center"
          >
            Social Hub
          </motion.h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700 rounded-lg p-1">
              <TabsTrigger
                value="experiencias"
                className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all duration-200 ease-in-out"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Experiencias
              </TabsTrigger>
              <TabsTrigger
                value="chats"
                className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all duration-200 ease-in-out"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chats de Eventos
              </TabsTrigger>
              <TabsTrigger
                value="comunidades"
                className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all duration-200 ease-in-out"
              >
                <Users className="w-5 h-5 mr-2" />
                Comunidades
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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