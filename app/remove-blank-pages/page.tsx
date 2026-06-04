import RemovePdfPagesTool from "@/components/RemovePdfPagesTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Remove Blank Pages from PDF Free No Sign Up",
  description:
    "Remove blank pages from PDF files online for free. No sign up and no watermark.",
};

export default function RemoveBlankPagesPage() {
  return (
    <ToolLayout
      title="Remove Blank Pages from PDF"
      description="Enter blank page numbers and remove them from your PDF."
    >
      <RemovePdfPagesTool />
    </ToolLayout>
  );
}