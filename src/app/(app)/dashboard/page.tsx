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
} from "recharts"
import { ArrowRight, BookOpen, Target, CheckCircle, Clock } from "lucide-react"

const chartData = [
  { name: "Docker", completed: 4 },
  { name: "K8s", completed: 2 },
  { name: "ArgoCD", completed: 1 },
  { name: "Jenkins", completed: 0 },
  { name: "Kafka", completed: 0 },
  { name: "Helm", completed: 1 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Adventurer!</h1>
        <p className="text-muted-foreground">Here's your travel summary. Ready for the next destination?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Continue Your Journey</CardTitle>
            <CardDescription className="text-primary-foreground/80">Your next mission awaits in Germany.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-primary-foreground/20 p-3 rounded-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Kubernetes Fundamentals: Deployments</h3>
                <p className="text-sm text-primary-foreground/80">Difficulty: Intermediate</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={45} className="w-full h-2 bg-primary-foreground/20 [&>div]:bg-white" />
              <p className="text-xs text-right mt-1 text-primary-foreground/80">45% complete</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" asChild>
              <Link href="/missions/kubernetes/k8s-deployments">
                Resume Mission <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="p-4">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Missions Completed</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="p-4">
              <CheckCircle className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-3xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="p-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-3xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">Total Time</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="p-4">
              <Target className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Destinations Visited</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mission Progress</CardTitle>
          <CardDescription>Number of missions completed per technology stack.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--secondary))', radius: 'var(--radius)' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
