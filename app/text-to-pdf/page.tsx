import TextToPdfTool from "@/components/TextToPdfTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Text to PDF Free No Sign Up",
  description:
    "Convert text to PDF online for free. No sign up and no watermark.",
};

export default function TextToPdfPage() {
  return (
    <ToolLayout
      title="Text to PDF"
      description="Write or paste text and convert it into a PDF file."
    >
      <TextToPdfTool />
    </ToolLayout>
  );
}