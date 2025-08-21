"use client"
import { useState } from "react"
import { WorldMap } from "@/components/world-map"
import { MissionTicketModal } from "@/components/mission-ticket-modal"

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
      <div className="h-full">
        {/* 세계지도 섹션 - 전체 화면 */}
        <div className="h-full min-h-[800px] relative">
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
