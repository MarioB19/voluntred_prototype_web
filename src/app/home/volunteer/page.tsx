"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Calendar, User, Menu, Bell, X, LogOut, Network, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import Dashboard from "@/components/volunteer/Dashboard/Dashboard";
import ExploreEvents from "@/components/volunteer/ExploreEvents/ExploreEvents";
import PersonalCalendar from "@/components/volunteer/PersonalCalendar/PersonalCalendar";
import Profile from "@/components/volunteer/Profile";
import Social from "@/components/volunteer/Social";
import Reports from "@/components/volunteer/Reports";

import { useRouter, usePathname } from 'next/navigation';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

type PageKey = 'dashboard' | 'explore' | 'calendar' | 'social' | 'profile' | 'reports';

export default function VolunteerHomePage() {
  const [activePage, setActivePage] = useState<PageKey>('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === '/profile') {
      setActivePage('profile');
    } else if (pathname === '/') {
      setActivePage('dashboard');
    } else if (pathname === '/explore') {
      setActivePage('explore');
    } else if (pathname === '/calendar') {
      setActivePage('calendar');
    } else if (pathname === '/social') {
      setActivePage('social');
    } else if (pathname === '/reports') {
      setActivePage('reports');
    }
  }, [pathname]);

  const pages: Record<PageKey, JSX.Element> = {
    dashboard: <Dashboard />,
    explore: <ExploreEvents />,
    calendar: <PersonalCalendar />,
    social: <Social />,
    profile: <Profile />,
    reports: <Reports />,
  };

  const navItems = [
    { id: "dashboard", icon: Home, label: "Inicio" },
    { id: "explore", icon: Search, label: "Explorar" },
    { id: "calendar", icon: Calendar, label: "Calendario" },
    { id: "social", icon: Network, label: "Social" },
    { id: "profile", icon: User, label: "Perfil" },
  ];

  const handleProfileClick = () => {
    setActivePage("profile");
  };

  const handleLogout = async () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-md' : 'bg-black'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-green-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gray-900 border-r border-blue-500">
                <nav className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-blue-500">
                    <h2 className="text-lg font-semibold text-green-400">Menú</h2>
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
                          className="w-full justify-start text-left text-white hover:text-green-400 hover:bg-blue-900"
                          onClick={() => setActivePage(item.id as PageKey)}
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
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-green-400"
              onClick={() => setActivePage("reports")}
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
                    <AvatarImage src="/avatar.png" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border border-blue-500" align="end" forceMount>
                <DropdownMenuItem
                  onClick={handleProfileClick}
                  className="text-white hover:text-green-400 hover:bg-blue-900 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-white hover:text-green-400 hover:bg-blue-900 cursor-pointer"
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

      <nav className="sticky bottom-0 bg-gray-900 border-t border-blue-500 shadow-lg">
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
                  onClick={() => setActivePage(item.id as PageKey)}
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
  );
}
