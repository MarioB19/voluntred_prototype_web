export interface Experience {
    id: number;
    userId: number;
    username: string;
    avatar: string;
    content: string;
    image: string;
    likes: number;
    comments: number;
    shares: number;
    tags: string[];
    createdAt: string;
  }
  
  export interface Chat {
    id: number;
    eventId: number;
    eventName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
  }
  
  export interface Community {
    id: number;
    name: string;
    description: string;
    members: number;
    tags: string[];
  }
  
  export const experiences: Experience[] = [
    {
      id: 1,
      userId: 101,
      username: "MariaVoluntaria",
      avatar: "/avatars/maria.jpg",
      content: "¡Increíble jornada de limpieza en la playa de Los Cristianos! Recogimos más de 100 kg de plástico. Juntos podemos hacer la diferencia. 🌊♻️",
      image: "/experiencia1.jpg",
      likes: 89,
      comments: 12,
      shares: 5,
      tags: ["LimpiezaPlayas", "ODS14", "VoluntariadoTenerife"],
      createdAt: "2023-07-15T14:30:00Z"
    },
    {
      id: 2,
      userId: 102,
      username: "CarlosEcoActivista",
      avatar: "/avatars/carlos.jpg",
      content: "Hoy plantamos 50 árboles en el Parque Nacional del Teide. Cada pequeña acción cuenta en la lucha contra el cambio climático. 🌳🌿",
      image: "/experiencia2.jpg",
      likes: 156,
      comments: 23,
      shares: 18,
      tags: ["ReforestaciónCanarias", "ODS13", "AcciónClimática"],
      createdAt: "2023-07-14T10:15:00Z"
    },
    {
      id: 3,
      userId: 103,
      username: "LauraEducadora",
      avatar: "/avatars/laura.jpg",
      content: "Taller de reciclaje creativo con niños en Santa Cruz. ¡Es increíble ver cómo la educación ambiental puede ser tan divertida! 🎨♻️",
      image: "/experiencia3.jpg",
      likes: 72,
      comments: 8,
      shares: 3,
      tags: ["EducaciónAmbiental", "ODS12", "ReciclajeCreativo"],
      createdAt: "2023-07-13T16:45:00Z"
    }
  ];
  
  export const chats: Chat[] = [
    {
      id: 1,
      eventId: 201,
      eventName: "Limpieza Playa de Las Teresitas",
      lastMessage: "¿Alguien trae bolsas extra?",
      lastMessageTime: "2023-07-15T18:30:00Z",
      unreadCount: 3
    },
    {
      id: 2,
      eventId: 202,
      eventName: "Reforestación Anaga",
      lastMessage: "Recuerden traer agua y protector solar",
      lastMessageTime: "2023-07-14T20:15:00Z",
      unreadCount: 1
    },
    {
      id: 3,
      eventId: 203,
      eventName: "Taller Reciclaje en La Laguna",
      lastMessage: "¿Podemos usar cartones de leche?",
      lastMessageTime: "2023-07-13T12:00:00Z",
      unreadCount: 0
    }
  ];
  
  export const communities: Community[] = [
    {
      id: 1,
      name: "EcoTenerife",
      description: "Grupo dedicado a la conservación y protección del medio ambiente en Tenerife.",
      members: 1250,
      tags: ["MedioAmbiente", "Sostenibilidad", "Tenerife"]
    },
    {
      id: 2,
      name: "Jóvenes por el Clima Canarias",
      description: "Movimiento juvenil canario comprometido con la acción climática y el futuro sostenible de las islas.",
      members: 890,
      tags: ["CambioClimático", "Juventud", "Canarias"]
    },
    {
      id: 3,
      name: "Protectores del Mar",
      description: "Comunidad enfocada en la conservación de los ecosistemas marinos de las Islas Canarias.",
      members: 675,
      tags: ["OcéanoLimpio", "BiodiversidadMarina", "Canarias"]
    },
    {
      id: 4,
      name: "Huertos Urbanos Santa Cruz",
      description: "Red de huertos urbanos comunitarios en Santa Cruz de Tenerife.",
      members: 320,
      tags: ["AgriculturaUrbana", "SoberaníaAlimentaria", "SantaCruz"]
    }
  ];