import MergePdfTool from "@/components/MergePdfTool";
import ToolLayout from "@/components/ToolLayout";
import type { Metadata } from "next";

export const metadata = {
  title: "Merge PDF Online Free",
  description:
    "Merge multiple PDF files into one PDF online for free. No signup, no watermark.",
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