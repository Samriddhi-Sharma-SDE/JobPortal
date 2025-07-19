
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
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [jobs, searchTerm]);
  
  const appliedJobIds = useMemo(() => new Set(applications.map(app => app.jobId)), [applications]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
       <main className="flex-1 bg-secondary/50">
        <div className="relative overflow-hidden">
            <div 
                className="absolute inset-0 -z-10"
                style={{
                backgroundImage:
                    'radial-gradient(circle at top, hsla(var(--primary) / 0.1), transparent 40%)',
                }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Breadcrumbs />
                <div className="text-center mb-12 mt-6">
                    <h1 className="text-4xl font-extrabold tracking-tight">Find Your Next Job</h1>
                    <p className="mt-4 text-lg text-muted-foreground">Browse all available positions from companies in your area.</p>
                </div>
                
                <div className="relative w-full max-w-2xl mx-auto mb-12">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, company, location or keyword..."
                        className="pl-10 h-12 text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {isLoading ? (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} hasApplied={appliedJobIds.has(job.id)} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-card rounded-lg shadow-sm">
                  <p className="text-xl font-semibold">No Jobs Found</p>
                  <p className="text-muted-foreground mt-2">
                      {searchTerm 
                      ? "Your search returned no results. Try adjusting your terms." 
                      : "There are currently no job openings. Please check back later."
                      }
                  </p>
                </div>
            )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
