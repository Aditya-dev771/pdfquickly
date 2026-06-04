"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function PdfPageCounterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setPageCount(null);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  async function countPages() {
    if (!file) return;

    try {
      setLoading(true);

      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      setPageCount(pdf.getPageCount());
    } catch (error) {
      console.error(error);
      alert("Failed to read PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center"
      >
        <input {...getInputProps()} />

        <h2 className="text-3xl font-bold text-slate-950">
          Upload PDF
        </h2>

        <p className="mt-4 text-slate-600">
          Drag and drop PDF here
        </p>
      </div>

      {file && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-semibold">{file.name}</p>

          <button
            onClick={countPages}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white"
          >
            {loading ? "Counting..." : "Count Pages"}
          </button>

          {pageCount !== null && (
            <div className="mt-6 rounded-xl bg-slate-100 p-6 text-center">
              <p className="text-lg font-semibold">
                Total Pages
              </p>

              <p className="mt-2 text-4xl font-extrabold">
                {pageCount}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}