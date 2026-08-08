import { Metadata } from "next";
import React from "react";
import { CreateInvoiceLayout } from "@/components/ecommerce/create-invoice/CreateInvoiceLayout";

export const metadata: Metadata = {
  title: "E-commerce Create Invoice | AdminArif.Dev",
  description: "E-commerce Create Invoice page for AdminArif.Dev",
};

export default function EcommerceCreateInvoicePage() {
  return <CreateInvoiceLayout />;
}
