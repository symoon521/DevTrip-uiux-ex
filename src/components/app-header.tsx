"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Plane, LayoutDashboard, Map, UserCircle, LogOut, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { authApi } from "@/lib/api/auth"
import { userApi, type UserProfile } from "@/lib/api/user"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/missions", icon: Map, label: "미션" },
  { href: "/team", icon: Users, label: "팀" },
  { href: "/profile", icon: UserCircle, label: "프로필" },
  { href: "/settings", icon: Settings, label: "설정" },
]

export function AppHeader() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      if (authApi.isAuthenticated()) {
        const profile = await userApi.getProfile()
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Failed to load user profile:', error)
      // User might not be authenticated or API might be down
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
      toast({
        title: "로그아웃",
        description: "성공적으로 로그아웃되었습니다.",
      })
      router.push("/login")
    } catch (error) {
      console.error('Logout failed:', error)
      // Even if API fails, clear local storage and redirect
      router.push("/login")
    }
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center h-16 px-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">네비게이션 메뉴 토글</span>
            </Button>
          </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 bg-card border-r">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevTrip</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start text-lg py-6"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatarUrl || "https://placehold.co/100x100.png"} />
                        <AvatarFallback>
                          {userProfile ? getUserInitials(userProfile.name) : 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {userProfile?.name || '사용자'}
                    </span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </SheetContent>
        </Sheet>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevTrip</span>
          </Link>
        </div>
        <div className="w-10"></div>
      </header>

    </>
  )
}
