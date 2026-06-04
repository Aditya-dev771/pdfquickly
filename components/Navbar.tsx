import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold text-slate-950">
          PDFQuickly
        </Link>

        <div className="flex gap-6 text-sm font-semibold text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/#tools">Tools</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}