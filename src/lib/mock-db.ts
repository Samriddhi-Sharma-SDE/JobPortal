
import type { User, Company, Job, Application } from "./types";

let users: User[] = [
    { id: 'admin-1', email: 'admin@joblink.local', password: 'password', role: 'admin', name: 'Admin User' },
    { id: 'employee-1', email: 'employee@joblink.local', password: 'password', role: 'employee', name: 'John Doe' },
    { id: 'company-contact-1', email: 'contact@innovate.com', password: 'password', role: 'company', companyId: 'company-1', name: 'Jane Smith' },
     { id: 'company-contact-2', email: 'hr@marketminds.io', password: 'password', role: 'company', companyId: 'company-2', name: 'Carlos Ray' },
];

let companies: Company[] = [
    { id: 'company-1', name: 'InnovateTech', userId: 'company-contact-1', status: 'approved' },
    { id: 'company-2', name: 'MarketMinds', userId: 'company-contact-2', status: 'approved' },
    { id: 'company-3', name: 'Creative Solutions', userId: 'new-user-id', status: 'pending' },
];

let jobs: Job[] = [
    {
        id: 'job-1',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Senior Frontend Developer',
        description: 'We are looking for an experienced Frontend Developer to join our team. The ideal candidate will be responsible for building the next generation of our user interface, working with a team of talented engineers.',
        keywords: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'UI/UX'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    },
    {
        id: 'job-2',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Product Marketing Manager',
        description: 'MarketMinds is seeking a Product Marketing Manager to lead our go-to-market strategy. You will be responsible for product positioning, messaging, and sales enablement.',
        keywords: ['SaaS', 'Marketing', 'Growth', 'B2B', 'Strategy'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    },
    {
        id: 'job-3',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Cloud Solutions Architect',
        description: 'Design and implement scalable, high-performance cloud infrastructure. Must have deep experience with AWS or Google Cloud Platform and a passion for automation.',
        keywords: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'DevOps'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    },
     {
        id: 'job-4',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Data Scientist',
        description: 'Analyze large, complex data sets to drive business decisions. Proficiency in Python, R, SQL, and machine learning frameworks is required.',
        keywords: ['Python', 'Machine Learning', 'SQL', 'Data Analysis', 'Statistics'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1, // 1 day ago
    }
];

let applications: Application[] = [
    {
        id: 'app-1',
        jobId: 'job-2',
        jobTitle: 'Product Marketing Manager',
        companyName: 'MarketMinds',
        employeeId: 'employee-1',
        employeeName: 'John Doe',
        appliedAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    }
];

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

export const getJobById = (jobId: string): Job | null => {
    return jobs.find(j => j.id === jobId) || null;
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
    return applications.filter(a => companyJobs.has(a.jobId)).sort((a,b) => b.createdAt - a.createdAt);
}
