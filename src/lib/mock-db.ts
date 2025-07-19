

import type { User, Company, Job, Application, ApplicationData } from "./types";

let users: User[] = [
    { id: 'admin-1', email: 'admin@joblink.local', password: 'password', role: 'admin', name: 'Admin User' },
    { id: 'employee-1', email: 'employee@joblink.local', password: 'password', role: 'employee', name: 'John Doe' },
    { id: 'company-contact-1', email: 'contact@innovate.com', password: 'password', role: 'company', companyId: 'company-1', name: 'Jane Smith' },
    { id: 'company-contact-2', email: 'hr@marketminds.io', password: 'password', role: 'company', companyId: 'company-2', name: 'Carlos Ray' },
    { id: 'company-contact-3', email: 'hr@datanexus.ai', password: 'password', role: 'company', companyId: 'company-4', name: 'Laura Bailey' },
    { id: 'company-contact-4', email: 'join@healthwell.com', password: 'password', role: 'company', companyId: 'company-5', name: 'Mark Roberts' },
    { id: 'company-contact-5', email: 'careers@ecogreen.org', password: 'password', role: 'company', companyId: 'company-6', name: 'Susan White' },
];

let companies: Company[] = [
    { id: 'company-1', name: 'InnovateTech', userId: 'company-contact-1', status: 'approved' },
    { id: 'company-2', name: 'MarketMinds', userId: 'company-contact-2', status: 'approved' },
    { id: 'company-3', name: 'Creative Solutions', userId: 'new-user-id', status: 'pending' },
    { id: 'company-4', name: 'DataNexus AI', userId: 'company-contact-3', status: 'approved' },
    { id: 'company-5', name: 'HealthWell Clinic', userId: 'company-contact-4', status: 'approved' },
    { id: 'company-6', name: 'EcoGreen Solutions', userId: 'company-contact-5', status: 'approved' },
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
    },
    {
        id: 'job-5',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'AI Research Scientist',
        description: 'Join our research team to push the boundaries of artificial intelligence. Focus on developing new models and algorithms in NLP and computer vision.',
        keywords: ['AI', 'NLP', 'PyTorch', 'Research', 'Computer Vision'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    },
    {
        id: 'job-6',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Registered Nurse',
        description: 'Provide patient care, administer medications, and maintain patient records. Must be a licensed RN with at least 2 years of experience.',
        keywords: ['Nursing', 'Healthcare', 'Patient Care', 'RN'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    },
    {
        id: 'job-7',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Environmental Scientist',
        description: 'Conduct research and provide solutions to environmental problems. Field work and data analysis are key components of this role.',
        keywords: ['Environment', 'Sustainability', 'Research', 'Data Analysis'],
        location: 'Denver, CO',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    },
    {
        id: 'job-8',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Backend Engineer (Node.js)',
        description: 'Develop and maintain server-side logic, define and maintain the central database, and ensure high performance and responsiveness to requests from the front-end.',
        keywords: ['Node.js', 'Express', 'PostgreSQL', 'API', 'Backend'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    },
    {
        id: 'job-9',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Content Strategist',
        description: 'Develop content strategies that align with marketing targets and customer needs. Create and publish engaging content.',
        keywords: ['Content', 'SEO', 'Writing', 'Marketing', 'Strategy'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    },
    {
        id: 'job-10',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'Machine Learning Engineer',
        description: 'Design and build production-ready machine learning systems. Experience with MLOps and cloud platforms is a plus.',
        keywords: ['ML', 'Python', 'TensorFlow', 'MLOps', 'AWS'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    },
    {
        id: 'job-11',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Medical Assistant',
        description: 'Support doctors and nurses in providing patient care. Duties include taking vital signs, preparing patients for exams, and administrative tasks.',
        keywords: ['Healthcare', 'Medical Assistant', 'Patient Care'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11,
    },
    {
        id: 'job-12',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Solar Panel Installer',
        description: 'Install and maintain solar panels on residential and commercial buildings. Must be comfortable working at heights.',
        keywords: ['Solar', 'Renewable Energy', 'Installation', 'Construction'],
        location: 'Denver, CO',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    },
    {
        id: 'job-13',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'UX/UI Designer',
        description: 'Create intuitive and visually appealing user interfaces for our web and mobile applications. A strong portfolio is required.',
        keywords: ['UX', 'UI', 'Figma', 'Design', 'Mobile'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
    },
    {
        id: 'job-14',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Sales Development Representative',
        description: 'Generate new business opportunities by qualifying leads and setting meetings for account executives.',
        keywords: ['Sales', 'SDR', 'B2B', 'Lead Generation'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
    },
    {
        id: 'job-15',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'Data Engineer',
        description: 'Build and maintain scalable data pipelines and infrastructure. Expertise in ETL processes and big data technologies is essential.',
        keywords: ['Data Engineering', 'ETL', 'Spark', 'Kafka', 'Python'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    },
    {
        id: 'job-16',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'DevOps Engineer',
        description: 'Automate and streamline our operations and processes. Build and maintain tools for deployment, monitoring and operations.',
        keywords: ['DevOps', 'CI/CD', 'Docker', 'Jenkins', 'Ansible'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
    },
    {
        id: 'job-17',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Digital Marketing Specialist',
        description: 'Manage our online presence and marketing campaigns across various digital channels, including social media, email, and PPC.',
        keywords: ['Digital Marketing', 'PPC', 'Social Media', 'Email Marketing'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 22,
    },
    {
        id: 'job-18',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Sustainability Consultant',
        description: 'Advise businesses on how to improve their environmental impact and sustainability practices.',
        keywords: ['Sustainability', 'Consulting', 'ESG', 'Environment'],
        location: 'Denver, CO',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 25,
    },
    {
        id: 'job-19',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Physical Therapist',
        description: 'Help patients recover from injuries and illnesses to regain movement and manage pain.',
        keywords: ['Physical Therapy', 'Healthcare', 'Rehabilitation'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    },
    {
        id: 'job-20',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'QA Engineer',
        description: 'Develop and execute exploratory and automated tests to ensure product quality. ISTQB certification is a plus.',
        keywords: ['QA', 'Testing', 'Automation', 'Selenium', 'Jira'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13,
    },
    {
        id: 'job-21',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Full Stack Developer',
        description: 'Work on both the front-end and back-end of our applications. Proficient in React and Node.js.',
        keywords: ['Full Stack', 'React', 'Node.js', 'JavaScript', 'API'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    },
    {
        id: 'job-22',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'SEO Manager',
        description: 'Develop and implement effective search engine optimization (SEO) strategies to drive organic traffic.',
        keywords: ['SEO', 'Marketing', 'Analytics', 'Content', 'Link Building'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11,
    },
    {
        id: 'job-23',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'Product Manager, AI Platforms',
        description: 'Define the product vision and roadmap for our AI-powered platforms. Work closely with engineering, design, and marketing.',
        keywords: ['Product Management', 'AI', 'SaaS', 'Roadmap', 'Agile'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 16,
    },
    {
        id: 'job-24',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Healthcare Administrator',
        description: 'Manage the clinic’s operations, including staffing, finances, and patient services.',
        keywords: ['Administration', 'Healthcare Management', 'Operations'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 23,
    },
    {
        id: 'job-25',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Project Manager, Renewables',
        description: 'Oversee the planning, implementation, and tracking of specific renewable energy projects.',
        keywords: ['Project Management', 'Renewable Energy', 'PMP', 'Solar'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 19,
    },
    {
        id: 'job-26',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Mobile Developer (React Native)',
        description: 'Develop cross-platform mobile applications using React Native for both iOS and Android devices.',
        keywords: ['React Native', 'Mobile', 'iOS', 'Android', 'JavaScript'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 28,
    },
    {
        id: 'job-27',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Graphic Designer',
        description: 'Create visual concepts to communicate ideas that inspire, inform, and captivate consumers.',
        keywords: ['Graphic Design', 'Adobe Creative Suite', 'Branding', 'Marketing'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
        id: 'job-28',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'Business Analyst',
        description: 'Bridge the gap between IT and the business using data analytics to assess processes, determine requirements and deliver data-driven recommendations.',
        keywords: ['Business Analysis', 'SQL', 'Tableau', 'Reporting'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
    },
    {
        id: 'job-29',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Pharmacist',
        description: 'Dispense prescription medications to patients and offer expertise in the safe use of prescriptions.',
        keywords: ['Pharmacist', 'Healthcare', 'Pharmacy', 'Medicine'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 35,
    },
    {
        id: 'job-30',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'IT Support Specialist',
        description: 'Provide technical assistance and support for incoming queries and issues related to computer systems, software, and hardware.',
        keywords: ['IT Support', 'Help Desk', 'Troubleshooting', 'Networking'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 17,
    },
    {
        id: 'job-31',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Account Executive',
        description: 'Drive the full sales cycle from prospecting to closing deals with new customers. Exceed sales quotas.',
        keywords: ['Sales', 'B2B', 'SaaS', 'Account Executive', 'Closing'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    },
    {
        id: 'job-32',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Recycling Coordinator',
        description: 'Manage and coordinate recycling programs for municipalities and large organizations.',
        keywords: ['Recycling', 'Sustainability', 'Waste Management', 'Logistics'],
        location: 'Denver, CO',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 40,
    },
    {
        id: 'job-33',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Cybersecurity Analyst',
        description: 'Protect company hardware, software, and networks from cybercriminals. Monitor for security breaches.',
        keywords: ['Cybersecurity', 'InfoSec', 'Networking', 'SIEM'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 26,
    },
    {
        id: 'job-34',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'Cloud Engineer',
        description: 'Responsible for designing, developing, and deploying cloud-based solutions.',
        keywords: ['Cloud', 'AWS', 'Azure', 'GCP', 'DevOps'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 33,
    },
    {
        id: 'job-35',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Dental Hygienist',
        description: 'Provide preventive oral care under a dentist’s supervision. Clean teeth, take x-rays, and educate patients.',
        keywords: ['Dental', 'Healthcare', 'Hygienist', 'Patient Care'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    },
    {
        id: 'job-36',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Customer Success Manager',
        description: 'Build relationships with customers to ensure they are satisfied with our products and services.',
        keywords: ['Customer Success', 'SaaS', 'Account Management', 'CRM'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    },
    {
        id: 'job-37',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Scrum Master',
        description: 'Facilitate Agile development processes, lead scrum ceremonies, and remove impediments for the development team.',
        keywords: ['Agile', 'Scrum', 'Project Management', 'Jira'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 24,
    },
    {
        id: 'job-38',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Urban Planner',
        description: 'Develop plans and programs for the use of land. Focus on creating sustainable and community-friendly urban spaces.',
        keywords: ['Urban Planning', 'Sustainability', 'Community', 'GIS'],
        location: 'Denver, CO',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
    },
    {
        id: 'job-39',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'Technical Writer',
        description: 'Create clear, concise, and comprehensive documentation for our complex AI products and APIs.',
        keywords: ['Technical Writing', 'Documentation', 'API', 'SaaS'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 29,
    },
    {
        id: 'job-40',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Junior Javascript Developer',
        description: 'Assist our senior developers in creating dynamic web applications. Great learning opportunity.',
        keywords: ['JavaScript', 'HTML', 'CSS', 'Entry-Level'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    },
    {
        id: 'job-41',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Medical Biller and Coder',
        description: 'Translate patient services into medical codes for billing purposes. Detail-oriented and knowledgeable in coding standards.',
        keywords: ['Medical Coding', 'Billing', 'Healthcare', 'ICD-10'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 38,
    },
    {
        id: 'job-42',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Public Relations Specialist',
        description: 'Manage the public image of our company through media relations and strategic communications.',
        keywords: ['PR', 'Public Relations', 'Communications', 'Media'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    },
    {
        id: 'job-43',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Database Administrator (DBA)',
        description: 'Responsible for the performance, integrity and security of our databases. Experience with SQL and NoSQL databases.',
        keywords: ['DBA', 'SQL', 'PostgreSQL', 'MongoDB', 'Database'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 50,
    },
    {
        id: 'job-44',
        companyId: 'company-4',
        companyName: 'DataNexus AI',
        title: 'AI Ethics Researcher',
        description: 'Investigate and report on the ethical implications of AI technologies. Help guide responsible AI development.',
        keywords: ['AI Ethics', 'Research', 'Responsible AI', 'Policy'],
        location: 'Palo Alto, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 32,
    },
    {
        id: 'job-45',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Event Coordinator',
        description: 'Plan and execute marketing events, from webinars to large-scale industry conferences.',
        keywords: ['Events', 'Marketing', 'Coordination', 'Planning'],
        location: 'New York, NY',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
    },
    {
        id: 'job-46',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Technical Program Manager',
        description: 'Drive large-scale technical projects from initiation to completion, coordinating across multiple engineering teams.',
        keywords: ['TPM', 'Program Management', 'Agile', 'Tech'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 27,
    },
    {
        id: 'job-47',
        companyId: 'company-6',
        companyName: 'EcoGreen Solutions',
        title: 'Hydrologist',
        description: 'Study the movement, distribution, and quality of water. Requires a degree in hydrology or a related field.',
        keywords: ['Hydrology', 'Water', 'Environment', 'Science'],
        location: 'Denver, CO',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 55,
    },
    {
        id: 'job-48',
        companyId: 'company-5',
        companyName: 'HealthWell Clinic',
        title: 'Radiologic Technologist',
        description: 'Perform diagnostic imaging examinations like X-rays on patients. ARRT certification required.',
        keywords: ['Radiology', 'X-Ray', 'Healthcare', 'Technologist'],
        location: 'Chicago, IL',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 42,
    },
    {
        id: 'job-49',
        companyId: 'company-2',
        companyName: 'MarketMinds',
        title: 'Social Media Manager',
        description: 'Manage our social media presence, creating engaging content and building a strong community on all major platforms.',
        keywords: ['Social Media', 'Marketing', 'Content Creation', 'Community'],
        location: 'Remote',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    },
    {
        id: 'job-50',
        companyId: 'company-1',
        companyName: 'InnovateTech',
        title: 'Office Manager',
        description: 'Ensure the smooth running of our office on a day-to-day basis and manage administrative staff.',
        keywords: ['Office Management', 'Administration', 'Operations'],
        location: 'San Francisco, CA',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 36,
    },
];

let applications: Application[] = [];

const generateId = () => Math.random().toString(36).substring(2, 9);

// Auth functions
export const login = (email: string, password: string): User => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  if (user.role === 'company') {
      const company = companies.find(c => c.id === user.companyId);
      if (company && company.status === 'pending') {
          throw new Error("Your company registration is pending approval.");
      }
  }
  return user;
};

export const register = (data: Omit<User, 'id' | 'companyId' | 'status'> & { companyName?: string }): User => {
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
export const applyForJob = (data: ApplicationData): Application => {
    const { jobId, employeeId } = data;
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
        companyId: job.companyId,
        companyName: job.companyName,
        employeeId,
        employeeName: employee.name || 'Unnamed Applicant',
        appliedAt: Date.now(),
        data,
    };
    applications.push(newApplication);
    return newApplication;
}

export const getApplicationsForEmployee = (employeeId: string): Application[] => {
    return applications.filter(a => a.employeeId === employeeId);
}

export const getApplicationsForCompany = (companyId: string): Application[] => {
    const companyJobs = new Set(jobs.filter(j => j.companyId === companyId).map(j => j.id));
    return applications.filter(a => companyJobs.has(a.jobId)).sort((a,b) => a.appliedAt - b.appliedAt);
}
