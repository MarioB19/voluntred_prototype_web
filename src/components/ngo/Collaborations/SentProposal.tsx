import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { sentProposals } from '@/data/ngo/Collaborations'
import { Calendar, Building2, DollarSign, FileText, Eye, MessageCircle } from 'lucide-react'

const SentProposals = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Solicitudes Enviadas
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {sentProposals.map((proposal) => (
          <Card key={proposal.id} className="bg-gray-800 border-blue-500/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-blue-400" />
                  {proposal.company}
                </CardTitle>
                <Badge 
                  variant={
                    proposal.status === "Enviada" ? "default" :
                    proposal.status === "En negociación" ? "secondary" :
                    proposal.status === "Aceptada" ? "outline" : "destructive"
                  }
                  className={`
                    ${proposal.status === "Enviada" ? "bg-blue-500/20 text-blue-400 border-blue-500" : ""}
                    ${proposal.status === "En negociación" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500" : ""}
                    ${proposal.status === "Aceptada" ? "bg-green-500/20 text-green-400 border-green-500" : ""}
                    ${proposal.status === "Rechazada" ? "bg-red-500/20 text-red-400 border-red-500" : ""}
                  `}
                >
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                <span>Fecha de envío: {proposal.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <FileText className="mr-2 h-4 w-4 text-green-400" />
                <span>Evento: {proposal.event}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <DollarSign className="mr-2 h-4 w-4 text-yellow-400" />
                <span>Monto/Valor: {proposal.amount}</span>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-1">Descripción:</h4>
                <p className="text-sm text-white">{proposal.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button variant="outline" size="sm" className="flex-1 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300">
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalles
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white transition-colors duration-300">
                <MessageCircle className="mr-2 h-4 w-4" />
                Seguimiento
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SentProposals