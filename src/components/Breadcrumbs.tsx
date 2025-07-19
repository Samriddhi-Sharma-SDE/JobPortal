
"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { getJobById } from '@/lib/mock-db';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const params = useParams();

    // Don't render breadcrumbs on dashboard pages or the home page
    if (pathname === '/' || pathname.startsWith('/admin') || pathname.startsWith('/company') || pathname.startsWith('/employee')) {
        return null;
    }

    const pathSegments = pathname.split('/').filter(segment => segment);

    const getLabel = (segment: string) => {
        if (params.id && segment === params.id) {
            if (pathname.includes('/jobs/')) {
                const job = getJobById(params.id as string);
                if (job) {
                    return job.title;
                }
            }
        }
        // Replace dashes with spaces and capitalize words
        return segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                    <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const label = getLabel(segment);
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <Fragment key={href}>
                            <li>
                                <ChevronRight className="w-4 h-4" />
                            </li>
                            <li>
                                {isLast ? (
                                    <span className="font-medium text-foreground">{label}</span>
                                ) : (
                                    <Link href={href} className="hover:text-foreground transition-colors">
                                        {label}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export { Breadcrumbs };
