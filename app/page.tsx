"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tools = [
  { name: "Merge PDF", href: "/merge-pdf", desc: "Combine multiple PDFs into one file." },
  { name: "Split PDF", href: "/split-pdf", desc: "Extract selected pages from a PDF." },
  { name: "PDF to JPG", href: "/pdf-to-jpg", desc: "Convert PDF pages into JPG images." },
  { name: "JPG to PDF", href: "/jpg-to-pdf", desc: "Convert JPG images into PDF." },
  { name: "PNG to PDF", href: "/png-to-pdf", desc: "Convert PNG images into PDF." },
  { name: "Image to PDF", href: "/image-to-pdf", desc: "Convert images into one PDF." },
  { name: "Remove PDF Pages", href: "/remove-pdf-pages", desc: "Delete unwanted pages from your PDF." },
  { name: "Rotate PDF", href: "/rotate-pdf", desc: "Rotate PDF pages instantly." },
  { name: "Extract PDF Pages", href: "/extract-pdf-pages", desc: "Extract specific PDF pages." },
  { name: "PDF Organizer", href: "/pdf-organizer", desc: "Extract, remove and rotate pages." },
  { name: "Add Watermark", href: "/add-watermark", desc: "Add text watermark to PDF." },
  { name: "Add Page Numbers", href: "/add-page-numbers", desc: "Add page numbers to every page." },
  { name: "Add PDF Border", href: "/add-pdf-border", desc: "Add borders to PDF pages." },
  { name: "PDF Preview", href: "/pdf-preview", desc: "Preview PDF pages online." },
  { name: "PDF to Word", href: "/pdf-to-word", desc: "PDF to Word converter UI." },
  { name: "Text to PDF", href: "/text-to-pdf", desc: "Create PDF from text." },
  { name: "Extract First Page", href: "/extract-first-page", desc: "Download only the first page." },
  { name: "Extract Last Page", href: "/extract-last-page", desc: "Download only the last page." },
  { name: "Remove Blank Pages", href: "/remove-blank-pages", desc: "Remove blank page numbers." },
  { name: "PDF Metadata Viewer", href: "/pdf-metadata-viewer", desc: "View PDF metadata." },
  { name: "Remove PDF Metadata", href: "/remove-pdf-metadata", desc: "Clean hidden PDF metadata." },
  { name: "PDF Page Counter", href: "/pdf-page-counter", desc: "Count total PDF pages." },
  { name: "PDF Size Calculator", href: "/pdf-size-calculator", desc: "Check PDF size and pages." },
  { name: "More Coming Soon", href: "#" },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10 text-center">
        <p className="mb-3 text-sm font-semibold text-green-600">
          Free PDF Tools • No Sign Up • No Watermark
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Free PDF Tools Online
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-700">
          Merge, split, rotate, extract, organize and convert PDF files directly
          in your browser. Fast, simple and free.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/merge-pdf"
            className="rounded-xl bg-slate-950 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Start With Merge PDF
          </Link>

          <Link
            href="#tools"
            className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
          >
            View All Tools
          </Link>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-6 pb-14">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold">Popular PDF Tools</h2>
          <p className="mt-2 text-slate-600">
            Choose a tool and start working with your PDF.
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search PDF tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-950 outline-none focus:border-slate-950"
          />
        </div>

        {filteredTools.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-slate-950">No tools found.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-lg font-bold">{tool.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}