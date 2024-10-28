"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Camera, Send, ThumbsUp, MessageCircle, Share2, Hash, Users, Search } from "lucide-react"

export default function Social() {
  const [activeTab, setActiveTab] = useState("experiencias")
  const [isPublishing, setIsPublishing] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-black text-white"
    >
      <h1 className="text-3xl font-bold text-green-400">Social</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="experiencias" className="text-white data-[state=active]:bg-blue-500">Experiencias</TabsTrigger>
          <TabsTrigger value="chats" className="text-white data-[state=active]:bg-blue-500">Chats de Eventos</TabsTrigger>
          <TabsTrigger value="comunidades" className="text-white data-[state=active]:bg-blue-500">Comunidades</TabsTrigger>
        </TabsList>

        <TabsContent value="experiencias">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-900 border-blue-500">
              <CardHeader>
                <CardTitle className="text-green-400">Compartir Experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder="Comparte tu experiencia..." className="bg-gray-800 text-white border-blue-500" />
                  <div className="flex justify-between items-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" className="text-blue-400 border-blue-500">
                        <Camera className="mr-2 h-4 w-4" />
                        Subir Foto/Video
                      </Button>
                    </motion.div>
                    <div className="space-x-2">
                      <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                        #ODS1
                      </Badge>
                      <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                        #LimpiezaPlayas
                      </Badge>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="w-full bg-green-400 text-black hover:bg-green-500"
                      onClick={() => {
                        setIsPublishing(true)
                        setTimeout(() => setIsPublishing(false), 2000) // Simulating API call
                      }}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-t-2 border-b-2 border-black rounded-full"
                        />
                      ) : (
                        "Publicar"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <ScrollArea className="h-[400px] mt-4">
            {[1, 2, 3].map((post) => (
              <motion.div
                key={post}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-gray-900 border-blue-500 mb-4">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/avatar-${post}.png`} />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-semibold">Usuario {post}</h3>
                        <p className="text-sm text-gray-400">Hace 2 horas</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white mb-4">¡Increíble experiencia en la limpieza de playa de hoy! Juntos hicimos la diferencia. #ODS14 #LimpiezaPlayas</p>
                    <img src={`/experiencia.jpg`} alt="Imagen de la experiencia" className="rounded-lg mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            className={`text-blue-400 ${likedPosts.includes(post) ? 'bg-blue-500/20' : ''}`}
                            onClick={() => {
                              if (likedPosts.includes(post)) {
                                setLikedPosts(likedPosts.filter(id => id !== post))
                              } else {
                                setLikedPosts([...likedPosts, post])
                              }
                            }}
                          >
                            <motion.div
                              animate={likedPosts.includes(post) ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              <ThumbsUp className="mr-2 h-4 w-4" />
                            </motion.div>
                            Me gusta
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="ghost" className="text-blue-400">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Comentar
                          </Button>
                        </motion.div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" className="text-blue-400">
                          <Share2 className="mr-2 h-4 w-4" />
                          Compartir
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="chats">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-900 border-blue-500">
              <CardHeader>
                <CardTitle className="text-green-400">Chats de Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Input placeholder="Buscar chats..." className="bg-gray-800 text-white border-blue-500" />
                    <ScrollArea className="h-[300px]">
                      {[1, 2, 3].map((chat) => (
                        <motion.div key={chat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left mb-2 hover:bg-blue-900"
                            onClick={() => setSelectedChat(chat)}
                          >
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={`/event-${chat}.png`} />
                                <AvatarFallback>EV</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-white font-semibold">Evento {chat}</h3>
                                <p className="text-sm text-gray-400">Último mensaje: Hace 5 min</p>
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </ScrollArea>
                  </div>
                  {selectedChat ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-800 border-blue-500">
                        <CardHeader>
                          <CardTitle className="text-blue-400">Chat del Evento {selectedChat}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[200px] mb-4">
                            {[1, 2, 3].map((message) => (
                              <motion.div
                                key={message}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`mb-2 ${message % 2 === 0 ? 'text-right' : ''}`}
                              >
                                <p className={`inline-block p-2 rounded-lg ${message % 2 === 0 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                                  Mensaje de ejemplo {message}
                                </p>
                              </motion.div>
                            ))}
                          </ScrollArea>
                          <div className="flex space-x-2">
                            <Input placeholder="Escribe un mensaje..." className="bg-gray-700 text-white border-blue-500" />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="bg-green-400 text-black hover:bg-green-500">
                                <Send className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Selecciona un chat para ver los mensajes
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="comunidades">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-900 border-blue-500">
              <CardHeader>
                <CardTitle className="text-green-400">Explorar Comunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Buscar comunidades..." className="bg-gray-800 text-white border-blue-500 mb-4" />
                <ScrollArea className="h-[400px]">
                  {[1, 2, 3, 4].map((community) => (
                    <motion.div
                      key={community}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-gray-800 border-blue-500 mb-4">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-blue-400">Comunidad {community}</CardTitle>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="bg-green-400 text-black hover:bg-green-500">Unirse</Button>
                            </motion.div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white mb-2">Descripción de la comunidad {community}. Únete a nosotros para hacer la diferencia.</p>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                              <Hash className="mr-1 h-3 w-3" />
                              ODS{community}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-900 text-white border-blue-500">
                              <Users className="mr-1 h-3 w-3" />
                              {100 * community} miembros
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}