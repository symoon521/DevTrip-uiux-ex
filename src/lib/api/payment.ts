// Payment Service Client
// 결제, 구독, 팀 플랜 관리

import { API_CONFIG, API_ENDPOINTS, getApiUrl } from './config'
import { apiClient } from './auth'

// Payment DTOs
export interface SubscriptionPlan {
  id: number
  name: string
  type: 'INDIVIDUAL' | 'TEAM' | 'ENTERPRISE'
  price: number
  currency: 'KRW' | 'USD'
  billingCycle: 'MONTHLY' | 'YEARLY'
  features: {
    maxUsers?: number
    unlimitedMissions: boolean
    prioritySupport: boolean
    advancedAnalytics: boolean
    teamManagement: boolean
    customIntegrations: boolean
    dedicatedAccount: boolean
    whiteLabel: boolean
  }
  isActive: boolean
  isPopular: boolean
  description: string
  createdAt: string
  updatedAt: string
}

export interface UserSubscription {
  id: number
  userId: number
  planId: number
  plan: SubscriptionPlan
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING' | 'FAILED'
  startDate: string
  endDate: string
  autoRenewal: boolean
  paymentMethodId?: string
  teamId?: number
  metadata: {
    purchaseDate: string
    lastBillingDate?: string
    nextBillingDate?: string
    cancellationReason?: string
  }
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  type: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'KAKAOPAY' | 'TOSSPAY'
  isDefault: boolean
  details: {
    last4?: string
    brand?: string
    expiryMonth?: number
    expiryYear?: number
    billingName: string
  }
  createdAt: string
}

export interface BillingHistory {
  id: number
  subscriptionId: number
  amount: number
  currency: string
  status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED'
  paymentMethod: string
  billingPeriodStart: string
  billingPeriodEnd: string
  invoiceUrl?: string
  receiptUrl?: string
  failureReason?: string
  paidAt?: string
  createdAt: string
}

export interface TeamSubscription {
  id: number
  teamId: number
  subscriptionId: number
  subscription: UserSubscription
  teamName: string
  ownerId: number
  ownerName: string
  memberCount: number
  maxMembers: number
  usageStats: {
    totalMissions: number
    activeMissions: number
    totalPlayTime: number
    averageScore: number
  }
  createdAt: string
}

// Subscription Request DTOs
export interface SubscriptionRequest {
  planId: number
  paymentMethodId?: string
  teamId?: number
  billingCycle?: 'MONTHLY' | 'YEARLY'
  couponCode?: string
}

export interface PaymentMethodRequest {
  type: PaymentMethod['type']
  token: string // Payment processor token
  isDefault?: boolean
  billingName: string
}

