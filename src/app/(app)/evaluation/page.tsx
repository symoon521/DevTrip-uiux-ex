"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Code, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Terminal,
  Award,
  BarChart3,
  FileText,
  Zap,
  Target,
  Globe,
  Users,
  Server
} from "lucide-react"

import { ScoreChart } from "@/components/evaluation/score-chart"
import { CommandSecurityRadar } from "@/components/evaluation/command-security-radar"
import { MissionPerformanceChart } from "@/components/evaluation/mission-performance-chart"
import { UserProgressTracker } from "@/components/evaluation/user-progress-tracker"

// Mock data based on the database schema
const mockEvaluationData = {
  user: {
    id: 1001,
    name: "김데브옵스",
    totalEvaluations: 15,
    completedEvaluations: 12,
    totalStamps: 8,
    totalPoints: 1250
  },
  recentEvaluation: {
    id: 1,
    mission_attempt_id: "550e8400-e29b-41d4-a716-446655440001",
    user_id: 1001,
    mission_id: 1,
    mission_title: "Docker 컨테이너 기초",
    mission_type: "DOCKER",
    mission_difficulty: "BEGINNER" as const,
    evaluation_status: "COMPLETED" as const,
    overall_score: 85,
    correctness_score: 90,
    efficiency_score: 80,
    quality_score: 85,
    code_quality_score: 90,
    security_score: 80,
    style_score: 85,
    feedback_summary: "Docker 컨테이너 생성과 기본 설정을 잘 이해하고 있습니다. 보안 설정을 추가하면 더 좋을 것 같습니다.",
    feedback_details: {
      strengths: ["올바른 베이스 이미지 선택", "적절한 포트 노출 설정", "명령어 구문이 정확함"],
      improvements: ["보안 강화 필요", "멀티스테이지 빌드 고려", "리소스 제한 설정 권장"],
      next_steps: ["Docker 보안 실습", "멀티스테이지 빌드 학습"]
    },
    commands_executed: 12,
    significant_commands: 8,
    error_commands: 1,
    total_execution_time_ms: 45000,
    evaluation_duration_ms: 2500,
    stamps_earned: 1,
    points_awarded: 100,
    created_at: "2024-01-15T14:30:00Z",
    updated_at: "2024-01-15T14:32:30Z"
  },
  commandAnalysis: [
    {
      id: 1,
      mission_attempt_id: "550e8400-e29b-41d4-a716-446655440001",
      ai_evaluation_id: 1,
      command: "docker build -t myapp .",
      command_category: "docker",
      correctness_assessment: "CORRECT" as const,
      efficiency_rating: 4,
      best_practice_score: 8,
      security_risk_level: "LOW" as const,
      ai_feedback: "올바른 Docker 빌드 명령어입니다. 태그명이 적절합니다.",
      improvement_suggestions: ["멀티스테이지 빌드 고려", "빌드 컨텍스트 최적화"],
      alternative_commands: ["docker build -t myapp:v1.0 .", "docker build --no-cache -t myapp ."],
      analysis_confidence: 0.92,
      created_at: "2024-01-15T14:30:00Z"
    },
    {
      id: 2,
      mission_attempt_id: "550e8400-e29b-41d4-a716-446655440001", 
      ai_evaluation_id: 1,
      command: "docker run -d -p 8080:8080 myapp",
      command_category: "docker",
      correctness_assessment: "CORRECT" as const,
      efficiency_rating: 4,
      best_practice_score: 7,
      security_risk_level: "MEDIUM" as const,
      ai_feedback: "컨테이너 실행 명령어가 적절합니다. 보안 설정을 추가하면 좋겠습니다.",
      improvement_suggestions: ["사용자 권한 제한", "리소스 제한 추가"],
      alternative_commands: ["docker run -d -p 8080:8080 --user 1000:1000 myapp"],
      analysis_confidence: 0.89,
      created_at: "2024-01-15T14:30:30Z"
    },
    {
      id: 3,
      mission_attempt_id: "550e8400-e29b-41d4-a716-446655440001",
      ai_evaluation_id: 1,
      command: "docker exec -it myapp /bin/sh",
      command_category: "docker", 
      correctness_assessment: "PARTIAL" as const,
      efficiency_rating: 3,
      best_practice_score: 6,
      security_risk_level: "HIGH" as const,
      ai_feedback: "디버깅 목적으로는 적절하나 프로덕션에서는 보안 위험이 있습니다.",
      improvement_suggestions: ["프로덕션 환경에서 사용 자제", "로그 기반 디버깅 고려"],
      alternative_commands: ["docker logs myapp", "docker inspect myapp"],
      analysis_confidence: 0.85,
      created_at: "2024-01-15T14:31:00Z"
    }
  ],
  evaluationHistory: [
    { date: "2024-01-15", score: 85, mission: "Docker 컨테이너 기초" },
    { date: "2024-01-10", score: 78, mission: "Kubernetes 배포" },
    { date: "2024-01-05", score: 82, mission: "CI/CD 파이프라인" },
    { date: "2023-12-28", score: 75, mission: "컨테이너 오케스트레이션" },
    { date: "2023-12-20", score: 88, mission: "모니터링 설정" },
    { date: "2023-12-15", score: 70, mission: "Terraform 인프라" },
    { date: "2023-12-10", score: 92, mission: "Jenkins 파이프라인" }
  ],
  missionTypeStats: [
    { mission_type: "DOCKER", avg_score: 82, total_attempts: 45, success_rate: 89, avg_completion_time: 1800 },
    { mission_type: "KUBERNETES", avg_score: 75, total_attempts: 32, success_rate: 78, avg_completion_time: 2400 },
    { mission_type: "CI_CD", avg_score: 80, total_attempts: 28, success_rate: 85, avg_completion_time: 3200 },
    { mission_type: "TERRAFORM", avg_score: 73, total_attempts: 21, success_rate: 71, avg_completion_time: 2800 }
  ]
}

