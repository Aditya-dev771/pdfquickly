import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-7xl font-extrabold">404</p>

        <h1 className="mt-6 text-4xl font-extrabold">
          Page Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-slate-950 px-7 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Go Home
          </Link>

          <Link
            href="/#tools"
            className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-950 hover:bg-slate-100"
          >
            View Tools
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}