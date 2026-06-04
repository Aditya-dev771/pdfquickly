"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function RemovePdfMetadataTool() {
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

  async function removeMetadata() {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("");
      pdf.setCreator("");
      pdf.setCreationDate(new Date(0));
      pdf.setModificationDate(new Date(0));

      const cleanedBytes = await pdf.save({
        useObjectStreams: true,
      });

      const blob = new Blob([new Uint8Array(cleanedBytes)], {
  type: "application/pdf",
});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "metadata-removed.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to remove metadata.");
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
          <p className="font-semibold text-slate-950">{file.name}</p>

          <p className="text-sm text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={removeFile}
              className="rounded-xl bg-red-50 px-6 py-3 font-semibold text-red-600 hover:bg-red-100"
            >
              Remove
            </button>

            <button
              onClick={removeMetadata}
              disabled={loading}
              className="flex-1 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:bg-slate-400"
            >
              {loading ? "Removing..." : "Remove Metadata"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}