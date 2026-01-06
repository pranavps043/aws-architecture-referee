import Link from "next/link";
import { ArrowRight, Swords } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { comparisons } from "@/data/comparisons";

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container py-8 md:py-12 mx-auto px-4">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              Select a Matchup
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose two services to see the referee&apos;s verdict.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison) => (
            <Card key={comparison.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{comparison.category}</Badge>
                  <Swords className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="line-clamp-2">{comparison.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {comparison.summary}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/compare/${comparison.id}`}>
                    View Verdict <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
