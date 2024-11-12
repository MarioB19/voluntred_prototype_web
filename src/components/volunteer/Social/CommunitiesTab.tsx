"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Hash, Users, Search, Globe, ArrowRight, Info } from "lucide-react"
import { Community } from "@/data/volunteer/Social"

interface CommunitiesTabProps {
  communities: Community[]
}

export default function CommunitiesTab({ communities }: CommunitiesTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCommunities, setFilteredCommunities] = useState(communities)

  useEffect(() => {
    const filtered = communities.filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredCommunities(filtered)
  }, [searchTerm, communities])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-green-400">Explorar Comunidades</CardTitle>
          <CardDescription className="text-gray-300">
            Descubre y únete a comunidades que comparten tus intereses y valores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar comunidades..."
              className="bg-gray-800 text-white border-blue-500 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[600px] pr-4">
            <AnimatePresence>
              {filteredCommunities.map((community) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <CommunityCard community={community} />
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <Card className="bg-gray-800 border-blue-500 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-blue-500">
              <AvatarImage src={`https://source.unsplash.com/random/100x100?${community.name}`} alt={community.name} />
              <AvatarFallback>{community.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold text-blue-400">{community.name}</h3>
              <p className="text-sm text-gray-300 flex items-center mt-1">
                <Users className="inline mr-2 h-4 w-4" />
                {community.members} miembros
              </p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-green-400 text-black hover:bg-green-500 font-semibold px-6 py-2">
                    Unirse
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Únete a esta comunidad</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-2">{community.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {community.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-900 text-white px-3 py-1">
              <Hash className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Comunidad activa
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Más información sobre esta comunidad</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}