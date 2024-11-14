"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Calendar, User, Bell, LogOut, BarChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import NGODashboard from "@/components/ngo/Dashboard"
import NGOEventManagement from "@/components/ngo/Events/NGOEventMagment"
import NGOCollaborations from "@/components/ngo/Collaborations/NGOCollaborations"
import NGOImpact from "@/components/ngo/Impact/ImpactAndStatics"
import NGOProfile from "@/components/ngo/Profile/NGOProfile"

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
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Volunt</span>
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">RED</span>
              <span className="text-white"> ONG</span>
            </motion.h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-green-400 relative"
              >
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

      <motion.nav 
        className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent border-t border-green-500/20 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="container mx-auto px-2 py-1">
          <ul className="flex justify-around items-center">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <Button
                  variant="ghost"
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                    activePage === item.id
                      ? "text-green-400 bg-gray-800/50 shadow-inner"
                      : "text-white hover:text-green-400 hover:bg-gray-800/30"
                  }`}
                  onClick={() => handleNavigation(item.id as PageKey)}
                  aria-label={item.label}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                  </motion.div>
                </Button>
                {activePage === item.id && (
                  <motion.div
                    className="absolute -top-1 left-1/2 w-1 h-1 bg-green-400 rounded-full"
                    layoutId="activeTab"
                    initial={{ x: "-50%" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </div>
  )
}