
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, UserCheck, Zap, Users, Heart, Star, Briefcase, Search, CheckCircle, Code, Megaphone, BarChartHorizontal } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const featuredJobs = [
  {
    title: "Senior Frontend Developer",
    company: "InnovateTech",
    location: "San Francisco, CA",
    type: "Full-time",
    tags: ["React", "TypeScript", "Next.js"],
    href: "/jobs/job-1"
  },
  {
    title: "Product Marketing Manager",
    company: "MarketMinds",
    location: "New York, NY",
    type: "Remote",
    tags: ["SaaS", "Marketing", "Growth"],
    href: "/jobs/job-2"
  },
  {
    title: "Cloud Solutions Architect",
    company: "InnovateTech",
    location: "Austin, TX",
    type: "Contract",
    tags: ["AWS", "GCP", "DevOps"],
    href: "/jobs/job-3"
  },
];

const testimonials = [
  {
    quote: "Job Portal was a game-changer for our recruitment process. The AI keyword suggestions helped us reach the right talent faster than ever before.",
    name: "Sarah Johnson",
    role: "HR Manager, InnovateTech",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait"
  },
  {
    quote: "As a job seeker, the platform was incredibly intuitive. I found a local job I love within two weeks of signing up. Highly recommended!",
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
   {
    quote: "The quality of candidates we found through Job Portal was outstanding. It's now our go-to platform for hiring in the region.",
    name: "Emily Rodriguez",
    role: "Founder, Creative Solutions",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman professional"
  },
]

const stats = [
    { number: "1,200+", label: "Jobs Posted", icon: <Briefcase /> },
    { number: "500+", label: "Companies Registered", icon: <Building2 /> },
    { number: "5,000+", label: "Successful Hires", icon: <UserCheck /> },
    { number: "98%", label: "Satisfaction Rate", icon: <Heart /> },
]

const FloatingIcon = ({ icon, className }: { icon: React.ReactNode, className: string }) => (
    <div className={`absolute bg-card p-3 rounded-full shadow-lg border animate-float ${className}`}>
        {icon}
    </div>
)

export default function Home() {
    const router = useRouter();
    
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search') as string;
        router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div 
            className="absolute inset-0 bg-background -z-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, hsla(var(--primary) / 0.1), transparent 60%)',
            }}
          />
           <div className="absolute -top-32 -left-32 -z-10 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
           <div className="absolute -bottom-32 -right-32 -z-10 h-96 w-96 bg-accent/5 rounded-full blur-3xl" />

            <FloatingIcon icon={<Code className="w-6 h-6 text-primary" />} className="top-[15%] left-[10%] hidden lg:block" />
            <FloatingIcon icon={<Megaphone className="w-6 h-6 text-accent" />} className="top-[25%] right-[12%] hidden lg:block" />
            <FloatingIcon icon={<BarChartHorizontal className="w-6 h-6 text-green-500" />} className="bottom-[20%] left-[20%] hidden lg:block" />
            <FloatingIcon icon={<Briefcase className="w-6 h-6 text-yellow-500" />} className="bottom-[15%] right-[18%] hidden lg:block" />

          <div className="relative z-10 w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">Find Your Next Opportunity, Locally.</h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Job Portal connects talented professionals with innovative companies in their area. Powered by AI to help you find the perfect match.
            </p>
            
            <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    name="search"
                    placeholder="Job title, keyword, or company"
                    className="pl-12 pr-24 h-14 text-base rounded-full shadow-lg"
                />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full px-6">
                    Search
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">Trusted by top local companies</p>
                <div className="flex justify-center items-center gap-8 mt-4">
                    <span className="font-semibold text-muted-foreground/80">InnovateTech</span>
                     <span className="font-semibold text-muted-foreground/80">MarketMinds</span>
                     <span className="font-semibold text-muted-foreground/80">DataNexus AI</span>
                     <span className="font-semibold text-muted-foreground/80">HealthWell</span>
                </div>
            </div>
          </div>
        </section>
        
        <section className="bg-secondary/50 py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                           <div className="text-primary mb-2">{React.cloneElement(stat.icon, { className: "w-10 h-10" })}</div>
                           <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.number}</p>
                           <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-muted-foreground">A simple process for every user.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="pt-4">For Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Register, get approved, and post jobs. Use our AI to suggest powerful keywords and attract top talent.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="pt-4">For Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create a profile, browse local job opportunities, and apply with a single click. Your dream job is waiting.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <UserCheck className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="pt-4">For Admins</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Maintain platform integrity by reviewing and approving new company registrations for a high-quality experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 relative overflow-hidden bg-secondary/50">
            <div className="absolute -left-48 -top-48 -z-10 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Featured Jobs</h2>
                    <p className="text-muted-foreground">Check out these hot opportunities from top local companies.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredJobs.map((job, index) => (
                        <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl bg-card">
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.company} - {job.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                            </CardContent>
                            <CardFooter>
                               <Button asChild className="w-full">
                                    <Link href={job.href}>View Job</Link>
                               </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/jobs">View All Jobs</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge variant="default" className="mb-4 bg-green-500 hover:bg-green-600">Why Choose Us</Badge>
                        <h2 className="text-3xl font-bold mb-4">The Smarter Way to Hire and Get Hired</h2>
                        <p className="text-muted-foreground mb-6">We're not just another job board. We're a dedicated platform for local communities, enhanced with cutting-edge technology to make connections that matter.</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full"><Zap className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <h3 className="font-semibold">AI-Powered Matching</h3>
                                    <p className="text-muted-foreground text-sm">Our smart algorithms help companies find the right candidates and job seekers discover their perfect role.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full"><Users className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <h3 className="font-semibold">Community Focused</h3>
                                    <p className="text-muted-foreground text-sm">We believe in the power of local. Strengthen your community by hiring and working close to home.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full"><Heart className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <h3 className="font-semibold">Simple and Transparent</h3>
                                    <p className="text-muted-foreground text-sm">No hidden fees, no complicated processes. Just a straightforward platform for hiring and getting hired.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                     <Image
                        src="https://placehold.co/600x600.png"
                        alt="Office discussion"
                        width={600}
                        height={600}
                        className="rounded-lg shadow-lg"
                        data-ai-hint="team meeting"
                    />
                </div>
            </div>
        </section>
        
        <section className="bg-secondary/50 py-20 md:py-24 relative overflow-hidden">
             <div className="absolute -right-48 -bottom-48 -z-10 h-96 w-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Loved by Companies and Candidates</h2>
                    <p className="text-muted-foreground">Don't just take our word for it. Here's what people are saying.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="flex flex-col justify-between bg-card border-0 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="flex gap-0.5 text-yellow-500 mb-2">
                                  <Star className="w-5 h-5 fill-current" />
                                  <Star className="w-5 h-5 fill-current" />
                                  <Star className="w-5 h-5 fill-current" />
                                  <Star className="w-5 h-5 fill-current" />
                                  <Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                            </CardContent>
                             <CardHeader className="flex-row gap-4 items-center">
                                <Image 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    data-ai-hint={testimonial.hint}
                                />
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                             </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}

    