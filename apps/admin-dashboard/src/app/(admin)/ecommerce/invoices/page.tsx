import type { Metadata } from "next";
import React from "react";
import { InvoicesLayout } from "@/components/ecommerce/invoices/InvoicesLayout";

export const metadata: Metadata = {
  title: "Invoices | Next.js AdminArif Template",
  description: "This is the Invoices page for AdminArif Template",
};

export default function InvoicesPage() {
  return <InvoicesLayout />;
}
