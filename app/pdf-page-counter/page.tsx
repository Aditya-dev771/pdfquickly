import PdfPageCounterTool from "@/components/PdfPageCounterTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PDF Page Counter Free No Sign Up",
  description:
    "Count PDF pages online for free. No sign up and no watermark.",
};

export default function PdfPageCounterPage() {
  return (
    <ToolLayout
      title="PDF Page Counter"
      description="Upload a PDF and instantly see the total number of pages."
    >
      <PdfPageCounterTool />
    </ToolLayout>
  );
}