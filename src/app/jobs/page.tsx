"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/JobCard";
import { getJobs, getApplicationsForEmployee } from "@/lib/mock-db";
import type { Job, Application } from "@/lib/types";
import { useEffect, useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const allJobs = getJobs();
    // Assuming a mock employeeId for viewing purposes when not logged in
    const employeeIdForViewing = 'employee-1';
    const userApplications = getApplicationsForEmployee(employeeIdForViewing);
    setJobs(allJobs);
    setApplications(userApplications);
    setIsLoading(false);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [jobs, searchTerm]);
  
  const appliedJobIds = useMemo(() => new Set(applications.map(app => app.jobId)), [applications]);
  
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
       <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">Find Your Next Job</h1>
                <p className="mt-4 text-lg text-muted-foreground">Browse all available positions from companies in your area.</p>
            </div>
            
            <div className="relative w-full max-w-2xl mx-auto mb-12">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search by title, company, or keyword..."
                    className="pl-10 h-12 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {isLoading ? (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                            </CardContent>
                             <CardHeader className="flex flex-row justify-between">
                                <Skeleton className="h-5 w-1/3" />
                                <Skeleton className="h-10 w-1/4" />
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ) : filteredJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} hasApplied={appliedJobIds.has(job.id)} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                <p className="text-lg font-semibold">No jobs found</p>
                <p className="text-muted-foreground">
                    {searchTerm 
                    ? "Try adjusting your search terms." 
                    : "There are currently no job openings. Please check back later."
                    }
                </p>
                </div>
            )}
        </div>
      </main>
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
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} JobLink Local. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
