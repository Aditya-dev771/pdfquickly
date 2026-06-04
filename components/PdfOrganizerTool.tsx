"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { degrees, PDFDocument } from "pdf-lib";

export default function PdfOrganizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState("extract");
  const [pages, setPages] = useState("");
  const [rotation, setRotation] = useState(90);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setPages("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  function parsePages(input: string, totalPages: number) {
    const selectedPages: number[] = [];
    const parts = input.split(",").map((part) => part.trim());

    for (const part of parts) {
      if (!part) continue;

      if (part.includes("-")) {
        const [startRaw, endRaw] = part.split("-");
        const start = Number(startRaw);
        const end = Number(endRaw);

        if (
          !Number.isInteger(start) ||
          !Number.isInteger(end) ||
          start < 1 ||
          end < start ||
          end > totalPages
        ) {
          throw new Error("Invalid page range.");
        }

        for (let i = start; i <= end; i++) {
          selectedPages.push(i - 1);
        }
      } else {
        const page = Number(part);

        if (!Number.isInteger(page) || page < 1 || page > totalPages) {
          throw new Error("Invalid page number.");
        }

        selectedPages.push(page - 1);
      }
    }

    return [...new Set(selectedPages)];
  }

  async function organizePdf() {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const totalPages = pdf.getPageCount();

      let outputPdf = await PDFDocument.create();

      if (mode === "extract") {
        if (!pages.trim()) {
          alert("Enter pages to extract. Example: 1,3,5-7");
          return;
        }

        const selectedIndexes = parsePages(pages, totalPages);
        const copiedPages = await outputPdf.copyPages(pdf, selectedIndexes);

        copiedPages.forEach((page) => outputPdf.addPage(page));
      }

      if (mode === "remove") {
        if (!pages.trim()) {
          alert("Enter pages to remove. Example: 2,4,7-10");
          return;
        }

        const removeIndexes = parsePages(pages, totalPages);

        if (removeIndexes.length >= totalPages) {
          alert("You cannot remove all pages.");
          return;
        }

        const keepIndexes = pdf
          .getPageIndices()
          .filter((index) => !removeIndexes.includes(index));

        const copiedPages = await outputPdf.copyPages(pdf, keepIndexes);

        copiedPages.forEach((page) => outputPdf.addPage(page));
      }

      if (mode === "rotate") {
        const copiedPages = await outputPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        copiedPages.forEach((page) => {
          page.setRotation(degrees(rotation));
          outputPdf.addPage(page);
        });
      }

      const outputBytes = await outputPdf.save();
      const blob = new Blob([new Uint8Array(outputBytes)], {
  type: "application/pdf",
});

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "organized.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to organize PDF. Check your page numbers.");
    } finally {
      setLoading(false);
    }
  }

  function removeFile() {
    setFile(null);
    setPages("");
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />

        <h2 className="text-3xl font-bold text-slate-950">Upload PDF</h2>

        <p className="mt-4 text-slate-600">
          Drag and drop PDF here or click to browse
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-slate-950 px-8 py-4 font-semibold text-white hover:bg-slate-800"
        >
          Choose PDF
        </button>
      </div>

      {file && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-slate-950">{file.name}</p>
              <p className="text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              onClick={removeFile}
              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          </div>

          <div className="mt-6">
            <label className="font-semibold text-slate-950">
              Choose Action
            </label>

            <select
              value={mode}
              onChange={(e) => {
                setMode(e.target.value);
                setPages("");
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-slate-950"
            >
              <option value="extract">Extract selected pages</option>
              <option value="remove">Remove selected pages</option>
              <option value="rotate">Rotate all pages</option>
            </select>
          </div>

          {(mode === "extract" || mode === "remove") && (
            <div className="mt-6">
              <label className="font-semibold text-slate-950">
                Page Numbers
              </label>

              <input
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                placeholder="Example: 1,3,5-7"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-slate-950"
              />

              <p className="mt-2 text-sm text-slate-500">
                Use commas and ranges. Example: 1,3,5-7
              </p>
            </div>
          )}

          {mode === "rotate" && (
            <div className="mt-6">
              <label className="font-semibold text-slate-950">
                Rotation Angle
              </label>

              <select
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-slate-950"
              >
                <option value={90}>90° Clockwise</option>
                <option value={180}>180°</option>
                <option value={270}>270° Clockwise</option>
              </select>
            </div>
          )}

          <button
            onClick={organizePdf}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:bg-slate-400"
          >
            {loading ? "Processing..." : "Organize PDF"}
          </button>
        </div>
      )}
    </div>
  );
}