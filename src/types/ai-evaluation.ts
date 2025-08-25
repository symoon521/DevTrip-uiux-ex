// AI 평가 시스템 타입 정의
// 데이터베이스 스키마 기반으로 생성

export interface AIEvaluation {
  id: number
  mission_attempt_id: string
  user_id: number
  mission_id: number
  evaluation_status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  evaluation_result: any
  ai_model_version: string
  error_message?: string
  mission_title?: string
  mission_type: string
  submitted_code?: string
  s3_log_path?: string
  s3_workspace_path?: string
  evaluation_trigger: 'MISSION_COMPLETION' | 'MANUAL_REQUEST' | 'RETRY'
  processing_node?: string
  processing_time_ms?: number
  created_at: string
  updated_at: string
}

export interface EvaluationSummary {
  id: number
  user_id: number
  mission_id: number
  mission_attempt_id: string
  mission_title?: string
  mission_type: string
  mission_difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  
  // DevOps 채점관 점수들
  overall_score: number
  correctness_score: number
  efficiency_score: number
  quality_score: number
  
  // 호환성 점수들
  code_quality_score: number
  security_score: number
  style_score: number
  
  evaluation_status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  feedback_summary?: string
  feedback_details: any
  
  // 미션 수행 통계
  commands_executed: number
  significant_commands: number
  error_commands: number
  total_execution_time_ms: number
  
  // AI 평가 메타데이터
  evaluation_duration_ms?: number
  ai_evaluation_id?: number
  stamps_earned: number
  points_awarded: number
  
  created_at: string
  updated_at: string
}

export interface CommandAnalysis {
  id: number
  mission_attempt_id: string
  command_log_id?: string
  ai_evaluation_id: number
  
  // 명령어 분석 결과
  command: string
  command_category: string
  correctness_assessment: 'CORRECT' | 'INCORRECT' | 'PARTIAL'
  efficiency_rating: number // 1-5
  best_practice_score: number // 0-10
  security_risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  
  // AI 분석 상세
  ai_feedback: string
  improvement_suggestions: any
  alternative_commands: any
  
  // 메타데이터
  analysis_confidence: number // 0.0-1.0
  processing_time_ms?: number
  created_at: string
}

export interface UserEvaluationStats {
  user_id: number
  total_evaluations: number
  completed_evaluations: number
  failed_evaluations: number
  processing_evaluations: number
  
  // 점수 통계
  avg_overall_score: number
  avg_correctness_score: number
  avg_efficiency_score: number
  avg_quality_score: number
  
  // 미션 수행 통계
  total_commands: number
  total_significant_commands: number
  total_error_commands: number
  avg_execution_time_ms: number
  
  // 성과 지표
  total_stamps: number
  total_points: number
  
  // 시간 관련
  avg_evaluation_duration_ms: number
  last_evaluation_date: string
  first_evaluation_date: string
}

export interface MissionEvaluationStats {
  mission_id: number
  mission_type: string
  mission_difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  total_attempts: number
  completed_attempts: number
  failed_attempts: number
  
  // 평균 점수들
  avg_overall_score: number
  avg_correctness_score: number
  avg_efficiency_score: number
  avg_quality_score: number
  
  // 성공률
  success_rate: number
  
  // 명령어 통계
  avg_commands_per_attempt: number
  avg_significant_commands: number
  avg_error_commands: number
  
  last_attempt_date: string
  unique_users: number
}

export interface DailyEvaluationStats {
  evaluation_date: string
  total_evaluations: number
  completed_count: number
  failed_count: number
  processing_count: number
  unique_users: number
  unique_missions: number
  
  // 점수 통계
  avg_overall_score: number
  avg_correctness_score: number
  avg_efficiency_score: number
  avg_quality_score: number
  
  // 성과 지표
  total_stamps_earned: number
  total_points_awarded: number
  
  // 성능 지표
  avg_evaluation_duration_ms: number
  avg_commands_per_evaluation: number
}

// API 응답 타입
export interface AIEvaluationResponse {
  user: {
    id: number
    name: string
    totalEvaluations: number
    completedEvaluations: number
    totalStamps: number
    totalPoints: number
  }
  recentEvaluation: EvaluationSummary
  commandAnalysis: CommandAnalysis[]
  evaluationHistory: Array<{
    date: string
    score: number
    mission: string
  }>
  userStats: UserEvaluationStats
  missionStats: MissionEvaluationStats[]
}

// 차트 데이터 타입
export interface ScoreData {
  date: string
  score: number
  mission: string
}

export interface SecurityRiskData {
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  count: number
  percentage: number
}

export interface MissionTypePerformance {
  mission_type: string
  avg_score: number
  total_attempts: number
  success_rate: number
  avg_completion_time: number
}