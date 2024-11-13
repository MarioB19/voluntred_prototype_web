export const dashboardData = {
    stats: [
      { 
        title: "Total Eventos", 
        icon: "Calendar", 
        value: 25, 
        subtext: "+2 este mes", 
        color: "from-blue-500 to-blue-600" 
      },
      { 
        title: "Voluntarios Activos", 
        icon: "Users", 
        value: 1234, 
        subtext: "+15% desde último mes", 
        color: "from-green-500 to-green-600" 
      },
      { 
        title: "Horas Voluntariado", 
        icon: "Clock", 
        value: 5678, 
        subtext: "+2,345 este mes", 
        color: "from-blue-400 to-blue-500" 
      },
      { 
        title: "ODS Impactados", 
        icon: "Target", 
        value: 7, 
        subtext: "De 17 ODS totales", 
        color: "from-green-400 to-green-500" 
      }
    ],
    quickActions: [
      { title: "Crear Evento", icon: "PlusCircle", color: "from-green-500 to-green-600" },
      { title: "Ver Chats", icon: "MessageCircle", color: "from-blue-500 to-blue-600" },
      { title: "Gestionar Patrocinios", icon: "Handshake", color: "from-green-400 to-blue-500" },
      { title: "Ver Impacto", icon: "TrendingUp", color: "from-blue-400 to-green-500" }
    ],
    recentEvents: [
      { name: "Limpieza de Playa", date: "2023-07-15", participants: 50, hours: 150 },
      { name: "Taller de Reciclaje", date: "2023-07-10", participants: 30, hours: 90 },
      { name: "Reforestación Urbana", date: "2023-07-05", participants: 40, hours: 120 }
    ],
    upcomingEvents: [
      { name: "Maratón Solidario", date: "2023-07-25", registeredParticipants: 100 },
      { name: "Campaña de Donación", date: "2023-07-30", registeredParticipants: 75 },
      { name: "Taller de Educación Ambiental", date: "2023-08-05", registeredParticipants: 40 }
    ],
    topVolunteers: [
      { name: "Ana García", hours: 120, events: 10 },
      { name: "Carlos Rodríguez", hours: 100, events: 8 },
      { name: "María López", hours: 95, events: 9 }
    ]
  }