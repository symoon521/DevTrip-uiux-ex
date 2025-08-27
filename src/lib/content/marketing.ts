
import { Map, Rocket, BrainCircuit, Terminal } from "lucide-react";

export const technologies = [
  { name: "Docker", icon: "https://static.cdnlogo.com/logos/d/17/docker.svg", inverted: true },
  { name: "Kubernetes", icon: "https://static.cdnlogo.com/logos/k/14/kubernetes.svg", inverted: true },
  { name: "Jenkins", icon: "https://static.cdnlogo.com/logos/j/95/jenkins.svg", inverted: true },
  { name: "ArgoCD", icon: "https://www.svgrepo.com/show/353445/argocd.svg", inverted: true },
  { name: "Kafka", icon: "https://static.cdnlogo.com/logos/k/35/kafka.svg", inverted: true },
  { name: "Prometheus", icon: "https://static.cdnlogo.com/logos/p/41/prometheus.svg", inverted: true },
  { name: "Helm", icon: "https://static.cdnlogo.com/logos/h/79/helm.svg", inverted: true },
  { name: "Terraform", icon: "https://static.cdnlogo.com/logos/t/40/terraform.svg", inverted: true },
  { name: "Ansible", icon: "https://static.cdnlogo.com/logos/a/46/ansible.svg", inverted: true },
];

export const features = [
  {
    icon: Map,
    title: "인터랙티브 월드맵",
    description: "DevOps 도구의 세계를 탐험하세요. 각 나라는 기술이며, 각 도시는 새로운 미션입니다.",
  },
  {
    icon: Rocket,
    title: "실전 중심 미션",
    description: "실제 DevOps 과제를 반영한 실습 랩을 통해 이론을 넘어 직접 경험해 보세요.",
  },
  {
    icon: BrainCircuit,
    title: "AI 기반 피드백",
    description: "코드와 환경 설정에 대해 즉각적이고 지능적인 피드백을 받아 성장을 가속화하세요.",
  },
  {
    icon: Terminal,
    title: "완벽한 학습 환경",
    description: "전문가처럼 통합 리소스 모니터링이 가능한 실시간 터미널에서 작업하세요.",
  },
];

export const testimonials = [
    {
      name: "Alex Johnson",
      role: "DevOps Engineer, TechCorp",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "man portrait",
      text: "DevTrip은 게임 체인저입니다. 실제 경험에 가장 가까운 핸즈온 랩을 찾았습니다. 복잡한 개념을 시각화하는 방식은 타의 추종을 불허합니다.",
    },
    {
      name: "Samantha Lee",
      role: "Cloud Architect, Stratosphere Inc.",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "woman portrait",
      text: "AI 피드백 덕분에 제가 저지르고 있는지도 몰랐던 실수들을 발견할 수 있었습니다. 제 기술이 극적으로 향상되었어요. 모든 클라우드 전문가에게 추천합니다.",
    },
     {
      name: "김민준",
      role: "SRE, 카카오",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "korean man portrait",
      text: "국내에 이런 플랫폼이 있다는 것이 놀랍습니다. 실제 현업과 유사한 환경에서 마음껏 테스트하고 배울 수 있어 신입 교육용으로도 도입을 검토 중입니다.",
    },
    {
      name: "Isabella Rossi",
      role: "Software Developer, CodeWeavers",
      avatar: "https://placehold.co/100x100.png",
      dataAiHint: "italian woman portrait",
      text: "개발자로서 DevOps 지식은 필수라고 생각했습니다. DevTrip은 딱딱한 문서를 읽는 것보다 훨씬 재미있고 효과적으로 학습할 수 있는 최고의 방법입니다.",
    },
  ];
