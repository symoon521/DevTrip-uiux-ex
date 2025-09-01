"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Plus, 
  Copy, 
  Check, 
  Crown, 
  UserPlus,
  LogOut,
  Settings,
  Code,
  Share2,
  Trophy,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Team {
  id: string
  name: string
  code: string
  leader: string
  members: TeamMember[]
  createdAt: Date
  description?: string
  stats: {
    missionsCompleted: number
    totalScore: number
    averageScore: number
  }
}

interface TeamMember {
  id: string
  name: string
  avatar?: string
  joinedAt: Date
  role: 'leader' | 'member'
  stats: {
    missionsCompleted: number
    totalScore: number
    level: number
  }
}

export function TeamSystem() {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const [joinCode, setJoinCode] = useState("")
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamDescription, setNewTeamDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // 로컬 스토리지에서 팀 정보 불러오기
  useEffect(() => {
    const savedTeam = localStorage.getItem('devtrip-team')
    if (savedTeam) {
      const team = JSON.parse(savedTeam)
      setCurrentTeam({
        ...team,
        createdAt: new Date(team.createdAt),
        members: team.members.map((member: any) => ({
          ...member,
          joinedAt: new Date(member.joinedAt)
        }))
      })
    }
  }, [])

  // 팀 정보를 로컬 스토리지에 저장
  const saveTeam = (team: Team) => {
    localStorage.setItem('devtrip-team', JSON.stringify(team))
    setCurrentTeam(team)
  }

  // 팀 생성
  const createTeam = async () => {
    if (!newTeamName.trim()) return

    setIsCreating(true)
    
    // 시뮬레이션 딜레이
    await new Promise(resolve => setTimeout(resolve, 1500))

    const teamCode = generateTeamCode()
    const newTeam: Team = {
      id: `team_${Date.now()}`,
      name: newTeamName,
      code: teamCode,
      leader: "current_user",
      description: newTeamDescription,
      createdAt: new Date(),
      members: [
        {
          id: "current_user",
          name: "나",
          joinedAt: new Date(),
          role: 'leader',
          stats: {
            missionsCompleted: 5,
            totalScore: 850,
            level: 3
          }
        }
      ],
      stats: {
        missionsCompleted: 5,
        totalScore: 850,
        averageScore: 85
      }
    }

    saveTeam(newTeam)
    setNewTeamName("")
    setNewTeamDescription("")
    setIsCreating(false)
  }

  // 팀 참가
  const joinTeam = async () => {
    if (!joinCode.trim()) return

    setIsJoining(true)
    
    // 시뮬레이션 딜레이
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 실제로는 서버에서 코드를 확인하지만 데모용으로 시뮬레이션
    const mockTeam: Team = {
      id: `team_${Date.now()}`,
      name: "개발자들의 여행",
      code: joinCode,
      leader: "team_leader",
      description: "함께 성장하는 DevOps 팀",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7일 전
      members: [
        {
          id: "team_leader",
          name: "김팀장",
          avatar: "https://placehold.co/100x100.png",
          joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          role: 'leader',
          stats: {
            missionsCompleted: 12,
            totalScore: 1200,
            level: 5
          }
        },
        {
          id: "member1",
          name: "박개발",
          avatar: "https://placehold.co/100x100.png",
          joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          role: 'member',
          stats: {
            missionsCompleted: 8,
            totalScore: 950,
            level: 4
          }
        },
        {
          id: "member2",
          name: "이코더",
          joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          role: 'member',
          stats: {
            missionsCompleted: 6,
            totalScore: 720,
            level: 3
          }
        },
        {
          id: "current_user",
          name: "나",
          joinedAt: new Date(),
          role: 'member',
          stats: {
            missionsCompleted: 5,
            totalScore: 850,
            level: 3
          }
        }
      ],
      stats: {
        missionsCompleted: 31,
        totalScore: 3720,
        averageScore: 93
      }
    }

    saveTeam(mockTeam)
    setJoinCode("")
    setIsJoining(false)
  }

  // 팀 코드 생성
  const generateTeamCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  }

  // 팀 코드 복사
  const copyTeamCode = async () => {
    if (!currentTeam) return
    
    await navigator.clipboard.writeText(currentTeam.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // 팀 탈퇴
  const leaveTeam = () => {
    localStorage.removeItem('devtrip-team')
    setCurrentTeam(null)
  }

  if (currentTeam) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 팀 헤더 */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 border-blue-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">{currentTeam.name}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {currentTeam.description || "함께 성장하는 DevOps 팀"}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-lg font-bold text-white">{currentTeam.code}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyTeamCode}
                    className="h-8 w-8 p-0"
                  >
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{currentTeam.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{currentTeam.stats.averageScore}점</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 팀 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{currentTeam.members.length}</div>
              <div className="text-sm text-slate-400">팀원 수</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{currentTeam.stats.missionsCompleted}</div>
              <div className="text-sm text-slate-400">완료한 미션</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{currentTeam.stats.totalScore}</div>
              <div className="text-sm text-slate-400">총 점수</div>
            </CardContent>
          </Card>
        </div>

        {/* 팀원 목록 */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              팀원 ({currentTeam.members.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTeam.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{member.name}</span>
                        {member.role === 'leader' && (
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            <Crown className="w-3 h-3 mr-1" />
                            팀장
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-slate-400">
                        {member.joinedAt.toLocaleDateString()} 참가
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">레벨 {member.stats.level}</div>
                    <div className="text-xs text-slate-400">
                      {member.stats.missionsCompleted}개 미션 • {member.stats.totalScore}점
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 팀 관리 */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">팀 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                팀원 초대
              </Button>
              <Button variant="outline" className="flex-1">
                <Settings className="w-4 h-4 mr-2" />
                팀 설정
              </Button>
            </div>
            <Separator />
            <Button variant="destructive" onClick={leaveTeam} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              팀 탈퇴
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 border-blue-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-500 rounded-full">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">팀 기능</CardTitle>
          <CardDescription className="text-slate-300">
            팀을 만들거나 참가해서 함께 미션을 수행하세요
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="join" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="join">팀 참가</TabsTrigger>
              <TabsTrigger value="create">팀 생성</TabsTrigger>
            </TabsList>

            <TabsContent value="join" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="joinCode" className="text-slate-300">팀 코드</Label>
                <Input
                  id="joinCode"
                  placeholder="예: ABC123"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="text-center font-mono text-lg"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={joinTeam} 
                disabled={!joinCode.trim() || isJoining}
                className="w-full"
              >
                {isJoining ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    참가 중...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    팀 참가하기
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="create" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-slate-300">팀 이름</Label>
                <Input
                  id="teamName"
                  placeholder="예: DevOps 마스터즈"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamDescription" className="text-slate-300">팀 설명 (선택사항)</Label>
                <Input
                  id="teamDescription"
                  placeholder="예: 함께 성장하는 DevOps 팀"
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                />
              </div>
              <Button 
                onClick={createTeam} 
                disabled={!newTeamName.trim() || isCreating}
                className="w-full"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    생성 중...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    팀 생성하기
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}