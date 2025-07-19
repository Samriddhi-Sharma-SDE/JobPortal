
import { getJobById, getJobs } from '@/lib/mock-db';
import type { Job } from '@/lib/types';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ApplyPageClient } from '@/components/ApplyPageClient';

export async function generateStaticParams() {
    const jobs = getJobs();
    return jobs.map((job) => ({
        id: job.id,
    }));
}

export default function ApplyPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const job = getJobById(id);

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
    
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1 bg-secondary/50 py-12 md:py-16">
                <div className="container mx-auto max-w-4xl px-4">
                     <Breadcrumbs />
                    <Card className="my-6">
                        <CardHeader>
                            <CardTitle className="text-2xl">Applying for: {job.title}</CardTitle>
                             <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm pt-1">
                                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.companyName}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <ApplyPageClient job={job} />
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
