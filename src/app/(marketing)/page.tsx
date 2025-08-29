"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Map, Rocket, BrainCircuit, Terminal, ArrowRight, CircleCheckBig, Star } from "lucide-react"

const technologies = [
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain-wordmark.svg" },
  { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original-wordmark.svg" },
  { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original-wordmark.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original-wordmark.svg" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
];


export default function LandingPage() {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: "인터랙티브 월드맵",
      description: "DevOps 도구의 세계를 탐험하세요. 각 나라는 기술이며, 각 도시는 새로운 미션입니다.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "실전 중심 미션",
      description: "실제 DevOps 과제를 반영한 실습 랩을 통해 이론을 넘어 직접 경험해 보세요.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "AI 기반 피드백",
      description: "코드와 환경 설정에 대해 즉각적이고 지능적인 피드백을 받아 성장을 가속화하세요.",
    },
    {
      icon: <Terminal className="h-8 w-8 text-primary" />,
      title: "완벽한 학습 환경",
      description: "전문가처럼 통합 리소스 모니터링이 가능한 실시간 터미널에서 작업하세요.",
    },
  ]

  const testimonials = [
    {
      name: "WildMental",
      role: "DevOps Engineer, TechCorp",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "man portrait",
      text: "DevTrip은 게임 체인저입니다. 실제 경험에 가장 가까운 핸즈온 랩을 찾았습니다. 복잡한 개념을 시각화하는 방식은 타의 추종을 불허합니다.",
    },
    {
      name: "MindSetting",
      role: "10x Infra Engineer, AWS KR",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "woman portrait",
      text: "AI 피드백 덕분에 제가 저지르고 있는지도 몰랐던 실수들을 발견할 수 있었습니다. 제 기술이 극적으로 향상되었어요. 모든 클라우드 전문가에게 추천합니다.",
    },
     {
      name: "YesDevReady",
      role: "Infinite Cloud Engineer, Google KR",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "korean man portrait",
      text: "국내에 이런 플랫폼이 있다는 것이 놀랍습니다. 실제 현업과 유사한 환경에서 마음껏 테스트하고 배울 수 있어 신입 교육용으로도 도입을 검토 중입니다.",
    },
    {
      name: "Frog_DY",
      role: "DevOps Engineer, Microsoft KR",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "italian woman portrait",
      text: "개발자로서 DevOps 지식은 필수라고 생각했습니다. DevTrip은 딱딱한 문서를 읽는 것보다 훨씬 재미있고 효과적으로 학습할 수 있는 최고의 방법입니다.",
    },
  ]


  return (
    <div className="flex flex-col min-h-[100dvh] bg-background relative">
      <main className="flex-1">
        <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 lg:pt-56 lg:pb-40">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#0ea5e9,transparent)] opacity-20"></div></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                 <div className="inline-block rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary shadow-lg shadow-primary/20">
                    DevOps 학습의 새로운 패러다임
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl !leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  DevOps 세계 일주, <br /> 지금 바로 탑승하세요.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  읽고 보는 학습은 이제 그만. DevTrip의 인터랙티브 미션을 통해 전 세계를 여행하며 최고의 DevOps 전문가로 거듭나세요.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105" asChild>
                  <Link href="/login">
                    여정 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full relative py-12">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
            <div className="text-center mb-12">
                <p className="text-primary font-semibold">WORLD-CLASS TECHNOLOGIES</p>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">미션에서 다루는 주요 기술 스택</h2>
            </div>
            <div className="w-full overflow-hidden">
                <div className="flex gap-8 animate-marquee-to-left">
                    {[...technologies, ...technologies].map((tech, index) => (
                        <div key={`d1-${index}`} className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10">
                           <Image src={tech.icon} alt={tech.name} width={50} height={50} />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-primary font-semibold">핵심 기능</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">보기만 하는 것이 아니라, 직접 해보며 배우세요</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  DevTrip은 최고의 DevOps 전문가들이 사용하는 도구와 기술에 대한 실용적인 핸즈온 경험을 제공하도록 설계되었습니다.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full bg-secondary border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all transform hover:-translate-y-2">
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

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
               <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-primary font-semibold">유연한 요금제</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">모험을 위한 티켓을 선택하세요</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                개인 및 팀을 위한 합리적인 플랜. 무료로 시작하고 성장함에 따라 업그레이드하세요.
              </p>
            </div>
            <div className="mx-auto w-full max-w-5xl pt-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="flex flex-col bg-card/50 border-border/50">
                      <CardHeader className="flex-1 pb-4">
                          <CardTitle>이코노미</CardTitle>
                          <p className="pt-2 text-muted-foreground">기본적인 기능으로 시작하는 플랜</p>
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">₩0<span className="text-lg font-normal text-muted-foreground">/월</span></div>
                          <ul className="space-y-2 text-left text-sm mt-6 text-muted-foreground">
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 무료 미션 이용</li>
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 기본 AI 피드백</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" asChild><Link href="/login">시작하기</Link></Button>
                      </CardFooter>
                  </Card>
                  <Card className="flex flex-col border-primary shadow-2xl shadow-primary/20 relative transform scale-105">
                        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                            <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full w-fit">가장 인기있음</div>
                        </div>
                      <CardHeader className="flex-1 pb-4">
                          <CardTitle>비즈니스</CardTitle>
                          <p className="pt-2 text-muted-foreground">성장을 위한 모든 기능을 갖춘 플랜</p>
                      </CardHeader>
                      <CardContent>
                           <div className="text-4xl font-bold">₩29,000<span className="text-lg font-normal text-muted-foreground">/월</span></div>
                          <ul className="space-y-2 text-left text-sm mt-6 text-muted-foreground">
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 전체 미션 라이브러리</li>
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 고급 AI 평가</li>
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 전문가 수준 환경</li>
                               <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 우선 지원</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild><Link href="/login">비즈니스 플랜 시작</Link></Button>
                      </CardFooter>
                  </Card>
                  <Card className="flex flex-col bg-card/50 border-border/50">
                      <CardHeader className="flex-1 pb-4">
                          <CardTitle>퍼스트 클래스</CardTitle>
                           <p className="pt-2 text-muted-foreground">전문가를 위한 최고의 경험</p>
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">₩50,000<span className="text-lg font-normal text-muted-foreground">/월</span></div>
                          <ul className="space-y-2 text-left text-sm mt-6 text-muted-foreground">
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 모든 비즈니스 기능</li>
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 전담 기술 지원</li>
                              <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 베타 기능 우선 이용</li>
                               <li className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-primary" /> 1:1 멘토링 세션</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" asChild><Link href="/login">퍼스트 클래스 문의</Link></Button>
                      </CardFooter>
                  </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">전 세계 전문가들의 찬사</h2>
             <p className="max-w-[900px] mx-auto text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                DevTrip은 단순한 학습 도구를 넘어, 커리어의 성장을 이끄는 파트너입니다.
             </p>
            <div className="mx-auto grid max-w-6xl items-start gap-8 sm:grid-cols-2 mt-12">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 bg-secondary border-border/50">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-base text-foreground/90">"{testimonial.text}"</p>
                        <div className="mt-4">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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