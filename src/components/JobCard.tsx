
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { applyForJob } from "@/lib/mock-db";
import type { Job } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, Clock, MapPin, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface JobCardProps {
  job: Job;
  hasApplied: boolean;
}

export function JobCard({ job, hasApplied }: JobCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || user.role !== 'employee') {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in as an employee to apply.' });
      return;
    }
    try {
      applyForJob(job.id, user.id);
      toast({
        title: "Application Sent!",
        description: `You have successfully applied for the ${job.title} position.`,
      });
      // Note: In a real app, you'd likely update state here or refetch data
      // For this mock setup, we rely on page reload or navigation to see the change.
    } catch(e: any) {
        toast({
            variant: 'destructive',
            title: 'Application Failed',
            description: e.message || 'There was an error submitting your application.'
        });
    }
  };
  
  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  }

  return (
    <Card onClick={handleCardClick} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="hover:text-primary transition-colors">{job.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Briefcase className="w-4 h-4" /> {job.companyName}
        </CardDescription>
         <CardDescription className="flex items-center gap-2 pt-1">
          <MapPin className="w-4 h-4" /> {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.keywords.slice(0, 3).map((keyword) => (
            <Badge key={keyword} variant="secondary">{keyword}</Badge>
          ))}
           {job.keywords.length > 3 && <Badge variant="outline">+{job.keywords.length - 3}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-secondary/30 pt-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
        </div>
        <Button onClick={handleApply} disabled={hasApplied} size="sm">
          {hasApplied ? <><CheckCircle className="mr-2 h-4 w-4" />Applied</> : 'Apply Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
