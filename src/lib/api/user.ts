// User Management Service Client
// 사용자 프로필, 통계, 성취도 관리

import { API_CONFIG, API_ENDPOINTS, getApiUrl, buildUrl } from './config'
import { apiClient } from './auth'

// User DTOs
export interface UserProfile {
  id: number
  email: string
  name: string
  avatarUrl?: string
  role: 'USER' | 'ADMIN'
  bio?: string
  location?: string
  timezone?: string
  language: 'ko' | 'en'
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileRequest {
  name?: string
  bio?: string
  location?: string
  timezone?: string
  language?: 'ko' | 'en'
}

export interface UserStats {
  id: number
  userId: number
  totalMissions: number
  completedMissions: number
  failedMissions: number
  inProgressMissions: number
  totalPlayTime: number // in minutes
  averageScore: number
  totalStamps: number
  totalPoints: number
  currentStreak: number
  maxStreak: number
  visitedCountries: string[]
  completedTechnologies: string[]
  rank: {
    level: number
    title: string
    nextLevelRequirement: number
    progress: number
  }
  lastActiveDate: string
  createdAt: string
  updatedAt: string
}

export interface MissionProgress {
  id: number
  userId: number
  missionId: number
  missionTitle: string
  missionType: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  progress: number // 0-100
  score?: number
  startedAt?: string
  completedAt?: string
  lastAccessedAt: string
  attempts: number
  bestScore?: number
  timeSpent: number // in minutes
}

export interface Achievement {
  id: number
  userId: number
  achievementType: string
  title: string
  description: string
  iconUrl?: string
  category: 'MISSION' | 'STREAK' | 'SCORE' | 'SPECIAL'
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
  progress: number // 0-100
  maxProgress: number
  isUnlocked: boolean
  unlockedAt?: string
  createdAt: string
}

export interface UserPreferences {
  id: number
  userId: number
  language: 'ko' | 'en'
  timezone: string
  emailNotifications: boolean
  pushNotifications: boolean
  soundEnabled: boolean
  darkMode: boolean
  autoStartMissions: boolean
  showTips: boolean
  createdAt: string
  updatedAt: string
}

// Upload response
export interface UploadResponse {
  url: string
  filename: string
  size: number
}

// User Management API
export const userApi = {
  // Get user profile
  async getProfile(): Promise<UserProfile> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.PROFILE)
    return apiClient.get<UserProfile>(url)
  },

  // Update user profile
  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.UPDATE_PROFILE)
    return apiClient.put<UserProfile>(url, data)
  },

  // Upload avatar image
  async uploadAvatar(file: File): Promise<UploadResponse> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.UPLOAD_AVATAR)
    
    const formData = new FormData()
    formData.append('avatar', file)

    // Custom request for file upload
    const token = localStorage.getItem('devtrip_access_token')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || `Upload failed: ${response.status}`)
    }

    return response.json()
  },

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.USER_STATS)
    return apiClient.get<UserStats>(url)
  },

  // Get mission progress
  async getMissionProgress(missionId?: number): Promise<MissionProgress[]> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.MISSION_PROGRESS)
    const finalUrl = missionId ? `${url}?missionId=${missionId}` : url
    return apiClient.get<MissionProgress[]>(finalUrl)
  },

  // Get user achievements
  async getAchievements(category?: Achievement['category']): Promise<Achievement[]> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.ACHIEVEMENTS)
    const finalUrl = category ? `${url}?category=${category}` : url
    return apiClient.get<Achievement[]>(finalUrl)
  },

  // Get user preferences
  async getPreferences(): Promise<UserPreferences> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.PREFERENCES)
    return apiClient.get<UserPreferences>(url)
  },

  // Update user preferences
  async updatePreferences(data: Partial<Omit<UserPreferences, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<UserPreferences> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.PREFERENCES)
    return apiClient.put<UserPreferences>(url, data)
  },

  // Update mission progress
  async updateMissionProgress(
    missionId: number, 
    progress: number, 
    status?: MissionProgress['status']
  ): Promise<MissionProgress> {
    const url = getApiUrl('USER_SERVICE', API_ENDPOINTS.USER.MISSION_PROGRESS)
    return apiClient.put<MissionProgress>(url, {
      missionId,
      progress,
      status,
    })
  }
}