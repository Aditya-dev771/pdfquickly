import ExtractFirstPageTool from "@/components/ExtractFirstPageTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Extract First Page from PDF Free No Sign Up",
  description:
    "Extract the first page from a PDF online for free. No sign up and no watermark.",
};

export default function ExtractFirstPagePage() {
  return (
    <ToolLayout
      title="Extract First Page from PDF"
      description="Upload a PDF and download only the first page."
    >
      <ExtractFirstPageTool />
    </ToolLayout>
  );
}