"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Ticket, 
  Clock, 
  Star, 
  Zap, 
  Gift,
  RefreshCw,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TicketSystemProps {
  onUseTicket: () => void
  canUseMission?: boolean
}

interface TicketState {
  total: number
  used: number
  remaining: number
  lastRefresh: Date
  nextRefreshTime: Date
}

export function TicketSystem({ onUseTicket, canUseMission = true }: TicketSystemProps) {
  const [ticketState, setTicketState] = useState<TicketState>(() => {
    // 로컬 스토리지에서 티켓 상태 불러오기
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devtrip-tickets')
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...parsed,
          lastRefresh: new Date(parsed.lastRefresh),
          nextRefreshTime: new Date(parsed.nextRefreshTime)
        }
      }
    }
    
    // 초기 상태: 5개 티켓, 다음 새로고침은 24시간 후
    const now = new Date()
    const nextRefresh = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    
    return {
      total: 5,
      used: 0,
      remaining: 5,
      lastRefresh: now,
      nextRefreshTime: nextRefresh
    }
  })

  const [timeUntilRefresh, setTimeUntilRefresh] = useState("")

  // 티켓 상태를 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('devtrip-tickets', JSON.stringify(ticketState))
  }, [ticketState])

  // 새로고침 시간 계산
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const timeDiff = ticketState.nextRefreshTime.getTime() - now.getTime()
      
      if (timeDiff <= 0) {
        // 티켓 새로고침
        setTicketState(prev => ({
          ...prev,
          used: 0,
          remaining: 5,
          lastRefresh: now,
          nextRefreshTime: new Date(now.getTime() + 24 * 60 * 60 * 1000)
        }))
        setTimeUntilRefresh("새로고침 완료!")
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeUntilRefresh(`${hours}시간 ${minutes}분 후`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // 1분마다 업데이트

    return () => clearInterval(interval)
  }, [ticketState.nextRefreshTime])

  const handleUseTicket = () => {
    if (ticketState.remaining > 0) {
      setTicketState(prev => ({
        ...prev,
        used: prev.used + 1,
        remaining: prev.remaining - 1
      }))
      onUseTicket()
    }
  }

  const renderTickets = () => {
    const tickets = []
    for (let i = 0; i < ticketState.total; i++) {
      const isUsed = i < ticketState.used
      tickets.push(
        <div
          key={i}
          className={cn(
            "relative w-16 h-20 rounded-lg border-2 transition-all duration-300 transform",
            isUsed 
              ? "bg-gray-200 border-gray-300 opacity-50 scale-95" 
              : "bg-gradient-to-br from-blue-400 to-purple-500 border-blue-300 shadow-lg hover:scale-105",
            "flex items-center justify-center"
          )}
        >
          <Ticket 
            className={cn(
              "w-8 h-8",
              isUsed ? "text-gray-400" : "text-white"
            )}
          />
          {isUsed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-16 bg-red-500 transform rotate-45 opacity-70"></div>
            </div>
          )}
        </div>
      )
    }
    return tickets
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-50 to-blue-50 border-blue-200">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Ticket className="w-6 h-6 text-blue-600" />
          <CardTitle className="text-xl text-slate-800">미션 티켓</CardTitle>
        </div>
        <CardDescription className="text-slate-600">
          미션을 시작하려면 티켓이 필요합니다
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 티켓 표시 */}
        <div className="flex justify-center gap-2 p-4 bg-white/50 rounded-lg">
          {renderTickets()}
        </div>

        {/* 티켓 정보 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">남은 티켓</span>
            <Badge variant={ticketState.remaining > 0 ? "default" : "destructive"} className="px-3">
              {ticketState.remaining} / {ticketState.total}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">사용률</span>
              <span className="text-slate-800 font-medium">
                {Math.round((ticketState.used / ticketState.total) * 100)}%
              </span>
            </div>
            <Progress 
              value={(ticketState.used / ticketState.total) * 100} 
              className="h-2"
            />
          </div>

          {/* 새로고침 정보 */}
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <div className="text-sm">
              <div className="text-yellow-800 font-medium">다음 새로고침</div>
              <div className="text-yellow-600">{timeUntilRefresh}</div>
            </div>
          </div>
        </div>

        {/* 미션 시작 버튼 */}
        <div className="space-y-3">
          {ticketState.remaining > 0 ? (
            <Button 
              onClick={handleUseTicket}
              disabled={!canUseMission}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              티켓 사용하여 미션 시작
            </Button>
          ) : (
            <div className="text-center space-y-2">
              <Button 
                disabled
                variant="outline"
                className="w-full border-gray-300 text-gray-500"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                티켓이 모두 소모되었습니다
              </Button>
              <p className="text-xs text-gray-500">
                새로운 티켓을 받으려면 {timeUntilRefresh} 기다려주세요
              </p>
            </div>
          )}
        </div>

        {/* 티켓 획득 방법 안내 */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">티켓 획득 방법</span>
          </div>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• 매일 자정에 5개 티켓 자동 충전</li>
            <li>• 미션 완료 시 보너스 티켓 획득 가능</li>
            <li>• 특별 이벤트를 통한 추가 획득</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}