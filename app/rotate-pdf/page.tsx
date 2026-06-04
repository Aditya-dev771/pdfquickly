import RotatePdfTool from "@/components/RotatePdfTool";

export const metadata = {
  title: "Rotate PDF Free No Sign Up",
  description:
    "Rotate PDF pages online for free. No sign up and no watermark.",
};

export default function RotatePdfPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">Rotate PDF</h1>

        <p className="mt-4 text-center text-lg text-slate-700">
          Rotate all pages in your PDF. Free, fast, and no sign up.
        </p>

        <div className="mt-12">
          <RotatePdfTool />
        </div>
      </div>
    </main>
  );
}