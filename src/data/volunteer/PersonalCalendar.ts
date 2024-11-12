import { Event } from "@/lib/types"

export const scheduledEvents: Event[] = [
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
  },
  {
    id: 6,
    title: "Taller de Huertos Urbanos",
    date: new Date(2024, 11, 5),
    time: "10:00 AM - 1:00 PM",
    location: "Parque Comunitario El Jardín",
    category: "Medio Ambiente",
    ong: "VerdeUrbano",
    ods: "11. Ciudades y Comunidades Sostenibles",
    description: "Aprende a crear y mantener tu propio huerto urbano. Descubre cómo cultivar alimentos frescos y orgánicos en espacios reducidos, contribuyendo a la sostenibilidad de tu comunidad.",
    objectives: ["Crear 20 huertos urbanos", "Enseñar técnicas de cultivo orgánico", "Promover la autosuficiencia alimentaria"],
    requirements: ["Recipientes reciclados", "Semillas (proporcionadas)", "Ropa cómoda", "Entusiasmo por la jardinería"],
    participants: 30,
    coordinates: { lat: 19.4128, lng: -99.1339 },
    sponsors: [
      { name: "SeedLife", image: "/empresa.jpg" },
      { name: "GreenThumb", image: "/empresa.jpg" }
    ]
  },
  {
    id: 7,
    title: "Feria de Empleo Inclusivo",
    date: new Date(2024, 11, 10),
    time: "11:00 AM - 5:00 PM",
    location: "Centro de Convenciones",
    category: "Inclusión Social",
    ong: "Oportunidades para Todos",
    ods: "8. Trabajo Decente y Crecimiento Económico",
    description: "Feria de empleo enfocada en crear oportunidades laborales para personas con discapacidad y grupos vulnerables. Conectamos talento diverso con empresas comprometidas con la inclusión.",
    objectives: ["Facilitar 100 entrevistas de trabajo", "Promover la diversidad en el ámbito laboral", "Ofrecer talleres de preparación laboral"],
    requirements: ["Curriculum Vitae", "Identificación oficial", "Vestimenta formal"],
    participants: 500,
    coordinates: { lat: 19.4308, lng: -99.1453 },
    sponsors: [
      { name: "InclusiveJobs", image: "/empresa.jpg" },
      { name: "DiversityWorks", image: "/empresa.jpg" }
    ]
  }
]

export const pastEvents = [
  { id: 1, title: "Donación de Alimentos", date: new Date(2024, 3, 10), rating: 5, impact: "2000 personas alimentadas" },
  { id: 2, title: "Construcción de Viviendas", date: new Date(2024, 2, 20), rating: 4, impact: "3 casas construidas" },
  { id: 3, title: "Limpieza de Río", date: new Date(2024, 1, 5), rating: 5, impact: "500 kg de basura recolectada" },
  { id: 4, title: "Taller de Alfabetización Digital", date: new Date(2024, 4, 15), rating: 4, impact: "50 adultos mayores capacitados" },
  { id: 5, title: "Campaña de Vacunación", date: new Date(2024, 5, 1), rating: 5, impact: "1000 mascotas vacunadas" },
  { id: 6, title: "Reforestación Urbana", date: new Date(2024, 6, 12), rating: 4, impact: "200 árboles plantados" },
  { id: 7, title: "Feria de Ciencias Comunitaria", date: new Date(2024, 7, 8), rating: 5, impact: "500 niños participantes" }
]