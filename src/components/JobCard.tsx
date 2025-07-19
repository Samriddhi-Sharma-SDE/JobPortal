
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface JobCardProps {
  job: Job;
  hasApplied: boolean;
}

export function JobCard({ job, hasApplied }: JobCardProps) {
  const router = useRouter();
  
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
        <Button asChild onClick={(e) => e.stopPropagation()} disabled={hasApplied} size="sm">
          {hasApplied ? 
            <div className="flex items-center text-green-600"><CheckCircle className="mr-2 h-4 w-4" />Applied</div> 
            : 
            <Link href={`/jobs/${job.id}/apply`}>Apply <ArrowRight className="ml-2 h-4 w-4" /></Link>
          }
        </Button>
      </CardFooter>
    </Card>
  );
}
