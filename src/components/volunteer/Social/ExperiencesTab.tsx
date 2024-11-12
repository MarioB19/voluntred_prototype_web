"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Camera, ThumbsUp, MessageCircle, Share2, Hash, Clock, MapPin } from "lucide-react"
import { Experience } from "@/data/volunteer/Social"

interface ExperiencesTabProps {
  experiences: Experience[]
}

export default function ExperiencesTab({ experiences }: ExperiencesTabProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <ShareExperience isPublishing={isPublishing} setIsPublishing={setIsPublishing} />
      <ExperiencesList experiences={experiences} likedPosts={likedPosts} setLikedPosts={setLikedPosts} />
    </div>
  )
}

function ShareExperience({ isPublishing, setIsPublishing }: { isPublishing: boolean; setIsPublishing: (value: boolean) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-400">Compartir Experiencia</CardTitle>
          <CardDescription className="text-gray-300">Comparte tus momentos de voluntariado con la comunidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Cuéntanos sobre tu experiencia..." 
              className="bg-gray-800 text-white border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
            />
            <div className="flex flex-wrap justify-between items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" className="text-blue-400 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200">
                        <Camera className="mr-2 h-4 w-4" />
                        Subir Foto/Video
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Añade fotos o videos a tu experiencia</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-900 text-white border-blue-500 px-3 py-1">
                  <Hash className="mr-1 h-3 w-3" />
                  ODS1
                </Badge>
                <Badge variant="outline" className="bg-blue-900 text-white border-blue-500 px-3 py-1">
                  <Hash className="mr-1 h-3 w-3" />
                  LimpiezaPlayas
                </Badge>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-green-400 text-black hover:bg-green-500 font-semibold text-lg py-6 transition-colors duration-200"
                onClick={() => {
                  setIsPublishing(true)
                  setTimeout(() => setIsPublishing(false), 2000)
                }}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-t-2 border-b-2 border-black rounded-full"
                  />
                ) : (
                  "Publicar Experiencia"
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ExperiencesList({ experiences, likedPosts, setLikedPosts }: { experiences: Experience[]; likedPosts: number[]; setLikedPosts: (value: number[]) => void }) {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <AnimatePresence>
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-blue-500">
                    <AvatarImage src={experience.avatar} alt={experience.username} />
                    <AvatarFallback>{experience.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{experience.username}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      <time dateTime={experience.createdAt}>{new Date(experience.createdAt).toLocaleString()}</time>
                      <MapPin className="ml-2 mr-1 h-3 w-3" />
                      <span>Tenerife, España</span>
                    </div>
                  </div>
                </div>
                <p className="text-white mb-4 text-lg">{experience.content}</p>
                <img src={experience.image} alt="Imagen de la experiencia" className="rounded-lg mb-4 w-full h-80 object-cover" />
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div className="flex space-x-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="ghost"
                              className={`text-blue-400 ${likedPosts.includes(experience.id) ? 'bg-blue-500/20' : ''}`}
                              onClick={() => {
                                if (likedPosts.includes(experience.id)) {
                                  setLikedPosts(likedPosts.filter(id => id !== experience.id))
                                } else {
                                  setLikedPosts([...likedPosts, experience.id])
                                }
                              }}
                            >
                              <motion.div
                                animate={likedPosts.includes(experience.id) ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <ThumbsUp className="mr-2 h-4 w-4" />
                              </motion.div>
                              {experience.likes} Me gusta
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{likedPosts.includes(experience.id) ? 'Quitar me gusta' : 'Me gusta'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" className="text-blue-400">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              {experience.comments} Comentarios
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver comentarios</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="ghost" className="text-blue-400">
                            <Share2 className="mr-2 h-4 w-4" />
                            {experience.shares} Compartir
                          </Button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Compartir esta experiencia</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-900 text-white border-blue-500 px-3 py-1">
                      <Hash className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollArea>
  )
}