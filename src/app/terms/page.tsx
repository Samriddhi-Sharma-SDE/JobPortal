
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumbs />
          <div className="prose prose-lg max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-md mt-6">
            <h1>Terms of Service</h1>
            <p className="lead text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. Agreement to Terms</h2>
            <p>By using our services ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you do not have permission to access the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>

            <h2>2. Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

            <h2>3. Content</h2>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness. By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.</p>
            
            <h2>4. Intellectual Property</h2>
            <p>The Service and its original content, features and functionality are and will remain the exclusive property of Job Portal and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

            <h2>5. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

            <h2>6. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the State, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:terms@jobportal.local">terms@jobportal.local</a>.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
