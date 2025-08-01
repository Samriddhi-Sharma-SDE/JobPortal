
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    if (isHomePage) {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    } else {
        setScrolled(true);
    }
  }, [isHomePage, pathname]);

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isHomePage && !scrolled 
            ? "bg-transparent" 
            : "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Briefcase className="w-6 h-6 text-primary" />
          <span className="font-bold">Job Portal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/jobs" className="text-muted-foreground transition-colors hover:text-foreground">Jobs</Link>
            <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
            <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
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
