"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);

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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Selected File
              </p>

              <h3 className="mt-1 text-lg font-semibold text-slate-950">
                {file.name}
              </h3>

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

              <button className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
                Convert PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}