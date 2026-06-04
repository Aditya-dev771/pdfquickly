import AddPdfBorderTool from "@/components/AddPdfBorderTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Add Border to PDF Free No Sign Up",
  description:
    "Add borders to PDF pages online for free. No sign up and no watermark.",
};

export default function AddPdfBorderPage() {
  return (
    <ToolLayout
      title="Add Border to PDF"
      description="Add a clean border around every PDF page."
    >
      <AddPdfBorderTool />
    </ToolLayout>
  );
}