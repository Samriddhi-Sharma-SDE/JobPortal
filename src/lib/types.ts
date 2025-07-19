

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
  location: string;
  createdAt: number;
}


export interface Education {
    degree: string;
    institution: string;
    graduationYear: string;
}

export interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
}

export interface ApplicationData {
    jobId: string;
    employeeId: string;
    fullName: string;
    email: string;
    phone: string;
    education: Education[];
    experience?: Experience[];
    resumeUrl?: string;
}

export interface Application {
  id:string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  employeeId: string;
  employeeName: string;
  appliedAt: number;
  data: ApplicationData;
}
