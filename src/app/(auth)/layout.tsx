import Link from "next/link";
import { Plane } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem]">
         <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#0ea5e9,transparent)] opacity-20"></div>
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
