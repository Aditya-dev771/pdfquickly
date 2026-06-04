import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">PDFQuickly</h3>

            <p className="mt-3 text-sm text-slate-600">
              Free online PDF tools with no sign up and no watermark.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Tools</h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/merge-pdf">Merge PDF</Link>
              <Link href="/split-pdf">Split PDF</Link>
              <Link href="/pdf-to-jpg">PDF to JPG</Link>
              <Link href="/jpg-to-pdf">JPG to PDF</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Company</h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PDFQuickly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}