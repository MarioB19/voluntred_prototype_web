import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, MapPin, Info, Eye, Send, Target } from 'lucide-react'
import { suggestedCompanies } from '@/data/ngo/Collaborations'
import Image from 'next/image'

const CollaborationsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Empresas Sugeridas
        </h3>
        <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300">
          <Search className="mr-2 h-4 w-4" /> Buscar Empresas
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suggestedCompanies.map((company) => (
          <Card key={company.id} className="bg-gray-800 border-blue-500/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={50}
                height={50}
                className="rounded-full bg-white p-1"
              />
              <CardTitle className="text-lg font-semibold text-white">{company.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Building2 className="mr-2 h-4 w-4 text-blue-400" />
                <span>Sector: {company.sector}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="mr-2 h-4 w-4 text-green-400" />
                <span>Ubicación: {company.location}</span>
              </div>
              <div className="flex items-start text-sm text-gray-300">
                <Info className="mr-2 h-4 w-4 text-blue-400 mt-1" />
                <p>{company.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <Target className="mr-2 h-4 w-4 text-green-400" />
                  <span>ODS:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.ods.map((ods, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors duration-300">
                      {ods}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300">
                <Eye className="mr-2 h-4 w-4" />
                Ver Perfil
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300">
                <Send className="mr-2 h-4 w-4" />
                Enviar Propuesta
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CollaborationsPanel