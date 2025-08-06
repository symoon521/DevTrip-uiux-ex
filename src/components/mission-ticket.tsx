"use client"

import Link from "next/link"
import { Plane, Clock, BarChart, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export type Mission = {
  id: string
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: number
  prerequisites: string[]
  stack: string
  city: string
}

interface MissionTicketProps {
  mission: Mission
}

const difficultyColors = {
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-red-500",
}

const difficultyKorean = {
    Beginner: "초급",
    Intermediate: "중급",
    Advanced: "고급",
}

export function MissionTicket({ mission }: MissionTicketProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex-row items-center justify-between p-4 bg-muted">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">DevTrip</span>
        </div>
        <div className="text-xs font-semibold text-muted-foreground">탑승권</div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-xs text-muted-foreground">목적지</p>
                <p className="text-2xl font-bold text-primary">{mission.city}</p>
            </div>
            <Plane className="h-8 w-8 text-muted-foreground" />
            <div>
                 <p className="text-xs text-muted-foreground text-right">출발지</p>
                 <p className="text-2xl font-bold">ICN</p>
            </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3 text-sm">
            <p className="font-semibold text-base">{mission.title}</p>
            <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                     <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${difficultyColors[mission.difficulty]}`}></span>
                        <span>{difficultyKorean[mission.difficulty]}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>~{mission.estimatedTime}분</span>
                </div>
            </div>
            {mission.prerequisites.length > 0 && (
                <div className="text-xs">
                    <span className="font-semibold">선수과목:</span> {mission.prerequisites.join(", ")}
                </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted">
        <Button className="w-full" asChild>
          <Link href={`/missions/${mission.stack}/${mission.id}`}>미션 시작</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
