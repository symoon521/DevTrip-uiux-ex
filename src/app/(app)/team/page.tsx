import { TeamSystem } from "@/components/team-system"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-950 p-6 relative overflow-hidden">
      {/* 배경 장식 효과 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            팀 관리
          </h1>
          <p className="text-slate-300 text-lg">
            팀원들과 함께 DevOps 여행을 떠나보세요!
          </p>
        </div>
        
        <TeamSystem />
      </div>
    </div>
  )
}