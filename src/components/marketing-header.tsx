
"use client"

import Link from "next/link"
import { Plane, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#features", label: "기능" },
    { href: "/pricing", label: "요금제" },
    { href: "#testimonials", label: "추천사" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">DevTrip</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="ghost" asChild>
            <Link href="/login">로그인</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 w-full pt-4 border-t">
              <Button variant="ghost" asChild className="w-full">
                <Link href="/login">로그인</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
