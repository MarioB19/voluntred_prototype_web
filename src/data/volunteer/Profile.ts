

import { Clock, Users, TreeDeciduous, Heart } from "lucide-react"
import { LucideIcon } from "lucide-react"

export const userData = {
    name: "Nombre Usuario",
    username: "@username",
    bio: "Apasionado por el medio ambiente y el cambio social. Siempre buscando nuevas formas de hacer un impacto positivo en mi comunidad.",
    skills: ["Medio Ambiente", "Educación", "Desarrollo Comunitario"],
    avatar: "/placeholder.svg?height=128&width=128",
    socialMedia: {
      instagram: "https://instagram.com/username",
      facebook: "https://facebook.com/username",
      linkedin: "https://linkedin.com/in/username"
    }
}
  




export interface ImpactItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const impactData: ImpactItem[] = [
  { value: "120", label: "Horas Voluntarias", icon: Clock },
  { value: "15", label: "Proyectos Completados", icon: Users },
  { value: "500", label: "Árboles Plantados", icon: TreeDeciduous },
  { value: "1000+", label: "Vidas Impactadas", icon: Heart },
]

  export const experiencesData = [
    { 
      id: 1, 
      title: "Limpieza de Playa", 
      date: "2024-05-15", 
      content: "Increíble experiencia limpiando la playa. ¡Recolectamos más de 100kg de basura!",
      tags: ["Medio Ambiente", "Limpieza", "Playa"]
    },
    { 
      id: 2, 
      title: "Taller de Reciclaje", 
      date: "2024-04-22", 
      content: "Aprendí técnicas innovadoras para reciclar y reutilizar materiales. Muy enriquecedor.",
      tags: ["Educación", "Reciclaje", "Sostenibilidad"]
    },
    { 
      id: 3, 
      title: "Maratón de Reforestación", 
      date: "2024-06-05", 
      content: "Plantamos más de 200 árboles en un día. Un paso más hacia un futuro más verde.",
      tags: ["Medio Ambiente", "Reforestación", "Naturaleza"]
    },
  ]
  
  
  export const communitiesData = [
    { id: 1, name: "Eco Guerreros", members: 1500, role: "Miembro Activo" },
    { id: 2, name: "Educadores por el Cambio", members: 800, role: "Líder de Proyecto" },
    { id: 3, name: "Rescate Animal", members: 2000, role: "Colaborador" },
  ]
  
  export interface PrivacySettings {
    showEmail: boolean;
    showBio: boolean;
    showSkills: boolean;
  }
  
  export interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    eventReminders: boolean;
  }
  
  export const defaultPrivacySettings: PrivacySettings = {
    showEmail: false,
    showBio: true,
    showSkills: true
  }
  
  export const defaultNotificationSettings: NotificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true
  }
