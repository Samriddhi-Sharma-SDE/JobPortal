export interface User {
  id: string;
  email: string;
  password: string; 
  role: 'admin' | 'company' | 'employee';
  companyId?: string;
  name?: string; // For employees or contact person at a company
}

export interface Company {
  id: string;
  name: string;
  userId: string;
  status: 'pending' | 'approved';
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  keywords: string[];
  createdAt: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  employeeId: string;
  employeeName: string;
  appliedAt: number;
}
