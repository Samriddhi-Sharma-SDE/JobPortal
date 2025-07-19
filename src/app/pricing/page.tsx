import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
    {
        name: "Basic",
        price: "Free",
        description: "For individuals and small teams getting started.",
        features: [
            "1 active job post",
            "50 applicants per job",
            "Basic company profile",
            "Email support"
        ],
        cta: "Get Started",
        href: "/register"
    },
    {
        name: "Pro",
        price: "$49",
        priceSuffix: "/mo",
        description: "For growing companies that need more features.",
        features: [
            "10 active job posts",
            "Unlimited applicants",
            "Customizable company profile",
            "AI Keyword Suggestions",
            "Priority support"
        ],
        cta: "Choose Pro",
        href: "/register",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with advanced needs.",
        features: [
            "Unlimited job posts",
            "Dedicated account manager",
            "Advanced analytics",
            "API Access",
            "SSO Integration"
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
              Choose the plan that's right for you. No hidden fees, ever.
            </p>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map(tier => (
              <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
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
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
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
