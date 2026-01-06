import Link from "next/link";
import { ArrowRight, Scale, Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
            <Link
              href="https://aws.amazon.com/builders-library/"
              className="rounded-2xl bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              target="_blank"
            >
              Inspired by AWS Builders&apos; Library
            </Link>
            <h1 className="font-heading text-3xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
              Architecture decisions, <br className="hidden md:block" />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                simplified.
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Don&apos;t just guess. Compare AWS services side-by-side, understand the trade-offs, and make the right call for your architecture.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="h-11 px-8">
                <Link href="/compare">
                  Start Comparing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
               <Button asChild variant="secondary" size="lg" className="h-11 px-8 font-semibold">
                <Link href="/recommend">
                  <Sparkles className="mr-2 h-4 w-4 text-purple-500" /> Ask Smart Referee
                </Link>
              </Button>
          
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24 mx-auto px-4">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              Why use The Referee?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Validating your architectural choices shouldn&apos;t take hours of reading documentation.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <Scale className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Trade-off Analysis</CardTitle>
                <CardDescription>
                  Clear pros and cons for every option. Know exactly what you are gaining and giving up.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Speed to Decision</CardTitle>
                <CardDescription>
                  Skip the endless research. Get the key facts in a condensed, side-by-side view.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  Recommendations based on real-world use cases and AWS Well-Architected principles.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
  
    </div>
  );
}
