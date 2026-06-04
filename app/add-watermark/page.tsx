import AddWatermarkTool from "@/components/AddWatermarkTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Add Watermark to PDF Free No Sign Up",
  description:
    "Add text watermark to PDF files online for free.",
};

export default function AddWatermarkPage() {
  return (
    <ToolLayout
      title="Add Watermark to PDF"
      description="Add text watermarks to every page of your PDF."
    >
      <AddWatermarkTool />
    </ToolLayout>
  );
}