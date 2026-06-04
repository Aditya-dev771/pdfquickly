"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  async function compressPdf() {
    if (!file) return;

    try {
      setLoading(true);

      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes);

      const compressed = await pdf.save({
        useObjectStreams: true,
      });

      const blob = new Blob([new Uint8Array(compressed)], {
  type: "application/pdf",
});

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "compressed.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Compression failed");
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

        <h2 className="text-3xl font-bold">
          Upload PDF
        </h2>

        <p className="mt-4 text-slate-600">
          Drag and drop PDF here
        </p>
      </div>

      {file && (
        <div className="rounded-3xl border bg-white p-8">
          <p className="font-semibold">{file.name}</p>

          <p className="text-sm text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <button
            onClick={compressPdf}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-green-600 px-8 py-4 text-white"
          >
            {loading ? "Compressing..." : "Compress PDF"}
          </button>
        </div>
      )}
    </div>
  );
}