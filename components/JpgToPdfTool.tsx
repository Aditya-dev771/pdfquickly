"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function JpgToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: true,
  });

  async function convertToPdf() {
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      setLoading(true);

      const pdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();

        let image;
        if (file.type === "image/png") {
          image = await pdf.embedPng(bytes);
        } else {
          image = await pdf.embedJpg(bytes);
        }

        const { width, height } = image.scale(1);
        const page = pdf.addPage([width, height]);

        page.drawImage(image, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdf.save();

const blob = new Blob([new Uint8Array(pdfBytes)], {
  type: "application/pdf",
});

const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "images-to-pdf.pdf";
link.click();

URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to convert images to PDF.");
    } finally {
      setLoading(false);
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
          Upload Images
        </h2>

        <p className="mt-4 text-slate-600">
          Drag and drop JPG or PNG images here
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-slate-950 px-8 py-4 font-semibold text-white hover:bg-slate-800"
        >
          Choose Images
        </button>
      </div>

      {files.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-950">
            Selected Images
          </h3>

          <div className="mt-6 space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-950">{file.name}</p>
                  <p className="text-sm text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={convertToPdf}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </button>
        </div>
      )}
    </div>
  );
}