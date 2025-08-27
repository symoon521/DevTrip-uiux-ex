"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Book, 
  ArrowRight,
  Container,
  Globe,
  Package,
  Code,
  Terminal,
  Users,
  Star,
  Clock,
  Zap
} from "lucide-react"
import Link from "next/link"

const TechCard = ({ 
  icon: Icon, 
  title, 
  description, 
  level, 
  readTime, 
  rating, 
  href,
  gradient,
  tags 
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  level: string
  readTime: string
  rating: number
  href: string
  gradient: string
  tags: string[]
}) => {
  return (
    <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${gradient} backdrop-blur-sm w-fit`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
            {level}
          </Badge>
        </div>
        
        <CardTitle className="text-xl text-white mb-2 group-hover:text-blue-300 transition-colors">
          {title}
        </CardTitle>
        
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        
        <Link href={href}>
          <Button className="w-full group-hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            가이드 보기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) => {
  return (
    <div className="text-center space-y-4">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 w-fit mx-auto">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default function TechGuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 헤더 */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              DevOps 기술 가이드
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              현대적인 개발 환경에서 필수적인 DevOps 기술들을 체계적으로 학습하세요. 
              실무 중심의 가이드와 핸즈온 실습을 통해 전문성을 키워보세요.
            </p>
          </div>
        </div>

        {/* 특징 소개 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Code}
            title="실무 중심 내용"
            description="실제 프로덕션 환경에서 사용되는 설정과 베스트 프랙티스를 다룹니다"
          />
          <FeatureCard
            icon={Terminal}
            title="핸즈온 실습"
            description="단계별 실습과 예제 코드를 통해 직접 경험하며 학습합니다"
          />
          <FeatureCard
            icon={Users}
            title="전문가 검증"
            description="30년차 DevOps 엔지니어의 경험과 노하우가 집약된 콘텐츠"
          />
        </div>

        {/* 기술 가이드 카드들 */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">기술별 전문 가이드</h2>
            <p className="text-slate-400">각 기술의 기초부터 고급 활용까지 단계별로 학습하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard
              icon={Container}
              title="Docker 완벽 가이드"
              description="컨테이너화 기술의 핵심인 Docker를 기초부터 프로덕션 운영까지 완벽하게 마스터하세요. 실무에서 바로 활용할 수 있는 노하우를 제공합니다."
              level="초급 ~ 고급"
              readTime="2-3시간"
              rating={4.9}
              href="/guides/docker"
              gradient="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
              tags={["컨테이너", "가상화", "배포"]}
            />

            <TechCard
              icon={Globe}
              title="Kubernetes 마스터 가이드"
              description="컨테이너 오케스트레이션의 표준인 Kubernetes를 완전히 이해하고, 클러스터 관리부터 고급 운영까지 전문가 수준으로 학습하세요."
              level="중급 ~ 고급"
              readTime="4-5시간"
              rating={4.8}
              href="/guides/kubernetes"
              gradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
              tags={["오케스트레이션", "클러스터", "마이크로서비스"]}
            />

            <TechCard
              icon={Package}
              title="Helm 패키지 관리"
              description="Kubernetes 애플리케이션을 효율적으로 관리할 수 있는 Helm을 마스터하고, 복잡한 배포를 간단하게 만드는 방법을 배워보세요."
              level="중급"
              readTime="3-4시간"
              rating={4.7}
              href="/guides/helm"
              gradient="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
              tags={["패키지 관리", "템플릿", "배포 자동화"]}
            />
          </div>
        </div>

        {/* 학습 경로 추천 */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Book className="w-6 h-6 text-emerald-400" />
              추천 학습 경로
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-emerald-400">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-2">Docker 기초 다지기</h3>
                  <p className="text-slate-400 text-sm">컨테이너 개념부터 이미지 빌드, 컨테이너 관리까지</p>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-blue-400">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Kubernetes 전문가</h3>
                  <p className="text-slate-400 text-sm">클러스터 아키텍처부터 고급 운영 기법까지</p>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Helm으로 완성</h3>
                  <p className="text-slate-400 text-sm">패키지 관리와 배포 자동화로 전문성 완성</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 실습 환경 안내 */}
        <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-400" />
              실습 환경 준비
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-orange-300 font-semibold mb-3">로컬 개발 환경</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Docker Desktop (Windows/Mac)</li>
                  <li>• Minikube 또는 Kind (로컬 K8s)</li>
                  <li>• kubectl CLI</li>
                  <li>• Helm CLI</li>
                  <li>• 선호하는 텍스트 에디터</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-orange-300 font-semibold mb-3">클라우드 환경 (선택)</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• AWS EKS / Google GKE / Azure AKS</li>
                  <li>• 클라우드 CLI 도구</li>
                  <li>• Terraform (Infrastructure as Code)</li>
                  <li>• 모니터링 도구 (Prometheus, Grafana)</li>
                  <li>• CI/CD 파이프라인</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-300 font-medium mb-2">💡 학습 팁</p>
              <p className="text-slate-400 text-sm">
                각 가이드는 독립적으로 학습 가능하지만, Docker → Kubernetes → Helm 순서로 진행하시면 
                더욱 효과적인 학습이 가능합니다. 실습 위주로 진행하여 실무 역량을 키워보세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}