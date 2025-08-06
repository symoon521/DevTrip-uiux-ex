import { MissionView } from "@/components/mission-view";
import type { Mission } from "@/components/mission-ticket";

// Mock data, in a real app this would be fetched from a DB
const missionDetails: { [key: string]: Mission & { description: string; steps: { title: string; content: string }[] } } = {
  "k8s-deployments": {
    id: "k8s-deployments",
    title: "Fundamentals: Deployments",
    difficulty: "Intermediate",
    estimatedTime: 45,
    prerequisites: ["Docker Basics"],
    stack: "kubernetes",
    city: "Berlin",
    description: "Learn how to deploy, update, and manage applications on Kubernetes using Deployments. You will create a Deployment for a simple web server and expose it.",
    steps: [
      {
        title: "Step 1: Create a Deployment YAML",
        content: "Create a file named `deployment.yaml`. Define a Deployment with 2 replicas of the `nginx:1.14.2` image. The container should expose port 80."
      },
      {
        title: "Step 2: Apply the Deployment",
        content: "Use `kubectl apply -f deployment.yaml` to create the Deployment resource in your environment."
      },
      {
        title: "Step 3: Verify the Deployment",
        content: "Check the status of your Deployment and Pods using `kubectl get deployments` and `kubectl get pods`."
      },
      {
        title: "Step 4: Expose the Deployment",
        content: "Create a Service of type `NodePort` to expose your NGINX pods to traffic outside the cluster. You can do this by creating a `service.yaml` and applying it."
      }
    ]
  },
};

export default function MissionPage({ params }: { params: { mission: string } }) {
  const mission = missionDetails[params.mission];

  if (!mission) {
    return <div>Mission not found.</div>;
  }

  return (
      <MissionView mission={mission} />
  );
}
