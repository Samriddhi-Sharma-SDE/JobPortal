"use client";

import { DashboardLayout, type NavItem } from "@/components/DashboardLayout";
import { getApplicationsForEmployee } from "@/lib/mock-db";
import type { Application } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";


const employeeNavItems: NavItem[] = [
  { href: "/employee/dashboard", label: "Find Jobs", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/employee/applications", label: "My Applications", icon: <FileText className="w-5 h-5" /> },
];

export default function EmployeeApplicationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'employee') {
        router.push('/login');
      } else {
        setIsLoading(true);
        const userApplications = getApplicationsForEmployee(user.id);
        setApplications(userApplications.sort((a,b) => b.appliedAt - a.appliedAt));
        setIsLoading(false);
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <DashboardLayout title="My Applications" navItems={employeeNavItems}>
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Applications" navItems={employeeNavItems}>
        <Card>
            <CardHeader>
                <CardTitle>Your Job Applications</CardTitle>
                <CardDescription>A history of all the jobs you've applied for.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Date Applied</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length > 0 ? (
                            applications.map(app => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.jobTitle}</TableCell>
                                    <TableCell>{app.companyName}</TableCell>
                                    <TableCell>{format(new Date(app.appliedAt), 'PPP')}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    You haven't applied to any jobs yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
}
