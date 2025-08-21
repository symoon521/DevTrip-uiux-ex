"use client"

import { useEffect, useState } from "react"

interface CloudTransitionProps {
  cloudTransition: 'none' | 'closing' | 'opening'
}

export function CloudTransition({ cloudTransition }: CloudTransitionProps) {
  const [cloudParticles, setCloudParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    opacity: number
    speed: number
    depth: number
    type: 'wispy' | 'fluffy' | 'heavy'
  }>>([])

  useEffect(() => {
    // 더 자연스러운 구름 파티클 시스템 생성
    const particles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 130 - 15, // -15% to 115%
      y: Math.random() * 130 - 15,
      size: 60 + Math.random() * 300, // 60px to 360px
      opacity: 0.2 + Math.random() * 0.6, // 0.2 to 0.8
      speed: 0.3 + Math.random() * 1.5, // 0.3 to 1.8
      depth: Math.random(), // 0 to 1 (깊이감)
      type: (['wispy', 'fluffy', 'heavy'] as const)[Math.floor(Math.random() * 3)]
    }))
    setCloudParticles(particles)
  }, [])

  if (cloudTransition === 'none') return null

  return (
    <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
      {/* 구름 전환 효과 */}
      <div 
        className={`absolute inset-0 transition-all duration-1200 ease-in-out ${
          cloudTransition === 'closing' 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-115'
        }`}
      >
        {/* 동적 하늘 그라데이션 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/40 via-sky-100/30 to-blue-200/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-sky-50/60" />
        </div>
        
        {/* 실시간 구름 파티클 시스템 */}
        {cloudParticles.map((particle, i) => {
          const layer = Math.floor(i / 12) // 0, 1, 2 레이어
          const isBackground = layer === 0
          const isMidground = layer === 1
          const isForeground = layer === 2
          
          return (
            <div
              key={`particle-${particle.id}`}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * (isBackground ? 0.7 : isMidground ? 1 : 1.3)}px`,
                height: `${particle.size * 0.6 * (isBackground ? 0.7 : isMidground ? 1 : 1.3)}px`,
                opacity: particle.opacity * (isBackground ? 0.3 : isMidground ? 0.6 : 0.9),
                transform: `scale(${0.8 + particle.depth * 0.4}) rotate(${particle.depth * 20 - 10}deg)`,
                zIndex: isBackground ? 1 : isMidground ? 2 : 3,
                animation: `
                  cloud-drift ${15 + particle.speed * 10}s linear infinite,
                  cloud-morph ${8 + particle.speed * 6}s ease-in-out infinite,
                  ${particle.type === 'wispy' ? 'cloud-fade-in-out' : 'cloud-puff'} ${6 + particle.speed * 4}s ease-in-out infinite
                `,
                animationDelay: `${i * 0.2}s, ${i * 0.3}s, ${i * 0.4}s`,
                background: particle.type === 'wispy' 
                  ? `radial-gradient(ellipse ${60 + Math.random() * 40}% ${40 + Math.random() * 20}% at ${30 + Math.random() * 40}% ${50 + Math.random() * 20}%, 
                      rgba(255,255,255,${particle.opacity * 0.8}), 
                      rgba(248,250,255,${particle.opacity * 0.6}) 40%, 
                      rgba(240,245,255,${particle.opacity * 0.3}) 70%, 
                      transparent 85%)`
                  : particle.type === 'fluffy'
                  ? `radial-gradient(ellipse ${70 + Math.random() * 30}% ${50 + Math.random() * 25}% at ${40 + Math.random() * 20}% ${45 + Math.random() * 25}%, 
                      rgba(255,255,255,${particle.opacity * 0.95}), 
                      rgba(250,252,255,${particle.opacity * 0.8}) 30%, 
                      rgba(240,248,255,${particle.opacity * 0.5}) 60%, 
                      rgba(230,240,255,${particle.opacity * 0.2}) 80%, 
                      transparent 90%)`
                  : `radial-gradient(ellipse ${50 + Math.random() * 50}% ${35 + Math.random() * 30}% at ${35 + Math.random() * 30}% ${40 + Math.random() * 30}%, 
                      rgba(255,255,255,${particle.opacity * 1.1}), 
                      rgba(245,250,255,${particle.opacity * 0.9}) 25%, 
                      rgba(235,245,255,${particle.opacity * 0.7}) 50%, 
                      rgba(220,235,255,${particle.opacity * 0.4}) 75%, 
                      transparent 85%)`,
                borderRadius: particle.type === 'wispy' 
                  ? `${60 + Math.random() * 20}% ${40 + Math.random() * 40}% ${70 + Math.random() * 15}% ${50 + Math.random() * 30}%`
                  : particle.type === 'fluffy'
                  ? `${45 + Math.random() * 35}% ${55 + Math.random() * 25}% ${40 + Math.random() * 40}% ${60 + Math.random() * 20}%`
                  : `${35 + Math.random() * 45}% ${65 + Math.random() * 20}% ${50 + Math.random() * 30}% ${45 + Math.random() * 35}%`,
                filter: `blur(${isBackground ? 4 + Math.random() * 3 : isMidground ? 2 + Math.random() * 2 : 1 + Math.random()}px) 
                         brightness(${1 + particle.depth * 0.2})`,
                boxShadow: isForeground ? `0 0 ${20 + particle.size * 0.1}px rgba(255,255,255,${particle.opacity * 0.3})` : 'none'
              }}
            />
          )
        })}
        
        {/* 시네마틱 메인 구름 포메이션 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 거대한 중앙 구름 덩어리 */}
          <div className="relative">
            {/* 핵심 구름 */}
            <div 
              className="w-[600px] h-[300px] opacity-95"
              style={{
                background: `
                  radial-gradient(ellipse 60% 40% at 30% 60%, rgba(255,255,255,0.98), transparent 70%),
                  radial-gradient(ellipse 80% 60% at 60% 40%, rgba(250,252,255,0.9), transparent 75%),
                  radial-gradient(ellipse 70% 50% at 45% 55%, rgba(245,250,255,0.8), transparent 80%),
                  radial-gradient(ellipse 90% 70% at 50% 50%, rgba(240,248,255,0.7), transparent 85%)
                `,
                borderRadius: '40% 60% 50% 70%',
                filter: 'blur(4px) brightness(1.1)',
                animation: 'cloud-layer-move 25s ease-in-out infinite, cloud-morph 20s ease-in-out infinite',
                animationDelay: '2s, 1s',
                boxShadow: '0 0 100px rgba(255,255,255,0.4), inset 0 0 50px rgba(255,255,255,0.2)'
              }}
            />
            
            {/* 좌측 구름 클러스터 */}
            <div className="absolute -left-32 top-8 w-[450px] h-[220px] opacity-85">
              <div 
                className="w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 70% 50% at 40% 50%, rgba(255,255,255,0.9), transparent 65%),
                    radial-gradient(ellipse 85% 65% at 60% 45%, rgba(248,252,255,0.8), transparent 70%),
                    radial-gradient(ellipse 60% 40% at 50% 60%, rgba(242,248,255,0.7), transparent 75%)
                  `,
                  borderRadius: '50% 70% 45% 65%',
                  filter: 'blur(3px)',
                  animation: 'cloud-drift 30s linear infinite, cloud-morph 18s ease-in-out infinite',
                  animationDelay: '1s, 3s'
                }}
              />
            </div>
            
            {/* 우측 구름 클러스터 */}
            <div className="absolute -right-28 top-4 w-[380px] h-[190px] opacity-90">
              <div 
                className="w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 65% 45% at 45% 55%, rgba(255,255,255,0.95), transparent 68%),
                    radial-gradient(ellipse 80% 60% at 55% 40%, rgba(250,254,255,0.85), transparent 72%),
                    radial-gradient(ellipse 75% 55% at 50% 50%, rgba(245,250,255,0.75), transparent 78%)
                  `,
                  borderRadius: '35% 65% 55% 45%',
                  filter: 'blur(2.5px) brightness(1.05)',
                  animation: 'cloud-fade-in-out 16s ease-in-out infinite, cloud-morph 22s ease-in-out infinite',
                  animationDelay: '4s, 2s'
                }}
              />
            </div>
            
            {/* 상단 볼륨 구름들 */}
            <div className="absolute -top-20 left-16 w-[280px] h-[120px] opacity-75">
              <div 
                className="w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.85), transparent 70%),
                    radial-gradient(ellipse 60% 40% at 40% 60%, rgba(248,252,255,0.7), transparent 75%)
                  `,
                  borderRadius: '60% 40% 70% 30%',
                  filter: 'blur(2px)',
                  animation: 'cloud-drift 20s linear infinite',
                  animationDelay: '5s'
                }}
              />
            </div>
            
            {/* 하단 확산 구름들 */}
            <div className="absolute -bottom-16 left-24 w-[320px] h-[140px] opacity-70">
              <div 
                className="w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 75% 55% at 50% 45%, rgba(255,255,255,0.8), transparent 65%),
                    radial-gradient(ellipse 90% 70% at 45% 55%, rgba(245,250,255,0.6), transparent 75%)
                  `,
                  borderRadius: '45% 75% 35% 85%',
                  filter: 'blur(3.5px)',
                  animation: 'cloud-puff 12s ease-out infinite',
                  animationDelay: '3s'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* 전경 미세 구름들 - 깊이감 추가 */}
        {cloudTransition === 'closing' && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={`foreground-${i}`}
                className="absolute"
                style={{
                  left: `${5 + i * 8}%`,
                  top: `${15 + (i % 4) * 20}%`,
                  width: `${30 + i * 12}px`,
                  height: `${18 + i * 8}px`,
                  background: `
                    radial-gradient(ellipse 70% 50% at 50% 50%, 
                      rgba(255,255,255,${0.9 - i * 0.06}), 
                      rgba(248,252,255,${0.7 - i * 0.04}) 60%, 
                      transparent 80%)
                  `,
                  borderRadius: `${50 + i * 3}% ${60 - i * 2}% ${40 + i * 4}% ${70 - i * 3}%`,
                  filter: `blur(${0.5 + i * 0.3}px)`,
                  opacity: 0.8 - i * 0.05,
                  animation: `cloud-puff ${3 + i * 0.5}s ease-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                  zIndex: 10
                }}
              />
            ))}
          </div>
        )}
        
        {/* 환경 입자 효과 */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
      </div>
      
      {/* 개선된 화면 전환 효과 */}
      {cloudTransition === 'opening' && (
        <div 
          className="absolute inset-0"
          style={{
            animation: 'zoom-in-from-center 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            transformOrigin: 'center center'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl opacity-0 shadow-2xl border border-white/10"
               style={{
                 animation: 'fade-in 1s ease-out forwards',
                 animationDelay: '0.5s'
               }}>
            {/* 새 화면의 글로우 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-emerald-500/20 rounded-3xl blur-xl"></div>
          </div>
        </div>
      )}
    </div>
  )
}