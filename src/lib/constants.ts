import type { Country, DifficultyLevel } from '@/types/mission'

export const DIFFICULTY_CONFIG: Record<DifficultyLevel, {
  label: string
  color: string
  gradient: string
}> = {
  Beginner: { 
    label: "초급", 
    color: "bg-green-500 text-white",
    gradient: "from-green-400 to-green-600"
  },
  Intermediate: { 
    label: "중급", 
    color: "bg-yellow-500 text-white",
    gradient: "from-yellow-400 to-orange-500"
  },
  Advanced: { 
    label: "고급", 
    color: "bg-red-500 text-white",
    gradient: "from-red-400 to-red-600"
  }
}

export const COUNTRIES: Country[] = [
  {
    id: 'usa',
    name: '미국',
    stack: 'docker',
    flag: '🇺🇸',
    coords: { x: 20, y: 35 },
    description: 'Docker 컨테이너화 기술',
    color: 'from-blue-500 to-blue-700',
    cities: [
      {
        id: 'san-francisco',
        name: '샌프란시스코',
        coords: { x: 15, y: 40 },
        missions: [
          {
            id: 'docker-basics',
            title: 'Docker 기초: 첫 번째 컨테이너',
            difficulty: 'Beginner',
            estimatedTime: 30,
            prerequisites: [],
            rating: 4.8
          }
        ]
      },
      {
        id: 'new-york',
        name: '뉴욕',
        coords: { x: 25, y: 38 },
        missions: [
          {
            id: 'docker-compose',
            title: 'Docker Compose: 멀티 컨테이너',
            difficulty: 'Intermediate',
            estimatedTime: 45,
            prerequisites: ['Docker 기초'],
            rating: 4.7
          }
        ]
      }
    ]
  },
  {
    id: 'germany',
    name: '독일',
    stack: 'kubernetes',
    flag: '🇩🇪',
    coords: { x: 52, y: 30 },
    description: 'Kubernetes 오케스트레이션',
    color: 'from-red-500 to-yellow-500',
    cities: [
      {
        id: 'berlin',
        name: '베를린',
        coords: { x: 52, y: 32 },
        missions: [
          {
            id: 'k8s-deployments',
            title: 'Kubernetes 배포 마스터',
            difficulty: 'Intermediate',
            estimatedTime: 60,
            prerequisites: ['Docker 기초'],
            rating: 4.9
          }
        ]
      },
      {
        id: 'munich',
        name: '뮌헨',
        coords: { x: 51, y: 35 },
        missions: [
          {
            id: 'k8s-services',
            title: 'Kubernetes 서비스 & 네트워킹',
            difficulty: 'Advanced',
            estimatedTime: 75,
            prerequisites: ['K8s 배포'],
            rating: 4.6
          }
        ]
      }
    ]
  },
  {
    id: 'japan',
    name: '일본',
    stack: 'argocd',
    flag: '🇯🇵',
    coords: { x: 85, y: 38 },
    description: 'ArgoCD GitOps',
    color: 'from-pink-500 to-rose-500',
    cities: [
      {
        id: 'tokyo',
        name: '도쿄',
        coords: { x: 85, y: 40 },
        missions: [
          {
            id: 'argocd-basics',
            title: 'ArgoCD GitOps 입문',
            difficulty: 'Intermediate',
            estimatedTime: 50,
            prerequisites: ['K8s 기초'],
            rating: 4.8
          }
        ]
      }
    ]
  },
  {
    id: 'uk',
    name: '영국',
    stack: 'helm',
    flag: '🇬🇧',
    coords: { x: 48, y: 28 },
    description: 'Helm 패키지 관리',
    color: 'from-indigo-500 to-purple-500',
    cities: [
      {
        id: 'london',
        name: '런던',
        coords: { x: 48, y: 30 },
        missions: [
          {
            id: 'helm-basics',
            title: 'Helm Charts 마스터',
            difficulty: 'Advanced',
            estimatedTime: 65,
            prerequisites: ['K8s 배포'],
            rating: 4.7
          }
        ]
      }
    ]
  },
  {
    id: 'brazil',
    name: '브라질',
    stack: 'kafka',
    flag: '🇧🇷',
    coords: { x: 30, y: 65 },
    description: 'Apache Kafka 스트리밍',
    color: 'from-green-500 to-yellow-400',
    cities: [
      {
        id: 'sao-paulo',
        name: '상파울루',
        coords: { x: 30, y: 67 },
        missions: [
          {
            id: 'kafka-basics',
            title: 'Kafka 이벤트 스트리밍',
            difficulty: 'Intermediate',
            estimatedTime: 55,
            prerequisites: ['Docker 기초'],
            rating: 4.5
          }
        ]
      }
    ]
  }
]

export const ANIMATION_DURATIONS = {
  CLOUD_TRANSITION: 800,
  PLANE_FLIGHT: 2500,
  MODAL_LOADING: 15000,
  MODAL_TRANSITION: 14000
} as const

export const COMMON_COMMANDS = [
  "kubectl get pods", 
  "kubectl get deployments", 
  "kubectl apply -f", 
  "ls -la", 
  "cat"
] as const