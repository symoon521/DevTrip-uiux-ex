import Link from "next/link"
import { Plane, Github, Twitter, Linkedin } from "lucide-react"

export function MarketingFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Plane className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold">DevTrip</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your interactive journey to master DevOps.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="#" aria-label="Github"><Github className="h-5 w-5 hover:text-primary" /></Link>
            <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary" /></Link>
            <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 hover:text-primary" /></Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
          <div>
            <h3 className="font-semibold">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="/missions" className="text-sm text-muted-foreground hover:text-primary">Missions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-muted text-muted-foreground">
        <div className="container mx-auto flex items-center justify-center px-4 py-4 md:px-6">
          <p className="text-xs">© 2024 DevTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
