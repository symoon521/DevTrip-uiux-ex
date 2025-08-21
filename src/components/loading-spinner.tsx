"use client"

import { cn } from '@/lib/utils'
import { Loader2, Plane } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'plane'
  className?: string
  message?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8'
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className,
  message 
}: LoadingSpinnerProps) {
  const Icon = variant === 'plane' ? Plane : Loader2
  
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Icon className={cn(
        sizeClasses[size],
        "animate-spin text-blue-500",
        variant === 'plane' && "text-blue-400"
      )} />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export function FullScreenLoading({ message = "로딩 중..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <Plane className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-white text-lg font-medium">{message}</p>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
        </div>
      </div>
    </div>
  )
}