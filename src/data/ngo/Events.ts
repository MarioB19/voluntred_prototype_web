// Interfaces

export interface Location {
  street?: string;
  neighborhood?: string;
  municipality?: string;
  state?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Sponsor {
  name: string;
  image: string;
}

export interface Event {
  id: number;
  title: string;
  category: string;
  location: Location;
  date: Date;
  time: string;
  ong: string;
  ods: string;
  description: string;
  objectives: string[];
  requirements: string[];
  participants: number;
  coordinates: Coordinates;
  sponsors: Sponsor[];
  status: 'draft' | 'published';
}

// Datos de eventos actualizados

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Gran Reforestación Urbana",
    category: "Medio Ambiente",
    location: {
      street: "Av. de la Reforma 123",
      neighborhood: "Centro",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-05-15"),
    time: "08:00",
    ong: "VerdeVida",
    ods: "15. Vida de Ecosistemas Terrestres",
    description:
      "Únete a la mayor reforestación urbana del año. Plantaremos miles de árboles nativos para combatir el cambio climático y mejorar la calidad del aire en nuestra ciudad.",
    objectives: [
      "Plantar 5000 árboles nativos",
      "Educar sobre la importancia de los bosques urbanos",
      "Crear conciencia sobre el cambio climático",
    ],
    requirements: [
      "Ropa cómoda",
      "Zapatos cerrados",
      "Guantes de jardinería",
      "Botella de agua reutilizable",
    ],
    participants: 500,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "EcoFuturo", image: "/empresa.jpg" },
      { name: "AguaPura", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 2,
    title: "Día de Compañía en el Asilo",
    category: "Apoyo a Adultos Mayores",
    location: {
      street: "Calle de la Amistad 456",
      neighborhood: "La Esperanza",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-06-01"),
    time: "10:00",
    ong: "AbuelosContentos",
    ods: "3. Salud y Bienestar",
    description:
      "Pasa un día especial con los residentes del asilo. Actividades incluyen lectura, juegos de mesa, y un concierto en vivo para alegrar sus corazones.",
    objectives: [
      "Brindar compañía a 100 adultos mayores",
      "Organizar actividades recreativas",
      "Mejorar la calidad de vida de los residentes",
    ],
    requirements: [
      "Paciencia y empatía",
      "Habilidad para escuchar",
      "Juegos de mesa (opcional)",
      "Instrumentos musicales (opcional)",
    ],
    participants: 50,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "FarmaciaSalud", image: "/empresa.jpg" },
      { name: "CuidadoIntegral", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 3,
    title: "Rescate y Cuidado de Perros Callejeros",
    category: "Bienestar Animal",
    location: {
      street: "Av. Libertad 789",
      neighborhood: "San Miguel",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-07-22"),
    time: "09:00",
    ong: "AmigosPerruno",
    ods: "15. Vida de Ecosistemas Terrestres",
    description:
      "Ayuda a rescatar y cuidar perros callejeros. Incluye jornada de baño, desparasitación, y preparación para adopción.",
    objectives: [
      "Rescatar y atender a 50 perros",
      "Realizar 30 esterilizaciones",
      "Lograr 10 adopciones",
    ],
    requirements: [
      "Amor por los animales",
      "Ropa que se pueda ensuciar",
      "Toallas viejas",
      "Comida para perros (opcional)",
    ],
    participants: 100,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "VeterinaMax", image: "/empresa.jpg" },
      { name: "AlimentosPet", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 4,
    title: "Construcción de Viviendas Sociales",
    category: "Desarrollo Comunitario",
    location: {
      street: "Calle Progreso 1011",
      neighborhood: "Nueva Esperanza",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-08-10"),
    time: "07:00",
    ong: "TechoDigno",
    ods: "11. Ciudades y Comunidades Sostenibles",
    description:
      "Participa en la construcción de viviendas para familias de bajos recursos. Juntos podemos proporcionar un hogar seguro y digno.",
    objectives: [
      "Construir 5 casas en un fin de semana",
      "Capacitar a 20 personas en técnicas básicas de construcción",
      "Fortalecer el sentido de comunidad",
    ],
    requirements: [
      "Disposición para trabajo físico",
      "Botas de seguridad",
      "Guantes de trabajo",
      "Protector solar",
    ],
    participants: 200,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "ConstruyeFuturo", image: "/empresa.jpg" },
      { name: "MaterialesXYZ", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 5,
    title: "Feria de Empleo para Personas con Discapacidad",
    category: "Inclusión Laboral",
    location: {
      street: "Av. Convenciones 1213",
      neighborhood: "Centro",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-09-15"),
    time: "10:00",
    ong: "TrabajoParaTodos",
    ods: "8. Trabajo Decente y Crecimiento Económico",
    description:
      "Feria de empleo especializada en conectar a personas con discapacidad con empleadores inclusivos.",
    objectives: [
      "Lograr 100 contrataciones",
      "Capacitar a 50 empresas en inclusión laboral",
      "Ofrecer 20 talleres de preparación laboral",
    ],
    requirements: [
      "CV impreso",
      "Identificación oficial",
      "Certificado de discapacidad (si aplica)",
    ],
    participants: 500,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "InclusionLaboral", image: "/empresa.jpg" },
      { name: "EmpresaAccesible", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 6,
    title: "Limpieza de Ríos y Educación Ambiental",
    category: "Medio Ambiente",
    location: {
      street: "Orilla del Río Ciudad",
      neighborhood: "Río Verde",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-10-05"),
    time: "08:00",
    ong: "AguaLimpia",
    ods: "6. Agua Limpia y Saneamiento",
    description:
      "Jornada de limpieza del río local combinada con talleres de educación ambiental para niños y adultos.",
    objectives: [
      "Recolectar 1 tonelada de residuos",
      "Educar a 200 personas sobre la importancia del agua",
      "Instalar 10 letreros informativos",
    ],
    requirements: [
      "Botas de goma",
      "Guantes resistentes al agua",
      "Ropa que se pueda mojar",
      "Repelente de insectos",
    ],
    participants: 150,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "H2OPura", image: "/empresa.jpg" },
      { name: "EcoEducación", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 7,
    title: "Taller de Arte para Niños en Situación de Calle",
    category: "Arte y Educación",
    location: {
      street: "Calle Arte 1415",
      neighborhood: "Esperanza",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-11-20"),
    time: "14:00",
    ong: "ArteParaTodos",
    ods: "4. Educación de Calidad",
    description:
      "Taller de expresión artística para niños en situación de calle, buscando fomentar su creatividad y autoestima.",
    objectives: [
      "Realizar un mural comunitario",
      "Enseñar 5 técnicas artísticas diferentes",
      "Organizar una exposición con las obras de los niños",
    ],
    requirements: [
      "Materiales de arte (pinturas, pinceles, etc.)",
      "Ropa que se pueda manchar",
      "Paciencia y creatividad",
    ],
    participants: 30,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "PinturasColor", image: "/empresa.jpg" },
      { name: "GaleríaUrbana", image: "/empresa.jpg" },
    ],
    status: "draft",
  },
  {
    id: 8,
    title: "Maratón de Programación por la Educación",
    category: "Tecnología y Educación",
    location: {
      street: "Av. Tecnología 1617",
      neighborhood: "Universitaria",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2024-12-15"),
    time: "09:00",
    ong: "CodePorElFuturo",
    ods: "4. Educación de Calidad",
    description:
      "Desarrolla aplicaciones educativas para escuelas de bajos recursos en este maratón de programación de 24 horas.",
    objectives: [
      "Crear 10 aplicaciones educativas funcionales",
      "Capacitar a 50 profesores en el uso de tecnología",
      "Donar equipos a 5 escuelas",
    ],
    requirements: [
      "Laptop",
      "Conocimientos de programación",
      "Sleeping bag",
      "Compromiso de 24 horas",
    ],
    participants: 100,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "TechEdu", image: "/empresa.jpg" },
      { name: "SoftwareParaTodos", image: "/empresa.jpg" },
    ],
    status: "draft",
  },
  {
    id: 9,
    title: "Huertos Urbanos Comunitarios",
    category: "Agricultura Urbana",
    location: {
      street: "Varias ubicaciones",
      neighborhood: "Diferentes barrios",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2025-02-05"),
    time: "10:00",
    ong: "CultivandoComunidad",
    ods: "2. Hambre Cero",
    description:
      "Crea y mantén huertos urbanos en diferentes barrios para promover la autosuficiencia alimentaria y la comunidad.",
    objectives: [
      "Establecer 20 huertos comunitarios",
      "Capacitar a 200 personas en agricultura urbana",
      "Producir 1 tonelada de alimentos orgánicos",
    ],
    requirements: [
      "Herramientas de jardinería",
      "Semillas (proporcionadas)",
      "Disposición para ensuciarse las manos",
      "Compromiso a largo plazo",
    ],
    participants: 300,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "SemillasOrgánicas", image: "/empresa.jpg" },
      { name: "CompostaCity", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 10,
    title: "Campaña de Salud Visual para Niños",
    category: "Salud",
    location: {
      street: "Calle Educación 1819",
      neighborhood: "Educadores",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2025-03-22"),
    time: "08:00",
    ong: "VistaClara",
    ods: "3. Salud y Bienestar",
    description:
      "Realiza exámenes de vista gratuitos y proporciona lentes a niños de escuelas públicas que lo necesiten.",
    objectives: [
      "Examinar la vista a 1000 niños",
      "Entregar 500 pares de lentes",
      "Educar sobre el cuidado de la salud visual",
    ],
    requirements: [
      "Profesionales de la salud visual",
      "Equipo de optometría portátil",
      "Voluntarios para organización",
    ],
    participants: 50,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "ÓpticaSalud", image: "/empresa.jpg" },
      { name: "FundaciónVisión", image: "/empresa.jpg" },
    ],
    status: "published",
  },
  {
    id: 11,
    title: "Restauración de Espacios Públicos",
    category: "Desarrollo Urbano",
    location: {
      street: "Plaza Central",
      neighborhood: "Centro Histórico",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2025-04-18"),
    time: "07:00",
    ong: "CiudadNuestra",
    ods: "11. Ciudades y Comunidades Sostenibles",
    description:
      "Renueva y embellece espacios públicos deteriorados para mejorar la calidad de vida en la comunidad.",
    objectives: [
      "Restaurar 5 parques",
      "Instalar 20 bancas y 10 juegos infantiles",
      "Plantar 100 árboles y crear 5 jardines comunitarios",
    ],
    requirements: [
      "Herramientas de jardinería y pintura",
      "Ropa de trabajo",
      "Habilidades en carpintería o jardinería (opcional)",
    ],
    participants: 200,
    coordinates: { lat: 19.4326, lng: -99.1332 },
    sponsors: [
      { name: "PinturasBrillo", image: "/empresa.jpg" },
      { name: "MaderasEco", image: "/empresa.jpg" },
    ],
    status: "draft",
  },
  {
    id: 12,
    title: "Alfabetización Digital para Adultos Mayores",
    category: "Educación y Tecnología",
    location: {
      street: "Calle Conexión 2021",
      neighborhood: "La Tecnología",
      municipality: "Ciudad de México",
      state: "CDMX",
    },
    date: new Date("2025-05-10"),
    time: "10:00",
    ong: "ConectadosMX",
    ods: "4. Educación de Calidad",
    description:
      "Enseña habilidades digitales básicas a adultos mayores para reducir la brecha digital y mejorar su calidad de vida.",
    objectives: [
      "Capacitar a 300 adultos mayores",
      "Donar 100 tablets",
      "Crear una red de apoyo tecnológico continuo",
    ],
    requirements: [
      "Conocimientos básicos de informática",
      "Paciencia y habilidades de enseñanza",
      "Dispositivos para prácticas (opcional)",
    ],
    participants: 100,
    coordinates: { lat: 19.4320, lng: -99.1330 },
    sponsors: [
      { name: "TechParaTodos", image: "/empresa.jpg" },
      { name: "ConexiónSenior", image: "/empresa.jpg" },
    ],
    status: "published",
  },
];
