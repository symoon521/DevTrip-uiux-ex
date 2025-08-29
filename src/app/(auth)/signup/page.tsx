import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15.09 14.321A7.942 7.942 0 0 1 12 15.5c-4.142 0-7.5-3.358-7.5-7.5S7.858.5 12 .5a7.944 7.944 0 0 1 6.536 3.429l-2.228 2.228A4.473 4.473 0 0 0 12 4.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5a4.473 4.473 0 0 0 3.09-1.179l-2.228-2.228" /><path d="M22.5 12.5v-1h-11v1a4.5 4.5 0 0 0 4.5 4.5h2a4.5 4.5 0 0 0 4.5-4.5Z" /></svg>
  );
  
const KakaoIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 5.64 2 10.08c0 2.89 2.01 5.43 5.04 6.89l-.96 3.53c-.09.33.15.62.46.46l4.36-2.85c.37.03.74.05 1.1.05 5.52 0 10-3.64 10-8.08S17.52 2 12 2z"/></svg>
);


export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">계정 만들기</CardTitle>
        <CardDescription>
          DevTrip에 오신 것을 환영합니다. 새 계정을 만들어보세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <KakaoIcon className="mr-2 h-4 w-4" />
            카카오
          </Button>
          <Button variant="outline">
            <GoogleIcon className="mr-2 h-4 w-4" />
            구글
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">이름</Label>
            <Input id="firstName" placeholder="홍" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">성</Label>
            <Input id="lastName" placeholder="길동" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input id="confirmPassword" type="password" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm font-normal">
            <Link href="/terms" className="text-primary hover:underline">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              개인정보처리방침
            </Link>
            에 동의합니다.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" asChild>
            <Link href="/dashboard">계정 만들기</Link>
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="underline text-primary">
            로그인
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}