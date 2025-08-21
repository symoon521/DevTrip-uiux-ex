import { PassportRedesigned } from "@/components/passport-redesigned";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-4">
          나의 DevOps 여정
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          당신의 성취와 진행상황을 확인하고, 다음 모험을 계획해보세요
        </p>
      </div>
      <div className="flex-1">
        <PassportRedesigned />
      </div>
    </div>
  )
}
