import { AssessmentReport } from "@/components/assessment-report";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data, in a real app this would be fetched from a DB
const missionDetails = {
  "k8s-deployments": {
    id: "k8s-deployments",
    title: "기초: 배포",
    stack: "kubernetes",
  },
};

export default function AssessmentPage({ params }: { params: { mission: string, stack: string } }) {
  const mission = missionDetails[params.mission as keyof typeof missionDetails];

  if (!mission) {
    return <div>미션을 찾을 수 없습니다.</div>;
  }
  
  const mockCode = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
`;

  return (
    <div className="flex flex-col gap-6">
        <div>
            <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href={`/missions/${params.stack}/${params.mission}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                미션으로 돌아가기
            </Link>
            </Button>
            <h1 className="text-3xl font-bold">평가 보고서</h1>
            <p className="text-muted-foreground">"{mission.title}" 시도에 대한 AI 기반 피드백입니다.</p>
        </div>
      <AssessmentReport 
        missionDescription={mission.title} 
        code={mockCode} 
        environmentState="배포 및 서비스가 성공적으로 생성되었습니다. 2/2개의 파드가 실행 중입니다."
      />
    </div>
  );
}
