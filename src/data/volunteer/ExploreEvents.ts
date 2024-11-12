export interface Event {
    id: number
    title: string
    date: Date
    time: string
    location: string
    category: string
    ong: string
    ods: string
    description: string
    objectives: string[]
    requirements: string[]
    participants: number
    coordinates: { lat: number; lng: number }
    sponsors: Array<{ name: string; image: string }>
  }
  
  export const mockEvents: Event[] = [
    {
      id: 1,
      title: "Limpieza de Playa",
      date: new Date(2024, 10, 28),
      time: "09:00 AM - 1:00 PM",
      location: "Playa del Carmen",
      category: "Medio Ambiente",
      ong: "OceanClean",
      ods: "14. Vida Submarina",
      description: "Únete a nosotros para limpiar la playa y proteger la vida marina. Esta actividad es crucial para mantener nuestros ecosistemas costeros saludables y libres de contaminación.",
      objectives: ["Recoger 100kg de basura", "Educar sobre el impacto del plástico en los océanos", "Fomentar prácticas sostenibles en la comunidad local"],
      requirements: ["Llevar guantes", "Protector solar", "Botella de agua reutilizable", "Ropa cómoda"],
      participants: 28,
      coordinates: { lat: 20.6296, lng: -87.0739 },
      sponsors: [
        { name: "EcoTech", image: "/empresa.jpg" },
        { name: "GreenFuture", image: "/empresa.jpg" }
      ]
    },
    {
      id: 2,
      title: "Taller de Reciclaje Creativo",
      date: new Date(2024, 10, 29),
      time: "3:00 PM - 6:00 PM",
      location: "Centro Comunitario La Esperanza",
      category: "Educación",
      ong: "EcoArte",
      ods: "12. Producción y Consumo Responsables",
      description: "Aprende a crear arte y objetos útiles a partir de materiales reciclados. Este taller te enseñará técnicas creativas para dar nueva vida a objetos que normalmente descartarías.",
      objectives: ["Crear 5 proyectos por participante", "Reducir el desperdicio doméstico", "Inspirar la creatividad y la conciencia ambiental"],
      requirements: ["Traer materiales reciclables", "Tijeras", "Pegamento", "Imaginación y entusiasmo"],
      participants: 15,
      coordinates: { lat: 19.4326, lng: -99.1332 },
      sponsors: [
        { name: "CreativeRecycle", image: "/empresa.jpg" },
        { name: "ArtEco", image: "/empresa.jpg" }
      ]
    },
    {
      id: 3,
      title: "Maratón de Reforestación",
      date: new Date(2024, 10, 30),
      time: "7:00 AM - 2:00 PM",
      location: "Bosque de Chapultepec",
      category: "Medio Ambiente",
      ong: "Pulmones Verdes",
      ods: "15. Vida de Ecosistemas Terrestres",
      description: "Participa en nuestra maratón de plantación de árboles para celebrar el Día Mundial del Medio Ambiente. Ayúdanos a restaurar y proteger nuestros bosques urbanos.",
      objectives: ["Plantar 1000 árboles nativos", "Educar sobre la importancia de los bosques urbanos", "Fomentar la conexión con la naturaleza"],
      requirements: ["Ropa y calzado adecuados para trabajo de campo", "Guantes de jardinería", "Botella de agua", "Protector solar"],
      participants: 200,
      coordinates: { lat: 19.4204, lng: -99.1925 },
      sponsors: [
        { name: "GreenCity", image: "/empresa.jpg" },
        { name: "EcoFriends", image: "/empresa.jpg" }
      ]
    },
    {
      id: 4,
      title: "Campaña de Donación de Alimentos",
      date: new Date(2024, 10, 27),
      time: "10:00 AM - 4:00 PM",
      location: "Plaza Principal",
      category: "Acción Social",
      ong: "Alimentos para Todos",
      ods: "2. Hambre Cero",
      description: "Ayúdanos a combatir el hambre en nuestra comunidad. Recolectaremos alimentos no perecederos para distribuir a familias necesitadas y bancos de alimentos locales.",
      objectives: ["Recolectar 2 toneladas de alimentos", "Sensibilizar sobre la inseguridad alimentaria", "Fortalecer la red de apoyo comunitario"],
      requirements: ["Donaciones de alimentos no perecederos", "Voluntarios para clasificar y empacar", "Vehículos para transporte (opcional)"],
      participants: 50,
      coordinates: { lat: 19.4326, lng: -99.1332 },
      sponsors: [
        { name: "FoodBank", image: "/empresa.jpg" },
        { name: "CommunityHelpers", image: "/empresa.jpg" }
      ]
    },
    {
      id: 5,
      title: "Hackathon por la Educación",
      date: new Date(2024, 10, 27),
      time: "9:00 AM - 9:00 PM",
      location: "Universidad Tecnológica",
      category: "Tecnología",
      ong: "TechEdu",
      ods: "4. Educación de Calidad",
      description: "Únete a nuestro hackathon de 12 horas para desarrollar soluciones tecnológicas innovadoras que mejoren el acceso y la calidad de la educación en comunidades marginadas.",
      objectives: ["Desarrollar 10 prototipos de aplicaciones educativas", "Conectar desarrolladores con organizaciones educativas", "Fomentar la innovación en EdTech"],
      requirements: ["Laptop", "Conocimientos de programación", "Pasión por la educación y la tecnología"],
      participants: 100,
      coordinates: { lat: 19.4978, lng: -99.1269 },
      sponsors: [
        { name: "TechForGood", image: "/empresa.jpg" },
        { name: "EduInnovate", image: "/empresa.jpg" }
      ]
    }
  ]