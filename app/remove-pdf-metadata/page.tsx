import RemovePdfMetadataTool from "@/components/RemovePdfMetadataTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Remove PDF Metadata Free No Sign Up",
  description:
    "Remove PDF metadata online for free. Clean PDF title, author, subject and keywords with no sign up.",
};

export default function RemovePdfMetadataPage() {
  return (
    <ToolLayout
      title="Remove PDF Metadata"
      description="Remove hidden metadata from your PDF. Free, fast, and no sign up."
    >
      <RemovePdfMetadataTool />
    </ToolLayout>
  );
}