import type { Metadata } from "next";
import React from "react";
import { SingleInvoiceLayout } from "@/components/ecommerce/single-invoice/SingleInvoiceLayout";

export const metadata: Metadata = {
  title: "Single Invoice | Next.js AdminArif Template",
  description: "This is the Single Invoice page for AdminArif Template",
};

export default function SingleInvoicePage() {
  return <SingleInvoiceLayout />;
}
