"use client"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const destinations = [
  { id: 'docker', name: 'Docker', stack: 'docker', coords: { x: 230, y: 150 }, description: "컨테이너화 - 미국" },
  { id: 'kubernetes', name: 'Kubernetes', stack: 'kubernetes', coords: { x: 495, y: 140 }, description: "오케스트레이션 - 독일" },
  { id: 'jenkins', name: 'Jenkins', stack: 'jenkins', coords: { x: 250, y: 170 }, description: "CI/CD - 미국" },
  { id: 'argocd', name: 'ArgoCD', stack: 'argocd', coords: { x: 790, y: 165 }, description: "GitOps - 일본" },
  { id: 'kafka', name: 'Kafka', stack: 'kafka', coords: { x: 320, y: 280 }, description: "이벤트 스트리밍 - 브라질" },
  { id: 'prometheus', name: 'Prometheus', stack: 'prometheus', coords: { x: 500, y: 180 }, description: "모니터링 - 스위스" },
  { id: 'helm', name: 'Helm', stack: 'helm', coords: { x: 450, y: 120 }, description: "패키징 - 영국" },
];

export function WorldMap() {
  return (
    <TooltipProvider>
      <div className="relative w-full h-full bg-card rounded-lg border border-border/50 p-1">
        <svg viewBox="0 0 960 480" className="w-full h-full rounded-md">
         <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <radialGradient id="mapGradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--background))" />
            </radialGradient>
        </defs>

        <path d="M480 475c-140.2-2.2-258-67.8-349.4-177.3C96.9 270.6 71.5 240.2 40 240c31.5.2 56.9 30.6 90.6 57.7C222 387.2 339.8 452.8 480 455c140.2-2.2 258-67.8 349.4-177.3C863.1 250.6 888.5 220.2 920 220c-31.5-.2-56.9-30.6-90.6-57.7C738 72.8 620.2 7.2 480 5 339.8 7.2 222 72.8 130.6 182.3 96.9 209.4 71.5 239.8 40 240c31.5-.2 56.9-30.6 90.6-57.7C222 92.8 339.8 27.2 480 25c140.2 2.2 258 67.8 349.4 177.3C863.1 330.6 888.5 360.2 920 360c-31.5.2-56.9-30.6-90.6-57.7C738 212.8 620.2 147.2 480 145c-140.2 2.2-258 67.8-349.4 177.3C96.9 450.6 71.5 480.2 40 480c31.5-.2 56.9-30.6 90.6-57.7C222 332.8 339.8 267.2 480 265c140.2-2.2 258-67.8 349.4-177.3C863.1 60.6 888.5 30.2 920 30c-31.5.2-56.9 30.6-90.6 57.7C738 177.2 620.2 242.8 480 245c-140.2-2.2-258-67.8-349.4-177.3C96.9 40.6 71.5 10.2 40 10c31.5-.2 56.9 30.6 90.6 57.7C222 157.2 339.8 222.8 480 225Z" fill="url(#mapGradient)" opacity="0.3"></path>
          
          {destinations.map(dest => (
            <Tooltip key={dest.id} delayDuration={100}>
              <TooltipTrigger asChild>
                 <Link href={`/missions/${dest.stack}`}>
                    <g className="cursor-pointer group animate-fly-in" style={{ animationDelay: `${Math.random() * 0.5}s` }}>
                        <circle 
                            cx={dest.coords.x} 
                            cy={dest.coords.y} 
                            r="6" 
                            fill="hsl(var(--primary))"
                            className="transition-all duration-300"
                            style={{ filter: "url(#glow)" }}
                        />
                        <circle 
                            cx={dest.coords.x} 
                            cy={dest.coords.y} 
                            r="12" 
                            fill="hsl(var(--primary))" 
                            className="opacity-0 group-hover:opacity-20 transition-opacity animate-pulse"
                        />
                    </g>
                 </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-background border-primary/30 shadow-lg">
                <p className="font-bold text-base">{dest.name}</p>
                <p className="text-sm text-muted-foreground">{dest.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </svg>
      </div>
    </TooltipProvider>
  )
}
