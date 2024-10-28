'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Calendar, Users, Zap } from "lucide-react"

export default function NGODashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard ONG</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+2 este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voluntarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% desde último mes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Voluntariado</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">+2,345 este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ODS Impactados</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">De 17 ODS totales</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            Crear Evento
          </Button>
          <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
            Ver Chats
          </Button>
          <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
            Gestionar Patrocinios
          </Button>
          <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
            Ver Impacto
          </Button>
        </div>
      </div>
    </div>
  )
}