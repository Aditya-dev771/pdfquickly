"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

type PdfStats = {
  fileName: string;
  fileSizeBytes: number;
  fileSizeKB: string;
  fileSizeMB: string;
  pageCount: number;
  averageKBPerPage: string;
};

export default function PdfSizeCalculatorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [stats, setStats] = useState<PdfStats | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setStats(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  async function calculateSize() {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pageCount = pdf.getPageCount();

      const fileSizeBytes = file.size;
      const fileSizeKB = fileSizeBytes / 1024;
      const fileSizeMB = fileSizeKB / 1024;
      const averageKBPerPage = pageCount > 0 ? fileSizeKB / pageCount : 0;

      setStats({
        fileName: file.name,
        fileSizeBytes,
        fileSizeKB: fileSizeKB.toFixed(2),
        fileSizeMB: fileSizeMB.toFixed(2),
        pageCount,
        averageKBPerPage: averageKBPerPage.toFixed(2),
      });
    } catch (error) {
      console.error(error);
      alert("Failed to read PDF.");
    } finally {
      setLoading(false);
    }
  }

  function removeFile() {
    setFile(null);
    setStats(null);
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-slate-950">{file.name}</p>
              <p className="text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={removeFile}
                className="rounded-xl bg-red-50 px-6 py-3 font-semibold text-red-600 hover:bg-red-100"
              >
                Remove
              </button>

              <button
                onClick={calculateSize}
                disabled={loading}
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-slate-400"
              >
                {loading ? "Calculating..." : "Calculate Size"}
              </button>
            </div>
          </div>

          {stats && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  File Size
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {stats.fileSizeMB} MB
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  Size in KB
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {stats.fileSizeKB} KB
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  Total Pages
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {stats.pageCount}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  Avg KB/Page
                </p>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">
                  {stats.averageKBPerPage}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}