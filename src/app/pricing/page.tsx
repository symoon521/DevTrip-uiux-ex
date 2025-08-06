import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

const plans = [
    {
        name: "Economy Class",
        price: "$0",
        period: "/month",
        description: "Perfect for starting your journey and exploring basic concepts.",
        features: [
            "3 free mission tickets per day",
            "Access to beginner missions",
            "Standard AI-powered feedback",
            "Community support",
        ],
        cta: "Start for Free",
        href: "/login",
        isPopular: false,
    },
    {
        name: "Business Class",
        price: "$29",
        period: "/month",
        description: "The ideal choice for serious learners aiming to master DevOps.",
        features: [
            "Unlimited mission tickets",
            "Full access to all missions",
            "Advanced AI evaluation & reports",
            "Isolated, high-performance environments",
            "Priority support",
        ],
        cta: "Upgrade to Business",
        href: "/login?plan=business",
        isPopular: true,
    },
    {
        name: "First Class",
        price: "$50",
        period: "/month",
        description: "For professionals who demand the best experience and features.",
        features: [
            "All Business Class features",
            "1-on-1 expert sessions (2/month)",
            "Early access to new missions & features",
            "Dedicated support channel",
        ],
        cta: "Go First Class",
        href: "/login?plan=first",
        isPopular: false,
    }
]

export default function PricingPage() {
    return (
        <div className="bg-secondary">
        <div className="container mx-auto py-20 px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Choose Your Ticket</h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    Flexible plans for every stage of your DevOps journey. No turbulence, just smooth learning.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${plan.isPopular ? 'border-primary ring-2 ring-primary shadow-2xl' : ''}`}>
                        {plan.isPopular && (
                            <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1 rounded-t-lg">
                                MOST POPULAR
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                            <div className="flex items-baseline mt-4">
                                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                                {plan.period && <span className="text-xl font-semibold text-muted-foreground">{plan.period}</span>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg" className="w-full" variant={plan.isPopular ? "default" : "outline"} asChild>
                                <Link href={plan.href}>{plan.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="mt-12 bg-background">
                <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 className="text-2xl font-bold">Need a Team Plan?</h3>
                        <p className="text-muted-foreground mt-2">
                            Custom solutions for businesses and educational institutions. Manage your team's journey with a unified dashboard and billing.
                        </p>
                    </div>
                    <div className="md:text-right">
                        <Button size="lg" variant="default" asChild>
                            <Link href="/contact-sales">
                                Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
        </div>
    )
}
