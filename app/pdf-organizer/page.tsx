import PdfOrganizerTool from "@/components/PdfOrganizerTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "PDF Organizer Free No Sign Up",
  description:
    "Organize PDF pages online for free. Remove, extract and rotate PDF pages with no sign up.",
};

export default function PdfOrganizerPage() {
  return (
    <ToolLayout
      title="PDF Organizer"
      description="Remove, extract, and rotate PDF pages in one simple tool."
    >
      <PdfOrganizerTool />
    </ToolLayout>
  );
}