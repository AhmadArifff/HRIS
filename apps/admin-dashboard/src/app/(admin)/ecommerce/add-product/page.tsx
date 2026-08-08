import type { Metadata } from "next";
import React from "react";
import { AddProductLayout } from "@/components/ecommerce/add-product/AddProductLayout";

export const metadata: Metadata = {
  title: "Add Product | Next.js AdminArif Template",
  description: "This is the Add Product page for AdminArif Template",
};

export default function AddProductPage() {
  return <AddProductLayout />;
}