export default function EvaluationPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const { user, recentEvaluation, commandAnalysis, evaluationHistory, missionTypeStats } = mockEvaluationData

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500"
    if (score >= 80) return "text-blue-500"  
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500/10"
    if (score >= 80) return "bg-blue-500/10"
    if (score >= 70) return "bg-yellow-500/10"
    return "bg-red-500/10"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW": return "text-emerald-500 bg-emerald-500/10"
      case "MEDIUM": return "text-yellow-500 bg-yellow-500/10" 
      case "HIGH": return "text-orange-500 bg-orange-500/10"
      case "CRITICAL": return "text-red-500 bg-red-500/10"
      default: return "text-gray-500 bg-gray-500/10"
    }
  }

  const getCorrectnessColor = (correctness: string) => {
    switch (correctness) {
      case "CORRECT": return "text-emerald-500 bg-emerald-500/10"
      case "PARTIAL": return "text-yellow-500 bg-yellow-500/10"
      case "INCORRECT": return "text-red-500 bg-red-500/10"
      default: return "text-gray-500 bg-gray-500/10"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER": return "text-green-500 bg-green-500/10 border-green-500/30"
      case "INTERMEDIATE": return "text-orange-500 bg-orange-500/10 border-orange-500/30"
      case "ADVANCED": return "text-red-500 bg-red-500/10 border-red-500/30"
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
              <Brain className="w-12 h-12 text-blue-400" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                AI 평가 시스템
              </h1>
              <p className="text-xl text-slate-400">
                DevOps 전문가 AI가 분석한 상세한 평가 결과
              </p>
            </div>
          </div>
        </div>

        {/* 사용자 개요 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 w-fit">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">총 평가</p>
                  <p className="text-3xl font-bold text-white">{user.totalEvaluations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 w-fit">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">완료 평가</p>
                  <p className="text-3xl font-bold text-white">{user.completedEvaluations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 w-fit">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">획득 스탬프</p>
                  <p className="text-3xl font-bold text-white">{user.totalStamps}</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* 메인 탭 인터페이스 */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-1 overflow-hidden">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              개요
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              명령어 분석
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              성과 분석
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              피드백
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 text-slate-300 data-[state=active]:text-white font-medium py-3">
              이력
            </TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-8">
            {/* 최근 평가 결과 */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  최근 평가 결과
                </CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  {recentEvaluation.mission_title} • {" "}
                  <Badge className={getDifficultyColor(recentEvaluation.mission_difficulty)}>
                    {recentEvaluation.mission_difficulty}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* 종합 점수 */}
                <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-blue-500/20">
                  <div className="text-6xl font-bold text-white mb-4">
                    {recentEvaluation.overall_score}
                  </div>
                  <div className="text-blue-400 font-semibold text-xl mb-6">종합 점수</div>
                  <div className="max-w-xs mx-auto">
                    <Progress 
                      value={recentEvaluation.overall_score} 
                      className="h-4 bg-slate-700/50" 
                    />
                  </div>
                </div>

                {/* 세부 점수들 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">
                      {recentEvaluation.correctness_score}
                    </div>
                    <div className="text-white font-medium mb-3">정확성</div>
                    <Progress value={recentEvaluation.correctness_score} className="h-3 bg-slate-700/50" />
                  </div>

                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {recentEvaluation.efficiency_score}
                    </div>
                    <div className="text-white font-medium mb-3">효율성</div>
                    <Progress value={recentEvaluation.efficiency_score} className="h-3 bg-slate-700/50" />
                  </div>

                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {recentEvaluation.quality_score}
                    </div>
                    <div className="text-white font-medium mb-3">품질</div>
                    <Progress value={recentEvaluation.quality_score} className="h-3 bg-slate-700/50" />
                  </div>
                </div>

                {/* 실행 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-slate-700/30 border border-slate-600/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{recentEvaluation.commands_executed}</div>
                    <div className="text-sm text-slate-400">총 명령어</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{recentEvaluation.significant_commands}</div>
                    <div className="text-sm text-slate-400">중요 명령어</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{recentEvaluation.error_commands}</div>
                    <div className="text-sm text-slate-400">오류 명령어</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{(recentEvaluation.evaluation_duration_ms! / 1000).toFixed(1)}s</div>
                    <div className="text-sm text-slate-400">평가 시간</div>
                  </div>
                </div>

                {/* 차트들 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ScoreChart data={evaluationHistory} title="점수 추이" />
                  <CommandSecurityRadar commands={commandAnalysis} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 명령어 분석 탭 */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  명령어 분석 결과
                </CardTitle>
                <CardDescription>
                  AI가 분석한 각 명령어의 상세 평가
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {commandAnalysis.map((cmd, index) => (
                  <div key={cmd.id} className="p-6 rounded-xl bg-slate-700/30 border border-slate-600/50 space-y-4">
                    {/* 명령어 헤더 */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-mono text-green-400 text-lg mb-2">
                          {cmd.command}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className={getCorrectnessColor(cmd.correctness_assessment)}>
                            {cmd.correctness_assessment}
                          </Badge>
                          <Badge className={getRiskColor(cmd.security_risk_level)}>
                            {cmd.security_risk_level} 위험
                          </Badge>
                          <div className="text-sm text-slate-400">
                            카테고리: {cmd.command_category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">신뢰도</div>
                        <div className="text-lg font-bold text-blue-400">
                          {(cmd.analysis_confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* 평가 점수들 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">효율성 등급</span>
                          <span className="text-white">{cmd.efficiency_rating}/5</span>
                        </div>
                        <Progress value={cmd.efficiency_rating * 20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">모범 사례 점수</span>
                          <span className="text-white">{cmd.best_practice_score}/10</span>
                        </div>
                        <Progress value={cmd.best_practice_score * 10} className="h-2" />
                      </div>
                    </div>

                    {/* AI 피드백 */}
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-blue-300 mb-1">AI 피드백</div>
                          <div className="text-slate-300 text-sm leading-relaxed">
                            {cmd.ai_feedback}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 개선 제안 */}
                    {cmd.improvement_suggestions && cmd.improvement_suggestions.length > 0 && (
                      <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                        <div className="text-sm font-medium text-orange-300 mb-2">개선 제안</div>
                        <ul className="text-slate-300 text-sm space-y-1">
                          {cmd.improvement_suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 대체 명령어 */}
                    {cmd.alternative_commands && cmd.alternative_commands.length > 0 && (
                      <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <div className="text-sm font-medium text-emerald-300 mb-2">대체 명령어</div>
                        <div className="space-y-1">
                          {cmd.alternative_commands.map((altCmd, idx) => (
                            <div key={idx} className="font-mono text-emerald-400 text-sm bg-slate-800/50 p-2 rounded">
                              {altCmd}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 보안 분석 차트 */}
            <CommandSecurityRadar commands={commandAnalysis} />
          </TabsContent>

          {/* 성과 분석 탭 */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MissionPerformanceChart data={missionTypeStats} />
              <UserProgressTracker data={[
                {
                  date: "2024-01-15",
                  mission_title: "Docker 컨테이너 기초",
                  mission_type: "DOCKER",
                  mission_difficulty: "BEGINNER",
                  overall_score: 85,
                  correctness_score: 90,
                  efficiency_score: 80,
                  quality_score: 85,
                  cumulative_stamps: 8,
                  cumulative_points: 1250,
                  moving_avg_score: 82,
                  score_improvement: 7,
                  commands_executed: 12,
                  error_commands: 1,
                  error_rate: 8.3
                },
                {
                  date: "2024-01-10",
                  mission_title: "Kubernetes 배포",
                  mission_type: "KUBERNETES",
                  mission_difficulty: "INTERMEDIATE",
                  overall_score: 78,
                  correctness_score: 85,
                  efficiency_score: 72,
                  quality_score: 77,
                  cumulative_stamps: 7,
                  cumulative_points: 1150,
                  moving_avg_score: 80,
                  score_improvement: -4,
                  commands_executed: 18,
                  error_commands: 3,
                  error_rate: 16.7
                },
                {
                  date: "2024-01-05",
                  mission_title: "CI/CD 파이프라인",
                  mission_type: "CI_CD",
                  mission_difficulty: "ADVANCED",
                  overall_score: 82,
                  correctness_score: 88,
                  efficiency_score: 76,
                  quality_score: 82,
                  cumulative_stamps: 6,
                  cumulative_points: 1000,
                  moving_avg_score: 78,
                  score_improvement: 2,
                  commands_executed: 25,
                  error_commands: 2,
                  error_rate: 8.0
                }
              ]} />
            </div>
          </TabsContent>

          {/* 피드백 탭 */}
          <TabsContent value="feedback" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  종합 피드백
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 요약 피드백 */}
                <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-3">AI 종합 평가</h3>
                      <p className="text-slate-300 leading-relaxed">
                        {recentEvaluation.feedback_summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 강점과 개선사항 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <h3 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      강점
                    </h3>
                    <ul className="space-y-2 text-slate-300">
                      {recentEvaluation.feedback_details.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                    <h3 className="font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      개선사항
                    </h3>
                    <ul className="space-y-2 text-slate-300">
                      {recentEvaluation.feedback_details.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 다음 단계 추천 */}
                <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    다음 단계 추천
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentEvaluation.feedback_details.next_steps.map((step, index) => (
                      <Button key={index} variant="outline" className="justify-start h-auto p-4 border-slate-600 hover:bg-slate-700">
                        <div className="text-left">
                          <div className="font-medium text-white">{step}</div>
                          <div className="text-sm text-slate-400">권장 학습 경로</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 이력 탭 */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  평가 이력
                </CardTitle>
                <CardDescription>
                  시간에 따른 학습 진행도와 점수 변화
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluationHistory.map((evaluation, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl ${getScoreBgColor(evaluation.score)} flex items-center justify-center`}>
                          <span className={`text-lg font-bold ${getScoreColor(evaluation.score)}`}>
                            {evaluation.score}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{evaluation.mission}</h4>
                        <p className="text-sm text-slate-400">{evaluation.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={evaluation.score} className="w-20 h-2" />
                        {index === 0 && (
                          <Badge className="bg-emerald-500/20 text-emerald-400">
                            최신
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 점수 추이 차트 */}
                <div className="mt-8">
                  <ScoreChart data={evaluationHistory} title="전체 학습 진행도" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}