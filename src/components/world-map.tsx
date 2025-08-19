"use client"
import { useState } from "react"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Globe, MapPin, Plane, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Country {
  id: string
  name: string
  stack: string
  flag: string
  coords: { x: number; y: number }
  description: string
  color: string
  cities: City[]
}

interface City {
  id: string
  name: string
  missions: Mission[]
  coords: { x: number; y: number }
}

interface Mission {
  id: string
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: number
  prerequisites: string[]
  rating: number
}

const countries: Country[] = [
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

interface WorldMapProps {
  onMissionSelect?: (mission: Mission, city: City, country: Country) => void
}

export function WorldMap({ onMissionSelect }: WorldMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country)
    setSelectedCity(null)
  }

  const handleCityClick = (city: City) => {
    setSelectedCity(city)
  }

  const handleMissionSelect = (mission: Mission) => {
    if (selectedCity && selectedCountry) {
      onMissionSelect?.(mission, selectedCity, selectedCountry)
    }
  }

  const handleBackToWorld = () => {
    setSelectedCountry(null)
    setSelectedCity(null)
  }

  const handleBackToCountry = () => {
    setSelectedCity(null)
  }

  // 도시의 미션 선택 화면
  if (selectedCity && selectedCountry) {
    return (
      <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToCountry}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {selectedCountry.name}로 돌아가기
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedCity.name}</h2>
                  <p className="text-blue-200">{selectedCountry.name} • {selectedCountry.stack.toUpperCase()}</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <MapPin className="w-3 h-3 mr-1" />
              목적지
            </Badge>
          </div>

          <div className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedCity.missions.map((mission) => (
              <Card 
                key={mission.id} 
                className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => handleMissionSelect(mission)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={mission.difficulty === 'Beginner' ? 'secondary' : mission.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {mission.difficulty === 'Beginner' ? '초급' : mission.difficulty === 'Intermediate' ? '중급' : '고급'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white font-medium">{mission.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-200 transition-colors">
                    {mission.title}
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    예상 소요시간: {mission.estimatedTime}분
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mission.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-blue-300 mb-2">선수 과목:</p>
                      <div className="flex flex-wrap gap-1">
                        {mission.prerequisites.map((prereq) => (
                          <Badge key={prereq} variant="outline" className="text-xs border-blue-400 text-blue-200">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMissionSelect(mission)
                    }}
                  >
                    <Plane className="w-4 h-4 mr-2" />
                    미션 시작하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 국가 선택 후 도시 목록 화면
  if (selectedCountry) {
    return (
      <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 p-8 h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToWorld}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                세계지도로 돌아가기
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-6xl">{selectedCountry.flag}</span>
                <div>
                  <h2 className="text-4xl font-bold text-white">{selectedCountry.name}</h2>
                  <p className="text-blue-200 text-xl">{selectedCountry.description}</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Globe className="w-3 h-3 mr-1" />
              {selectedCountry.cities.length}개 도시
            </Badge>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {selectedCountry.cities.map((city) => (
              <Card 
                key={city.id} 
                className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => handleCityClick(city)}
              >
                <CardHeader>
                  <CardTitle className="text-white text-2xl group-hover:text-blue-200 transition-colors flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {city.name}
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    {city.missions.length}개의 미션 이용 가능
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {city.missions.map((mission) => (
                      <div key={mission.id} className="flex items-center justify-between text-sm">
                        <span className="text-blue-100">{mission.title}</span>
                        <Badge 
                          variant={mission.difficulty === 'Beginner' ? 'secondary' : mission.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {mission.difficulty === 'Beginner' ? '초급' : mission.difficulty === 'Intermediate' ? '중급' : '고급'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
                  >
                    도시 탐험하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 메인 세계지도 화면
  return (
    <TooltipProvider>
      <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="World Map" 
            fill
            className="object-cover opacity-30"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-slate-900/50"></div>
        
        <div className="relative z-10 p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">DevOps 세계 여행</h2>
            <p className="text-blue-200">학습하고 싶은 기술의 본고장을 선택하세요</p>
          </div>
          
          <div className="relative h-[600px] w-full">
            {countries.map((country, i) => (
              <Tooltip key={country.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "absolute group transition-all duration-500 hover:scale-150 focus:outline-none focus:scale-150",
                      "animate-pulse hover:animate-none country-marker"
                    )}
                    style={{ 
                      left: `${country.coords.x}%`, 
                      top: `${country.coords.y}%`, 
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 0.2}s`,
                    }}
                    onClick={() => handleCountryClick(country)}
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <div className={cn(
                      "relative w-6 h-6 rounded-full shadow-2xl transition-all duration-300",
                      "bg-gradient-to-br", country.color,
                      "shadow-blue-500/50 group-hover:shadow-blue-400/80 animate-glow",
                      hoveredCountry === country.id && "scale-150 shadow-blue-400/80"
                    )}>
                      <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                      <div className={cn(
                        "absolute -inset-2 rounded-full border-2 border-white/30 transition-all duration-300",
                        "group-hover:border-white/60 group-hover:-inset-4",
                        hoveredCountry === country.id && "border-white/60 -inset-4"
                      )}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs">
                        {country.flag}
                      </div>
                    </div>
                    
                    <div className={cn(
                      "absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full",
                      "bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap",
                      "shadow-lg animate-fade-in-scale",
                      hoveredCountry === country.id && "opacity-100"
                    )}>
                      {country.name}
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900/90 backdrop-blur border-white/20 text-white shadow-2xl">
                  <div className="text-center">
                    <p className="font-bold text-lg flex items-center gap-2">
                      {country.flag} {country.name}
                    </p>
                    <p className="text-sm text-blue-200">{country.description}</p>
                    <p className="text-xs text-blue-300 mt-1">
                      {country.cities.length}개 도시 • {country.cities.reduce((acc, city) => acc + city.missions.length, 0)}개 미션
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
            
            {/* 기술 스택 정보 카드 */}
            <div className="absolute bottom-4 left-4 animate-slide-in-bottom">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20 glass">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  이용 가능한 기술
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {countries.map((country) => (
                    <div key={country.id} className="flex items-center gap-2 text-blue-200">
                      <span>{country.flag}</span>
                      <span>{country.stack.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}