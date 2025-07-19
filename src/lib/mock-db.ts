import type { User, Company, Job, Application } from "./types";

let users: User[] = [
    { id: 'admin-1', email: 'admin@joblink.local', password: 'password', role: 'admin', name: 'Admin User' },
];

let companies: Company[] = [];

let jobs: Job[] = [];

let applications: Application[] = [];

const generateId = () => Math.random().toString(36).substring(2, 9);

// Auth functions
export const login = (email: string, password: string): User => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  if (user.role === 'company') {
      const company = companies.find(c => c.userId === user.id);
      if (company && company.status === 'pending') {
          throw new Error("Your company registration is pending approval.");
      }
  }
  return user;
};

export const register = (data: Omit<User, 'id' | 'companyId'> & { companyName?: string }): User => {
    if (users.some(u => u.email === data.email)) {
        throw new Error("An account with this email already exists.");
    }

    const newUser: User = {
        id: generateId(),
        email: data.email,
        password: data.password,
        role: data.role,
        name: data.name,
    };

    if (data.role === 'company') {
        if (!data.companyName) {
            throw new Error("Company name is required for company accounts.");
        }
        const newCompany: Company = {
            id: generateId(),
            name: data.companyName,
            userId: newUser.id,
            status: 'pending',
        };
        companies.push(newCompany);
        newUser.companyId = newCompany.id;
    }

    users.push(newUser);
    return newUser;
};

export const getUser = (userId: string): User | undefined => {
    return users.find(u => u.id === userId);
};

// Company functions
export const getCompanies = (): Company[] => {
    return companies;
};

export const approveCompany = (companyId: string): Company => {
    const company = companies.find(c => c.id === companyId);
    if (!company) {
        throw new Error("Company not found.");
    }
    company.status = 'approved';
    return company;
};

// Job functions
export const addJob = (jobData: Omit<Job, 'id' | 'companyName' | 'createdAt'>): Job => {
    const company = companies.find(c => c.id === jobData.companyId);
    if (!company) {
        throw new Error("Company not found.");
    }
    const newJob: Job = {
        ...jobData,
        id: generateId(),
        companyName: company.name,
        createdAt: Date.now(),
    };
    jobs.push(newJob);
    return newJob;
}

export const getJobs = (): Job[] => {
    const approvedCompanyIds = new Set(companies.filter(c => c.status === 'approved').map(c => c.id));
    return jobs.filter(j => approvedCompanyIds.has(j.companyId)).sort((a,b) => b.createdAt - a.createdAt);
}

export const getJobsByCompany = (companyId: string): Job[] => {
    return jobs.filter(j => j.companyId === companyId).sort((a,b) => b.createdAt - a.createdAt);
}

// Application functions
export const applyForJob = (jobId: string, employeeId: string): Application => {
    const job = jobs.find(j => j.id === jobId);
    const employee = users.find(u => u.id === employeeId);

    if (!job || !employee) {
        throw new Error("Job or employee not found.");
    }
    
    if (applications.some(a => a.jobId === jobId && a.employeeId === employeeId)) {
        throw new Error("You have already applied for this job.");
    }

    const newApplication: Application = {
        id: generateId(),
        jobId,
        jobTitle: job.title,
        companyName: job.companyName,
        employeeId,
        employeeName: employee.name || 'Unnamed Applicant',
        appliedAt: Date.now(),
    };
    applications.push(newApplication);
    return newApplication;
}

export const getApplicationsForEmployee = (employeeId: string): Application[] => {
    return applications.filter(a => a.employeeId === employeeId);
}

export const getApplicationsForCompany = (companyId: string): Application[] => {
    const companyJobs = new Set(jobs.filter(j => j.companyId === companyId).map(j => j.id));
    return applications.filter(a => companyJobs.has(a.jobId)).sort((a,b) => b.appliedAt - a.appliedAt);
}
