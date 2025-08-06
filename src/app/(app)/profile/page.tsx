import { Passport } from "@/components/passport";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">나의 여행 서류</h1>
        <p className="text-muted-foreground">
          여정, 성과 및 계정 세부 정보를 검토하세요.
        </p>
      </div>
      <div className="group">
        <Passport />
      </div>
    </div>
  )
}
