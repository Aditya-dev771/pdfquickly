import SplitPdfTool from "@/components/SplitPdfTool";
import type { Metadata } from "next";

export const metadata = {
  title: "Split PDF Free No Sign Up",
  description:
    "Split PDF files online for free. Extract selected pages from a PDF with no sign up and no watermark.",
};

export default function SplitPdfPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">
          Split PDF
        </h1>

        <p className="mt-4 text-center text-lg text-slate-700">
          Extract selected pages from your PDF. Free, fast, and no sign up.
        </p>

        <div className="mt-12">
          <SplitPdfTool />
        </div>
      </div>
    </main>
  );
}