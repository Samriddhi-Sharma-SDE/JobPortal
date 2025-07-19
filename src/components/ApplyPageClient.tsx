
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Job } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface ApplyPageClientProps {
  job: Job;
}

export function ApplyPageClient({ job }: ApplyPageClientProps) {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'employee')) {
            toast({ variant: 'destructive', title: 'Access Denied', description: 'Please log in as an employee to apply.' });
            router.push(`/login?redirect=/jobs/${job.id}/apply`);
        }
    }, [user, authLoading, router, toast, job.id]);

    if (authLoading) {
        return <Skeleton className="h-96 w-full" />;
    }
    
    // This check is mainly for the case where the user is not logged in yet but we need a user object for the form.
    // The useEffect above will redirect them if they are not a valid employee.
    const formUser = user || {
        id: 'temp-id',
        email: '',
        role: 'employee',
        name: '',
        password: ''
    };
    
    // Only render the form if we have a valid employee user.
    return user && user.role === 'employee' ? <ApplicationForm job={job} user={user} /> : <Skeleton className="h-96 w-full" />;
}
