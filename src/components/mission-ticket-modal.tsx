"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Plane, 
  Clock, 
  Star, 
  MapPin, 
  Users,
  CheckCircle2,
  X,
  Ticket,
  QrCode
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Mission {
  id: string
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: number
  prerequisites: string[]
  rating: number
}

interface City {
  id: string
  name: string
  missions: Mission[]
  coords: { x: number; y: number }
}

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

interface MissionTicketModalProps {
  mission: Mission
  city: City
  country: Country
  isOpen: boolean
  onClose: () => void
}

const difficultyConfig = {
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

export function MissionTicketModal({ 
  mission, 
  city, 
  country, 
  isOpen, 
  onClose 
}: MissionTicketModalProps) {
  const [isBooking, setIsBooking] = useState(false)
  
  const difficultyInfo = difficultyConfig[mission.difficulty]
  const currentDate = new Date().toLocaleDateString('ko-KR')
  const flightNumber = `DT${Math.floor(Math.random() * 9000) + 1000}`
  const gate = `G${Math.floor(Math.random() * 50) + 1}`
  const seat = `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`

  const handleBooking = () => {
    setIsBooking(true)
    setTimeout(() => {
      setIsBooking(false)
      window.location.href = `/missions/${country.stack}/${mission.id}`
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
        <div className="relative animate-fade-in-scale">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-12 right-0 z-50 bg-white/10 backdrop-blur hover:bg-white/20 text-white border border-white/20 rounded-full"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
            <div className="relative">
              {/* 헤더 - 항공사 정보 */}
              <div className={cn(
                "relative overflow-hidden px-8 py-6 bg-gradient-to-r",
                country.color
              )}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                        <Plane className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">DevTrip Airlines</h2>
                        <p className="text-blue-100 text-sm">DevOps Learning Journey</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-white">
                    <p className="text-sm opacity-80">탑승권 • BOARDING PASS</p>
                    <p className="font-mono text-lg font-bold">{flightNumber}</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                {/* 메인 티켓 섹션 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* 메인 티켓 정보 */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl animate-float">{country.flag}</span>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-800">{mission.title}</h3>
                          <p className="text-gray-600 text-lg">{country.description}</p>
                        </div>
                      </div>
                      <Badge className={cn("px-4 py-2 text-sm font-bold", difficultyInfo.color)}>
                        {difficultyInfo.label}
                      </Badge>
                    </div>

                    {/* 출발지-목적지 정보 */}
                    <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">출발지 • FROM</p>
                        <p className="text-3xl font-bold text-gray-800">ICN</p>
                        <p className="text-sm text-gray-600">인천국제공항</p>
                        <p className="text-xs text-gray-400 mt-1">Seoul, Korea</p>
                      </div>
                      
                      <div className="flex-1 mx-8 relative">
                        <div className="h-px bg-gradient-to-r from-gray-300 via-blue-400 to-gray-300 relative">
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 border-2 border-blue-400">
                            <Plane className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">예상 비행시간: {mission.estimatedTime}분</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">목적지 • TO</p>
                        <p className="text-3xl font-bold text-gray-800">{city.name.substring(0, 3).toUpperCase()}</p>
                        <p className="text-sm text-gray-600">{city.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{country.name}</p>
                      </div>
                    </div>

                    {/* 미션 세부 정보 */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="text-sm text-gray-500">평점</p>
                            <p className="font-semibold text-gray-800">{mission.rating}/5.0</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">예상 소요시간</p>
                            <p className="font-semibold text-gray-800">{mission.estimatedTime}분</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-500">기술 스택</p>
                            <p className="font-semibold text-gray-800 uppercase">{country.stack}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="text-sm text-gray-500">난이도</p>
                            <p className="font-semibold text-gray-800">{difficultyInfo.label}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 선수 과목 */}
                    {mission.prerequisites.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">선수 과목 • Prerequisites</p>
                        <div className="flex flex-wrap gap-2">
                          {mission.prerequisites.map((prereq) => (
                            <Badge 
                              key={prereq} 
                              variant="secondary" 
                              className="bg-blue-100 text-blue-700 border border-blue-200"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 탑승권 스텁 */}
                  <div className="lg:col-span-1">
                    <div className="h-full bg-gradient-to-b from-gray-100 to-white border-2 border-dashed border-gray-300 rounded-2xl p-6 relative overflow-hidden">
                      {/* 장식용 원형 컷아웃 */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-dashed border-gray-300"></div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-dashed border-gray-300"></div>
                      
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-6">
                            <Ticket className="w-5 h-5 text-primary" />
                            <p className="font-semibold text-gray-700">탑승 정보</p>
                          </div>
                          
                          <div className="space-y-4 text-sm">
                            <div className="border-b border-gray-200 pb-3">
                              <p className="text-gray-500">항공편</p>
                              <p className="font-mono font-bold text-gray-800 text-lg">{flightNumber}</p>
                            </div>
                            <div className="border-b border-gray-200 pb-3">
                              <p className="text-gray-500">날짜</p>
                              <p className="font-semibold text-gray-800">{currentDate}</p>
                            </div>
                            <div className="border-b border-gray-200 pb-3">
                              <p className="text-gray-500">좌석</p>
                              <p className="font-mono font-bold text-gray-800">{seat}</p>
                            </div>
                            <div className="border-b border-gray-200 pb-3">
                              <p className="text-gray-500">게이트</p>
                              <p className="font-mono font-bold text-gray-800">{gate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">클래스</p>
                              <p className="font-semibold text-gray-800">DevOps Premium</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center mt-6">
                          <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3 animate-pulse">
                            <QrCode className="w-12 h-12 text-white" />
                          </div>
                          <p className="text-xs text-gray-500">Mobile Boarding Pass</p>
                          <p className="text-xs text-gray-400 mt-1">Scan at gate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* 액션 버튼들 */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 py-6 text-lg border-2 hover:bg-gray-50"
                    disabled={isBooking}
                  >
                    나중에 예약
                  </Button>
                  <Button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className={cn(
                      "flex-1 py-6 text-lg font-bold text-white shadow-lg hover:scale-105 transition-all",
                      "bg-gradient-to-r", difficultyInfo.gradient,
                      isBooking && "animate-pulse"
                    )}
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        탑승 준비 중...
                      </>
                    ) : (
                      <>
                        <Plane className="w-5 h-5 mr-3" />
                        지금 탑승하기
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}