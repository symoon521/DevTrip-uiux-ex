import { AssessmentReport } from "@/components/assessment-report";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data, in a real app this would be fetched from a DB
const missionDetails = {
  "k8s-deployments": {
    id: "k8s-deployments",
    title: "Fundamentals: Deployments",
    stack: "kubernetes",
  },
};

export default function AssessmentPage({ params }: { params: { mission: string, stack: string } }) {
  const mission = missionDetails[params.mission as keyof typeof missionDetails];

  if (!mission) {
    return <div>Mission not found.</div>;
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
                Back to Mission
            </Link>
            </Button>
            <h1 className="text-3xl font-bold">Assessment Report</h1>
            <p className="text-muted-foreground">AI-powered feedback for your attempt at "{mission.title}".</p>
        </div>
      <AssessmentReport 
        missionDescription={mission.title} 
        code={mockCode} 
        environmentState="Deployment and Service created successfully. 2/2 pods are running."
      />
    </div>
  );
}
