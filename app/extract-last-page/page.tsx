import ExtractLastPageTool from "@/components/ExtractLastPageTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Extract Last Page from PDF Free No Sign Up",
  description:
    "Extract the last page from a PDF online for free. No sign up and no watermark.",
};

export default function ExtractLastPagePage() {
  return (
    <ToolLayout
      title="Extract Last Page from PDF"
      description="Upload a PDF and download only the last page."
    >
      <ExtractLastPageTool />
    </ToolLayout>
  );
}