
"use client";

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { applyForJob } from '@/lib/mock-db';
import type { Job, User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, PlusCircle, Trash2 } from 'lucide-react';

const educationSchema = z.object({
    degree: z.string().min(2, "Degree is required."),
    institution: z.string().min(2, "Institution is required."),
    graduationYear: z.string().min(4, "Year is required.").max(4),
});

const experienceSchema = z.object({
    jobTitle: z.string().min(2, "Job title is required."),
    company: z.string().min(2, "Company name is required."),
    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().min(1, "End date is required."),
    responsibilities: z.string().min(10, "Please describe your responsibilities."),
});

const applicationSchema = z.object({
    fullName: z.string().min(2, "Full name is required."),
    email: z.string().email(),
    phone: z.string().min(10, "A valid phone number is required."),
    education: z.array(educationSchema).min(1, "At least one education entry is required."),
    experience: z.array(experienceSchema).optional(),
    resumeUrl: z.string().optional(), // In a real app, this would be a file upload
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
    job: Job;
    user: User;
}

const steps = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'education', title: 'Education' },
    { id: 'experience', title: 'Work Experience' },
    { id: 'review', title: 'Review & Submit' },
];

export function ApplicationForm({ job, user }: ApplicationFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            fullName: user.name || '',
            email: user.email,
            phone: '',
            education: [{ degree: '', institution: '', graduationYear: '' }],
            experience: [],
        },
    });

    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
        control: form.control, name: "education",
    });

    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
        control: form.control, name: "experience",
    });

    const triggerValidation = async (fields: (keyof ApplicationFormValues)[]) => {
        for (const field of fields) {
            const result = await form.trigger(field);
            if (!result) return false;
        }
        return true;
    };

    const nextStep = async () => {
        let isValid = false;
        if (currentStep === 0) isValid = await triggerValidation(['fullName', 'email', 'phone']);
        else if (currentStep === 1) isValid = await triggerValidation(['education']);
        else if (currentStep === 2) isValid = await triggerValidation(['experience']);
        else if (currentStep === 3) isValid = true;


        if (isValid) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };
    
    async function onSubmit(data: ApplicationFormValues) {
        setIsLoading(true);
        try {
            const applicationData = {
                ...data,
                jobId: job.id,
                employeeId: user.id
            };
            applyForJob(applicationData);
            toast({
                title: "Application Submitted!",
                description: `Your application for the ${job.title} role has been sent.`
            });
            router.push('/employee/applications');

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Submission Failed',
                description: error.message || 'There was an error submitting your application.'
            });
            setIsLoading(false);
        }
    }
    
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <Card>
            <CardHeader>
                <Progress value={progress} className="mb-4" />
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>Step {currentStep + 1} of {steps.length}</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-8">
                        {currentStep === 0 && (
                            <div className="space-y-4">
                               <FormField control={form.control} name="fullName" render={({ field }) => (
                                   <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                               )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                   <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="name@example.com" {...field} disabled /></FormControl><FormMessage /></FormItem>
                               )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                   <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                               )} />
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                {eduFields.map((field, index) => (
                                    <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (
                                           <FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="e.g., Bachelor of Science" {...field} /></FormControl><FormMessage /></FormItem>
                                       )} />
                                        <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (
                                           <FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="e.g., University of California" {...field} /></FormControl><FormMessage /></FormItem>
                                       )} />
                                       <FormField control={form.control} name={`education.${index}.graduationYear`} render={({ field }) => (
                                           <FormItem><FormLabel>Graduation Year</FormLabel><FormControl><Input placeholder="e.g., 2022" {...field} /></FormControl><FormMessage /></FormItem>
                                       )} />
                                       {index > 0 && <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="w-4 h-4" /></Button>}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => appendEdu({ degree: '', institution: '', graduationYear: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Education</Button>
                            </div>
                        )}
                        {currentStep === 2 && (
                             <div className="space-y-6">
                                {expFields.map((field, index) => (
                                     <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                                        <FormField control={form.control} name={`experience.${index}.jobTitle`} render={({ field }) => (
                                           <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                                       )} />
                                        <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => (
                                           <FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="e.g., Google" {...field} /></FormControl><FormMessage /></FormItem>
                                       )} />
                                       <div className="grid grid-cols-2 gap-4">
                                            <FormField control={form.control} name={`experience.${index}.startDate`} render={({ field }) => (
                                               <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl><FormMessage /></FormItem>
                                           )} />
                                            <FormField control={form.control} name={`experience.${index}.endDate`} render={({ field }) => (
                                               <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl><FormMessage /></FormItem>
                                           )} />
                                       </div>
                                       <FormField control={form.control} name={`experience.${index}.responsibilities`} render={({ field }) => (
                                           <FormItem><FormLabel>Responsibilities</FormLabel><FormControl><Textarea placeholder="Describe your key responsibilities..." {...field} /></FormControl><FormMessage /></FormItem>
                                       )} />

                                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="w-4 h-4" /></Button>
                                     </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => appendExp({ jobTitle: '', company: '', startDate: '', endDate: '', responsibilities: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Experience</Button>
                             </div>
                        )}
                        {currentStep === 3 && (
                            <div className="space-y-6 prose prose-sm max-w-none">
                                <h3 className="text-foreground">Review Your Application</h3>
                                <p>Please review all the information carefully before submitting.</p>
                                
                                <h4>Personal Information</h4>
                                <ul>
                                    <li><strong>Full Name:</strong> {form.getValues('fullName')}</li>
                                    <li><strong>Email:</strong> {form.getValues('email')}</li>
                                    <li><strong>Phone:</strong> {form.getValues('phone')}</li>
                                </ul>

                                <h4>Education</h4>
                                {form.getValues('education').map((edu, i) => (
                                    <ul key={i}>
                                        <li><strong>Degree:</strong> {edu.degree}</li>
                                        <li><strong>Institution:</strong> {edu.institution}</li>
                                        <li><strong>Graduation Year:</strong> {edu.graduationYear}</li>
                                    </ul>
                                ))}
                                
                                {form.getValues('experience') && form.getValues('experience')!.length > 0 && (
                                    <>
                                        <h4>Work Experience</h4>
                                        {form.getValues('experience')?.map((exp, i) => (
                                            <ul key={i}>
                                                <li><strong>Title:</strong> {exp.jobTitle}</li>
                                                <li><strong>Company:</strong> {exp.company}</li>
                                                <li><strong>Duration:</strong> {exp.startDate} to {exp.endDate}</li>
                                            </ul>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {currentStep > 0 ? <Button type="button" variant="outline" onClick={prevStep}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button> : <div></div>}
                        {currentStep < steps.length - 1 && <Button type="button" onClick={nextStep}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>}
                        {currentStep === steps.length - 1 && <Button type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Submit Application"}</Button>}
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
