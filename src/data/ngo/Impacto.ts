export interface ImpactData {
    totalHours: number
    volunteers: number
    beneficiaries: number
    registeredPeople: number
    odsImpact: Array<{ name: string; value: number }>
    monthlyData: Array<{
      month: string
      hours: number
      volunteers: number
      beneficiaries: number
    }>
    yearlyData: Array<{
      year: number
      hours: number
      volunteers: number
      beneficiaries: number
    }>
  }
  
  export interface Event {
    id: number
    name: string
  }
  
  export interface EventStatisticsData {
    attendance: { expected: number; actual: number }
    ratings: Array<{ name: string; value: number }>
    comments: Array<{ id: number; author: string; comment: string }>
  }
  
  export const impactData: ImpactData = {
    totalHours: 25000,
    volunteers: 2500,
    beneficiaries: 50000,
    registeredPeople: 3000,
    odsImpact: [
      { name: 'ODS 1', value: 30 },
      { name: 'ODS 3', value: 40 },
      { name: 'ODS 4', value: 20 },
      { name: 'ODS 13', value: 10 },
    ],
    monthlyData: [
      { month: 'Ene', hours: 2000, volunteers: 200, beneficiaries: 4000 },
      { month: 'Feb', hours: 2200, volunteers: 220, beneficiaries: 4400 },
      { month: 'Mar', hours: 2100, volunteers: 210, beneficiaries: 4200 },
      { month: 'Abr', hours: 2300, volunteers: 230, beneficiaries: 4600 },
      { month: 'May', hours: 2400, volunteers: 240, beneficiaries: 4800 },
      { month: 'Jun', hours: 2600, volunteers: 260, beneficiaries: 5200 },
    ],
    yearlyData: [
      { year: 2020, hours: 20000, volunteers: 2000, beneficiaries: 40000 },
      { year: 2021, hours: 22000, volunteers: 2200, beneficiaries: 44000 },
      { year: 2022, hours: 24000, volunteers: 2400, beneficiaries: 48000 },
      { year: 2023, hours: 25000, volunteers: 2500, beneficiaries: 50000 },
    ],
  }
  
  export const eventsList: Event[] = [
    { id: 1, name: 'Hackathon Ambiental 2024' },
    { id: 2, name: 'Feria de Energías Renovables' },
    { id: 3, name: 'Día Mundial del Agua' },
  ]
  
  export const eventStatisticsData: EventStatisticsData = {
    attendance: { expected: 100, actual: 85 },
    ratings: [
      { name: '5 estrellas', value: 30 },
      { name: '4 estrellas', value: 40 },
      { name: '3 estrellas', value: 20 },
      { name: '2 estrellas', value: 8 },
      { name: '1 estrella', value: 2 },
    ],
    comments: [
      { id: 1, author: 'Juan Pérez', comment: 'Excelente organización y muy buen ambiente.' },
      { id: 2, author: 'María García', comment: 'Me encantó la experiencia, aprendí mucho.' },
      { id: 3, author: 'Carlos Rodríguez', comment: 'Buena iniciativa, pero faltó un poco más de tiempo para las actividades.' },
    ],
  }