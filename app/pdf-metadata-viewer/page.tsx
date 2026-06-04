import PdfMetadataViewerTool from "@/components/PdfMetadataViewerTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PDF Metadata Viewer Free No Sign Up",
  description:
    "View PDF metadata online for free.",
};

export default function PdfMetadataViewerPage() {
  return (
    <ToolLayout
      title="PDF Metadata Viewer"
      description="View PDF title, author, creator, producer and more."
    >
      <PdfMetadataViewerTool />
    </ToolLayout>
  );
}