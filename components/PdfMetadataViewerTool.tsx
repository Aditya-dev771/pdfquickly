"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function PdfMetadataViewerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setMetadata(null);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  async function readMetadata() {
    if (!file) return;

    try {
      setLoading(true);

      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      setMetadata({
        title: pdf.getTitle() || "N/A",
        author: pdf.getAuthor() || "N/A",
        subject: pdf.getSubject() || "N/A",
        creator: pdf.getCreator() || "N/A",
        producer: pdf.getProducer() || "N/A",
        pages: pdf.getPageCount(),
      });
    } catch (error) {
      console.error(error);
      alert("Failed to read metadata.");
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
          <button
            onClick={readMetadata}
            disabled={loading}
            className="w-full rounded-xl bg-green-600 px-8 py-4 text-white"
          >
            {loading ? "Reading..." : "Read Metadata"}
          </button>

          {metadata && (
            <div className="mt-6 space-y-3">
              <div><b>Title:</b> {metadata.title}</div>
              <div><b>Author:</b> {metadata.author}</div>
              <div><b>Subject:</b> {metadata.subject}</div>
              <div><b>Creator:</b> {metadata.creator}</div>
              <div><b>Producer:</b> {metadata.producer}</div>
              <div><b>Pages:</b> {metadata.pages}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}