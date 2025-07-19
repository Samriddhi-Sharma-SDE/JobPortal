
import { getJobById, getJobs } from '@/lib/mock-db';
import type { Job } from '@/lib/types';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JobDetailPageClient } from '@/components/JobDetailPageClient';

export async function generateStaticParams() {
    const jobs = getJobs();
    return jobs.map((job) => ({
        id: job.id,
    }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const job = getJobById(id);

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <JobDetailPageClient job={job} />
            <SiteFooter />
        </div>
    );
}
