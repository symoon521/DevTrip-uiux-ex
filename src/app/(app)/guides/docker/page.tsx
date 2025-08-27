"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Terminal, 
  Book, 
  Zap, 
  Container, 
  Settings,
  ArrowRight,
  Copy,
  Check,
  Play,
  FileText,
  Layers,
  Cloud,
  Shield
} from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
  children: React.ReactNode
  language?: string
  title?: string
}

const CodeBlock = ({ children, language = "bash", title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(children as string)
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea')
        textArea.value = children as string
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative rounded-lg bg-slate-900 border border-slate-700 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-sm text-slate-300 font-medium flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          {title}
        </div>
      )}
      <div className="relative p-4">
        <pre className="text-sm text-slate-100 overflow-x-auto">
          <code className={`language-${language}`}>{children}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

const ConceptCard = ({ icon: Icon, title, description, level }: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
}) => {
  const levelColors = {
    beginner: "bg-green-500/10 text-green-400 border-green-500/30",
    intermediate: "bg-orange-500/10 text-orange-400 border-orange-500/30", 
    advanced: "bg-red-500/10 text-red-400 border-red-500/30"
  }

  return (
    <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 w-fit">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <Badge className={levelColors[level]}>
            {level === "beginner" ? "초급" : level === "intermediate" ? "중급" : "고급"}
          </Badge>
        </div>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function DockerGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30">
              <Container className="w-12 h-12 text-blue-400" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                Docker 완벽 가이드
              </h1>
              <p className="text-xl text-slate-400">
                컨테이너화 기술의 완전한 이해와 실무 적용
              </p>
            </div>
          </div>
        </div>

        {/* 개요 섹션 */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-400" />
              Docker란 무엇인가?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Docker는 애플리케이션과 그 실행 환경을 <strong className="text-blue-400">컨테이너</strong>라는 
              표준화된 유닛으로 패키징하여 어떤 환경에서든 안정적으로 실행할 수 있게 하는 
              <strong className="text-emerald-400">오픈소스 플랫폼</strong>입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="text-blue-300 font-semibold mb-2">핵심 문제 해결</h4>
                <p className="text-slate-400 text-sm">"내 컴퓨터에서는 잘 되는데..." 문제를 근본적으로 해결</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="text-emerald-300 font-semibold mb-2">환경 일관성</h4>
                <p className="text-slate-400 text-sm">개발부터 운영까지 완전히 동일한 환경 보장</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 핵심 개념 카드들 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">핵심 개념 이해하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ConceptCard
              icon={Layers}
              title="Docker 이미지"
              description="컨테이너를 생성하기 위한 읽기 전용 템플릿. 애플리케이션과 실행 환경의 스냅샷 역할"
              level="beginner"
            />
            <ConceptCard
              icon={Container}
              title="Docker 컨테이너"
              description="이미지의 실행 가능한 인스턴스. 격리된 환경에서 애플리케이션을 실행하는 단위"
              level="beginner"
            />
            <ConceptCard
              icon={FileText}
              title="Dockerfile"
              description="이미지를 자동으로 빌드하기 위한 명령어들을 담고 있는 텍스트 파일"
              level="intermediate"
            />
            <ConceptCard
              icon={Cloud}
              title="Docker Registry"
              description="이미지를 저장하고 배포하는 시스템. Docker Hub가 대표적인 공개 레지스트리"
              level="intermediate"
            />
            <ConceptCard
              icon={Settings}
              title="Docker Compose"
              description="여러 컨테이너로 구성된 애플리케이션을 정의하고 실행하는 도구"
              level="advanced"
            />
            <ConceptCard
              icon={Shield}
              title="보안 & 네트워킹"
              description="컨테이너 보안 모범 사례와 네트워크 구성을 통한 안전한 운영"
              level="advanced"
            />
          </div>
        </div>

        {/* 실습 가이드 */}
        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-1">
            <TabsTrigger value="basics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              기본 명령어
            </TabsTrigger>
            <TabsTrigger value="dockerfile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              Dockerfile
            </TabsTrigger>
            <TabsTrigger value="compose" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              Docker Compose
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              고급 활용
            </TabsTrigger>
          </TabsList>

          {/* 기본 명령어 탭 */}
          <TabsContent value="basics" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  Docker 기본 명령어
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 이미지 관리 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-300">이미지 관리</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">이미지 다운로드</h4>
                      <CodeBlock title="Docker Hub에서 이미지 가져오기">docker pull ubuntu:22.04</CodeBlock>
                      <p className="text-slate-400 text-sm mt-2">태그를 생략하면 자동으로 latest 버전이 다운로드됩니다.</p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">로컬 이미지 목록 확인</h4>
                      <CodeBlock title="이미지 목록 보기">docker images</CodeBlock>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">이미지 삭제</h4>
                      <CodeBlock title="특정 이미지 삭제">docker rmi ubuntu:22.04</CodeBlock>
                      <CodeBlock title="사용하지 않는 모든 이미지 삭제">docker image prune -a</CodeBlock>
                    </div>
                  </div>
                </div>

                {/* 컨테이너 라이프사이클 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-300">컨테이너 라이프사이클</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">컨테이너 실행</h4>
                      <CodeBlock title="기본 컨테이너 실행">docker run hello-world</CodeBlock>
                      <CodeBlock title="백그라운드에서 웹서버 실행">docker run -d -p 8080:80 --name my-nginx nginx</CodeBlock>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                          <p className="text-blue-300 font-medium">주요 옵션</p>
                          <ul className="text-slate-400 text-sm mt-2 space-y-1">
                            <li><code className="text-green-400">-d</code>: 백그라운드 실행</li>
                            <li><code className="text-green-400">-p</code>: 포트 매핑</li>
                            <li><code className="text-green-400">--name</code>: 컨테이너 이름 지정</li>
                          </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <p className="text-purple-300 font-medium">대화형 실행</p>
                          <CodeBlock>docker run -it ubuntu bash</CodeBlock>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">컨테이너 상태 관리</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-slate-300 font-medium mb-2">실행 중인 컨테이너 확인</p>
                          <CodeBlock>docker ps</CodeBlock>
                        </div>
                        <div>
                          <p className="text-slate-300 font-medium mb-2">컨테이너 중지</p>
                          <CodeBlock>docker stop my-nginx</CodeBlock>
                        </div>
                        <div>
                          <p className="text-slate-300 font-medium mb-2">컨테이너 삭제</p>
                          <CodeBlock>docker rm my-nginx</CodeBlock>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dockerfile 탭 */}
          <TabsContent value="dockerfile" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  Dockerfile 작성하기
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-300">Node.js 애플리케이션 예시</h3>
                  
                  <CodeBlock language="dockerfile" title="Dockerfile">
{`# 베이스 이미지 설정
FROM node:18-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사 (캐시 최적화)
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 애플리케이션 소스 복사
COPY . .

# 애플리케이션 포트 노출
EXPOSE 3000

# 컨테이너 실행 시 실행할 명령어
CMD ["node", "server.js"]`}
                  </CodeBlock>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <h4 className="text-blue-300 font-semibold mb-3">주요 지시어</h4>
                      <ul className="space-y-2 text-sm">
                        <li><code className="text-green-400">FROM</code> - 베이스 이미지 지정</li>
                        <li><code className="text-green-400">WORKDIR</code> - 작업 디렉터리 설정</li>
                        <li><code className="text-green-400">COPY</code> - 파일/폴더 복사</li>
                        <li><code className="text-green-400">RUN</code> - 빌드 시 명령어 실행</li>
                        <li><code className="text-green-400">EXPOSE</code> - 포트 노출</li>
                        <li><code className="text-green-400">CMD</code> - 컨테이너 실행 명령어</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <h4 className="text-purple-300 font-semibold mb-3">베스트 프랙티스</h4>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li>• 가벼운 베이스 이미지 사용 (alpine)</li>
                        <li>• 레이어 캐싱 최적화</li>
                        <li>• 멀티스테이지 빌드 활용</li>
                        <li>• .dockerignore 파일 사용</li>
                        <li>• 보안을 위한 non-root 사용자</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-medium">이미지 빌드하기</h4>
                    <CodeBlock title="이미지 빌드">docker build -t my-app:1.0 .</CodeBlock>
                    <CodeBlock title="빌드된 이미지 실행">docker run -d -p 3000:3000 --name my-app-container my-app:1.0</CodeBlock>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Docker Compose 탭 */}
          <TabsContent value="compose" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Docker Compose로 멀티 컨테이너 관리
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-300">웹 애플리케이션 + 데이터베이스 구성</h3>
                  
                  <CodeBlock language="yaml" title="docker-compose.yml">
{`version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=database
      - DB_PORT=5432
      - DB_NAME=myapp
    depends_on:
      - database
    networks:
      - app-network

  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge`}
                  </CodeBlock>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">주요 Compose 명령어</h4>
                      <div className="space-y-2">
                        <CodeBlock title="서비스 시작">docker-compose up -d</CodeBlock>
                        <CodeBlock title="서비스 중지">docker-compose down</CodeBlock>
                        <CodeBlock title="로그 확인">docker-compose logs web</CodeBlock>
                        <CodeBlock title="서비스 재시작">docker-compose restart web</CodeBlock>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <h4 className="text-emerald-300 font-semibold mb-3">Compose의 장점</h4>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li>• 여러 컨테이너 일괄 관리</li>
                        <li>• 네트워킹 자동 구성</li>
                        <li>• 볼륨을 통한 데이터 지속성</li>
                        <li>• 환경변수 관리 용이</li>
                        <li>• 서비스 간 의존성 정의</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 고급 활용 탭 */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    보안 베스트 프랙티스
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-red-300 font-medium mb-2">Non-root 사용자로 실행</h4>
                      <CodeBlock language="dockerfile">
{`# Dockerfile에서
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs`}
                      </CodeBlock>
                    </div>
                    
                    <div>
                      <h4 className="text-red-300 font-medium mb-2">이미지 스캔</h4>
                      <CodeBlock>docker scan my-app:latest</CodeBlock>
                    </div>

                    <div>
                      <h4 className="text-red-300 font-medium mb-2">시크릿 관리</h4>
                      <CodeBlock>docker secret create my-secret secret.txt</CodeBlock>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    성능 최적화
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-yellow-300 font-medium mb-2">멀티스테이지 빌드</h4>
                      <CodeBlock language="dockerfile">
{`# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h4 className="text-yellow-300 font-medium mb-2">이미지 크기 최적화</h4>
                      <ul className="text-sm text-slate-400 space-y-1">
                        <li>• Alpine 리눅스 기반 이미지 사용</li>
                        <li>• 불필요한 파일 제거</li>
                        <li>• .dockerignore 활용</li>
                        <li>• 레이어 최소화</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-cyan-400" />
                  프로덕션 배포 전략
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <h4 className="text-cyan-300 font-semibold mb-3">이미지 태깅 전략</h4>
                    <div className="space-y-2">
                      <CodeBlock>docker tag app:latest app:v1.2.3</CodeBlock>
                      <CodeBlock>docker tag app:latest app:stable</CodeBlock>
                      <p className="text-slate-400 text-xs">의미 있는 태그 사용으로 버전 관리</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <h4 className="text-green-300 font-semibold mb-3">헬스체크 구성</h4>
                    <CodeBlock language="dockerfile">
{`HEALTHCHECK --interval=30s \\
  --timeout=3s \\
  --retries=3 \\
  CMD curl -f http://localhost:3000/health`}
                    </CodeBlock>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <h4 className="text-purple-300 font-semibold mb-3">로깅 설정</h4>
                    <CodeBlock>
{`docker run -d \\
  --log-driver=json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  my-app`}
                    </CodeBlock>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 실습 프로젝트 제안 */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-emerald-400" />
              실습 프로젝트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-emerald-300 font-semibold mb-2">초급: 정적 웹사이트</h4>
                <p className="text-slate-400 text-sm mb-3">Nginx를 사용한 정적 사이트 컨테이너화</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-blue-300 font-semibold mb-2">중급: API 서버</h4>
                <p className="text-slate-400 text-sm mb-3">Node.js Express API + MongoDB 구성</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-purple-300 font-semibold mb-2">고급: 마이크로서비스</h4>
                <p className="text-slate-400 text-sm mb-3">다중 서비스 아키텍처 구현</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}