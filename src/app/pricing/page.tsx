import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

const plans = [
    {
        name: "이코노미 클래스",
        price: "₩0",
        period: "/월",
        description: "여정을 시작하고 기본 개념을 탐색하기에 완벽합니다.",
        features: [
            "하루 3개의 무료 미션 티켓",
            "초보자 미션 이용 가능",
            "표준 AI 기반 피드백",
            "커뮤니티 지원",
        ],
        cta: "무료로 시작하기",
        href: "/login",
        isPopular: false,
    },
    {
        name: "비즈니스 클래스",
        price: "₩29,000",
        period: "/월",
        description: "DevOps를 마스터하려는 진지한 학습자에게 이상적인 선택입니다.",
        features: [
            "무제한 미션 티켓",
            "모든 미션에 대한 전체 액세스",
            "고급 AI 평가 및 보고서",
            "격리된 고성능 환경",
            "우선 지원",
        ],
        cta: "비즈니스로 업그레이드",
        href: "/login?plan=business",
        isPopular: true,
    },
    {
        name: "퍼스트 클래스",
        price: "₩50,000",
        period: "/월",
        description: "최고의 경험과 기능을 요구하는 전문가를 위한 플랜입니다.",
        features: [
            "모든 비즈니스 클래스 기능",
            "1:1 전문가 세션 (월 2회)",
            "새로운 미션 및 기능 조기 이용",
            "전용 지원 채널",
        ],
        cta: "퍼스트 클래스로 이동",
        href: "/login?plan=first",
        isPopular: false,
    }
]

export default function PricingPage() {
    return (
        <div className="bg-secondary">
        <div className="container mx-auto py-20 px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">티켓 선택하기</h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    DevOps 여정의 모든 단계를 위한 유연한 플랜. 난기류 없이 부드러운 학습만 있습니다.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${plan.isPopular ? 'border-primary ring-2 ring-primary shadow-2xl' : ''}`}>
                        {plan.isPopular && (
                            <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1 rounded-t-lg">
                                가장 인기있음
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                            <div className="flex items-baseline mt-4">
                                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                                {plan.period && <span className="text-xl font-semibold text-muted-foreground">{plan.period}</span>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg" className="w-full" variant={plan.isPopular ? "default" : "outline"} asChild>
                                <Link href={plan.href}>{plan.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="mt-12 bg-background">
                <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 className="text-2xl font-bold">팀 플랜이 필요하신가요?</h3>
                        <p className="text-muted-foreground mt-2">
                            기업 및 교육 기관을 위한 맞춤형 솔루션. 통합 대시보드 및 결제로 팀의 여정을 관리하세요.
                        </p>
                    </div>
                    <div className="md:text-right">
                        <Button size="lg" variant="default" asChild>
                            <Link href="/contact-sales">
                                영업팀에 문의 <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
        </div>
    )
}
