"use client"

import React from 'react'
import { NGOProfile } from '@/data/ngo/Profile'
import ProfileHeader from './ProfileHeader'
import GallerySection, { GallerySectionProps } from './GallerySection'
import EventsSection, { EventsSectionProps } from './EventsSection'
import SponsorsSection, { SponsorsSectionProps } from './SponsorsSection'
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Image, CalendarCheck, Users } from 'lucide-react'

interface PublicProfileProps {
  profileData: NGOProfile
}

type Section = 
  | { id: "gallery"; label: string; icon: typeof Image; component: typeof GallerySection; props: GallerySectionProps }
  | { id: "events"; label: string; icon: typeof CalendarCheck; component: typeof EventsSection; props: EventsSectionProps }
  | { id: "sponsors"; label: string; icon: typeof Users; component: typeof SponsorsSection; props: SponsorsSectionProps }

const PublicProfile: React.FC<PublicProfileProps> = ({ profileData }) => {
  const sections: Section[] = [
    { id: "gallery", label: "Galería", icon: Image, component: GallerySection, props: { gallery: profileData.gallery } },
    { id: "events", label: "Eventos", icon: CalendarCheck, component: EventsSection, props: { events: profileData.events } },
    { id: "sponsors", label: "Patrocinadores", icon: Users, component: SponsorsSection, props: { sponsors: profileData.sponsors } },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <ProfileHeader profileData={profileData} />
      </motion.div>

      <Tabs defaultValue="gallery" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-blue-600 to-green-500 p-1 rounded-full">
          {sections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="flex items-center justify-center space-x-2 text-sm font-medium py-2 px-4 rounded-full transition-all duration-200
                         text-white
                         data-[state=active]:bg-white data-[state=active]:text-blue-600
                         data-[state=active]:shadow-lg hover:bg-white/10"
            >
              <section.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{section.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollArea className="h-[600px] rounded-lg border border-gray-700 bg-gray-800 p-4">
          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {section.id === "gallery" && <GallerySection {...section.props} />}
                {section.id === "events" && <EventsSection {...section.props} />}
                {section.id === "sponsors" && <SponsorsSection {...section.props} />}
              </motion.div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </motion.div>
  )
}

export default PublicProfile