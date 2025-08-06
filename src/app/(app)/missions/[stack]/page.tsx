import Link from "next/link";
import { ArrowLeft, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MissionTicket, type Mission } from "@/components/mission-ticket";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


// Mock data for missions
const missionsByStack: { [key: string]: Mission[] } = {
  kubernetes: [
    {
      id: "k8s-deployments",
      title: "기초: 배포",
      difficulty: "Intermediate",
      estimatedTime: 45,
      prerequisites: ["Docker 기초"],
      stack: "kubernetes",
      city: "베를린",
    },
    {
      id: "k8s-services",
      title: "네트워킹: 서비스 & 인그레스",
      difficulty: "Intermediate",
      estimatedTime: 60,
      prerequisites: ["K8s 배포"],
      stack: "kubernetes",
      city: "뮌헨",
    },
    {
      id: "k8s-hpa",
      title: "오토스케일링: HPA",
      difficulty: "Advanced",
      estimatedTime: 75,
      prerequisites: ["K8s 서비스", "Prometheus"],
      stack: "kubernetes",
      city: "함부르크",
    },
  ],
  docker: [
    {
      id: "docker-basics",
      title: "Node.js 앱 컨테이너화하기",
      difficulty: "Beginner",
      estimatedTime: 30,
      prerequisites: [],
      stack: "docker",
      city: "샌프란시스코",
    },
    {
      id: "docker-compose",
      title: "Compose로 멀티 컨테이너 만들기",
      difficulty: "Beginner",
      estimatedTime: 45,
      prerequisites: ["Docker 기초"],
      stack: "docker",
      city: "뉴욕",
    },
  ],
  // Add other stacks here
};

export default function MissionListPage({ params }: { params: { stack: string } }) {
  const missions = missionsByStack[params.stack] || [];
  const stackName = params.stack.charAt(0).toUpperCase() + params.stack.slice(1);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/missions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            세계 지도로 돌아가기
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{stackName}에서 가능한 미션</h1>
        <p className="text-muted-foreground">
          다음 목적지를 선택하고 미션을 시작하세요.
        </p>
      </div>

      {missions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <MissionTicket key={mission.id} mission={mission} />
          ))}
        </div>
      ) : (
        <Alert>
            <Ticket className="h-4 w-4" />
            <AlertTitle>예정된 항공편 없음</AlertTitle>
            <AlertDescription>
              현재 {stackName} 목적지에 대한 미션이 없습니다. 나중에 다시 확인하거나 다른 기술을 탐색해 보세요.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
