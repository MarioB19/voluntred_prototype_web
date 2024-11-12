"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import ImpactSummary from "./ImpactSummary"
import RecommendedEvents from "./RecommendedEvents"
import FeaturedStories from "./FeaturedStories"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Dashboard() {
  const [expandedSection, setExpandedSection] = useState<string | null>("impact")

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-6 space-y-6">
      <motion.header 
        className="text-center mb-8"
        {...fadeInUp}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
          Bienvenido de vuelta, Voluntario!
        </h1>
        <p className="text-sm text-gray-400">
          Tu impacto está haciendo la diferencia
        </p>
      </motion.header>
      
      <motion.section {...fadeInUp} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-400">Resumen de Impacto</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection("impact")}
            aria-label={expandedSection === "impact" ? "Collapse Impact Summary" : "Expand Impact Summary"}
          >
            {expandedSection === "impact" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <AnimatePresence>
          {expandedSection === "impact" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ImpactSummary />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.section {...fadeInUp} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-400">Eventos Recomendados</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection("events")}
            aria-label={expandedSection === "events" ? "Collapse Recommended Events" : "Expand Recommended Events"}
          >
            {expandedSection === "events" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <AnimatePresence>
          {expandedSection === "events" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RecommendedEvents />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.section {...fadeInUp} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-400">Historias Destacadas</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection("stories")}
            aria-label={expandedSection === "stories" ? "Collapse Featured Stories" : "Expand Featured Stories"}
          >
            {expandedSection === "stories" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <AnimatePresence>
          {expandedSection === "stories" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeaturedStories />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  )
}