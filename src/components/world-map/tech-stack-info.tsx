"use client"

import { Globe } from 'lucide-react'
import { Country } from '@/types/mission'

interface TechStackInfoProps {
  countries: Country[]
}

export function TechStackInfo({ countries }: TechStackInfoProps) {
  return (
    <div className="absolute bottom-4 left-4 animate-slide-in-bottom">
      <div className="material-glass rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 card-3d">
        <h3 className="text-white font-bold mb-4 flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Globe className="w-5 h-5 text-blue-300" />
          </div>
          <span>이용 가능한 기술</span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {countries.map((country, index) => (
            <div 
              key={country.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group animate-micro-bounce"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">{country.flag}</span>
              <span className="text-blue-100 font-medium group-hover:text-white transition-colors">
                {country.stack.toUpperCase()}
              </span>
              <div className="w-1 h-1 bg-blue-400/60 rounded-full group-hover:bg-blue-300 group-hover:animate-ping transition-all"></div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-blue-200">
            <span>실시간 업데이트</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse preserve-animation"></div>
              <span>ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}