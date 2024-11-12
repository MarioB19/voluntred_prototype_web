"use client"

import React from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Award, Target, Calendar } from "lucide-react"
import ImpactStatistics from "./ImpactStatistics"
import CertificatesRecognitions from "./CertificatesRecognitions"
import PersonalGoals from "./PersonalGoals"
import MonthlyReports from "./MonthlyReports"

export default function Reports() {
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-grow overflow-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <header className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-4"
            >
              <BarChart3 size={40} className="text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Informes y Estadísticas
            </h1>
          </header>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Tabs defaultValue="impacto" className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-gray-900 rounded-t-lg overflow-hidden">
                  <TabsTrigger
                    value="impacto"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-green-400 py-3 transition-all duration-200 ease-in-out flex items-center justify-center"
                  >
                    <BarChart3 className="w-5 h-5 sm:mr-2" />
                    <span className="ml-2 hidden sm:inline">Impacto Personal</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="certificados"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-green-400 py-3 transition-all duration-200 ease-in-out flex items-center justify-center"
                  >
                    <Award className="w-5 h-5 sm:mr-2" />
                    <span className="ml-2 hidden sm:inline">Certificados</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="metas"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-green-400 py-3 transition-all duration-200 ease-in-out flex items-center justify-center"
                  >
                    <Target className="w-5 h-5 sm:mr-2" />
                    <span className="ml-2 hidden sm:inline">Metas Personales</span>
                  </TabsTrigger>
                </TabsList>

                <div className="p-4 sm:p-6 overflow-auto max-h-[calc(100vh-300px)]">
                  <TabsContent value="impacto">
                    <ImpactStatistics />
                  </TabsContent>

                  <TabsContent value="certificados">
                    <CertificatesRecognitions />
                  </TabsContent>

                  <TabsContent value="metas">
                    <PersonalGoals />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 mr-2 text-green-400" />
                  <h2 className="text-2xl font-semibold text-green-400">Informes Mensuales</h2>
                </div>
                <MonthlyReports />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}