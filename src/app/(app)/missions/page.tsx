import { WorldMap } from "@/components/world-map"

export default function MissionsPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <h1 className="text-3xl font-bold">목적지 선택</h1>
        <p className="text-muted-foreground">
          지도에서 기술 스택을 선택하여 가능한 미션을 확인하세요.
        </p>
      </div>
      <div className="flex-1 min-h-[50vh] relative">
        <WorldMap />
      </div>
    </div>
  )
}
