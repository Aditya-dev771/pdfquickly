import ImageToPdfTool from "@/components/ImageToPdfTool";
import ToolLayout from "@/components/ToolLayout";

export default function ImageToPdfPage() {
  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert JPG, JPEG and PNG images into one PDF file."
    >
      <ImageToPdfTool />
    </ToolLayout>
  );
}