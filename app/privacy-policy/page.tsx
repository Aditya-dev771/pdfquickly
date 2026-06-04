import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Privacy Policy | PDFQuickly",
  description: "Privacy policy for PDFQuickly free PDF tools.",
};

export default function PrivacyPolicyPage() {
  return (
    <ToolLayout
      title="Privacy Policy"
      description="How PDFQuickly handles your files and data."
    >
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm">
        <p>
          PDFQuickly is designed to provide free PDF tools with a simple and
          privacy-friendly experience.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">File Processing</h2>

        <p>
          Most PDF tools on PDFQuickly process files directly in your browser.
          This means your files are not uploaded to our server for those tools.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">Personal Data</h2>

        <p>
          We do not require sign up, account creation, or login to use our PDF
          tools.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">Analytics</h2>

        <p>
          We may use basic analytics to understand website traffic and improve
          our tools.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">Third-Party Services</h2>

        <p>
          If third-party services are added later, this policy will be updated
          to explain how they are used.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">Contact</h2>

        <p>
          For privacy questions, contact us through the contact page.
        </p>
      </div>
    </ToolLayout>
  );
}