"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  Calendar, 
  Trophy, 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle,
  Clock,
  Zap,
  AlertTriangle
} from "lucide-react"

interface UserProgressData {
  date: string
  mission_title: string
  mission_type: string
  mission_difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  overall_score: number
  correctness_score: number
  efficiency_score: number
  quality_score: number
  cumulative_stamps: number
  cumulative_points: number
  moving_avg_score: number
  score_improvement: number
  commands_executed: number
  error_commands: number
  error_rate: number
}

interface UserProgressTrackerProps {
  data: UserProgressData[]
  title?: string
}

export function UserProgressTracker({ data, title = "학습 진행도" }: UserProgressTrackerProps) {
  // 학습 통계 계산
  const totalMissions = data.length
  const avgScore = data.reduce((sum, item) => sum + item.overall_score, 0) / totalMissions
  const totalPoints = data[0]?.cumulative_points || 0
  const totalStamps = data[0]?.cumulative_stamps || 0
  
  // 최근 성과 분석
  const recentData = data.slice(0, 3)
  const avgRecentScore = recentData.reduce((sum, item) => sum + item.overall_score, 0) / recentData.length
  const isImproving = avgRecentScore > avgScore

  // 난이도별 통계
  const difficultyStats = data.reduce((acc, item) => {
    const key = item.mission_difficulty
    if (!acc[key]) {
      acc[key] = { count: 0, totalScore: 0, avgScore: 0 }
    }
    acc[key].count += 1
    acc[key].totalScore += item.overall_score
    acc[key].avgScore = acc[key].totalScore / acc[key].count
    return acc
  }, {} as Record<string, any>)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'text-green-400 bg-green-500/10 border-green-500/30'
      case 'INTERMEDIATE': return 'text-orange-400 bg-orange-500/10 border-orange-500/30'  
      case 'ADVANCED': return 'text-red-400 bg-red-500/10 border-red-500/30'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400'
    if (score >= 80) return 'text-blue-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getMissionTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'docker': return '🐳'
      case 'kubernetes': return '☸️'
      case 'ci_cd': return '🔄'
      case 'terraform': return '🏗️'
      default: return '⚙️'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 전체 성과 요약 */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalMissions}</div>
            <div className="text-xs text-slate-400">완료 미션</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{avgScore.toFixed(1)}</div>
            <div className="text-xs text-slate-400">평균 점수</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{totalStamps}</div>
            <div className="text-xs text-slate-400">획득 스탬프</div>
          </div>
        </div>

        {/* 성과 트렌드 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">최근 성과 트렌드</h4>
            <div className="flex items-center gap-2">
              {isImproving ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
              )}
              <span className={`text-sm font-medium ${isImproving ? 'text-emerald-400' : 'text-red-400'}`}>
                {isImproving ? '향상' : '하락'} 추세
              </span>
            </div>
          </div>

          {/* 점수 차트 */}
          <div className="relative h-24 p-4 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/20">
            <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* 진행도 라인 */}
              <path
                d={`M ${data.slice(0, 10).reverse().map((point, index) => {
                  const x = (index / 9) * 400
                  const y = 80 - (point.moving_avg_score * 0.8)
                  return index === 0 ? `M ${x},${y}` : `L ${x},${y}`
                }).join(' ')}`}
                stroke="rgb(99, 102, 241)"
                strokeWidth="2"
                fill="none"
              />
              
              {/* 영역 채우기 */}
              <path
                d={`M ${data.slice(0, 10).reverse().map((point, index) => {
                  const x = (index / 9) * 400
                  const y = 80 - (point.moving_avg_score * 0.8)
                  return index === 0 ? `M ${x},${y}` : `L ${x},${y}`
                }).join(' ')} L 400,80 L 0,80 Z`}
                fill="url(#progressGradient)"
              />
            </svg>
          </div>
        </div>

        {/* 난이도별 성과 */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">난이도별 성과</h4>
          <div className="grid gap-3">
            {Object.entries(difficultyStats).map(([difficulty, stats]) => (
              <div key={difficulty} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/20 border border-slate-600/30">
                <div className="flex items-center gap-3">
                  <Badge className={getDifficultyColor(difficulty)}>
                    {difficulty}
                  </Badge>
                  <span className="text-slate-400 text-sm">{stats.count}회 완료</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(stats.avgScore)}`}>
                      {stats.avgScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-400">평균점</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 활동 내역 */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">최근 활동</h4>
          <div className="space-y-3">
            {data.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/20 border border-slate-600/30 hover:bg-slate-700/30 transition-colors">
                <div className="text-2xl">{getMissionTypeIcon(activity.mission_type)}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-white font-medium">{activity.mission_title}</h5>
                    <Badge className={getDifficultyColor(activity.mission_difficulty)} size="sm">
                      {activity.mission_difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {activity.commands_executed}개 명령어
                    </span>
                    {activity.error_commands > 0 && (
                      <span className="flex items-center gap-1 text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        {activity.error_rate.toFixed(1)}% 오류
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(activity.overall_score)}`}>
                    {activity.overall_score}
                  </div>
                  {activity.score_improvement !== 0 && (
                    <div className={`text-xs ${activity.score_improvement > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {activity.score_improvement > 0 ? '+' : ''}{activity.score_improvement}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 성장 지표 */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">성장 지표</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">완료율</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {((totalMissions / (totalMissions + 2)) * 100).toFixed(1)}%
              </div>
              <Progress value={((totalMissions / (totalMissions + 2)) * 100)} className="h-2" />
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">효율성</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {(data.reduce((sum, item) => sum + item.efficiency_score, 0) / totalMissions).toFixed(1)}
              </div>
              <Progress value={data.reduce((sum, item) => sum + item.efficiency_score, 0) / totalMissions} className="h-2" />
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-medium">품질</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {(data.reduce((sum, item) => sum + item.quality_score, 0) / totalMissions).toFixed(1)}
              </div>
              <Progress value={data.reduce((sum, item) => sum + item.quality_score, 0) / totalMissions} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}