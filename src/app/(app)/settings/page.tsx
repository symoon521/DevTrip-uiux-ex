"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  CreditCard, 
  Camera,
  Save
} from "lucide-react"
import { uploadProfileImage, updateProfile } from "@/lib/api/profile"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "사용자 이름",
    email: "user@email.com",
    avatar: "https://placehold.co/100x100.png"
  })
  
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 파일 크기 검증 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('파일 크기는 2MB 이하여야 합니다.')
      return
    }

    // 파일 타입 검증
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      alert('JPG, PNG 파일만 업로드 가능합니다.')
      return
    }

    // 미리보기 이미지 생성
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setIsUploading(true)
    try {
      // API 함수를 사용하여 서버에 업로드
      const uploadedUrl = await uploadProfileImage(file)
      
      // 프로필 상태 업데이트
      const updatedProfile = { ...profile, avatar: uploadedUrl }
      setProfile(updatedProfile)
      
      // 서버에 프로필 정보 저장
      await updateProfile({ avatar: uploadedUrl })
      
      alert('프로필 이미지가 성공적으로 변경되었습니다!')
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
      setPreviewImage(null)
      // 파일 입력 초기화
      event.target.value = ''
    }
  }

  const handleProfileSave = async () => {
    try {
      await updateProfile({
        name: profile.name,
        email: profile.email
      })
      alert('프로필 정보가 성공적으로 저장되었습니다!')
    } catch (error) {
      console.error('프로필 저장 실패:', error)
      alert('프로필 저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">계정 설정</h1>
          <p className="text-muted-foreground">
            계정 정보를 관리하고 개인 설정을 변경하세요.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              프로필
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              요금제
            </TabsTrigger>
          </TabsList>

          {/* 프로필 탭 */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    프로필 정보
                  </CardTitle>
                  <CardDescription>
                    공개 프로필 정보를 수정할 수 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 프로필 이미지 */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={previewImage || profile.avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleImageChange}
                          className="hidden"
                          disabled={isUploading}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          disabled={isUploading}
                        >
                          <label htmlFor="avatar-upload" className="cursor-pointer">
                            <Camera className="h-4 w-4 mr-2" />
                            {isUploading ? '업로드 중...' : '이미지 변경'}
                          </label>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG 파일만 업로드 가능합니다. (최대 2MB)
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* 기본 정보 */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleProfileSave}>
                    <Save className="h-4 w-4 mr-2" />
                    변경사항 저장
                  </Button>
                </CardContent>
              </Card>

              {/* 계정 상태 */}
              <Card>
                <CardHeader>
                  <CardTitle>계정 상태</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">현재 요금제</p>
                      <p className="text-sm text-muted-foreground">비즈니스 플랜</p>
                    </div>
                    <Badge variant="secondary">활성</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">계정 상태</p>
                      <p className="text-sm text-muted-foreground">이메일 인증 완료</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">인증됨</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          {/* 요금제 탭 */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    현재 요금제
                  </CardTitle>
                  <CardDescription>
                    현재 사용 중인 요금제 정보입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">비즈니스 플랜</h3>
                        <p className="text-muted-foreground">₩30,000/월</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">현재 플랜</Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm">✓ 전체 미션 라이브러리</p>
                      <p className="text-sm">✓ 고급 AI 평가</p>
                      <p className="text-sm">✓ 전문가 수준 환경</p>
                      <p className="text-sm">✓ 우선 지원</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline">플랜 변경</Button>
                      <Button variant="outline">결제 관리</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>결제 내역</CardTitle>
                  <CardDescription>
                    최근 결제 내역을 확인하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">비즈니스 플랜</p>
                        <p className="text-sm text-muted-foreground">2024년 1월 1일</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₩30,000</p>
                        <Badge variant="outline" className="text-xs">완료</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">비즈니스 플랜</p>
                        <p className="text-sm text-muted-foreground">2023년 12월 1일</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₩30,000</p>
                        <Badge variant="outline" className="text-xs">완료</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}