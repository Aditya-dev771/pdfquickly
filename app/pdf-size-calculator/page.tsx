import PdfSizeCalculatorTool from "@/components/PdfSizeCalculatorTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PDF Size Calculator Free No Sign Up",
  description:
    "Check PDF file size, page count, average size per page and basic PDF details online for free.",
};

export default function PdfSizeCalculatorPage() {
  return (
    <ToolLayout
      title="PDF Size Calculator"
      description="Upload a PDF and check file size, total pages and average size per page."
    >
      <PdfSizeCalculatorTool />
    </ToolLayout>
  );
}