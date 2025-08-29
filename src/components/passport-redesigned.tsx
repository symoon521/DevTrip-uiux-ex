"use client"

import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Shield, Globe, Star, MapPin, User, Award, Badge, Zap, Target, Flame } from "lucide-react"

const completedMissions = [
  { 
    id: 1, 
    name: "Docker 기초", 
    country: "미국", 
    city: "San Francisco", 
    flag: "🇺🇸", 
    level: "초급",
    badge: { 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", 
      name: "Container Master", 
      bgColor: "from-green-400 to-green-600"
    }
  },
  { 
    id: 2, 
    name: "K8s 배포", 
    country: "독일", 
    city: "Berlin", 
    flag: "🇩🇪", 
    level: "중급",
    badge: { 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", 
      name: "Orchestration Expert", 
      bgColor: "from-orange-400 to-orange-600"
    }
  },
  { 
    id: 3, 
    name: "ArgoCD 동기화", 
    country: "일본", 
    city: "Tokyo", 
    flag: "🇯🇵", 
    level: "중급",
    badge: { 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
      name: "GitOps Specialist", 
      bgColor: "from-orange-400 to-orange-600"
    }
  },
  { 
    id: 4, 
    name: "Helm 템플릿", 
    country: "영국", 
    city: "London", 
    flag: "🇬🇧", 
    level: "고급",
    badge: { 
      icon: "https://cdn.jsdelivr.net/gh/cncf/artwork/projects/helm/icon/color/helm-icon-color.svg", 
      name: "Chart Captain", 
      bgColor: "from-red-400 to-red-600"
    }
  },
  { 
    id: 5, 
    name: "Kafka 스트림", 
    country: "브라질", 
    city: "São Paulo", 
    flag: "🇧🇷", 
    level: "고급",
    badge: { 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", 
      name: "Stream Architect", 
      bgColor: "from-red-400 to-red-600"
    }
  },
]

export function PassportRedesigned() {
  const [isClient, setIsClient] = useState(false)
  const [selectedMission, setSelectedMission] = useState<number | null>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 flex justify-center">
        <div className="w-full h-96 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl animate-pulse backdrop-blur-sm" />
      </div>
    )
  }

  const currentLevel = completedMissions.length >= 5 ? "Expert" : completedMissions.length >= 4 ? "Advanced" : completedMissions.length >= 2 ? "Intermediate" : "Beginner"

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
      {/* 헤더 카드 - 프로필 정보 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl border border-slate-700/50">
        {/* 글래스모피즘 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-emerald-500/10 backdrop-blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex items-center gap-8">
          {/* 프로필 이미지 */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full opacity-75 blur"></div>
            <Avatar className="relative w-24 h-24 border-4 border-white/20 shadow-xl">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                김
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* 프로필 정보 */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                김데브옵스
              </h2>
              <p className="text-slate-400 text-lg">DevOps Engineer</p>
            </div>
            
            {/* 레벨 및 포인트 */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">{currentLevel}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Globe className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">{completedMissions.length}개국 여행</span>
              </div>
            </div>
          </div>
          
          {/* 통계 카드들 */}
          <div className="hidden lg:flex gap-4">
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold text-emerald-400">{completedMissions.length}</div>
              <div className="text-sm text-slate-400">완료한 미션</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-400">4.8</div>
              <div className="text-sm text-slate-400">평균 점수</div>
            </div>
          </div>
        </div>
      </div>

      {/* 미션 카드들 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">방문한 국가</h3>
          <div className="text-sm text-slate-400">총 {completedMissions.length}개의 미션</div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {completedMissions.map((mission, index) => (
            <div 
              key={mission.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 shadow-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
                selectedMission === mission.id ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onClick={() => {
                if (selectedMission === mission.id) {
                  setSelectedMission(null)
                } else {
                  setSelectedMission(mission.id)
                }
              }}
            >
              {/* 글래스모피즘 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* 미세한 파티클 효과 */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              
              
              <div className="relative z-10 space-y-4">
                {/* 헤더 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{mission.flag}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {mission.name}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>{mission.city}, {mission.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 레벨 배지 */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    mission.level === '고급' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    mission.level === '중급' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {mission.level}
                  </div>
                </div>
                
                
                {/* 확장 정보 */}
                {selectedMission === mission.id && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    {/* 획득한 뱃지 표시 */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-700/30 to-slate-600/30 border border-slate-600/50">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${mission.badge.bgColor} flex items-center justify-center p-2 shadow-lg`}>
                        <img 
                          src={mission.badge.icon} 
                          alt={mission.badge.name}
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{mission.badge.name}</div>
                        <div className="text-sm text-slate-400">획득한 뱃지</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">완료 시간:</span>
                        <span className="ml-2 text-white">2시간 30분</span>
                      </div>
                      <div>
                        <span className="text-slate-400">난이도:</span>
                        <span className="ml-2 text-white">{mission.level}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">인증서:</span>
                        <span className="ml-2 text-emerald-400">발급 완료</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-4 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors border border-blue-500/30">
                        인증서 보기
                      </button>
                      <button className="flex-1 py-2 px-4 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30">
                        다시 도전
                      </button>
                    </div>
                  </div>
                )}
                
                {/* 호버 효과 인디케이터 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-b-2xl"></div>
                
                {/* 클릭 시 리플 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 미션 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">추천 미션</h3>
          <div className="text-sm text-slate-400">새로운 도전</div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 shadow-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🇰🇷</div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      Terraform 인프라
                    </h4>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>Seoul, 한국</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  고급
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-b-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 shadow-xl border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🇸🇬</div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      Monitoring 구축
                    </h4>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>Singapore, 싱가포르</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  중급
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-b-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}