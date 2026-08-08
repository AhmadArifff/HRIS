import type { Metadata } from "next";
import React from "react";
import { BillingLayout } from "@/components/ecommerce/billing/BillingLayout";

export const metadata: Metadata = {
  title: "Billing | Next.js AdminArif Template",
  description: "This is the Billing page for AdminArif Template",
};

export default function BillingPage() {
  return <BillingLayout />;
}
