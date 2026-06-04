"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function ExtractPdfPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
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

  async function extractPages() {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    if (!pages.trim()) {
      alert("Please enter pages. Example: 1,3,5-7");
      return;
    }

    try {
      setLoading(true);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();

      const selectedPageIndexes = parsePages(pages, totalPages);

      if (selectedPageIndexes.length === 0) {
        alert("No valid pages selected.");
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, selectedPageIndexes);

      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      const extractedBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(extractedBytes)], {
  type: "application/pdf",
});

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "extracted-pages.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Invalid page selection. Use format like 1,3,5-7.");
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

        <h2 className="text-3xl font-bold text-slate-950">
          Upload PDF
        </h2>

        <p className="mt-4 text-slate-600">
          Drag and drop your PDF here or click to browse
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
              Pages to extract
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

          <button
            onClick={extractPages}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Extracting..." : "Extract Pages"}
          </button>
        </div>
      )}
    </div>
  );
}