'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  CheckCircle, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  BarChart3, 
  Settings, 
  Crown,
  Loader2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { paymentApi, type SubscriptionPlan } from '@/lib/api/payment'

export default function PlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [isYearly, setIsYearly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [subscribingPlan, setSubscribingPlan] = useState<number | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadPlans()
  }, [isYearly])

  const loadPlans = async () => {
    setIsLoading(true)
    try {
      const data = await paymentApi.getPlans({
        billingCycle: isYearly ? 'YEARLY' : 'MONTHLY',
        isActive: true
      })
      setPlans(data.sort((a, b) => a.price - b.price))
    } catch (error) {
      console.error('Failed to load plans:', error)
      toast({
        title: "플랜 로드 실패",
        description: "구독 플랜을 불러오는데 실패했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (planId: number) => {
    setSubscribingPlan(planId)
    try {
      const result = await paymentApi.subscribe({
        planId,
        billingCycle: isYearly ? 'YEARLY' : 'MONTHLY'
      })

      if (result.paymentUrl) {
        // Redirect to payment processor
        window.location.href = result.paymentUrl
      } else {
        toast({
          title: "구독 완료",
          description: "구독이 성공적으로 완료되었습니다.",
        })
        router.push('/billing')
      }
    } catch (error) {
      console.error('Failed to subscribe:', error)
      toast({
        title: "구독 실패",
        description: "구독 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setSubscribingPlan(null)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: currency === 'KRW' ? 'KRW' : 'USD',
      minimumFractionDigits: 0
    })
    return formatter.format(price)
  }

  const getYearlyDiscount = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyYearlyPrice = monthlyPrice * 12
    const discount = ((monthlyYearlyPrice - yearlyPrice) / monthlyYearlyPrice) * 100
    return Math.round(discount)
  }

  const getPlanIcon = (type: SubscriptionPlan['type']) => {
    switch (type) {
      case 'INDIVIDUAL': return <Users className="w-6 h-6" />
      case 'TEAM': return <Zap className="w-6 h-6" />
      case 'ENTERPRISE': return <Crown className="w-6 h-6" />
      default: return <Star className="w-6 h-6" />
    }
  }

  const getPlanColor = (type: SubscriptionPlan['type'], isPopular: boolean) => {
    if (isPopular) return 'from-blue-500 to-purple-600'
    
    switch (type) {
      case 'INDIVIDUAL': return 'from-green-500 to-emerald-600'
      case 'TEAM': return 'from-orange-500 to-red-600'
      case 'ENTERPRISE': return 'from-purple-500 to-pink-600'
      default: return 'from-gray-500 to-slate-600'
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="ml-2">플랜 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">DevTrip 구독 플랜</h1>
        <p className="text-xl text-muted-foreground mb-8">
          당신의 DevOps 여정에 맞는 완벽한 플랜을 선택하세요
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm ${!isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
            월간 결제
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-green-500"
          />
          <span className={`text-sm ${isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
            연간 결제
          </span>
          {isYearly && (
            <Badge variant="secondary" className="ml-2">
              최대 20% 할인!
            </Badge>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden transition-transform hover:scale-105 ${
              plan.isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
            }`}
          >
            {plan.isPopular && (
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getPlanColor(plan.type, plan.isPopular)}`} />
            )}
            
            <CardHeader className="text-center pb-4">
              {plan.isPopular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  인기
                </Badge>
              )}
              
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${getPlanColor(plan.type, plan.isPopular)} text-white mb-4`}>
                {getPlanIcon(plan.type)}
              </div>
              
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="text-3xl font-bold">
                  {formatPrice(plan.price, plan.currency)}
                </div>
                <div className="text-sm text-muted-foreground">
                  / {plan.billingCycle === 'MONTHLY' ? '월' : '년'}
                </div>
                {isYearly && plan.billingCycle === 'YEARLY' && (
                  <div className="text-sm text-green-600 font-medium">
                    월간 대비 {getYearlyDiscount(plan.price / 12, plan.price)}% 할인
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                {plan.features.maxUsers && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">최대 {plan.features.maxUsers}명 사용자</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    {plan.features.unlimitedMissions ? '무제한 미션' : '제한된 미션'}
                  </span>
                </div>

                {plan.features.prioritySupport && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">우선 지원</span>
                  </div>
                )}

                {plan.features.advancedAnalytics && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">고급 분석 및 리포트</span>
                  </div>
                )}

                {plan.features.teamManagement && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">팀 관리 기능</span>
                  </div>
                )}

                {plan.features.customIntegrations && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">커스텀 통합</span>
                  </div>
                )}

                {plan.features.dedicatedAccount && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">전담 계정 관리자</span>
                  </div>
                )}

                {plan.features.whiteLabel && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">화이트라벨</span>
                  </div>
                )}
              </div>

              <Button 
                className={`w-full ${plan.isPopular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : ''}`}
                variant={plan.isPopular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan.id)}
                disabled={subscribingPlan === plan.id}
              >
                {subscribingPlan === plan.id ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {subscribingPlan === plan.id ? '처리 중...' : '시작하기'}
              </Button>
              
              {plan.type === 'ENTERPRISE' && (
                <p className="text-xs text-center text-muted-foreground">
                  맞춤 설정을 원하시면 영업팀에 문의하세요
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">자주 묻는 질문</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">언제든지 취소할 수 있나요?</h3>
              <p className="text-sm text-muted-foreground">
                네, 언제든지 구독을 취소할 수 있습니다. 취소 후에도 현재 결제 기간이 끝날 때까지 모든 기능을 사용할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">플랜을 변경할 수 있나요?</h3>
              <p className="text-sm text-muted-foreground">
                언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 다음 결제 주기부터 적용됩니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">무료 체험이 있나요?</h3>
              <p className="text-sm text-muted-foreground">
                모든 신규 사용자에게 7일간 무료 체험을 제공합니다. 체험 기간 동안 모든 기능을 사용해보실 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">결제 수단은 무엇을 지원하나요?</h3>
              <p className="text-sm text-muted-foreground">
                신용카드, 카카오페이, 토스페이 등 다양한 결제 수단을 지원합니다. 안전하고 편리한 결제를 보장합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}