"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { degrees, PDFDocument } from "pdf-lib";

export default function RotatePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
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

  async function rotatePDF() {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const pages = pdf.getPages();

      pages.forEach((page) => {
        page.setRotation(degrees(angle));
      });

      const rotatedBytes = await pdf.save();
const blob = new Blob([new Uint8Array(rotatedBytes)], {
  type: "application/pdf",
});

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "rotated.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while rotating the PDF.");
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
              Rotation Angle
            </label>

            <select
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-slate-950"
            >
              <option value={90}>90° Clockwise</option>
              <option value={180}>180°</option>
              <option value={270}>270° Clockwise</option>
            </select>
          </div>

          <button
            onClick={rotatePDF}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Rotating..." : "Rotate PDF"}
          </button>
        </div>
      )}
    </div>
  );
}