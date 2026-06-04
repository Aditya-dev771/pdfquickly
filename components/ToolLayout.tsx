import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ToolLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-center text-5xl font-extrabold">{title}</h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-700">
          {description}
        </p>

        <div className="mt-12">{children}</div>
      </section>

      <Footer />
    </main>
  );
}