"use client"

import { useState } from "react"
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

interface MissionViewProps {
  mission: Mission & { description: string; steps: { title: string; content: string }[] }
}

const monitoringData = [
  { time: '10:00', cpu: 20, memory: 45 },
  { time: '10:01', cpu: 22, memory: 48 },
  { time: '10:02', cpu: 25, memory: 50 },
  { time: '10:03', cpu: 23, memory: 47 },
  { time: '10:04', cpu: 30, memory: 55 },
  { time: '10:05', cpu: 35, memory: 60 },
];

const commonCommands = ["kubectl get pods", "kubectl get deployments", "kubectl apply -f", "ls -la", "cat"];

export function MissionView({ mission }: MissionViewProps) {
  const router = useRouter();
  const [terminalInput, setTerminalInput] = useState("");

  const handleCommandClick = (command: string) => {
    setTerminalInput(prev => `${prev}${prev ? '\n' : ''}${command} `)
  }

  const handleSubmit = () => {
    // In a real app, you would save the state and then navigate.
    router.push(`/missions/${mission.stack}/${mission.id}/assessment`);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
      {/* Left Panel: Mission Details */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>{mission.title}</CardTitle>
          <CardDescription>{mission.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          <p className="text-sm font-semibold mb-2 flex items-center gap-2"><CheckSquare className="h-4 w-4 text-primary" /> Mission Objectives</p>
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
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col">
            <CardHeader>
                 <CardTitle className="flex items-center gap-2"><FileCode className="h-6 w-6" /> Live Terminal</CardTitle>
                 <CardDescription>Execute commands in your sandboxed environment.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-white flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                        <ChevronsRight className="h-4 w-4 text-green-400"/>
                        <span>user@devtrip:~$</span>
                    </div>
                    <Textarea 
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="bg-transparent border-0 text-white resize-none flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                        placeholder="Enter your commands here..."
                    />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-2">Common Commands</p>
                    <div className="flex flex-wrap gap-2">
                        {commonCommands.map(cmd => (
                            <Button key={cmd} variant="outline" size="sm" onClick={() => handleCommandClick(cmd)}>{cmd}</Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Monitoring</CardTitle>
            <CardDescription>Real-time resource usage of your environment.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monitoringData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={12} unit="%" />
                    <Tooltip contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}/>
                    <Area type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCpu)" name="CPU" unit="%" />
                    <Area type="monotone" dataKey="memory" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorMemory)" name="Memory" unit="%" />
                </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button size="lg" onClick={handleSubmit}>
                Submit for Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}
