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
  Network,
  Database,
  Monitor,
  GitBranch,
  Server,
  Cpu
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

const ArchitectureCard = ({ icon: Icon, title, description, type }: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  type: "control-plane" | "worker-node" | "networking"
}) => {
  const typeColors = {
    "control-plane": "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "worker-node": "bg-green-500/10 text-green-400 border-green-500/30", 
    "networking": "bg-purple-500/10 text-purple-400 border-purple-500/30"
  }

  const typeLabels = {
    "control-plane": "컨트롤 플레인",
    "worker-node": "워커 노드",
    "networking": "네트워킹"
  }

  return (
    <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 w-fit">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <Badge className={typeColors[type]}>
            {typeLabels[type]}
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

export default function KubernetesGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
              <Globe className="w-12 h-12 text-blue-400" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                Kubernetes 마스터 가이드
              </h1>
              <p className="text-xl text-slate-400">
                컨테이너 오케스트레이션의 완전한 이해와 실무 운영
              </p>
            </div>
          </div>
        </div>

        {/* 개요 섹션 */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-400" />
              Kubernetes란 무엇인가?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Kubernetes(K8s)는 <strong className="text-blue-400">컨테이너화된 애플리케이션의 배포, 확장 및 관리</strong>를 
              자동화하기 위한 오픈소스 시스템입니다. Google의 15년간 프로덕션 워크로드 운영 경험을 바탕으로 설계된 
              <strong className="text-emerald-400">사실상의 컨테이너 오케스트레이션 표준</strong>입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="text-blue-300 font-semibold mb-2">자동화된 관리</h4>
                <p className="text-slate-400 text-sm">배포, 확장, 롤백을 자동으로 처리</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="text-emerald-300 font-semibold mb-2">자체 복구</h4>
                <p className="text-slate-400 text-sm">실패한 컨테이너를 자동으로 재시작</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <h4 className="text-purple-300 font-semibold mb-2">선언적 구성</h4>
                <p className="text-slate-400 text-sm">원하는 상태를 정의하면 자동으로 달성</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 아키텍처 구성 요소 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">클러스터 아키텍처</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArchitectureCard
              icon={Server}
              title="API Server"
              description="클러스터의 모든 상호작용을 위한 중앙 통신 허브. REST API를 통해 클러스터 상태를 관리"
              type="control-plane"
            />
            <ArchitectureCard
              icon={Database}
              title="etcd"
              description="클러스터의 모든 구성과 상태 데이터를 저장하는 분산 키-값 저장소"
              type="control-plane"
            />
            <ArchitectureCard
              icon={GitBranch}
              title="Scheduler"
              description="새로 생성된 파드를 실행할 최적의 워커 노드를 선택하는 스케줄러"
              type="control-plane"
            />
            <ArchitectureCard
              icon={Settings}
              title="Controller Manager"
              description="클러스터의 상태를 원하는 상태로 유지하기 위한 다양한 컨트롤러를 실행"
              type="control-plane"
            />
            <ArchitectureCard
              icon={Cpu}
              title="Kubelet"
              description="각 워커 노드에서 파드 내 컨테이너가 건강하게 실행되도록 관리하는 에이전트"
              type="worker-node"
            />
            <ArchitectureCard
              icon={Network}
              title="Kube-proxy"
              description="각 노드의 네트워크 규칙을 관리하여 서비스로의 트래픽 라우팅을 담당"
              type="networking"
            />
          </div>
        </div>

        {/* 실습 가이드 */}
        <Tabs defaultValue="objects" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-1">
            <TabsTrigger value="objects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              핵심 객체
            </TabsTrigger>
            <TabsTrigger value="workloads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              워크로드
            </TabsTrigger>
            <TabsTrigger value="networking" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              네트워킹
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              스토리지 & 운영
            </TabsTrigger>
          </TabsList>

          {/* 핵심 객체 탭 */}
          <TabsContent value="objects" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Container className="w-5 h-5 text-green-400" />
                  Pod - 최소 배포 단위
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Pod는 Kubernetes에서 생성하고 관리할 수 있는 가장 작은 배포 단위입니다. 
                    하나 이상의 컨테이너를 포함하며, 네트워크와 스토리지를 공유합니다.
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">단일 컨테이너 Pod</h4>
                    <CodeBlock language="yaml" title="simple-pod.yaml">
{`apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: webserver
spec:
  containers:
    - name: nginx-container
      image: nginx:1.25
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"`}
                    </CodeBlock>

                    <h4 className="text-white font-medium">멀티 컨테이너 Pod (사이드카 패턴)</h4>
                    <CodeBlock language="yaml" title="sidecar-pod.yaml">
{`apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  containers:
    # 메인 애플리케이션 컨테이너
    - name: main-app
      image: my-app:1.0
      ports:
        - containerPort: 8080
      volumeMounts:
        - name: shared-logs
          mountPath: /var/log/app

    # 로깅 사이드카 컨테이너
    - name: log-collector
      image: fluentd:latest
      volumeMounts:
        - name: shared-logs
          mountPath: /var/log/app
          readOnly: true
  
  volumes:
    - name: shared-logs
      emptyDir: {}`}
                    </CodeBlock>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <h5 className="text-blue-300 font-semibold mb-2">Pod 생성 & 관리</h5>
                        <div className="space-y-2 text-sm">
                          <CodeBlock>kubectl apply -f simple-pod.yaml</CodeBlock>
                          <CodeBlock>kubectl get pods</CodeBlock>
                          <CodeBlock>kubectl describe pod nginx-pod</CodeBlock>
                          <CodeBlock>kubectl logs nginx-pod</CodeBlock>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                        <h5 className="text-purple-300 font-semibold mb-2">Pod 상호작용</h5>
                        <div className="space-y-2 text-sm">
                          <CodeBlock>kubectl exec -it nginx-pod -- bash</CodeBlock>
                          <CodeBlock>kubectl port-forward nginx-pod 8080:80</CodeBlock>
                          <CodeBlock>kubectl delete pod nginx-pod</CodeBlock>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 워크로드 탭 */}
          <TabsContent value="workloads" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-400" />
                    Deployment - 상태 없는 애플리케이션 관리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">
                    Deployment는 Pod와 ReplicaSet에 대한 선언적 업데이트를 제공합니다. 
                    롤링 업데이트와 롤백 기능을 통해 무중단 배포를 지원합니다.
                  </p>
                  
                  <CodeBlock language="yaml" title="nginx-deployment.yaml">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5`}
                  </CodeBlock>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-300 font-medium mb-3">Deployment 관리 명령어</h4>
                      <div className="space-y-2">
                        <CodeBlock>kubectl apply -f nginx-deployment.yaml</CodeBlock>
                        <CodeBlock>kubectl get deployments</CodeBlock>
                        <CodeBlock>kubectl scale deployment nginx-deployment --replicas=5</CodeBlock>
                        <CodeBlock>kubectl set image deployment/nginx-deployment nginx=nginx:1.26</CodeBlock>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-orange-300 font-medium mb-3">롤아웃 관리</h4>
                      <div className="space-y-2">
                        <CodeBlock>kubectl rollout status deployment/nginx-deployment</CodeBlock>
                        <CodeBlock>kubectl rollout history deployment/nginx-deployment</CodeBlock>
                        <CodeBlock>kubectl rollout undo deployment/nginx-deployment</CodeBlock>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    StatefulSet - 상태 있는 애플리케이션
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    StatefulSet은 데이터베이스와 같은 상태 있는 애플리케이션을 관리합니다. 
                    안정적인 네트워크 식별자와 영구 스토리지를 제공합니다.
                  </p>

                  <CodeBlock language="yaml" title="postgres-statefulset.yaml">
{`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          value: myapp
        - name: POSTGRES_USER
          value: admin
        - name: POSTGRES_PASSWORD
          value: secret
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 네트워킹 탭 */}
          <TabsContent value="networking" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    Service - 파드 간 통신
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-cyan-300 font-medium">ClusterIP Service</h4>
                      <CodeBlock language="yaml" title="clusterip-service.yaml">
{`apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: ClusterIP
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80`}
                      </CodeBlock>
                      <p className="text-slate-400 text-sm">클러스터 내부에서만 접근 가능한 서비스</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-cyan-300 font-medium">NodePort Service</h4>
                      <CodeBlock language="yaml" title="nodeport-service.yaml">
{`apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080`}
                      </CodeBlock>
                      <p className="text-slate-400 text-sm">모든 노드의 특정 포트로 외부 접근 허용</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-cyan-300 font-medium">LoadBalancer Service</h4>
                    <CodeBlock language="yaml" title="loadbalancer-service.yaml">
{`apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80`}
                    </CodeBlock>
                    <p className="text-slate-400 text-sm">클라우드 제공업체의 로드밸런서를 통한 외부 접근</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    Ingress - HTTP/HTTPS 라우팅
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">
                    Ingress는 HTTP/HTTPS 트래픽을 클러스터 내 서비스로 라우팅합니다. 
                    도메인 기반 라우팅과 SSL 터미네이션을 제공합니다.
                  </p>

                  <CodeBlock language="yaml" title="ingress.yaml">
{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 스토리지 & 운영 탭 */}
          <TabsContent value="storage" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-yellow-400" />
                    영구 볼륨 (Persistent Volumes)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-yellow-300 font-medium">PersistentVolume</h4>
                      <CodeBlock language="yaml" title="persistent-volume.yaml">
{`apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv
spec:
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: fast-ssd
  hostPath:
    path: /mnt/mysql-data`}
                      </CodeBlock>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-yellow-300 font-medium">PersistentVolumeClaim</h4>
                      <CodeBlock language="yaml" title="persistent-volume-claim.yaml">
{`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: fast-ssd`}
                      </CodeBlock>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-400" />
                    구성 관리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-green-300 font-medium">ConfigMap</h4>
                      <CodeBlock language="yaml" title="configmap.yaml">
{`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://localhost/myapp"
  debug_mode: "true"
  app.properties: |
    server.port=8080
    server.host=0.0.0.0
    logging.level=INFO`}
                      </CodeBlock>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-green-300 font-medium">Secret</h4>
                      <CodeBlock language="yaml" title="secret.yaml">
{`apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=  # base64 encoded 'admin'
  password: cGFzc3dvcmQ=  # base64 encoded 'password'
stringData:
  api_key: "my-secret-api-key"`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-green-300 font-medium">Pod에서 ConfigMap과 Secret 사용</h4>
                    <CodeBlock language="yaml" title="pod-with-config.yaml">
{`apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: my-app:1.0
    env:
    - name: DATABASE_URL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: database_url
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: app-secret
          key: api_key
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
    - name: secret-volume
      mountPath: /etc/secrets
  volumes:
  - name: config-volume
    configMap:
      name: app-config
  - name: secret-volume
    secret:
      secretName: app-secret`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-red-400" />
                    모니터링 & 로깅
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <h4 className="text-red-300 font-semibold mb-3">기본 모니터링</h4>
                      <div className="space-y-2 text-sm">
                        <CodeBlock>kubectl top nodes</CodeBlock>
                        <CodeBlock>kubectl top pods</CodeBlock>
                        <CodeBlock>kubectl get events</CodeBlock>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <h4 className="text-orange-300 font-semibold mb-3">로그 확인</h4>
                      <div className="space-y-2 text-sm">
                        <CodeBlock>kubectl logs pod-name</CodeBlock>
                        <CodeBlock>kubectl logs -f deployment/app</CodeBlock>
                        <CodeBlock>kubectl logs -l app=nginx</CodeBlock>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <h4 className="text-yellow-300 font-semibold mb-3">디버깅</h4>
                      <div className="space-y-2 text-sm">
                        <CodeBlock>kubectl describe pod pod-name</CodeBlock>
                        <CodeBlock>kubectl exec -it pod-name -- sh</CodeBlock>
                        <CodeBlock>kubectl debug node/node-name -it --image=ubuntu</CodeBlock>
                      </div>
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
                <h4 className="text-emerald-300 font-semibold mb-2">초급: 간단한 웹앱 배포</h4>
                <p className="text-slate-400 text-sm mb-3">Pod, Service, Deployment를 사용한 기본 배포</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-blue-300 font-semibold mb-2">중급: 마이크로서비스 아키텍처</h4>
                <p className="text-slate-400 text-sm mb-3">Frontend, API, Database 서비스 구성</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <h4 className="text-purple-300 font-semibold mb-2">고급: 프로덕션 운영</h4>
                <p className="text-slate-400 text-sm mb-3">모니터링, 로깅, CI/CD 파이프라인</p>
                <Button size="sm" variant="outline" className="w-full">
                  실습 시작 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 권장 학습 경로 */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-purple-400" />
              권장 학습 경로
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-400 font-bold">1</span>
                </div>
                <h4 className="text-green-300 font-semibold mb-2">기초 개념</h4>
                <p className="text-slate-400 text-sm">Pod, Service, Deployment 이해</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <h4 className="text-blue-300 font-semibold mb-2">네트워킹</h4>
                <p className="text-slate-400 text-sm">Service, Ingress, DNS</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <h4 className="text-purple-300 font-semibold mb-2">스토리지 & 구성</h4>
                <p className="text-slate-400 text-sm">Volume, ConfigMap, Secret</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-400 font-bold">4</span>
                </div>
                <h4 className="text-orange-300 font-semibold mb-2">고급 운영</h4>
                <p className="text-slate-400 text-sm">모니터링, 보안, 자동화</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}