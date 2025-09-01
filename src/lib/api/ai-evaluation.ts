// AI Evaluation Service Client
// AI 기반 미션 평가, 명령어 분석, 성과 통계

import { API_CONFIG, API_ENDPOINTS, getApiUrl, buildUrl } from './config'
import { apiClient } from './auth'
import type { 
  AIEvaluation, 
  EvaluationSummary, 
  CommandAnalysis, 
  UserEvaluationStats,
  MissionEvaluationStats,
  DailyEvaluationStats,
  AIEvaluationResponse
} from '@/types/ai-evaluation'

// Request DTOs
export interface EvaluationRequest {
  missionAttemptId: string
  missionId: number
  evaluationTrigger: 'MISSION_COMPLETION' | 'MANUAL_REQUEST' | 'RETRY'
  submittedCode?: string
  additionalContext?: any
}

export interface EvaluationFilters {
  userId?: number
  missionId?: number
  status?: AIEvaluation['evaluation_status']
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}

export interface StatsFilters {
  startDate?: string
  endDate?: string
  missionType?: string
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
}

// AI Evaluation API
export const aiEvaluationApi = {
  // Request AI evaluation
  async requestEvaluation(request: EvaluationRequest): Promise<AIEvaluation> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.EVALUATE)
    return apiClient.post<AIEvaluation>(url, request)
  },

  // Get evaluation results
  async getEvaluationResults(evaluationId: number): Promise<EvaluationSummary> {
    const url = buildUrl(
      getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.RESULTS), 
      { evaluationId }
    )
    return apiClient.get<EvaluationSummary>(url)
  },

  // Get evaluation history
  async getEvaluationHistory(filters?: EvaluationFilters): Promise<AIEvaluation[]> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.HISTORY)
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get<AIEvaluation[]>(finalUrl)
  },

  // Get detailed evaluation statistics
  async getEvaluationStats(filters?: StatsFilters): Promise<{
    summary: {
      totalEvaluations: number
      completedEvaluations: number
      averageScore: number
      averageProcessingTime: number
    }
    dailyStats: DailyEvaluationStats[]
    missionStats: MissionEvaluationStats[]
  }> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.STATS)
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get(finalUrl)
  },

  // Get command analysis for an evaluation
  async getCommandAnalysis(evaluationId: number): Promise<CommandAnalysis[]> {
    const url = buildUrl(
      getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.COMMAND_ANALYSIS), 
      { evaluationId }
    )
    return apiClient.get<CommandAnalysis[]>(url)
  },

  // Get user performance analytics
  async getUserPerformance(filters?: StatsFilters): Promise<UserEvaluationStats> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.USER_PERFORMANCE)
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get<UserEvaluationStats>(finalUrl)
  },

  // Get mission analytics
  async getMissionAnalytics(missionId?: number, filters?: StatsFilters): Promise<MissionEvaluationStats[]> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', API_ENDPOINTS.AI_EVALUATION.MISSION_ANALYTICS)
    const searchParams = new URLSearchParams()
    
    if (missionId) {
      searchParams.append('missionId', String(missionId))
    }
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get<MissionEvaluationStats[]>(finalUrl)
  },

  // Get comprehensive evaluation data (for evaluation page)
  async getComprehensiveEvaluationData(evaluationId?: number): Promise<AIEvaluationResponse> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', '/api/evaluations/comprehensive')
    const finalUrl = evaluationId ? `${url}?evaluationId=${evaluationId}` : url
    return apiClient.get<AIEvaluationResponse>(finalUrl)
  },

  // Retry failed evaluation
  async retryEvaluation(evaluationId: number): Promise<AIEvaluation> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', `/api/evaluations/${evaluationId}/retry`)
    return apiClient.post<AIEvaluation>(url, {})
  },

  // Cancel pending evaluation
  async cancelEvaluation(evaluationId: number): Promise<{ message: string }> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', `/api/evaluations/${evaluationId}/cancel`)
    return apiClient.post(url, {})
  },

  // Get evaluation status
  async getEvaluationStatus(evaluationId: number): Promise<{ 
    status: AIEvaluation['evaluation_status']
    progress?: number
    estimatedCompletionTime?: string 
  }> {
    const url = getApiUrl('AI_EVALUATION_SERVICE', `/api/evaluations/${evaluationId}/status`)
    return apiClient.get(url)
  },

  // Get real-time evaluation updates (SSE endpoint)
  createEvaluationEventSource(evaluationId: number): EventSource {
    const url = getApiUrl('AI_EVALUATION_SERVICE', `/api/evaluations/${evaluationId}/events`)
    const token = localStorage.getItem('devtrip_access_token')
    
    return new EventSource(`${url}?token=${token}`)
  }
}