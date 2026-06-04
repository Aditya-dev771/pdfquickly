import MergePdfTool from "@/components/MergePdfTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Merge PDF Free No Sign Up",
  description:
    "Merge multiple PDF files into one PDF online for free. No sign up and no watermark.",
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