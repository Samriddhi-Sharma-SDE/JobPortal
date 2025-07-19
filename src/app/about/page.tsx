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

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
                    </p>
                    <p className="text-muted-foreground">
                        Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
                    </p>
                </div>
                 <Image
                    src="https://placehold.co/600x400.png"
                    alt="Office team"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md"
                    data-ai-hint="team office"
                 />
            </div>

             <div className="grid md:grid-cols-2 gap-8 items-center">
                 <Image
                    src="https://placehold.co/600x400.png"
                    alt="Community"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md md:order-last"
                    data-ai-hint="community event"
                 />
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground mb-4">
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. 
                    </p>
                     <p className="text-muted-foreground">
                        Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.
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
