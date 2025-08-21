export interface Mission {
  id: string
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: number
  prerequisites: string[]
  rating: number
}

export interface City {
  id: string
  name: string
  missions: Mission[]
  coords: { x: number; y: number }
}

export interface Country {
  id: string
  name: string
  stack: string
  flag: string
  coords: { x: number; y: number }
  description: string
  color: string
  cities: City[]
}

export type DifficultyLevel = Mission['difficulty']

export interface MissionProgress {
  missionId: string
  completed: boolean
  score?: number
  completedAt?: Date
}

export interface UserStats {
  totalMissions: number
  completedMissions: number
  averageScore: number
  visitedCountries: string[]
  currentStreak: number
}