import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, User, UserCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">JobLink Local</h1>
          </Link>
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
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 font-headline">Find Your Next Opportunity, Locally.</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            JobLink Local connects talented professionals with innovative companies in their area. Powered by AI to help you find the perfect match.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/employee/dashboard">Employee Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/company/dashboard">Company Dashboard</Link>
            </Button>
             <Button size="lg" variant="outline" asChild>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-headline">How It Works</h3>
              <p className="text-muted-foreground">A simple process for every user.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">For Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Register your company, get approved by our admins, and post job openings. Use our AI tool to suggest powerful keywords and attract top talent.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">For Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create your profile, browse a curated list of local job opportunities, and apply with a single click. Your dream job is waiting for you.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <UserCheck className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">For Admins</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Maintain the integrity of the platform by reviewing and approving new company registrations, ensuring a high-quality experience for all users.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} JobLink Local. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
