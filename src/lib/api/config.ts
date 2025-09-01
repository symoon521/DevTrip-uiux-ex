// Backend API Configuration
// 5개의 마이크로서비스 엔드포인트 설정

export const API_CONFIG = {
  // Base URLs for each microservice
  AUTH_SERVICE: 'http://localhost:8080',      // Authentication Service
  PAYMENT_SERVICE: 'http://localhost:8081',   // Payment Service  
  USER_SERVICE: 'http://localhost:8082',      // User Management Service
  MISSION_SERVICE: 'http://localhost:8083',   // Mission Management Service
  AI_EVALUATION_SERVICE: 'http://localhost:8084', // AI Evaluation Service
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication Service (Port 8080)
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    KAKAO_LOGIN: '/auth/kakao/login',
    GOOGLE_LOGIN: '/auth/google/login',
    VERIFY_TOKEN: '/auth/verify',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User Management Service (Port 8082)
  USER: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    UPLOAD_AVATAR: '/api/users/profile/upload-avatar',
    USER_STATS: '/api/users/stats',
    MISSION_PROGRESS: '/api/users/progress',
    ACHIEVEMENTS: '/api/users/achievements',
    PREFERENCES: '/api/users/preferences',
  },
  
  // Mission Management Service (Port 8083)
  MISSION: {
    LIST: '/api/missions',
    DETAIL: '/api/missions/:id',
    START: '/api/missions/:id/start',
    SUBMIT: '/api/missions/:id/submit',
    TERMINAL_CONNECT: '/api/missions/:id/terminal/connect',
    TERMINAL_DISCONNECT: '/api/missions/:id/terminal/disconnect',
    LOGS: '/api/missions/:id/logs',
    WORKSPACE: '/api/missions/:id/workspace',
    COUNTRIES: '/api/missions/countries',
    CITIES: '/api/missions/countries/:countryId/cities',
  },
  
  // AI Evaluation Service (Port 8084)
  AI_EVALUATION: {
    EVALUATE: '/api/evaluations/evaluate',
    RESULTS: '/api/evaluations/results/:evaluationId',
    HISTORY: '/api/evaluations/history',
    STATS: '/api/evaluations/stats',
    COMMAND_ANALYSIS: '/api/evaluations/command-analysis/:evaluationId',
    USER_PERFORMANCE: '/api/evaluations/user-performance',
    MISSION_ANALYTICS: '/api/evaluations/mission-analytics',
  },
  
  // Payment Service (Port 8081)
  PAYMENT: {
    PLANS: '/api/payments/plans',
    SUBSCRIBE: '/api/payments/subscribe',
    CANCEL_SUBSCRIPTION: '/api/payments/subscription/cancel',
    SUBSCRIPTION_STATUS: '/api/payments/subscription/status',
    BILLING_HISTORY: '/api/payments/billing/history',
    UPDATE_PAYMENT_METHOD: '/api/payments/payment-method',
  }
} as const

// Helper function to get full API URL
export function getApiUrl(service: keyof typeof API_CONFIG, endpoint: string): string {
  const baseUrl = API_CONFIG[service]
  return `${baseUrl}${endpoint}`
}

// Helper function to replace path parameters
export function buildUrl(template: string, params: Record<string, string | number>): string {
  let url = template
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value))
  })
  return url
}