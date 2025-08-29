"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import type { Mission } from "./mission-ticket"
import { Cpu, MemoryStick, ArrowRight, ChevronsRight, FileCode, CheckSquare } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { TerminalComponent, type TerminalRef } from "./terminal"

interface MissionViewProps {
  mission: Mission & { description: string; steps: { title: string; content: string }[] }
}

// Grafana 스타일 메트릭 데이터
const cpuData = [
  { time: '10:00', value: 23.5 },
  { time: '10:01', value: 26.2 },
  { time: '10:02', value: 31.8 },
  { time: '10:03', value: 28.9 },
  { time: '10:04', value: 35.2 },
  { time: '10:05', value: 42.1 },
  { time: '10:06', value: 38.7 },
  { time: '10:07', value: 33.4 }
];

const memoryData = [
  { time: '10:00', value: 68.3 },
  { time: '10:01', value: 71.2 },
  { time: '10:02', value: 73.8 },
  { time: '10:03', value: 69.5 },
  { time: '10:04', value: 75.9 },
  { time: '10:05', value: 78.2 },
  { time: '10:06', value: 76.1 },
  { time: '10:07', value: 72.8 }
];

const networkData = [
  { time: '10:00', in: 125.3, out: 89.7 },
  { time: '10:01', in: 134.8, out: 95.2 },
  { time: '10:02', in: 142.1, out: 102.8 },
  { time: '10:03', in: 138.6, out: 98.4 },
  { time: '10:04', in: 156.2, out: 112.3 },
  { time: '10:05', in: 163.9, out: 118.7 },
  { time: '10:06', in: 159.4, out: 115.2 },
  { time: '10:07', in: 148.7, out: 107.9 }
];

const diskData = [
  { time: '10:00', read: 45.2, write: 23.8 },
  { time: '10:01', read: 52.6, write: 28.3 },
  { time: '10:02', read: 48.9, write: 31.7 },
  { time: '10:03', read: 41.3, write: 25.9 },
  { time: '10:04', read: 58.7, write: 35.2 },
  { time: '10:05', read: 62.1, write: 39.8 },
  { time: '10:06', read: 56.4, write: 33.6 },
  { time: '10:07', read: 49.8, write: 29.4 }
];

const commonCommands = ["kubectl get pods", "kubectl get deployments", "kubectl apply -f", "ls -la", "cat"];

export function MissionView({ mission }: MissionViewProps) {
  const router = useRouter();
  const [terminalInput, setTerminalInput] = useState("");
  const terminalRef = useRef<TerminalRef>(null);

  const handleCommandClick = (command: string) => {
    terminalRef.current?.sendCommand(command)
  }

  const handleSubmit = () => {
    // In a real app, you would save the state and then navigate.
    router.push(`/evaluation`);
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-full">
      {/* Left Panel: Mission Details */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>{mission.title}</CardTitle>
          <CardDescription>{mission.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          <p className="text-sm font-semibold mb-2 flex items-center gap-2"><CheckSquare className="h-4 w-4 text-primary" /> 미션 목표</p>
          <ScrollArea className="flex-1 pr-4 -mr-4">
            <Accordion type="single" collapsible defaultValue="item-0">
              {mission.steps.map((step, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{step.title}</AccordionTrigger>
                  <AccordionContent>{step.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right Panel: Terminal and Monitoring */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><FileCode className="h-6 w-6" /> 실습 터미널</CardTitle>
                        <CardDescription>실제 터미널 환경에서 명령을 실행하세요.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            임시 저장
                        </Button>
                        <Button size="sm" onClick={handleSubmit}>
                            평가를 위해 제출
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <TerminalComponent ref={terminalRef} className="flex-1" />
                <div>
                    <p className="text-xs text-muted-foreground mb-2">자주 쓰는 명령어</p>
                    <div className="flex flex-wrap gap-2">
                        {commonCommands.map(cmd => (
                            <Button key={cmd} variant="outline" size="sm" onClick={() => handleCommandClick(cmd)}>{cmd}</Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
        
        {/* Grafana 스타일 메트릭 대시보드 */}
        <div className="grid grid-cols-2 gap-4">
          {/* CPU 사용률 */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-200">CPU Usage</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {cpuData[cpuData.length - 1].value.toFixed(1)}%
              </div>
            </CardHeader>
            <CardContent className="h-[120px] p-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cpuData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#cpuGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 메모리 사용률 */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-200">Memory Usage</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {memoryData[memoryData.length - 1].value.toFixed(1)}%
              </div>
            </CardHeader>
            <CardContent className="h-[120px] p-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memoryData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#memoryGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 네트워크 I/O */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-200">Network I/O</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-slate-400">In:</span>
                  <span className="ml-1 font-semibold text-purple-400">
                    {networkData[networkData.length - 1].in.toFixed(1)} MB/s
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Out:</span>
                  <span className="ml-1 font-semibold text-orange-400">
                    {networkData[networkData.length - 1].out.toFixed(1)} MB/s
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[120px] p-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={networkData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="networkInGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="networkOutGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="in" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    fill="url(#networkInGradient)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="out" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    fill="url(#networkOutGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 디스크 I/O */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-200">Disk I/O</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Read:</span>
                  <span className="ml-1 font-semibold text-cyan-400">
                    {diskData[diskData.length - 1].read.toFixed(1)} MB/s
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Write:</span>
                  <span className="ml-1 font-semibold text-yellow-400">
                    {diskData[diskData.length - 1].write.toFixed(1)} MB/s
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[120px] p-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={diskData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="diskReadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="diskWriteGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="read" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    fill="url(#diskReadGradient)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="write" 
                    stroke="#eab308" 
                    strokeWidth={2}
                    fill="url(#diskWriteGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
