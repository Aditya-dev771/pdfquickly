import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Terms of Use | PDFQuickly",
  description: "Terms of use for PDFQuickly free PDF tools.",
};

export default function TermsPage() {
  return (
    <ToolLayout
      title="Terms of Use"
      description="Rules for using PDFQuickly."
    >
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm">
        <p>
          By using PDFQuickly, you agree to use the website responsibly and only
          for lawful purposes.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">Free Tools</h2>

        <p>
          PDFQuickly provides free PDF tools as-is. We do not guarantee that
          every tool will work perfectly for every file.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">User Files</h2>

        <p>
          You are responsible for the files you upload or process using our
          tools. Do not use PDFQuickly for illegal, harmful, or unauthorized
          content.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">No Warranty</h2>

        <p>
          PDFQuickly is provided without warranties of any kind. Use the tools
          at your own discretion.
        </p>

        <h2 className="text-2xl font-bold text-slate-950">Changes</h2>

        <p>
          We may update these terms as the website grows.
        </p>
      </div>
    </ToolLayout>
  );
}