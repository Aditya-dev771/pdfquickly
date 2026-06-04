"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  async function convertPdfToJpg() {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.mjs",
        import.meta.url
      ).toString();

      const bytes = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: bytes,
      }).promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas not supported.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Fix: Use 'canvas' property instead of 'canvasContext'
        await page.render({
          canvasContext: context,
          viewport,
          canvas: canvas, // Add this property
        }).promise;

        const imageUrl = canvas.toDataURL("image/jpeg", 0.95);

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `page-${pageNum}.jpg`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      alert("Conversion complete! Check your downloads folder.");
    } catch (error) {
      console.error(error);
      alert("Failed to convert PDF. Please make sure the PDF is not corrupted.");
    } finally {
      setLoading(false);
    }
  }

  function removeFile() {
    setFile(null);
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
            <button
              onClick={convertPdfToJpg}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:bg-slate-400"
            >
              {loading ? "Converting..." : "Convert to JPG"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}