import type { Metadata } from "next";
import React from "react";
import { AISettingsLayout } from "@/components/ai-settings/AISettingsLayout";

export const metadata: Metadata = {
  title: "AI Settings | Next.js AdminArif Template",
  description: "This is the AI Settings page for AdminArif Template",
};

export default function AISettingsPage() {
  return <AISettingsLayout />;
}
