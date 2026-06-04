import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Contact PDFQuickly",
  description: "Contact PDFQuickly for support, feedback or suggestions.",
};

export default function ContactPage() {
  return (
    <ToolLayout
      title="Contact"
      description="Have feedback or tool suggestions? Contact us."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-lg text-slate-700">
          For support, feedback or suggestions, contact us at:
        </p>

        <p className="mt-4 text-xl font-bold text-slate-950">
          support@pdfquickly.com
        </p>
      </div>
    </ToolLayout>
  );
}