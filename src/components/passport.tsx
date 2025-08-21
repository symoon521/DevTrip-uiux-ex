"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import { BookUser, Stamp } from "lucide-react"

const stamps = [
  { id: 1, name: "Docker 기초", country: "미국", date: "2023-10-26" },
  { id: 2, name: "K8s 배포", country: "독일", date: "2023-11-15" },
  { id: 3, name: "ArgoCD 동기화", country: "일본", date: "2023-12-01" },
  { id: 4, name: "Helm 템플릿", country: "영국", date: "2024-01-20" },
  { id: 5, name: "Kafka 스트림", country: "브라질", date: "2024-02-18" },
]

export function Passport() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* 28년차 디자이너의 미니멀한 여권 */}
      <div className="passport-container group cursor-pointer">
        <div className="passport-book">
          
          {/* 여권 커버 (앞표지) */}
          <div className="passport-cover shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* 표지 텍스처 */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            {/* 국장 */}
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-xl border-2 border-yellow-200">
              <BookUser className="w-10 h-10 text-blue-900 drop-shadow-sm" />
            </div>
            
            {/* 여권 텍스트 */}
            <div className="text-center text-yellow-100">
              <h2 className="text-3xl font-serif font-bold tracking-[0.4em] mb-4">PASSPORT</h2>
              <div className="text-lg font-serif tracking-[0.3em] opacity-95">
                <p className="text-yellow-200 font-medium">여 권</p>
                <p className="text-sm mt-3 text-yellow-300 font-light tracking-wider">REPUBLIC OF KOREA</p>
              </div>
            </div>
            
            {/* DevTrip 로고 */}
            <div className="absolute bottom-8 text-yellow-200 text-lg font-serif tracking-wide opacity-90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>DevTrip</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse [animation-delay:0.5s]"></div>
              </div>
            </div>
          </div>
          
          {/* 여권 내부 페이지들 */}
          <div className="passport-pages">
            <div className="flex w-full h-full">
              
              {/* 왼쪽 페이지 - 개인정보 */}
              <div className="w-1/2 p-8 flex flex-col relative border-r border-dashed border-gray-300">
                {/* 종이 텍스처 */}
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23d4c5a0%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%2040l40-40h-40v40zm40%200v-40h-40l40%2040z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="font-serif text-center text-xl text-gray-700 tracking-[0.3em] mb-8 border-b-2 border-gray-300 pb-3">PASSPORT</h3>
                  
                  {/* 가로 레이아웃에 최적화된 사용자 정보 */}
                  <div className="flex items-start gap-6 mb-8">
                    <Avatar className="w-24 h-32 border-3 border-gray-400 shadow-lg flex-shrink-0">
                      <AvatarImage src="https://placehold.co/150x200.png" className="object-cover"/>
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xl font-bold">U</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Name / 성명</p>
                        <p className="font-serif text-2xl font-bold text-gray-800">사용자 이름</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email / 이메일</p>
                        <p className="font-mono text-lg text-gray-700">user@email.com</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Passport No. / 여권번호</p>
                        <p className="font-mono text-xl text-gray-800 font-bold tracking-wider">M12345678</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 가로 2열로 정보 배치 */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-base mb-8">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">발급일</span>
                      <span className="font-serif text-gray-800 text-lg">2023.07.21</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">만료일</span>
                      <span className="font-serif text-gray-800 text-lg">2033.07.20</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">구독 등급</span>
                      <span className="font-serif text-gray-800 text-lg font-semibold">비즈니스 클래스</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">여행 횟수</span>
                      <span className="font-serif text-gray-800 text-lg font-bold text-blue-600">{stamps.length}회</span>
                    </div>
                  </div>
                  
                  {/* MRZ */}
                  <div className="mt-auto pt-4 border-t-2 border-gray-300">
                    <div className="font-mono text-xs text-gray-500 leading-tight bg-gray-100 p-3 rounded-lg">
                      P&lt;KOR&lt;&lt;DEVTRIP&lt;USER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>
                      M12345678&lt;8KOR9901015M2807217&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;0
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 페이지 - 스탬프 */}
              <div className="w-1/2 p-8 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23d4c5a0%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%2040l40-40h-40v40zm40%200v-40h-40l40%2040z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="font-serif text-center text-xl text-gray-700 tracking-[0.3em] mb-8 border-b-2 border-gray-300 pb-3">VISA / STAMPS</h3>
                  
                  {/* 가로 레이아웃에 맞는 스탬프 그리드 */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {stamps.map((stamp, index) => (
                      <div 
                        key={stamp.id} 
                        className="relative w-16 h-16 border-3 border-red-500 rounded-full flex items-center justify-center text-center bg-red-50 shadow-lg hover:scale-105 transition-transform duration-200"
                        style={{ 
                          transform: `rotate(${(index % 2 ? -1 : 1) * (3 + Math.random() * 6)}deg)`,
                          animationDelay: `${index * 0.15}s`
                        }}
                      >
                        <Stamp className="absolute w-full h-full text-red-500 opacity-25"/>
                        <div className="relative z-10">
                          <p className="text-[10px] font-bold text-red-700 mb-0.5">{stamp.country}</p>
                          <p className="text-[7px] leading-tight text-gray-700 font-semibold">{stamp.name}</p>
                          <p className="text-[6px] font-mono text-red-600 mt-0.5">{stamp.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 미래 스탬프 공간 */}
                  <div className="grid grid-cols-4 gap-3 mt-auto">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div 
                        key={`future-${i}`} 
                        className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50/50 hover:bg-gray-100 transition-colors"
                        style={{ opacity: 0.6 - i * 0.05 }}
                      >
                        <span className="text-xs text-gray-400">+</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 font-serif italic">
                      "새로운 여행이 기다리고 있습니다"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-semibold text-lg">🖱️ 여권에 마우스를 올려보세요</span>
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse [animation-delay:0.5s]"></div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4 tracking-wide font-medium">
          실제 여권처럼 자연스럽게 펼쳐집니다
        </p>
      </div>
    </div>
  )
}