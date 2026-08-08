import { Metadata } from "next";
import CodeGeneratorLayout from "@/components/code-generator/CodeGeneratorLayout";

export const metadata: Metadata = {
  title: "AI Code Generator | AdminArif - Next.js Dashboard Template",
  description: "This is AI Code Generator page for AdminArif - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function CodeGeneratorPage() {
  return (
    <>
      <CodeGeneratorLayout />
    </>
  );
}
