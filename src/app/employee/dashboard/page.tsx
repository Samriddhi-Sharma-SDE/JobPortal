"use client";

import { DashboardLayout, type NavItem } from "@/components/DashboardLayout";
import { JobCard } from "@/components/JobCard";
import { getJobs, getApplicationsForEmployee } from "@/lib/mock-db";
import type { Job, Application } from "@/lib/types";
import { FileText, LayoutDashboard, Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const employeeNavItems: NavItem[] = [
  { href: "/employee/dashboard", label: "Find Jobs", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/employee/applications", label: "My Applications", icon: <FileText className="w-5 h-5" /> },
];

export default function EmployeeDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'employee') {
        router.push('/login');
      } else {
        setIsLoading(true);
        const allJobs = getJobs();
        const userApplications = getApplicationsForEmployee(user.id);
        setJobs(allJobs);
        setApplications(userApplications);
        setIsLoading(false);
      }
    }
  }, [user, authLoading, router]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [jobs, searchTerm]);
  
  const appliedJobIds = useMemo(() => new Set(applications.map(app => app.jobId)), [applications]);

  if (authLoading || isLoading) {
    return (
      <DashboardLayout title="Find Your Next Job" navItems={employeeNavItems}>
        <div className="relative w-full mb-8">
            <Skeleton className="h-10 w-full" />
        </div>
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
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Find Your Next Job" navItems={employeeNavItems}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Available Positions</h2>
          <p className="text-muted-foreground">Browse through jobs from top local companies.</p>
        </div>
        <div className="relative w-full mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, company, or keyword..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      {filteredJobs.length > 0 ? (
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
    </DashboardLayout>
  );
}
