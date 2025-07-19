import Link from "next/link";
import { Button } from "./ui/button";
import { Briefcase } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">JobLink Local</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild><Link href="/jobs">Jobs</Link></Button>
            <Button variant="ghost" asChild><Link href="/about">About</Link></Button>
            <Button variant="ghost" asChild><Link href="/pricing">Pricing</Link></Button>
            <Button variant="ghost" asChild><Link href="/contact">Contact</Link></Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
