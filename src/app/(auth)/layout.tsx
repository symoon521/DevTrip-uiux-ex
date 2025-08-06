import Link from "next/link";
import { Plane } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary relative">
       <div className="absolute inset-0 -z-10">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Background"
              fill
              className="object-cover opacity-10"
              data-ai-hint="abstract geometric"
            />
             <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/80 to-background"></div>
        </div>
      <div className="absolute top-8">
         <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">DevTrip</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
