import JpgToPdfTool from "@/components/JpgToPdfTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PNG to PDF Free No Sign Up",
  description:
    "Convert PNG images to PDF online for free. No sign up and no watermark.",
};

export default function PngToPdfPage() {
  return (
    <ToolLayout
      title="PNG to PDF"
      description="Convert PNG images into PDF files. Free, fast, and no sign up."
    >
      <JpgToPdfTool />
    </ToolLayout>
  );
}