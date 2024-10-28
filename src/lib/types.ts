// types.ts

export interface Event {
    id: number
    title: string
    category: string
    location: string
    date: Date
    time: string
    ong: string
    ods: string
    description: string
    objectives: string[]
    requirements: string[]
    participants: number
    coordinates: { lat: number; lng: number }
    sponsors: Array<{ name: string; image: string }>
  }
  