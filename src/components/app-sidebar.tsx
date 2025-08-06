"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Map, UserCircle, LogOut, Settings, Plane, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/missions", icon: Map, label: "미션" },
  { href: "/profile", icon: UserCircle, label: "프로필" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r sticky top-0 h-screen">
      <div className="p-4 border-b flex items-center h-16">
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
          <Plane className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold tracking-tight">DevTrip</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
            className="w-full justify-start text-base py-6"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between h-14">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-semibold leading-none">사용자 이름</p>
                  <p className="text-xs leading-none text-muted-foreground mt-1">
                    비즈니스 플랜
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">사용자 이름</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@email.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>계정 설정</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <Link href="/">로그아웃</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
