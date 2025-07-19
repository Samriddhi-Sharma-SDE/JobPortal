"use client";

import { DashboardLayout, type NavItem } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { approveCompany, getCompanies } from "@/lib/mock-db";
import type { Company } from "@/lib/types";
import { Building2, CheckCircle, Clock, LayoutDashboard } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const adminNavItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
];

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCompanies = useCallback(() => {
    setIsLoading(true);
    const allCompanies = getCompanies();
    setCompanies(allCompanies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // if (!authLoading) {
    //   if (!user || user.role !== 'admin') {
    //     router.push('/login');
    //   } else {
        fetchCompanies();
    //   }
    // }
  }, [fetchCompanies]);

  const handleApprove = (companyId: string) => {
    try {
      approveCompany(companyId);
      toast({
        title: "Company Approved",
        description: "The company can now post jobs.",
      });
      fetchCompanies(); // Refresh the list
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: error.message,
      });
    }
  };

  const pendingCompanies = companies.filter(c => c.status === 'pending');
  const approvedCompanies = companies.filter(c => c.status === 'approved');

  if (authLoading || isLoading) {
    return (
       <DashboardLayout title="Admin Dashboard" navItems={adminNavItems}>
        <div className="space-y-8">
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
        </div>
      </DashboardLayout>
    )
  }
  
  return (
    <DashboardLayout title="Admin Dashboard" navItems={adminNavItems}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companies.length}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Companies</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedCompanies.length}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCompanies.length}</div>
              </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Company Registrations</CardTitle>
            <CardDescription>
              Review and approve new companies to join the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>
                        <Badge variant={company.status === 'approved' ? "default" : "secondary"} className={company.status === 'approved' ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700'}>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {company.status === 'pending' && (
                          <Button onClick={() => handleApprove(company.id)} size="sm">
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No companies have registered yet.
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
