"use client"
import Link from "next/link"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const destinations = [
  { id: 'docker', name: 'Docker', stack: 'docker', coords: { x: 24, y: 31 }, description: "컨테이너화 - 미국" },
  { id: 'kubernetes', name: 'Kubernetes', stack: 'kubernetes', coords: { x: 51.5, y: 29 }, description: "오케스트레이션 - 독일" },
  { id: 'jenkins', name: 'Jenkins', stack: 'jenkins', coords: { x: 26, y: 35 }, description: "CI/CD - 미국" },
  { id: 'argocd', name: 'ArgoCD', stack: 'argocd', coords: { x: 82.3, y: 34 }, description: "GitOps - 일본" },
  { id: 'kafka', name: 'Kafka', stack: 'kafka', coords: { x: 33.3, y: 58 }, description: "이벤트 스트리밍 - 브라질" },
  { id: 'prometheus', name: 'Prometheus', stack: 'prometheus', coords: { x: 52, y: 37.5 }, description: "모니터링 - 스위스" },
  { id: 'helm', name: 'Helm', stack: 'helm', coords: { x: 46.8, y: 25 }, description: "패키징 - 영국" },
];

export function WorldMap() {
  return (
    <TooltipProvider>
      <div className="relative w-full h-full bg-card rounded-lg border border-border/50 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e8/World_map_orange_blue_dots.png"
              alt="World Map" 
              layout="fill"
              objectFit="cover"
              className="opacity-20"
          />
        </div>
        <div className="absolute inset-0 w-full h-full bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        <div className="absolute inset-0 w-full h-full">
          {destinations.map((dest, i) => (
            <Tooltip key={dest.id} delayDuration={100}>
              <TooltipTrigger asChild>
                 <Link 
                    href={`/missions/${dest.stack}`} 
                    className="absolute group animate-fly-in"
                    style={{ 
                      left: `${dest.coords.x}%`, 
                      top: `${dest.coords.y}%`, 
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0, /* Set initial opacity to 0 for animation */
                    }}
                >
                    <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px] shadow-primary transition-all group-hover:scale-150"></div>
                    <div className="w-5 h-5 bg-primary/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                 </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-background border-primary/30 shadow-lg">
                <p className="font-bold text-base">{dest.name}</p>
                <p className="text-sm text-muted-foreground">{dest.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
