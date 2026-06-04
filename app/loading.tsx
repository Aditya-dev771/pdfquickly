export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-950"></div>

        <p className="mt-4 text-slate-600">
          Loading PDFQuickly...
        </p>
      </div>
    </div>
  );
}