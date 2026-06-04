import CompressPdfTool from "@/components/CompressPdfTool";

export const metadata = {
  title: "Compress PDF Free No Sign Up",
  description:
    "Compress PDF files online for free. Reduce PDF file size with no sign up.",
};

export default function CompressPdfPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">
          Compress PDF
        </h1>

        <p className="mt-4 text-center text-lg text-slate-700">
          Reduce PDF file size online. Free and no sign up.
        </p>

        <div className="mt-12">
          <CompressPdfTool />
        </div>
      </div>
    </main>
  );
}