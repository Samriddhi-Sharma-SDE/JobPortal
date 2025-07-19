"use client";

import { DashboardLayout, type NavItem } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getJobsByCompany, getApplicationsForCompany } from "@/lib/mock-db";
import type { Job, Application } from "@/lib/types";
import { Briefcase, FileText, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const companyNavItems: NavItem[] = [
  {
    href: "/company/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: "/company/post-job",
    label: "Post a Job",
    icon: <PlusCircle className="w-5 h-5" />,
  },
];

export default function CompanyDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (!authLoading) {
    //   if (!user || user.role !== 'company' || !user.companyId) {
    //     router.push('/login');
    //   } else {
        setIsLoading(true);
        // Assuming a mock companyId for viewing purposes when not logged in
        const companyIdForViewing = user?.companyId || 'company-1'; 
        const companyJobs = getJobsByCompany(companyIdForViewing);
        const companyApplications = getApplicationsForCompany(companyIdForViewing);
        setJobs(companyJobs);
        setApplications(companyApplications);
        setIsLoading(false);
    //   }
    // }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
      return (
       <DashboardLayout title="Company Dashboard" navItems={companyNavItems}>
        <div className="space-y-8">
          <div className="flex justify-between items-start">
              <div>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
              </div>
              <Skeleton className="h-10 w-32" />
          </div>
          <Card>
              <CardHeader>
                  <Skeleton className="h-8 w-1/3" />
              </CardHeader>
              <CardContent>
                  <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                  </div>
              </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Company Dashboard" navItems={companyNavItems}>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">Your Job Postings</h2>
            <p className="text-muted-foreground">Manage your job listings and view applications.</p>
          </div>
          <Button asChild>
            <Link href="/company/post-job">
              <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Applications</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {job.keywords.slice(0, 3).map((kw) => (
                            <Badge key={kw} variant="secondary">{kw}</Badge>
                          ))}
                          {job.keywords.length > 3 && <Badge variant="outline">+{job.keywords.length - 3}</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</TableCell>
                      <TableCell>{applications.filter(app => app.jobId === job.id).length}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                      You haven't posted any jobs yet.
                      <Button variant="link" asChild className="ml-2">
                        <Link href="/company/post-job">Post one now</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
                applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-md">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-secondary rounded-md">
                               <FileText className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-semibold">{app.employeeName}</p>
                                <p className="text-sm text-muted-foreground">Applied for <span className="font-medium text-foreground">{app.jobTitle}</span></p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}</p>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground p-4">No applications received yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
