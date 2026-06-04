import AddPageNumbersTool from "@/components/AddPageNumbersTool";
import ToolLayout from "@/components/ToolLayout";

export const metadata = {
  title: "Add Page Numbers to PDF Free No Sign Up",
  description:
    "Add page numbers to PDF files online for free. No sign up and no watermark.",
};

export default function AddPageNumbersPage() {
  return (
    <ToolLayout
      title="Add Page Numbers to PDF"
      description="Add page numbers to every PDF page. Free, fast, and no sign up."
    >
      <AddPageNumbersTool />
    </ToolLayout>
  );
}