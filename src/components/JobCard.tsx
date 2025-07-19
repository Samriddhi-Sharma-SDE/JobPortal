"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { applyForJob } from "@/lib/mock-db";
import type { Job } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface JobCardProps {
  job: Job;
  hasApplied: boolean;
}

export function JobCard({ job, hasApplied }: JobCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleApply = () => {
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
    } catch(e: any) {
        toast({
            variant: 'destructive',
            title: 'Application Failed',
            description: e.message || 'There was an error submitting your application.'
        });
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Briefcase className="w-4 h-4" /> {job.companyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.keywords.map((keyword) => (
            <Badge key={keyword} variant="secondary">{keyword}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
        </div>
        <Button onClick={handleApply} disabled={hasApplied}>
          {hasApplied ? 'Applied' : 'Apply Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
