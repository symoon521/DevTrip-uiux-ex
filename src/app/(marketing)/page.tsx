import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Map, Rocket, BrainCircuit, Terminal, ArrowRight, CheckCircle } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: "인터랙티브 월드맵",
      description: "DevOps 도구의 세계를 탐험하세요. 각 나라는 기술이며, 각 도시는 새로운 미션입니다.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "실전 미션",
      description: "실제 DevOps 과제를 반영한 실습 랩을 통해 이론을 넘어 직접 경험해 보세요.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "AI 기반 피드백",
      description: "코드와 환경 설정에 대해 즉각적이고 지능적인 피드백을 받아보세요.",
    },
    {
      icon: <Terminal className="h-8 w-8 text-primary" />,
      title: "라이브 터미널 및 모니터링",
      description: "전문가처럼 통합 리소스 모니터링이 가능한 실시간 터미널에서 작업하세요.",
    },
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "DevOps 엔지니어",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "man portrait",
      text: "DevTrip은 게임 체인저입니다. 실제 경험에 가장 가까운 핸즈온 랩을 찾았습니다.",
    },
    {
      name: "Samantha Lee",
      role: "클라우드 아키텍트",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "woman portrait",
      text: "AI 피드백 덕분에 제가 저지르고 있는지도 몰랐던 실수들을 발견할 수 있었습니다. 제 기술이 극적으로 향상되었어요.",
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Background"
              fill
              className="object-cover opacity-10"
              data-ai-hint="world map tech"
            />
             <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
          </div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  당신의 DevOps 세계 일주가 여기서 시작됩니다
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  읽는 것을 멈추고, 직접 해보세요. DevTrip은 DevOps 학습을 글로벌 어드벤처로 바꾸는 인터랙티브 플랫폼입니다.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    여정 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">주요 기능</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">보기만 하는 것이 아니라, 직접 해보며 배우세요</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  저희 플랫폼은 최고의 DevOps 전문가들이 사용하는 도구와 기술에 대한 실용적인 핸즈온 경험을 제공하도록 설계되었습니다.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">모험을 위한 티켓을 선택하세요</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                개인 및 팀을 위한 합리적인 플랜. 무료로 시작하고 성장함에 따라 업그레이드하세요.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl pt-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="flex flex-col">
                      <CardHeader className="flex-1 pb-4">
                          <CardTitle>이코노미</CardTitle>
                          <CardDescription className="pt-2">기본적인 기능으로 시작하는 플랜</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">₩0<span className="text-lg font-normal text-muted-foreground">/월</span></div>
                          <ul className="space-y-2 text-left text-sm mt-6">
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 무료 미션 이용</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 기본 AI 피드백</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" asChild><Link href="/login">시작하기</Link></Button>
                      </CardFooter>
                  </Card>
                  <Card className="flex flex-col border-primary shadow-2xl relative">
                        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                            <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full w-fit">가장 인기있음</div>
                        </div>
                      <CardHeader className="flex-1 pb-4">
                          <CardTitle>비즈니스</CardTitle>
                          <CardDescription className="pt-2">성장을 위한 모든 기능을 갖춘 플랜</CardDescription>
                      </CardHeader>
                      <CardContent>
                           <div className="text-4xl font-bold">₩29,000<span className="text-lg font-normal text-muted-foreground">/월</span></div>
                          <ul className="space-y-2 text-left text-sm mt-6">
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 전체 미션 라이브러리</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 고급 AI 평가</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 전문가 수준 환경</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild><Link href="/login">비즈니스 플랜 시작</Link></Button>
                      </CardFooter>
                  </Card>
                  <Card className="flex flex-col">
                      <CardHeader className="flex-1 pb-4">
                          <CardTitle>퍼스트 클래스</CardTitle>
                          <CardDescription className="pt-2">전문가를 위한 최고의 경험</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">₩50,000<span className="text-lg font-normal text-muted-foreground">/월</span></div>
                          <ul className="space-y-2 text-left text-sm mt-6">
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 모든 비즈니스 기능</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 우선 지원</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 베타 기능 이용</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" asChild><Link href="/login">퍼스트 클래스 문의</Link></Button>
                      </CardFooter>
                  </Card>
              </div>
            </div>
             <div className="mt-8">
                 <Button size="lg" variant="link" asChild>
                    <Link href="/pricing">
                        모든 플랜 비교하기
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                 </Button>
             </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">전 세계 개발자들의 사랑을 받습니다</h2>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 mt-12">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">"{testimonial.text}"</p>
                        <div className="mt-4">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
