"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Calendar, User, Menu, Bell, X, LogOut, FileText, BarChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import NGODashboard from "@/components/ngo/Dashboard"
import NGOEventManagement from "@/components/ngo/EventManagment"
import NGOCollaborations from "@/components/ngo/Collaborations"
import NGOImpact from "@/components/ngo/Impact"
import NGOProfile from "@/components/ngo/Profile"

import { useRouter, usePathname } from 'next/navigation'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

type PageKey = 'dashboard' | 'events' | 'collaborations' | 'impact' | 'profile'

export default function NGOHomePage() {
  const [activePage, setActivePage] = useState<PageKey>('dashboard')
  const [isScrolled, setIsScrolled] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const pageMap: Record<string, PageKey> = {
      '/ngo/profile': 'profile',
      '/ngo': 'dashboard',
      '/ngo/events': 'events',
      '/ngo/collaborations': 'collaborations',
      '/ngo/impact': 'impact',
    }
    setActivePage(pageMap[pathname] || 'dashboard')
  }, [pathname])

  const pages: Record<PageKey, JSX.Element> = {
    dashboard: <NGODashboard />,
    events: <NGOEventManagement />,
    collaborations: <NGOCollaborations />,
    impact: <NGOImpact />,
    profile: <NGOProfile />,
  }

  const navItems = [
    { id: "dashboard", icon: Home, label: "Inicio" },
    { id: "events", icon: Calendar, label: "Eventos" },
    { id: "collaborations", icon: Users, label: "Colaboraciones" },
    { id: "impact", icon: BarChart, label: "Impacto" },
    { id: "profile", icon: User, label: "Perfil" },
  ]

  const handleNavigation = (page: PageKey) => {
    setActivePage(page)
  }

  const handleLogout = async () => {
    // Implement logout logic here
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-md' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-green-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gray-800 border-r border-gray-700">
                <nav className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-green-400">Menú ONG</h2>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:text-green-400">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <ScrollArea className="flex-grow">
                    <div className="py-4 space-y-4">
                      {navItems.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="w-full justify-start text-left text-white hover:text-green-400 hover:bg-gray-700"
                          onClick={() => handleNavigation(item.id as PageKey)}
                        >
                          <item.icon className="mr-2 h-5 w-5" />
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Volunt</span>
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">RED</span>
              <span className="text-white"> ONG</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-green-400"
            >
              <FileText className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-white hover:text-green-400">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-green-400 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@ngo" />
                    <AvatarFallback>ONG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border border-gray-700" align="end" forceMount>
                <DropdownMenuItem
                  onClick={() => handleNavigation('profile')}
                  className="text-white hover:text-green-400 hover:bg-gray-700 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil ONG</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-white hover:text-green-400 hover:bg-gray-700 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            {pages[activePage]}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="sticky bottom-0 bg-gray-800 border-t border-gray-700 shadow-lg">
        <div className="container mx-auto px-4">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.id} className="flex-1">
                <Button
                  variant="ghost"
                  className={`w-full py-3 px-1 rounded-none ${
                    activePage === item.id
                      ? "text-green-400 border-t-2 border-green-400"
                      : "text-white hover:text-green-400"
                  }`}
                  onClick={() => handleNavigation(item.id as PageKey)}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </motion.div>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}