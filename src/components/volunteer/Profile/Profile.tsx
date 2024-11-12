"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ProfileHeader from "./ProfileHeader"
import ImpactTab from "./ImpactTab"
import ExperiencesTab from "./ExperiencesTab"
import CommunitiesTab from "./CommunitiesTab"
import SettingsTab from "./SettingsTab"
import { TrendingUp, BookOpen, Users, Settings } from "lucide-react"

// Custom hook to track the selected tab
const useSelectedTab = (defaultValue: string) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue)
  return { selectedTab, setSelectedTab }
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const { selectedTab, setSelectedTab } = useSelectedTab("impact")

  const tabItems = [
    { value: "impact", icon: TrendingUp, label: "Impacto" },
    { value: "experiences", icon: BookOpen, label: "Experiencias" },
    { value: "communities", icon: Users, label: "Comunidades" },
    { value: "settings", icon: Settings, label: "Configuración" },
  ]

  return (
    <motion.div 
      className="container mx-auto p-4 space-y-6 bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-gray-800/50 border-blue-500/50 shadow-lg backdrop-blur-sm overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-gray-900/50 rounded-t-lg overflow-hidden">
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex flex-col items-center justify-center p-2 text-white data-[state=active]:bg-blue-600 transition-all duration-200 min-w-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                  <span className="text-[10px] sm:text-sm mt-1 truncate w-full text-center">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                <TabsContent value="impact" className="mt-0">
                  <ImpactTab />
                </TabsContent>
                <TabsContent value="experiences" className="mt-0">
                  <ExperiencesTab />
                </TabsContent>
                <TabsContent value="communities" className="mt-0">
                  <CommunitiesTab />
                </TabsContent>
                <TabsContent value="settings" className="mt-0">
                  <SettingsTab />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </Card>
      </motion.div>
    </motion.div>
  )
}