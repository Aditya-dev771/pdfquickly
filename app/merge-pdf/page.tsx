import MergePdfTool from "@/components/MergePdfTool";
import ToolLayout from "@/components/ToolLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Online Free | PDFQuickly",
  description:
    "Merge multiple PDF files into one PDF online for free. Fast, secure, no signup, and no watermark.",
  keywords: [
    "merge pdf",
    "combine pdf",
    "merge pdf online",
    "pdf merger",
    "free pdf merger",
  ],
};
export default function MergePdfPage() {
  return (
    <ToolLayout
      title="Merge PDF Files"
      description="Combine multiple PDF files into one. Free, fast, and no sign up."
    >
      <MergePdfTool />
    </ToolLayout>
  );
}