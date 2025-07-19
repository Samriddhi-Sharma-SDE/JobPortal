import Link from "next/link";
import { Separator } from "./ui/separator";
import { Briefcase } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                <h1 className="text-lg font-bold">JobLink Local</h1>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link>
                  <Link href="/jobs" className="text-muted-foreground hover:text-foreground">Jobs</Link>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} JobLink Local. All Rights Reserved.</p>
        </div>
      </footer>
    )
}
