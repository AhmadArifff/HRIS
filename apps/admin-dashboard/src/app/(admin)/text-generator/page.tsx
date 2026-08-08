import type { Metadata } from "next";
import React from "react";
import { TextGeneratorLayout } from "@/components/text-generator/TextGeneratorLayout";

export const metadata: Metadata = {
  title: "AI Text Generator | Next.js AdminArif Template",
  description: "This is the AI Text Generator page for AdminArif Template",
};

export default function TextGeneratorPage() {
  return <TextGeneratorLayout />;
}
