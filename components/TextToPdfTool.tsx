"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function TextToPdfTool() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function createPdf() {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    try {
      setLoading(true);

      const pdf = await PDFDocument.create();
      const font = await pdf.embedFont(StandardFonts.Helvetica);

      const pageWidth = 595;
      const pageHeight = 842;
      const margin = 50;
      const fontSize = 12;
      const lineHeight = 18;
      const maxWidth = pageWidth - margin * 2;

      let page = pdf.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      const words = text.split(/\s+/);
      let line = "";

      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth) {
          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });

          line = word;
          y -= lineHeight;

          if (y < margin) {
            page = pdf.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
        } else {
          line = testLine;
        }
      }

      if (line) {
        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const pdfBytes = await pdf.save();
const blob = new Blob([new Uint8Array(pdfBytes)], {
  type: "application/pdf",
});

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "text-to-pdf.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to create PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <label className="font-semibold text-slate-950">
        Enter your text
      </label>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write or paste your text here..."
        rows={12}
        className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-slate-950"
      />

      <button
        onClick={createPdf}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:bg-slate-400"
      >
        {loading ? "Creating..." : "Create PDF"}
      </button>
    </div>
  );
}