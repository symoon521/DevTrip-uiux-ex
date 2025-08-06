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
      title: "Fundamentals: Deployments",
      difficulty: "Intermediate",
      estimatedTime: 45,
      prerequisites: ["Docker Basics"],
      stack: "kubernetes",
      city: "Berlin",
    },
    {
      id: "k8s-services",
      title: "Networking: Services & Ingress",
      difficulty: "Intermediate",
      estimatedTime: 60,
      prerequisites: ["K8s Deployments"],
      stack: "kubernetes",
      city: "Munich",
    },
    {
      id: "k8s-hpa",
      title: "Autoscaling: HPA",
      difficulty: "Advanced",
      estimatedTime: 75,
      prerequisites: ["K8s Services", "Prometheus"],
      stack: "kubernetes",
      city: "Hamburg",
    },
  ],
  docker: [
    {
      id: "docker-basics",
      title: "Containerize a Node.js App",
      difficulty: "Beginner",
      estimatedTime: 30,
      prerequisites: [],
      stack: "docker",
      city: "San Francisco",
    },
    {
      id: "docker-compose",
      title: "Multi-Container with Compose",
      difficulty: "Beginner",
      estimatedTime: 45,
      prerequisites: ["Docker Basics"],
      stack: "docker",
      city: "New York",
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
            Back to World Map
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Missions available in {stackName}</h1>
        <p className="text-muted-foreground">
          Select your next destination and start your mission.
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
            <AlertTitle>No Flights Scheduled</AlertTitle>
            <AlertDescription>
              There are currently no missions available for the {stackName} destination. Please check back later or explore another technology.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
