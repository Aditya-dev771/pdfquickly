import RemovePdfPagesTool from "@/components/RemovePdfPagesTool";

export const metadata = {
  title: "Remove PDF Pages Free No Sign Up",
  description:
    "Remove unwanted pages from PDF files online for free. No sign up and no watermark.",
};

export default function RemovePdfPagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">
          Remove PDF Pages
        </h1>

        <p className="mt-4 text-center text-lg text-slate-700">
          Delete unwanted pages from your PDF. Free, fast, and no sign up.
        </p>

        <div className="mt-12">
          <RemovePdfPagesTool />
        </div>
      </div>
    </main>
  );
}