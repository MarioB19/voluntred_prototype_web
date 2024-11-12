"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp, ThumbsUp, MessageCircle } from "lucide-react"
import { featuredStories } from "@/data/volunteer/dashboard"

export default function FeaturedStories() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null)

  const toggleStory = (id: number) => {
    setExpandedStory(expandedStory === id ? null : id)
  }

  return (
    <Card className="bg-gradient-to-b from-gray-900 to-blue-900 border-blue-500 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-green-400 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Historias Destacadas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[60vh]">
          <div className="space-y-3">
            {featuredStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-blue-800 hover:bg-blue-700 transition-colors duration-200 overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex flex-col space-y-2 min-w-0">
                      {/* Author row with fixed height and proper text truncation */}
                      <div className="flex items-center space-x-2 min-w-0">
                        <Avatar className="h-8 w-8 flex-shrink-0 border border-green-400">
                          <AvatarImage src={story.avatar} alt={story.author} />
                          <AvatarFallback className="bg-blue-500 text-white text-sm">
                            {story.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-sm truncate">
                            {story.author}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className="mt-1 border-green-400 text-green-400 text-xs px-2 py-0 h-5 inline-flex items-center"
                          >
                            {story.sdg}
                          </Badge>
                        </div>
                      </div>

                      {/* Story content with animation */}
                      <AnimatePresence>
                        {expandedStory === story.id ? (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-blue-200 break-words"
                          >
                            {story.story}
                          </motion.p>
                        ) : (
                          <p className="text-sm text-blue-200 line-clamp-2 break-words">
                            {story.story}
                          </p>
                        )}
                      </AnimatePresence>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStory(story.id)}
                          className="text-blue-300 hover:text-blue-100 h-8 px-2"
                        >
                          {expandedStory === story.id ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              <span className="text-xs">Menos</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              <span className="text-xs">Más</span>
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-300 hover:text-blue-100 h-8 px-2"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span className="text-xs">Inspirador</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}