import { WorldMap } from "@/components/world-map"

export default function MissionsPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <h1 className="text-3xl font-bold">Choose Your Destination</h1>
        <p className="text-muted-foreground">
          Select a technology stack on the map to view available missions.
        </p>
      </div>
      <div className="flex-1 min-h-[50vh]">
        <WorldMap />
      </div>
    </div>
  )
}
