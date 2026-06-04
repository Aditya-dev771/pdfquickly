import JpgToPdfTool from "@/components/JpgToPdfTool";
import type { Metadata } from "next";

export const metadata = {
  title: "JPG to PDF Free No Sign Up",
  description:
    "Convert JPG images to PDF online for free. No sign up and no watermark.",
};

export default function JpgToPdfPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">
          JPG to PDF
        </h1>

        <p className="mt-4 text-center text-lg text-slate-700">
          Convert JPG and PNG images into PDF files. Free and no sign up.
        </p>

        <div className="mt-12">
          <JpgToPdfTool />
        </div>
      </div>
    </main>
  );
}