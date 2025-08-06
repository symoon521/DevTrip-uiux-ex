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

const WorldMapSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 1001"
      className="absolute inset-0 w-full h-full object-cover opacity-20"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        fill="hsl(var(--primary))"
        d="M1000 0C447.8 0 0 447.8 0 1000h2000C2000 447.8 1552.2 0 1000 0zM874.4 565.4h11.2l2.1 11.1h12.1l-11.4-32.1h-12.8l-11.5 32.1h12.1l2.2-11.1zM879.7 561.3l5-13.8 4.9 13.8h-9.9zM900.5 544.4h12.2v-11h-12.2v11zm0 30h12.2v-11h-12.2v11zm17.1-30h12.2v11h-12.2v-11zm0 30h12.2v-11h-12.2v11zm17.1-30h12.2v11h-12.2v-11zm0 30h12.2v-11h-12.2v11zm17 30h12.2v-11h-12.2v11zm-17 0h12.2v-11h-12.2v11zm-17.1 0h12.2v-11h-12.2v11zm-17.1-50.9l7.3-8.8h-5.2v-10.3h14.5v3.1l-7.3 8.8h5.6v10.3H951v-3.1zm21.3 5.4h2.1v-12.8h-2.1v-5.2h12.9v5.2h-2.1v12.8h2.1v5.2H972.3v-5.2z"
      ></path>
    </svg>
)

export function WorldMap() {
  return (
    <TooltipProvider>
      <div className="relative w-full h-full bg-card rounded-lg border border-border/50 p-1">
        <div className="absolute inset-0 w-full h-full bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        <WorldMapSvg />
        <svg viewBox="0 0 960 480" className="w-full h-full rounded-md relative">
         <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

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
