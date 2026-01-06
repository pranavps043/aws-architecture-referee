import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { comparisons } from "@/data/comparisons";
import { cn } from "@/lib/utils";



// In Next.js 15, params is async. But in 14 it's not (mostly). 
// However, to be safe and future proof or safe with recent updates, 
// I'll treat it as prop but in recent Next.js versions (15), params must be awaited.
// The task setup installed Next 16? Checking package.json... "next": "16.1.1".
// Wait, Next.js 16? That must be a very new release or canary.
// If it is 16, params ARE async.
// I should handle `params` as a Promise.

export default async function ComparisonDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comparison = comparisons.find((c) => c.id === id);

  if (!comparison) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0 hover:pl-0 mb-4">
            <Link href="/compare">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Comparisons
            </Link>
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{comparison.category}</Badge>
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-5xl">
            {comparison.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
            {comparison.summary}
          </p>
        </div>

        {/* Side by Side */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mb-16">
          {/* Service A */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6 border-primary/20 bg-primary/5">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {comparison.serviceA.name}
              </h2>
              <p className="text-muted-foreground mt-2">{comparison.serviceA.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center text-green-500">
                <Check className="mr-2 h-5 w-5" /> Pros
              </h3>
              <ul className="space-y-2">
                {comparison.serviceA.pros.map((pro, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="mr-2">•</span> {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
               <h3 className="font-semibold text-lg flex items-center text-red-500">
                <X className="mr-2 h-5 w-5" /> Cons
              </h3>
              <ul className="space-y-2">
                {comparison.serviceA.cons.map((con, i) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground">
                    <span className="mr-2">•</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service B */}
           <div className="space-y-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6 border-blue-500/20 bg-blue-500/5">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {comparison.serviceB.name}
              </h2>
              <p className="text-muted-foreground mt-2">{comparison.serviceB.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center text-green-500">
                <Check className="mr-2 h-5 w-5" /> Pros
              </h3>
              <ul className="space-y-2">
                {comparison.serviceB.pros.map((pro, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="mr-2">•</span> {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
               <h3 className="font-semibold text-lg flex items-center text-red-500">
                <X className="mr-2 h-5 w-5" /> Cons
              </h3>
              <ul className="space-y-2">
                {comparison.serviceB.cons.map((con, i) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground">
                    <span className="mr-2">•</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Verdict Details */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          <div className="lg:col-span-2">
             <Card>
              <CardHeader>
                <CardTitle>Head-to-Head Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {comparison.comparisonPoints.map((point, i) => (
                    <div key={i} className="grid sm:grid-cols-3 gap-4 py-4 border-b last:border-0">
                      <div className="font-medium text-sm text-muted-foreground flex items-center">
                        {point.dimension}
                      </div>
                      <div className={cn("text-sm", point.winner === "A" && "font-bold text-primary")}>
                        <span className="sr-only">{comparison.serviceA.name}:</span> {point.serviceAValue}
                      </div>
                      <div className={cn("text-sm", point.winner === "B" && "font-bold text-blue-500")}>
                        <span className="sr-only">{comparison.serviceB.name}:</span> {point.serviceBValue}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
             </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Trophy className="h-6 w-6" />
                  <span className="font-bold uppercase tracking-wider text-sm">The Verdict</span>
                </div>
                <CardTitle className="text-xl">Referee&apos;s Call</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  {comparison.verdict}
                </p>
                <div className="mt-8 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Choose {comparison.serviceA.name} if:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {comparison.serviceA.bestFor.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                   <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Choose {comparison.serviceB.name} if:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {comparison.serviceB.bestFor.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
