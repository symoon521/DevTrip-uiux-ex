"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server, Users, Clock, TrendingUp } from "lucide-react"

interface MissionTypePerformance {
  mission_type: string
  avg_score: number
  total_attempts: number
  success_rate: number
  avg_completion_time: number
}

interface MissionPerformanceChartProps {
  data: MissionTypePerformance[]
  title?: string
}

export function MissionPerformanceChart({ data, title = "미션 타입별 성과" }: MissionPerformanceChartProps) {
  const getMissionTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'docker': return '🐳'
      case 'kubernetes': return '☸️'
      case 'ci_cd': return '🔄'
      case 'terraform': return '🏗️'
      case 'monitoring': return '📊'
      default: return '⚙️'
    }
  }

  const getMissionTypeName = (type: string) => {
    switch (type) {
      case 'DOCKER': return 'Docker'
      case 'KUBERNETES': return 'Kubernetes' 
      case 'CI_CD': return 'CI/CD'
      case 'TERRAFORM': return 'Terraform'
      case 'MONITORING': return 'Monitoring'
      default: return type
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 85) return "text-emerald-400 bg-emerald-500/10"
    if (score >= 75) return "text-blue-400 bg-blue-500/10"
    if (score >= 65) return "text-yellow-400 bg-yellow-500/10"
    return "text-red-400 bg-red-500/10"
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 85) return "bg-emerald-500"
    if (rate >= 75) return "bg-blue-500"
    if (rate >= 65) return "bg-yellow-500"
    return "bg-red-500"
  }

  // 시간을 읽기 쉬운 형태로 변환
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-purple-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 전체 통계 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{data.length}</div>
            <div className="text-xs text-slate-400">미션 타입</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">
              {data.reduce((sum, item) => sum + item.total_attempts, 0)}
            </div>
            <div className="text-xs text-slate-400">총 시도</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">
              {(data.reduce((sum, item) => sum + item.success_rate, 0) / data.length).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-400">평균 성공률</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">
              {(data.reduce((sum, item) => sum + item.avg_score, 0) / data.length).toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">평균 점수</div>
          </div>
        </div>

        {/* 미션 타입별 상세 분석 */}
        <div className="space-y-4">
          {data.map((mission, index) => (
            <div key={mission.mission_type} className="p-6 rounded-xl bg-slate-700/20 border border-slate-600/30 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getMissionTypeIcon(mission.mission_type)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {getMissionTypeName(mission.mission_type)}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {mission.total_attempts}회 시도
                    </p>
                  </div>
                </div>
                
                {/* 점수 배지 */}
                <div className={`px-4 py-2 rounded-full ${getPerformanceColor(mission.avg_score)}`}>
                  <span className="font-bold text-lg">{mission.avg_score}</span>
                  <span className="text-sm opacity-75">점</span>
                </div>
              </div>

              {/* 성과 지표들 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      성공률
                    </span>
                    <span className="text-white font-medium">{mission.success_rate}%</span>
                  </div>
                  <div className="w-full bg-slate-600/50 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getSuccessRateColor(mission.success_rate)}`}
                      style={{ width: `${mission.success_rate}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      시도 횟수
                    </span>
                    <span className="text-white font-medium">{mission.total_attempts}</span>
                  </div>
                  <Progress 
                    value={Math.min((mission.total_attempts / Math.max(...data.map(d => d.total_attempts))) * 100, 100)} 
                    className="h-2" 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      평균 소요시간
                    </span>
                    <span className="text-white font-medium">
                      {formatTime(mission.avg_completion_time)}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((mission.avg_completion_time / Math.max(...data.map(d => d.avg_completion_time))) * 100, 100)} 
                    className="h-2" 
                  />
                </div>
              </div>

              {/* 난이도 지표 */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-slate-400">난이도:</span>
                {mission.avg_completion_time > 3000 && mission.avg_score < 75 ? (
                  <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">고급</Badge>
                ) : mission.avg_completion_time > 2000 || mission.avg_score < 80 ? (
                  <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30">중급</Badge>
                ) : (
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">초급</Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 성과 트렌드 차트 (간단한 막대 차트) */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">성과 비교</h4>
          <div className="space-y-3">
            {data.map((mission) => (
              <div key={`chart-${mission.mission_type}`} className="flex items-center gap-4">
                <div className="w-20 text-sm text-slate-400 text-right">
                  {getMissionTypeName(mission.mission_type)}
                </div>
                <div className="flex-1 relative">
                  <div className="w-full bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${mission.avg_score}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {mission.avg_score}점
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}