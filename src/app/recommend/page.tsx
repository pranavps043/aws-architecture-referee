import { Header } from "@/components/Header";
import { RecommendationWizard } from "@/components/RecommendationWizard";

export default function RecommendPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 flex flex-col items-center justify-center py-12 mx-auto px-4">
        <div className="text-center mb-8 space-y-4">
           <h1 className="font-heading text-3xl font-bold md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              The Smart Referee
           </h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us about your requirements, and our AI-powered logic will recommend the best architecture pattern for you.
           </p>
        </div>
        <RecommendationWizard />
      </main>
    </div>
  );
}
