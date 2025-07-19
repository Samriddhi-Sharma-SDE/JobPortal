
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getJobById } from '@/lib/mock-db';
import type { Job } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ApplyPage() {
    const { id } = useParams();
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // if (authLoading) return;
        // if (!user || user.role !== 'employee') {
        //     toast({ variant: 'destructive', title: 'Access Denied', description: 'Please log in as an employee to apply.' });
        //     router.push(`/login?redirect=/jobs/${id}/apply`);
        //     return;
        // }

        if (id) {
            const jobId = Array.isArray(id) ? id[0] : id;
            const jobData = getJobById(jobId);
            setJob(jobData);
        }
        setIsLoading(false);
    }, [id, user, authLoading, router, toast]);

    if (isLoading || authLoading) {
        return (
             <div className="flex flex-col min-h-screen">
                <SiteHeader />
                <main className="flex-1 bg-secondary/50 py-16">
                    <div className="container mx-auto max-w-4xl px-4">
                        <Skeleton className="h-8 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-1/4 mb-8" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                </main>
                <SiteFooter />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="flex flex-col min-h-screen">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center text-center">
                    <h1 className="text-2xl font-bold">Job not found</h1>
                </main>
                <SiteFooter />
            </div>
        );
    }
    
    // For viewing purposes, we create a mock user if one isn't logged in.
    const mockUser = user || {
        id: 'employee-1',
        email: 'employee@joblink.local',
        role: 'employee',
        name: 'John Doe',
        password: 'password'
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1 bg-secondary/50 py-12 md:py-16">
                <div className="container mx-auto max-w-4xl px-4">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">Applying for: {job.title}</CardTitle>
                             <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm pt-1">
                                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.companyName}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <ApplicationForm job={job} user={mockUser} />
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
