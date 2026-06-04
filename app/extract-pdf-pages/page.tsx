import ExtractPdfPagesTool from "@/components/ExtractPdfPagesTool";

export const metadata = {
  title: "Extract PDF Pages Free No Sign Up",
  description:
    "Extract selected pages from PDF files online for free. No sign up and no watermark.",
};

export default function ExtractPdfPagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">
          Extract PDF Pages
        </h1>

        <p className="mt-4 text-center text-lg text-slate-700">
          Select and extract specific pages from your PDF. Free, fast, and no
          sign up.
        </p>

        <div className="mt-12">
          <ExtractPdfPagesTool />
        </div>
      </div>
    </main>
  );
}