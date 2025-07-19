import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">About JobLink Local</h1>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Connecting local talent with local opportunities. We believe the best jobs are right in your neighborhood.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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

             <div className="grid md:grid-cols-2 gap-12 items-center">
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
