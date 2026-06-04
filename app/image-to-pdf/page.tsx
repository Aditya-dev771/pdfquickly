import ImageToPdfTool from "@/components/ImageToPdfTool";
import ToolLayout from "@/components/ToolLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter Free | PDFQuickly",
  description:
    "Convert images to PDF online for free. Supports JPG, PNG, and other image files with no signup required.",
  keywords: [
    "image to pdf",
    "convert image to pdf",
    "jpg to pdf",
    "png to pdf",
    "free image to pdf converter",
  ],
};

export default function ImageToPdfPage() {
  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert images into a PDF file. Free, fast, and no sign up."
    >
      <ImageToPdfTool />
    </ToolLayout>
  );
}