"use client"

import { useEffect, useState } from "react";
import { codeAssessment, type CodeAssessmentOutput } from "@/ai/flows/code-assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, ShieldCheck, Zap, Bot, Star, ListChecks } from "lucide-react";

interface AssessmentReportProps {
  missionDescription: string;
  code: string;
  environmentState: string;
}

const ScoreIndicator = ({ score }: { score: number }) => {
    let colorClass = "bg-red-500";
    if (score > 85) {
        colorClass = "bg-green-500";
    } else if (score > 60) {
        colorClass = "bg-yellow-500";
    }

    return (
        <div className="relative h-32 w-32">
            <svg className="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="2"></circle>
                <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className={`stroke-current ${colorClass.replace("bg-", "text-")}`}
                strokeWidth="2"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
                ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{score}</span>
            </div>
        </div>
    );
};

export function AssessmentReport({ missionDescription, code, environmentState }: AssessmentReportProps) {
  const [result, setResult] = useState<CodeAssessmentOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAssessment = async () => {
      try {
        setLoading(true);
        const assessmentResult = await codeAssessment({
          code,
          missionDescription,
          environmentState,
        });
        setResult(assessmentResult);
      } catch (e) {
        setError("Failed to get assessment. Please try again later.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getAssessment();
  }, [code, missionDescription, environmentState]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
            <CardHeader className="items-center text-center">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-6 w-full" />
            </CardContent>
        </Card>
        <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || "An unknown error occurred."}</AlertDescription>
      </Alert>
    );
  }

  const analysisItems = [
    { title: "Code Quality", content: result.codeQuality, icon: <ListChecks className="h-6 w-6 text-blue-500" /> },
    { title: "Security Analysis", content: result.securityAnalysis, icon: <ShieldCheck className="h-6 w-6 text-green-500" /> },
    { title: "Performance Analysis", content: result.performanceAnalysis, icon: <Zap className="h-6 w-6 text-yellow-500" /> },
    { title: "Environment Analysis", content: result.environmentAnalysis, icon: <Bot className="h-6 w-6 text-purple-500" /> },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="md:col-span-1 sticky top-24">
            <CardHeader className="items-center text-center">
                <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <ScoreIndicator score={result.overallScore} />
                <div className="w-full text-center">
                    <p className="font-semibold text-lg">Great work!</p>
                    <p className="text-sm text-muted-foreground">Review the feedback for improvements.</p>
                </div>
            </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
            {analysisItems.map(item => item.content && (
                <Card key={item.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {item.icon}
                            <span>{item.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                    </CardContent>
                </Card>
            ))}
             <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Star className="h-6 w-6 text-primary" />
                        <span>Recommendations</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.recommendations}</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
