import Link from "next/link";
import { Gavel, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Gavel className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg sm:text-xl tracking-tight">The Referee</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/compare" className="text-sm font-medium transition-colors hover:text-primary hidden sm:block">
            Compare
          </Link>
        
        </nav>
      </div>
    </header>
  );
}
