export const suggestedCompanies = [
    { 
      id: 1, 
      name: "EcoTech Solutions", 
      sector: "Tecnología", 
      location: "Ciudad de México", 
      ods: ["9. Industria, Innovación e Infraestructura", "13. Acción por el Clima"],
      description: "Empresa líder en soluciones tecnológicas para la sostenibilidad.",
      logo: "/empresa.jpg"
    },
    { 
      id: 2, 
      name: "GreenEnergy Co.", 
      sector: "Energía", 
      location: "Monterrey", 
      ods: ["7. Energía Asequible y No Contaminante", "11. Ciudades y Comunidades Sostenibles"],
      description: "Pioneros en energías renovables y soluciones energéticas limpias.",
      logo: "/empresa.jpg"
    },
    { 
      id: 3, 
      name: "AquaPure", 
      sector: "Agua y Saneamiento", 
      location: "Guadalajara", 
      ods: ["6. Agua Limpia y Saneamiento", "3. Salud y Bienestar"],
      description: "Especialistas en tratamiento y purificación de agua.",
      logo: "/empresa.jpg"
    },
  ]
  
  export const sentProposals = [
    { 
      id: 1, 
      company: "EcoTech Solutions", 
      event: "Hackathon Ambiental 2024", 
      status: "Enviada", 
      date: "2024-03-15",
      description: "Propuesta para patrocinar el evento principal con apoyo tecnológico y financiero.",
      amount: "$10,000"
    },
    { 
      id: 2, 
      company: "GreenEnergy Co.", 
      event: "Feria de Energías Renovables", 
      status: "En negociación", 
      date: "2024-02-28",
      description: "Colaboración para montar un stand informativo y realizar demostraciones de energía solar.",
      amount: "$5,000 + Equipamiento"
    },
    { 
      id: 3, 
      company: "AquaPure", 
      event: "Día Mundial del Agua", 
      status: "Aceptada", 
      date: "2024-01-20",
      description: "Donación de sistemas de purificación de agua para comunidades necesitadas.",
      amount: "5 sistemas de purificación (valor $15,000)"
    },
  ]
  
  export const receivedProposals = [
    { 
      id: 1, 
      company: "BioFarm", 
      event: "Mercado Orgánico Comunitario", 
      status: "Pendiente", 
      date: "2024-03-20",
      description: "Propuesta para organizar un mercado de productos orgánicos y talleres de agricultura sustentable.",
      requestedSupport: "Logística y difusión"
    },
    { 
      id: 2, 
      company: "EduTech", 
      event: "Taller de Programación para Jóvenes", 
      status: "Aceptada", 
      date: "2024-03-05",
      description: "Serie de talleres gratuitos de programación para jóvenes de comunidades desfavorecidas.",
      requestedSupport: "Espacio y equipamiento informático"
    },
  ]
  
  export const activeSponsors = [
    { 
      id: 1, 
      company: "EcoTech Solutions", 
      event: "Hackathon Ambiental 2024", 
      type: "Financiero", 
      amount: "$5000", 
      benefits: ["Logo en materiales", "Stand en evento", "Menciones en RRSS"],
      progress: 65,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    },
    { 
      id: 2, 
      company: "AquaPure", 
      event: "Día Mundial del Agua", 
      type: "En especie", 
      amount: "1000 botellas reutilizables", 
      benefits: ["Logo en botellas", "Presentación en evento"],
      progress: 80,
      startDate: "2024-03-01",
      endDate: "2024-03-31"
    },
  ]
  
  export const eventOptions = [
    { value: "hackathon", label: "Hackathon Ambiental 2024" },
    { value: "feria", label: "Feria de Energías Renovables" },
    { value: "dia-agua", label: "Día Mundial del Agua" },
    { value: "reforestacion", label: "Campaña de Reforestación 2024" },
    { value: "reciclaje", label: "Semana del Reciclaje" }
  ]
  
  export const sponsorshipTypes = [
    { value: "financial", label: "Financiero" },
    { value: "in-kind", label: "En especie" },
    { value: "services", label: "Servicios" },
    { value: "mixed", label: "Mixto" }
  ]
  
  export const sponsorBenefits = [
    { id: "visibility", label: "Visibilidad en materiales promocionales" },
    { id: "social-media", label: "Menciones en redes sociales" },
    { id: "volunteering", label: "Oportunidades de voluntariado corporativo" },
    { id: "speaker", label: "Oportunidad de ser ponente en el evento" },
    { id: "networking", label: "Acceso a eventos de networking exclusivos" }
  ]