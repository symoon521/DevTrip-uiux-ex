'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GoogleCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const processGoogleLogin = async () => {
      try {
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
          throw new Error(`구글 로그인 오류: ${error}`)
        }

        if (!code) {
          throw new Error('인증 코드가 없습니다.')
        }

        await authApi.googleLogin(code)
        
        toast({
          title: "로그인 성공",
          description: "구글 계정으로 로그인되었습니다.",
        })
        
        router.push('/dashboard')
      } catch (error) {
        console.error('구글 로그인 처리 실패:', error)
        toast({
          title: "로그인 실패",
          description: error instanceof Error ? error.message : '구글 로그인에 실패했습니다.',
          variant: "destructive",
        })
        router.push('/login')
      } finally {
        setIsProcessing(false)
      }
    }

    processGoogleLogin()
  }, [searchParams, router, toast])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>구글 로그인</CardTitle>
          <CardDescription>
            {isProcessing ? '구글 계정으로 로그인 중...' : '로그인 처리 완료'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isProcessing && (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}