"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, SendHorizontal, MessageCircle } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

import CollaborationsPanel from './CollaborationsPanel'
import ProposalForm from './ProposalForm'
import SentProposals from './SentProposal'
import ReceivedProposals from './ReceivedProposals'

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function NGOCollaborations() {
  const [activeTab, setActiveTab] = useState("collaborations")

  const tabs = [
    { id: "collaborations", icon: Users, label: "Colaboraciones" },
    { id: "proposals", icon: FileText, label: "Propuestas" },
    { id: "sent", icon: SendHorizontal, label: "Enviadas" },
    { id: "received", icon: MessageCircle, label: "Recibidas" },
  ]

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg min-h-screen">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
          <Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          Colaboraciones y Patrocinios
        </CardTitle>
      </CardHeader>
      <Separator className="bg-gray-700" />
      <CardContent className="p-0">
        <Tabs defaultValue="collaborations" className="w-full">
          <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-screen-xl mx-auto">
              <TabsList className="flex w-full bg-transparent rounded-none p-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex flex-col items-center justify-center py-3 px-1 space-y-1
                             data-[state=active]:bg-transparent
                             data-[state=active]:border-b-2
                             data-[state=active]:border-green-400
                             rounded-none
                             transition-all duration-200"
                  >
                    <tab.icon className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-medium leading-none hidden sm:block">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="min-h-[calc(100vh-200px)]"
            >
              <div className="px-4 py-4 sm:px-6 max-w-screen-xl mx-auto">
                <TabsContent value="collaborations" className="mt-0">
                  <CollaborationsPanel />
                </TabsContent>
                <TabsContent value="proposals" className="mt-0">
                  <ProposalForm />
                </TabsContent>
                <TabsContent value="sent" className="mt-0">
                  <SentProposals />
                </TabsContent>
                <TabsContent value="received" className="mt-0">
                  <ReceivedProposals />
                </TabsContent>
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  )
}