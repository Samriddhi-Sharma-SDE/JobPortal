
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Check, Heart, Lightbulb, Users, BarChart, Handshake, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const teamMembers = [
  { name: 'Alex Johnson', role: 'Founder & CEO', image: 'https://placehold.co/400x400.png', hint: 'man professional portrait' },
  { name: 'Samantha Lee', role: 'Chief Technology Officer', image: 'https://placehold.co/400x400.png', hint: 'woman technology professional' },
  { name: 'David Chen', role: 'Head of Product', image: 'https://placehold.co/400x400.png', hint: 'man product manager' },
  { name: 'Maria Garcia', role: 'Lead UX Designer', image: 'https://placehold.co/400x400.png', hint: 'woman designer portrait' },
]

const values = [
    { icon: <Target className="w-8 h-8 text-primary" />, title: 'Purpose-Driven', description: 'We are dedicated to making a real impact on local communities by connecting talent with meaningful work.'},
    { icon: <Handshake className="w-8 h-8 text-primary" />, title: 'User-Centric', description: 'Our users are at the heart of everything we do. We listen, learn, and build to meet their needs.'},
    { icon: <Lightbulb className="w-8 h-8 text-primary" />, title: 'Innovation', description: 'We constantly explore new technologies and ideas to make the hiring process smarter and more efficient.'},
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'Community Focus', description: 'We believe in the power of local economies and strive to strengthen them with every connection we make.'},
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumbs />
          <div className="max-w-5xl mx-auto mt-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">About Job Portal</h1>
                <p className="mt-6 text-lg text-muted-foreground">
                We're on a mission to reshape the local employment landscape, one connection at a time. Discover our story, our values, and the team making it all happen.
                </p>
            </div>

            {/* Our Story Section */}
            <div className="py-16">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Founders sketching ideas"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                        data-ai-hint="founders planning"
                    />
                    <div className="space-y-4">
                        <Badge>Our Story</Badge>
                        <h2 className="text-3xl font-bold">From a Simple Idea to a Thriving Community</h2>
                        <p className="text-muted-foreground">
                            Job Portal was born from a simple observation: finding great local talent was harder than it should be, and talented individuals were overlooking incredible opportunities right in their backyard. 
                        </p>
                        <p className="text-muted-foreground">
                           Frustrated by impersonal, sprawling job sites, our founders envisioned a platform that was deeply integrated with the community. We started in a small co-working space, driven by a passion for technology and a commitment to fostering local economic growth. Today, we're proud to be the leading platform for local employment, but our core mission remains the same.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission and Vision Section */}
            <div className="py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16 relative">
                    <div className="absolute -top-16 -left-16 -z-10 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-muted-foreground">
                            Our mission is to empower local economies by creating a seamless, efficient, and enjoyable connection between job seekers and employers. We strive to foster community growth and individual career development by making local opportunities more accessible than ever before.
                        </p>
                        <p className="text-muted-foreground">
                            We are dedicated to building a platform that not only lists jobs but also understands the unique needs of local markets, helping businesses thrive and talent to flourish right where they live.
                        </p>
                    </div>
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Team working together on a project"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                        data-ai-hint="team collaboration"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center relative">
                    <div className="absolute -bottom-16 -right-16 -z-10 h-64 w-64 bg-accent/10 rounded-full blur-3xl" />
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="A vibrant local community event"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg md:order-last"
                        data-ai-hint="community event"
                    />
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Our Vision</h2>
                        <p className="text-muted-foreground">
                            We envision a future where every individual can find meaningful work within their own community, and every local business has access to the talent they need to succeed. We aim to be the digital heart of local employment, a trusted partner for both companies and professionals.
                        </p>
                        <p className="text-muted-foreground">
                        Through continuous innovation and a deep commitment to our users, we see a world where geographical barriers to employment are minimized, strengthening community ties and building a more prosperous future for all.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="text-center py-16">
                 <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto mb-12">The principles that guide our decisions, actions, and culture.</p>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {values.map(value => (
                         <Card key={value.title} className="text-center p-6 border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                             <div className="flex justify-center items-center mb-4 bg-primary/10 rounded-full w-16 h-16 mx-auto">
                                {value.icon}
                             </div>
                             <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                             <p className="text-muted-foreground">{value.description}</p>
                         </Card>
                     ))}
                 </div>
            </div>

            {/* Why Choose Us Section */}
             <div className="py-16 bg-card -mx-8 px-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <Badge variant="secondary">Why Choose Us</Badge>
                        <h2 className="text-3xl font-bold">The Smarter Way to Hire and Get Hired</h2>
                        <p className="text-muted-foreground pb-4">We're not just another job board. We're a dedicated platform for local communities, enhanced with cutting-edge technology to make connections that matter.</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">AI-Powered Keyword Suggestions</h3>
                                    <p className="text-muted-foreground text-sm">Our smart algorithms help companies craft job descriptions that attract the right candidates.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Hyper-Local Focus</h3>
                                    <p className="text-muted-foreground text-sm">Strengthen your community by hiring and working close to home, reducing commute times and boosting local economies.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Simple and Transparent Pricing</h3>
                                    <p className="text-muted-foreground text-sm">No hidden fees, no complicated processes. Just a straightforward platform for everyone.</p>
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

            {/* Meet The Team Section */}
            <div className="py-16">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Meet Our Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">The passionate individuals dedicated to connecting our community.</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {teamMembers.map(member => (
                        <div key={member.name}>
                            <Image src={member.image} alt={member.name} width={400} height={400} className="rounded-full w-40 h-40 mx-auto mb-4 shadow-lg object-cover" data-ai-hint={member.hint} />
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-sm text-primary">{member.role}</p>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Join Us Section */}
            <div className="bg-primary/10 rounded-lg p-12 text-center my-16">
                <h2 className="text-3xl font-bold">Join Our Growing Community</h2>
                <p className="text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto">Whether you're looking for your dream job or searching for the perfect candidate, your journey starts here.</p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg"><Link href="/jobs">Find a Job</Link></Button>
                    <Button asChild size="lg" variant="outline"><Link href="/register?role=company">Post a Job</Link></Button>
                </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
