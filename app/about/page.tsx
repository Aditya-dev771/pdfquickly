import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "About PDFQuickly",
  description: "Learn about PDFQuickly and our free PDF tools.",
};

export default function AboutPage() {
  return (
    <ToolLayout
      title="About PDFQuickly"
      description="Simple, fast and free PDF tools with no sign up."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-lg leading-8 text-slate-700">
          PDFQuickly is a free online PDF toolkit made to help users merge,
          split, rotate, extract, organize and edit PDF files quickly.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          Most tools work directly in your browser, so your files do not need to
          be uploaded to a server for processing.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          Our goal is simple: provide fast PDF tools with no sign up, no
          watermark and no unnecessary steps.
        </p>
      </div>
    </ToolLayout>
  );
}