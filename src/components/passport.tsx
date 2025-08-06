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
    <div className="w-full max-w-4xl mx-auto p-4 perspective-1000">
      <div className="relative w-full aspect-[2/1.2] transition-transform duration-1000 preserve-3d group-hover:rotate-y-180">
        {/* Cover */}
        <div className="absolute w-full h-full bg-blue-800 rounded-lg shadow-lg flex flex-col items-center justify-center backface-hidden z-20 group-hover:hidden animate-unfold-in">
          <BookUser className="w-24 h-24 text-yellow-300" />
          <h2 className="text-4xl font-serif text-yellow-300 mt-4">여권</h2>
          <p className="text-lg text-yellow-200">DevTrip</p>
        </div>

        {/* Inside */}
        <div className="absolute w-full h-full transform rotate-y-180 backface-hidden">
          <div className="flex w-full h-full rounded-lg overflow-hidden shadow-lg bg-card">
            {/* Left Page (Info) */}
            <div className="w-1/2 bg-[#f4f1eA] p-6 flex flex-col relative">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                <h3 className="font-serif text-center text-lg text-gray-500 tracking-widest">여권</h3>
                <div className="flex items-center gap-4 mt-6">
                    <Avatar className="w-24 h-24 border-4 border-gray-300">
                        <AvatarImage src="https://placehold.co/150x150.png" data-ai-hint="person avatar"/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xs text-gray-500">이름</p>
                        <p className="font-serif text-xl">사용자 이름</p>
                        <p className="text-xs text-gray-500 mt-2">이메일</p>
                        <p className="font-mono text-sm">user@email.com</p>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <div>
                        <p className="text-xs text-gray-500">구독</p>
                        <p className="font-serif">비즈니스 클래스</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">가입일</p>
                        <p className="font-serif">2023년 7월 21일</p>
                    </div>
                </div>
                 <div className="mt-auto text-center font-mono text-xs text-gray-400">
                    P&lt;DEVT&lt;&lt;USERNAME&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>
                    ID1234567&lt;8USA9901015F2807217&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;0
                </div>
            </div>

            {/* Right Page (Stamps) */}
            <div className="w-1/2 bg-[#f4f1eA] p-6 border-l border-dashed border-gray-300 relative">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                <h3 className="font-serif text-center text-lg text-gray-500 tracking-widest">비자 / 스탬프</h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {stamps.map(stamp => (
                        <div key={stamp.id} className="relative aspect-square border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center p-2 text-center transform -rotate-12">
                            <Stamp className="absolute w-full h-full text-red-500 opacity-20"/>
                            <div className="relative z-10">
                                <p className="text-xs font-bold text-blue-600">{stamp.country}</p>
                                <p className="text-[8px] leading-tight text-gray-600">{stamp.name}</p>
                                <p className="text-[7px] font-mono text-red-700">{stamp.date}</p>
                            </div>
                        </div>
                    ))}
                     <div className="aspect-square border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                        <p className="text-xs text-gray-400">다음 여행</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
       <div className="text-center mt-6">
          <p className="text-muted-foreground italic">여권을 열려면 마우스를 올리세요.</p>
       </div>
    </div>
  )
}
