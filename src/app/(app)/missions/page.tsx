"use client"
import { useState } from "react"
import { WorldMap } from "@/components/world-map"
import { MissionTicketModal } from "@/components/mission-ticket-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Plane } from "lucide-react"

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

export default function MissionsPage() {
  const [selectedMission, setSelectedMission] = useState<{
    mission: Mission
    city: City
    country: Country
  } | null>(null)

  const handleMissionSelect = (mission: Mission, city: City, country: Country) => {
    setSelectedMission({ mission, city, country })
  }

  const handleCloseModal = () => {
    setSelectedMission(null)
  }

  return (
    <>
      <div className="flex flex-col gap-8 h-full">
        {/* 헤더 섹션 */}
        <div className="relative overflow-hidden">
          <Card className="border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
            <CardContent className="relative z-10 p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                        WORLD TOUR
                      </Badge>
                      <h1 className="text-4xl font-bold leading-tight">DevOps 세계 여행</h1>
                    </div>
                  </div>
                  <p className="text-blue-100 text-lg max-w-2xl">
                    전 세계 기술의 본고장을 여행하며 DevOps 마스터가 되어보세요. 
                    각 국가는 고유한 기술 스택을 대표하며, 도시별로 특별한 미션이 기다리고 있습니다.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      <span>5개국 여행 가능</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>8개 도시 탐험</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-white/30 text-white">
                        실시간 미션
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="p-4 bg-white/10 rounded-xl backdrop-blur">
                    <p className="text-sm opacity-80 mb-1">항공편 상태</p>
                    <p className="text-2xl font-bold">ON TIME</p>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-400/30 mt-2">
                      Ready for Boarding
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 세계지도 섹션 */}
        <div className="flex-1 min-h-[700px] relative">
          <WorldMap onMissionSelect={handleMissionSelect} />
        </div>
      </div>
      
      {/* 미션 티켓 모달 */}
      {selectedMission && (
        <MissionTicketModal
          mission={selectedMission.mission}
          city={selectedMission.city}
          country={selectedMission.country}
          isOpen={!!selectedMission}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
