import { Passport } from "@/components/passport";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Your Travel Documents</h1>
        <p className="text-muted-foreground">
          Review your journey, achievements, and account details.
        </p>
      </div>
      <div className="group">
        <Passport />
      </div>
    </div>
  )
}
