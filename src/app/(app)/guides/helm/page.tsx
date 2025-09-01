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
  Shield,
  Globe,
  Package,
  Database,
  Monitor,
  GitBranch,
  Server,
  Ship,
  Box
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

export default function HelmGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30">
              <Package className="w-12 h-12 text-blue-400" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                Helm 완벽 가이드
              </h1>
              <p className="text-xl text-slate-400">
                Kubernetes 패키지 관리자의 완전한 이해와 실무 활용
              </p>
            </div>
          </div>
        </div>

        {/* 개요 섹션 */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-400" />
              Helm이란 무엇인가?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Helm은 <strong className="text-blue-400">Kubernetes를 위한 패키지 관리자</strong>로, 
              복잡한 애플리케이션 배포를 단순화하고 표준화합니다. 
              <strong className="text-emerald-400">차트(Chart)</strong>라는 패키지 형태로 
              Kubernetes 리소스를 관리하며, 템플릿을 통한 동적 구성을 지원합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="text-blue-300 font-semibold mb-2">패키지 관리</h4>
                <p className="text-slate-400 text-sm">복잡한 YAML 매니페스트를 하나의 차트로 관리</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="text-emerald-300 font-semibold mb-2">템플릿 엔진</h4>
                <p className="text-slate-400 text-sm">환경별 설정을 동적으로 생성</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <h4 className="text-purple-300 font-semibold mb-2">릴리스 관리</h4>
                <p className="text-slate-400 text-sm">버전 관리와 롤백 기능 제공</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 핵심 개념 카드들 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">핵심 개념 이해하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ConceptCard
              icon={Box}
              title="차트 (Chart)"
              description="Kubernetes 애플리케이션을 실행하는 데 필요한 모든 리소스 정의를 포함하는 패키지"
              level="beginner"
            />
            <ConceptCard
              icon={Play}
              title="릴리스 (Release)"
              description="Kubernetes 클러스터에서 실행 중인 차트의 인스턴스. 독립적으로 관리됨"
              level="beginner"
            />
            <ConceptCard
              icon={Database}
              title="리포지토리 (Repository)"
              description="패키징된 차트를 수집하고 공유할 수 있는 저장소"
              level="intermediate"
            />
            <ConceptCard
              icon={FileText}
              title="Values.yaml"
              description="차트의 기본값을 정의하는 파일. 환경별 커스터마이징 가능"
              level="intermediate"
            />
            <ConceptCard
              icon={Settings}
              title="Templates"
              description="Go 템플릿 문법을 사용하여 동적으로 Kubernetes 매니페스트 생성"
              level="advanced"
            />
            <ConceptCard
              icon={GitBranch}
              title="Hooks & Tests"
              description="차트 라이프사이클 동안 실행되는 특별한 작업들"
              level="advanced"
            />
          </div>
        </div>

        {/* 실습 가이드 */}
        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-1">
            <TabsTrigger value="basics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              기본 사용법
            </TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              차트 개발
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              템플릿 & Values
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              고급 기능
            </TabsTrigger>
          </TabsList>

          {/* 기본 사용법 탭 */}
          <TabsContent value="basics" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  Helm 설치 및 기본 명령어
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 설치 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-300">Helm 설치</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">macOS (Homebrew)</h4>
                      <CodeBlock title="Homebrew로 설치">brew install helm</CodeBlock>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Linux (스크립트)</h4>
                      <CodeBlock title="설치 스크립트 실행">
{`curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>

                {/* 리포지토리 관리 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-300">리포지토리 관리</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">리포지토리 추가</h4>
                      <CodeBlock title="Bitnami 리포지토리 추가">helm repo add bitnami https://charts.bitnami.com/bitnami</CodeBlock>
                      <CodeBlock title="리포지토리 목록 확인">helm repo list</CodeBlock>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">리포지토리 업데이트</h4>
                      <CodeBlock title="모든 리포지토리 업데이트">helm repo update</CodeBlock>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">차트 검색</h4>
                      <CodeBlock title="로컬 리포지토리에서 검색">helm search repo nginx</CodeBlock>
                      <CodeBlock title="Artifact Hub에서 검색">helm search hub wordpress</CodeBlock>
                    </div>
                  </div>
                </div>

                {/* 차트 설치 및 관리 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-300">차트 설치 및 관리</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="text-purple-300 font-medium">기본 설치</h4>
                      <CodeBlock title="차트 설치">helm install my-nginx bitnami/nginx</CodeBlock>
                      <CodeBlock title="값을 지정하여 설치">
{`helm install my-postgres bitnami/postgresql \\
  --set auth.postgresPassword=mypassword`}
                      </CodeBlock>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-purple-300 font-medium">릴리스 관리</h4>
                      <CodeBlock title="릴리스 목록 확인">helm list</CodeBlock>
                      <CodeBlock title="릴리스 상태 확인">helm status my-nginx</CodeBlock>
                      <CodeBlock title="릴리스 삭제">helm uninstall my-nginx</CodeBlock>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 차트 개발 탭 */}
          <TabsContent value="charts" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-400" />
                  차트 생성 및 구조
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-300">새 차트 생성</h3>
                  
                  <CodeBlock title="새 차트 생성">helm create myapp</CodeBlock>
                  
                  <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <h4 className="text-white font-medium mb-3">생성된 차트 구조</h4>
                    <CodeBlock language="text">
{`myapp/
├── Chart.yaml          # 차트 메타데이터
├── values.yaml         # 기본값 정의
├── charts/            # 의존성 차트
├── templates/         # Kubernetes 매니페스트 템플릿
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── serviceaccount.yaml
│   ├── NOTES.txt      # 설치 후 출력 메시지
│   └── tests/         # 차트 테스트
└── .helmignore        # 패키징 시 제외할 파일`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-300">Chart.yaml 구성</h3>
                  
                  <CodeBlock language="yaml" title="Chart.yaml">
{`apiVersion: v2
name: myapp
description: A Helm chart for my application
type: application
version: 0.1.0        # 차트 버전
appVersion: "1.0.0"   # 애플리케이션 버전

maintainers:
  - name: Your Name
    email: your@email.com
    url: https://yoursite.com

keywords:
  - webapp
  - nodejs
  - microservice

home: https://github.com/yourorg/myapp
sources:
  - https://github.com/yourorg/myapp

dependencies:
  - name: postgresql
    version: 12.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: 17.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled`}
                  </CodeBlock>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-300">차트 개발 도구</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-300 font-medium mb-3">템플릿 렌더링</h4>
                      <div className="space-y-2">
                        <CodeBlock>helm template myapp ./myapp</CodeBlock>
                        <CodeBlock>helm template myapp ./myapp --debug</CodeBlock>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-orange-300 font-medium mb-3">차트 검증</h4>
                      <div className="space-y-2">
                        <CodeBlock>helm lint ./myapp</CodeBlock>
                        <CodeBlock>helm install --dry-run --debug myapp ./myapp</CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 템플릿 & Values 탭 */}
          <TabsContent value="templates" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Values.yaml과 템플릿 구성
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-cyan-300 font-medium">Values.yaml</h4>
                      <CodeBlock language="yaml" title="values.yaml">
{`# 기본값 정의
replicaCount: 1

image:
  repository: nginx
  pullPolicy: IfNotPresent
  tag: "1.25"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  className: ""
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 100
  targetCPUUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}`}
                      </CodeBlock>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-cyan-300 font-medium">템플릿 사용 예시</h4>
                      <CodeBlock language="yaml" title="templates/deployment.yaml">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          resources:
            {{- toYaml .Values.resources | nindent 12 }}`}
                      </CodeBlock>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    템플릿 함수 및 파이프라인
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-purple-300 font-medium mb-3">기본 함수</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <code className="text-green-400">{`{{- include "template.name" . -}}`}</code>
                          <p className="text-slate-400 text-sm mt-1">템플릿 포함</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <code className="text-green-400">{`{{ .Values.image.tag | default "latest" }}`}</code>
                          <p className="text-slate-400 text-sm mt-1">기본값 설정</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <code className="text-green-400">{`{{ .Chart.Name | upper }}`}</code>
                          <p className="text-slate-400 text-sm mt-1">문자열 대문자 변환</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-purple-300 font-medium mb-3">조건문 및 반복문</h4>
                      <CodeBlock language="yaml">
{`# 조건문
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
# ...
{{- end }}

# 반복문
{{- range .Values.ingress.hosts }}
- host: {{ .host }}
  http:
    paths:
    {{- range .paths }}
    - path: {{ .path }}
      pathType: {{ .pathType }}
    {{- end }}
{{- end }}`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-purple-300 font-medium">Named Templates (_helpers.tpl)</h4>
                    <CodeBlock language="yaml" title="templates/_helpers.tpl">
{`{{/*
Expand the name of the chart.
*/}}
{{- define "myapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "myapp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "myapp.labels" -}}
helm.sh/chart: {{ include "myapp.chart" . }}
{{ include "myapp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 고급 기능 탭 */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-yellow-400" />
                    훅(Hooks)과 테스트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-yellow-300 font-medium">Pre-install Hook</h4>
                    <CodeBlock language="yaml" title="templates/hooks/pre-install-job.yaml">
{`apiVersion: batch/v1
kind: Job
metadata:
  name: "{{ include "myapp.fullname" . }}-pre-install"
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-weight": "-5"
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: pre-install-job
        image: "{{ .Values.hooks.preInstall.image }}"
        command:
          - /bin/bash
          - -c
          - |
            echo "Running pre-install tasks..."
            # 데이터베이스 초기화, 스키마 생성 등
            kubectl apply -f /configs/init-schema.yaml`}
                    </CodeBlock>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-yellow-300 font-medium">차트 테스트</h4>
                    <CodeBlock language="yaml" title="templates/tests/test-connection.yaml">
{`apiVersion: v1
kind: Pod
metadata:
  name: "{{ include "myapp.fullname" . }}-test"
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
  annotations:
    "helm.sh/hook": test
spec:
  restartPolicy: Never
  containers:
    - name: wget
      image: busybox
      command: ['wget']
      args: ['{{ include "myapp.fullname" . }}:{{ .Values.service.port }}']`}
                    </CodeBlock>
                    <CodeBlock title="테스트 실행">helm test my-release</CodeBlock>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-400" />
                    차트 의존성 관리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-green-300 font-medium">의존성 정의</h4>
                    <CodeBlock language="yaml" title="Chart.yaml dependencies">
{`dependencies:
  - name: postgresql
    version: "12.5.8"
    repository: "https://charts.bitnami.com/bitnami"
    condition: postgresql.enabled
  - name: redis
    version: "17.11.3"
    repository: "https://charts.bitnami.com/bitnami"
    condition: redis.enabled
    tags:
      - cache
  - name: elasticsearch
    version: "19.10.3"
    repository: "https://charts.bitnami.com/bitnami"
    condition: elasticsearch.enabled
    tags:
      - logging
      - search`}
                    </CodeBlock>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-green-300 font-medium">의존성 관리 명령어</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <CodeBlock>helm dependency update</CodeBlock>
                        <p className="text-slate-400 text-sm">의존성 차트 다운로드</p>
                      </div>
                      <div className="space-y-2">
                        <CodeBlock>helm dependency list</CodeBlock>
                        <p className="text-slate-400 text-sm">의존성 상태 확인</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-green-300 font-medium">서브차트 값 오버라이드</h4>
                    <CodeBlock language="yaml" title="values.yaml">
{`# 메인 애플리케이션 설정
app:
  name: myapp
  port: 8080

# PostgreSQL 서브차트 설정
postgresql:
  enabled: true
  auth:
    postgresPassword: "mypassword"
    database: "myapp"
  primary:
    persistence:
      size: 8Gi

# Redis 서브차트 설정
redis:
  enabled: true
  auth:
    enabled: false
  master:
    persistence:
      size: 2Gi`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-cyan-400" />
                    프로덕션 배포 전략
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-cyan-300 font-medium">환경별 값 파일</h4>
                      <div className="space-y-2">
                        <CodeBlock>helm install -f values-prod.yaml myapp ./myapp</CodeBlock>
                        <CodeBlock>helm upgrade -f values-staging.yaml myapp ./myapp</CodeBlock>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-cyan-300 font-medium">롤백 및 히스토리</h4>
                      <div className="space-y-2">
                        <CodeBlock>helm history myapp</CodeBlock>
                        <CodeBlock>helm rollback myapp 1</CodeBlock>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-cyan-300 font-medium">차트 패키징 및 배포</h4>
                    <div className="space-y-2">
                      <CodeBlock>helm package ./myapp</CodeBlock>
                      <CodeBlock>helm repo index . --url https://my-charts.example.com</CodeBlock>
                      <CodeBlock>helm push myapp-0.1.0.tgz my-repo</CodeBlock>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-cyan-300 font-medium">보안 고려사항</h4>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li>• 민감한 정보는 Kubernetes Secret 사용</li>
                        <li>• 차트 서명 및 검증 (helm sign/verify)</li>
                        <li>• RBAC을 통한 접근 제어</li>
                        <li>• 이미지 스캔 및 취약점 점검</li>
                        <li>• 네트워크 정책으로 트래픽 제한</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                <h4 className="text-emerald-300 font-semibold mb-2">초급: 기본 웹앱 차트</h4>
                <p className="text-slate-400 text-sm mb-3">간단한 웹 애플리케이션을 위한 Helm 차트 생성</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-blue-300 font-semibold mb-2">중급: 마이크로서비스 차트</h4>
                <p className="text-slate-400 text-sm mb-3">의존성을 포함한 복합 애플리케이션 차트</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-purple-300 font-semibold mb-2">고급: 프로덕션 차트</h4>
                <p className="text-slate-400 text-sm mb-3">훅, 테스트, 보안을 포함한 엔터프라이즈 차트</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 베스트 프랙티스 */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-400" />
              Helm 베스트 프랙티스
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-purple-300 font-semibold">차트 개발</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• 의미 있는 이름과 레이블 사용</li>
                  <li>• values.yaml에 명확한 주석 추가</li>
                  <li>• 템플릿에서 기본값 적절히 활용</li>
                  <li>• 리소스 제한과 요청 설정</li>
                  <li>• 건강 상태 검사 구현</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-purple-300 font-semibold">운영 관리</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• 환경별 값 파일 분리</li>
                  <li>• 의미 있는 릴리스 이름 사용</li>
                  <li>• 정기적인 의존성 업데이트</li>
                  <li>• 백업 및 복구 전략 수립</li>
                  <li>• 모니터링 및 알림 설정</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}