import { StaticImageData } from 'next/image'

export interface NGOProfile {
  name: string
  slogan: string
  description: string
  logo: string | StaticImageData
  alignedODS: string[]
  events: {
    upcoming: Event[]
    past: Event[]
  }
  sponsors: Sponsor[]
  gallery: string[]
  contactInfo: ContactInfo
  socialMedia: SocialMedia
  documents: Document[]
}

interface Event {
  title: string
  date: string
  time: string
  location: string
  volunteers: number
}

interface Sponsor {
  name: string
  logo: string | StaticImageData
}

interface ContactInfo {
  address: string
  phone: string
  email: string
  website: string
}

interface SocialMedia {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
}

interface Document {
  name: string
  url: string
}

export const ngoProfileData: NGOProfile = {
  name: "ONG Ejemplo",
  slogan: "Trabajando por un mundo mejor",
  description: "Somos una organización dedicada a mejorar la calidad de vida de las comunidades más vulnerables a través de proyectos sostenibles y educación.",
  logo: "/logo_ong.png",
  alignedODS: ['1. Fin de la Pobreza', '4. Educación de Calidad', '13. Acción por el Clima'],
  events: {
    upcoming: [
      { title: "Evento Próximo 1", date: "15 de Mayo, 2024", time: "10:00 AM", location: "Parque Central", volunteers: 50 },
      { title: "Evento Próximo 2", date: "20 de Mayo, 2024", time: "2:00 PM", location: "Plaza Principal", volunteers: 30 },
      { title: "Evento Próximo 3", date: "1 de Junio, 2024", time: "9:00 AM", location: "Centro Comunitario", volunteers: 40 },
    ],
    past: [
      { title: "Evento Pasado 1", date: "15 de Abril, 2024", time: "11:00 AM", location: "Escuela Local", volunteers: 45 },
      { title: "Evento Pasado 2", date: "1 de Abril, 2024", time: "3:00 PM", location: "Playa Municipal", volunteers: 60 },
      { title: "Evento Pasado 3", date: "15 de Marzo, 2024", time: "10:00 AM", location: "Parque Natural", volunteers: 35 },
    ]
  },
  sponsors: [
    { name: "Patrocinador 1", logo: "/empresa.jpg" },
    { name: "Patrocinador 2", logo: "/empresa.jpg" },
    { name: "Patrocinador 3", logo: "/empresa.jpg" },
    { name: "Patrocinador 4", logo: "/empresa.jpg" },
  ],
  gallery: ["/experiencia1.jpg", "/experiencia2.jpg", "/experiencia3.jpg", "/experiencia4.jpg", "/experiencia5.jpg", "/experiencia6.jpg"],

  contactInfo: {
    address: "Calle Principal 123, Ciudad",
    phone: "+1234567890",
    email: "contacto@ongejemplo.org",
    website: "https://www.ongejemplo.org"
  },
  socialMedia: {
    facebook: "https://facebook.com/ongejemplo",
    twitter: "https://twitter.com/ongejemplo",
    instagram: "https://instagram.com/ongejemplo",
    linkedin: "https://linkedin.com/company/ongejemplo"
  },
  documents: [
    { name: "Documento 1.pdf", url: "#" },
    { name: "Documento 2.pdf", url: "#" },
    { name: "Documento 3.pdf", url: "#" },
  ]
}