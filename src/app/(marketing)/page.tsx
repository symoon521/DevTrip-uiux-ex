import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Map, Rocket, BrainCircuit, Terminal, ArrowRight, CheckCircle } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: "Interactive World Map",
      description: "Navigate a world of DevOps tools. Each country is a technology, each city a new mission.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Real-World Missions",
      description: "Go beyond theory with hands-on labs that mirror real-world DevOps challenges.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "AI-Powered Feedback",
      description: "Receive instant, intelligent feedback on your code and environment configurations.",
    },
    {
      icon: <Terminal className="h-8 w-8 text-primary" />,
      title: "Live Terminal & Monitoring",
      description: "Work in a real-time terminal with integrated resource monitoring, just like a pro.",
    },
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "DevOps Engineer",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "man portrait",
      text: "DevTrip is a game-changer. The hands-on labs are the closest thing to real-world experience I've found.",
    },
    {
      name: "Samantha Lee",
      role: "Cloud Architect",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "woman portrait",
      text: "The AI feedback helped me spot mistakes I didn't even know I was making. My skills have improved dramatically.",
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
              layout="fill"
              objectFit="cover"
              className="opacity-10"
              data-ai-hint="world map tech"
            />
             <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
          </div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Your DevOps World Tour Begins Here
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Stop reading, start doing. DevTrip is an interactive platform that turns DevOps learning into a global adventure.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Start Your Journey
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
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learn by Doing, Not Just Watching</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to give you practical, hands-on experience with the tools and techniques used by top DevOps professionals.
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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Choose Your Ticket to Adventure</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Affordable plans for individuals and teams. Start for free and upgrade as you grow.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl pt-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="flex flex-col">
                      <CardHeader className="flex-1">
                          <CardTitle>Economy</CardTitle>
                          <div className="text-4xl font-bold mt-4">$0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-2 text-left text-sm">
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Free missions access</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Basic AI feedback</li>
                          </ul>
                      </CardContent>
                      <CardContent>
                        <Button className="w-full" variant="outline" asChild><Link href="/login">Get Started</Link></Button>
                      </CardContent>
                  </Card>
                  <Card className="flex flex-col border-primary shadow-lg">
                      <CardHeader className="flex-1">
                          <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full w-fit mb-2">MOST POPULAR</div>
                          <CardTitle>Business Class</CardTitle>
                          <div className="text-4xl font-bold mt-4">$29<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-2 text-left text-sm">
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Full mission library</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Advanced AI evaluation</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Pro-level environments</li>
                          </ul>
                      </CardContent>
                      <CardContent>
                        <Button className="w-full" asChild><Link href="/login">Choose Business</Link></Button>
                      </CardContent>
                  </Card>
                  <Card className="flex flex-col">
                      <CardHeader className="flex-1">
                          <CardTitle>First Class</CardTitle>
                          <div className="text-4xl font-bold mt-4">$50<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-2 text-left text-sm">
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> All Business features</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Priority support</li>
                              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Beta feature access</li>
                          </ul>
                      </CardContent>
                      <CardContent>
                        <Button className="w-full" variant="outline" asChild><Link href="/login">Go First Class</Link></Button>
                      </CardContent>
                  </Card>
              </div>
            </div>
             <div className="mt-8">
                 <Button size="lg" variant="link" asChild>
                    <Link href="/pricing">
                        Compare All Plans
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                 </Button>
             </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Loved by Developers Worldwide</h2>
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
