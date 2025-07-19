
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJobById, applyForJob, getApplicationsForEmployee } from "@/lib/mock-db";
import type { Job } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin, Clock, Building, CheckCircle, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";


export default function JobDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (id) {
      const jobId = Array.isArray(id) ? id[0] : id;
      const jobData = getJobById(jobId);
      setJob(jobData);
      
      if (user && user.role === 'employee' && jobData) {
          const userApplications = getApplicationsForEmployee(user.id);
          setHasApplied(userApplications.some(app => app.jobId === jobData.id));
      }

      setIsLoading(false);
    }
  }, [id, user]);

  const handleApply = () => {
    if (!user || user.role !== 'employee') {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in as an employee to apply.' });
      return;
    }
    if (job) {
      try {
        applyForJob(job.id, user.id);
        toast({
          title: "Application Sent!",
          description: `You have successfully applied for the ${job.title} position.`,
        });
        setHasApplied(true);
      } catch(e: any) {
          toast({
              variant: 'destructive',
              title: 'Application Failed',
              description: e.message || 'There was an error submitting your application.'
          });
      }
    }
  };

  if (isLoading) {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1 bg-secondary/50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                             <Skeleton className="h-10 w-3/4 mb-4" />
                             <Skeleton className="h-6 w-1/2 mb-8" />
                             <Skeleton className="h-48 w-full" />
                        </div>
                        <div>
                             <Skeleton className="h-64 w-full" />
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
  }

  if (!job) {
    return (
       <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center text-center bg-secondary/50">
          <div>
            <h1 className="text-4xl font-bold">Job Not Found</h1>
            <p className="text-muted-foreground mt-2">The job you are looking for does not exist.</p>
             <Button asChild className="mt-6">
                <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-secondary/50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                            <CardDescription className="text-base text-muted-foreground flex items-center gap-2 pt-2">
                                <Link href="#" className="hover:underline flex items-center gap-2"><Building className="w-4 h-4" /> {job.companyName}</Link>
                                <span className="text-muted-foreground/50">|</span>
                                <MapPin className="w-4 h-4" /> {job.location}
                            </CardDescription>
                             <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                               <Clock className="w-4 h-4" />
                               <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-2">
                                {job.keywords.map((keyword) => (
                                    <Badge key={keyword} variant="secondary" className="text-sm">{keyword}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Description</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-lg max-w-none text-foreground/80">
                            <p>{job.description}</p>
                            <h4 className="text-foreground">Responsibilities</h4>
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Donec euismod, nisl eget consectetur, nisl nunc aliquet, nisl nunc aliquet.</li>
                                <li>Maecenas aliquet, nisl eget consectetur, nisl nunc aliquet.</li>
                            </ul>
                             <h4 className="text-foreground">Qualifications</h4>
                            <ul>
                                <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader className="text-center">
                            <CardTitle>Ready to Apply?</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                             <Button size="lg" className="w-full" onClick={handleApply} disabled={hasApplied}>
                                {hasApplied ? <><CheckCircle className="mr-2" /> Applied</> : 'Apply Now'}
                             </Button>
                             {hasApplied && <p className="text-sm text-green-600 mt-2">You have already applied for this position.</p>}
                        </CardContent>
                         <CardHeader>
                            <CardTitle>About {job.companyName}</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                We are a leading company in the industry, committed to innovation and excellence. Join us to be a part of our growing team.
                            </p>
                            <Button variant="outline" className="w-full">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Company Website
                            </Button>
                         </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
