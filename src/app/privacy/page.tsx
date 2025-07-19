
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-md">
            <h1>Privacy Policy</h1>
            <p className="lead text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p>Welcome to Job Portal. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            
            <h2>1. What Information Do We Collect?</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.</p>
            <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect can include the following: name, email address, password, contact preferences, and other similar information.</p>

            <h2>2. How Do We Use Your Information?</h2>
            <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul>
                <li>To facilitate account creation and logon process.</li>
                <li>To send administrative information to you.</li>
                <li>To protect our Services.</li>
                <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
            </ul>

            <h2>3. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations.</p>

            <h2>4. How Do We Keep Your Information Safe?</h2>
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.</p>

            <h2>5. How Can You Contact Us About This Policy?</h2>
            <p>If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@jobportal.local">privacy@jobportal.local</a> or by post to:</p>
            <address>
                Job Portal, Inc.<br />
                123 Opportunity Lane<br />
                Business City, ST 54321<br />
                United States
            </address>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
