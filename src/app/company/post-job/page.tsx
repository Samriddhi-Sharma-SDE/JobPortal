"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { addJob } from "@/lib/mock-db";
import { DashboardLayout, type NavItem } from "@/components/DashboardLayout";
import { LayoutDashboard, PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KeywordSuggester } from "@/components/KeywordSuggester";

const companyNavItems: NavItem[] = [
  { href: "/company/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/company/post-job", label: "Post a Job", icon: <PlusCircle className="w-5 h-5" /> },
];

const formSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters." }),
  description: z.string().min(50, { message: "Description must be at least 50 characters." }),
  keywords: z.array(z.string()).min(1, { message: "Please add at least one keyword." }),
});

export default function PostJobPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [keywordInput, setKeywordInput] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: [],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "keywords",
  });
  
  const jobTitle = form.watch("title");
  const jobDescription = form.watch("description");

  // useEffect(() => {
  //   if (!authLoading) {
  //     if (!user || user.role !== 'company') {
  //       router.push('/login');
  //     }
  //   }
  // }, [user, authLoading, router]);

  const handleAddKeyword = () => {
    if (keywordInput.trim() !== "" && !fields.some(field => field.value === keywordInput.trim())) {
      append(keywordInput.trim());
      setKeywordInput("");
    }
  };
  
  const handleAddSuggestedKeywords = (keywords: string[]) => {
     const uniqueKeywords = keywords.filter(kw => !fields.some(field => field.value === kw));
     uniqueKeywords.forEach(kw => append(kw));
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock companyId when not logged in
    const companyId = user?.companyId || 'company-1'; 
    if (!companyId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not identify your company.' });
        return;
    }
    try {
      addJob({ ...values, companyId: companyId });
      toast({
        title: "Job Posted Successfully",
        description: `Your new role "${values.title}" is now live.`,
      });
      router.push("/company/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to Post Job",
        description: error.message,
      });
    }
  }

  if (authLoading) {
    return (
      <DashboardLayout title="Post a New Job" navItems={companyNavItems}>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Post a New Job" navItems={companyNavItems}>
      <Card>
        <CardHeader>
          <CardTitle>Create a New Job Listing</CardTitle>
          <CardDescription>Fill out the details below to find your next great hire.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the role, responsibilities, and requirements." rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Keywords</FormLabel>
                <FormDescription className="mb-2">
                    Add relevant keywords to attract the right candidates.
                </FormDescription>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="e.g., React, Node.js"
                  />
                  <Button type="button" onClick={handleAddKeyword}>Add</Button>
                </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {fields.map((field, index) => (
                      <Badge key={field.id} variant="default" className="flex items-center gap-1">
                        {field.value}
                        <button type="button" onClick={() => remove(index)} className="rounded-full hover:bg-primary-foreground/20">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                 {form.formState.errors.keywords && <p className="text-sm font-medium text-destructive">{form.formState.errors.keywords.message}</p>}
              </div>

              <KeywordSuggester 
                jobTitle={jobTitle}
                jobDescription={jobDescription}
                onKeywordsAdd={handleAddSuggestedKeywords}
                currentKeywords={fields.map(f => f.value)}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Posting Job..." : "Post Job"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
