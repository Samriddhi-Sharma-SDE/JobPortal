import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Job Seeker",
        price: "Free",
        description: "For individuals looking for their next opportunity.",
        features: [
            "Unlimited job applications",
            "Create a professional profile",
            "Get job alerts",
            "Community support"
        ],
        cta: "Sign Up Now",
        href: "/register",
        isSeeker: true
    },
    {
        name: "Starter",
        price: "$29",
        priceSuffix: "/mo",
        description: "For small companies hiring their first employees.",
        features: [
            "1 active job post",
            "50 applicants per job",
            "Basic company profile",
            "Email support"
        ],
        cta: "Choose Starter",
        href: "/register",
    },
    {
        name: "Growth",
        price: "$99",
        priceSuffix: "/mo",
        description: "For growing businesses that need more.",
        features: [
            "10 active job posts",
            "Unlimited applicants",
            "AI Keyword Suggestions",
            "25 Resume Views per month",
            "Priority support"
        ],
        cta: "Choose Growth",
        href: "/register",
        popular: true
    },
    {
        name: "Scale",
        price: "$249",
        priceSuffix: "/mo",
        description: "For established companies hiring at scale.",
        features: [
            "50 active job posts",
            "Featured company listing",
            "100 Resume Views per month",
            "Advanced analytics",
            "Dedicated support"
        ],
        cta: "Choose Scale",
        href: "/register",
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with advanced needs.",
        features: [
            "Unlimited job posts",
            "Unlimited Resume Views",
            "API Access & SSO Integration",
            "Branded career page",
            "Dedicated account manager"
        ],
        cta: "Contact Sales",
        href: "/contact"
    }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for you. Free for job seekers, powerful for companies.
            </p>
          </div>
          
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {tiers.filter(t => t.isSeeker).map(tier => (
                 <Card key={tier.name} className="lg:col-span-3 flex flex-col md:flex-row justify-between items-center p-8 bg-primary/5 text-primary-foreground">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-foreground">{tier.name}</h2>
                        <p className="text-muted-foreground">{tier.description}</p>
                        <div className="mt-4">
                            <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                        </div>
                    </div>
                    <div className="w-px bg-border h-full mx-8 hidden md:block"></div>
                    <div className="flex-1 text-center md:text-left my-6 md:my-0">
                        <ul className="space-y-2">
                             {tier.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="flex-1 flex justify-center md:justify-end">
                        <Button asChild size="lg">
                            <Link href={tier.href}>{tier.cta}</Link>
                        </Button>
                    </div>
                </Card>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {tiers.filter(t => !t.isSeeker).map(tier => (
              <Card key={tier.name} className={cn("flex flex-col h-full", tier.popular ? 'border-primary shadow-2xl scale-105' : '')}>
                <CardHeader className="relative">
                  {tier.popular && <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center"><div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">MOST POPULAR</div></div>}
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="mb-6">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        {tier.priceSuffix && <span className="text-muted-foreground">{tier.priceSuffix}</span>}
                    </div>
                  <ul className="space-y-4">
                    {tier.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
