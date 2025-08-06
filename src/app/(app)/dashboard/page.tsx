"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { ArrowRight, BookOpen, Target, CheckCircle, Clock, Award, Star } from "lucide-react"

const chartData = [
  { name: "Docker", completed: 4 },
  { name: "K8s", completed: 2 },
  { name: "ArgoCD", completed: 1 },
  { name: "Jenkins", completed: 0 },
  { name: "Kafka", completed: 0 },
  { name: "Helm", completed: 1 },
];

const scoreHistoryData = [
  { mission: "Docker#1", score: 85 },
  { mission: "Docker#2", score: 91 },
  { mission: "K8s#1", score: 88 },
  { mission: "K8s#2", score: 95 },
  { mission: "ArgoCD#1", score: 92 },
  { mission: "Helm#1", score: 89 },
  { mission: "Docker#3", score: 98 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">다시 오신 것을 환영합니다, 모험가님!</h1>
        <p className="text-muted-foreground">여정 요약입니다. 다음 목적지로 떠날 준비가 되셨나요?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-primary/50 bg-gradient-to-br from-secondary/50 to-secondary/20 shadow-lg shadow-primary/10">
          <CardHeader>
            <CardTitle>여정 계속하기</CardTitle>
            <CardDescription className="text-muted-foreground">다음 미션이 독일에서 기다리고 있습니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">쿠버네티스 기초: 배포</h3>
                <p className="text-sm text-muted-foreground">난이도: 중급</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={45} className="w-full h-2 bg-primary/10 [&>div]:bg-primary" />
              <p className="text-xs text-right mt-1 text-muted-foreground">45% 완료</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" asChild className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <Link href="/missions/kubernetes/k8s-deployments">
                미션 재개 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-secondary/50 border-border/50">
            <CardHeader className="p-4">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">완료된 미션</p>
            </CardContent>
          </Card>
           <Card className="bg-secondary/50 border-border/50">
            <CardHeader className="p-4">
              <CheckCircle className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">평균 점수</p>
            </CardContent>
          </Card>
           <Card className="bg-secondary/50 border-border/50">
            <CardHeader className="p-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">24<span className="text-lg">시간</span></div>
              <p className="text-xs text-muted-foreground">총 학습 시간</p>
            </CardContent>
          </Card>
           <Card className="bg-secondary/50 border-border/50">
            <CardHeader className="p-4">
              <Award className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">획득한 뱃지</p>
            </CardContent>
          </Card>
        </div>
      </div>

       <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3 bg-secondary/50 border-border/50">
          <CardHeader>
            <CardTitle>미션 진행률</CardTitle>
            <CardDescription>기술 스택별 완료된 미션 수입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} stroke="hsl(var(--muted-foreground))"/>
                  <YAxis tickLine={false} axisLine={false} tickMargin={10} stroke="hsl(var(--muted-foreground))"/>
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--primary) / 0.1)', radius: 'var(--radius)' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 bg-secondary/50 border-border/50">
            <CardHeader>
                <CardTitle>점수 이력</CardTitle>
                <CardDescription>최근 미션들의 성취도 변화입니다.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={scoreHistoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="mission" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} stroke="hsl(var(--muted-foreground))"/>
                            <YAxis domain={[70, 100]} tickLine={false} axisLine={false} tickMargin={10} stroke="hsl(var(--muted-foreground))"/>
                            <Tooltip
                                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                                contentStyle={{
                                  backgroundColor: 'hsl(var(--background))',
                                  borderColor: 'hsl(var(--border))',
                                  borderRadius: 'var(--radius)',
                                  color: 'hsl(var(--foreground))'
                                }}
                            />
                            <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorScore)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
       </div>
    </div>
  )
}
