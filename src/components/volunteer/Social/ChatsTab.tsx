"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { Chat } from "@/data/volunteer/Social"
import { Badge } from "@/components/ui/badge"

interface ChatsTabProps {
  chats: Chat[]
}

export default function ChatsTab({ chats }: ChatsTabProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="bg-gray-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-green-400">Chats de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChatList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            <ChatWindow selectedChat={selectedChat} chats={chats} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ChatList({ chats, selectedChat, setSelectedChat }: { chats: Chat[]; selectedChat: number | null; setSelectedChat: (value: number | null) => void }) {
  return (
    <div className="space-y-4">
      <Input placeholder="Buscar chats..." className="bg-gray-800 text-white border-blue-500" />
      <ScrollArea className="h-[400px]">
        {chats.map((chat) => (
          <motion.div key={chat.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className={`w-full justify-start text-left mb-2 hover:bg-blue-900 ${selectedChat === chat.id ? 'bg-blue-900' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/events/${chat.eventId}.png`} />
                  <AvatarFallback>{chat.eventName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{chat.eventName}</h3>
                  <p className="text-sm text-gray-400">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  )
}

function ChatWindow({ selectedChat, chats }: { selectedChat: number | null; chats: Chat[] }) {
  const chat = chats.find(c => c.id === selectedChat)

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Selecciona un chat para ver los mensajes
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-gray-800 border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-400">{chat.eventName}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] mb-4">
            {/* Aquí irían los mensajes reales del chat */}
            <div className="space-y-4">
              <div className="bg-blue-900 text-white p-2 rounded-lg max-w-[80%]">
                {chat.lastMessage}
              </div>
              <div className="bg-gray-700 text-white p-2 rounded-lg max-w-[80%] ml-auto">
                Respuesta de ejemplo
              </div>
            </div>
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
  )
}