// Payment Service API
export const paymentApi = {
  // Get available subscription plans
  async getPlans(filters?: {
    type?: SubscriptionPlan['type']
    billingCycle?: SubscriptionPlan['billingCycle']
    isActive?: boolean
  }): Promise<SubscriptionPlan[]> {
    const url = getApiUrl('PAYMENT_SERVICE', API_ENDPOINTS.PAYMENT.PLANS)
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get<SubscriptionPlan[]>(finalUrl)
  },

  // Subscribe to a plan
  async subscribe(request: SubscriptionRequest): Promise<{
    subscription: UserSubscription
    paymentUrl?: string // For redirect-based payments
    requiresAction?: boolean
  }> {
    const url = getApiUrl('PAYMENT_SERVICE', API_ENDPOINTS.PAYMENT.SUBSCRIBE)
    return apiClient.post(url, request)
  },

  // Cancel subscription
  async cancelSubscription(subscriptionId: number, reason?: string): Promise<{ 
    message: string
    effectiveDate: string 
  }> {
    const url = getApiUrl('PAYMENT_SERVICE', API_ENDPOINTS.PAYMENT.CANCEL_SUBSCRIPTION)
    return apiClient.post(url, { subscriptionId, reason })
  },

  // Get subscription status
  async getSubscriptionStatus(): Promise<UserSubscription | null> {
    const url = getApiUrl('PAYMENT_SERVICE', API_ENDPOINTS.PAYMENT.SUBSCRIPTION_STATUS)
    try {
      return await apiClient.get<UserSubscription>(url)
    } catch (error) {
      // Return null if no subscription exists
      return null
    }
  },

  // Get billing history
  async getBillingHistory(filters?: {
    subscriptionId?: number
    status?: BillingHistory['status']
    startDate?: string
    endDate?: string
    limit?: number
    offset?: number
  }): Promise<BillingHistory[]> {
    const url = getApiUrl('PAYMENT_SERVICE', API_ENDPOINTS.PAYMENT.BILLING_HISTORY)
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get<BillingHistory[]>(finalUrl)
  },

  // Payment method management
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const url = getApiUrl('PAYMENT_SERVICE', '/api/payments/payment-methods')
    return apiClient.get<PaymentMethod[]>(url)
  },

  async addPaymentMethod(request: PaymentMethodRequest): Promise<PaymentMethod> {
    const url = getApiUrl('PAYMENT_SERVICE', API_ENDPOINTS.PAYMENT.UPDATE_PAYMENT_METHOD)
    return apiClient.post<PaymentMethod>(url, request)
  },

  async updatePaymentMethod(methodId: string, updates: Partial<PaymentMethodRequest>): Promise<PaymentMethod> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/payment-methods/${methodId}`)
    return apiClient.put<PaymentMethod>(url, updates)
  },

  async deletePaymentMethod(methodId: string): Promise<{ message: string }> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/payment-methods/${methodId}`)
    return apiClient.delete(url)
  },

  async setDefaultPaymentMethod(methodId: string): Promise<{ message: string }> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/payment-methods/${methodId}/set-default`)
    return apiClient.post(url, {})
  },

  // Team subscription management
  async getTeamSubscriptions(): Promise<TeamSubscription[]> {
    const url = getApiUrl('PAYMENT_SERVICE', '/api/payments/team-subscriptions')
    return apiClient.get<TeamSubscription[]>(url)
  },

  async getTeamSubscription(teamId: number): Promise<TeamSubscription | null> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/team-subscriptions/${teamId}`)
    try {
      return await apiClient.get<TeamSubscription>(url)
    } catch (error) {
      return null
    }
  },

  // Usage and analytics
  async getUsageStats(subscriptionId: number, period?: 'month' | 'quarter' | 'year'): Promise<{
    period: string
    totalMissions: number
    completedMissions: number
    totalPlayTime: number
    averageScore: number
    topPerformers: Array<{
      userId: number
      userName: string
      score: number
      missionsCompleted: number
    }>
    missionsByCategory: Array<{
      category: string
      count: number
      averageScore: number
    }>
  }> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/subscriptions/${subscriptionId}/usage`)
    const searchParams = new URLSearchParams()
    
    if (period) {
      searchParams.append('period', period)
    }
    
    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url
    return apiClient.get(finalUrl)
  },

  // Invoice and receipt management
  async downloadInvoice(billingId: number): Promise<Blob> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/billing/${billingId}/invoice`)
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('devtrip_access_token')}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to download invoice')
    }
    
    return response.blob()
  },

  async downloadReceipt(billingId: number): Promise<Blob> {
    const url = getApiUrl('PAYMENT_SERVICE', `/api/payments/billing/${billingId}/receipt`)
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('devtrip_access_token')}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to download receipt')
    }
    
    return response.blob()
  },

  // Coupon and discount management
  async validateCoupon(code: string, planId: number): Promise<{
    valid: boolean
    discount: {
      type: 'PERCENTAGE' | 'FIXED'
      value: number
      description: string
    }
    expiresAt?: string
  }> {
    const url = getApiUrl('PAYMENT_SERVICE', '/api/payments/coupons/validate')
    return apiClient.post(url, { code, planId })
  }
}