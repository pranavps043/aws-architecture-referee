"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { comparisons, ServiceAttributes } from "@/data/comparisons";
import { cn } from "@/lib/utils";

interface UserRequirements {
  traffic: string;
  budget: string;
  ops: string;
  workload: string;
}

const steps: { key: keyof UserRequirements; label: string; options: string[] }[] = [
  { key: "traffic", label: "Traffic Pattern", options: ["Low", "Spiky", "Consistent", "High"] },
  { key: "budget", label: "Budget Constraint", options: ["Low", "Medium", "High"] },
  { key: "ops", label: "Ops Effort Willingness", options: ["Low", "Medium", "High"] },
  { key: "workload", label: "Workload Duration", options: ["Short", "Long", "Always On"] },
];

export function RecommendationWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [requirements, setRequirements] = useState<UserRequirements>({
    traffic: "",
    budget: "",
    ops: "",
    workload: "",
  });
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleSelect = (option: string) => {
    const currentStep = steps[currentStepIndex];
    setRequirements((prev) => ({ ...prev, [currentStep.key]: option }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      calculateRecommendation();
      setCurrentStepIndex((prev) => prev + 1); // Move to result
    }
  };

  const calculateRecommendation = () => {
    // Scoring logic
    let bestService = null;
    let highestScore = -1;
    let justification = "";

    // Flatten all services from comparisons
    const candidates = comparisons.flatMap(c => [
        { service: c.serviceA, comparisonId: c.id }, 
        { service: c.serviceB, comparisonId: c.id }
    ]);
    
    candidates.forEach(({ service, comparisonId }) => {
      let score = 0;
      const attrs = service.attributes;
      
      // Exact matches get points
      if (attrs.traffic.includes(requirements.traffic as ServiceAttributes["traffic"][number])) score += 3;
      if (attrs.budget.includes(requirements.budget as ServiceAttributes["budget"][number])) score += 2;
      if (attrs.ops.includes(requirements.ops as ServiceAttributes["ops"][number])) score += 2;
      if (attrs.workload.includes(requirements.workload as ServiceAttributes["workload"][number])) score += 2;

      if (score > highestScore) {
        highestScore = score;
        bestService = { ...service, comparisonId };
        justification = `Best match for ${requirements.traffic} traffic and ${requirements.budget} budget.`;
      }
    });

    setRecommendation({ service: bestService, score: highestScore, justification });
  };

  const reset = () => {
    setCurrentStepIndex(0);
    setRequirements({ traffic: "", budget: "", ops: "", workload: "" });
    setRecommendation(null);
  };

  if (currentStepIndex >= steps.length) {
    // Result View
    if(!recommendation?.service) return <div className="p-4">No match found. <Button onClick={reset}>Try Again</Button></div>;

    const { service } = recommendation;
    const comparisonId = service.comparisonId;

    return (
      <Card className="w-full max-w-lg mx-auto border-primary/50 shadow-lg shadow-primary/10">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold uppercase text-xs tracking-wider">Referee&apos;s Assistant</span>
          </div>
          <CardTitle className="text-2xl">Recommended: {service.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{service.description}</p>
          <div className="bg-secondary/50 p-4 rounded-lg text-sm border border-border">
            <p className="font-medium mb-2">Why this match?</p>
             <ul className="space-y-1">
                <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span> Matches {requirements.traffic} traffic</span>
                </li>
                 <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span> Fits {requirements.budget} budget</span>
                </li>
             </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
           <Button asChild className="w-full">
            <a href={`/compare/${comparisonId}`}>See Full Comparison</a>
           </Button>
           <Button variant="outline" onClick={reset} className="w-full">Start Over</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentStep = steps[currentStepIndex];

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
         <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="w-fit">Step {currentStepIndex + 1} of {steps.length}</Badge>
            <span className="text-xs text-muted-foreground">Smart Referee</span>
         </div>
         <CardTitle>{currentStep.label}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentStep.options.map((option) => (
          <Button
            key={option}
            variant={requirements[currentStep.key] === option ? "default" : "outline"}
            className={cn(
                "h-auto py-4 justify-start px-4",
                requirements[currentStep.key] === option && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => handleSelect(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
            className="w-full" 
            disabled={!requirements[currentStep.key]} 
            onClick={handleNext}
        >
          {currentStepIndex === steps.length - 1 ? "Get Recommendation" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
