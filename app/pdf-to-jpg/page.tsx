import PdfToJpgTool from "@/components/PdfToJpgTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PDF to JPG Free No Sign Up",
  description:
    "Convert PDF pages to JPG images online for free. No sign up and no watermark.",
};

export default function PdfToJpgPage() {
  return (
    <ToolLayout
      title="PDF to JPG"
      description="Convert PDF pages into JPG images. Free, fast, and no sign up."
    >
      <PdfToJpgTool />
    </ToolLayout>
  );
}