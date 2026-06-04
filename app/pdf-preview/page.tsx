import PdfPreviewTool from "@/components/PdfPreviewTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PDF Preview Free No Sign Up",
  description: "Preview PDF pages online for free.",
};

export default function PdfPreviewPage() {
  return (
    <ToolLayout
      title="PDF Preview Viewer"
      description="Upload a PDF and preview all pages."
    >
      <PdfPreviewTool />
    </ToolLayout>
  );
}