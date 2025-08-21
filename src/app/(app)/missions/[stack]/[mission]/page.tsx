import { MissionView } from "@/components/mission-view";
import type { Mission } from "@/components/mission-ticket";

// Mock data, in a real app this would be fetched from a DB
const missionDetails: { [key: string]: Mission & { description: string; steps: { title: string; content: string }[] } } = {
  "k8s-deployments": {
    id: "k8s-deployments",
    title: "기초: 배포",
    difficulty: "Intermediate",
    estimatedTime: 45,
    prerequisites: ["Docker 기초"],
    stack: "kubernetes",
    city: "베를린",
    description: "쿠버네티스 배포를 사용하여 애플리케이션을 배포, 업데이트 및 관리하는 방법을 배웁니다. 간단한 웹 서버에 대한 배포를 생성하고 노출합니다.",
    steps: [
      {
        title: "1단계: 배포 YAML 생성",
        content: "`deployment.yaml`이라는 파일을 만듭니다. `nginx:1.14.2` 이미지의 복제본 2개를 사용하여 배포를 정의합니다. 컨테이너는 포트 80을 노출해야 합니다."
      },
      {
        title: "2단계: 배포 적용",
        content: "`kubectl apply -f deployment.yaml`을 사용하여 환경에 배포 리소스를 생성합니다."
      },
      {
        title: "3단계: 배포 확인",
        content: "`kubectl get deployments` 및 `kubectl get pods`를 사용하여 배포 및 파드의 상태를 확인합니다."
      },
      {
        title: "4단계: 배포 노출",
        content: "`NodePort` 유형의 서비스를 생성하여 NGINX 파드를 클러스터 외부 트래픽에 노출합니다. `service.yaml`을 만들고 적용하여 이 작업을 수행할 수 있습니다."
      }
    ]
  },
};

export default async function MissionPage({ params }: { params: Promise<{ mission: string }> }) {
  const { mission: missionId } = await params;
  const mission = missionDetails[missionId];

  if (!mission) {
    return <div>미션을 찾을 수 없습니다.</div>;
  }

  return (
      <MissionView mission={mission} />
  );
}
