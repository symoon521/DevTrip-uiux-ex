"use client"

import { cn } from '@/lib/utils'
import { Country } from '@/types/mission'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CountryMarkerProps {
  country: Country
  index: number
  isHovered: boolean
  onClick: (country: Country) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function CountryMarker({
  country,
  index,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave
}: CountryMarkerProps) {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button 
          className={cn(
            "absolute group transition-all duration-300 hover:scale-125 focus:outline-none focus:scale-125",
            "animate-pulse hover:animate-none country-marker",
            "hover:z-10 focus:z-10"
          )}
          style={{ 
            left: `${country.coords.x}%`, 
            top: `${country.coords.y}%`, 
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 0.2}s`,
          }}
          onClick={() => onClick(country)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          aria-label={`${country.name} - ${country.description}`}
        >
          <div className={cn(
            "relative w-8 h-8 rounded-full shadow-2xl transition-all duration-500",
            "bg-gradient-to-br", country.color,
            "shadow-blue-500/50 group-hover:shadow-blue-400/80 animate-premium-glow",
            "hover:shadow-[0_0_40px_rgba(59,130,246,0.8)]",
            isHovered && "scale-125 shadow-blue-400/80"
          )}>
            <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-300"></div>
            
            {/* 내부 펄스 효과 */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse"></div>
            
            {/* 외부 링 */}
            <div className={cn(
              "absolute -inset-3 rounded-full border-2 border-white/40 transition-all duration-500",
              "group-hover:border-white/80 group-hover:-inset-6 group-hover:animate-ping",
              isHovered && "border-white/80 -inset-6 animate-ping"
            )}></div>
            
            {/* 중간 링 */}
            <div className={cn(
              "absolute -inset-1 rounded-full border border-white/60 transition-all duration-300",
              "group-hover:border-white/90 group-hover:-inset-2",
              isHovered && "border-white/90 -inset-2"
            )}></div>
            
            <div className="absolute inset-0 flex items-center justify-center text-sm group-hover:scale-110 transition-transform duration-300">
              {country.flag}
            </div>
            
            {/* 마이크로 파티클 */}
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-1 h-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100",
                  "transition-all duration-500 animate-ping"
                )}
                style={{
                  top: `${20 + Math.sin((i * Math.PI) / 2) * 25}px`,
                  left: `${20 + Math.cos((i * Math.PI) / 2) * 25}px`,
                  animationDelay: `${i * 200}ms`
                }}
              />
            ))}
          </div>
          
          <div className={cn(
            "absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full",
            "material-glass text-white text-sm font-medium",
            "opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap",
            "shadow-2xl animate-fade-in-scale animate-micro-bounce",
            "hover:scale-105 cursor-pointer",
            isHovered && "opacity-100"
          )}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{country.flag}</span>
              <span>{country.name}</span>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-slate-900/90 backdrop-blur border-white/20 text-white shadow-2xl">
        <div className="text-center">
          <p className="font-bold text-lg flex items-center gap-2">
            {country.flag} {country.name}
          </p>
          <p className="text-sm text-blue-200">{country.description}</p>
          <p className="text-xs text-blue-300 mt-1">
            {country.cities.length}개 도시 • {country.cities.reduce((acc, city) => acc + city.missions.length, 0)}개 미션
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}