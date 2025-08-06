"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Plane, LayoutDashboard, Map, UserCircle, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/missions", icon: Map, label: "미션" },
  { href: "/profile", icon: UserCircle, label: "프로필" },
]

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="md:hidden flex items-center h-16 px-4 border-b bg-card">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">네비게이션 메뉴 토글</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="p-4 border-b">
            <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevTrip</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person avatar"/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">사용자 이름</span>
                </div>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/"><LogOut className="h-4 w-4" /></Link>
                </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex justify-center">
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DevTrip</span>
        </Link>
      </div>
      <div className="w-10"></div>
    </header>
  )
}
