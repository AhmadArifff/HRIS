import { Metadata } from "next";
import React from "react";
import { FaqLayout } from "@/components/faq/FaqLayout";

export const metadata: Metadata = {
  title: "Faqs | AdminArif.Dev",
  description: "Faqs page for AdminArif.Dev",
};

export default function FaqPage() {
  return <FaqLayout />;
}
